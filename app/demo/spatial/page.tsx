"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, roles } from "../_data";

const display = { fontFamily: "'Space Grotesk', Inter, sans-serif" };

function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40"
           style={{ background: "radial-gradient(circle, #7c3aed, transparent 60%)" }} />
      <div className="absolute top-1/3 -right-40 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(circle, #22d3ee, transparent 60%)" }} />
      <div className="absolute bottom-0 left-1/3 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(circle, #ec4899, transparent 60%)" }} />
      <div className="absolute inset-0"
           style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
    </div>
  );
}

export default function Spatial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const op = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen text-white" style={display}>
      <Aurora />

      <header className="fixed top-0 left-0 right-0 z-30 flex justify-between px-6 md:px-10 py-5 text-xs tracking-widest uppercase backdrop-blur-md bg-black/30 border-b border-white/10">
        <span>Archit · 2026</span>
        <nav className="hidden md:flex gap-8 text-white/60">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <span className="text-emerald-300">◦ available</span>
      </header>

      <section ref={ref} className="h-[130vh] flex items-center justify-center px-6 relative">
        <motion.div style={{ y, opacity: op }} className="text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6">Scroll ↓</p>
          <h1 className="text-[14vw] md:text-[10vw] font-bold tracking-[-0.04em] leading-[0.9]">
            <span className="bg-gradient-to-r from-violet-300 via-cyan-200 to-pink-300 bg-clip-text text-transparent">
              Spatial
            </span><br/>
            Engineering.
          </h1>
          <p className="mt-8 text-white/70 max-w-xl mx-auto">
            A portfolio that moves. ML infrastructure, retrieval, applied research —
            told as a scroll-driven narrative.
          </p>
        </motion.div>
      </section>

      <section id="work" className="px-6 md:px-10 py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6">Selected Work</p>
        <div className="grid grid-cols-12 gap-6">
          {projects.map((p, i) => (
            <motion.a href="#" key={p.n}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: i * 0.08 }}
              className="col-span-12 md:col-span-6 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-white/30 transition">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                   style={{ background: "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.08), transparent 40%)" }} />
              <div className="flex justify-between text-xs tracking-widest text-white/50">
                <span>{p.n}</span><span>{p.year}</span>
              </div>
              <div className="mt-16 text-3xl md:text-4xl font-semibold tracking-tight">{p.title}</div>
              <div className="mt-3 text-sm text-cyan-300">{p.kind} →</div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="about" className="px-6 md:px-10 py-24 border-t border-white/10">
        <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6">Trajectory</p>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-cyan-300 to-pink-400" />
          {roles.map((r, i) => (
            <motion.div key={r.yr}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`relative pl-12 md:pl-0 md:w-1/2 py-6 ${i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10 md:text-right"}`}>
              <div className={`absolute top-8 w-3 h-3 rounded-full bg-white ${i % 2 ? "md:-left-1.5 left-2.5" : "md:-right-1.5 left-2.5"}`} />
              <p className="text-sm text-cyan-300 tabular-nums">{r.yr}</p>
              <p className="text-xl font-semibold">{r.where}</p>
              <p className="text-white/60">{r.what}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 md:px-10 py-32 text-center">
        <a href="mailto:admin@mysta.ge"
           className="inline-block text-[12vw] md:text-[8vw] font-bold tracking-[-0.04em] bg-gradient-to-r from-violet-300 via-cyan-200 to-pink-300 bg-clip-text text-transparent hover:scale-[1.02] transition-transform">
          Let’s build →
        </a>
        <p className="mt-6 text-white/50">admin@mysta.ge · LinkedIn · GitHub</p>
      </section>
    </main>
  );
}
