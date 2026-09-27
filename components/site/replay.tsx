"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* A short, looping replay of the survey platform: ask, chart, cite.
   Illustrative only: the topics and numbers are example data, not ASU results. */
const QUESTION = "Which topics drove course satisfaction down this term?";
const BARS = [
  { label: "Workload", value: 38 },
  { label: "Feedback speed", value: 27 },
  { label: "Clarity", value: 19 },
  { label: "Tech issues", value: 11 },
];
const CITES = ["fact 12: 38% of comments", "fact 7: n = 1,240", "fact 19: +9 pts vs. fall"];

type Phase = "typing" | "chart" | "cites" | "hold";

export function Replay() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (reduce) {
      setTyped(QUESTION.length);
      setPhase("hold");
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      t = typed < QUESTION.length ? setTimeout(() => setTyped((n) => n + 1), 30) : setTimeout(() => setPhase("chart"), 350);
    } else if (phase === "chart") {
      t = setTimeout(() => setPhase("cites"), 1200);
    } else if (phase === "cites") {
      t = setTimeout(() => setPhase("hold"), 1100);
    } else {
      t = setTimeout(() => {
        setTyped(0);
        setPhase("typing");
        setLoop((n) => n + 1);
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [phase, typed, reduce]);

  const showChart = phase !== "typing";
  const showCites = phase === "cites" || phase === "hold";

  return (
    <div className="rounded-xl bg-muted p-4" aria-label="Illustrative replay: a question about a survey, answered with a chart and cited facts">
      <div className="rounded-lg bg-card px-3 py-2.5 text-[13px] leading-snug shadow-soft">
        <span className="mr-1.5 font-bold text-primary">Ask</span>
        {QUESTION.slice(0, typed)}
        {phase === "typing" && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-foreground" />}
      </div>

      <div className="mt-4 space-y-2.5" key={loop}>
        {BARS.map((b, i) => (
          <div key={b.label} className="grid grid-cols-[6.5rem_1fr_2.25rem] items-center gap-2 text-[12px]">
            <span className="truncate font-semibold text-muted-foreground">{b.label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-card">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-primary/40"}`}
                initial={{ width: reduce ? `${b.value * 2.4}%` : 0 }}
                animate={{ width: showChart ? `${b.value * 2.4}%` : 0 }}
                transition={{ duration: 0.8, ease, delay: showChart ? i * 0.1 : 0 }}
              />
            </div>
            <motion.span
              className="text-right font-bold tabular-nums"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: showChart ? 1 : 0 }}
              transition={{ duration: 0.3, delay: showChart ? 0.35 + i * 0.1 : 0 }}
            >
              {b.value}%
            </motion.span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex min-h-[1.75rem] flex-wrap gap-1.5">
        <AnimatePresence>
          {showCites &&
            CITES.map((c, i) => (
              <motion.span
                key={c + loop}
                initial={reduce ? false : { opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease, delay: i * 0.1 }}
                className="rounded-md bg-card px-2 py-1 text-[11px] font-semibold text-muted-foreground shadow-soft"
              >
                {c}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Example data, not real survey results.</p>
    </div>
  );
}
