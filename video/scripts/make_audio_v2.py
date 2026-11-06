"""Reel v2 soundtrack: the ElevenLabs VO (one continuous take, cut only inside its natural pauses),
a calm synthesized piano score in stereo (with a warm low layer and a short room reverb), the 9 storyboard SFX cues (CC0 / Mixkit files), ducking, and a
final master at -14 LUFS integrated with true peak <= -1.5 dBTP.

Reads src/timeline.json, src/vo-timings-v2.json, public/audio/vo/v2/Audio-gen.mp3, public/audio/sfx/.
Writes public/audio/mix-v2.wav (48 kHz stereo) and public/audio/stems-v2/{vo,music,sfx}.wav.
Run: python scripts/make_audio_v2.py      (Windows: .venv\\Scripts\\python scripts\\make_audio_v2.py)
"""
import json, subprocess, sys
from pathlib import Path

import numpy as np
import pyloudnorm as pyln

sys.path.insert(0, str(Path(__file__).resolve().parent))
from make_audio_v1 import SR, add, bass, bp, env, epiano, hp, kick, lp, midi, pad, pluck, shaker, t_arr  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / 'src/timeline.json').read_text(encoding='utf-8'))
DUR = TL['duration']
N = int(SR * DUR)
FX = ROOT / 'public/audio/sfx'

# Picked with `earshot rank` against a short description (see video/assets-used.md for the ranks).
SFX_FILES = {
    'paper': ('mixkit/paper-1101.mp3', -20),
    'tick': ('ui-sfx-set/click1.wav', -24),
    'whoosh': ('mixkit/whoosh-1489.mp3', -21),
    'whoosh2': ('mixkit/whoosh-1491.mp3', -21),
    'chime': ('mixkit/bell-2256.mp3', -24),
    'pop': ('kenney-interface/drop_003.ogg', -20),
    'key': ('ui-sfx-set/click2.wav', -28),
    'pen': ('ui-sfx-set/click1.wav', -23),
    'tap': ('ui-sfx-set/click1.wav', -27),
    'sent': ('kenney-interface/maximize_004.ogg', -21),
    'final': ('mixkit/bell-600.mp3', -17),
}


def load(path, sr=SR):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '1', '-ar', str(sr), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)


def db(x):
    return 10 ** (x / 20)


def trim_lead(x, thr=0.02):
    """Drop leading silence so the sound's onset lands exactly on its cue time."""
    i = int(np.argmax(np.abs(x) > thr * np.max(np.abs(x))))
    return x[max(0, i - int(0.003 * SR)):]


def sfx_sample(kind):
    f, gain = SFX_FILES[kind]
    x = trim_lead(load(FX / f))
    return x / (np.max(np.abs(x)) + 1e-9) * db(gain)


# ---------------- voice ----------------
def voice():
    src = load(ROOT / 'public' / TL['vo']['file'])
    out = np.zeros(N)
    fade = int(0.03 * SR)
    for k, v in TL['vo'].items():
        if k == 'file':
            continue
        a, b = v['src']
        # widen a little into the surrounding pauses (edges sit inside pauses: align_full.py / timeline.json)
        seg = src[int(max(0, a - 0.06) * SR):int(min(len(src) / SR, b + 0.12) * SR)].copy()
        seg[:fade] *= np.linspace(0, 1, fade)
        seg[-fade:] *= np.linspace(1, 0, fade)
        add(out, seg, v['at'] - 0.06)
    return out


# ---------------- music (stereo) ----------------
CH = {'C': [48, 60, 64, 67], 'Am': [45, 60, 64, 69], 'F': [41, 60, 65, 69], 'G': [43, 59, 62, 67],
      'Dm': [38, 62, 65, 69], 'E': [40, 59, 64, 68]}
PROG = {
    'intro': ['Am', 'F', 'C', 'G'], 'home': ['Am', 'F', 'C', 'G'], 'thin': ['Am', 'Dm', 'F', 'E'],
    'turn': ['Am'], 'lift': ['C', 'G', 'Am', 'F'], 'ctm': ['F', 'C', 'G', 'G'], 'bonus': ['F', 'C', 'G', 'Am'],
    'cta': ['F', 'G', 'C', 'C'], 'end': ['C'],
}


class St:
    """Two-channel buffer with constant-power panning."""
    def __init__(self):
        self.L, self.R = np.zeros(N), np.zeros(N)

    def add(self, sig, at, gain=1.0, pan=0.0):
        a = (pan + 1) * np.pi / 4
        add(self.L, sig, at, gain * np.cos(a) * 1.414)
        add(self.R, sig, at, gain * np.sin(a) * 1.414)


def warm(f, sec, vel=1.0):
    """Soft low sine layer (root an octave down) for warmth under key moments."""
    t = t_arr(sec)
    s = np.sin(2 * np.pi * f * t) + 0.15 * np.sin(2 * np.pi * 2 * f * t)
    return s * np.minimum(1, t / 0.25) * np.clip((sec - t) / 0.5, 0, 1) * vel


def music():
    beat = 60 / TL['music']['bpm']
    bar = beat * 4
    secs = TL['music']['sections']
    m = St()
    for si, (name, start) in enumerate(secs):
        end = secs[si + 1][1] if si + 1 < len(secs) else DUR
        t, k = start, 0
        while t < end - 0.05:
            ch = CH[PROG[name][k % len(PROG[name])]]
            length = min(bar, end - t)
            notes = [midi(x) for x in ch[1:]]
            if name == 'thin':
                m.add(pad(notes, length + 0.4), t, 0.035, -0.3)
                m.add(pad(notes, length + 0.4), t, 0.035, 0.3)
                m.add(epiano(midi(ch[1]), min(2.6, length + 0.4), 0.11), t, 1, -0.2)
                m.add(epiano(midi(ch[3] + 12), 1.6, 0.06), t + beat * 2, 1, 0.4)
            elif name == 'turn':
                # the turning point: everything drops to one low held tone and a single high note
                m.add(warm(midi(ch[0]), end - t + 0.3, 0.32), t, 1, 0)
                m.add(epiano(midi(ch[3] + 12), 2.4, 0.07), t + 0.05, 1, 0.3)
                break
            elif name == 'end':
                # resolve on C under the end card; short ring-out
                m.add(pad(notes + [notes[0] * 2], end - t + 0.3, 1.0), t, 0.10, -0.5)
                m.add(pad(notes, end - t + 0.3, 1.0), t, 0.09, 0.5)
                for hit, vel in ((0.0, 0.12), (1.2, 0.10), (3.1, 0.12)):
                    for i, f in enumerate(notes):
                        m.add(epiano(f, end - t - hit, vel), t + hit + i * 0.07, 1, (-0.4, 0, 0.4)[i % 3])
                m.add(bass(midi(ch[0]), end - t, 0.25), t)
                m.add(warm(midi(ch[0]) / 2, end - t, 0.5), t)
                break
            else:
                soft = name in ('intro', 'home', 'ctm')
                m.add(pad(notes, length + 0.4), t, 0.05 if soft else 0.075, -0.35)
                m.add(pad(notes, length + 0.4), t, 0.05 if soft else 0.075, 0.35)
                for i, f in enumerate(notes):
                    m.add(epiano(f, min(2.4, length + 0.3), 0.075 if soft else 0.09), t + i * beat / 2, 1, (-0.45, 0.0, 0.45)[i % 3])
                if name != 'intro':
                    for j, f in enumerate([notes[0] * 2, notes[1] * 2, notes[2] * 2, notes[1] * 2]):
                        m.add(pluck(f, 0.5, 0.035 if soft else 0.05), t + (j + 4) * beat / 2, 1, (-0.6, 0.6)[j % 2])
                if name in ('lift', 'bonus', 'cta'):  # bass, warm low layer, a soft kick and shaker
                    m.add(bass(midi(ch[0]), beat * 1.9, 0.30), t)
                    m.add(bass(midi(ch[0]), beat * 1.7, 0.24), t + beat * 2)
                    m.add(warm(midi(ch[0]) / 2, length + 0.2, 0.22), t)
                    for j in range(4):
                        if j in (0, 2):
                            m.add(kick(0.16), t + j * beat)
                        m.add(shaker(0.025), t + j * beat + beat / 2, 1, 0.5 if j % 2 else -0.5)
            t += bar
            k += 1
    for ch in (m.L, m.R):
        fi = int(2.5 * SR)
        ch[:fi] *= np.linspace(0.0, 1, fi) ** 1.5
        fo = int(0.9 * SR)
        ch[-fo:] *= np.linspace(1, 0, fo) ** 1.2
    return m


def reverb(L, R, sec=1.6, wet=0.16):
    """Short, decorrelated room tail (different noise IR per side) for width and warmth."""
    rng = np.random.default_rng(11)
    n_ = int(sec * SR)
    env_ = np.exp(-np.arange(n_) / (0.35 * SR))
    out = []
    for x in (L, R):
        ir = lp(rng.standard_normal(n_), 5000) * env_
        ir /= np.sqrt(np.sum(ir ** 2))
        size = len(x) + n_
        y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:len(x)]
        out.append(x * (1 - wet) + y * wet)
    return out


def mid_cut(x, gain_db=-2.0):
    """Gentle dip at 1-3 kHz so the music sits under the voice."""
    return _bell(x, 1700, gain_db)


def _bell(x, f0, gain_db, q=0.8):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    g = 1 + (db(gain_db) - 1) * np.exp(-0.5 * (np.log2(np.maximum(f, 1) / f0) / q) ** 2)
    return np.fft.irfft(X * g, n=len(x))


# ---------------- sfx ----------------
def synth_sfx(kind):
    t = t_arr(1.0)
    if kind == 'sub':  # soft low hit under FREE, the gift and the end card
        f = 46 + 30 * np.exp(-t / 0.08)
        s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.45) * np.minimum(1, t / 0.01)
        return s / np.max(np.abs(s)) * db(-17)
    if kind == 'swell':  # gentle rising air into the turning point (peaks at its end)
        t = t_arr(0.7)
        s = bp(np.random.default_rng(5).standard_normal(len(t)), 300, 2500) * (t / t[-1]) ** 2.5
        s += 0.3 * np.sin(2 * np.pi * 110 * t) * (t / t[-1]) ** 2
        s *= np.clip((t[-1] - t) / 0.05, 0, 1)
        return s / np.max(np.abs(s)) * db(-26)
    raise ValueError(kind)


def effects():
    out = np.zeros(N)
    for ev in TL['sfx']:
        kind, at = ev[0], ev[1]
        if kind == 'keys':  # soft key taps through the typing
            length = ev[2]
            rng = np.random.default_rng(3)
            tt = at
            key = sfx_sample('key')
            while tt < at + length:
                add(out, key * rng.uniform(0.7, 1.0), tt)
                tt += rng.uniform(0.09, 0.15)
            continue
        if kind in ('sub', 'swell'):
            x = synth_sfx(kind)
            add(out, x, at - (0.7 if kind == 'swell' else 0))
            continue
        add(out, sfx_sample(kind), at)
    return out


def true_peak(x):
    """4x oversampled peak (dBTP) over all channels."""
    worst = -200.0
    for c in np.atleast_2d(x):
        X = np.fft.rfft(c)
        up = np.fft.irfft(np.concatenate([X, np.zeros(len(X) * 3 - 3)]), n=len(c) * 4) * 4
        worst = max(worst, 20 * np.log10(np.max(np.abs(up)) + 1e-12))
    return worst


def limit(st, ceiling_db=-1.8):
    """Linked stereo look-ahead peak limiter (2 ms window, 80 ms release)."""
    c = db(ceiling_db)
    peak = np.max(np.abs(st), axis=0)
    g = np.minimum(1, c / (peak + 1e-12))
    w = int(0.002 * SR)
    g = np.minimum.reduce([np.roll(g, s) for s in range(-w, w + 1)])
    rel = np.exp(-1 / (0.08 * SR))
    sm = g.copy()
    for i in range(1, len(sm)):
        sm[i] = min(g[i], rel * sm[i - 1] + (1 - rel) * g[i])
    return st * sm


def main():
    vo = voice()
    vo = vo / (np.max(np.abs(vo)) + 1e-9) * 0.9
    m = music()
    L, R = reverb(m.L, m.R)
    L, R = mid_cut(L), mid_cut(R)
    # widen: boost the side signal of the music (mid/side)
    M_, S_ = (L + R) / 2, (L - R) / 2
    L, R = M_ + 2.2 * S_, M_ - 2.2 * S_
    pk = max(np.max(np.abs(L)), np.max(np.abs(R))) + 1e-9
    # duck the music under the voice: smoothed voice envelope -> about -5 dB while she speaks
    win = int(0.3 * SR)
    venv = np.convolve(np.abs(vo), np.ones(win) / win, mode='same')
    duck = 1 - (1 - db(-5)) * np.clip(venv / 0.03, 0, 1)
    L, R = L / pk * db(-20) * duck, R / pk * db(-20) * duck
    # once the voice has finished, the music comes up to carry the end card and lands with the sting
    v_end = max(e['at'] + e['src'][1] - e['src'][0] for k, e in TL['vo'].items() if k != 'file')
    lift = db(7) ** np.clip((np.arange(N) / SR - v_end - 0.2) / 0.6, 0, 1)
    L, R = L * lift, R * lift
    fx = effects()
    mix = np.stack([vo + L + fx, vo + R + fx])

    meter = pyln.Meter(SR)
    st = lambda x: meter.integrated_loudness(x.T)  # noqa: E731
    mix = mix * db(-14 - st(mix))
    ceiling = -2.2
    for _ in range(6):
        tp = true_peak(mix)
        if tp <= -1.6:
            break
        mix = limit(mix, ceiling)
        mix = mix * db(-14 - st(mix))
        ceiling -= max(0.3, tp + 1.6)
    lufs, tp = st(mix), true_peak(mix)

    def write(path, x):
        path.parent.mkdir(parents=True, exist_ok=True)
        x = np.atleast_2d(x)
        if x.shape[0] == 1:
            x = np.vstack([x, x])
        pcm = (np.clip(x.T, -1, 1) * 32767).astype('<i2').tobytes()
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', str(path)],
                       input=pcm, check=True)

    write(ROOT / 'public/audio/mix-v2.wav', mix)
    g = db(-14 - st(np.stack([vo + L + fx, vo + R + fx])))
    for name, x in (('vo', vo), ('music', np.stack([L, R])), ('sfx', fx)):
        write(ROOT / f'public/audio/stems-v2/{name}.wav', x * g)
    print(f'wrote mix-v2.wav  {DUR:.1f} s  {lufs:.2f} LUFS  true peak {tp:.2f} dBTP')


if __name__ == '__main__':
    main()
