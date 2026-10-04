"use client";

import { motion, useReducedMotion } from "framer-motion";
import { draw, fade, W } from "./motion";
import type { Ratio, Slope, Waffle } from "./types";

const COLS = 34;
const CELL = W / COLS;

/* Unit grid per row: each square is one record, saffron squares are the hits */
export function WaffleViz({ v }: { v: Waffle }) {
  const reduce = useReducedMotion();
  let y = 0;
  const blocks = v.rows.map((r) => {
    const top = y + 14;
    const lines = Math.ceil(r.total / COLS);
    y = top + lines * CELL + 14;
    return { r, top };
  });
  return (
    <svg viewBox={`0 0 ${W} ${y}`} className="h-auto w-full max-w-md" role="img" aria-label={v.caption}>
      {blocks.map(({ r, top }, b) => (
        <g key={r.label}>
          <text x={0} y={top - 5} fontSize="11" className="fill-muted-foreground">{r.label}</text>
          <text x={W} y={top - 5} fontSize="11" textAnchor="end" className="fill-foreground tabular-nums">{r.value}</text>
          {Array.from({ length: r.total }, (_, i) => (
            <motion.rect
              key={i}
              x={(i % COLS) * CELL + 1}
              y={top + Math.floor(i / COLS) * CELL + 1}
              width={CELL - 2}
              height={CELL - 2}
              rx={1.5}
              className={i < r.hit ? "fill-primary" : "fill-muted-foreground/25"}
              {...fade(reduce, b * 0.4 + (i < r.hit ? 0.3 + i * 0.04 : 0))}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* Two points on one scale joined by a line, values labelled at each end */
export function SlopeViz({ v }: { v: Slope }) {
  const reduce = useReducedMotion();
  const H = 110;
  const max = Math.max(v.from.value, v.to.value);
  const y = (n: number) => 16 + (1 - n / max) * (H - 40);
  const x0 = 60;
  const x1 = W - 60;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-md" role="img" aria-label={v.caption}>
      <line x1={x0} x2={x0} y1={12} y2={H - 22} className="stroke-muted-foreground/30" strokeWidth="1" />
      <line x1={x1} x2={x1} y1={12} y2={H - 22} className="stroke-muted-foreground/30" strokeWidth="1" />
      <motion.path d={`M${x0} ${y(v.from.value)}L${x1} ${y(v.to.value)}`} className="stroke-primary" strokeWidth="2" fill="none" {...draw(reduce, 0.1)} />
      <circle cx={x0} cy={y(v.from.value)} r="4" className="fill-muted-foreground" />
      <motion.circle cx={x1} cy={y(v.to.value)} r="4" className="fill-primary" {...fade(reduce, 1)} />
      <text x={x0 - 8} y={y(v.from.value) + 4} textAnchor="end" fontSize="12" className="fill-foreground tabular-nums">{v.from.label}</text>
      <motion.text x={x1 + 8} y={y(v.to.value) + 4} fontSize="12" className="fill-foreground tabular-nums" {...fade(reduce, 1)}>{v.to.label}</motion.text>
      <text x={x0} y={H - 6} textAnchor="middle" fontSize="11" className="fill-muted-foreground">{v.from.tag}</text>
      <text x={x1} y={H - 6} textAnchor="middle" fontSize="11" className="fill-muted-foreground">{v.to.tag}</text>
    </svg>
  );
}

/* The old duration as a bar of equal parts; the new one fills a single part */
export function RatioViz({ v }: { v: Ratio }) {
  const reduce = useReducedMotion();
  const gap = 2;
  const w = (W - gap * (v.parts - 1)) / v.parts;
  return (
    <svg viewBox={`0 0 ${W} 74`} className="h-auto w-full max-w-md" role="img" aria-label={v.caption}>
      <text x={0} y={12} fontSize="11" className="fill-muted-foreground">{v.before}</text>
      {Array.from({ length: v.parts }, (_, i) => (
        <motion.rect key={i} x={i * (w + gap)} y={20} width={w} height={14} rx={2} className="fill-muted-foreground/30" {...fade(reduce, i * 0.04)} />
      ))}
      <motion.rect x={0} y={44} width={w} height={14} rx={2} className="fill-primary" {...fade(reduce, v.parts * 0.04 + 0.2)} />
      <motion.text x={w + 8} y={55} fontSize="11" className="fill-foreground" {...fade(reduce, v.parts * 0.04 + 0.2)}>{v.after}</motion.text>
    </svg>
  );
}
