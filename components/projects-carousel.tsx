"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectsCarouselProps {
  children: React.ReactNode;
  totalCards: number;
}

export default function ProjectsCarousel({ children }: ProjectsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="hidden md:flex absolute -top-14 right-0 gap-2 z-20">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous projects"
          className="w-11 h-11 flex items-center justify-center border border-border bg-background/80 hover:bg-primary/10 hover:border-primary/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next projects"
          className="w-11 h-11 flex items-center justify-center border border-border bg-background/80 hover:bg-primary/10 hover:border-primary/50 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 px-4 sm:px-8 -mx-4 sm:-mx-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {Array.isArray(children)
          ? (children as React.ReactNode[]).map((child, i) => (
              <div
                key={i}
                data-carousel-card
                className="snap-center shrink-0 first:ml-[7.5vw] last:mr-[7.5vw] sm:first:ml-0 sm:last:mr-0"
              >
                {child}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
