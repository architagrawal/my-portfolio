"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Activity } from "lucide-react";

const sans = { fontFamily: "'Inter', system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };

type Metric = {
  value: number; suffix?: string; prefix?: string; label: string;
  project: string; sub: string; delta: string;
};

const metrics: Metric[] = [
  { value: 60000, suffix: "+", label: "Students reached", project: "RAG chatbot @ ASU Edplus", sub: "Faculty-authored courses across ASU Online.", delta: "+∞" },
  { value: 1000,  suffix: "+", label: "Faculty users",    project: "RAG chatbot @ ASU Edplus", sub: "Designing curricula through a retrieval-augmented pipeline.", delta: "+1k" },
  { value: 4,     suffix: "h→15m", label: "Transcript processing", project: "Neo4j + LLM knowledge graph", sub: "Manual 4h process reduced to 15 minutes per document.", delta: "−94%" },
  { value: 60,    suffix: "%",  label: "Faster vector queries", project: "FAISS + Neo4j @ ASU KER", sub: "Maintained 95% retrieval accuracy at scale.", delta: "+60%" },
  { value: 95,    suffix: "%",  label: "Retrieval accuracy",  project: "FAISS + Neo4j @ ASU KER", sub: "10,000+ faculty profiles indexed daily.", delta: "+95%" },
  { value: 35,    suffix: "%",  label: "Resource reduction", project: ".NET microservices @ Zeus Learning", sub: "Monolith → Kubernetes microservices refactor.", delta: "−35%" },
  { value: 20,    suffix: "%",  label: "Cost reduction",     project: ".NET microservices @ Zeus Learning", sub: "Fortune-500 client infrastructure optimization.", delta: "−20%" },
  { value: 70,    suffix: "%",  label: "Faster deploys",     project: "CI/CD @ Zeus Learning", sub: "Pipelines with SonarQube quality gates.", delta: "−70%" },
  { value: 45,    suffix: "%",  label: "Cost reduction",     project: "Driver tracking @ EAT.FIT", sub: "Optimized order-tracking + geolocation.", delta: "−45%" },
  { value: 25,    suffix: "%",  label: "QoQ user growth",    project: "Driver tracking @ EAT.FIT", sub: "Realtime WebSocket notifications.", delta: "+25%" },
  { value: 100,   suffix: "/5s", label: "Concurrent requests", project: "Image Rec SaaS", sub: "Elastic AWS (EC2 + SQS + Lambda).", delta: "+100" },
  { value: 12,    suffix: "%",  label: "Prediction accuracy", project: "Soccer prediction model", sub: "LSTM + XGBoost + sentiment.", delta: "+12%" },
];

function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const dur = 1400, start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  const formatted = to >= 1000 ? v.toLocaleString() : String(v);
  return <>{prefix}{formatted}{suffix}</>;
}

function Ticker() {
  const items = [
    "ASU Edplus +60,000 students",
    "Neo4j KG 4h→15min",
    "FAISS −60% latency",
    "Zeus −35% resources",
    "Zeus −20% cost",
    "EAT.FIT −45% cost",
    "Soccer ML +12% acc",
    "Image Rec 100/5s",
    "Orion Hackathon · 3rd",
    "SpaceCode Hackathon · 3rd",
  ];
  return (
    <div className="overflow-hidden border-y border-neutral-300 bg-white">
      <div className="flex gap-8 animate-[marquee_40s_linear_infinite] whitespace-nowrap py-2 text-xs" style={mono}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-neutral-700">{t}</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      `}</style>
    </div>
  );
}

export default function Ledger() {
  const [active, setActive] = useState<Metric>(metrics[0]);
  const [t] = useState(() => new Date());

  return (
    <main className="min-h-screen bg-[#f4f3ec] text-[#111]" style={sans}>
      {/* header */}
      <header className="px-6 md:px-10 pt-5 pb-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>Impact Ledger · Archit Agrawal</div>
          <div className="text-xl font-semibold tracking-tight mt-1">AGRAWAL · A</div>
        </div>
        <div className="flex items-center gap-4 text-xs" style={mono}>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>MARKET OPEN</span>
          </div>
          <div className="text-neutral-500">{t.toUTCString().slice(17, 25)} UTC</div>
        </div>
      </header>
      <Ticker />

      {/* hero cover */}
      <section className="px-6 md:px-10 pt-10 pb-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-500" style={mono}>Q3 2025 — outcomes, not titles</p>
            <h1 className="mt-3 text-[11vw] md:text-[7vw] leading-[0.92] tracking-[-0.02em]" style={serif}>
              The numbers that <span className="italic">actually</span> shipped.
            </h1>
            <p className="mt-6 max-w-lg text-neutral-700 leading-relaxed">
              I&rsquo;m an AI/ML engineer. Instead of a timeline, here are the metrics I&rsquo;ve moved —
              each one links back to the project and team that did the work.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 border border-neutral-300 bg-white p-5">
            <div className="text-[10px] tracking-widest uppercase text-neutral-500" style={mono}>Portfolio Summary</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-2xl font-semibold tabular-nums">5</div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-500" style={mono}>roles</div>
              </div>
              <div>
                <div className="text-2xl font-semibold tabular-nums">7</div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-500" style={mono}>projects</div>
              </div>
              <div>
                <div className="text-2xl font-semibold tabular-nums">4</div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-500" style={mono}>awards</div>
              </div>
              <div>
                <div className="text-2xl font-semibold tabular-nums text-emerald-600">+12</div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-500" style={mono}>metrics moved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* main grid */}
      <section className="px-6 md:px-10 grid grid-cols-12 gap-6 pb-16">
        {/* metrics grid */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-neutral-500 mb-2 px-2" style={mono}>
            <span>Metric</span>
            <span>Value · Δ</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-neutral-300 border border-neutral-300">
            {metrics.map((m, i) => {
              const up = m.delta.startsWith("+");
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(m)}
                  onMouseEnter={() => setActive(m)}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`text-left p-4 bg-white hover:bg-[#fafaf2] transition ${active === m ? "ring-2 ring-black ring-inset" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 max-w-[70%]" style={mono}>
                      {m.label}
                    </div>
                    <span className={`text-[10px] ${up ? "text-emerald-600" : "text-rose-600"}`} style={mono}>
                      {m.delta}
                    </span>
                  </div>
                  <div className="mt-3 text-3xl md:text-4xl font-semibold tabular-nums tracking-tight">
                    <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <div className="mt-3 text-[11px] text-neutral-500 truncate" style={mono}>
                    → {m.project}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* detail pane */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 bg-white border border-neutral-300 p-6">
            <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-neutral-500" style={mono}>
              <Activity className="w-3 h-3" /> Position · detail
            </div>
            <div className="mt-5 text-[11px] uppercase tracking-widest text-neutral-500" style={mono}>{active.label}</div>
            <motion.div key={active.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-6xl font-semibold tabular-nums tracking-tight">
              <CountUp to={active.value} prefix={active.prefix} suffix={active.suffix} />
            </motion.div>
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${active.delta.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`} style={mono}>
              {active.delta.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
              {active.delta} vs baseline
            </div>
            <div className="mt-6 text-sm font-semibold tracking-tight">{active.project}</div>
            <p className="mt-2 text-[13px] text-neutral-700 leading-relaxed">{active.sub}</p>

            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="text-[10px] tracking-widest uppercase text-neutral-500 mb-2" style={mono}>Holdings</div>
              <ul className="space-y-1.5 text-[12px]" style={mono}>
                <li className="flex justify-between"><span>Python</span><span className="text-neutral-500">core</span></li>
                <li className="flex justify-between"><span>Neo4j</span><span className="text-neutral-500">signature</span></li>
                <li className="flex justify-between"><span>FAISS</span><span className="text-neutral-500">signature</span></li>
                <li className="flex justify-between"><span>LangChain</span><span className="text-neutral-500">heavy</span></li>
                <li className="flex justify-between"><span>AWS · GCP</span><span className="text-neutral-500">production</span></li>
                <li className="flex justify-between"><span>.NET · Kubernetes</span><span className="text-neutral-500">legacy depth</span></li>
              </ul>
            </div>

            <a href="mailto:admin@mysta.ge" className="mt-8 inline-flex items-center gap-2 text-sm border-b border-black pb-0.5 hover:gap-3 transition-all">
              Open a position — say hello <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </aside>
      </section>

      <footer className="border-t border-neutral-300 px-6 md:px-10 py-5 flex justify-between text-[10px] tracking-widest uppercase text-neutral-500" style={mono}>
        <span>© 2026 · Archit Agrawal · MSCS Arizona State University</span>
        <span>Disclosures: metrics self-reported, citations available on request.</span>
      </footer>
    </main>
  );
}
