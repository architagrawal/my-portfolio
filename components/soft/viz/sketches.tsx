"use client";

import { motion, useReducedMotion } from "framer-motion";
import { draw, fade, W } from "./motion";
import type { Cadence, Quadrant, Receipt, Scaling } from "./types";

/* Two independent axes; a sample that fails one axis sits far along the other */
export function QuadrantViz({ v }: { v: Quadrant }) {
  const reduce = useReducedMotion();
  const S = 150;
  const ox = 20;
  const px = (n: number) => ox + n * S;
  const py = (n: number) => 6 + (1 - n) * S;
  return (
    <svg viewBox={`0 0 ${W} ${S + 26}`} className="h-auto w-full max-w-md overflow-visible" role="img" aria-label={v.caption}>
      <path d={`M${ox} 6V${S + 6}H${ox + S}`} className="stroke-muted-foreground/50" strokeWidth="1" fill="none" />
      <text x={ox + S} y={S + 22} textAnchor="end" fontSize="11" className="fill-muted-foreground">{v.x}</text>
      <text x={ox - 8} y={6} fontSize="11" textAnchor="end" transform={`rotate(-90 ${ox - 8} 6)`} className="fill-muted-foreground">{v.y}</text>
      {v.points.map((p, i) => (
        <motion.g key={p.label} {...fade(reduce, 0.2 + i * 0.2)}>
          <circle cx={px(p.x)} cy={py(p.y)} r={4} className={p.accent ? "fill-primary" : "fill-muted-foreground"} />
          <text x={px(p.x) + 9} y={py(p.y) + 4} fontSize="11" className={p.accent ? "fill-foreground" : "fill-muted-foreground"}>{p.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

/* Route with a tick at every location poll */
export function CadenceViz({ v }: { v: Cadence }) {
  const reduce = useReducedMotion();
  const x0 = 6;
  const x1 = W - 6;
  const x = (t: number) => x0 + t * (x1 - x0);
  return (
    <svg viewBox={`0 0 ${W} 54`} className="h-auto w-full max-w-md overflow-visible" role="img" aria-label={v.caption}>
      <motion.path d={`M${x0} 22H${x1}`} className="stroke-muted-foreground/50" strokeWidth="1.5" {...draw(reduce, 0, 0.8)} />
      {v.ticks.map((t, i) => (
        <motion.path key={i} d={`M${x(t)} 14V30`} className="stroke-primary" strokeWidth="1.5" {...fade(reduce, 0.3 + t * 0.9)} />
      ))}
      <circle cx={x1} cy={22} r={4} className="fill-primary" />
      <text x={x0} y={48} fontSize="11" className="fill-muted-foreground">{v.start}</text>
      <text x={x1} y={48} textAnchor="end" fontSize="11" className="fill-muted-foreground">{v.end}</text>
    </svg>
  );
}

const money = (c: number) => `$${(c / 100).toFixed(2)}`;

/* Each line splits only among the people who had it; totals fall out per person */
export function ReceiptViz({ v }: { v: Receipt }) {
  const reduce = useReducedMotion();
  const rowH = 20;
  const colX = (p: number) => 190 + p * 44;
  const totals = v.people.map(() => 0);
  for (const it of v.items) {
    const base = Math.floor(it.cents / it.who.length);
    let rem = it.cents - base * it.who.length; // integer cents, remainder to the first sharers
    for (const p of it.who) {
      totals[p] += base + (rem > 0 ? 1 : 0);
      rem -= 1;
    }
  }
  const H = (v.items.length + 2) * rowH + 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-md overflow-visible" role="img" aria-label={v.caption}>
      {v.people.map((name, p) => (
        <text key={name} x={colX(p)} y={12} textAnchor="middle" fontSize="11" className="fill-muted-foreground">{name}</text>
      ))}
      {v.items.map((it, r) => {
        const y = (r + 1) * rowH + 12;
        return (
          <motion.g key={it.name} {...fade(reduce, r * 0.2)}>
            <text x={0} y={y} fontSize="11" className="fill-foreground">{it.name}</text>
            <text x={160} y={y} textAnchor="end" fontSize="11" className="fill-muted-foreground tabular-nums">{money(it.cents)}</text>
            {v.people.map((_, p) => (
              <circle key={p} cx={colX(p)} cy={y - 4} r={it.who.includes(p) ? 4 : 1.5} className={it.who.includes(p) ? "fill-primary" : "fill-muted-foreground/40"} />
            ))}
          </motion.g>
        );
      })}
      <motion.g {...fade(reduce, v.items.length * 0.2 + 0.2)}>
        <text x={0} y={(v.items.length + 1) * rowH + 18} fontSize="11" className="fill-muted-foreground">owes</text>
        {totals.map((c, p) => (
          <text key={p} x={colX(p)} y={(v.items.length + 1) * rowH + 18} textAnchor="middle" fontSize="11" className="fill-foreground tabular-nums">{money(c)}</text>
        ))}
      </motion.g>
    </svg>
  );
}

/* Request load over time with instance capacity stepping up and back down behind it */
export function ScalingViz({ v }: { v: Scaling }) {
  const reduce = useReducedMotion();
  const H = 90;
  const cap = v.load.map((l) => Math.max(1, Math.ceil(l / v.perInstance)) * v.perInstance);
  const max = Math.max(...cap);
  const x = (i: number) => (i / (v.load.length - 1)) * W;
  const y = (n: number) => 8 + (1 - n / max) * (H - 26);
  const load = v.load.map((l, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(l).toFixed(1)}`).join("");
  const step = cap.map((c, i) => (i ? `H${x(i).toFixed(1)}V${y(c).toFixed(1)}` : `M0 ${y(c).toFixed(1)}`)).join("") + `H${W}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-md overflow-visible" role="img" aria-label={v.caption}>
      <motion.path d={step} className="stroke-primary" strokeWidth="1.75" fill="none" {...draw(reduce, 0.2, 1.4)} />
      <motion.path d={load} className="stroke-muted-foreground" strokeWidth="1.25" fill="none" {...draw(reduce, 0, 1.4)} />
      <text x={0} y={H - 2} fontSize="11" className="fill-muted-foreground">requests</text>
      <text x={W} y={H - 2} textAnchor="end" fontSize="11" className="fill-primary">instances</text>
    </svg>
  );
}
