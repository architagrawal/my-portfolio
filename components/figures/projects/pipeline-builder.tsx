"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, ease, fit, frac, mv, op, path, topFace, type Pt } from "../iso";

/* A DAG on the editor canvas. A typed node drops onto its target, its edge connects and passes
   validation, then undo lifts it back out. */
const I = fit(10, 6, 3);
const W = 1.8;
const D = 1.2;
const NODES: { at: Pt; kind: "src" | "op" | "out" }[] = [
  { at: [0.4, 0.6], kind: "src" },
  { at: [0.4, 4], kind: "src" },
  { at: [4, 2.3], kind: "op" },
  { at: [7.8, 0.6], kind: "out" },
];
const NEW: Pt = [7.8, 4];
const EDGES: [Pt, Pt][] = [
  [NODES[0].at, NODES[2].at],
  [NODES[1].at, NODES[2].at],
  [NODES[2].at, NODES[3].at],
];
const outPort = ([x, y]: Pt): Pt => [x + W, y + D / 2];
const inPort = ([x, y]: Pt): Pt => [x, y + D / 2];
const wire = (a: Pt, b: Pt) => path([I.p(...outPort(a), 0.3), I.p(...inPort(b), 0.3)]);

function Glyph({ at: [x, y], kind }: { at: Pt; kind: string }) {
  const z = 0.3;
  if (kind === "src") return <Disc I={I} x={x + 0.45} y={y + 0.6} z={z} r={0.22} className="nf mid" />;
  if (kind === "op")
    return <path className="nf mid" d={path([I.p(x + 0.3, y + 0.8, z), I.p(x + 0.6, y + 0.4, z), I.p(x + 0.9, y + 0.8, z)])} />;
  return <path className="nf mid" d={topFace(I, x + 0.25, y + 0.35, z, 0.45, 0.5)} />;
}

export function PipelineBuilderFigure({
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
    const u = frac(t / 7 + s * 0.08);
    const down = ease(0.05, 0.3, u) * (1 - ease(0.78, 0.92, u));
    mv(parts.current.drop, I.v(0, 0, (1 - down) * 2.4), down);
    op(parts.current.target, ease(0, 0.08, u) * (1 - ease(0.28, 0.34, u)) + ease(0.8, 0.86, u) * (1 - ease(0.94, 1, u)));
    op(parts.current.wire, ease(0.34, 0.44, u) * (1 - ease(0.72, 0.78, u)));
    op(parts.current.ok, ease(0.46, 0.52, u) * (1 - ease(0.7, 0.76, u)));
  };

  const dots: Pt[] = [];
  for (let x = 0.5; x < 10; x += 1) for (let y = 0.3; y < 6; y += 1) dots.push([x, y]);

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.4">
        <path className="lo" d={topFace(I, 0, 0, 0, 10, 6)} />
        {!small && dots.map(([x, y]) => (
          <Disc key={`${x}-${y}`} I={I} x={x} y={y} r={0.035} className="dot off" />
        ))}
        <path ref={at("target")} className="nf dash" style={{ opacity: 0 }} d={topFace(I, NEW[0], NEW[1], 0, W, D)} />
        {EDGES.map(([a, b], k) => (
          <path key={k} className="nf edge" d={wire(a, b)} />
        ))}
        <path ref={at("wire")} className="nf hi" style={{ opacity: 0 }} d={wire(NODES[2].at, NEW)} />
      </g>
      <g data-depth="1">
        {NODES.map((n, k) => (
          <g key={k}>
            <Box I={I} x={n.at[0]} y={n.at[1]} w={W} d={D} h={0.3} />
            {!small && <Glyph {...n} />}
            <Disc I={I} x={n.at[0] + W} y={n.at[1] + D / 2} z={0.15} r={0.09} className="dot m" />
          </g>
        ))}
      </g>
      <g data-depth="1.8">
        <g ref={at("drop")} style={{ opacity: 0 }}>
          <Box I={I} x={NEW[0]} y={NEW[1]} w={W} d={D} h={0.3} top="hi" />
          {!small && <Glyph at={NEW} kind="out" />}
          <path
            ref={at("ok")}
            className="nf hi"
            style={{ opacity: 0 }}
            d={path([I.p(NEW[0] + 1.1, NEW[1] + 0.6, 0.3), I.p(NEW[0] + 1.25, NEW[1] + 0.85, 0.3), I.p(NEW[0] + 1.5, NEW[1] + 0.3, 0.3)])}
          />
        </g>
      </g>
    </FigureFrame>
  );
}
