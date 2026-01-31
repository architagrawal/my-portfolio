"use client";

import { motion } from "framer-motion";

interface TimelineNodeProps {
  color: string;
  isLast?: boolean;
}

export const TimelineNode = ({ color, isLast }: TimelineNodeProps) => {
  // Map color names to Tailwind classes or hex values
  // Map legacy color names to Unified Theme
  // Everything maps to primary (Orange) except 'teal' which maps to secondary (Cyan) for variety
  const colorMap: Record<string, string> = {
    blue: "bg-primary shadow-primary/50",
    teal: "bg-secondary shadow-secondary/50", // Cyan/Green for research
    purple: "bg-primary shadow-primary/50",
    orange: "bg-primary shadow-primary/50",
    default: "bg-primary shadow-primary/50"
  };

  const selectedColor = colorMap[color] || colorMap.default;
  const borderColor = color === 'teal' ? 'border-secondary' : 'border-primary';

  return (
    <div className="absolute left-0 w-12 flex flex-col items-center h-full">
      {/* The Star Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center"
      >
        <div className={`w-3 h-3 rounded-full ${selectedColor} shadow-[0_0_10px_2px_currentColor] animate-pulse`} />
        {/* Outer Ring */}
        <div className={`absolute inset-0 -m-1 rounded-full border ${borderColor} opacity-50 animate-ping`} />
      </motion.div>

      {/* The Trajectory Line (Vertical) */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: isLast ? "100%" : "calc(100% + 4rem + 8px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`w-0.5 flex-1 shadow-[0_0_8px_1px_rgba(var(--primary),0.3)] mt-2 ${
            isLast 
            ? "bg-gradient-to-b from-primary/50 to-transparent" 
            : "bg-gradient-to-b from-primary/50 to-primary/50"
        }`}
      />

      {/* Constellation Connector (Horizontal) */}
      <motion.div
         initial={{ width: 0, opacity: 0 }}
         whileInView={{ width: "3rem", opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8, delay: 0.4 }}
         className="absolute left-2 top-2 h-[1px] bg-gradient-to-r from-primary/50 to-transparent transform origin-left"
         style={{ width: "4rem" }}
      />
    </div>
  );
};
