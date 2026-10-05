"use client";

import { motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";
import { draw, fade, W } from "./motion";
import type { CompGraph, Fanout, Flow, Gates } from "./types";

const arrowId = (s: string) => `viz-arrow-${s}`;

function Arrow({ id, className }: { id: string; className: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0L8 4L0 8z" className={className} />
      </marker>
    </defs>
  );
}

/* Stages as nodes on a line, arrows between, notes under */
export function FlowViz({ v }: { v: Flow }) {
  const reduce = useReduce();
  const n = v.stages.length;
  const step = W / n;
  const x = (i: number) => step * i + step / 2;
  const id = arrowId("flow");
  return (
    <svg viewBox={`0 0 ${W} 74`} className="h-auto w-full max-w-lg overflow-visible" role="img" aria-label={v.caption}>
      <Arrow id={id} className="fill-muted-foreground" />
      {v.stages.map((s, i) => (
        <motion.g key={s.label} {...fade(reduce, i * 0.35)}>
          <circle cx={x(i)} cy={30} r={5} className={i === n - 1 ? "fill-primary" : "fill-foreground"} />
          <text x={x(i)} y={14} textAnchor="middle" fontSize="11" className="fill-foreground">{s.label}</text>
          {s.note && (
            <text x={x(i)} y={54} textAnchor="middle" fontSize="11" className="fill-primary tabular-nums">{s.note}</text>
          )}
        </motion.g>
      ))}
      {v.stages.slice(1).map((s, i) => (
        <motion.path
          key={s.label}
          d={`M${x(i) + 10} 30L${x(i + 1) - 10} 30`}
          className="stroke-muted-foreground"
          strokeWidth="1.25"
          markerEnd={`url(#${id})`}
          {...draw(reduce, i * 0.35 + 0.2, 0.4)}
        />
      ))}
    </svg>
  );
}

/* Map fans out to workers, joins, loops back a bounded number of times, or trips the breaker */
export function FanoutViz({ v }: { v: Fanout }) {
  const reduce = useReduce();
  const H = 130;
  const mid = 52;
  const ys = Array.from({ length: v.workers }, (_, i) => 14 + (i * (mid * 2 - 28)) / (v.workers - 1));
  const id = arrowId("fanout");
  return (
    <svg viewBox={`0 -14 ${W} ${H + 14}`} className="h-auto w-full max-w-lg overflow-visible" role="img" aria-label={v.caption}>
      <Arrow id={id} className="fill-primary" />
      <circle cx={30} cy={mid} r={5} className="fill-foreground" />
      <text x={30} y={mid + 20} textAnchor="middle" fontSize="11" className="fill-muted-foreground">map</text>
      {ys.map((y, i) => (
        <g key={i}>
          <motion.path d={`M35 ${mid}C80 ${mid} 90 ${y} 130 ${y}L190 ${y}C230 ${y} 240 ${mid} 265 ${mid}`} className="stroke-muted-foreground/60" strokeWidth="1" fill="none" {...draw(reduce, i * 0.06, 1)} />
          <motion.circle cx={160} cy={y} r={3} className="fill-muted-foreground" {...fade(reduce, 0.4 + i * 0.06)} />
        </g>
      ))}
      <text x={160} y={8 - 2} textAnchor="middle" fontSize="11" className="fill-muted-foreground">workers</text>
      <circle cx={270} cy={mid} r={5} className="fill-primary" />
      <text x={282} y={mid + 4} fontSize="11" className="fill-foreground">join</text>
      <motion.path d={`M270 ${mid + 8}C270 ${H - 18} 30 ${H - 18} 30 ${mid + 28}`} className="stroke-primary" strokeWidth="1.25" fill="none" strokeDasharray="3 3" markerEnd={`url(#${id})`} {...fade(reduce, 1.2)} />
      <motion.text x={150} y={H - 4} textAnchor="middle" fontSize="11" className="fill-primary" {...fade(reduce, 1.2)}>repair loop</motion.text>
    </svg>
  );
}

/* y = w*x + b, then loss; forward edges muted, gradients drawn back in saffron */
export function CompGraphViz({ v }: { v: CompGraph }) {
  const reduce = useReduce();
  const nodes = {
    x: [24, 22], w: [24, 84], mul: [118, 52], b: [118, 112], add: [210, 82], loss: [296, 82],
  } as const;
  const label: Record<keyof typeof nodes, string> = { x: "x", w: "w", mul: "×", b: "b", add: "+", loss: "L" };
  const edges: [keyof typeof nodes, keyof typeof nodes][] = [["x", "mul"], ["w", "mul"], ["mul", "add"], ["b", "add"], ["add", "loss"]];
  const id = arrowId("grad");
  const R = 12;
  const seg = (a: readonly number[], b: readonly number[], off: number) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const ox = -uy * off;
    const oy = ux * off;
    return [a[0] + ux * (R + 2) + ox, a[1] + uy * (R + 2) + oy, b[0] - ux * (R + 4) + ox, b[1] - uy * (R + 4) + oy];
  };
  return (
    <svg viewBox={`0 0 ${W} 140`} className="h-auto w-full max-w-md overflow-visible" role="img" aria-label={v.caption}>
      <Arrow id={id} className="fill-primary" />
      {edges.map(([a, b]) => {
        const [x1, y1, x2, y2] = seg(nodes[a], nodes[b], -3);
        return <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-muted-foreground/50" strokeWidth="1.25" />;
      })}
      {[...edges].reverse().map(([a, b], i) => {
        const [x1, y1, x2, y2] = seg(nodes[b], nodes[a], -3);
        return <motion.path key={"g" + a + b} d={`M${x1} ${y1}L${x2} ${y2}`} className="stroke-primary" strokeWidth="1.5" markerEnd={`url(#${id})`} {...draw(reduce, 0.3 + i * 0.25, 0.35)} />;
      })}
      {(Object.keys(nodes) as (keyof typeof nodes)[]).map((k) => (
        <g key={k}>
          <circle cx={nodes[k][0]} cy={nodes[k][1]} r={R} className={k === "loss" ? "fill-primary/20 stroke-primary" : "fill-background stroke-foreground/60"} strokeWidth="1" />
          <text x={nodes[k][0]} y={nodes[k][1] + 4} textAnchor="middle" fontSize="12" className="fill-foreground">{label[k]}</text>
        </g>
      ))}
      <text x={W} y={136} textAnchor="end" fontSize="11" className="fill-primary">gradients flow back</text>
    </svg>
  );
}

/* Staircase of layers with a gate between each */
export function GatesViz({ v }: { v: Gates }) {
  const reduce = useReduce();
  const n = v.layers.length;
  const w = W / n;
  const rowH = 22;
  return (
    <svg viewBox={`0 0 ${W} ${n * rowH + 6}`} className="h-auto w-full max-w-lg overflow-visible" role="img" aria-label={v.caption}>
      {v.layers.map((l, i) => (
        <motion.g key={l} {...fade(reduce, i * 0.35)}>
          <rect x={i * w} y={i * rowH + 4} width={w - 8} height={12} rx={6} className={i === 0 ? "fill-primary" : "fill-muted-foreground/30"} />
          <text x={i * w + 4} y={i * rowH + 26} fontSize="11" className="fill-muted-foreground">{l}</text>
          {i < n - 1 && (
            <path d={`M${(i + 1) * w - 4} ${i * rowH}V${(i + 1) * rowH + 18}`} className="stroke-primary" strokeWidth="1.5" strokeDasharray="2 2" />
          )}
        </motion.g>
      ))}
    </svg>
  );
}
