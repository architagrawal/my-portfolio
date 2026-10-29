"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";

const ease = [0.22, 1, 0.36, 1] as const;

/* A short, looping replay of the platform: ask, chart, cite. Each loop takes the next question.
   All are public datasets from the platform's reference corpus, where each published figure was
   recomputed from the raw data; only the first carries row counts. */
const EXAMPLES: { question: string; bars: { label: string; value: number; cite?: string }[]; source: string }[] = [
  { question: "What share of employees left, by whether they work overtime?", bars: [{ label: "Overtime", value: 30.5, cite: "127 of 416" }, { label: "Everyone", value: 16.1, cite: "237 of 1,470" }, { label: "No overtime", value: 10.4, cite: "110 of 1,054" }], source: "IBM's public HR attrition data, 1,470 rows." },
  { question: "How do developers feel about AI tools in their workflow?", bars: [{ label: "Favorable", value: 48.6 }, { label: "Very favorable", value: 27.7 }, { label: "Indifferent", value: 16.5 }, { label: "Unsure", value: 4.0 }], source: "Stack Overflow Developer Survey 2023, 89,184 rows." },
  { question: "Which languages do developers use most?", bars: [{ label: "JavaScript", value: 63.6 }, { label: "HTML/CSS", value: 53.0 }, { label: "Python", value: 49.3 }, { label: "SQL", value: 48.7 }], source: "Stack Overflow Developer Survey 2023, 89,184 rows." },
  { question: "How does a purple, already-visited search link make you feel?", bars: [{ label: "Hello, old friend", value: 51.6 }, { label: "Indifferent", value: 18.3 }, { label: "Amused", value: 15.9 }, { label: "Annoyed", value: 14.3 }], source: "Stack Overflow Developer Survey 2020, 64,461 rows." },
  { question: "Which editors do developers use regularly?", bars: [{ label: "VS Code", value: 71.1 }, { label: "Visual Studio", value: 33.0 }, { label: "Notepad++", value: 29.7 }, { label: "IntelliJ", value: 28.7 }], source: "Stack Overflow Developer Survey 2021, 83,439 rows." },
  { question: "Do Python developers work with big data?", bars: [{ label: "No", value: 71 }, { label: "Yes", value: 15 }, { label: "Tough to say", value: 14 }], source: "Python Developers Survey 2023, 25,701 rows." },
  { question: "Which adults smoke cigarettes now, by age?", bars: [{ label: "35-49", value: 15.2 }, { label: "50-64", value: 14.7 }, { label: "18-34", value: 11.0 }, { label: "65 and over", value: 9.0 }], source: "CDC National Health Interview Survey 2020, 31,568 rows." },
  { question: "Which currencies are most overvalued against the dollar?", bars: [{ label: "Switzerland", value: 38.0 }, { label: "Argentina", value: 20.1 }, { label: "Uruguay", value: 19.3 }, { label: "Norway", value: 15.3 }], source: "The Economist's Big Mac index, 2,056 rows." },
  { question: "Which animals do Americans say are wrong to eat?", bars: [{ label: "Chimp", value: 75 }, { label: "Dog", value: 73 }, { label: "Cat", value: 70 }, { label: "Dolphin", value: 62 }], source: "YouGov poll of U.S. adults." },
  { question: "Who answered the 2020 Kaggle data science survey, by gender?", bars: [{ label: "Man", value: 78.8 }, { label: "Woman", value: 19.4 }, { label: "Prefer not to say", value: 1.3 }], source: "Kaggle Machine Learning and Data Science Survey 2020, 20,036 rows." },
];

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
    <div aria-label="Replay: questions about public datasets, each answered with a chart">
      <p className="t-eyebrow">Ask</p>
      <p className="mt-2 min-h-[3em] text-[15px] font-medium leading-snug text-foreground">
        {QUESTION.slice(0, typed)}
        {phase === "typing" && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-foreground" />}
      </p>

      <div className="mt-5 space-y-2.5" key={loop}>
        {BARS.map((b, i) => (
          <div key={b.label} className="grid grid-cols-[8rem_1fr_2.25rem] items-center gap-2 text-[13px]">
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
              {Number.isInteger(b.value) ? b.value : b.value.toFixed(1)}%
            </motion.span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex min-h-[4rem] flex-wrap content-start gap-1.5">
        <AnimatePresence>
          {showCites &&
            BARS.flatMap(({ cite }) => (cite ? [cite] : [])).map((c, i) => (
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
        </AnimatePresence>
      </div>
      <p className="t-meta mt-3 !text-[13px]">{source}</p>
    </div>
  );
}
