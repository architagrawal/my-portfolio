"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function HorizontalScroll({
  children,
  direction = "left",
  speed = 1,
  className = "",
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      if (ref.current) {
        setElementTop(ref.current.offsetTop);
        setClientHeight(window.innerHeight);
      }
    };

    setValues();
    window.addEventListener("resize", setValues);

    return () => window.removeEventListener("resize", setValues);
  }, []);

  // Calculate the scroll range
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight ?? 0);

  // Transform scroll position to horizontal movement
  const xTransform = useTransform(
    scrollY,
    [initial, final],
    direction === "left" ? [0, -300 * speed] : [0, 300 * speed]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x: xTransform }}>{children}</motion.div>
    </div>
  );
}
