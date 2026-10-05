"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, mv, op, path, poly, type Pt } from "../iso";

/* A utility meter whose readings come out of an undocumented portal, pass through a stack of
   validated MCP tools, and reach an agent as structured data. */
const I = fit(10, 4.4, 3.6);
const TOOLS = [0, 1, 2];
const METER = { x: 0, y: 1.2, w: 1.6, d: 1.6, h: 2.4 };
const DIAL = { y: METER.y + 0.8, z: 1.5, r: 0.5 };
const TX = 4;
const AGENT: Pt = [8.6, 1.5];
const READ0: Pt = [1.9, 1.7];

export function SrpElectricFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const a = t * 0.8;
    mv(parts.current.needle, I.v(0, Math.cos(a) * DIAL.r * 0.75, Math.sin(a) * DIAL.r * 0.75));
    const gap = 0.35 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.45)) + s * 0.12;
    TOOLS.forEach((i) => mv(parts.current[`tool${i}`], I.v(0, 0, i * gap)));
    for (let j = 0; j < 3; j++) {
      const u = frac(t / 4.5 + j / 3);
      const f1 = ease(0, 0.4, u);
      const f2 = ease(0.55, 0.95, u);
      const x = f1 * (TX + 0.6 - READ0[0]) + f2 * (AGENT[0] - TX - 0.6);
      const z = f1 * 0.6 + Math.sin(Math.PI * f2) * 1.4 + f2 * 0.4;
      mv(parts.current[`r${j}`], I.v(x, 0, z), ease(0, 0.06, u) * (1 - ease(0.9, 1, u)));
    }
    const hit = Math.max(...[0, 1, 2].map((j) => {
      const u = frac(t / 4.5 + j / 3);
      return ease(0.85, 0.93, u) * (1 - ease(0.93, 1, u));
    }));
    op(parts.current.agentLit, 0.3 + 0.7 * hit);
    op(parts.current.check, ease(0.3, 0.5, frac(t / 4.5)) * 0.6 + 0.4);
  };

  const ring = Array.from({ length: 28 }, (_, k): Pt => {
    const a = (k / 28) * Math.PI * 2;
    return I.p(METER.w, DIAL.y + Math.cos(a) * DIAL.r, DIAL.z + Math.sin(a) * DIAL.r);
  });
  const [nx, ny] = I.p(METER.w, DIAL.y, DIAL.z);

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        {!small && <path className="nf dash" d={path([I.p(1.6, 2, 0.3), I.p(9, 2, 0.3)])} />}
      </g>
      <g data-depth="1">
        <Box I={I} {...METER} />
        <path className="nf edge" d={poly(ring)} />
        <circle ref={at("needle")} className="dot" cx={nx} cy={ny} r={2.2} />
        {(small ? [0, 2] : TOOLS).map((i) => (
          <g key={i} ref={at(`tool${i}`)}>
            <Box I={I} x={TX} y={0.6} w={2.4} d={2.8} h={0.25} top="edge" />
            {!small && [0.8, 1.4, 2].map((yy) => (
              <path key={yy} className="nf lo" d={path([I.p(TX + 0.4, 0.6 + yy, 0.25), I.p(TX + 1.6, 0.6 + yy, 0.25)])} />
            ))}
            {i === 2 && (
              <path ref={at("check")} className="nf hi" d={path([I.p(TX + 1.9, 2.4, 0.25), I.p(TX + 2.05, 2.6, 0.25), I.p(TX + 2.3, 2.1, 0.25)])} />
            )}
          </g>
        ))}
        <Box I={I} x={AGENT[0]} y={AGENT[1]} w={1.1} d={1.1} h={1.1} />
        <g ref={at("agentLit")} style={{ opacity: 0.3 }}>
          <Disc I={I} x={AGENT[0] + 0.55} y={AGENT[1] + 0.55} z={1.1} r={0.3} className="dot" />
        </g>
      </g>
      <g data-depth="1.6">
        {(small ? [0] : [0, 1, 2]).map((j) => (
          <g key={j} ref={at(`r${j}`)} style={{ opacity: 0 }}>
            <path className="edge" d={poly([I.p(READ0[0], READ0[1], 0.4), I.p(READ0[0] + 0.5, READ0[1], 0.4), I.p(READ0[0] + 0.5, READ0[1] + 0.5, 0.4), I.p(READ0[0], READ0[1] + 0.5, 0.4)])} />
            <Disc I={I} x={READ0[0] + 0.25} y={READ0[1] + 0.25} z={0.4} r={0.08} className="dot" />
          </g>
        ))}
      </g>
    </FigureFrame>
  );
}
