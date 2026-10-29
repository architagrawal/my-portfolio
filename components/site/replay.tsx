"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";

const ease = [0.22, 1, 0.36, 1] as const;

/* A short, looping replay of the platform: ask, chart, cite, check. Each loop takes the next
   question, all on well-known public datasets, so every figure can be checked against the data. */
const EXAMPLES = [
  {
    question: "What share of employees left, by whether they work overtime?",
    bars: [
      { label: "Overtime", value: 30.5, cite: "127 of 416" },
      { label: "Everyone", value: 16.1, cite: "237 of 1,470" },
      { label: "No overtime", value: 10.4, cite: "110 of 1,054" },
    ],
    source: "IBM's public HR attrition data, 1,470 rows.",
  },
  {
    question: "Which Titanic passengers survived, by ticket class?",
    bars: [
      { label: "First", value: 63.0, cite: "136 of 216" },
      { label: "Second", value: 47.3, cite: "87 of 184" },
      { label: "Third", value: 24.2, cite: "119 of 491" },
    ],
    source: "The Titanic passenger list, 891 rows.",
  },
  {
    question: "How many customers churned, by contract length?",
    bars: [
      { label: "Monthly", value: 42.7, cite: "1,655 of 3,875" },
      { label: "One year", value: 11.3, cite: "166 of 1,473" },
      { label: "Two year", value: 2.8, cite: "48 of 1,695" },
    ],
    source: "IBM's public telco churn data, 7,043 rows.",
  },
  {
    question: "Who left the company, by department?",
    bars: [
      { label: "Sales", value: 20.6, cite: "92 of 446" },
      { label: "HR", value: 19.0, cite: "12 of 63" },
      { label: "R&D", value: 13.8, cite: "133 of 961" },
    ],
    source: "IBM's public HR attrition data, 1,470 rows.",
  },
];
const CHECK = "each figure recounted from its rows";

type Phase = "typing" | "chart" | "cites" | "hold";

export function Replay() {
  const reduce = useReduce();
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [loop, setLoop] = useState(0);
  const { question: QUESTION, bars: BARS, source } = EXAMPLES[loop % EXAMPLES.length];
  const top = Math.max(...BARS.map((b) => b.value));

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
  }, [phase, typed, reduce, QUESTION.length]);

  const showChart = phase !== "typing";
  const showCites = phase === "cites" || phase === "hold";

  return (
    <div aria-label="Replay: a question about a public dataset, answered with a chart, cited counts and a check">
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
                initial={{ width: reduce ? `${(b.value / top) * 90}%` : 0 }}
                animate={{ width: showChart ? `${(b.value / top) * 90}%` : 0 }}
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
            BARS.map(({ cite: c }, i) => (
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
      <p className="t-meta mt-3 !text-[13px]">{source}</p>
    </div>
  );
}
