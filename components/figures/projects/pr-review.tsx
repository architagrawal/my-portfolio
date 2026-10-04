"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, lerp, mv, op, path, topFace, type Pt } from "../iso";

/* A feature branch heading for main. Repo context, the ticket and CI results converge on the
   pull request, and the review lands as comments with a verdict. */
const I = fit(10, 6, 3);
const MAIN_Y = 3.4;
const BRANCH: Pt[] = [
  [1.6, MAIN_Y],
  [2.6, 1.6],
  [5.6, 1.6],
  [6.8, MAIN_Y],
];
const PR: Pt = [6.8, MAIN_Y];
const SOURCES: { at: Pt; z: number }[] = [
  { at: [9.4, 0.4], z: 0.5 }, // ticket
  { at: [9.4, 5.2], z: 0.9 }, // CI
  { at: [3.6, 5.4], z: 0.8 }, // repo context
];
const REVIEW_Z = 2.2;

function along(pts: Pt[], f: number): Pt {
  const k = Math.min(Math.floor(f * (pts.length - 1)), pts.length - 2);
  const g = f * (pts.length - 1) - k;
  return [lerp(pts[k][0], pts[k + 1][0], g), lerp(pts[k][1], pts[k + 1][1], g)];
}

export function PrReviewFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 7 + s * 0.1);
    const [hx, hy] = along(BRANCH, ease(0, 0.35, u));
    mv(parts.current.head, I.v(hx - BRANCH[0][0], hy - BRANCH[0][1]));
    SOURCES.forEach(({ at: [sx, sy], z }, i) => {
      const f = ease(0.3 + i * 0.06, 0.6 + i * 0.06, u);
      const on = f > 0 && f < 1 ? 1 : 0;
      mv(parts.current[`c${i}`], I.v((PR[0] - sx) * f, (PR[1] - sy) * f, (REVIEW_Z - z) * f), on);
    });
    const review = ease(0.62, 0.72, u) * (1 - ease(0.94, 1, u));
    mv(parts.current.review, I.v(0, 0, (1 - review) * -0.6), review);
    op(parts.current.verdict, ease(0.75, 0.8, u) * (1 - ease(0.94, 1, u)));
  };

  const [cx, cy] = [PR[0] - 0.9, PR[1] - 0.8];

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="0.4">
        <path className="nf edge" d={path([I.p(0, MAIN_Y, 0), I.p(10, MAIN_Y, 0)])} />
        <path className="nf mid" d={path(BRANCH.map(([x, y]) => I.p(x, y, 0)))} />
        {[0.6, 1.6, 4.1, 8.4].map((x) => (
          <Disc key={x} I={I} x={x} y={MAIN_Y} r={0.14} className="dot m" />
        ))}
        {[3.6, 4.6].map((x) => (
          <Disc key={x} I={I} x={x} y={1.6} r={0.12} className="dot m" />
        ))}
        <Disc I={I} x={PR[0]} y={PR[1]} r={0.3} className="nf hi" />
      </g>
      <g data-depth="1">
        <path className="edge" d={topFace(I, 9, 0, 0.5, 1, 1.2)} />
        {[0.3, 0.6].map((d) => (
          <path key={d} className="nf lo" d={path([I.p(9.15, d, 0.5), I.p(9.8, d, 0.5)])} />
        ))}
        <Box I={I} x={9} y={4.8} w={1} d={0.9} h={0.9} />
        {[0, 1, 2].map((k) => (
          <Disc key={k} I={I} x={9.2 + k * 0.3} y={5.25} z={0.9} r={0.08} className={k === 2 ? "dot m" : "dot"} />
        ))}
        {[0, 1, 2].map((k) => (
          <Box key={k} I={I} x={3.2} y={5} z={k * 0.28} w={1} d={0.9} h={0.18} />
        ))}
      </g>
      <g data-depth="1.6">
        <g ref={at("head")}>
          <Disc I={I} x={BRANCH[0][0]} y={BRANCH[0][1]} r={0.2} className="dot" />
        </g>
        {SOURCES.map(({ at: [sx, sy], z }, i) => (
          <g key={i} ref={at(`c${i}`)} style={{ opacity: 0 }}>
            <Disc I={I} x={sx + 0.5} y={sy} z={z} r={0.13} className="dot" />
          </g>
        ))}
        <g ref={at("review")} style={{ opacity: 0 }}>
          <path className="edge" d={topFace(I, cx, cy, REVIEW_Z, 1.8, 1.6)} />
          {[0.4, 0.8, 1.2].map((d, k) => (
            <path key={d} className="nf mid" d={path([I.p(cx + 0.25, cy + d, REVIEW_Z), I.p(cx + 1.1 - k * 0.2, cy + d, REVIEW_Z)])} />
          ))}
          <path
            ref={at("verdict")}
            className="nf hi"
            d={path([I.p(cx + 1.3, cy + 0.6, REVIEW_Z), I.p(cx + 1.45, cy + 0.85, REVIEW_Z), I.p(cx + 1.65, cy + 0.3, REVIEW_Z)])}
          />
        </g>
      </g>
    </FigureFrame>
  );
}
