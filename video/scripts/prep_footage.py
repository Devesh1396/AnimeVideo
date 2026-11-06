"""Copy the delivered clips into public/footage/ (gitignored) so Remotion can load them with staticFile().
Run once after a fresh checkout:  python scripts/prep_footage.py   (Windows: .venv\\Scripts\\python ...)"""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "source" / "Footages"
DST = ROOT / "public" / "footage"
CLIPS = {"C1.mp4": "c1.mp4", "C3.mp4": "c3.mp4", "c4-part2.mp4": "c4.mp4", "c5.mp4": "c5.mp4", "c8.mp4": "c8.mp4"}
DST.mkdir(parents=True, exist_ok=True)
for a, b in CLIPS.items():
    shutil.copyfile(SRC / a, DST / b)
    print(f"{SRC / a} -> {DST / b}")
