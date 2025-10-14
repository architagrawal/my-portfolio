"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  animate as fmAnimate,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const InteractiveCard = ({
  children,
  className,
  InteractiveColor = "#07eae6ff",
  // Use Tailwind radius class; default matches Card's rounded-lg
  radiusClass = "rounded-lg",
  rotationFactor = 0.4,
  transitionDuration = 0.3,
  transitionEasing = "easeInOut",
  // spring options for return animation
  returnSpring = { stiffness: 300, damping: 30 },
  tailwindBgClass = "bg-transparent backdrop-blur-md",
}: {
  children: React.ReactNode;
  className?: string;
  InteractiveColor?: string;
  radiusClass?: string;
  rotationFactor?: number;
  transitionDuration?: number;
  transitionEasing?: string;
  returnSpring?: { stiffness?: number; damping?: number };
  tailwindBgClass?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Start centered so the card is neutral on first render
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXTrans = useTransform(
    y,
    [0, 1],
    [rotationFactor * 15, -rotationFactor * 15]
  );
  const rotateYTrans = useTransform(
    x,
    [0, 1],
    [-rotationFactor * 15, rotationFactor * 15]
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;

    x.set(px);
    y.set(py);
  };

  // When pointer leaves, animate x/y back to center (0.5)
  const handlePointerLeave = () => {
    setIsHovered(false);
    // Framer Motion's MotionValue has an animate method
    // Duration is matched with transitionDuration
    // Use a spring for a snappy bounce-back
    fmAnimate(x, 0.5, {
      type: "spring",
      stiffness: returnSpring.stiffness,
      damping: returnSpring.damping,
    });
    fmAnimate(y, 0.5, {
      type: "spring",
      stiffness: returnSpring.stiffness,
      damping: returnSpring.damping,
    });
  };

  const xPercentage = useTransform(x, (val) => `${val * 100}%`);
  const yPercentage = useTransform(y, (val) => `${val * 100}%`);

  const interactiveBackground = useMotionTemplate`radial-gradient(circle at ${xPercentage} ${yPercentage}, ${InteractiveColor} 0%, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective: 1000,
      }}
      className="relative w-full h-full isolate"
    >
      <motion.div
        style={{
          rotateX: rotateXTrans,
          rotateY: rotateYTrans,
          transformStyle: "preserve-3d",
          transition: `transform ${transitionDuration}s ${transitionEasing}`,
        }}
        className={cn("w-full h-full", className)}
      >
        <motion.div
          className={cn("absolute inset-0 z-0", radiusClass)}
          style={{
            background: interactiveBackground,
            transition: `opacity ${transitionDuration}s ${transitionEasing}`,
            opacity: isHovered ? 0.6 : 0,
            pointerEvents: "none",
          }}
        />

        <Card
          className={cn(
            "relative z-10 w-full h-full",
            tailwindBgClass,
            radiusClass
          )}
        >
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCard;
