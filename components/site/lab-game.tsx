"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiments } from "@/lib/data/lab";
import { CountUp, LabViz } from "./lab-viz";

const ease = [0.22, 1, 0.36, 1] as const;
const projects = ["All", ...Array.from(new Set(experiments.map((e) => e.project)))];

/* The hard problems, result first. Filter by project. */
export function LabGame() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("All");
  const shown = experiments.filter((e) => filter === "All" || e.project === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projects.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`rounded-full px-4 py-1.5 text-[15px] font-bold transition-colors ${
              filter === p ? "bg-foreground text-background" : "bg-muted text-foreground/70 hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <ul className="mt-6">
        {shown.map((e, i) => (
          <motion.li
            key={e.title}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: reduce ? 0 : i * 0.04 }}
            className="grid gap-x-10 gap-y-3 py-9 sm:grid-cols-[13rem_1fr]"
          >
            <div>
              <p className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.03em] text-primary tabular-nums">
                <CountUp value={e.stat} />
              </p>
              <p className="mt-2 text-[14px] font-semibold text-muted-foreground">{e.unit}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-secondary">{e.project}</p>
              <h2 className="mt-1.5 text-[1.35rem] font-extrabold leading-snug tracking-tight">{e.title}</h2>
              <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-foreground/75">{e.body}</p>
              {e.viz && <LabViz kind={e.viz} />}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
