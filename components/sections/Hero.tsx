"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/ui/magnetic";
import Starfield from "@/components/ui/starfield";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/agrawal-archit", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/architagrawal", label: "GitHub" },
];

const crafts = ["AI agents", "agentic workflows", "RAG systems", "LLM evals", "full-stack products"];

/* Rotating craft word with blur dissolve; container width animates to each word */
function CraftRotator() {
  const [idx, setIdx] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % crafts.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [idx]);

  return (
    <motion.span
      className="relative inline-block whitespace-nowrap align-baseline"
      animate={width ? { width } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* invisible in-flow copy keeps line height and provides the target width */}
      <span ref={measureRef} className="invisible inline-block whitespace-nowrap" aria-hidden="true">
        {crafts[idx]}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 whitespace-nowrap text-primary"
        >
          {crafts[idx]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/* Staggered letter reveal for a display line */
function RevealLine({ text, delay }: { text: string; delay: number }) {
  const letters = text.split("");

  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="inline-block whitespace-pre"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
        }}
        aria-hidden="true"
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: {
                y: 0,
                rotate: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

const impact = [
  { value: <>70,000<span className="text-primary">+</span></>, label: "records indexed daily" },
  { value: <>60,000<span className="text-primary">+</span></>, label: "students served at ASU" },
  { value: <>4h <span className="text-primary">→</span> 15m</>, label: "transcript insight loop" },
  { value: <>200<span className="text-primary">+</span></>, label: "tests on prod agents" },
];

const marqueeItems = [
  "AI Agents",
  "LangGraph",
  "RAG",
  "MCP",
  "Fine-Tuning",
  "Evals",
  "Full-Stack",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Content gently lifts and fades as the hero scrolls out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.05]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col justify-between relative pt-28 pb-0 overflow-hidden"
    >
      <Starfield className="absolute inset-0 z-0 pointer-events-none" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10"
      >
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group inline-flex items-center gap-2.5 border border-border px-3.5 py-1.5 mb-6 w-fit hover:border-primary transition-colors"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 bg-primary" />
          </span>
          <span className="font-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
            Open to AI/ML &amp; full-stack roles
          </span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-tech text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8"
        >
          AI Engineer · Software Engineer · Full-Stack
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
          <h1
            className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-foreground"
            aria-label="Archit Agrawal"
          >
            <RevealLine text="Archit" delay={0.15} />
            <RevealLine text="Agrawal" delay={0.35} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 lg:mb-4 flex flex-col items-center gap-4"
          >
            <div className="relative w-36 h-48 sm:w-44 sm:h-56 border border-border overflow-hidden -rotate-3 group">
              <Image
                src="/archit-profile.webp"
                alt="Archit Agrawal"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover"
                style={{ objectPosition: "40% center" }}
                priority
                quality={85}
              />
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </Magnetic>
              ))}
            </div>

            <a
              href="#projects"
              className="font-hand text-xl sm:text-2xl text-primary -rotate-2 hover:rotate-0 transition-transform leading-tight text-center max-w-[11rem]"
            >
              currently building
              <br />
              PrismSplit ↓
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 text-lg sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          I ship <CraftRotator /> to production. Currently building the
          agent infrastructure behind MyStage&apos;s live-events platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 mb-12 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <Magnetic>
            <a
              href="/Archit_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>

          <Magnetic>
            <button
              onClick={scrollToAbout}
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              See My Work
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <motion.dl
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 1.15 } } }}
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-border/60 py-6 mb-2"
        >
          {impact.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">
                {value}
              </dd>
              <dd className="mt-1 font-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Marquee items={marqueeItems} />
        </motion.div>
      </div>
    </section>
  );
}
