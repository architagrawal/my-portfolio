"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

/* Outlined display title that fills solid as it scrolls into view */
export function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div className={`mb-16 ${className}`}>
      <h2
        ref={ref}
        aria-label={title}
        className="relative font-display text-[8vw] sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] w-fit"
      >
        <span className="text-outline block" aria-hidden="true">
          {title}
        </span>
        <motion.span
          style={{ clipPath: clip }}
          className="absolute inset-0 text-foreground"
          aria-hidden="true"
        >
          {title}
        </motion.span>
      </h2>
    </div>
  );
}
