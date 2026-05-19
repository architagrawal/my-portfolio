"use client";
import { motion } from "framer-motion";
import { projects, roles } from "../_data";

const sans = { fontFamily: "'Inter', system-ui, sans-serif" };

// abstract SVG "stills" stand in for photography
function Still({ seed }: { seed: number }) {
  const palettes = [
    ["#111", "#2a2a2a", "#555"],
    ["#0a0a0a", "#1f1f1f", "#8a8a8a"],
    ["#0d0d0d", "#3a3a3a", "#bdbdbd"],
    ["#000", "#222", "#777"],
  ];
  const p = palettes[seed % palettes.length];
  return (
    <svg viewBox="0 0 800 1000" className="w-full h-full block" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={p[0]} />
          <stop offset="100%" stopColor={p[1]} />
        </linearGradient>
        <radialGradient id={`r${seed}`} cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor={p[2]} stopOpacity="0.8"/>
          <stop offset="100%" stopColor={p[1]} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#g${seed})`} />
      <circle cx={200 + seed * 60} cy={400 + seed * 40} r={260} fill={`url(#r${seed})`} />
      <g stroke={p[2]} strokeWidth="0.5" opacity="0.25">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1="0" x2="800" y1={i * 25} y2={i * 25} />
        ))}
      </g>
    </svg>
  );
}

export default function Photo() {
  return (
    <main className="min-h-screen bg-[#f2f0ec] text-black" style={sans}>
      <header className="flex items-center justify-between px-6 md:px-10 py-6 text-xs tracking-[0.25em] uppercase">
        <span className="font-semibold">A.Agrawal</span>
        <nav className="hidden md:flex gap-8 text-neutral-500">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <span>Reel / 2026</span>
      </header>

      <section className="relative h-[90vh] overflow-hidden border-y border-black/10">
        <div className="absolute inset-0 filter grayscale contrast-125">
          <Still seed={0} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-xs tracking-[0.3em] uppercase mb-4">Portfolio · Vol. 04</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
                     className="text-5xl md:text-8xl font-black tracking-[-0.03em] leading-none max-w-5xl">
            Work made with<br/>intention &amp; weight.
          </motion.h1>
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-2 text-sm uppercase tracking-widest text-white/80">
            <span>Archit Agrawal</span>
            <span>Engineer · ML infra</span>
            <span>Based remotely</span>
          </div>
        </div>
      </section>

      <section id="work" className="px-0">
        {projects.map((p, i) => (
          <article key={p.n} className={`grid grid-cols-12 gap-0 border-b border-black/10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="col-span-12 md:col-span-7 aspect-[4/5] md:aspect-auto overflow-hidden">
              <div className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700">
                <Still seed={i + 1} />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 p-8 md:p-16 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-neutral-500">{p.n} · {p.kind}</p>
                <h3 className="mt-6 text-4xl md:text-6xl font-black tracking-[-0.02em] leading-[0.95]">{p.title}</h3>
              </div>
              <div className="mt-12 flex items-center justify-between">
                <span className="text-sm tabular-nums text-neutral-500">{p.year}</span>
                <a href="#" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500">View case →</a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="about" className="px-6 md:px-12 py-20">
        <div className="grid grid-cols-12 gap-6 max-w-6xl">
          <h2 className="col-span-12 md:col-span-3 text-xs tracking-[0.3em] uppercase text-neutral-500">Biography</h2>
          <div className="col-span-12 md:col-span-9 text-2xl md:text-3xl leading-snug tracking-tight">
            Engineer working at the intersection of ML systems and product. Over a decade
            of shipping infrastructure, retrieval, and applied research at scale.
          </div>
        </div>
        <dl className="max-w-6xl mt-16 border-t border-black/20">
          {roles.map((r) => (
            <div key={r.yr} className="grid grid-cols-12 gap-6 py-5 border-b border-black/20">
              <dt className="col-span-12 md:col-span-3 text-sm tabular-nums text-neutral-500">{r.yr}</dt>
              <dd className="col-span-12 md:col-span-4 font-semibold">{r.where}</dd>
              <dd className="col-span-12 md:col-span-5 text-neutral-700">{r.what}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="bg-black text-white px-6 md:px-12 py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">Contact</p>
        <a href="mailto:admin@mysta.ge"
           className="block mt-4 text-[12vw] md:text-[8vw] font-black tracking-[-0.04em] leading-[0.9] hover:text-neutral-400 transition">
          admin@mysta.ge
        </a>
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-sm uppercase tracking-widest text-white/60">
          <a href="#">LinkedIn</a><a href="#">GitHub</a><a href="#">Read.cv</a>
          <span className="ml-auto">© 2026</span>
        </div>
      </section>
    </main>
  );
}
