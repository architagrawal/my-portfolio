"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

interface UseScrollProgressOptions {
  target?: RefObject<HTMLElement>;
  offset?: any;
}

interface UseScrollProgressReturn {
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Custom hook for scroll-based animations
 * Returns scroll progress and common animation values
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): UseScrollProgressReturn {
  const { target, offset = ["start end", "end start"] } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset: offset as any,
  });

  // Fade in as element enters viewport
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Scale up when centered
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.8, 1, 1, 1, 0.8]
  );

  // Vertical movement
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return {
    scrollYProgress,
    opacity,
    scale,
    y,
  };
}

export default useScrollProgress;
