import type { ReactNode } from "react";

/* Endless horizontal scroll, adapted from Magic UI's Marquee (MIT, magicui.design).
   Two copies of the row slide left by one copy's width; pauses on hover, stops under reduced motion. */
export function Marquee({ children, className = "", seconds = 40 }: { children: ReactNode; className?: string; seconds?: number }) {
  return (
    <div className={`ui-marquee group flex overflow-hidden ${className}`} style={{ ["--marquee-s" as string]: `${seconds}s` }}>
      {[0, 1].map((n) => (
        <div key={n} aria-hidden={n === 1} className="ui-marquee-track flex shrink-0 items-center gap-10 pr-10">
          {children}
        </div>
      ))}
    </div>
  );
}
