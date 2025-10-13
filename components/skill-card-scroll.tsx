"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SkillCardScrollProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
}

/**
 * Skill Card Scroll Animation
 * Creates a horizontal slide effect as user scrolls vertically
 * Alternates between left and right based on card index
 */
export default function SkillCardScroll({
  children,
  index,
  totalCards,
}: SkillCardScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress for this specific card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Determine slide direction based on index
  // Even cards: slide from right to left
  // Odd cards: slide from left to right
  const isEven = index % 2 === 0;

  // Horizontal movement with alternating directions
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [100, 0, -100] : [-100, 0, 100]
  );

  // Scale effect - grow when centered
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.85, 0.95, 1, 0.95, 0.85]
  );

  // Opacity fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.3, 1, 1, 1, 0.3]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        scale,
        opacity,
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
