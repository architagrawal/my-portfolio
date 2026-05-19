"use client";
import { motion } from "framer-motion";
import { projects, roles } from "../_data";

const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };

export default function DarkEditorial() {
  return (
    <main className="min-h-screen bg-[#0b0a08] text-[#ece7da] antialiased selection:bg-[#ff6a3d] selection:text-black">
      <header className="flex items-center justify-between px-6 md:px-12 py-6 text-xs tracking-[0.2em] uppercase">
        <span>Archit Agrawal</span>
        <nav className="hidden md:flex gap-10 text-neutral-400">
          <a href="#work" className="hover:text-[#ff6a3d]">Work</a>
          <a href="#about" className="hover:text-[#ff6a3d]">About</a>
          <a href="#contact" className="hover:text-[#ff6a3d]">Contact</a>
        </nav>
        <span className="text-[#ff6a3d]">◦ available ’26</span>
      </header>

      <section className="px-6 md:px-12 pt-20 md:pt-32 pb-24 md:pb-40 border-b border-neutral-800">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500 pt-3">
            Vol. 04<br/>MMXXVI
          </div>
          <div className="col-span-12 md:col-span-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="leading-[0.92] tracking-[-0.02em] text-[14vw] md:text-[11vw]"
              style={serif}
            >
              Engineering<br/>
              <span className="italic text-[#ff6a3d]">intelligent</span> systems.
            </motion.h1>
            <p className="mt-14 md:col-start-6 md:w-1/2 text-lg md:text-xl text-neutral-400 leading-relaxed md:ml-[41.666%]">
              Independent engineer across ML infrastructure, retrieval, and applied research.
              Currently building tools that make LLMs dependable in production.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 md:px-12 py-20 border-b border-neutral-800">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <h2 className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500">Selected Work</h2>
          <p className="col-span-12 md:col-span-6 text-3xl md:text-4xl leading-tight" style={serif}>
            Things shipped, not decks.
          </p>
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.n} className="group border-t border-neutral-800 last:border-b">
              <a href="#" className="grid grid-cols-12 gap-6 py-8 md:py-10 items-baseline hover:bg-neutral-900/60 transition-colors px-2 -mx-2">
                <span className="col-span-2 md:col-span-1 text-xs tracking-[0.2em] text-neutral-500">{p.n}</span>
                <span className="col-span-10 md:col-span-7 text-3xl md:text-5xl tracking-[-0.01em]" style={serif}>
                  {p.title}
                </span>
                <span className="hidden md:block md:col-span-2 text-sm text-neutral-500">{p.kind}</span>
                <span className="hidden md:block md:col-span-2 text-right text-sm text-neutral-500 group-hover:text-[#ff6a3d]">{p.year} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="px-6 md:px-12 py-20 border-b border-neutral-800">
        <div className="grid grid-cols-12 gap-6">
          <h2 className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500">Experience</h2>
          <dl className="col-span-12 md:col-span-10 divide-y divide-neutral-800">
            {roles.map((r) => (
              <div key={r.yr} className="grid grid-cols-12 gap-6 py-6">
                <dt className="col-span-12 md:col-span-2 text-sm text-neutral-500 tabular-nums">{r.yr}</dt>
                <dd className="col-span-12 md:col-span-5 font-medium">{r.where}</dd>
                <dd className="col-span-12 md:col-span-5 text-neutral-400">{r.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="px-6 md:px-12 py-24 md:py-32">
        <a href="mailto:admin@mysta.ge" className="block text-[12vw] md:text-[9vw] leading-[0.95] tracking-[-0.02em] hover:italic hover:text-[#ff6a3d] transition-all" style={serif}>
          Say hello →
        </a>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm text-neutral-500">
          <span>admin@mysta.ge</span>
          <a href="#" className="hover:text-[#ff6a3d]">LinkedIn</a>
          <a href="#" className="hover:text-[#ff6a3d]">GitHub</a>
        </div>
      </section>
    </main>
  );
}
