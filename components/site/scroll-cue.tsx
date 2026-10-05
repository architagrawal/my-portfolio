"use client";

import { useEffect, useState } from "react";

/* A thin chevron at the foot of the home painting. Hidden while the painting replays, so
   nothing invites a scroll past a half-painted picture; fades in once Backdrop marks
   <html data-painted>. Click scrolls to the intro. */
export function ScrollCue({ target }: { target: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const check = () => setShown("painted" in document.documentElement.dataset);
    check();
    window.addEventListener("painted", check);
    return () => window.removeEventListener("painted", check);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to intro"
      tabIndex={shown ? 0 : -1}
      onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className={`scroll-cue absolute bottom-6 z-10 left-1/2 -translate-x-1/2 p-3 text-primary transition-opacity duration-700 ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <svg viewBox="0 0 24 14" className="h-3.5 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 2l10 10L22 2" />
      </svg>
    </button>
  );
}
