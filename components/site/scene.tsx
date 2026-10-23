"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReduce } from "@/components/site/use-reduce";
import { foreground, SCENE_IDS, type SceneId } from "./paint-scenes";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const PAINT_MS = 4600; // when the last stroke starts
const STROKE_MS = [700, 260]; // first big block, last detail
const DEPTHS = [{ scroll: 50, pointer: 6 }, { scroll: 32, pointer: 12 }, { scroll: 16, pointer: 22 }];
// the cover name sits behind the far layer, so it lags the most on scroll and moves the least under the pointer
const MAST_DEPTH = { scroll: 60, pointer: 3 };

const FF_MS = 400;
const FF_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown", "scroll"] as const;

/* Size each cover svg to its text as rendered. The typeface, weight, tracking and case are set per
   scene in globals.css (--mast-font and friends), so the box is measured rather than hard-coded:
   the viewBox runs from the left of the ink to its right, and from the first row's ascender line
   down to the last baseline. Rows sit --mast-lh apart. The cover's foot (how much of the letters the
   foreground covers) needs one row's letter height for the svg's width: --mast-cap of the font size. */
function fitMast(root: HTMLElement) {
  root.querySelectorAll<SVGSVGElement>(".cover-mast svg").forEach((svg) => {
    const css = getComputedStyle(svg);
    const lh = parseFloat(css.getPropertyValue("--mast-lh")) || 0.95;
    const cap = parseFloat(css.getPropertyValue("--mast-cap")) || 0.7;
    const rows = Array.from(svg.querySelectorAll("text"));
    rows.forEach((t, i) => t.setAttribute("y", String(i * 100 * lh)));
    const boxes = rows.map((t) => t.getBBox());
    if (!boxes.every((b) => b.width > 0)) return;
    const x0 = Math.min(...boxes.map((b) => b.x));
    const x1 = Math.max(...boxes.map((b) => b.x + b.width));
    const top = boxes[0].y;
    const base = (rows.length - 1) * 100 * lh;
    svg.setAttribute("viewBox", `${x0} ${top} ${x1 - x0} ${base - top + 2}`);
    // on <html>, so the hero links under the line can place themselves too
    document.documentElement.style.setProperty(svg.classList.contains("mast-stack") ? "--mast-line-2" : "--mast-line-1", String((cap * 100) / (x1 - x0)));
  });
}

/* The replay is done: <html data-painted> and a "painted" event, which the scroll cue waits for */
function markPainted() {
  document.documentElement.dataset.painted = "";
  window.dispatchEvent(new Event("painted"));
}

/* The scene is picked by the inline script in app/layout.tsx before first paint and kept on
   <html data-scene>, so the palette and the painting always agree. */
function currentScene(): SceneId {
  const id = document.documentElement.dataset.scene as SceneId | undefined;
  return id && SCENE_IDS.includes(id) ? id : "mesas";
}

/* The page's setting: the painted scene, fixed behind every page. Mounted once in the root
   layout, so it survives client navigation and the replay runs once per visit. primitive
   writes shapes coarse to fine, so each shape fades and settles in generation order. In
   front of it, the scene's own foreground in three layers with scroll and pointer parallax,
   then a veil in the page colour that thickens as you scroll, so long pages stay readable.
   Until the SVG loads, .backdrop shows a gradient in the scene's colours. Scroll only moves
   transform and opacity. Styles: .backdrop, .scene-paint* and .fg-* in globals.css. */
export function Backdrop() {
  const reduce = useReduce();
  const host = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneId | null>(null);
  const [vh, setVh] = useState(800);
  const { scrollY } = useScroll();
  const y0 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[0].scroll]);
  const y1 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[1].scroll]);
  const y2 = useTransform(scrollY, [0, 500], [0, reduce ? 0 : DEPTHS[2].scroll]);
  const ys = [y0, y1, y2];
  const yMast = useTransform(scrollY, [0, 500], [0, reduce ? 0 : MAST_DEPTH.scroll]);
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
        // keep each painting's own shape (2:1 or 16:10); slice then fills the screen
        svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width") ?? 1024} ${svg.getAttribute("height") ?? 512}`);
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
        if (reduce) return markPainted();
        // the visitor moved before the replay finished: finish every stroke in ~400ms
        // strokes only: the svg's own slow drift loops forever
        const anims = svg
          .getAnimations({ subtree: true })
          .filter((a) => Number.isFinite(Number(a.effect?.getComputedTiming().endTime)));
        fastForward = () => {
          for (const a of anims) {
            const end = Number(a.effect?.getComputedTiming().endTime ?? 0);
            const left = end - Number(a.currentTime ?? 0);
            if (left > FF_MS) a.updatePlaybackRate(left / FF_MS);
          }
          unlisten();
        };
        FF_EVENTS.forEach((e) => window.addEventListener(e, fastForward, { passive: true, once: true }));
        Promise.all(anims.map((a) => a.finished)).then(markPainted, markPainted).finally(unlisten);
      })
      .catch(markPainted);
    let fastForward = () => {};
    const unlisten = () => FF_EVENTS.forEach((e) => window.removeEventListener(e, fastForward));
    return () => {
      alive = false;
      unlisten();
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

  useEffect(() => {
    const el = root.current;
    if (!el || !scene) return;
    let alive = true;
    const fit = () => alive && fitMast(el);
    fit();
    const sample = el.querySelector(".cover-mast text");
    const face = sample ? getComputedStyle(sample).font : "";
    if (face) document.fonts.load(face, "Hi, I\u2019m Archit.").then(fit, fit);
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      alive = false;
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [scene]);

  const layers = scene ? foreground(scene) : null;
  return (
    <div ref={root} aria-hidden="true" className="backdrop">
      <div ref={host} className={`scene-paint-canvas absolute inset-0 ${reduce ? "" : "is-live"}`} />
      {/* the home cover: the name across the painting, behind the foreground (.cover-mast in globals.css).
          Drawn three times: a faint plain copy so it never vanishes over dark paint, a grey copy that
          color-dodges the painting so the letters carry its light and texture, and a coloured copy
          that multiplies over that, tinting the lit texture without flattening it. */}
      {scene &&
        ["base", "light", "tint"].map((kind) => (
          <motion.div key={kind} className={`cover-mast-wrap is-${kind} absolute inset-0`} style={{ y: yMast }}>
            <div className="fg-layer cover-mast" style={{ "--depth": `${MAST_DEPTH.pointer}px` } as CSSProperties}>
              {/* one line when the screen is wide, two stacked when it is portrait (.mast-line /
                  .mast-stack). Each scene sets its own typeface, so fitMast sizes the boxes once it loads;
                  these viewBoxes are Figtree 800's, for the first frame. */}
              <svg className="mast-line" viewBox="6.8 -74 578.9 75.2">
                <text x="0" y="0">
                  <tspan className="w1">Hi,</tspan> <tspan className="w2">I&rsquo;m</tspan> <tspan className="w3">Archit.</tspan>
                </text>
              </svg>
              <svg className="mast-stack" viewBox="0 -74 295.1 165.2">
                <text x="0" y="0">
                  <tspan className="w1">Hi,</tspan> <tspan className="w2">I&rsquo;m</tspan>
                </text>
                <text x="0" y="90">
                  <tspan className="w3">Archit.</tspan>
                </text>
              </svg>
            </div>
          </motion.div>
        ))}
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
