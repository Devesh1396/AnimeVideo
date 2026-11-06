"""ElevenLabs voice for reel v2.

Usage:  python scripts/make_vo_eleven.py --model eleven_v4 1          (slide 1)
        python scripts/make_vo_eleven.py --model eleven_v4 all
        python scripts/make_vo_eleven.py --model eleven_v3 --suffix _v3 1   (a test take)
The API key goes in the xi-api-key header. In the cloud session the network proxy adds it, so
ELEVENLABS_API_KEY can be any placeholder there; on Windows set it to the real key.
Writes public/audio/vo/v2/s<N><suffix>.mp3 + .wav (44.1 kHz mono) and logs characters used
to scripts/elevenlabs-usage.log.
"""
import argparse, datetime, json, os, subprocess, urllib.request
from pathlib import Path

VOICE = "C2S5J6WvmHnrQWjUu6Rg"   # Kanika - Warm, Expressive and Natural (Voice Library)
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "vo" / "v2"
LINES = json.loads((ROOT / "scripts" / "vo-lines-v2a.json").read_text(encoding="utf-8"))


def tts(text: str, model: str) -> bytes:
    body = json.dumps({"text": text, "model_id": model, "language_code": "hi"}).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128",
        data=body, method="POST",
        headers={"xi-api-key": os.environ.get("ELEVENLABS_API_KEY", "proxy-injected"),
                 "Content-Type": "application/json", "Accept": "audio/mpeg"})
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            return r.read()
    except urllib.error.HTTPError as e:
        raise SystemExit(f"ElevenLabs {e.code}: {e.read().decode(errors='replace')}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="eleven_v4")
    ap.add_argument("--suffix", default="")
    ap.add_argument("slides", nargs="*", default=["1"])
    a = ap.parse_args()
    slides = list(LINES) if a.slides == ["all"] else a.slides
    OUT.mkdir(parents=True, exist_ok=True)
    for s in slides:
        text = LINES[s]
        mp3 = OUT / f"s{s}{a.suffix}.mp3"
        mp3.write_bytes(tts(text, a.model))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(mp3), "-ac", "1", "-ar", "44100",
                        str(mp3.with_suffix(".wav"))], check=True)
        with open(ROOT / "scripts" / "elevenlabs-usage.log", "a", encoding="utf-8") as f:
            f.write(f"{datetime.datetime.now().isoformat(timespec='seconds')}\t{a.model}\t{VOICE}\t"
                    f"s{s}{a.suffix}\t{len(text)} chars\n")
        print(f"s{s}{a.suffix}: {len(text)} chars, {a.model} -> {mp3.with_suffix('.wav')}")


if __name__ == "__main__":
    main()
