"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/* A timeline line down the left edge that draws itself as you scroll through the roles */
export function ScrollSpine({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className="relative">
      <div className="absolute -left-8 top-2 bottom-2 hidden w-[3px] rounded-full bg-muted lg:block" aria-hidden="true">
        <motion.div className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary to-secondary" style={{ scaleY: reduce ? 1 : scaleY }} />
      </div>
      {children}
    </div>
  );
}
