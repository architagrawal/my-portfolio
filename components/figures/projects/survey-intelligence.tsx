"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, clamp, ease, fit, frac, mv, op, path, topFace } from "../iso";

/* Four platform layers built in sequence, each one gated on its exit criteria before the next
   starts. A department's survey drops in on top once the stack is ready. */
const I = fit(6.4, 5.4, 6.2);
const LAYERS = [0, 1, 2, 3];
const LZ = 1.25;

export function SurveyIntelligenceFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 8);
    const spread = 0.15 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.6)) + clamp(s, -1, 1) * 0.15;
    LAYERS.forEach((i) => {
      mv(parts.current[`L${i}`], I.v(0, 0, i * spread));
      const on = ease(0.1 + i * 0.15, 0.16 + i * 0.15, u) * (1 - ease(0.92, 1, u));
      op(parts.current[`lit${i}`], on);
      op(parts.current[`gate${i}`], 0.2 + 0.8 * on);
    });
    const drop = ease(0.72, 0.86, u);
    mv(parts.current.survey, I.v(0, 0, (1 - drop) * 2 + 3 * spread), drop * (1 - ease(0.92, 1, u)));
  };

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="1">
        {LAYERS.map((i) => (
          <g key={i} ref={at(`L${i}`)}>
            <Box I={I} x={0} y={0} z={i * LZ} w={5.4} d={4.6} h={0.3} />
            {Array.from({ length: i + 1 }, (_, k) => (
              <path
                key={k}
                className="nf lo"
                d={path([I.p(0.6, 0.8 + k * 0.7, i * LZ + 0.3), I.p(3.4, 0.8 + k * 0.7, i * LZ + 0.3)])}
              />
            ))}
            <path ref={at(`lit${i}`)} className="nf hi" style={{ opacity: 0 }} d={topFace(I, 0.25, 0.25, i * LZ + 0.3, 4.9, 4.1)} />
            <g ref={at(`gate${i}`)} style={{ opacity: 0.2 }}>
              <Disc I={I} x={4.7} y={3.9} z={i * LZ + 0.3} r={0.18} className="dot" />
            </g>
          </g>
        ))}
      </g>
      <g data-depth="1.8">
        <g ref={at("survey")} style={{ opacity: 0 }}>
          <path className="edge" d={topFace(I, 1.6, 1.4, 3 * LZ + 0.35, 1.6, 1.8)} />
          {[0.5, 0.9, 1.3].map((d) => (
            <path key={d} className="nf mid" d={path([I.p(1.85, 1.4 + d, 3 * LZ + 0.35), I.p(2.9, 1.4 + d, 3 * LZ + 0.35)])} />
          ))}
        </g>
      </g>
    </FigureFrame>
  );
}
