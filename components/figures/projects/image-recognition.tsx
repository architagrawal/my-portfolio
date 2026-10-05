"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, clamp, ease, fit, frac, lerp, mv, op, path, topFace, type Pt } from "../iso";

/* Image requests queue up, a balancer fans them out, and the instance pool grows with the
   queue and shrinks when it drains. */
const I = fit(10.6, 5.4, 2.4);
const INST: Pt[] = [
  [7.4, 0.2],
  [7.4, 2],
  [7.4, 3.8],
  [9.2, 0.2],
  [9.2, 2],
  [9.2, 3.8],
];
const TILES = 7;
const Q0: Pt = [0, 2.2];
const LB: Pt = [4.3, 2.2];
const lbIn: Pt = [LB[0] - 0.9, LB[1]];

export function ImageRecognitionFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();
  const inst = small ? INST.filter((_, i) => i % 3 !== 2) : INST;
  const tiles = small ? 4 : TILES;
  const shown: number[] = inst.map((_, i) => (i < 2 ? 1 : 0));

  const tick = ({ t, s, still }: Frame) => {
    const load = clamp(0.5 - 0.5 * Math.cos(t * 0.4) + s * 0.2);
    const n = 2 + Math.round(load * (inst.length - 2));
    inst.forEach((_, i) => {
      const want = i < n ? 1 : 0;
      shown[i] = still ? want : lerp(shown[i], want, 0.04);
      op(parts.current[`i${i}`], shown[i]);
      op(parts.current[`w${i}`], shown[i]);
    });
    for (let j = 0; j < tiles; j++) {
      const u = frac(t / 6 + j / tiles);
      let x: number;
      let y: number;
      let z = 0.1;
      let o = 1;
      if (u < 0.6) {
        x = lerp(Q0[0], lbIn[0], u / 0.6);
        y = Q0[1];
        o = ease(0, 0.05, u);
      } else {
        const f = ease(0.6, 1, u);
        const [tx, ty] = inst[j % n];
        x = lerp(lbIn[0], tx + 0.15, f);
        y = lerp(Q0[1], ty + 0.15, f);
        z = 0.1 + Math.sin(Math.PI * f) * 1.2 + f * 1.2;
        o = 1 - ease(0.9, 1, u);
      }
      mv(parts.current[`q${j}`], I.v(x - Q0[0], y - Q0[1], z - 0.1), o);
    }
  };

  const tile = (
    <g>
      <path className="edge" d={topFace(I, Q0[0], Q0[1], 0.1, 0.7, 0.7)} />
      <path
        className="nf mid"
        d={path([I.p(Q0[0] + 0.1, Q0[1] + 0.55, 0.1), I.p(Q0[0] + 0.3, Q0[1] + 0.3, 0.1), I.p(Q0[0] + 0.45, Q0[1] + 0.45, 0.1), I.p(Q0[0] + 0.6, Q0[1] + 0.2, 0.1)])}
      />
    </g>
  );

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        <path className="lo" d={topFace(I, -0.2, 2, 0, 4.6, 1.1)} />
        {inst.map(([x, y], i) => (
          <path
            key={i}
            ref={at(`w${i}`)}
            className="nf dash"
            d={path([I.p(LB[0] + 1.1, LB[1] + 0.5, 0.6), I.p(x + 0.5, y + 0.5, 0.6)])}
          />
        ))}
      </g>
      <g data-depth="1">
        <Box I={I} x={LB[0]} y={LB[1] - 0.2} w={1.2} d={1.4} h={1.2} top="hi" />
        {inst.map(([x, y], i) => (
          <g key={i} ref={at(`i${i}`)} style={{ opacity: i < 2 ? 1 : 0 }}>
            <Box I={I} x={x} y={y} w={1} d={1} h={1.3} />
          </g>
        ))}
      </g>
      <g data-depth="1.6">
        {Array.from({ length: tiles }, (_, j) => (
          <g key={j} ref={at(`q${j}`)}>
            {tile}
          </g>
        ))}
      </g>
    </FigureFrame>
  );
}
