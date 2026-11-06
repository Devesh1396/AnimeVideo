"""Build the reel's soundtrack: original synthesized music + sound effects + the draft VO, ducked and mixed.

Reads src/timeline.json and public/audio/vo/*.wav, writes public/audio/mix.wav (48 kHz stereo).
Everything here is generated from scratch, so there are no music or SFX licences to clear.
"""
import json
import subprocess
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SR = 48000
TL = json.loads((ROOT / 'src/timeline-v1.json').read_text())
DUR = TL['duration']
N = int(SR * DUR)
rng = np.random.default_rng(7)


def t_arr(sec):
    return np.arange(int(SR * sec)) / SR


def _fft_filter(x, gain_fn):
    """Zero-phase filtering in the frequency domain (fine for these short, offline buffers)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X * gain_fn(np.maximum(f, 1e-3)), n=len(x))


def _lp_gain(f, fc, order=2):
    return 1 / np.sqrt(1 + (f / fc) ** (2 * order))


def _hp_gain(f, fc, order=2):
    return 1 / np.sqrt(1 + (fc / f) ** (2 * order))


def bp(x, lo, hi, order=2):
    return _fft_filter(x, lambda f: _hp_gain(f, lo, order) * _lp_gain(f, hi, order))


def lp(x, f, order=2):
    return _fft_filter(x, lambda fr: _lp_gain(fr, f, order))


def hp(x, f, order=2):
    return _fft_filter(x, lambda fr: _hp_gain(fr, f, order))


def add(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    buf[i:i + len(sig)] += sig * gain


def env(n, a=0.005, r=None, tau=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    if tau:
        e *= np.exp(-t / tau)
    if r:
        e *= np.clip((n / SR - t) / r, 0, 1)
    return e


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------------- music ----------------
def epiano(f, sec, vel=1.0):
    t = t_arr(sec)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.4) + 0.12 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t / 0.2)
    s *= 1 + 0.04 * np.sin(2 * np.pi * 5 * t)
    return s * env(len(t), a=0.004, tau=1.1, r=0.08) * vel


def pluck(f, sec=0.45, vel=1.0):
    t = t_arr(sec)
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.08)
    return s * env(len(t), a=0.002, tau=0.18, r=0.05) * vel


def pad(freqs, sec, vel=1.0):
    t = t_arr(sec)
    s = np.zeros_like(t)
    for f in freqs:
        for d in (-0.6, 0.6):
            s += np.sin(2 * np.pi * (f + d) * t) + 0.25 * np.sin(2 * np.pi * 2 * (f + d) * t)
    s = lp(s, 1800)
    a = np.minimum(1, t / 0.6) * np.clip((sec - t) / 0.6, 0, 1)
    return s * a * vel / (len(freqs) * 2)


def bass(f, sec=0.6, vel=1.0):
    t = t_arr(sec)
    s = np.sin(2 * np.pi * f * t) + 0.2 * np.sin(2 * np.pi * 2 * f * t)
    return s * env(len(t), a=0.01, tau=0.35, r=0.05) * vel


def kick(vel=1.0):
    t = t_arr(0.3)
    f = 45 + 75 * np.exp(-t / 0.04)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.12) * vel


def shaker(vel=1.0):
    n = int(0.05 * SR)
    return hp(rng.standard_normal(n), 6000) * env(n, a=0.003, tau=0.015) * vel


CHORDS = {  # root-position triads/sevenths around middle C
    'C': [48, 60, 64, 67, 71], 'Am': [45, 57, 60, 64, 67], 'F': [41, 57, 60, 65, 69], 'G': [43, 55, 59, 62, 67],
    'Dm': [38, 57, 62, 65, 69], 'E': [40, 56, 59, 64, 68],
}


def music():
    bpm = TL['music']['bpm']
    beat = 60 / bpm
    bar = beat * 4
    out = np.zeros(N)
    drop0, drop1 = TL['music']['dropout']
    prog_main = ['C', 'Am', 'F', 'G']
    t = 0.0
    k = 0
    while t < DUR - 0.01:
        sect = 'intro' if t < 2.6 else 'verse' if t < 7.9 else 'tension' if t < drop0 else 'drop' if t < drop1 else 'full' if t < 29.6 else 'end'
        if sect == 'tension':
            name = ['Am', 'F', 'Dm', 'E'][k % 4]
        elif sect == 'end':
            name = 'C'
        else:
            name = prog_main[k % 4]
        notes = CHORDS[name]
        if sect != 'drop':
            length = min(bar, DUR - t) if sect != 'end' else DUR - t
            add(out, pad([midi(n) for n in notes[1:4]], length + 0.3), t, 0.10 if sect in ('intro', 'verse') else 0.13)
            for i, n in enumerate(notes[1:]):
                add(out, epiano(midi(n), min(2.4, length), 0.11), t + i * 0.012)
            if sect in ('verse', 'tension', 'full', 'end'):
                add(out, bass(midi(notes[0]), beat * 1.8, 0.33), t)
                add(out, bass(midi(notes[0]), beat * 1.6, 0.26), t + beat * 2)
            if sect in ('full',):
                arp = notes[1:] + [notes[2] + 12]
                for j in range(8):
                    add(out, pluck(midi(arp[j % len(arp)] + 12), 0.4, 0.07), t + j * beat / 2)
            if sect in ('verse', 'full'):
                for j in range(8):
                    if j % 2 == 1:
                        add(out, shaker(0.05 if sect == 'verse' else 0.07), t + j * beat / 2)
            if sect in ('tension', 'full'):
                for j in range(4):
                    if sect == 'full' or j % 2 == 0:
                        add(out, kick(0.32 if sect == 'full' else 0.25), t + j * beat)
        t += bar
        k += 1
    # hard dropout for the twist, then a riser into the free test
    i0, i1 = int(drop0 * SR), int(drop1 * SR)
    fade = int(0.08 * SR)
    out[i0:i0 + fade] *= np.linspace(1, 0, fade)
    out[i0 + fade:i1] = 0
    rise = t_arr(drop1 - drop0 - 0.1)
    riser = bp(rng.standard_normal(len(rise)), 800, 6000) * (rise / rise[-1]) ** 2 * 0.05
    add(out, riser, drop0 + 0.1)
    # gentle fade in over the hook, ring-out at the end
    fi = int(1.8 * SR)
    out[:fi] *= np.linspace(0.25, 1, fi)
    fo = int(1.6 * SR)
    out[-fo:] *= np.linspace(1, 0, fo) ** 1.5
    return out


# ---------------- sfx ----------------
def noise(sec):
    return rng.standard_normal(int(SR * sec))


def sfx(kind, length=None):
    if kind == 'tick':
        n = noise(0.05)
        return bp(n, 2500, 6000) * env(len(n), a=0.001, tau=0.006) * 0.5 + pluck(2200, 0.05, 0.15)
    if kind == 'click':
        return sfx('tick') * 1.2
    if kind == 'pop':
        t = t_arr(0.09)
        f = 500 + 900 * (t / t[-1])
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), a=0.002, tau=0.03) * 0.35
    if kind == 'whoosh':
        n = noise(0.4)
        e = np.sin(np.pi * np.linspace(0, 1, len(n))) ** 2
        return bp(n, 300, 3500) * e * 0.16
    if kind == 'swipe':
        n = noise(0.25)
        e = np.sin(np.pi * np.linspace(0, 1, len(n)))
        return bp(n, 1500, 7000) * e * 0.1
    if kind == 'thud':
        t = t_arr(0.4)
        f = 40 + 60 * np.exp(-t / 0.05)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.15) * 0.7 + lp(noise(0.4), 300) * np.exp(-t / 0.05) * 0.15
    if kind == 'ding':
        t = t_arr(1.4)
        s = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in [(1318.5, 1, 0.9), (2637, 0.4, 0.5), (3955, 0.2, 0.3), (1975.5, 0.3, 0.6)])
        return s * env(len(t), a=0.002) * 0.16
    if kind == 'sparkle':
        out = np.zeros(int(0.6 * SR))
        for i, f in enumerate([2093, 2637, 3136, 4186]):
            add(out, pluck(f, 0.25, 0.08), i * 0.06)
        return out
    if kind == 'zap':
        t = t_arr(0.2)
        f = 2000 * np.exp(-t / 0.05) + 200
        return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-t / 0.06) * 0.05
    if kind in ('chalk', 'write', 'scratch', 'scribble'):
        sec = length or 0.16
        n = noise(sec)
        lo, hi = {'chalk': (2500, 9000), 'write': (1500, 6000), 'scratch': (1800, 7000), 'scribble': (1500, 6000)}[kind]
        mod = (np.abs(np.sin(2 * np.pi * (14 if kind != 'chalk' else 9) * t_arr(sec))) ** 0.5)
        g = {'chalk': 0.12, 'write': 0.08, 'scratch': 0.11, 'scribble': 0.08}[kind]
        return bp(n, lo, hi) * mod * env(len(n), a=0.01, r=0.04) * g
    if kind == 'paper':
        n = noise(0.18)
        return bp(n, 600, 5000) * env(len(n), a=0.005, tau=0.06) * 0.16
    if kind == 'rattle':
        out = np.zeros(int((length or 0.35) * SR))
        for j in range(6):
            add(out, lp(noise(0.04), 1500) * env(int(0.04 * SR), a=0.002, tau=0.01) * 0.25, j * 0.055)
        return out
    if kind == 'counter':
        out = np.zeros(int((length or 0.5) * SR))
        for j in range(10):
            add(out, sfx('tick') * 0.6, j * (length or 0.5) / 10)
        return out
    if kind == 'keys':
        out = np.zeros(int((length or 0.7) * SR))
        tt = 0.0
        while tt < (length or 0.7) - 0.03:
            add(out, bp(noise(0.02), 1500, 5000) * env(int(0.02 * SR), a=0.001, tau=0.004) * 0.25, tt)
            tt += rng.uniform(0.04, 0.08)
        return out
    if kind == 'sent':
        t = t_arr(0.25)
        f = 600 + 1400 * (t / t[-1])
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / t[-1]) * 0.12
    if kind == 'clock':
        out = np.zeros(int((length or 1.6) * SR))
        tt, gap = 0.0, 0.25
        while tt < (length or 1.6):
            add(out, sfx('tick') * 0.5, tt)
            tt += gap
            gap = max(0.07, gap * 0.82)
        return out
    raise ValueError(kind)


def load_wav_mono(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)


def main():
    vo = np.zeros(N)
    for key, at in TL['vo'].items():
        add(vo, load_wav_mono(ROOT / f'public/audio/vo/{key}.wav'), at, 1.0)
    vo = vo / (np.max(np.abs(vo)) + 1e-9) * 0.9

    mus = music()
    # duck the music under the voice: smoothed voice envelope -> gain between 1 and 0.4
    win = int(0.25 * SR)
    venv = np.convolve(np.abs(vo), np.ones(win) / win, mode='same')
    venv = np.clip(venv / 0.04, 0, 1)
    duck = 1 - 0.6 * venv
    mus = mus / (np.max(np.abs(mus)) + 1e-9) * 0.42 * duck

    fx = np.zeros(N)
    for ev in TL['sfx']:
        kind, at = ev[0], ev[1]
        length = ev[2] if len(ev) > 2 else None
        add(fx, sfx(kind, length), at)
    # classroom murmur under the first scene
    m = lp(noise(1.3), 700) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t_arr(1.3))) * 0.03
    add(fx, m * env(len(m), a=0.2, r=0.3), 0.0)
    fx *= 0.8

    mix = vo + mus + fx
    peak = np.max(np.abs(mix))
    if peak > 0.98:
        mix *= 0.98 / peak
    stereo = np.stack([mix, mix], axis=1)
    out = ROOT / 'public/audio/mix.wav'
    pcm = (np.clip(stereo, -1, 1) * 32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', str(out)],
                   input=pcm, check=True)
    print('wrote', out, f'{DUR:.1f}s', 'peak', round(float(peak), 3))


if __name__ == '__main__':
    main()
