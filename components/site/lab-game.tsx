"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";
import { experiments } from "@/lib/data/lab";
import { CountUp, LabViz } from "./lab-viz";

const ease = [0.22, 1, 0.36, 1] as const;
const projects = ["All", ...Array.from(new Set(experiments.map((e) => e.project)))];

/* The hard problems, result first: the number, what it is, then how. Filter by project. */
export function LabGame() {
  const reduce = useReduce();
  const [filter, setFilter] = useState("All");
  const shown = experiments.filter((e) => filter === "All" || e.project === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:pl-[11rem]" role="group" aria-label="Filter by project">
        {projects.map((p) => (
          <button key={p} type="button" aria-pressed={filter === p} onClick={() => setFilter(p)} className="ui-toggle">
            {p}
          </button>
        ))}
      </div>

      <ul className="mt-4">
        {shown.map((e, i) => (
          <motion.li
            key={e.title}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : i * 0.04 }}
            className="ui-section !mt-0 py-10 md:!mt-0"
          >
            <p className="t-eyebrow !text-muted-foreground md:pt-3">{e.project}</p>
            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="t-stat t-stat-xl">
                  <CountUp value={e.stat} />
                </span>
                <span className="t-meta">{e.unit}</span>
              </p>
              <h2 className="t-h3 mt-4">{e.title}</h2>
              <p className="t-body mt-2 max-w-[42rem] text-muted-foreground">{e.body}</p>
              {e.viz && <LabViz kind={e.viz} />}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
