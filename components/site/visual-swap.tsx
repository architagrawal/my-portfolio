"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Still picture with a figure behind it. Hover shows the figure; on touch screens it shows
   once when the card scrolls into view, holds 2s, then fades back. */
export function VisualSwap({
  still,
  figure,
  h,
}: {
  still: ReactNode;
  figure: ReactNode;
  h: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    if (!seen || reduce || !window.matchMedia("(hover: none)").matches) return;
    setPeek(true);
    // no pointer on touch, so sweep a synthetic one across the figure while it shows
    const host = ref.current?.querySelector<HTMLElement>(".hairline-site");
    const start = performance.now();
    let raf = 0;
    const sweep = (now: number) => {
      const k = Math.min((now - start) / 2000, 1);
      if (host) {
        const r = host.getBoundingClientRect();
        const opts = {
          bubbles: true,
          pointerType: "mouse",
          clientX: r.left + r.width * (0.2 + 0.6 * k),
          clientY: r.top + r.height * (0.35 + 0.3 * Math.sin(k * Math.PI)),
        };
        host.dispatchEvent(new PointerEvent("pointermove", opts));
      }
      if (k < 1) raf = requestAnimationFrame(sweep);
      else
        host?.dispatchEvent(
          new PointerEvent("pointerleave", { bubbles: false }),
        );
    };
    raf = requestAnimationFrame(sweep);
    const t = setTimeout(() => setPeek(false), 2400);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [seen, reduce]);

  const off = peek
    ? "opacity-0"
    : "group-hover:opacity-0 group-focus-visible:opacity-0";
  const on = peek
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100";
  return (
    <div ref={ref} className={`relative ${h} overflow-hidden`}>
      <div className={`transition-opacity duration-500 ${off}`}>{still}</div>
      <div
        className={`absolute inset-0 flex items-center justify-center bg-card transition-opacity duration-500 ${on}`}
      >
        {figure}
      </div>
    </div>
  );
}
