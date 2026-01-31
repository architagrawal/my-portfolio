"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string; // e.g., "blue", "purple", "orange"
}

const colorVariants: Record<string, string> = {
  blue: "bg-primary/10 text-primary border-primary/20",
  teal: "bg-primary/10 text-primary border-primary/20",
  purple: "bg-primary/10 text-primary border-primary/20",
  orange: "bg-primary/10 text-primary border-primary/20",
  pink: "bg-primary/10 text-primary border-primary/20",
  yellow: "bg-primary/10 text-primary border-primary/20",
  green: "bg-primary/10 text-primary border-primary/20",
  default: "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30",
};

export function TechBadge({ name, icon: Icon, color = "default" }: TechBadgeProps) {
  const variantClass = colorVariants[color] || colorVariants.default;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
        text-sm font-medium border backdrop-blur-sm transition-colors
        cursor-default ${variantClass}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{name}</span>
    </motion.div>
  );
}
