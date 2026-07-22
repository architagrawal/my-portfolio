"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/agrawal-archit", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/architagrawal", label: "GitHub" },
];

const crafts = ["AI agents", "agentic workflows", "RAG systems", "LLM evals", "full-stack products"];

/* Rotating craft word with blur dissolve */
function CraftRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % crafts.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block min-w-[9ch] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-primary"
        >
          {crafts[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
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
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative pt-28 pb-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                className="object-cover"
                style={{ objectPosition: "40% center" }}
                priority
                quality={85}
              />
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
          className="mt-10 mb-14 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <a
            href="/Archit_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            Download Resume
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            See My Work
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Marquee items={marqueeItems} />
      </motion.div>
    </section>
  );
}
