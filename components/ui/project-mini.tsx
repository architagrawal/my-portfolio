"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Compact animated glyphs for the archive rows. Each one is mounted only while
 * its row is open, so nothing animates behind a closed <details>.
 */

export type MiniKind = "flow" | "queue" | "model" | "graph" | "device";

const LOOP = { repeat: Infinity, ease: "easeInOut" } as const;

function Shell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card/30 p-4 h-[124px] flex flex-col justify-between">
      <p className="font-tech text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {label}
      </p>
      <div className="flex-1 flex items-center">{children}</div>
    </div>
  );
}

/** Packets traveling along a four-node chain. */
function Flow({ reduce }: { reduce: boolean }) {
  return (
    <Shell label="Request path">
      <div className="relative w-full flex items-center justify-between">
        <span className="absolute left-0 right-0 top-1/2 h-px bg-border" aria-hidden="true" />
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="relative z-10 w-2 h-2 bg-background border border-primary/60"
            aria-hidden="true"
          />
        ))}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={`p${i}`}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary shadow-[0_0_6px_hsl(var(--primary))]"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, delay: i * 1.2, ...LOOP }}
              aria-hidden="true"
            />
          ))}
      </div>
    </Shell>
  );
}

/** Queue depth rising and being drained by workers. */
function Queue({ reduce }: { reduce: boolean }) {
  return (
    <Shell label="Queue depth · workers">
      <div className="w-full space-y-2">
        <div className="flex items-end gap-1 h-8" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="flex-1 bg-primary/40 origin-bottom"
              style={{ height: "100%" }}
              animate={reduce ? undefined : { scaleY: [0.15, 1, 0.15] }}
              transition={{ duration: 3, delay: i * 0.12, ...LOOP }}
            />
          ))}
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-1 flex-1 bg-primary/70"
              animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.6, delay: i * 0.22, ...LOOP }}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

/** A loss curve that draws itself, with the marker riding the path. */
function Model({ reduce }: { reduce: boolean }) {
  const d = "M2 46 C 22 44, 30 30, 46 24 S 74 16, 98 12";
  return (
    <Shell label="Training loss">
      <svg viewBox="0 0 100 52" className="w-full h-[52px]" aria-hidden="true">
        <path d="M2 46 H 98" stroke="hsl(var(--border))" strokeWidth="0.5" fill="none" />
        <motion.path
          d={d}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.4"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: [0, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
        />
        {!reduce && (
          <motion.circle
            r="1.8"
            fill="hsl(var(--primary))"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
            style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
          />
        )}
      </svg>
    </Shell>
  );
}

/** A pulse propagating through a small DAG. */
function Graph({ reduce }: { reduce: boolean }) {
  const nodes = [
    { x: 10, y: 26 },
    { x: 38, y: 12 },
    { x: 38, y: 40 },
    { x: 66, y: 26 },
    { x: 90, y: 26 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <Shell label="Typed graph">
      <svg viewBox="0 0 100 52" className="w-full h-[52px]" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(var(--primary))"
            strokeWidth="0.7"
            initial={{ opacity: 0.2 }}
            animate={reduce ? undefined : { opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 2.2, delay: i * 0.28, ...LOOP }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.rect
            key={i}
            x={n.x - 2.6}
            y={n.y - 2.6}
            width="5.2"
            height="5.2"
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, delay: i * 0.28, ...LOOP }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </svg>
    </Shell>
  );
}

/** Rows populating inside a device frame. */
function Device({ reduce }: { reduce: boolean }) {
  return (
    <Shell label="Client render">
      <div className="w-full flex items-center gap-4">
        <div className="w-[38px] h-[74px] border border-border p-1.5 flex flex-col gap-1.5 shrink-0" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 bg-primary/50 origin-left"
              animate={reduce ? undefined : { scaleX: [0.2, 1, 1, 0.2] }}
              transition={{ duration: 3, delay: i * 0.25, ...LOOP }}
            />
          ))}
        </div>
        <div className="flex-1 space-y-2" aria-hidden="true">
          {[72, 100, 56].map((w, i) => (
            <motion.span
              key={i}
              className="block h-1 bg-border origin-left"
              style={{ width: `${w}%` }}
              animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.4, delay: i * 0.3, ...LOOP }}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

const MAP = { flow: Flow, queue: Queue, model: Model, graph: Graph, device: Device };

export function ProjectMini({ kind }: { kind: MiniKind }) {
  const reduce = useReducedMotion() ?? false;
  const Cmp = MAP[kind];
  return <Cmp reduce={reduce} />;
}
