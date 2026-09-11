"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * One bespoke animation per archive project, keyed by what that project actually
 * does. Mounted only while its row is open, so nothing loops behind a closed
 * <details>. Deliberately different shapes and heights: a shared shell made
 * eleven different systems look like one.
 */

export type MiniKind =
  | "mcp-auth"
  | "pr-review"
  | "dag-editor"
  | "autoscale"
  | "calibration"
  | "ppg"
  | "autodiff"
  | "funnel"
  | "state-machine"
  | "fanout"
  | "ladder";

const P = "hsl(var(--primary))";
const B = "hsl(var(--border))";

function Head({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="font-tech text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {label}
      </p>
      {right && <p className="font-tech text-[9px] text-primary tabular-nums">{right}</p>}
    </div>
  );
}

function Box({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-border bg-card/30 p-4 ${className}`}>{children}</div>;
}

/* ── SRP: a token that expires and is silently re-issued, over meter intervals ── */
function McpAuth({ r }: { r: boolean }) {
  return (
    <Box>
      <Head label="Session · meter reads" right="re-auth on 401" />
      <div className="relative h-1.5 bg-border mb-3" aria-hidden="true">
        <motion.span
          className="absolute inset-y-0 left-0 bg-primary origin-left"
          animate={r ? undefined : { scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.75, 0.78], ease: "linear" }}
          style={{ width: "100%" }}
        />
        <motion.span
          className="absolute -top-1 h-3.5 w-px bg-foreground/60"
          style={{ left: "75%" }}
        />
      </div>
      <div className="flex items-end gap-[2px] h-10" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 bg-primary/40 origin-bottom"
            style={{ height: `${28 + Math.sin(i / 2.6) * 22 + (i > 16 ? 26 : 0)}%` }}
            initial={r ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: i * 0.045 }}
          />
        ))}
      </div>
      <p className="mt-2 font-tech text-[9px] text-muted-foreground/70">15-min intervals · kWh</p>
    </Box>
  );
}

/* ── PR agent: per-file verdicts landing, then the merge gate deciding ── */
const FILES = [
  { n: "api/routes.ts", v: "block" },
  { n: "lib/parse.ts", v: "pass" },
  { n: "ui/Table.tsx", v: "note" },
  { n: "db/query.ts", v: "pass" },
];
function PrReview({ r }: { r: boolean }) {
  return (
    <Box>
      <Head label="Per-file verdict" right="1 blocking" />
      <ul className="space-y-1.5">
        {FILES.map((f, i) => (
          <motion.li
            key={f.n}
            className="flex items-center gap-2"
            initial={r ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.35 }}
          >
            <span
              className={`w-1.5 h-1.5 shrink-0 ${
                f.v === "block" ? "bg-primary" : f.v === "note" ? "bg-primary/40" : "bg-border"
              }`}
            />
            <span className="font-mono text-[9.5px] text-foreground/70 truncate flex-1">{f.n}</span>
            <span
              className={`font-tech text-[9px] ${
                f.v === "block" ? "text-primary" : "text-muted-foreground/70"
              }`}
            >
              {f.v}
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.p
        className="mt-3 pt-2 border-t border-border font-tech text-[9px] uppercase tracking-[0.15em] text-primary"
        initial={r ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        merge held · correctness
      </motion.p>
    </Box>
  );
}

/* ── No-code builder: typed handles connecting, edge snapping into place ── */
function DagEditor({ r }: { r: boolean }) {
  const nodes = [
    { x: 8, y: 30, w: 26, h: 14 },
    { x: 48, y: 8, w: 26, h: 14 },
    { x: 48, y: 52, w: 26, h: 14 },
    { x: 86, y: 30, w: 26, h: 14 },
  ];
  return (
    <Box>
      <Head label="Typed DAG · undo depth 12" />
      <svg viewBox="0 0 120 80" className="w-full h-[78px]" aria-hidden="true">
        {[
          [0, 1],
          [0, 2],
          [1, 3],
          [2, 3],
        ].map(([a, b], i) => {
          const s = nodes[a];
          const e = nodes[b];
          const x1 = s.x + s.w;
          const y1 = s.y + s.h / 2;
          const x2 = e.x;
          const y2 = e.y + e.h / 2;
          const mx = (x1 + x2) / 2;
          return (
            <motion.path
              key={i}
              d={`M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={P}
              strokeWidth="0.9"
              initial={r ? { pathLength: 1 } : { pathLength: 0 }}
              animate={r ? undefined : { pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.28 }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="hsl(var(--card))" stroke={B} strokeWidth="0.8" />
            <rect x={n.x} y={n.y} width={n.w} height="2.6" fill={P} opacity="0.5" />
            <circle cx={n.x} cy={n.y + n.h / 2} r="1.4" fill={P} />
            <circle cx={n.x + n.w} cy={n.y + n.h / 2} r="1.4" fill={P} />
          </g>
        ))}
      </svg>
    </Box>
  );
}

/* ── Elastic service: queue climbs, instances follow late, then drain ── */
function Autoscale({ r }: { r: boolean }) {
  const depth = [10, 26, 52, 78, 92, 74, 46, 22, 12];
  const inst = [1, 1, 2, 3, 5, 5, 4, 2, 1];
  return (
    <Box>
      <Head label="Queue depth · instances" right="100 req / 5 s" />
      <div className="flex items-end gap-1 h-14" aria-hidden="true">
        {depth.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 h-full">
            <motion.span
              className="w-full bg-primary/30 origin-bottom"
              style={{ height: `${d}%` }}
              initial={r ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
            />
            <motion.span
              className="w-full bg-primary shrink-0"
              style={{ height: `${inst[i] * 3}px` }}
              initial={r ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.12 }}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 font-tech text-[9px] text-muted-foreground/70">
        scale-out lags depth by one tick
      </p>
    </Box>
  );
}

/* ── Soccer: a reliability diagram settling onto the diagonal ── */
function Calibration({ r }: { r: boolean }) {
  const pts = [
    [14, 20],
    [28, 31],
    [42, 38],
    [56, 60],
    [70, 66],
    [84, 81],
  ];
  return (
    <Box>
      <Head label="Reliability · 3-class" right="log loss" />
      <svg viewBox="0 0 100 62" className="w-full h-[68px]" aria-hidden="true">
        <line x1="4" y1="58" x2="96" y2="4" stroke={B} strokeWidth="0.7" strokeDasharray="2 2" />
        <line x1="4" y1="58" x2="96" y2="58" stroke={B} strokeWidth="0.5" />
        <line x1="4" y1="58" x2="4" y2="4" stroke={B} strokeWidth="0.5" />
        {pts.map(([px, py], i) => (
          <motion.circle
            key={i}
            cx={4 + px * 0.92}
            r="2"
            fill={P}
            initial={r ? { cy: 58 - py * 0.54 } : { cy: 58, opacity: 0 }}
            animate={{ cy: 58 - py * 0.54, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
      <div className="mt-1 flex gap-1" aria-hidden="true">
        {[
          ["W", 52],
          ["D", 23],
          ["L", 25],
        ].map(([k, v], i) => (
          <div key={k as string} className="flex-1">
            <motion.span
              className="block h-1 bg-primary/60 origin-left"
              initial={r ? false : { scaleX: 0 }}
              animate={{ scaleX: (v as number) / 100 }}
              transition={{ duration: 0.6, delay: 1 + i * 0.12 }}
            />
            <span className="font-tech text-[8.5px] text-muted-foreground/70">{k}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── FitLife: a PPG trace with the peaks the detector accepted ── */
function Ppg({ r }: { r: boolean }) {
  const d =
    "M0 20 L6 19 L9 6 L12 24 L16 20 L22 19 L25 7 L28 25 L32 20 L38 19 L41 6 L44 24 L48 20 L54 19 L57 7 L60 25 L64 20 L70 19 L73 6 L76 24 L80 20 L88 20";
  return (
    <Box>
      <Head label="PPG · camera + flash" right="72 bpm" />
      <svg viewBox="0 0 88 34" className="w-full h-[56px]" aria-hidden="true">
        <motion.path
          d={d}
          fill="none"
          stroke={P}
          strokeWidth="1.1"
          initial={r ? { pathLength: 1 } : { pathLength: 0 }}
          animate={r ? undefined : { pathLength: [0, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
        {[9, 25, 41, 57, 73].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy="6"
            r="1.5"
            fill="none"
            stroke={P}
            strokeWidth="0.8"
            animate={r ? undefined : { opacity: [0, 1, 1, 0], scale: [0.6, 1.4, 1, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55, times: [0, 0.1, 0.6, 1] }}
          />
        ))}
      </svg>
      <p className="mt-1 font-tech text-[9px] text-muted-foreground/70">
        band-passed · low amplitude rejected
      </p>
    </Box>
  );
}

/* ── Autodiff: forward tape fills, then gradients sweep back ── */
function Autodiff({ r }: { r: boolean }) {
  const ops = ["matmul", "add", "relu", "matmul", "softmax", "loss"];
  return (
    <Box>
      <Head label="Tape · forward then adjoint" />
      <div className="space-y-1">
        {ops.map((op, i) => (
          <div key={op + i} className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-muted-foreground/70 w-12 shrink-0">{op}</span>
            <span className="relative flex-1 h-[7px] bg-border/50" aria-hidden="true">
              <motion.span
                className="absolute inset-y-0 left-0 bg-primary/50 origin-left"
                animate={r ? { scaleX: 1 } : { scaleX: [0, 1, 1, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.12 + i * 0.05, 0.5, 1] }}
                style={{ width: "100%" }}
              />
              <motion.span
                className="absolute inset-y-0 right-0 bg-primary origin-right"
                animate={r ? { scaleX: 0 } : { scaleX: [0, 0, 1, 0] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  times: [0, 0.55, 0.72 + (ops.length - i) * 0.03, 1],
                }}
                style={{ width: "42%" }}
              />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 font-tech text-[9px] text-muted-foreground/70">
        gradients accumulate, never overwrite
      </p>
    </Box>
  );
}

/* ── Commerce: funnel narrowing, with the cache tier beside it ── */
function Funnel({ r }: { r: boolean }) {
  const steps = [
    ["catalog", 100],
    ["product", 68],
    ["cart", 41],
    ["checkout", 27],
    ["paid", 22],
  ] as const;
  return (
    <Box>
      <Head label="Checkout funnel" right="redis hit 91%" />
      <div className="space-y-1.5">
        {steps.map(([k, v], i) => (
          <div key={k} className="flex items-center gap-2">
            <span className="font-tech text-[9px] text-muted-foreground/70 w-14 shrink-0">{k}</span>
            <motion.span
              className="h-2.5 bg-primary/50 origin-left"
              initial={r ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: `${v}%` }}
            />
            <span className="font-tech text-[9px] text-muted-foreground/70 tabular-nums">{v}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ── Task system: only declared transitions fire ── */
const STATES = ["open", "assigned", "in review", "done"];
function StateMachine({ r }: { r: boolean }) {
  return (
    <Box>
      <Head label="Declared transitions" right="reopen → notify" />
      <div className="flex items-center justify-between gap-1">
        {STATES.map((st, i) => (
          <div key={st} className="flex items-center gap-1 flex-1 last:flex-none">
            <motion.span
              className="font-tech text-[9px] px-1.5 py-1 border whitespace-nowrap"
              style={{ borderColor: P, color: P }}
              animate={r ? { opacity: 0.5 } : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.3], delay: i * 0.9 }}
            >
              {st}
            </motion.span>
            {i < STATES.length - 1 && (
              <span className="relative flex-1 h-px bg-border" aria-hidden="true">
                <motion.span
                  className="absolute -top-[1px] h-[3px] w-2 bg-primary"
                  animate={r ? undefined : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3.1, delay: i * 0.9 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-border flex items-center gap-2">
        <span className="font-tech text-[9px] text-muted-foreground/70">done → open</span>
        <span className="font-tech text-[9px] text-primary">blocked unless reopened</span>
      </div>
    </Box>
  );
}

/* ── Chat: one publish, N sockets, presence ── */
function Fanout({ r }: { r: boolean }) {
  return (
    <Box>
      <Head label="Socket fan-out" right="redis channel" />
      <svg viewBox="0 0 110 70" className="w-full h-[74px]" aria-hidden="true">
        <rect x="2" y="30" width="18" height="10" fill="hsl(var(--card))" stroke={P} strokeWidth="0.8" />
        {[6, 22, 38, 54].map((y, i) => (
          <g key={y}>
            <path
              d={`M20 35 C 50 35, 60 ${y + 5}, 86 ${y + 5}`}
              fill="none"
              stroke={B}
              strokeWidth="0.7"
            />
            <motion.path
              d={`M20 35 C 50 35, 60 ${y + 5}, 86 ${y + 5}`}
              fill="none"
              stroke={P}
              strokeWidth="0.7"
              animate={r ? { strokeOpacity: 0.4 } : { strokeOpacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, times: [0, 0.3, 1] }}
            />
            <rect x="86" y={y} width="20" height="10" fill="hsl(var(--card))" stroke={B} strokeWidth="0.7" />
            <motion.circle
              cx="104"
              cy={y + 2}
              r="1.3"
              fill={P}
              animate={r ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            {!r && (
              <motion.circle
                r="1.6"
                fill={P}
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18, repeatDelay: 0.9 }}
                style={{
                  offsetPath: `path("M20 35 C 50 35, 60 ${y + 5}, 86 ${y + 5}")`,
                } as React.CSSProperties}
              />
            )}
          </g>
        ))}
      </svg>
    </Box>
  );
}

/* ── Platform: the candidate-presentation ladder falling through its rungs ── */
const RUNGS = [
  { n: "whole codebook", note: "cheapest, cache-stable" },
  { n: "split by top level", note: "needs a usable top" },
  { n: "clustered_top_k", note: "one shortlist per group" },
  { n: "per-response", note: "no cache benefit" },
];
function Ladder({ r }: { r: boolean }) {
  return (
    <Box>
      <Head label="Candidate presentation" right="2 size checks" />
      <ol className="space-y-2">
        {RUNGS.map((rung, i) => (
          <li key={rung.n} className="flex items-start gap-2">
            <motion.span
              className="mt-[5px] w-1.5 h-1.5 shrink-0"
              animate={
                r
                  ? { backgroundColor: P }
                  : { backgroundColor: [B, P, B], scale: [1, 1.5, 1] }
              }
              transition={{ duration: 4.4, repeat: Infinity, delay: i * 1.05, times: [0, 0.12, 0.4] }}
            />
            <span className="min-w-0">
              <span className="block font-tech text-[10px] text-foreground/80">{rung.n}</span>
              <span className="block font-tech text-[9px] text-muted-foreground/70">{rung.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 pt-2 border-t border-border font-tech text-[9px] text-primary">
        each rung tried before the next
      </p>
    </Box>
  );
}

const MAP: Record<MiniKind, (p: { r: boolean }) => JSX.Element> = {
  "mcp-auth": McpAuth,
  "pr-review": PrReview,
  "dag-editor": DagEditor,
  autoscale: Autoscale,
  calibration: Calibration,
  ppg: Ppg,
  autodiff: Autodiff,
  funnel: Funnel,
  "state-machine": StateMachine,
  fanout: Fanout,
  ladder: Ladder,
};

export function ProjectMini({ kind }: { kind: MiniKind }) {
  const reduce = useReducedMotion() ?? false;
  const Cmp = MAP[kind];
  return <Cmp r={reduce} />;
}
