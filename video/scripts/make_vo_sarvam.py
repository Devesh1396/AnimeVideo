"""Sarvam Bulbul voice for reel v2.

Usage:  python scripts/make_vo_sarvam.py 1          (slide 1 only)
        python scripts/make_vo_sarvam.py 1 2 3 ...  (any slides)
        python scripts/make_vo_sarvam.py all
Needs SARVAM_API_KEY. Writes public/audio/vo/v2/s<N>.wav (44.1 kHz) and appends
each request (characters sent) to scripts/sarvam-usage.log, to track the ₹100 budget.
"""
import base64, datetime, json, os, sys, urllib.request
from pathlib import Path

MODEL = "bulbul:v4-flash"
SPEAKER = "ishita_hi_edtech"
RATE = 44100
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "vo" / "v2"
LINES = json.loads((ROOT / "scripts" / "vo-lines-v2a.json").read_text(encoding="utf-8"))


def tts(text: str) -> bytes:
    key = os.environ.get("SARVAM_API_KEY")
    if not key:
        sys.exit("SARVAM_API_KEY is not set.")
    body = json.dumps({
        "text": text, "language_code": "hi-IN", "speaker": SPEAKER, "model": MODEL,
        "pace": 1.0, "speech_sample_rate": RATE, "output_audio_codec": "wav",
    }).encode()
    req = urllib.request.Request("https://api.sarvam.ai/text-to-speech", data=body, method="POST",
                                 headers={"api-subscription-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = json.load(r)
    return base64.b64decode(data["audios"][0])


def main():
    args = sys.argv[1:] or ["1"]
    slides = list(LINES) if args == ["all"] else args
    OUT.mkdir(parents=True, exist_ok=True)
    for s in slides:
        text = LINES[s]
        wav = tts(text)
        (OUT / f"s{s}.wav").write_bytes(wav)
        with open(ROOT / "scripts" / "sarvam-usage.log", "a", encoding="utf-8") as f:
            f.write(f"{datetime.datetime.now().isoformat(timespec='seconds')}\t{MODEL}\t{SPEAKER}\ts{s}\t{len(text)} chars\n")
        print(f"s{s}: {len(text)} chars -> {OUT / f's{s}.wav'}")


if __name__ == "__main__":
    main()
