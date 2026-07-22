"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string; // e.g., "blue", "purple", "orange"
}

const baseVariant =
  "bg-background text-foreground border-border hover:border-primary hover:text-primary";

const colorVariants: Record<string, string> = {
  blue: baseVariant,
  teal: baseVariant,
  purple: baseVariant,
  orange: baseVariant,
  pink: baseVariant,
  yellow: baseVariant,
  green: baseVariant,
  default: baseVariant,
};

export function TechBadge({ name, icon: Icon, color = "default" }: TechBadgeProps) {
  const variantClass = colorVariants[color] || colorVariants.default;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        text-sm font-medium border backdrop-blur-sm transition-all duration-300
        cursor-default ${variantClass}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{name}</span>
    </motion.div>
  );
}
