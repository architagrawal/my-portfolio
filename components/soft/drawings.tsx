"use client";

import { motion, useReducedMotion } from "framer-motion";


/* Rule-built report vs agent: the Survey Agents result, bars grow in on view */
export function FindingsBars() {
  const reduce = useReducedMotion();
  const bar = (w: number, delay: number) => ({
    initial: reduce ? false : { width: 0 },
    whileInView: { width: w },
    viewport: { once: true },
    transition: { type: "spring", stiffness: 90, damping: 18, delay },
  });
  return (
    <svg viewBox="0 0 320 96" className="w-full h-auto" aria-label="Findings recovered: rule-built report 13%, agent 52 to 59%">
      <text x="0" y="14" fontSize="12" className="fill-muted-foreground">rule-built report</text>
      <rect x="0" y="22" width="320" height="18" rx="9" className="fill-card" />
      <motion.rect x="0" y="22" height="18" rx="9" className="fill-muted-foreground/40" {...bar(320 * 0.13, 0)} />
      <text x={320 * 0.13 + 8} y="36" fontSize="12" className="fill-foreground">13%</text>
      <text x="0" y="64" fontSize="12" className="fill-muted-foreground">agent picks the analyses</text>
      <rect x="0" y="72" width="320" height="18" rx="9" className="fill-card" />
      <motion.rect x="0" y="72" height="18" rx="9" className="fill-primary" {...bar(320 * 0.59, 0.15)} />
      <text x={320 * 0.59 + 8} y="86" fontSize="12" className="fill-foreground">52–59%</text>
    </svg>
  );
}

/* Two tracks crossfading on the phrase, for AiJockey */
export function Crossfade() {
  const reduce = useReducedMotion();
  const wave = (phase: number, amp: (t: number) => number) =>
    Array.from({ length: 140 }, (_, n) => {
      const t = n / 139;
      const y = 40 + Math.sin(t * 40 + phase) * Math.sin(t * 6 + phase * 2) * 26 * amp(t);
      return `${n === 0 ? "M" : "L"}${(t * 320).toFixed(1)} ${y.toFixed(1)}`;
    }).join("");
  const draw = (delay: number) => ({
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.4, ease: "easeInOut", delay },
  });
  return (
    <svg viewBox="0 0 320 96" className="w-full h-auto" aria-label="Track A fading out as track B fades in">
      <motion.path d={wave(0, (t) => Math.max(0, 1 - t * 1.5))} className="stroke-secondary" strokeWidth="2.2" fill="none" strokeLinecap="round" {...draw(0)} />
      <motion.path d={wave(1.7, (t) => Math.max(0, t * 1.5 - 0.5))} className="stroke-primary" strokeWidth="2.2" fill="none" strokeLinecap="round" {...draw(0.3)} />
      <text x="0" y="92" fontSize="12" className="fill-muted-foreground">track A</text>
      <text x="160" y="92" textAnchor="middle" fontSize="12" className="fill-muted-foreground">crossfade on the phrase</text>
      <text x="320" y="92" textAnchor="end" fontSize="12" className="fill-muted-foreground">track B</text>
    </svg>
  );
}

/* Clan members trading ranks week to week: a small bump chart */
export function BumpChart() {
  const reduce = useReducedMotion();
  const ranks = [
    [1, 2, 1, 1, 2],
    [2, 1, 3, 2, 1],
    [3, 4, 2, 3, 3],
    [4, 3, 4, 4, 4],
  ];
  const colors = ["stroke-primary", "stroke-secondary", "stroke-foreground/40", "stroke-muted-foreground/30"];
  const x = (i: number) => 12 + i * 74;
  const y = (r: number) => 8 + (r - 1) * 22;
  return (
    <svg viewBox="0 0 320 96" className="w-full h-auto" aria-label="Bump chart of four clan members trading ranks over five weeks">
      {ranks.map((row, k) => (
        <g key={k}>
          <motion.path
            d={row.map((r, i) => `${i ? "L" : "M"}${x(i)} ${y(r)}`).join("")}
            className={colors[k]}
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: k * 0.12 }}
          />
          {row.map((r, i) => (
            <circle key={i} cx={x(i)} cy={y(r)} r="4" className={`fill-card ${colors[k]}`} strokeWidth="2" />
          ))}
        </g>
      ))}
    </svg>
  );
}
