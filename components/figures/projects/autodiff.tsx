"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, mv, op, path, topFace, type Pt } from "../iso";

/* A computation graph, x times w plus b through relu into a loss. Values flow forward, then
   gradients flow back edge by edge in reverse topological order. */
const I = fit(10, 5.6, 2);
type Node = { id: string; at: Pt; h: number };
const N: Record<string, Node> = {
  x: { id: "x", at: [0, 0.4], h: 0.4 },
  w: { id: "w", at: [0, 3], h: 0.4 },
  mul: { id: "mul", at: [2.6, 1.7], h: 0.7 },
  b: { id: "b", at: [2.6, 4.6], h: 0.4 },
  add: { id: "add", at: [5.1, 3], h: 0.7 },
  relu: { id: "relu", at: [7.2, 2], h: 0.7 },
  loss: { id: "loss", at: [9.2, 2], h: 1.3 },
};
// [from, to, forward level]
const E: [string, string, number][] = [
  ["x", "mul", 0],
  ["w", "mul", 0],
  ["mul", "add", 1],
  ["b", "add", 1],
  ["add", "relu", 2],
  ["relu", "loss", 3],
];
const Z = 0.45;
const c = (n: Node): Pt => [n.at[0] + 0.4, n.at[1] + 0.4];

export function AutodiffFigure({ label, className }: { label: string; className?: string }) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 7 + s * 0.1);
    const lit: Record<string, number> = { loss: ease(0.42, 0.48, u) * (1 - ease(0.9, 1, u)) };
    E.forEach(([a, b, L], k) => {
      const A = c(N[a]);
      const B = c(N[b]);
      const ff = (u - L * 0.1) / 0.1;
      const fb = (u - 0.5 - (3 - L) * 0.1) / 0.1;
      const fwd = ff > 0 && ff < 1;
      mv(parts.current[`f${k}`], I.v((B[0] - A[0]) * ff, (B[1] - A[1]) * ff), fwd ? 1 : 0);
      const back = fb > 0 && fb < 1;
      mv(parts.current[`g${k}`], I.v((A[0] - B[0]) * fb, (A[1] - B[1]) * fb), back ? 1 : 0);
      if (fb >= 1) lit[a] = Math.max(lit[a] ?? 0, 1 - ease(0.9, 1, u));
    });
    Object.keys(N).forEach((id) => op(parts.current[`n${id}`], lit[id] ?? 0));
  };

  return (
    <FigureFrame label={label} tick={tick} className={className}>
      <g data-depth="0.4">
        {E.map(([a, b]) => (
          <path key={a + b} className="nf edge" d={path([I.p(...c(N[a]), Z), I.p(...c(N[b]), Z)])} />
        ))}
      </g>
      <g data-depth="1">
        {Object.values(N).map((n) => (
          <g key={n.id}>
            <Box I={I} x={n.at[0]} y={n.at[1]} w={0.8} d={0.8} h={n.h} top={n.id === "loss" ? "hi" : "edge"} />
            <path
              ref={at(`n${n.id}`)}
              className="hi"
              style={{ opacity: 0 }}
              d={topFace(I, n.at[0] + 0.15, n.at[1] + 0.15, n.h, 0.5, 0.5)}
            />
          </g>
        ))}
      </g>
      <g data-depth="1.4">
        {E.map(([a], k) => {
          const [x, y] = c(N[a]);
          return (
            <g key={k} ref={at(`f${k}`)} style={{ opacity: 0 }}>
              <Disc I={I} x={x} y={y} z={Z} r={0.14} className="dot m" />
            </g>
          );
        })}
        {E.map(([, b], k) => {
          const [x, y] = c(N[b]);
          return (
            <g key={k} ref={at(`g${k}`)} style={{ opacity: 0 }}>
              <Disc I={I} x={x} y={y} z={Z + 0.3} r={0.2} className="dot" />
            </g>
          );
        })}
      </g>
    </FigureFrame>
  );
}
