"use client";

import { motion, useReducedMotion } from "framer-motion";

/* A series in order; `label` says what is plotted */
export interface Series {
  label: string;
  /* `label` only on points whose value is a real figure from the copy */
  points: { x: string; y: number; label?: string }[];
}

const W = 320;
const H = 72;
const PAD = 6;
const TOP = 18; // room for endpoint labels above the line

/* Small line chart that draws itself once when scrolled into view */
export function LineChart({ series, className = "" }: { series: Series; className?: string }) {
  const reduce = useReducedMotion();
  const { points } = series;
  if (points.length < 2) return null;

  const ys = points.map((p) => p.y);
  const lo = Math.min(0, ...ys); // zero baseline so small wobbles stay small
  const span = Math.max(...ys) - lo || 1;
  const xy = points.map((p, i) => [
    PAD + (i / (points.length - 1)) * (W - PAD * 2),
    TOP + (1 - (p.y - lo) / span) * (H - TOP - PAD),
  ]);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const first = points[0].x;
  const last = points[points.length - 1].x;
  const marks = points.flatMap((p, i) => (p.label ? [{ i, label: p.label, x: xy[i][0], y: xy[i][1] }] : []));

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${W} ${H + 18}`}
        className="h-auto w-full max-w-sm overflow-visible"
        role="img"
        aria-label={series.label}
      >
        <motion.path
          d={d}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {marks.map((m) => (
          <motion.g
            key={m.i}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: reduce ? 0 : 1.2 * (m.i / (points.length - 1)) }}
          >
            <circle cx={m.x} cy={m.y} r="3" className="fill-primary" />
            <text
              x={m.x}
              y={m.y - 8}
              textAnchor={m.i === points.length - 1 ? "end" : m.i === 0 ? "start" : "middle"}
              fontSize="11"
              className="fill-foreground tabular-nums"
            >
              {m.label}
            </text>
          </motion.g>
        ))}
        <text x={0} y={H + 16} fontSize="11" className="fill-muted-foreground">{first}</text>
        <text x={W} y={H + 16} textAnchor="end" fontSize="11" className="fill-muted-foreground">{last}</text>
      </svg>
      <figcaption className="mt-1 text-sm text-muted-foreground">{series.label}</figcaption>
    </figure>
  );
}
