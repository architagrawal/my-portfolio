"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { foreground, SCENE_IDS, type SceneId } from "./paint-scenes";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const PAINT_MS = 4600; // when the last stroke starts
const STROKE_MS = [700, 260]; // first big block, last detail
const DEPTHS = [{ scroll: 50, pointer: 6 }, { scroll: 32, pointer: 12 }, { scroll: 16, pointer: 22 }];

/* The scene is picked by the inline script in app/layout.tsx before first paint and kept on
   <html data-scene>, so the palette and the painting always agree. */
function currentScene(): SceneId {
  const html = document.documentElement;
  let id = html.dataset.scene as SceneId | undefined;
  // a hydration mismatch anywhere makes React re-render from the root and drop the attribute;
  // the script also kept the pick in sessionStorage, so put it back before paint
  if (!id) {
    try {
      id = (sessionStorage.getItem("paint-scene") as SceneId | null) ?? undefined;
    } catch {}
  }
  const scene = id && SCENE_IDS.includes(id) ? id : "mesas";
  html.dataset.scene = scene;
  return scene;
}

/* The page's setting: the painted scene, fixed behind every page. Mounted once in the root
   layout, so it survives client navigation and the replay runs once per visit. primitive
   writes shapes coarse to fine, so each shape fades and settles in generation order. In
   front of it, the scene's own foreground in three layers with scroll and pointer parallax,
   then a veil in the page colour that thickens as you scroll, so long pages stay readable.
   Until the SVG loads, .backdrop shows a gradient in the scene's colours. Scroll only moves
   transform and opacity. Styles: .backdrop, .scene-paint* and .fg-* in globals.css. */
export function Backdrop() {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneId | null>(null);
  const [vh, setVh] = useState(800);
  const { scrollY } = useScroll();
  const y0 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[0].scroll]);
  const y1 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[1].scroll]);
  const y2 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[2].scroll]);
  const ys = [y0, y1, y2];
  const veil = useTransform(scrollY, [vh * 0.15, vh * 0.9], [0, 0.6]);

  useIsoLayoutEffect(() => setScene(currentScene()), []);

  useEffect(() => {
    const size = () => setVh(window.innerHeight);
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el || !scene) return;
    let alive = true;
    fetch(`/paint/${scene}.svg`)
      .then((r) => r.text())
      .then((text) => {
        if (!alive) return;
        const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
        svg.setAttribute("viewBox", "0 0 1024 512");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        if (!reduce) {
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

  // pointer parallax as CSS vars, eased in CSS
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
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [reduce]);

  const layers = scene ? foreground(scene) : null;
  return (
    <div ref={root} aria-hidden="true" className="backdrop">
      <div ref={host} className={`scene-paint-canvas absolute inset-0 ${reduce ? "" : "is-live"}`} />
      {layers?.map((markup, i) =>
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
      <motion.div className="backdrop-veil absolute inset-0" style={{ opacity: veil }} />
    </div>
  );
}
