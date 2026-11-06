"""Reel v2 soundtrack: the ElevenLabs VO (one continuous take, cut only inside its natural pauses),
a calm synthesized piano score, the 9 storyboard SFX cues (CC0 / Mixkit files), ducking, and a
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
    'sent': ('kenney-interface/maximize_004.ogg', -21),
    'final': ('mixkit/bell-600.mp3', -21),
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
    for k in ('s1', 's2', 's3', 's4', 's5', 's6', 's7'):
        v = TL['vo'][k]
        a, b = v['src']
        # widen to the middle of the surrounding pauses (edges are snapped to pauses by align_full.py)
        seg = src[int(max(0, a - 0.06) * SR):int(min(len(src) / SR, b + 0.12) * SR)].copy()
        seg[:fade] *= np.linspace(0, 1, fade)
        seg[-fade:] *= np.linspace(1, 0, fade)
        add(out, seg, v['at'] - 0.06)
    return out


# ---------------- music ----------------
CH = {'C': [48, 60, 64, 67], 'Am': [45, 60, 64, 69], 'F': [41, 60, 65, 69], 'G': [43, 59, 62, 67],
      'Dm': [38, 62, 65, 69], 'E': [40, 59, 64, 68], 'Fmaj7': [41, 57, 64, 69], 'Csus': [48, 60, 65, 67]}
PROG = {
    'intro': ['Am', 'F', 'C', 'G'],
    'home': ['Am', 'F', 'C', 'G'],
    'thin': ['Am', 'Dm', 'F', 'E'],
    'lift': ['C', 'G', 'Am', 'F'],
    'bonus': ['F', 'C', 'G', 'Am'],
    'cta': ['F', 'G', 'C', 'C'],
    'end': ['C'],
}


def music():
    beat = 60 / TL['music']['bpm']
    bar = beat * 4
    secs = TL['music']['sections']
    out = np.zeros(N)
    for si, (name, start) in enumerate(secs):
        end = secs[si + 1][1] if si + 1 < len(secs) else DUR
        t, k = start, 0
        while t < end - 0.05:
            ch = CH[PROG[name][k % len(PROG[name])]]
            length = min(bar, end - t)
            notes = [midi(m) for m in ch[1:]]
            if name == 'thin':
                # piano only, sparse: one low note and one soft upper note per bar
                add(out, epiano(midi(ch[1]), min(2.6, length + 0.4), 0.10), t)
                add(out, epiano(midi(ch[3] + 12), 1.6, 0.05), t + beat * 2)
            elif name == 'end':
                add(out, pad(notes, end - t + 0.2, 0.9), t, 0.10)
                for i, f in enumerate(notes):
                    add(out, epiano(f, end - t, 0.10), t + i * 0.09)
                add(out, bass(midi(ch[0]), end - t, 0.25), t)
                break
            else:
                soft = name in ('intro', 'home')
                add(out, pad(notes, length + 0.4), t, 0.06 if soft else 0.09)
                # piano: broken chord, gentle
                for i, f in enumerate(notes):
                    add(out, epiano(f, min(2.4, length + 0.3), 0.075 if soft else 0.09), t + i * beat / 2)
                if name != 'intro':
                    for j, f in enumerate([notes[0] * 2, notes[1] * 2, notes[2] * 2, notes[1] * 2]):
                        add(out, pluck(f, 0.5, 0.035 if soft else 0.05), t + (j + 4) * beat / 2)
                if not soft:  # the lift (slide 4 on): bass, a soft kick and shaker; still calm
                    add(out, bass(midi(ch[0]), beat * 1.9, 0.30), t)
                    add(out, bass(midi(ch[0]), beat * 1.7, 0.24), t + beat * 2)
                    for j in range(4):
                        if j in (0, 2):
                            add(out, kick(0.16), t + j * beat)
                        add(out, shaker(0.025), t + j * beat + beat / 2)
            t += bar
            k += 1
    # fade in under C1, short dip into slide 3, ring-out at the end
    fi = int(2.5 * SR)
    out[:fi] *= np.linspace(0.0, 1, fi) ** 1.5
    i3 = int(TL['shots']['s3a'][0] * SR)
    out[i3 - int(0.4 * SR):i3] *= np.linspace(1, 0.55, int(0.4 * SR))
    fo = int(2.2 * SR)
    out[-fo:] *= np.linspace(1, 0, fo) ** 1.6
    return out


# ---------------- sfx ----------------
def effects():
    out = np.zeros(N)
    whoosh_n = 0
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
        if kind == 'whoosh':
            kind = 'whoosh' if whoosh_n == 0 else 'whoosh2'
            whoosh_n += 1
        add(out, sfx_sample(kind), at)
    return out


def true_peak(x):
    """4x oversampled peak (dBTP)."""
    X = np.fft.rfft(x)
    up = np.fft.irfft(np.concatenate([X, np.zeros(len(X) * 3 - 3)]), n=len(x) * 4) * 4
    return 20 * np.log10(np.max(np.abs(up)) + 1e-12)


def limit(x, ceiling_db=-1.8):
    """Simple look-ahead peak limiter (sample peak, 1 ms attack, 80 ms release)."""
    c = db(ceiling_db)
    g = np.minimum(1, c / (np.abs(x) + 1e-12))
    w = int(0.002 * SR)
    g = np.array([g[max(0, i - w):i + w].min() for i in range(0, len(g))]) if len(g) < 10 else \
        np.minimum.reduce([np.roll(g, s) for s in range(-w, w + 1)])
    rel = np.exp(-1 / (0.08 * SR))
    sm = g.copy()
    for i in range(1, len(sm)):
        sm[i] = min(g[i], rel * sm[i - 1] + (1 - rel) * g[i])
    return x * sm


def main():
    vo = voice()
    vo = vo / (np.max(np.abs(vo)) + 1e-9) * 0.9
    mus = music()
    mus = mus / (np.max(np.abs(mus)) + 1e-9)
    # duck the music under the voice: smoothed voice envelope -> -10 dB while she speaks
    win = int(0.3 * SR)
    venv = np.convolve(np.abs(vo), np.ones(win) / win, mode='same')
    duck = 1 - (1 - db(-10)) * np.clip(venv / 0.03, 0, 1)
    mus = mus * db(-17) * duck
    fx = effects()
    mix = vo + mus + fx

    meter = pyln.Meter(SR)
    # measure the file as it is written: stereo (L = R), as earshot / players do
    st = lambda x: meter.integrated_loudness(np.stack([x, x], axis=1))  # noqa: E731
    lufs = st(mix)
    mix = mix * db(-14 - lufs)
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
        pcm = (np.clip(np.stack([x, x], axis=1), -1, 1) * 32767).astype('<i2').tobytes()
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', str(path)],
                       input=pcm, check=True)

    write(ROOT / 'public/audio/mix-v2.wav', mix)
    g = db(-14 - st(vo + mus + fx))
    for name, x in (('vo', vo), ('music', mus), ('sfx', fx)):
        write(ROOT / f'public/audio/stems-v2/{name}.wav', x * g)
    print(f'wrote mix-v2.wav  {DUR:.1f} s  {lufs:.2f} LUFS  true peak {tp:.2f} dBTP')


if __name__ == '__main__':
    main()
