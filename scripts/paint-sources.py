"""Abstract source images for scripts/paint-backgrounds.sh. Seeded, so reruns match."""
import random
import sys

from PIL import Image, ImageDraw, ImageFilter

INK = (17, 15, 14)  # hsl(30 8% 6%), dark background
INK2 = (38, 32, 27)
SAFFRON = (245, 142, 42)  # #F58E2A, primary
EMBER = (150, 62, 24)
W, H = 512, 256


def paint(seed, spots):
    random.seed(seed)
    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(INK2[i] * (1 - t) + INK[i] * t) for i in range(3)))
    for cx, cy, r, col in spots:
        layer = Image.new("RGB", (W, H), col)
        mask = Image.new("L", (W, H), 0)
        ImageDraw.Draw(mask).ellipse([cx - r, cy - r, cx + r, cy + r], fill=220)
        img = Image.composite(layer, img, mask.filter(ImageFilter.GaussianBlur(r * 0.9)))
    px = img.load()
    for _ in range(W * H // 6):  # grain gives the triangles edges to chase
        x, y = random.randrange(W), random.randrange(H)
        n = random.randint(-14, 14)
        px[x, y] = tuple(max(0, min(255, v + n)) for v in px[x, y])
    return img


out = sys.argv[1]
paint(1, [(410, 30, 120, SAFFRON), (290, 150, 80, EMBER), (60, 230, 70, EMBER)]).save(f"{out}/hero.png")
paint(2, [(70, 50, 100, EMBER), (460, 20, 80, SAFFRON)]).save(f"{out}/projects.png")
paint(3, [(470, 190, 110, SAFFRON), (170, 10, 80, EMBER)]).save(f"{out}/work.png")
