"use client";

import { FigureFrame, useParts, useUid, type Frame } from "../frame";
import { Box, ease, fitPts, frac, lerp, mv, op, path, poly, riseClip, topFace, type Pt } from "../iso";

/* A dataset tile handed through four agents (code, adjudicate, analyse, report), turning the
   corner of an L so the whole run sits square in its box, then landing as a chart whose bars rise. */
const I = fitPts([
  [-0.4, -0.4, 0],
  [6.9, -0.4, 0],
  [6.9, 7, 0],
  [4.6, 7, 0],
  [-0.4, 1.9, 0],
  [6.3, 5.3, 2.6],
  [0.3, 0.3, 2],
]);
const S = 1.5;
const NODES: Pt[] = [
  [0, 0],
  [2.5, 0],
  [5, 0],
  [5, 2.6],
];
const CHART: Pt = [5, 5.3];
const BARS = [1.1, 2, 1.5, 2.6];
const BX = (j: number) => CHART[0] + 0.1 + j * 0.38;
const TZ = 1.5;

export function SurveyAgentsFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();
  const uid = useUid();

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 9 + s * 0.08);
    // four eased hops, the last one into the chart
    const hop = Math.min(u / 0.8, 1) * 4;
    const i = Math.min(Math.floor(hop), 3);
    const g = ease(0.4, 1, hop - i);
    const pts: Pt[] = [...NODES, CHART];
    const x = lerp(pts[i][0], pts[i + 1][0], g);
    const y = lerp(pts[i][1], pts[i + 1][1], g);
    const lift = Math.sin(Math.PI * g) * 0.5;
    const land = ease(0.8, 0.88, u);
    const fade = 1 - ease(0.86, 0.93, u) + ease(0.98, 1, u);
    mv(parts.current.tile, I.v(x - NODES[0][0], y - NODES[0][1], lift - land * 0.9), fade);
    NODES.forEach(([nx, ny], n) => {
      const d = Math.hypot(x - nx, y - ny);
      op(parts.current[`lit${n}`], Math.max(0, 1 - d / 1.3) * (1 - land));
    });
    const rise = u < 0.12 ? 1 - ease(0, 0.12, u) : ease(0.84, 0.97, u);
    BARS.forEach((h, j) => {
      const r = Math.max(ease(j * 0.04, 1, rise), 0.3);
      mv(parts.current[`bar${j}`], [0, (1 - r) * h * I.k]);
    });
  };

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        <path
          className="lo"
          d={poly(
            ([[-0.4, -0.4], [6.9, -0.4], [6.9, 7], [4.6, 7], [4.6, 1.9], [-0.4, 1.9]] as Pt[]).map(
              ([x, y]) => I.p(x, y, 0),
            ),
          )}
        />
        {!small && (
          <path
            className="nf dash"
            d={path([I.p(0.75, 0.75, 0.02), I.p(5.75, 0.75, 0.02), I.p(5.75, 5.6, 0.02)])}
          />
        )}
      </g>
      <g data-depth="1">
        {NODES.map(([nx, ny], n) => (
          <g key={n}>
            <Box I={I} x={nx} y={ny} w={S} d={S} h={0.9} />
            <path
              ref={at(`lit${n}`)}
              className="hi"
              style={{ opacity: 0 }}
              d={topFace(I, nx + 0.25, ny + 0.25, 0.9, S - 0.5, S - 0.5)}
            />
          </g>
        ))}
        {BARS.map((h, j) => (
          <g key={j}>
            <clipPath id={`${uid}b${j}`}>
              <polygon points={riseClip(I, BX(j), CHART[1], 0, 0.3, 1.2)} />
            </clipPath>
            <g clipPath={`url(#${uid}b${j})`}>
              <g ref={at(`bar${j}`)}>
                <Box I={I} x={BX(j)} y={CHART[1]} w={0.3} d={1.2} h={h} top={j === 3 ? "hi" : "edge"} />
              </g>
            </g>
          </g>
        ))}
      </g>
      <g data-depth="2">
        <g ref={at("tile")}>
          <path className="edge" d={topFace(I, 0.3, 0.3, TZ, 0.9, 0.9)} />
          {!small &&
            [0.3, 0.6].map((f) => (
              <path
                key={f}
                className="nf lo"
                d={path([I.p(0.3 + f, 0.3, TZ), I.p(0.3 + f, 1.2, TZ)])}
              />
            ))}
        </g>
      </g>
    </FigureFrame>
  );
}
