"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, mv, op, poly, topFace, type Pt } from "../iso";

/* A scanned receipt whose item lines peel off to the person who ordered them.
   Steak to one, salad to another: nobody splits 50/50. */
const I = fit(9.5, 6, 2.6);
const ITEMS = [0, 1, 2, 3, 4];
const OWNER = [0, 1, 2, 0, 1];
const PEOPLE: Pt[] = [
  [7.6, 0.4],
  [7.6, 2.4],
  [7.6, 4.4],
];
const itemAt = (i: number): Pt => [0.5, 0.7 + i * 0.75];

export function PrismSplitFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const glow = [0, 0, 0];
    ITEMS.forEach((i) => {
      const u = frac(t / 7 - i * 0.17 + s * 0.1);
      const f = u < 0.6 ? ease(0.1, 0.6, u) : 0;
      const o = u < 0.6 ? 1 - ease(0.5, 0.6, u) : ease(0.85, 1, u);
      const [ix, iy] = itemAt(i);
      const [px, py] = PEOPLE[OWNER[i]];
      const [dx, dy] = I.v((px - 0.3 - ix) * f, (py + 0.2 - iy) * f, Math.sin(Math.PI * f) * 1.4 + f * 1.2);
      mv(parts.current[`item${i}`], [dx, dy], o);
      op(parts.current[`gap${i}`], u < 0.6 ? ease(0.1, 0.2, u) : 1 - ease(0.85, 1, u));
      glow[OWNER[i]] = Math.max(glow[OWNER[i]], ease(0.45, 0.58, u) * (1 - ease(0.6, 0.8, u)));
    });
    glow.forEach((g, n) => op(parts.current[`head${n}`], 0.25 + 0.75 * g));
  };

  // receipt outline with a torn zigzag along the near edge
  const R = I.p;
  const tear: Pt[] = [];
  for (let k = 0; k <= 8; k++) tear.push(R(3 - k * 0.375, 4.6 + (k % 2 ? 0.22 : 0), 0.05));
  const receipt = poly([R(0, 0, 0.05), R(3, 0, 0.05), ...tear]);

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="0.4">
        <path className="edge" d={receipt} />
        <path className="nf lo" d={poly([R(0.5, 4.25, 0.05), R(2.5, 4.25, 0.05)])} />
        {ITEMS.map((i) => {
          const [ix, iy] = itemAt(i);
          return (
            <path
              key={i}
              ref={at(`gap${i}`)}
              className="nf dash"
              d={topFace(I, ix, iy, 0.05, 2, 0.35)}
            />
          );
        })}
      </g>
      <g data-depth="1">
        {PEOPLE.map(([px, py], n) => (
          <g key={n}>
            <Box I={I} x={px} y={py} w={0.9} d={0.9} h={1.1} />
            <Disc I={I} x={px + 0.45} y={py + 0.45} z={1.5} r={0.32} className="edge" />
            <g ref={at(`head${n}`)} style={{ opacity: 0.25 }}>
              <Disc I={I} x={px + 0.45} y={py + 0.45} z={1.5} r={0.18} className="dot" />
            </g>
          </g>
        ))}
      </g>
      <g data-depth="1.8">
        {ITEMS.map((i) => {
          const [ix, iy] = itemAt(i);
          const w = [1.6, 1.1, 1.4, 0.9, 1.2][i];
          return (
            <g key={i} ref={at(`item${i}`)}>
              <path className={i === 0 ? "hi" : "edge"} d={topFace(I, ix, iy, 0.12, 2, 0.35)} />
              <path className="nf mid" d={poly([R(ix + 0.15, iy + 0.18, 0.12), R(ix + 0.15 + w * 0.6, iy + 0.18, 0.12)])} />
              <Disc I={I} x={ix + 1.75} y={iy + 0.18} z={0.12} r={0.08} className="dot" />
            </g>
          );
        })}
      </g>
    </FigureFrame>
  );
}
