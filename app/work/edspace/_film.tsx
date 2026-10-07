"use client";

import { useEffect, useRef } from "react";
import { useReduce } from "@/components/site/use-reduce";

/* The launch film. Plays muted while it is on screen and pauses off it; the controls turn the
   soundtrack on. Under reduced motion it waits for a click. preload="none" keeps the 16 MB
   file off the wire until it scrolls into view. */
export function Film() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReduce();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="aspect-video w-full rounded-2xl bg-[#d9e1dd]"
      src="/edspace/film.mp4"
      poster="/edspace/poster.webp"
      aria-label="EdSpace launch film: the 3D office floor, finding a teammate, decorating a desk, booking a room, and a no-show room freeing itself"
      muted
      loop
      playsInline
      controls
      preload="none"
    />
  );
}
