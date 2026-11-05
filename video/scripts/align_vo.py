"""Word timings + transcript check for the Sarvam lines.

Usage: python scripts/align_vo.py [--model small] 1 2 ...   (or 'all')
For each slide: transcribe public/audio/vo/v2/s<N>.wav with faster-whisper (language hi,
word_timestamps=True, the script line as initial_prompt), map the recognised words back onto
the script words, print any script word that wasn't heard as written, and write
src/vo-timings-v2.json  {"s1": [{"w": <script word>, "start": s, "end": s, "heard": <whisper word>}, ...]}.
"""
import argparse, difflib, json, re, subprocess, unicodedata
import numpy as np
from pathlib import Path
from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parent.parent
LINES = json.loads((ROOT / "scripts" / "vo-lines-v2a.json").read_text(encoding="utf-8"))
OUT = ROOT / "src" / "vo-timings-v2.json"


def norm(w: str) -> str:
    w = unicodedata.normalize("NFC", w).lower()
    w = w.replace("़", "")  # nukta: फ़ ~ फ
    return re.sub(r"[^\wऀ-ॿ]", "", w)


def words(text: str):
    return [w for w in re.split(r"[\s\-]+", text) if norm(w)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="small")
    ap.add_argument("slides", nargs="*", default=["1"])
    a = ap.parse_args()
    slides = list(LINES) if a.slides == ["all"] else a.slides
    model = WhisperModel(a.model, device="cpu", compute_type="int8")
    data = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    for s in slides:
        script = LINES[s]
        pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(ROOT / "public/audio/vo/v2" / f"s{s}.wav"),
                              "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
        audio = np.frombuffer(pcm, dtype=np.float32)  # decode with ffmpeg (avoids PyAV version issues)
        segs, _ = model.transcribe(audio, language="hi",
                                   word_timestamps=True, initial_prompt=script, beam_size=5)
        heard = [w for seg in segs for w in seg.words if norm(w.word)]
        sw = words(script)
        sm = difflib.SequenceMatcher(a=[norm(w) for w in sw], b=[norm(h.word) for h in heard], autojunk=False)
        out, mism, translit = [None] * len(sw), [], []
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            for k in range(i2 - i1):
                i = i1 + k
                if j1 + k < j2:  # map 1:1 inside equal/replace blocks
                    h = heard[j1 + k]
                    out[i] = {"w": sw[i], "start": round(h.start, 3), "end": round(h.end, 3), "heard": h.word.strip()}
                if tag != "equal":
                    hw = heard[j1 + k].word.strip() if j1 + k < j2 else "—"
                    # An English (Latin) script word that whisper wrote in Devanagari is a spelling
                    # difference, not a wrong word: list it apart, for the ear-check only.
                    if re.search(r"[A-Za-z]", sw[i]) and re.search(r"[\u0900-\u097f]", hw):
                        translit.append((sw[i], hw))
                    else:
                        mism.append((sw[i], hw))
            if tag in ("insert", "replace") and (j2 - j1) > (i2 - i1):
                for h in heard[j1 + (i2 - i1):j2]:
                    mism.append(("—", h.word.strip()))
        # words with no match: interpolate between neighbours
        for i, o in enumerate(out):
            if o is None:
                prev = next((out[j]["end"] for j in range(i - 1, -1, -1) if out[j]), 0.0)
                nxt = next((out[j]["start"] for j in range(i + 1, len(out)) if out[j]), prev)
                out[i] = {"w": sw[i], "start": prev, "end": nxt, "heard": None}
        data[f"s{s}"] = out
        print(f"s{s} heard: {' '.join(h.word.strip() for h in heard)}")
        print(f"s{s} mismatches (script → heard): {mism or 'none'}")
        print(f"s{s} English words heard in Devanagari (check by ear): {translit or 'none'}")
        for o in out:
            print(f"   {o['start']:6.2f}–{o['end']:6.2f}  {o['w']}")
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
