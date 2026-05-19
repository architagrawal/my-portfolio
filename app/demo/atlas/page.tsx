"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const display = { fontFamily: "'Instrument Serif', Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const sans = { fontFamily: "'Inter', system-ui, sans-serif" };

const N = 620;

// four journey pins (normalized 0..1 of viewport)
const pins = [
  { name: "Bengaluru", sub: "EAT.FIT · 2021",       x: 0.82, y: 0.62 },
  { name: "Mumbai",    sub: "Zeus Learning · 2022", x: 0.80, y: 0.46 },
  { name: "Tempe",     sub: "ASU MSCS · 2023",       x: 0.28, y: 0.42 },
  { name: "Remote",    sub: "MyStage Music · 2025", x: 0.52, y: 0.26 },
];

// constellation of real projects/roles/awards
type Star = { key: string; kind: "role" | "project" | "award"; label: string; x: number; y: number };
const stars: Star[] = [
  { key: "mystage", kind: "role",    label: "MyStage",     x: 0.22, y: 0.22 },
  { key: "edplus",  kind: "role",    label: "Edplus · RAG", x: 0.40, y: 0.30 },
  { key: "ker",     kind: "role",    label: "KER · FAISS",  x: 0.52, y: 0.34 },
  { key: "zeus",    kind: "role",    label: "Zeus",         x: 0.78, y: 0.26 },
  { key: "eatfit",  kind: "role",    label: "EAT.FIT",      x: 0.86, y: 0.46 },
  { key: "autodiff",kind: "project", label: "Autodiff · CUDA", x: 0.14, y: 0.54 },
  { key: "imgrec",  kind: "project", label: "Image Rec SaaS",  x: 0.30, y: 0.64 },
  { key: "chat",    kind: "project", label: "Realtime Chat",   x: 0.48, y: 0.58 },
  { key: "ecom",    kind: "project", label: "E-Commerce",      x: 0.62, y: 0.72 },
  { key: "soccer",  kind: "project", label: "Soccer ML",       x: 0.74, y: 0.62 },
  { key: "orion",   kind: "award",   label: "Orion · Light Pollution", x: 0.38, y: 0.82 },
  { key: "pulsar",  kind: "award",   label: "SpaceCode · Pulsar",      x: 0.62, y: 0.84 },
];

// constellation edges (related work)
const links: [string, string][] = [
  ["edplus", "ker"],       // both ASU, both Neo4j
  ["edplus", "mystage"],   // AI/ML continuity
  ["ker", "autodiff"],     // research-ish
  ["mystage", "autodiff"], // ml infra
  ["orion", "pulsar"],     // space awards
  ["zeus", "eatfit"],      // India era
  ["chat", "ecom"],        // webapp side
  ["edplus", "chat"],      // full-stack crossover
  ["imgrec", "soccer"],    // ML side-projects
];
const starIdx = (k: string) => stars.findIndex((s) => s.key === k);

export default function Atlas() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(0); // 0..3 smooth
  const [stageInt, setStageInt] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  // map scroll to stage 0..3
  const stageMV = useTransform(scrollYProgress, [0, 1], [0, 3]);
  useMotionValueEvent(stageMV, "change", (v) => {
    stageRef.current = v;
    const i = Math.round(Math.max(0, Math.min(3, v)));
    if (i !== stageInt) setStageInt(i);
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // particle arrays
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);

    // stage 0 targets — gentle drift / scatter
    const s0x = new Float32Array(N);
    const s0y = new Float32Array(N);
    for (let i = 0; i < N; i++) { s0x[i] = Math.random(); s0y[i] = Math.random(); }

    // stage 1 — journey arc with pins
    const s1x = new Float32Array(N);
    const s1y = new Float32Array(N);
    // pin anchors: first 4*6 particles = clustered around pins
    let idx = 0;
    const pinCluster = 6;
    for (const p of pins) {
      for (let k = 0; k < pinCluster; k++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.012;
        s1x[idx] = p.x + Math.cos(a) * r;
        s1y[idx] = p.y + Math.sin(a) * r;
        idx++;
      }
    }
    // remaining particles: along a bezier curve visiting the 4 pins in order
    const pathPts = pins;
    for (; idx < N; idx++) {
      const t = Math.random();
      // sample a piecewise quadratic through the pins
      const seg = Math.min(pathPts.length - 2, Math.floor(t * (pathPts.length - 1)));
      const lt = (t * (pathPts.length - 1)) - seg;
      const a = pathPts[seg], b = pathPts[seg + 1];
      // control point slightly offset (gentle arc)
      const cx = (a.x + b.x) / 2;
      const cy = (a.y + b.y) / 2 - 0.08;
      const omt = 1 - lt;
      const bx = omt * omt * a.x + 2 * omt * lt * cx + lt * lt * b.x;
      const by = omt * omt * a.y + 2 * omt * lt * cy + lt * lt * b.y;
      // jitter off-curve
      s1x[idx] = bx + (Math.random() - 0.5) * 0.02;
      s1y[idx] = by + (Math.random() - 0.5) * 0.02;
    }

    // stage 2 — constellation
    const s2x = new Float32Array(N);
    const s2y = new Float32Array(N);
    const starCluster = 10;
    idx = 0;
    for (const s of stars) {
      for (let k = 0; k < starCluster; k++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.015;
        s2x[idx] = s.x + Math.cos(a) * r;
        s2y[idx] = s.y + Math.sin(a) * r;
        idx++;
      }
    }
    // remaining: sky noise
    for (; idx < N; idx++) {
      s2x[idx] = Math.random();
      s2y[idx] = 0.1 + Math.random() * 0.85;
    }

    // stage 3 — beam (vertical collapse)
    const s3x = new Float32Array(N);
    const s3y = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      s3x[i] = 0.5 + (Math.random() - 0.5) * 0.05;
      s3y[i] = Math.random();
    }

    // init positions at stage 0
    for (let i = 0; i < N; i++) { px[i] = s0x[i]; py[i] = s0y[i]; }

    const tgtX = [s0x, s1x, s2x, s3x];
    const tgtY = [s0y, s1y, s2y, s3y];

    let tAnim = 0;

    const loop = () => {
      tAnim += 0.016;
      const s = Math.max(0, Math.min(2.999, stageRef.current));
      const lo = Math.floor(s);
      const hi = Math.min(3, lo + 1);
      const k = s - lo;

      // ease
      const ease = k * k * (3 - 2 * k);

      ctx.clearRect(0, 0, W, H);

      // cream paper is the page bg; canvas is transparent

      // 1) draw constellation lines when near stage 2
      const constVis = Math.max(0, 1 - Math.abs(s - 2) * 1.6);
      if (constVis > 0.01) {
        ctx.strokeStyle = `rgba(28, 26, 20, ${0.18 * constVis})`;
        ctx.lineWidth = 0.7;
        for (const [a, b] of links) {
          const ia = starIdx(a), ib = starIdx(b);
          if (ia < 0 || ib < 0) continue;
          const pa = stars[ia], pb = stars[ib];
          ctx.beginPath();
          ctx.moveTo(pa.x * W, pa.y * H);
          ctx.lineTo(pb.x * W, pb.y * H);
          ctx.stroke();
        }
      }

      // 2) particles
      for (let i = 0; i < N; i++) {
        const tx = tgtX[lo][i] * (1 - ease) + tgtX[hi][i] * ease;
        const ty = tgtY[lo][i] * (1 - ease) + tgtY[hi][i] * ease;

        // gentle drift in stage 0
        let dx = 0, dy = 0;
        if (s < 0.35) {
          const d = (1 - s / 0.35);
          dx = Math.sin(tAnim * 0.6 + i * 0.21) * 0.002 * d;
          dy = Math.cos(tAnim * 0.5 + i * 0.17) * 0.002 * d;
        }

        // spring toward target
        const ax = (tx + dx - px[i]) * 0.08;
        const ay = (ty + dy - py[i]) * 0.08;
        vx[i] = (vx[i] + ax) * 0.78;
        vy[i] = (vy[i] + ay) * 0.78;
        px[i] += vx[i];
        py[i] += vy[i];

        const screenX = px[i] * W;
        const screenY = py[i] * H;

        // base particle
        ctx.fillStyle = "rgba(28, 26, 20, 0.55)";
        ctx.beginPath();
        ctx.arc(screenX, screenY, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3) highlight anchors (pins at stage 1, stars at stage 2)
      const pinVis = Math.max(0, 1 - Math.abs(s - 1) * 1.6);
      if (pinVis > 0.01) {
        for (const p of pins) {
          const x = p.x * W, y = p.y * H;
          const pulse = 0.5 + 0.5 * Math.sin(tAnim * 2 + p.x * 8);
          ctx.fillStyle = `rgba(166, 58, 31, ${0.85 * pinVis})`;
          ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = `rgba(166, 58, 31, ${0.35 * pinVis * (0.6 + pulse * 0.4)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(x, y, 10 + pulse * 4, 0, Math.PI * 2); ctx.stroke();
        }
      }

      if (constVis > 0.01) {
        for (const s0 of stars) {
          const x = s0.x * W, y = s0.y * H;
          ctx.fillStyle = s0.kind === "award" ? `rgba(166, 58, 31, ${0.9 * constVis})`
                           : s0.kind === "role" ? `rgba(28, 26, 20, ${0.9 * constVis})`
                           : `rgba(28, 26, 20, ${0.75 * constVis})`;
          ctx.beginPath(); ctx.arc(x, y, s0.kind === "role" ? 3.5 : 2.8, 0, Math.PI * 2); ctx.fill();
          // halo
          ctx.strokeStyle = `rgba(28, 26, 20, ${0.15 * constVis})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.stroke();
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // opacity helpers for labels based on stageRef-driven stageInt
  const labelOp = (s: number) => (stageInt === s ? 1 : 0);

  return (
    <main className="bg-[#f4efe0] text-[#1c1a14]" style={sans}>
      {/* subtle paper grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-[1]"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>\")" }} />

      {/* fixed canvas behind all hero sections */}
      <canvas ref={canvasRef} className="fixed inset-0 w-screen h-screen pointer-events-none z-[2]" />

      {/* fixed compass / running header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-10 py-5 text-[11px] tracking-[0.3em] uppercase text-neutral-700 mix-blend-multiply" style={mono}>
        <span>Archit Agrawal · Stellar Atlas</span>
        <span>{["I", "II", "III", "IV"][stageInt]} · {["arrival", "journey", "works", "contact"][stageInt]}</span>
      </header>

      {/* HERO — 4 viewports, each advances the stage */}
      <div ref={heroRef} className="relative z-10" style={{ height: "400vh" }}>
        {/* Stage 0 — title */}
        <section className="h-screen sticky top-0 flex items-center justify-center px-6"
                 style={{ opacity: stageInt === 0 ? 1 : 0, transition: "opacity 0.6s" }}>
          <div className="text-center max-w-3xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-600 mb-6" style={mono}>A portfolio · plotted as stars</p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-[14vw] md:text-[9vw] leading-[0.9] tracking-[-0.02em]"
              style={display}>
              Archit<br/>Agrawal
            </motion.h1>
            <p className="mt-8 text-lg text-neutral-700 italic" style={display}>
              AI/ML engineer, plotted across four skies. Scroll to follow.
            </p>
            <div className="mt-10 text-xs text-neutral-500 animate-bounce" style={mono}>↓ scroll</div>
          </div>
        </section>
      </div>

      {/* absolute overlays — pins & star labels fade with stageInt */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {/* title (stage 0 already rendered inside hero sticky) */}

        {/* Stage 1 — journey caption + pin labels */}
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: labelOp(1) }}>
          <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 text-center px-6">
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-600" style={mono}>Chapter II — Journey</p>
            <h2 className="mt-3 text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]" style={display}>
              Four cities,<br/>one direction.
            </h2>
          </div>
          {pins.map((p) => (
            <div key={p.name}
                 className="absolute -translate-x-1/2 -translate-y-[140%] text-center"
                 style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#a63a1f]" style={mono}>● {p.name}</div>
              <div className="text-xs text-neutral-700 mt-0.5" style={mono}>{p.sub}</div>
            </div>
          ))}
        </div>

        {/* Stage 2 — constellation caption + star labels */}
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: labelOp(2) }}>
          <div className="absolute top-[8vh] left-1/2 -translate-x-1/2 text-center px-6">
            <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-600" style={mono}>Chapter III — Constellation</p>
            <h2 className="mt-3 text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]" style={display}>
              The work, as a <span className="italic">star-map</span>.
            </h2>
          </div>
          {stars.map((s) => (
            <div key={s.key}
                 className="absolute -translate-x-1/2 -translate-y-[160%] text-center whitespace-nowrap"
                 style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}>
              <div className={`text-[10px] tracking-[0.25em] uppercase ${s.kind === "award" ? "text-[#a63a1f]" : "text-neutral-800"}`} style={mono}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stage 3 — beam / contact */}
        <div className="absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center px-6" style={{ opacity: labelOp(3) }}>
          <p className="text-[11px] tracking-[0.4em] uppercase text-neutral-600 mb-6" style={mono}>Chapter IV — Contact</p>
          <a href="mailto:admin@mysta.ge"
             className="text-6xl md:text-8xl leading-[0.95] tracking-[-0.02em] hover:italic transition-all"
             style={display}>
            Say hello →
          </a>
          <div className="mt-8 flex gap-6 text-sm text-neutral-600" style={mono}>
            <a href="#" className="hover:text-[#a63a1f]">LinkedIn</a>
            <a href="#" className="hover:text-[#a63a1f]">GitHub</a>
            <a href="/Archit_Agrawal_Resume.pdf" className="hover:text-[#a63a1f]">Résumé.pdf</a>
          </div>
        </div>
      </div>

      {/* AFTER-HERO readable confirmation — same content, typographic */}
      <section className="relative z-10 bg-[#f4efe0] pt-20 pb-32 px-6 md:px-16 border-t border-neutral-400">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-600" style={mono}>— appendix —</p>
          <h2 className="mt-3 text-5xl md:text-6xl tracking-[-0.02em] leading-tight" style={display}>
            The atlas, written out.
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4" style={mono}>Roles</div>
              <ul className="space-y-5">
                {[
                  ["Jul 2025 —", "AI/ML Engineer · MyStage Music Inc.", "GCP · FastAPI · Playwright · Gemini Vertex AI"],
                  ["Sep 2023 — May 2025", "Student SWE · ASU Edplus", "RAG for 60,000+ students · Neo4j KG 4h→15min"],
                  ["Jun — Aug 2024", "Data Research · ASU KER", "FAISS + Neo4j · 60% faster, 95% accurate"],
                  ["Jan 2022 — Jul 2023", "Software Engineer · Zeus Learning", ".NET · Kubernetes · −35% resources, −70% deploy"],
                  ["Sep — Dec 2021", "Product Intern · EAT.FIT", "React · Node · realtime order tracking"],
                ].map(([yr, title, stack]) => (
                  <li key={title as string} className="border-l-2 border-neutral-400 pl-4">
                    <div className="text-[11px] tracking-[0.2em] uppercase text-neutral-500" style={mono}>{yr}</div>
                    <div className="text-xl mt-1" style={display}>{title}</div>
                    <div className="text-[12px] text-neutral-600 mt-1" style={mono}>{stack}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4" style={mono}>Selected works · awards</div>
              <ul className="space-y-3 text-[15px]">
                {[
                  ["Reverse-mode autodiff", "Python · CUDA"],
                  ["Image Recognition as a Service", "AWS · SaaS"],
                  ["Soccer Result Prediction", "LSTM · XGBoost"],
                  ["FitLife Health Tracker", "Android · ML"],
                  ["E-Commerce Platform", "React · Django · Stripe"],
                  ["Real-Time Chat", "Django Channels · Redis"],
                ].map(([t, k]) => (
                  <li key={t} className="flex justify-between gap-4 border-b border-neutral-300 pb-2">
                    <span style={display} className="text-lg">{t}</span>
                    <span className="text-[11px] text-neutral-600" style={mono}>{k}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3" style={mono}>Commendations</div>
              <ul className="space-y-2 text-[15px]">
                <li className="flex justify-between"><span>Orion Space Hackathon — 3rd</span><span className="text-[11px] text-neutral-600" style={mono}>Light Pollution Explorer</span></li>
                <li className="flex justify-between"><span>SpaceCode Hackathon — 3rd</span><span className="text-[11px] text-neutral-600" style={mono}>AI Pulsar Detection</span></li>
                <li className="flex justify-between"><span>KrackHack 2.0 (GDG) — 3rd</span><span className="text-[11px] text-neutral-600" style={mono}>Dealora</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-baseline justify-between gap-6 border-t border-neutral-400 pt-6 text-[11px] tracking-[0.3em] uppercase text-neutral-600" style={mono}>
            <span>© MMXXVI · Archit Agrawal</span>
            <span>MSCS · Arizona State University</span>
            <span>admin@mysta.ge</span>
          </div>
        </div>
      </section>
    </main>
  );
}
