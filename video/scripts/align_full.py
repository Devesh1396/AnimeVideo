"""Align one continuous VO file (all 7 lines) to the script.

Usage: python scripts/align_full.py [--model large-v3-turbo] [--audio public/audio/vo/v2/Audio-gen.mp3]
Transcribes with faster-whisper (language hi, word_timestamps=True, the script as initial_prompt),
maps every recognised word back onto the script words (difflib), and writes
src/vo-timings-v2.json: {"source": <file>, "lines": {"s1": {"start", "end", "words": [{"w", "start", "end", "heard"}]}}}
Times are seconds in the source file. Prints each line's span, the pauses between lines, and every
script word that wasn't heard as written (English words written in Devanagari are listed apart).
"""
import argparse, difflib, json, re, subprocess, unicodedata
import numpy as np
from pathlib import Path
from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parent.parent
LINES = json.loads((ROOT / "scripts" / "vo-lines-v2a.json").read_text(encoding="utf-8"))
OUT = ROOT / "src" / "vo-timings-v2.json"


def norm(w):
    w = unicodedata.normalize("NFC", w).lower().replace("\u093c", "")  # nukta
    w = w.replace("\u0901", "\u0902")                                  # chandrabindu ~ anusvara
    return re.sub(r"[^\w\u0900-\u0963\u0966-\u097f]", "", w)          # drop danda and punctuation


class W:  # a heard word, possibly split from a digit token
    def __init__(self, word, start, end):
        self.word, self.start, self.end = word, start, end


# How whisper writes some script words (digits, English in Devanagari). Used for matching only;
# the printed "heard" text stays as whisper wrote it, so a real slip still shows.
NUMBERS = {"60": ["sixty"], "500": ["five", "hundred"]}
SAME = {"रुपीज": "rupees", "एक्सपिरियन्स": "experience", "ज्यानी": "giane", "शुरुवात": "शुरुआत",
        "पाईए": "पाइए"}
JOIN = {("guru", "कुल"): "gurukull", ("लिख", "कर"): "लिखकर"}


def expand(heard):
    out = []
    for h in heard:
        n = norm(h.word)
        if n in NUMBERS:
            parts = NUMBERS[n]
            d = (h.end - h.start) / len(parts)
            out += [W(p, h.start + i * d, h.start + (i + 1) * d) for i, p in enumerate(parts)]
        elif out and (norm(out[-1].word), n) in JOIN:
            out[-1] = W(JOIN[(norm(out[-1].word), n)], out[-1].start, h.end)
        else:
            out.append(W(SAME.get(n, h.word), h.start, h.end) if n in SAME else h)
    return out


def words(text):
    return [w for w in re.split(r"[\s\-]+", text) if norm(w)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="large-v3-turbo")
    ap.add_argument("--audio", default="public/audio/vo/v2/Audio-gen.mp3")
    a = ap.parse_args()
    src = ROOT / a.audio
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    audio = np.frombuffer(pcm, dtype=np.float32)
    script = " ".join(LINES.values())
    model = WhisperModel(a.model, device="cpu", compute_type="int8")
    segs, _ = model.transcribe(audio, language="hi", word_timestamps=True, initial_prompt=script,
                               beam_size=5, condition_on_previous_text=True, vad_filter=False)
    heard = expand([w for s in segs for w in s.words if norm(w.word)])
    sw, sid = [], []
    for k, t in LINES.items():
        for w in words(t):
            sw.append(w); sid.append(k)
    sm = difflib.SequenceMatcher(a=[norm(w) for w in sw], b=[norm(h.word) for h in heard], autojunk=False)
    out = [None] * len(sw)
    mism, translit = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        for k in range(i2 - i1):
            i = i1 + k
            hw = heard[j1 + k] if j1 + k < j2 else None
            if hw:
                out[i] = {"w": sw[i], "start": round(hw.start, 3), "end": round(hw.end, 3), "heard": hw.word.strip()}
            if tag != "equal":
                h = hw.word.strip() if hw else "—"
                if hw and re.search(r"[A-Za-z]", sw[i]) and re.search(r"[ऀ-ॿ]", h):
                    translit.append((f"s{sid[i]}", sw[i], h))
                else:
                    mism.append((f"s{sid[i]}", sw[i], h, round(hw.start, 2) if hw else None))
        if (j2 - j1) > (i2 - i1):
            for h in heard[j1 + (i2 - i1):j2]:
                mism.append((f"s{sid[min(i2, len(sid) - 1)]}", "—", h.word.strip(), round(h.start, 2)))
    for i, o in enumerate(out):
        if o is None:
            prev = next((out[j]["end"] for j in range(i - 1, -1, -1) if out[j]), 0.0)
            nxt = next((out[j]["start"] for j in range(i + 1, len(out)) if out[j]), prev)
            out[i] = {"w": sw[i], "start": prev, "end": nxt, "heard": None}
    lines = {}
    for i, o in enumerate(out):
        L = lines.setdefault(f"s{sid[i]}", {"words": []})
        L["words"].append(o)
    # Line edges: snap each boundary between lines to the middle of the nearest real pause
    # (ffmpeg silencedetect), so a cut never clips a word.
    sil = subprocess.run(["ffmpeg", "-v", "info", "-i", str(src), "-af", "silencedetect=noise=-40dB:d=0.2",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", sil)]
    en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", sil)]
    pauses = list(zip(st, en))
    keys = list(lines)
    for k, L in lines.items():
        L["start"], L["end"] = L["words"][0]["start"], L["words"][-1]["end"]
    for a_, b_ in zip(keys, keys[1:]):
        t = lines[b_]["start"]
        p0, p1 = min(pauses, key=lambda p: abs((p[0] + p[1]) / 2 - t))
        lines[a_]["end"], lines[b_]["start"] = round(p0, 3), round(p1, 3)
        lines[a_]["words"][-1]["end"] = min(lines[a_]["words"][-1]["end"], round(p0, 3))
        lines[b_]["words"][0]["start"] = max(lines[b_]["words"][0]["start"], round(p1, 3))
    lines[keys[-1]]["end"] = min(lines[keys[-1]]["end"], len(audio) / 16000)
    OUT.write_text(json.dumps({"source": a.audio, "model": a.model, "lines": lines}, ensure_ascii=False, indent=1),
                   encoding="utf-8")
    print("HEARD:", " ".join(h.word.strip() for h in heard))
    prev = None
    for k, L in lines.items():
        gap = f"  (pause before: {L['start'] - prev:.2f} s)" if prev is not None else ""
        print(f"{k}: {L['start']:6.2f} – {L['end']:6.2f}  ({L['end'] - L['start']:.2f} s){gap}")
        prev = L["end"]
    print("MISMATCHES (line, script, heard, at):", mism or "none")
    print("ENGLISH WORDS HEARD IN DEVANAGARI:", translit or "none")


if __name__ == "__main__":
    main()
