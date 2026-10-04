#!/usr/bin/env bash
# Painted section backgrounds with fogleman/primitive (image -> N shapes -> SVG).
# Needs: go install github.com/fogleman/primitive@latest, python3 with Pillow.
# Usage: scripts/paint-backgrounds.sh   writes public/paint/{hero,projects,work}.svg
set -euo pipefail
cd "$(dirname "$0")/.."
PRIMITIVE="${PRIMITIVE:-$HOME/go/bin/primitive}"
SRC="$(mktemp -d)"
OUT=public/paint
mkdir -p "$OUT"
python3 scripts/paint-sources.py "$SRC"

# name shapes mode (1 = triangles, 0 = mixed)
paint() {
  "$PRIMITIVE" -i "$SRC/$1.png" -o "$OUT/$1.svg" -n "$2" -m "$3" -r 256 -s 1024 -a 0
  # 3 decimals -> 1, roughly a third smaller with no visible change
  sed -E -i.bak 's/([0-9]+\.[0-9])[0-9]+/\1/g' "$OUT/$1.svg" && rm "$OUT/$1.svg.bak"
}
paint hero 200 1
paint projects 120 1
paint work 150 0

rm -rf "$SRC"
ls -l "$OUT"
