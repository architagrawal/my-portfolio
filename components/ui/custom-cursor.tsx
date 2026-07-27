"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const INTERACTIVE_SELECTOR = 'a, button, summary, [role="button"], input, textarea, select, label';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the follower
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Grow the ring over anything interactive (event delegation)
    const handleOver = (e: Event) => {
      const target = e.target as Element | null;
      setIsHovering(!!target?.closest?.(INTERACTIVE_SELECTOR));
    };
    document.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot — saffron core with gold glow; shrinks over interactives */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[9999]"
        animate={{ scale: isHovering ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 14px hsl(var(--primary) / 0.85), 0 0 28px hsl(var(--secondary) / 0.55)",
        }}
      />

      {/* Trailing Gold Ring — grows over interactives */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        animate={{
          scale: isHovering ? 1.7 : 1,
          opacity: isHovering ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid hsl(var(--secondary) / 0.7)",
          boxShadow: "inset 0 0 12px hsl(var(--secondary) / 0.25), 0 0 18px hsl(var(--primary) / 0.18)",
        }}
      />
    </>
  );
}
