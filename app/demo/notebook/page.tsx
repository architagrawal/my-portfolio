"use client";
import { projects, roles } from "../_data";

const body = { fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif" };

export default function Notebook() {
  return (
    <main className="min-h-screen bg-[#fbf9f3] text-[#1a1a1a]" style={body}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="text-center text-xs tracking-widest uppercase text-neutral-500">
          Dept. of Applied Engineering · Preprint
        </div>
        <h1 className="mt-8 text-center text-5xl md:text-7xl tracking-tight leading-tight">
          On Building Intelligent Systems<br/>
          <span className="italic text-neutral-600">— a working record</span>
        </h1>
        <p className="mt-4 text-center text-neutral-600">Archit Agrawal <sup>1</sup></p>
        <p className="text-center text-xs text-neutral-500 mt-1"><sup>1</sup> Independent researcher &amp; engineer. <em>admin@mysta.ge</em></p>

        <hr className="my-10 border-neutral-300"/>

        <section>
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">Abstract</p>
          <p className="text-lg leading-relaxed italic">
            This document collects selected projects, roles, and correspondence for A. Agrawal.
            The accompanying work spans retrieval, orchestration, and production-grade ML
            infrastructure. Code and artifacts are referenced inline.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl border-b border-neutral-400 pb-1 mb-6">1. Selected Work</h2>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-9 space-y-5">
              {projects.map((p, i) => (
                <article key={p.n} className="leading-relaxed">
                  <h3 className="text-xl">
                    1.{i + 1}  <a href="#" className="underline decoration-neutral-400 underline-offset-4 hover:decoration-black">{p.title}</a>
                    <sup className="text-xs text-neutral-500"> [{i + 1}]</sup>
                  </h3>
                  <p className="text-neutral-700">
                    A {p.kind.toLowerCase()} project delivered in {p.year}. See figure {i + 1} for system diagram and evaluation results.
                  </p>
                </article>
              ))}
            </div>
            <aside className="col-span-12 md:col-span-3 text-sm text-neutral-600 space-y-4 border-l border-neutral-300 pl-4 italic">
              <p>Fig. 1. Projects are ordered by recency, not importance.</p>
              <p>Fig. 2. Each title links to a long-form writeup with methods &amp; metrics.</p>
            </aside>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl border-b border-neutral-400 pb-1 mb-6">2. Appointments</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-300">
                <th className="py-2 font-normal">Period</th>
                <th className="py-2 font-normal">Institution</th>
                <th className="py-2 font-normal">Focus</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.yr} className="border-b border-neutral-200">
                  <td className="py-3 tabular-nums">{r.yr}</td>
                  <td className="py-3">{r.where}</td>
                  <td className="py-3 text-neutral-700 italic">{r.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl border-b border-neutral-400 pb-1 mb-6">3. Correspondence</h2>
          <p className="leading-relaxed">
            The author welcomes inquiries on collaboration, advisory work, and research partnerships.
            Please direct correspondence to{" "}
            <a href="mailto:admin@mysta.ge" className="underline underline-offset-4">admin@mysta.ge</a>.
            Further materials are available on request<sup>2</sup>.
          </p>
          <p className="text-xs text-neutral-500 mt-10 border-t border-neutral-300 pt-4">
            <sup>2</sup> Résumé available as PDF. Last revised April 2026.
          </p>
        </section>
      </div>
    </main>
  );
}
