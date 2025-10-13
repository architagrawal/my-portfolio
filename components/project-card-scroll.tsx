"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectCardScrollProps {
  children: React.ReactNode;
  index: number;
  totalCards: number;
}

export default function ProjectCardScroll({
  children,
  index,
  totalCards,
}: ProjectCardScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Alternate direction based on index (even/odd)
  const isEven = index % 2 === 0;

  // Create staggered horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [200, 0, -200] : [-200, 0, 200]
  );

  // Add subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Add opacity fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        scale,
        opacity,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
