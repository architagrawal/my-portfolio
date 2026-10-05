"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, mv, op, path, topFace, type Pt } from "../iso";

/* A computation graph, x times w plus b through relu into a loss. Values flow forward, then
   gradients flow back edge by edge in reverse topological order. The small cut drops the bias. */
type Node = { at: Pt; h: number };
type Graph = { nodes: Record<string, Node>; edges: [string, string, number][]; world: [number, number, number] };
const NS = 1;
const FULL: Graph = {
  nodes: {
    x: { at: [0, 0], h: 0.4 },
    w: { at: [0, 2.6], h: 0.4 },
    mul: { at: [2.4, 1.3], h: 0.7 },
    b: { at: [2.4, 4], h: 0.4 },
    add: { at: [4.6, 2.6], h: 0.7 },
    relu: { at: [6.4, 1.6], h: 0.7 },
    loss: { at: [8.2, 1.6], h: 1.4 },
  },
  edges: [
    ["x", "mul", 0],
    ["w", "mul", 0],
    ["mul", "add", 1],
    ["b", "add", 1],
    ["add", "relu", 2],
    ["relu", "loss", 3],
  ],
  world: [9.2, 5, 1.4],
};
const SMALL: Graph = {
  nodes: {
    x: { at: [0, 0], h: 0.4 },
    w: { at: [0, 2.8], h: 0.4 },
    mul: { at: [2.6, 1.4], h: 0.7 },
    relu: { at: [5, 1.4], h: 0.7 },
    loss: { at: [7.2, 1.4], h: 1.4 },
  },
  edges: [
    ["x", "mul", 0],
    ["w", "mul", 0],
    ["mul", "relu", 1],
    ["relu", "loss", 2],
  ],
  world: [8.2, 3.8, 1.4],
};
const Z = 0.45;
const c = (n: Node): Pt => [n.at[0] + NS / 2, n.at[1] + NS / 2];

export function AutodiffFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();
  const G = small ? SMALL : FULL;
  const I = fit(...G.world);
  const top = Math.max(...G.edges.map((e) => e[2]));
  const step = 0.42 / (top + 1);

  const tick = ({ t, s }: Frame) => {
    const u = frac(t / 8 + s * 0.08);
    const lit: Record<string, number> = {
      loss: ease(0.42, 0.48, u) * (1 - ease(0.9, 1, u)),
    };
    G.edges.forEach(([a, b, L], k) => {
      const A = c(G.nodes[a]);
      const B = c(G.nodes[b]);
      const ff = ease(0, 1, (u - L * step) / step);
      const fb = ease(0, 1, (u - 0.5 - (top - L) * step) / step);
      const fo = u > L * step && u < (L + 1) * step ? 1 : 0;
      const bo = u > 0.5 + (top - L) * step && u < 0.5 + (top - L + 1) * step ? 1 : 0;
      mv(parts.current[`f${k}`], I.v((B[0] - A[0]) * ff, (B[1] - A[1]) * ff), fo);
      mv(parts.current[`g${k}`], I.v((A[0] - B[0]) * fb, (A[1] - B[1]) * fb), bo);
      if (fb >= 1) lit[a] = Math.max(lit[a] ?? 0, 1 - ease(0.9, 1, u));
    });
    Object.keys(G.nodes).forEach((id) => op(parts.current[`n${id}`], lit[id] ?? 0));
  };

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        {G.edges.map(([a, b]) => (
          <path
            key={a + b}
            className="nf edge"
            d={path([I.p(...c(G.nodes[a]), Z), I.p(...c(G.nodes[b]), Z)])}
          />
        ))}
      </g>
      <g data-depth="1">
        {Object.entries(G.nodes).map(([id, n]) => (
          <g key={id}>
            <Box I={I} x={n.at[0]} y={n.at[1]} w={NS} d={NS} h={n.h} />
            <path
              ref={at(`n${id}`)}
              className="hi ft"
              style={{ opacity: 0 }}
              d={topFace(I, n.at[0], n.at[1], n.h, NS, NS)}
            />
          </g>
        ))}
      </g>
      <g data-depth="1.4">
        {G.edges.map(([a], k) => {
          const [x, y] = c(G.nodes[a]);
          return (
            <g key={k} ref={at(`f${k}`)} style={{ opacity: 0 }}>
              <Disc I={I} x={x} y={y} z={Z} r={0.15} className="dot m" />
            </g>
          );
        })}
        {G.edges.map(([, b], k) => {
          const [x, y] = c(G.nodes[b]);
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
