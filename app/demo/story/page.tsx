"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const serif = { fontFamily: "'Instrument Serif', 'Crimson Pro', Georgia, serif" };
const hand = { fontFamily: "'Caveat', 'Kalam', cursive" };

// hand-written margin note
function Margin({ children, rotate = -3, color = "#c1440e", className = "" }: any) {
  return (
    <span
      className={`absolute text-lg md:text-xl leading-tight max-w-[12rem] ${className}`}
      style={{ ...hand, color, transform: `rotate(${rotate}deg)` }}
    >
      <span className="inline-block">↳ </span>{children}
    </span>
  );
}

// underline scribble
function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute -bottom-2 left-0 w-full ${className}`} viewBox="0 0 300 12" preserveAspectRatio="none">
      <path d="M2 8 Q 60 2, 120 7 T 240 6 T 298 8" fill="none" stroke="#c1440e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// circled word
function Circle({ children }: any) {
  return (
    <span className="relative inline-block px-2">
      {children}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 120 50" preserveAspectRatio="none">
        <ellipse cx="60" cy="25" rx="56" ry="22" fill="none" stroke="#c1440e" strokeWidth="2" opacity="0.8" />
      </svg>
    </span>
  );
}

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // hero morph
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  const [word, setWord] = useState("intelligent systems");
  const choices = ["intelligent systems", "LLM infrastructure", "retrieval engines", "dependable ML"];

  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.25) setChapter(0);
    else if (v < 0.55) setChapter(1);
    else if (v < 0.85) setChapter(2);
    else setChapter(3);
  });

  return (
    <main ref={ref} className="bg-[#f7f2e8] text-[#1a1a1a] relative" style={serif}>
      {/* paper grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0"
           style={{
             backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
           }} />

      {/* chapter indicator (sticky) */}
      <div className="fixed top-6 right-6 z-40 text-xs tracking-[0.3em] uppercase text-neutral-600">
        <div className="flex flex-col gap-2 items-end">
          {["opening", "what i build", "how i got here", "say hello"].map((t, i) => (
            <div key={t} className={`transition-all ${chapter === i ? "text-[#c1440e]" : ""}`}>
              {String(i + 1).padStart(2, "0")} · {t}
              {chapter === i && <span className="ml-2" style={hand}>←</span>}
            </div>
          ))}
        </div>
      </div>

      {/* CH 1 — hero that morphs by click */}
      <section className="min-h-screen relative flex items-center px-6 md:px-16">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative max-w-6xl">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-6">A working notebook by</p>
          <p className="text-2xl md:text-3xl mb-4">Archit Agrawal, engineer</p>

          <h1 className="text-[9vw] md:text-[6.5vw] leading-[1.02] tracking-[-0.02em]">
            I spend my days<br/>
            <span className="italic text-neutral-500">quietly</span> building{" "}
            <span className="relative inline-block align-baseline">
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="underline decoration-[#c1440e] decoration-[3px] underline-offset-[6px]"
              >
                {word}
              </motion.span>
            </span>.
          </h1>

          <div className="mt-10 flex flex-wrap gap-3 items-center">
            <span className="text-neutral-500 text-lg">pick one →</span>
            {choices.map((c) => (
              <button
                key={c}
                onClick={() => setWord(c)}
                className={`text-lg px-3 py-1 border border-neutral-400 rounded-full hover:border-[#c1440e] hover:text-[#c1440e] transition ${
                  word === c ? "bg-[#c1440e] text-[#f7f2e8] border-[#c1440e]" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <Margin className="hidden md:block right-[-2rem] top-[20%]" rotate={6}>
            the sentence changes depending on who’s asking.
          </Margin>

          <p className="mt-24 text-sm text-neutral-500" style={hand}>↓ keep scrolling — the story continues ↓</p>
        </motion.div>
      </section>

      {/* CH 2 — the work, as prose, not cards */}
      <section className="min-h-screen relative px-6 md:px-16 py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-10">§ Chapter Two — What I Build</p>
        <div className="max-w-4xl text-3xl md:text-5xl leading-[1.25] tracking-[-0.01em] relative">
          <span>Most recently, a </span>
          <span className="relative">
            <span className="italic">Neural Retrieval Engine</span>
            <Scribble />
          </span>
          <span> — about <Circle>40M queries/day</Circle> — because search quietly decides which answers get surfaced, and bad search is usually why a product feels dumb.</span>

          <Margin className="hidden md:block -left-52 top-[10%]" rotate={-8} color="#1d4ed8">
            this one I’m most proud of. still working on eval harness.
          </Margin>
        </div>

        <div className="max-w-4xl mt-14 text-2xl md:text-4xl leading-[1.3] text-neutral-800 relative">
          <span>Before that, an </span>
          <span className="italic">LLM Agent Orchestrator</span>
          <span>, a </span>
          <span className="italic">Realtime Data Mesh</span>
          <span>, and a study of <Circle>vector search at scale</Circle> that became a small open-source library.</span>

          <Margin className="hidden md:block -right-48 top-[40%]" rotate={5}>
            the data mesh one broke twice in prod. both times my fault.
          </Margin>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-4xl mt-20 pl-6 border-l-4 border-[#c1440e] text-neutral-700 text-xl md:text-2xl italic"
        >
          None of these shipped alone. Every one was a collaboration — credit for anything clever
          usually belongs to the person next to me on the whiteboard.
        </motion.div>
      </section>

      {/* CH 3 — timeline as a hand-drawn thread */}
      <section className="min-h-screen relative px-6 md:px-16 py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-10">§ Chapter Three — How I Got Here</p>

        <div className="relative max-w-5xl">
          <svg className="absolute left-0 top-0 h-full w-16" viewBox="0 0 60 800" preserveAspectRatio="none">
            <path d="M30 0 C 10 150, 50 300, 30 450 S 10 650, 30 800"
                  fill="none" stroke="#c1440e" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          <div className="space-y-16 pl-24">
            {[
              { yr: "2024 — now", where: "Staff Engineer, Acme", what: "LLM infra, retrieval, evals. Teaching the org how to measure.", note: "the most fun I’ve had in a while" },
              { yr: "2022 — 24", where: "Senior ML, Globex", what: "Ranking, features, serving. Got to run my first real incident post-mortem.", note: "learned what ‘production’ actually means" },
              { yr: "2020 — 22", where: "Engineer, Initech", what: "Pipelines, plumbing, unglamorous data cleanup — the craft I’m still most grateful for.", note: "quietly the most formative job" },
            ].map((r, i) => (
              <motion.div
                key={r.yr}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[4.5rem] top-3 w-4 h-4 rounded-full bg-[#c1440e] border-4 border-[#f7f2e8]" />
                <p className="text-sm tracking-widest uppercase text-neutral-500">{r.yr}</p>
                <p className="text-3xl md:text-4xl mt-1">{r.where}</p>
                <p className="text-lg text-neutral-700 mt-2 max-w-2xl">{r.what}</p>
                <p className="mt-2 text-xl text-[#c1440e]" style={hand}>— {r.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CH 4 — contact as a letter */}
      <section className="min-h-screen relative px-6 md:px-16 py-24 flex items-center">
        <div className="max-w-3xl relative">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-10">§ Chapter Four — Say Hello</p>

          <div className="bg-[#fdfaf1] border border-neutral-300 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] p-10 md:p-14 relative">
            <div className="absolute -top-3 left-12 w-20 h-8 bg-[#c1440e]/60 rotate-[-4deg] opacity-70" />

            <p className="text-2xl md:text-3xl leading-relaxed">
              Dear reader,
            </p>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-neutral-800">
              If you&rsquo;ve made it this far, you already know more about me than most résumés tell.
              I&rsquo;m interested in small teams doing unreasonably ambitious things, and in people
              who care about craft more than credentials. If that&rsquo;s you —
            </p>

            <a href="mailto:admin@mysta.ge"
               className="inline-block mt-10 text-4xl md:text-6xl italic underline decoration-[#c1440e] decoration-[3px] underline-offset-8 hover:text-[#c1440e] transition">
              write to me.
            </a>

            <p className="mt-10 text-neutral-600">— Archit</p>
            <p className="text-neutral-500 text-sm mt-1">admin@mysta.ge · LinkedIn · GitHub</p>
          </div>

          <Margin className="hidden md:block -right-44 top-10" rotate={8}>
            p.s. I reply to everything, usually within a day.
          </Margin>
        </div>
      </section>
    </main>
  );
}
