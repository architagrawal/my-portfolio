"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";

const ease = [0.22, 1, 0.36, 1] as const;

/* A short, looping replay of the platform: ask, chart, cite, check.
   Real figures from IBM's public HR attrition dataset (1,470 rows), as the platform draws them. */
const QUESTION = "What share of employees left, by whether they work overtime?";
const BARS = [
  { label: "Overtime", value: 30.5 },
  { label: "Everyone", value: 16.1 },
  { label: "No overtime", value: 10.4 },
];
const CITES = ["127 of 416", "237 of 1,470", "110 of 1,054"];
const CHECK = "checked: matches the published 30.5%";

type Phase = "typing" | "chart" | "cites" | "hold";

export function Replay() {
  const reduce = useReduce();
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
    <div aria-label="Replay: a question about a public HR dataset, answered with a chart, cited counts and a check">
      <p className="t-eyebrow">Ask</p>
      <p className="mt-2 min-h-[3em] text-[15px] font-medium leading-snug text-foreground">
        {QUESTION.slice(0, typed)}
        {phase === "typing" && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-foreground" />}
      </p>

      <div className="mt-5 space-y-2.5" key={loop}>
        {BARS.map((b, i) => (
          <div key={b.label} className="grid grid-cols-[6.5rem_1fr_2.25rem] items-center gap-2 text-[13px]">
            <span className="truncate text-muted-foreground">{b.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.07]">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-primary/40"}`}
                initial={{ width: reduce ? `${b.value * 2.4}%` : 0 }}
                animate={{ width: showChart ? `${b.value * 2.4}%` : 0 }}
                transition={{ duration: reduce ? 0 : 0.8, ease, delay: showChart ? i * 0.1 : 0 }}
              />
            </div>
            <motion.span
              className="text-right font-bold tabular-nums"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: showChart ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: showChart ? 0.35 + i * 0.1 : 0 }}
            >
              {b.value.toFixed(1)}%
            </motion.span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex min-h-[4rem] flex-wrap content-start gap-1.5">
        <AnimatePresence>
          {showCites &&
            CITES.map((c, i) => (
              <motion.span
                key={c + loop}
                initial={reduce ? false : { opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease, delay: i * 0.1 }}
                className="ui-chip !text-[12px]"
              >
                {c}
              </motion.span>
            ))}
          {showCites && (
            <motion.span
              key={"check" + loop}
              initial={reduce ? false : { opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.45 }}
              className="ui-chip !text-[12px] !text-primary"
            >
              {CHECK}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="t-meta mt-3 !text-[13px]">IBM&apos;s public HR attrition data, 1,470 rows.</p>
    </div>
  );
}
