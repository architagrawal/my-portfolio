"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectsCarouselProps {
  children: React.ReactNode;
  totalCards: number;
}

/**
 * Projects Horizontal Scroll Carousel
 * Section stays sticky while you scroll through all projects horizontally
 * Requires enough scroll height to show all cards before moving to next section
 */
export default function ProjectsCarousel({
  children,
  totalCards,
}: ProjectsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for this section
  // Section will be sticky and animation will span the entire height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate how far to scroll based on number of cards
  // Each card is 400px + 24px gap = 424px
  // Add padding at start and end so first/last cards are fully visible and centered
  const cardWidth = 424; // 400px card + 24px gap
  const totalWidth = cardWidth * totalCards;
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1200;

  // Start with first card centered, end with last card centered
  const startPadding = (viewportWidth - 400) / 2; // Center first card
  const endPadding = (viewportWidth - 400) / 2; // Center last card
  const scrollDistance = totalWidth - 400; // Scroll entire width minus one card

  // Horizontal movement - scroll through all cards with proper padding
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [startPadding, -(scrollDistance - endPadding)]
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        // Create sticky container with enough height to scroll through all cards
        height: `${300}vh`, // 3x viewport height to allow scrolling through all cards
      }}
    >
      {/* Sticky wrapper that stays in place while scrolling */}
      <div className="sticky top-5 h-screen flex items-center overflow-hidden">
        {/* Gradient overlays for visual depth - thinner so content is visible */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div style={{ x }} className="flex gap-6 will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
