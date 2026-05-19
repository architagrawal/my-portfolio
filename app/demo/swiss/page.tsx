"use client";
import { motion } from "framer-motion";
import { projects, roles } from "../_data";

const sans = { fontFamily: "'Space Grotesk', Inter, system-ui, sans-serif" };

export default function Swiss() {
  return (
    <main className="min-h-screen bg-white text-black" style={sans}>
      <header className="grid grid-cols-12 gap-4 px-6 md:px-10 py-5 border-b-2 border-black text-xs uppercase tracking-widest">
        <span className="col-span-3 font-bold">Archit / Agrawal</span>
        <span className="col-span-6 text-center">Portfolio — Vol. 04 — MMXXVI</span>
        <span className="col-span-3 text-right text-[#e4002b]">● Available 2026</span>
      </header>

      <section className="grid grid-cols-12 gap-4 px-6 md:px-10 pt-10 pb-20 border-b-2 border-black">
        <div className="col-span-12 md:col-span-1 relative">
          <div className="md:sticky md:top-10 origin-top-left md:-rotate-90 md:translate-y-40 text-xs uppercase tracking-[0.3em] whitespace-nowrap">
            ↳ Engineer / Builder
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-black tracking-[-0.04em] leading-[0.85] text-[16vw] md:text-[11vw] uppercase"
          >
            Build.<br/>
            <span className="text-[#e4002b]">Ship.</span><br/>
            Iterate.
          </motion.h1>
        </div>
        <div className="col-span-12 md:col-span-3 flex flex-col justify-end">
          <p className="text-sm leading-relaxed border-l-2 border-black pl-4">
            Independent engineer. ML infrastructure, retrieval, applied research.
            Tools that make LLMs dependable in production.
          </p>
          <div className="mt-6 text-[14vw] md:text-[8vw] font-black leading-none tabular-nums text-[#e4002b]">
            04
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-1">Sections below</span>
        </div>
      </section>

      <section id="work" className="px-6 md:px-10 py-16 border-b-2 border-black">
        <div className="grid grid-cols-12 gap-4 mb-8">
          <span className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest">§ Work</span>
          <h2 className="col-span-12 md:col-span-10 text-3xl md:text-5xl font-bold tracking-[-0.02em] uppercase">
            Selected projects, 2023—2025.
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {projects.map((p, i) => (
            <a href="#" key={p.n}
               className={`col-span-12 md:col-span-6 lg:col-span-3 border-2 border-black p-5 hover:bg-black hover:text-white transition group ${i % 2 ? "md:translate-y-6" : ""}`}>
              <div className="flex justify-between text-xs uppercase tracking-widest">
                <span>{p.n}</span><span>{p.year}</span>
              </div>
              <div className="mt-16 text-2xl font-bold leading-tight tracking-[-0.02em]">{p.title}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[#e4002b] group-hover:text-white">{p.kind} →</div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="grid grid-cols-12 gap-4 px-6 md:px-10 py-16 border-b-2 border-black">
        <span className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest">§ Experience</span>
        <dl className="col-span-12 md:col-span-10">
          {roles.map((r) => (
            <div key={r.yr} className="grid grid-cols-12 gap-4 py-4 border-t border-black first:border-t-0">
              <dt className="col-span-12 md:col-span-2 text-sm tabular-nums font-bold">{r.yr}</dt>
              <dd className="col-span-12 md:col-span-5 font-bold uppercase tracking-tight">{r.where}</dd>
              <dd className="col-span-12 md:col-span-5 text-sm">{r.what}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="px-6 md:px-10 py-16 bg-[#e4002b] text-white">
        <div className="grid grid-cols-12 gap-4 items-end">
          <span className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest">§ Contact</span>
          <a href="mailto:admin@mysta.ge"
             className="col-span-12 md:col-span-10 block font-black tracking-[-0.04em] leading-[0.85] uppercase text-[14vw] md:text-[10vw] hover:underline">
            Say Hello →
          </a>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-10 text-xs uppercase tracking-widest">
          <span className="col-span-12 md:col-span-2">© 2026</span>
          <span className="col-span-6 md:col-span-5">admin@mysta.ge</span>
          <span className="col-span-6 md:col-span-5 md:text-right">LinkedIn / GitHub</span>
        </div>
      </section>
    </main>
  );
}
