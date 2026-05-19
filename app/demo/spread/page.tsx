"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const body = { fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif" };
const display = { fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

// small numbered figure component
function Figure({ n, caption, children }: { n: number; caption: string; children: React.ReactNode }) {
  return (
    <figure className="break-inside-avoid mb-6 border-t border-b border-neutral-400 py-4">
      {children}
      <figcaption className="mt-3 text-[11px] leading-snug text-neutral-700 italic" style={body}>
        <span className="not-italic font-semibold" style={mono}>FIG. {String(n).padStart(2, "0")}</span> — {caption}
      </figcaption>
    </figure>
  );
}

// inline footnote with hover-expanding tooltip
function Note({ n, children }: { n: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline">
      <sup
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        className="ml-0.5 text-[#a63a1f] cursor-help" style={mono}
      >[{n}]</sup>
      {open && (
        <motion.span
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 left-0 top-6 w-72 bg-[#fdfaef] border border-neutral-400 p-3 text-[12px] leading-snug italic shadow-md"
          style={body}
        >
          <span className="not-italic font-semibold" style={mono}>[{n}] </span>
          {children}
        </motion.span>
      )}
    </span>
  );
}

// pull quote
function Pull({ children, attrib }: { children: React.ReactNode; attrib?: string }) {
  return (
    <aside className="break-inside-avoid my-4 border-y-[3px] border-double border-neutral-700 py-4">
      <blockquote className="text-3xl leading-[1.1] tracking-[-0.01em]" style={display}>
        &ldquo;{children}&rdquo;
      </blockquote>
      {attrib && <div className="mt-2 text-[11px] tracking-[0.2em] uppercase text-neutral-600" style={mono}>— {attrib}</div>}
    </aside>
  );
}

export default function Spread() {
  return (
    <main className="min-h-screen bg-[#f4efe0] text-[#1c1a14]" style={body}>
      {/* paper fiber grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0 mix-blend-multiply"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>\")" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-10">

        {/* ——— masthead ——— */}
        <div className="flex items-end justify-between border-b-[3px] border-double border-[#1c1a14] pb-3 text-[10px] tracking-[0.35em] uppercase" style={mono}>
          <span>Vol. IV · No. 1</span>
          <span>Monthly, since MMXX</span>
          <span>$0 · always free</span>
        </div>
        <h1 className="text-center text-[14vw] md:text-[11vw] leading-[0.85] tracking-[-0.03em] mt-3" style={display}>
          The Agrawal Review
        </h1>
        <div className="flex items-center justify-between border-t-[3px] border-double border-[#1c1a14] mt-3 pt-2 text-[10px] tracking-[0.35em] uppercase" style={mono}>
          <span>Tempe · Mumbai · Remote</span>
          <span>April MMXXVI</span>
          <span>Number 01</span>
        </div>

        {/* ——— feature headline ——— */}
        <header className="mt-14 md:mt-20 text-center max-w-4xl mx-auto">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[#a63a1f]" style={mono}>— feature story —</div>
          <h2 className="mt-4 text-5xl md:text-7xl leading-[1] tracking-[-0.02em]" style={display}>
            Notes from an engineer<br/>
            <span className="italic">quietly</span> building retrieval,<br/>
            from Mumbai to Tempe.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-neutral-700 italic leading-relaxed">
            On knowledge graphs, vector search, and the slow craft of shipping AI that actually holds up
            in front of users.
          </p>
          <div className="mt-6 text-[11px] tracking-[0.25em] uppercase text-neutral-600" style={mono}>
            by Archit Agrawal · MSCS, Arizona State University · 4,200 words
          </div>
        </header>

        {/* ——— three-column body ——— */}
        <article className="mt-16 md:columns-3 md:gap-8 [column-rule:1px_solid_#b9b29c] text-[16px] leading-[1.55]">

          <p className="first-letter:float-left first-letter:mr-2 first-letter:text-[82px] first-letter:leading-[0.8]
                        first-letter:font-normal first-letter:text-[#a63a1f] first-letter:pt-1"
             style={display}>
            There is a quiet kind of engineering that doesn&rsquo;t trend on Twitter. It is the work of making a
            retrieval system fast enough that a professor actually uses it; of cutting a 4-hour manual chore
            <Note n={1}>
              At ASU Edplus, course transcript processing was a 4-hour manual task per document. After shipping
              the Neo4j + LLM knowledge graph, that collapsed to 15 minutes.
            </Note>
            down to 15 minutes without anyone noticing the seams. This is a dispatch from the middle of that
            work, as of April 2026.
          </p>

          <p>
            The author spent two years at <em>ASU Edplus</em><Note n={2}>
              Student Software Developer, Sept 2023 – May 2025. The flagship deliverable was a retrieval-augmented
              generation (RAG) chatbot serving 1,000+ faculty authoring courses for 60,000+ students.
            </Note> leading the retrieval stack that now sits under course design for more than sixty thousand
            students. The chatbot itself is unremarkable — LangChain, OpenAI, the usual. What made it work was
            the graph underneath: a Neo4j store of relationships between syllabi, competencies, and prior art,
            stitched to language models through a semantic kernel.
          </p>

          <Pull attrib="Edplus · ASU">
            A 4-hour manual task, reduced to 15 minutes. 60,000 students, quietly downstream.
          </Pull>

          <p>
            Before that, a summer at ASU&rsquo;s <em>Knowledge Exchange for Resilience</em> taught him that
            vector search is mostly a plumbing problem.<Note n={3}>
              Data Research Intern, Summer 2024. FAISS + Neo4j stack delivering 60% faster queries at 95%
              accuracy over 10,000+ faculty profiles per day.
            </Note> FAISS, FastAPI, a PostgreSQL cache, and a lot of profiling — 60% lower query latency while
            holding 95% accuracy, not by inventing new algorithms but by taking existing ones seriously.
          </p>

          <Figure n={1} caption="Retrieval latency vs. accuracy across iterations of the KER vector search rewrite. Each point is one shipped build.">
            <svg viewBox="0 0 300 140" className="w-full">
              <line x1="20" y1="120" x2="290" y2="120" stroke="#1c1a14" strokeWidth="0.7"/>
              <line x1="20" y1="120" x2="20" y2="10" stroke="#1c1a14" strokeWidth="0.7"/>
              <text x="20" y="134" fontSize="8" fontFamily="monospace">latency →</text>
              <text x="2" y="12" fontSize="8" fontFamily="monospace">acc.</text>
              {[[40,100,"v1"],[80,88,"v2"],[130,72,"v3"],[190,50,"v4"],[250,30,"v5"]].map(([x,y,l], i) => (
                <g key={i}>
                  <circle cx={x as number} cy={y as number} r="4" fill="#a63a1f"/>
                  <text x={(x as number) + 7} y={(y as number) + 3} fontSize="9" fontFamily="monospace">{l as string}</text>
                </g>
              ))}
              <polyline points="40,100 80,88 130,72 190,50 250,30" fill="none" stroke="#1c1a14" strokeWidth="0.5" strokeDasharray="2 2"/>
            </svg>
          </Figure>

          <p>
            Further back, in a prior life in Mumbai, he spent eighteen months at <em>Zeus Learning</em>
            <Note n={4}>
              Software Engineer, Jan 2022 – Jul 2023. Led a refactor of legacy .NET services into containerized
              microservices on Kubernetes for a Fortune-500 client.
            </Note> taking a legacy .NET monolith apart and putting it back together as microservices on
            Kubernetes. The numbers the business cared about — 35% less resource use, 20% lower infrastructure
            bill, 70% faster deployments — are the kind of numbers that don&rsquo;t make a demo reel but keep a
            product alive.
          </p>

          <Pull attrib="On working in legacy code">
            Refactoring a monolith is mostly an exercise in reading carefully. The typing is the easy part.
          </Pull>

          <p>
            A shorter tour at <em>EAT.FIT</em> in Bengaluru<Note n={5}>
              Product Intern, Sep – Dec 2021. Rewrote a driver-location tracking system cutting costs by 45%
              with 25% QoQ user growth.
            </Note> came before all of that: realtime tracking for a food-delivery arm, a WebSocket
            notification service, the kinds of small wins an intern is allowed to ship.
          </p>

          <p>
            Today, as an AI/ML engineer at <em>MyStage Music</em>, he is back at the intersection he prefers:
            retrieval, scraping, pipelines, and — increasingly — agents. The tools have changed (Gemini Vertex
            AI, Playwright, Algolia) but the posture has not.
          </p>

          <Figure n={2} caption="Trajectory, 2021–present. Size is tenure; color is discipline.">
            <svg viewBox="0 0 300 90" className="w-full">
              <line x1="10" y1="60" x2="290" y2="60" stroke="#1c1a14" strokeWidth="0.4" strokeDasharray="2 2"/>
              {[
                { x: 20, r: 7, label: "EAT.FIT",  sub: "2021", fill: "#a63a1f" },
                { x: 80, r: 14, label: "Zeus",    sub: "2022", fill: "#1c1a14" },
                { x: 160, r: 15, label: "Edplus", sub: "2023", fill: "#a63a1f" },
                { x: 210, r: 8, label: "KER",     sub: "2024", fill: "#a63a1f" },
                { x: 265, r: 10, label: "MyStage", sub: "2025", fill: "#a63a1f" },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={60} r={p.r} fill={p.fill} opacity="0.85"/>
                  <text x={p.x} y={35} textAnchor="middle" fontSize="7" fontFamily="monospace">{p.label}</text>
                  <text x={p.x} y={85} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#555">{p.sub}</text>
                </g>
              ))}
            </svg>
          </Figure>

          <p>
            Alongside the day jobs sit side-projects with a different tempo. A <em>reverse-mode automatic
            differentiation</em> library, written in Python with hand-rolled CUDA kernels, is the one he is most
            grateful for: it forced him to understand what every deep-learning framework quietly hides. An
            image-recognition SaaS, built on AWS EC2, SQS and Lambda, served 100 concurrent requests in 5
            seconds on its best day. A soccer-prediction model using LSTMs and XGBoost pulled +12% accuracy by
            layering in sentiment and betting-market data.
          </p>

          <p>
            Two podium finishes &mdash; at the <em>Orion Space Hackathon</em> and the <em>SpaceCode
            Hackathon</em><Note n={6}>
              Orion Space Hackathon 2025 · 3rd Place for a Light Pollution Explorer. SpaceCode Hackathon · 3rd
              Place for an AI-powered pulsar detection pipeline.
            </Note> &mdash; are perhaps the truest giveaway of what he likes: problems where the science is as
            interesting as the code. A light-pollution explorer that shows the night sky without us. A pulsar
            classifier trained on radio-telescope signal.
          </p>

          <p className="italic">
            What follows is an appendix of positions, artifacts, and addresses, presented in the style of a
            publication of record. The author can be reached, as always, at the foot of this page.
          </p>
        </article>

        {/* ——— appendix: positions ——— */}
        <section className="mt-20 border-t-[3px] border-double border-[#1c1a14] pt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl" style={display}>Appendix A — Positions held</h3>
            <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-600" style={mono}>p. 04</span>
          </div>
          <dl className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              ["Jul 2025 — ", "AI/ML Engineer · MyStage Music Inc.", "GCP · FastAPI · Playwright · Gemini Vertex AI"],
              ["Sep 2023 — May 2025", "Student SWE · ASU Edplus", "RAG · Neo4j · LangChain · OpenAI"],
              ["Jun — Aug 2024", "Data Research · ASU KER", "FAISS · FastAPI · Postgres · Neo4j"],
              ["Jan 2022 — Jul 2023", "Software Engineer · Zeus Learning, Mumbai", ".NET · C# · Kubernetes · AWS"],
              ["Sep — Dec 2021", "Product Intern · EAT.FIT, Bengaluru", "React · Node · Google Maps"],
            ].map(([yr, where, stack]) => (
              <div key={where} className="break-inside-avoid">
                <dt className="text-[11px] tracking-[0.25em] uppercase text-neutral-600" style={mono}>{yr}</dt>
                <dd className="mt-1 text-xl" style={display}>{where}</dd>
                <dd className="text-[12px] text-neutral-600 mt-1" style={mono}>{stack}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ——— appendix: selected works ——— */}
        <section className="mt-14 border-t-[3px] border-double border-[#1c1a14] pt-8">
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl" style={display}>Appendix B — Selected works</h3>
            <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-600" style={mono}>p. 05</span>
          </div>
          <ul className="mt-4 divide-y divide-neutral-400">
            {[
              ["01", "Reverse-Mode Automatic Differentiation", "Python · CUDA", "2024"],
              ["02", "Image Recognition as a Service", "AWS · SaaS", "2024"],
              ["03", "Soccer Result Prediction", "LSTM · XGBoost", "2023"],
              ["04", "FitLife Health Tracker", "Android · ML", "2023"],
              ["05", "E-Commerce Platform", "React · Django · Stripe", "2024"],
              ["06", "Real-Time Chat", "Django Channels · Redis", "2024"],
            ].map(([n, t, k, y]) => (
              <li key={n} className="py-3 grid grid-cols-12 items-baseline gap-4 text-[15px]">
                <span className="col-span-1 text-[11px] text-neutral-600" style={mono}>{n}</span>
                <span className="col-span-6 md:col-span-7 text-xl" style={display}>{t}</span>
                <span className="col-span-3 md:col-span-2 text-[11px] text-neutral-600" style={mono}>{k}</span>
                <span className="col-span-2 text-right text-[11px] text-neutral-600" style={mono}>{y}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ——— corrigendum / sign-off ——— */}
        <section className="mt-14 border-t-[3px] border-double border-[#1c1a14] pt-8 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl mb-2" style={display}>Corrigendum</h3>
            <p className="text-[14px] text-neutral-700">
              The author welcomes corrections, disagreements, and collaboration proposals. All inquiries are
              read; most are answered within a day.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2" style={display}>Subscriptions</h3>
            <p className="text-[14px] text-neutral-700">
              This is the only issue. Further work is distributed through <a href="#" className="underline underline-offset-4">GitHub</a>,
              <a href="#" className="underline underline-offset-4"> LinkedIn</a>, and private correspondence.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2" style={display}>Masthead</h3>
            <p className="text-[12px] text-neutral-700" style={mono}>
              Editor-in-Chief · Archit Agrawal<br/>
              Correspondence · admin@mysta.ge<br/>
              Set in Instrument Serif &amp; Crimson Pro<br/>
              Printed digitally, April MMXXVI
            </p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <a href="mailto:admin@mysta.ge" className="text-7xl md:text-9xl leading-none tracking-[-0.02em] hover:italic transition-all" style={display}>
            — fin —
          </a>
        </div>

        <div className="mt-10 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-neutral-600 border-t border-neutral-400 pt-3" style={mono}>
          <span>Agrawal · No. 01 · April MMXXVI</span>
          <span>Page 06 of 06</span>
          <span>© MMXXVI, all wrongs reversed</span>
        </div>
      </div>
    </main>
  );
}
