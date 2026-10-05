"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";
import { Crossfade, FindingsBars } from "@/components/soft/drawings";

const once = { once: true, margin: "-60px" } as const;

/* Counts the leading number of a stat up from zero when it scrolls into view. "290k", "4.5×", "<1¢" all work. */
export function CountUp({ value }: { value: string }) {
  const reduce = useReduce();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, once);
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const target = m ? parseFloat(m[2].replace(/,/g, "")) : 0;
  const decimals = m?.[2].includes(".") ? m[2].split(".")[1].length : 0;
  const [n, setN] = useState(m ? 0 : target);

  useEffect(() => {
    if (!m) return;
    if (reduce) return setN(target);
    if (!seen) return;
    const c = animate(0, target, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => c.stop();
  }, [seen, reduce, target]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {m[1]}
      {m[2].includes(",") ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals)}
      {m[3]}
    </span>
  );
}

/* Old pipeline: one row in eight drops out. New: every row lands. */
function RowsLost() {
  const reduce = useReduce();
  const row = (label: string, lose: boolean, y: number) => (
    <g>
      <text x="0" y={y + 12} fontSize="12" className="fill-muted-foreground">{label}</text>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.rect
          key={i}
          x={120 + i * 25}
          y={y}
          width="19"
          height="16"
          rx="4"
          className={lose && i === 5 ? "fill-secondary" : "fill-primary"}
          initial={reduce ? false : { opacity: 0, y: -8 }}
          whileInView={lose && i === 5 ? { opacity: [0, 1, 1, 0.12], y: [-8, 0, 0, 14] } : { opacity: 1, y: 0 }}
          viewport={once}
          transition={lose && i === 5 ? { duration: 1.8, times: [0, 0.3, 0.7, 1], delay: 0.3 } : { duration: 0.35, delay: i * 0.05 }}
        />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 320 76" className="h-auto w-full" aria-label="The old pipeline loses one row in eight; the new one loses none">
      {row("old pipeline", true, 6)}
      {row("with row tokens", false, 46)}
    </svg>
  );
}

/* Rows grow 200x, answer time stays flat */
function FlatLatency() {
  const reduce = useReduce();
  const bars = [4, 10, 24, 50, 100];
  return (
    <svg viewBox="0 0 320 96" className="h-auto w-full" aria-label="Rows grow 200 times while answer time stays flat">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={20 + i * 60}
          width="34"
          rx="4"
          className="fill-primary/20"
          initial={reduce ? false : { height: 0, y: 80 }}
          whileInView={{ height: h * 0.7, y: 80 - h * 0.7 }}
          viewport={once}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: i * 0.1 }}
        />
      ))}
      <motion.path
        d="M20 64 L294 64"
        className="stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={once}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <text x="0" y="94" fontSize="12" className="fill-muted-foreground">rows, 1× to 200×</text>
      <text x="20" y="56" fontSize="12" className="fill-primary font-bold">answer time, flat</text>
    </svg>
  );
}

/* Two runs, same hash, character by character */
function HashMatch() {
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, once);
  const hash = "a91f03c7e2b6d458";
  const [k, setK] = useState(reduce ? hash.length : 0);
  useEffect(() => {
    if (!seen || reduce) return;
    const t = setInterval(() => setK((v) => (v >= hash.length ? v : v + 1)), 55);
    return () => clearInterval(t);
  }, [seen, reduce]);
  const done = k >= hash.length;
  return (
    <div ref={ref} className="space-y-1.5 font-mono text-[13px]" aria-label="Two runs produce the same hash">
      {["run 1", "run 2"].map((r) => (
        <p key={r} className="flex gap-3">
          <span className="w-12 text-muted-foreground">{r}</span>
          <span className="text-foreground">{hash.slice(0, k)}</span>
        </p>
      ))}
      <p className={`pt-1 font-sans text-[13px] font-bold transition-opacity duration-500 ${done ? "text-primary opacity-100" : "opacity-0"}`}>
        Identical, byte for byte
      </p>
    </div>
  );
}

/* The grader's needle swings to a perfect score for a useless chart, then gets caught */
function GraderGauge() {
  const reduce = useReduce();
  return (
    <svg viewBox="0 0 320 96" className="h-auto w-full" aria-label="A word cloud scores a perfect 1.00 until a gate blocks it">
      <text x="0" y="14" fontSize="12" className="fill-muted-foreground">grader score, word cloud</text>
      <rect x="0" y="24" width="320" height="18" rx="9" className="fill-card" />
      <motion.rect
        x="0"
        y="24"
        height="18"
        rx="9"
        className="fill-secondary"
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: 320 }}
        viewport={once}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <text x="0" y="66" fontSize="12" className="fill-muted-foreground">after the measure gate</text>
      <rect x="0" y="74" width="320" height="18" rx="9" className="fill-card" />
      <motion.text
        x="10"
        y="88"
        fontSize="12"
        className="fill-primary font-bold"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={once}
        transition={{ delay: 1.1 }}
      >
        rejected
      </motion.text>
    </svg>
  );
}

/* A bill splits into exact per-person shares that add back up */
function SplitBill() {
  const reduce = useReduce();
  const shares = [
    { w: 0.46, label: "$23.40" },
    { w: 0.31, label: "$15.77" },
    { w: 0.23, label: "$11.70" },
  ];
  let x = 0;
  return (
    <svg viewBox="0 0 320 70" className="h-auto w-full" aria-label="A $50.87 bill split into three exact shares">
      <text x="0" y="14" fontSize="12" className="fill-muted-foreground">$50.87, split by item</text>
      {shares.map((s, i) => {
        const x0 = x;
        x += s.w * 320;
        return (
          <g key={i}>
            <motion.rect
              y="24"
              height="22"
              rx="6"
              width={s.w * 320 - 4}
              className={i === 0 ? "fill-primary" : i === 1 ? "fill-secondary" : "fill-foreground/30"}
              initial={reduce ? false : { x: 0, opacity: 0.4 }}
              whileInView={{ x: x0, opacity: 1 }}
              viewport={once}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.2 + i * 0.12 }}
            />
            <motion.text
              x={x0}
              y="64"
              fontSize="12"
              className="fill-foreground font-bold tabular-nums"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={once}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              {s.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

const VIZ = {
  findings: FindingsBars,
  rows: RowsLost,
  latency: FlatLatency,
  replay: HashMatch,
  grader: GraderGauge,
  crossfade: Crossfade,
  split: SplitBill,
} as const;

export type VizKey = keyof typeof VIZ;

export function LabViz({ kind }: { kind: VizKey }) {
  const V = VIZ[kind];
  return (
    <div className="mt-5 max-w-md">
      <V />
    </div>
  );
}
