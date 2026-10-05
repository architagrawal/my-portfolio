"use client";

import { motion } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";

/* A hand-drawn pink underline that draws itself under a phrase */
export function Scribble({ children }: { children: React.ReactNode }) {
  const reduce = useReduce();
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="scribble-text">{children}</span>
      <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-[0.3em] w-full overflow-visible" aria-hidden="true">
        <motion.path
          d="M3 14 C 60 4, 120 4, 170 10 S 260 16, 297 6"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-secondary"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
        />
      </svg>
    </span>
  );
}
