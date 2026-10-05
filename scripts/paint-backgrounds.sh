#!/usr/bin/env bash
# Painted page backgrounds with fogleman/primitive (photo -> N shapes -> SVG).
# Shapes are written coarse to fine, and components/site/scene.tsx replays them in that
# order so the visitor watches the picture get painted.
# Needs: go install github.com/fogleman/primitive@latest, python3 with Pillow.
# Usage: scripts/paint-backgrounds.sh   writes public/paint/<scene>.svg
set -euo pipefail
cd "$(dirname "$0")/.."
PRIMITIVE="${PRIMITIVE:-$HOME/go/bin/primitive}"
SRC="$(mktemp -d)"
OUT=public/paint
mkdir -p "$OUT"
python3 scripts/paint-sources.py "$SRC"

# scene shapes mode (0 = mixed, 1 = triangles, 8 = polygons); alpha 200 keeps the texture
paint() {
  "$PRIMITIVE" -i "$SRC/$1.png" -o "$OUT/$1.svg" -n "$2" -m "$3" -a 200 -r 256 -s 1024
  # 3 decimals -> 1, roughly a third smaller with no visible change
  sed -E -i.bak 's/([0-9]+\.[0-9])[0-9]+/\1/g' "$OUT/$1.svg" && rm "$OUT/$1.svg.bak"
}
paint mesas 130 8
paint saguaros 130 8
paint aurora 130 0
paint ocean 130 8
paint blackhole 130 0
paint canyon 180 8
paint flock 130 8
paint reef 130 8

rm -rf "$SRC"
ls -l "$OUT"
