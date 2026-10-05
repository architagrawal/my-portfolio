"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fitPts, frac, lerp, mv, op, path, topFace, type Pt } from "../iso";

/* A feature branch heading for main. Repo context, the ticket and CI results converge on the
   pull request, and the review lands above it as comments with a verdict. */
const BOUNDS_FULL: [number, number, number][] = [
  [0, 3, 0],
  [8.4, 3, 0],
  [7.1, 0, 0.3],
  [8, 5.5, 0],
  [2.1, 5.5, 0],
  [2.1, 4.6, 0.8],
  [4.5, 2.2, 2.1],
];
const BOUNDS_SMALL: [number, number, number][] = [
  [0, 3, 0],
  [8.4, 3, 0],
  [2, 1.3, 0],
  [6, 3.6, 0],
  [4.5, 2.2, 2.1],
  [6.3, 2.2, 2.1],
];
const MAIN_Y = 3;
const BRANCH: Pt[] = [
  [1, MAIN_Y],
  [2, 1.3],
  [4.4, 1.3],
  [5.4, MAIN_Y],
];
const PR: Pt = [5.4, MAIN_Y];
const PB = 1.2;
const SOURCES: { at: Pt; z: number }[] = [
  { at: [7.6, 0.6], z: 0.3 }, // ticket
  { at: [7.5, 5], z: 0.8 }, // CI
  { at: [2.6, 5], z: 0.7 }, // repo context
];
const REVIEW_Z = 2.1;

function along(pts: Pt[], f: number): Pt {
  const k = Math.min(Math.floor(f * (pts.length - 1)), pts.length - 2);
  const g = f * (pts.length - 1) - k;
  return [lerp(pts[k][0], pts[k + 1][0], g), lerp(pts[k][1], pts[k + 1][1], g)];
}

export function PrReviewFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();
  const I = fitPts(small ? BOUNDS_SMALL : BOUNDS_FULL);

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 8 + s * 0.08);
    const [hx, hy] = along(BRANCH, ease(0.02, 0.36, u));
    mv(parts.current.head, I.v(hx - BRANCH[0][0], hy - BRANCH[0][1]), 1 - ease(0.34, 0.4, u) + ease(0.97, 1, u));
    SOURCES.forEach(({ at: [sx, sy], z }, i) => {
      const f = ease(0.3 + i * 0.07, 0.58 + i * 0.07, u);
      const o = ease(0, 0.08, f) * (1 - ease(0.85, 1, f));
      mv(parts.current[`c${i}`], I.v((PR[0] - sx) * f, (PR[1] - sy) * f, (REVIEW_Z - 0.4 - z) * f), o);
    });
    const review = ease(0.64, 0.76, u) * (1 - ease(0.93, 1, u));
    mv(parts.current.review, I.v(0, 0, (1 - review) * -0.5), review);
    op(parts.current.verdict, ease(0.76, 0.82, u) * (1 - ease(0.93, 1, u)));
    op(parts.current.merge, 0.35 + 0.65 * ease(0.34, 0.42, u) * (1 - ease(0.93, 1, u)));
  };

  const [cx, cy] = [PR[0] - 0.9, PR[1] - 0.8];

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        <path className="nf edge" d={path([I.p(0, MAIN_Y, 0), I.p(8.4, MAIN_Y, 0)])} />
        <path className="nf mid" d={path(BRANCH.map(([x, y]) => I.p(x, y, 0)))} />
        {(small ? [1, 7.4] : [1, 3, 7.4]).map((x) => (
          <Disc key={x} I={I} x={x} y={MAIN_Y} r={0.16} className="dot m" />
        ))}
        {!small && <Disc I={I} x={3.2} y={1.3} r={0.13} className="dot m" />}
      </g>
      <g data-depth="1">
        {!small && (
          <>
            <path className="edge ft" d={topFace(I, SOURCES[0].at[0] - 0.5, 0, 0.3, 1, 1.2)} />
            {[0.35, 0.7].map((d) => (
              <path key={d} className="nf lo" d={path([I.p(7.25, d, 0.3), I.p(7.9, d, 0.3)])} />
            ))}
            <Box I={I} x={7} y={4.6} w={1} d={0.9} h={0.8} />
            {[0, 1, 2].map((k) => (
              <Box key={k} I={I} x={2.1} y={4.6} z={k * 0.26} w={1} d={0.9} h={0.16} />
            ))}
          </>
        )}
        <Box I={I} x={PR[0] - PB / 2} y={PR[1] - PB / 2} w={PB} d={PB} h={0.4} />
        <g ref={at("merge")} style={{ opacity: 0.35 }}>
          <path className="hi" d={topFace(I, PR[0] - PB / 2, PR[1] - PB / 2, 0.4, PB, PB)} />
        </g>
      </g>
      <g data-depth="1.6">
        <g ref={at("head")}>
          <Disc I={I} x={BRANCH[0][0]} y={BRANCH[0][1]} r={0.22} className="dot" />
        </g>
        {!small &&
          SOURCES.map(({ at: [sx, sy], z }, i) => (
            <g key={i} ref={at(`c${i}`)} style={{ opacity: 0 }}>
              <Disc I={I} x={sx} y={sy} z={z} r={0.13} className="dot m" />
            </g>
          ))}
        <g ref={at("review")} style={{ opacity: 0 }}>
          <path className="edge ft" d={topFace(I, cx, cy, REVIEW_Z, 1.8, 1.6)} />
          {(small ? [0.55, 1.05] : [0.4, 0.8, 1.2]).map((d, k) => (
            <path
              key={d}
              className="nf mid"
              d={path([I.p(cx + 0.25, cy + d, REVIEW_Z), I.p(cx + 1.1 - k * 0.2, cy + d, REVIEW_Z)])}
            />
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
