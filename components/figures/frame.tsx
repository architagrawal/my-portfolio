"use client";

import { createContext, useContext, useEffect, useId, useRef, type ReactNode } from "react";
import { clamp } from "./iso";

/* What a figure's tick sees each frame.
   t: seconds since mount. px, py: sprung pointer offset, -1..1. s: where the figure sits in the
   viewport, -1 entering from below, 0 centred, 1 leaving at the top. still: the reduced-motion pose. */
export type Frame = { t: number; px: number; py: number; s: number; still: boolean };
export type Tick = (f: Frame) => void;

/* One page-wide pointer listener, only on devices with a real hover pointer */
const pointer = { x: 0, y: 0, on: false, users: 0 };
const onMove = (e: PointerEvent) => {
  if (e.pointerType !== "mouse") return;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.on = true;
};
function listenPointer() {
  if (pointer.users++ === 0) window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    if (--pointer.users === 0) window.removeEventListener("pointermove", onMove);
  };
}

/* Parts registry: ref={at("name")} in the drawing, parts.current.name in the tick */
export function useParts() {
  const parts = useRef<Record<string, SVGElement | null>>({});
  const at = (k: string) => (el: SVGElement | null) => {
    parts.current[k] = el;
  };
  return { parts, at };
}

/* Unique, CSS-safe prefix for clip ids */
export function useUid() {
  return "fg" + useId().replace(/[^a-zA-Z0-9]/g, "");
}

const STILL_T = 2.2;

/* The drawing's viewBox. ProjectFigure sets it per slug so each drawing is centred in its frame
   (and, at the small size, fills it); the default is the 400 x 320 canvas every figure draws on. */
export const FigureBox = createContext("0 0 400 320");

/* Hosts one figure: runs its idle loop while on screen, springs toward the pointer, follows
   scroll, and holds a static pose under reduced motion. Groups with data-depth get parallax. */
export function FigureFrame({
  label,
  tick,
  className = "",
  small = false,
  children,
}: {
  label: string;
  tick: Tick;
  className?: string;
  small?: boolean;
  children: ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const viewBox = useContext(FigureBox);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  useEffect(() => {
    const el = host.current;
    const sv = svg.current;
    if (!el || !sv) return;
    const layers = Array.from(sv.querySelectorAll<SVGGElement>("[data-depth]")).map((g) => ({
      g,
      d: Number(g.dataset.depth),
    }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const release = fine ? listenPointer() : () => {};
    const sp = { x: 0, y: 0, vx: 0, vy: 0 };
    const t0 = performance.now();
    let raf = 0;
    let last = t0;
    let visible = false;

    const pose = () => {
      sv.style.transform = "";
      for (const l of layers) l.g.style.transform = "";
      tickRef.current({ t: STILL_T, px: 0, py: 0, s: 0, still: true });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const s = clamp((vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2), -1, 1);
      let tx = 0;
      let ty = 0;
      if (pointer.on) {
        tx = clamp((pointer.x - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
        ty = clamp((pointer.y - (r.top + r.height / 2)) / (vh / 2), -1, 1);
      }
      // critically damped and soft: the tilt lags the pointer like something with mass
      const k = 14;
      const c = 2 * Math.sqrt(k);
      sp.vx += (k * (tx - sp.x) - c * sp.vx) * dt;
      sp.vy += (k * (ty - sp.y) - c * sp.vy) * dt;
      sp.x += sp.vx * dt;
      sp.y += sp.vy * dt;

      sv.style.transform = `perspective(900px) rotateX(${(-sp.y * 5 + s * 4).toFixed(2)}deg) rotateY(${(sp.x * 7).toFixed(2)}deg)`;
      for (const l of layers) {
        l.g.style.transform = `translate(${(l.d * sp.x * 6).toFixed(2)}px,${(l.d * (sp.y * 4 - s * 6)).toFixed(2)}px)`;
      }
      tickRef.current({ t: (now - t0) / 1000, px: sp.x, py: sp.y, s, still: false });
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || reduce.matches) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "60px" },
    );
    const onReduce = () => {
      if (reduce.matches) {
        stop();
        pose();
      } else if (visible) start();
    };
    pose();
    io.observe(el);
    reduce.addEventListener("change", onReduce);
    return () => {
      stop();
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
      release();
    };
  }, []);

  return (
    <div ref={host} role="img" aria-label={label} className={`figure-site ${small ? "sm " : ""}${className}`}>
      <svg
        ref={svg}
        viewBox={viewBox}
        aria-hidden="true"
        className="block h-full w-full overflow-visible"
      >
        {children}
      </svg>
    </div>
  );
}
