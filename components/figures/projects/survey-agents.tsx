"use client";

import { FigureFrame, useParts, useUid, type Frame } from "../frame";
import { Box, ease, fit, frac, mv, op, path, riseClip, topFace } from "../iso";

/* A dataset tile handed through four agents (code, adjudicate, analyse, report),
   landing as a chart whose bars rise when it arrives. */
const I = fit(13, 4, 3.4);
const NODES = [0, 1, 2, 3].map((i) => 0.4 + i * 2.3);
const BARS = [1.1, 2.1, 1.5, 2.8];
const BX = (j: number) => 9.9 + j * 0.75;

export function SurveyAgentsFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();
  const uid = useUid();

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 8 + s * 0.12);
    const hop = Math.min(u / 0.78, 1) * 3;
    const i = Math.floor(hop);
    const x = NODES[Math.min(i, 3)] + ease(0.35, 1, frac(hop)) * (i < 3 ? 2.3 : 0);
    const land = ease(0.78, 0.92, u);
    const dx = x - NODES[0] + land * (BX(1) - NODES[3]);
    mv(parts.current.tile, I.v(dx, 0, -land * 1.1), 1 - ease(0.88, 0.96, u) + ease(0.98, 1, u));
    NODES.forEach((nx, n) => op(parts.current[`lit${n}`], Math.max(0, 1 - Math.abs(x - nx) / 1.4) * (1 - land)));
    const rise = u < 0.1 ? 1 - ease(0, 0.1, u) : ease(0.86, 0.97, u);
    BARS.forEach((h, j) => mv(parts.current[`bar${j}`], [0, (1 - Math.max(rise, 0.35)) * h * I.k * (0.6 + j * 0.08)]));
  };

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="0.4">
        <path className="lo" d={topFace(I, -0.3, 0.2, 0, 13.3, 3.6)} />
        <path className="nf dash" d={path([I.p(0, 2, 0.02), I.p(9.6, 2, 0.02)])} />
      </g>
      <g data-depth="1">
        {NODES.map((nx, n) => (
          <g key={n}>
            <Box I={I} x={nx} y={1.2} w={1.4} d={1.6} h={0.9} />
            <path ref={at(`lit${n}`)} className="nf hi" style={{ opacity: 0 }} d={topFace(I, nx + 0.2, 1.4, 0.9, 1, 1.2)} />
          </g>
        ))}
        {BARS.map((h, j) => (
          <g key={j}>
            <clipPath id={`${uid}b${j}`}>
              <polygon points={riseClip(I, BX(j), 1.4, 0, 0.5, 1.2)} />
            </clipPath>
            <g clipPath={`url(#${uid}b${j})`}>
              <g ref={at(`bar${j}`)}>
                <Box I={I} x={BX(j)} y={1.4} w={0.5} d={1.2} h={h} top="hi" />
              </g>
            </g>
          </g>
        ))}
      </g>
      <g data-depth="2">
        <g ref={at("tile")}>
          <path className="edge" d={topFace(I, NODES[0] + 0.2, 1.5, 1.6, 1, 1)} />
          {[0.33, 0.66].map((f) => (
            <path key={f} className="nf lo" d={path([I.p(NODES[0] + 0.2 + f, 1.5, 1.6), I.p(NODES[0] + 0.2 + f, 2.5, 1.6)])} />
          ))}
          {[0.33, 0.66].map((f) => (
            <path key={`r${f}`} className="nf lo" d={path([I.p(NODES[0] + 0.2, 1.5 + f, 1.6), I.p(NODES[0] + 1.2, 1.5 + f, 1.6)])} />
          ))}
        </g>
      </g>
    </FigureFrame>
  );
}
