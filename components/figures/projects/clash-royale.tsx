"use client";

import { FigureFrame, useParts, useUid, type Frame } from "../frame";
import { Box, ease, fit, frac, mv, op, poly, riseClip, topFace } from "../iso";

/* A clan as a field of towers, one per member, height by trophies.
   Weekly battle data reloads and the towers settle to new heights; the leader wears the crown. */
const I = fit(8.2, 5, 3.6);
const TOWERS = [3.2, 2.4, 2.9, 1.8, 2.1, 1.5, 2.6, 1.2, 2, 1.6].map((h, n) => ({
  h,
  x: 0.4 + (n % 5) * 1.55,
  y: 0.5 + Math.floor(n / 5) * 2.3,
  n,
}));
// paint back to front
const ORDER = [...TOWERS].sort((a, b) => a.x + a.y - (b.x + b.y));
const LEAD = TOWERS[0];

export function ClashRoyaleFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();
  const uid = useUid();

  const tick = ({ t, s }: Frame) => {
    const sweep = frac(t / 6 + s * 0.15) * 9 - 1.5;
    TOWERS.forEach(({ h, x, n }) => {
      const breathe = 0.84 + 0.16 * Math.sin(t * 0.8 - n * 0.9 + s * 2.5);
      mv(parts.current[`t${n}`], [0, (1 - breathe) * h * I.k]);
      op(parts.current[`l${n}`], Math.max(0, 1 - Math.abs(x - sweep) / 1.2));
    });
    const lift = 0.84 + 0.16 * Math.sin(t * 0.8 + s * 2.5);
    mv(parts.current.crown, [0, (1 - lift) * LEAD.h * I.k - Math.sin(t * 2) * 3]);
  };

  const P = I.p;
  const cx = LEAD.x + 0.45;
  const cy = LEAD.y + 0.45;
  const cz = LEAD.h + 0.45;

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="0.4">
        <path className="lo" d={topFace(I, 0, 0, 0, 8.2, 5)} />
      </g>
      <g data-depth="1">
        {ORDER.map(({ h, x, y, n }) => (
          <g key={n}>
            <clipPath id={`${uid}t${n}`}>
              <polygon points={riseClip(I, x, y, 0, 0.9, 0.9)} />
            </clipPath>
            <g clipPath={`url(#${uid}t${n})`}>
              <g ref={at(`t${n}`)}>
                <Box I={I} x={x} y={y} w={0.9} d={0.9} h={h} top={n === 0 ? "hi" : "edge"} />
                <path
                  ref={at(`l${n}`)}
                  className="nf hi"
                  style={{ opacity: 0 }}
                  d={topFace(I, x + 0.15, y + 0.15, h, 0.6, 0.6)}
                />
              </g>
            </g>
          </g>
        ))}
      </g>
      <g data-depth="1.6">
        <path
          ref={at("crown")}
          className="hi"
          d={poly([P(cx - 0.35, cy, cz), P(cx - 0.35, cy, cz + 0.5), P(cx - 0.15, cy, cz + 0.25), P(cx, cy, cz + 0.6), P(cx + 0.15, cy, cz + 0.25), P(cx + 0.35, cy, cz + 0.5), P(cx + 0.35, cy, cz)])}
        />
      </g>
    </FigureFrame>
  );
}
