"""Source images for scripts/paint-backgrounds.sh.

Public-domain and CC0 photos in scripts/paint-src (credits in public/paint/SOURCES.md),
cropped to the hero's aspect: 2:1 for the first 8 scenes, 16:10 (the screen's shape) for the
rest, so nothing above or below the subject is lost. Colours are left as shot.
Usage: paint-sources.py OUTDIR  writes OUTDIR/<scene>.png for every photo
"""
import os
import sys

from PIL import Image, ImageOps

HERE = os.path.join(os.path.dirname(__file__), "paint-src")
out = sys.argv[1]
WIDE = {"mesas", "saguaros", "aurora", "ocean", "blackhole", "canyon", "flock", "reef"}
for f in sorted(os.listdir(HERE)):
    if f.endswith(".jpg"):
        size = (512, 256) if f[:-4] in WIDE else (512, 320)
        img = ImageOps.fit(Image.open(os.path.join(HERE, f)).convert("RGB"), size)
        img.save(os.path.join(out, f[:-4] + ".png"))
