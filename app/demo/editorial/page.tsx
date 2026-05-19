"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  { n: "01", title: "Neural Retrieval Engine", kind: "ML · Infra", year: "2025" },
  { n: "02", title: "Realtime Data Mesh", kind: "Platform", year: "2024" },
  { n: "03", title: "LLM Agent Orchestrator", kind: "AI · SDK", year: "2024" },
  { n: "04", title: "Vector Search @ Scale", kind: "Research", year: "2023" },
];

const roles = [
  { yr: "2024 —", where: "Staff Engineer, Acme", what: "LLM infra, retrieval, eval." },
  { yr: "2022 — 24", where: "Senior ML, Globex", what: "Ranking, features, serving." },
  { yr: "2020 — 22", where: "Engineer, Initech", what: "Data platform, pipelines." },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#111] antialiased selection:bg-[#111] selection:text-[#f6f4ef]">
      {/* top bar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 text-xs tracking-[0.2em] uppercase">
        <Link href="/" className="font-medium">Archit Agrawal</Link>
        <nav className="hidden md:flex gap-10 text-neutral-500">
          <a href="#work" className="hover:text-black transition">Work</a>
          <a href="#about" className="hover:text-black transition">About</a>
          <a href="#contact" className="hover:text-black transition">Contact</a>
        </nav>
        <a href="#contact" className="hover:text-black transition text-neutral-500">
          available ’26 →
        </a>
      </header>

      {/* hero — asymmetric editorial */}
      <section className="px-6 md:px-12 pt-16 md:pt-28 pb-24 md:pb-40 border-b border-neutral-300">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500 pt-3">
            Portfolio<br/>Vol. 04
          </div>
          <div className="col-span-12 md:col-span-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif leading-[0.92] tracking-[-0.02em] text-[14vw] md:text-[11vw]"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              Engineering<br/>
              <span className="italic text-neutral-500">intelligent</span> systems.
            </motion.h1>
            <div className="mt-14 grid grid-cols-12 gap-6">
              <p className="col-span-12 md:col-span-5 md:col-start-6 text-lg md:text-xl text-neutral-700 leading-relaxed">
                Independent engineer working across ML infrastructure, retrieval, and applied
                research. Currently building tools that make LLMs dependable in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* selected work */}
      <section id="work" className="px-6 md:px-12 py-20 border-b border-neutral-300">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <h2 className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500">
            Selected Work
          </h2>
          <p className="col-span-12 md:col-span-6 font-serif text-3xl md:text-4xl leading-tight"
             style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            A short list of things I’ve shipped and am proud of.
          </p>
        </div>
        <ul>
          {projects.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group border-t border-neutral-300 last:border-b"
            >
              <a href="#" className="grid grid-cols-12 gap-6 py-8 md:py-10 items-baseline hover:bg-[#efece3] transition-colors px-2 -mx-2">
                <span className="col-span-2 md:col-span-1 text-xs tracking-[0.2em] text-neutral-500">{p.n}</span>
                <span className="col-span-10 md:col-span-7 font-serif text-3xl md:text-5xl tracking-[-0.01em]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  {p.title}
                </span>
                <span className="hidden md:block md:col-span-2 text-sm text-neutral-500">{p.kind}</span>
                <span className="hidden md:flex md:col-span-2 items-center justify-end gap-3 text-sm text-neutral-500">
                  {p.year}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* about / experience */}
      <section id="about" className="px-6 md:px-12 py-20 border-b border-neutral-300">
        <div className="grid grid-cols-12 gap-6">
          <h2 className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500">
            Experience
          </h2>
          <div className="col-span-12 md:col-span-10">
            <dl className="divide-y divide-neutral-300">
              {roles.map((r) => (
                <div key={r.yr} className="grid grid-cols-12 gap-6 py-6">
                  <dt className="col-span-12 md:col-span-2 text-sm text-neutral-500 tabular-nums">{r.yr}</dt>
                  <dd className="col-span-12 md:col-span-5 font-medium">{r.where}</dd>
                  <dd className="col-span-12 md:col-span-5 text-neutral-600">{r.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* contact — oversized footer */}
      <section id="contact" className="px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-2 text-xs tracking-[0.2em] uppercase text-neutral-500">
            Contact
          </div>
          <div className="col-span-12 md:col-span-10">
            <a href="mailto:hello@example.com"
               className="block font-serif text-[12vw] md:text-[9vw] leading-[0.95] tracking-[-0.02em] hover:italic transition-all"
               style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Say hello →
            </a>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm text-neutral-500">
              <span>admin@mysta.ge</span>
              <a href="#" className="hover:text-black">LinkedIn</a>
              <a href="#" className="hover:text-black">GitHub</a>
              <a href="#" className="hover:text-black">Read.cv</a>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-between text-xs tracking-[0.2em] uppercase text-neutral-500">
          <span>© 2026 — Archit Agrawal</span>
          <span>Set in Instrument Serif</span>
        </div>
      </section>
    </main>
  );
}
