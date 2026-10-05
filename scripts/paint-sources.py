"""Source images for scripts/paint-backgrounds.sh.

Public-domain and CC0 photos in scripts/paint-src (credits in public/paint/SOURCES.md),
cropped to 2:1 so primitive paints them at the hero's aspect. Colours are left as shot.
Usage: paint-sources.py OUTDIR  writes OUTDIR/<scene>.png for every photo
"""
import os
import sys

from PIL import Image, ImageOps

HERE = os.path.join(os.path.dirname(__file__), "paint-src")
out = sys.argv[1]
for f in sorted(os.listdir(HERE)):
    if f.endswith(".jpg"):
        img = ImageOps.fit(Image.open(os.path.join(HERE, f)).convert("RGB"), (512, 256))
        img.save(os.path.join(out, f[:-4] + ".png"))
