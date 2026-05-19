import Link from "next/link";

const tailored = [
  { slug: "atlas",   name: "Stellar Atlas ★★", desc: "Scroll-driven particle narrative on light paper. Particles morph: scatter → journey pins (Bengaluru → Mumbai → Tempe → Remote) → constellation of projects → contact beam. Zero interaction curve, visually distinct, ties space-hackathon identity into the whole design." },
  { slug: "spread",  name: "Magazine Spread ★", desc: "Editorial, but committed — nameplate masthead, drop cap, three-column body text, pull-quotes, hover footnotes, captioned figures, folios. Reads like a real print publication (The Atavist / broadsheet journal), not another Instrument-Serif hero page." },
  { slug: "graph",   name: "Knowledge Graph",   desc: "Your portfolio rendered as a Neo4j-style graph — companies, projects, skills, awards as nodes. Hover to highlight connections, click to open a detail panel. On-brand because you build knowledge graphs." },
  { slug: "ledger",  name: "Impact Ledger",      desc: "Your real metrics as the heroes — 60,000 students, 4h→15min, 60% faster queries. Animated tickers, Bloomberg-terminal-lite, light mode. Every number links back to its project." },
  { slug: "mission", name: "Mission Log",        desc: "Leans into your space-hackathon thread. Each role is a mission with code, coords, payload (stack), and flight notes. NASA-publication aesthetic, light paper." },
];

const generic = [
  { slug: "story",    name: "Story / Notebook",   desc: "Light paper, continuous narrative. Hand-drawn annotations, interactive words, letter-style contact." },
  { slug: "editorial", name: "Editorial",         desc: "Warm cream, huge serif, asymmetric 12-col grid. Magazine feel." },
  { slug: "dark",     name: "Dark Editorial",     desc: "Ink black, cream serif, ember accent." },
  { slug: "terminal", name: "Terminal / Brutalist", desc: "Monospace, ASCII rules, caret." },
  { slug: "swiss",    name: "Swiss Grid",         desc: "Red/black/white, bold numerals, rotated labels." },
  { slug: "notebook", name: "Research Notebook",  desc: "Two-column academic layout with marginalia." },
  { slug: "spatial",  name: "Spatial",             desc: "Aurora gradient, parallax, motion-heavy." },
  { slug: "photo",    name: "Monochrome Photo-led", desc: "Oversized B&W stills structure the page." },
];

export default function DemoIndex() {
  return (
    <main className="min-h-screen bg-white text-black p-6 md:p-12" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-4xl">
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">Design Mocks</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Three tailored to you.</h1>
        <p className="text-neutral-600 mb-12 max-w-xl">
          Built from your real experience and projects — MyStage, ASU Edplus, KER, Zeus, EAT.FIT — with
          your actual metrics. Not generic templates.
        </p>

        <ul className="divide-y divide-neutral-200 border-t border-b border-neutral-200 mb-16">
          {tailored.map((v, i) => (
            <li key={v.slug}>
              <Link
                href={`/demo/${v.slug}`}
                className="group flex items-baseline gap-6 py-6 hover:bg-neutral-50 px-2 -mx-2 transition"
              >
                <span className="text-xs tabular-nums text-neutral-400 w-8">★{i + 1}</span>
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight">{v.name}</div>
                  <div className="text-neutral-600 text-sm mt-1 max-w-2xl">{v.desc}</div>
                </div>
                <span className="text-neutral-400 group-hover:text-black transition">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">Earlier generic mocks (for reference)</p>
        <ul className="divide-y divide-neutral-100">
          {generic.map((v) => (
            <li key={v.slug}>
              <Link href={`/demo/${v.slug}`} className="group flex items-baseline gap-6 py-3 text-sm hover:bg-neutral-50 px-2 -mx-2 transition">
                <span className="w-40 text-neutral-500 group-hover:text-black">{v.name}</span>
                <span className="text-neutral-500 flex-1 truncate">{v.desc}</span>
                <span className="text-neutral-300 group-hover:text-black">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
