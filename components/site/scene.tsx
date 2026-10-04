"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { foreground, SCENE_IDS, type SceneId } from "./paint-scenes";

/* The backdrop behind every page header. Each theme gets its own scene; all of them are
   rendered and CSS shows the one matching <html data-theme>, so there is no flash on load.
   midnight: mountains and stars. ember: striped sun over dunes. graphite: terminal grid.
   forest: topographic contours. steel: blueprint grid.
   painted: a random painted scene (PaintLayer) replaces the theme scenery and the hills.
   "outside" leaves the PaintLayer to the caller, so it can span more than this strip. */
export function Scene({ children, tall = false, painted }: { children: ReactNode; tall?: boolean; painted?: "inside" | "outside" }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const far = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 50]);
  const near = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 24]);

  return (
    <div className={`relative overflow-hidden ${tall ? "scene-tall pb-44 sm:pb-56" : "scene-short pb-28 sm:pb-36"}`}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--sky-1), var(--sky-2), var(--sky-3))" }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          mixBlendMode: "var(--grain-blend)" as CSSProperties["mixBlendMode"],
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {painted ? (
        painted === "inside" && <PaintLayer />
      ) : (
        <>
          <Stars />
          <RetroSun />
          <TerminalGrid />
          <Contours />
          <Blueprint />

          <div aria-hidden="true" className="scene-glow absolute -top-24 right-[8%] h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }} />

          <div aria-hidden="true" className="scene-ridges absolute inset-x-0 bottom-0 h-[42%] sm:h-[70%]">
            <motion.svg style={{ y: far }} viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full">
              <defs>
                <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: "var(--ridge-far-1)" }} />
                  <stop offset="1" style={{ stopColor: "var(--ridge-far-2)" }} />
                </linearGradient>
              </defs>
              <path className="ridge-far" d="M0 190L110 138L200 172L330 84L450 158L560 116L700 182L830 92L960 150L1085 60L1210 146L1330 104L1440 140V320H0Z" fill="url(#hill-far)" />
            </motion.svg>
            <motion.svg style={{ y: near }} viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 h-[78%] w-full">
              <defs>
                <linearGradient id="hill-near" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: "var(--ridge-near-1)" }} />
                  <stop offset="1" style={{ stopColor: "var(--ridge-near-2)" }} />
                </linearGradient>
              </defs>
              <path d="M0 214L150 166L262 204L402 146L540 208L702 156L862 214L1004 162L1152 204L1302 156L1440 192V320H0Z" fill="url(#hill-near)" />
            </motion.svg>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 h-[52%] w-full">
              <path d="M0 236L360 204L720 232L1080 198L1440 228V320H0Z" className="fill-background" />
            </svg>
          </div>

          {/* flat-scene themes fade into the page instead of ending on a ridge */}
          <div aria-hidden="true" className="scene-fade absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* midnight: a field of stars, a few of them twinkling */
function Stars() {
  const reduce = useReducedMotion();
  const stars = Array.from({ length: 40 }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 928.37 + n * 17.13) + 1) / 2) % 1;
    return { x: r(1) * 100, y: r(2) * 62, s: r(3) > 0.9 ? 2 : 1.2, tw: r(4) > 0.85, d: r(5) * 4 };
  });
  return (
    <div aria-hidden="true" className="scene-stars absolute inset-0">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x.toFixed(3)}%`, top: `${s.y.toFixed(3)}%`, width: s.s, height: s.s, opacity: 0.45 }}
          animate={s.tw && !reduce ? { opacity: [0.2, 0.6, 0.2] } : undefined}
          transition={s.tw ? { duration: 6 + s.d, repeat: Infinity, delay: s.d } : undefined}
        />
      ))}
    </div>
  );
}

/* ember: an 80s striped sun sinking behind the dunes */
function RetroSun() {
  const reduce = useReducedMotion();
  const bands = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div aria-hidden="true" className="scene-sun absolute -right-24 bottom-[14%] sm:bottom-[18%] md:right-[2%]">
      <motion.svg
        viewBox="0 0 200 200"
        className="h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem]"
        initial={reduce ? false : { y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 0.55 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="sun-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "#ffd166" }} />
            <stop offset="0.5" style={{ stopColor: "hsl(var(--primary))" }} />
            <stop offset="1" style={{ stopColor: "hsl(var(--primary-deep))" }} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#sun-fill)" />
        {bands.map((i) => (
          <rect key={i} x="0" y={104 + i * 14} width="200" height={2 + i * 1.4} style={{ fill: "var(--sky-2)" }} />
        ))}
      </motion.svg>
    </div>
  );
}

/* graphite: a perspective grid floor rolling toward you, plus a dot grid sky */
function TerminalGrid() {
  return (
    <div aria-hidden="true" className="scene-grid absolute inset-0">
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(hsl(var(--foreground) / 0.25) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[55%] overflow-hidden [perspective:420px]">
        <div
          className="grid-floor absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--sky-2)] via-transparent to-transparent" />
      </div>
    </div>
  );
}

/* forest: topographic contour lines, slowly drifting */
function Contours() {
  const reduce = useReducedMotion();
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="scene-contours absolute inset-0">
      <motion.svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 12, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      >
        {rings.map((i) => {
          const k = 60 + i * 52;
          return (
            <path
              key={i}
              d={`M${1100 - k} 300 C ${1100 - k} ${170 - k * 0.5}, ${1100 + k * 1.1} ${150 - k * 0.45}, ${1100 + k * 1.15} 300 S ${1100 + k * 0.4} ${470 + k * 0.5}, ${1100 - k} 300 Z`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity={0.06 + (i % 3 === 0 ? 0.08 : 0.02)}
              strokeWidth={i % 3 === 0 ? 1.6 : 1}
            />
          );
        })}
        {rings.slice(0, 7).map((i) => {
          const k = 40 + i * 46;
          return (
            <path
              key={`b${i}`}
              d={`M${260 - k} 560 C ${260 - k} ${440 - k * 0.4}, ${260 + k} ${430 - k * 0.4}, ${260 + k * 1.1} 560 S ${260} ${700 + k * 0.3}, ${260 - k} 560 Z`}
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeOpacity={0.07}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}

/* steel: a drafting-table grid with crosshair registration marks */
function Blueprint() {
  return (
    <div aria-hidden="true" className="scene-blueprint absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.07) 1px, transparent 1px), linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        }}
      />
      {[
        ["8%", "22%"],
        ["88%", "30%"],
        ["70%", "78%"],
      ].map(([l, t]) => (
        <svg key={l} className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-primary/25" style={{ left: l, top: t }} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" />
          <path d="M20 0V40M0 20H40" stroke="currentColor" />
        </svg>
      ))}
    </div>
  );
}

const PAINT_MS = 4600; // when the last stroke starts
const STROKE_MS = [700, 260]; // first big block, last detail
const DEPTHS = [{ scroll: 50, pointer: 6 }, { scroll: 32, pointer: 12 }, { scroll: 16, pointer: 22 }];

/* One scene per visit: picked on the first page, kept across client navigation so the
   header doesn't swap and repaint on every click. Never the scene the last visit showed. */
let visitScene: SceneId | null = null;
let replayed = false;
const svgCache = new Map<SceneId, Promise<string>>();
function pickScene(): SceneId {
  if (visitScene) return visitScene;
  const forced = new URLSearchParams(window.location.search).get("scene") as SceneId | null;
  if (forced && SCENE_IDS.includes(forced)) return (visitScene = forced);
  let last: string | null = null;
  try {
    last = sessionStorage.getItem("paint-scene");
  } catch {}
  const pool = SCENE_IDS.filter((id) => id !== last);
  const id = pool[Math.floor(Math.random() * pool.length)];
  try {
    sessionStorage.setItem("paint-scene", id);
  } catch {}
  return (visitScene = id);
}

/* A painted scene, replayed live. primitive writes shapes coarse to fine, so each shape
   fades and settles in generation order: big blocks slowly, detail quickly. In front of
   it, the scene's own foreground in three layers with scroll and pointer parallax.
   Nothing renders on the server, so there is no hydration mismatch, and the assets load
   after first paint. Styles: .scene-paint* and .fg-* in globals.css. */
export function PaintLayer({ className = "inset-0" }: { className?: string }) {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneId | null>(null);
  const [live, setLive] = useState(true);
  const { scrollY } = useScroll();
  const y0 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[0].scroll]);
  const y1 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[1].scroll]);
  const y2 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[2].scroll]);
  const ys = [y0, y1, y2];

  useEffect(() => setScene(pickScene()), []);

  useEffect(() => {
    const el = host.current;
    if (!el || !scene) return;
    let alive = true;
    if (!svgCache.has(scene)) svgCache.set(scene, fetch(`/paint/${scene}.svg`).then((r) => r.text()));
    svgCache.get(scene)!
      .then((text) => {
        if (!alive) return;
        const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
        svg.setAttribute("viewBox", "0 0 1024 512");
        svg.setAttribute("preserveAspectRatio", "xMidYMin slice");
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        // replay once per visit; later pages show the finished painting
        if (!reduce && !replayed) {
          replayed = true;
          svg.querySelector(":scope > rect")?.classList.add("paint-base");
          const group = svg.querySelector(":scope > g");
          const shapes = group ? Array.from(group.children) : [];
          shapes.forEach((shape, i) => {
            // wrap, so the stroke's own transform attribute survives the CSS scale
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            shape.replaceWith(g);
            g.appendChild(shape);
            const t = i / shapes.length;
            g.setAttribute("class", "paint-stroke");
            g.setAttribute(
              "style",
              `animation-delay:${Math.round(PAINT_MS * (1 - (1 - t) ** 2))}ms;animation-duration:${Math.round(STROKE_MS[0] + (STROKE_MS[1] - STROKE_MS[0]) * t)}ms`,
            );
          });
        }
        el.replaceChildren(svg);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [scene, reduce]);

  // pointer parallax as CSS vars, eased in CSS; foreground motion pauses offscreen
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--px", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--py", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting));
    io.observe(el);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, [reduce]);

  const layers = scene ? foreground(scene) : null;
  return (
    <div ref={root} aria-hidden="true" className={`pointer-events-none absolute overflow-hidden ${className} ${live ? "" : "fg-paused"}`}>
      <div className="scene-paint absolute inset-0">
        <div ref={host} className={`scene-paint-canvas absolute inset-0 ${reduce ? "" : "is-live"}`} />
      </div>
      {layers && (
        <div className="scene-fg absolute inset-0">
          {layers.map((markup, i) =>
            markup ? (
              <motion.div key={`${scene}-${i}`} className="absolute inset-0" style={{ y: ys[i] }}>
                <svg
                  viewBox="0 0 1600 900"
                  preserveAspectRatio="xMidYMax slice"
                  className="fg-layer absolute inset-0 h-full w-full"
                  style={{ "--depth": `${DEPTHS[i].pointer}px` } as CSSProperties}
                  dangerouslySetInnerHTML={{ __html: markup }}
                />
              </motion.div>
            ) : null,
          )}
        </div>
      )}
      {/* text side gradient, then a fade into the page body */}
      <div className="scene-paint-shade absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
