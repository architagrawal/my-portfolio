"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/* Seamless infinite marquee of oversized display words, alternating solid/outline */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const half = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={item} className="flex items-center shrink-0">
          <span
            className={`px-6 font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight ${
              i % 2 === 0 ? "text-foreground/90" : "text-outline"
            }`}
          >
            {item}
          </span>
          <span className="text-primary text-2xl sm:text-4xl font-display select-none" aria-hidden="true">
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`border-y border-border/60 py-4 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {half}
        {half}
      </div>
    </div>
  );
}
