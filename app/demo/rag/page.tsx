"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Database, Network, ArrowUp, FileText, Briefcase, Trophy, Cpu } from "lucide-react";

const sans = { fontFamily: "'Inter', system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };

// ——— real "knowledge base" ———
type Doc = { id: string; kind: "experience" | "project" | "achievement"; title: string; meta: string; snippet: string; score: number };

const KB: Record<string, Doc> = {
  "exp-mystage": { id: "exp-mystage", kind: "experience", title: "MyStage Music Inc · AI/ML Engineer", meta: "Remote · Jul 2025 – Present", snippet: "RESTful APIs on GCP, Playwright scraping with proxy rotation on Compute Engine, Algolia + Firestore dedup pipelines with Gemini Vertex AI.", score: 0 },
  "exp-edplus": { id: "exp-edplus", kind: "experience", title: "Edplus @ ASU · Student SWE", meta: "Tempe · Sep 2023 – May 2025", snippet: "Led a RAG chatbot for 1,000+ faculty designing courses for 60,000+ students. Built a Neo4j + LLM knowledge graph that cut transcript processing from 4 hours → 15 minutes.", score: 0 },
  "exp-ker": { id: "exp-ker", kind: "experience", title: "Knowledge Exchange for Resilience · Data Research Intern", meta: "ASU · Jun – Aug 2024", snippet: "FAISS + Neo4j vector similarity search: 60% lower query latency at 95% accuracy. FastAPI microservice for faculty embeddings, ETL over 10k+ profiles daily.", score: 0 },
  "exp-zeus": { id: "exp-zeus", kind: "experience", title: "Zeus Learning · Software Engineer", meta: "Mumbai · Jan 2022 – Jul 2023", snippet: "Refactored a monolith into .NET microservices on Kubernetes — 35% less resource use, 20% cost reduction. CI/CD cut deploy time by 70%.", score: 0 },
  "exp-eatfit": { id: "exp-eatfit", kind: "experience", title: "EAT.FIT · Product Intern", meta: "Bengaluru · Sep – Dec 2021", snippet: "Order-tracking system for driver location — 45% cost reduction, 25% QoQ growth. Realtime notifications with WebSockets + Express.", score: 0 },
  "proj-imgrec": { id: "proj-imgrec", kind: "project", title: "Image Recognition as a Service", meta: "AWS EC2/SQS/Lambda · 2024", snippet: "Elastic SaaS serving 100 concurrent requests in 5 seconds with linear auto-scaling.", score: 0 },
  "proj-soccer": { id: "proj-soccer", kind: "project", title: "Soccer Game Result Prediction", meta: "LSTM + RNN + XGBoost · 2023", snippet: "Improved prediction accuracy by 12% using sentiment analysis over historical + betting data.", score: 0 },
  "proj-autodiff": { id: "proj-autodiff", kind: "project", title: "Reverse-Mode Automatic Differentiation", meta: "Python + CUDA · 2024", snippet: "Built operators (Add, MatMul) for gradient graphs. Wrote CUDA kernels to train MLPs end-to-end.", score: 0 },
  "proj-fitlife": { id: "proj-fitlife", kind: "project", title: "FitLife Health Tracking App", meta: "Android + MATLAB · 2023", snippet: "Android app measuring heart/breath rate with camera; ML + fuzzy logic for workout suggestions.", score: 0 },
  "proj-ecom": { id: "proj-ecom", kind: "project", title: "E-Commerce Platform", meta: "React + Django + Postgres · 2024", snippet: "Full-featured shop with Stripe, Redis caching, containerized on GCP with GitHub Actions CI.", score: 0 },
  "proj-chat": { id: "proj-chat", kind: "project", title: "Real-Time Chat Application", meta: "Django Channels + Redis · 2024", snippet: "WebSocket chat with geolocation and Plotly visualizations of active users.", score: 0 },
  "ach-orion": { id: "ach-orion", kind: "achievement", title: "Orion Space Hackathon 2025 · 3rd Place", meta: "Light Pollution Explorer", snippet: "Built a geospatial tool visualizing light pollution globally.", score: 0 },
  "ach-pulsar": { id: "ach-pulsar", kind: "achievement", title: "SpaceCode Hackathon · 3rd Place", meta: "AI-Powered Pulsar Detection", snippet: "ML pipeline to classify pulsar signals from radio telescope data.", score: 0 },
};

// ——— pre-scripted queries with retrieval + answer (realistic RAG output) ———
type Answer = { query: string; cites: string[]; paragraphs: (string | { cite: number; text: string })[] };

const ANSWERS: Answer[] = [
  {
    query: "What's your signature work in RAG and knowledge graphs?",
    cites: ["exp-edplus", "exp-ker"],
    paragraphs: [
      "My flagship project is a ",
      { cite: 1, text: "Retrieval-Augmented Generation chatbot at ASU Edplus" },
      " that helps 1,000+ faculty design courses for 60,000+ students. To make it actually usable at scale, I architected a Neo4j-backed knowledge graph layered with LLM calls — that system cut transcript processing from 4 hours down to 15 minutes per document.\n\n",
      "Before that, as a data research intern at ",
      { cite: 2, text: "ASU’s Knowledge Exchange for Resilience" },
      ", I built a FAISS + Neo4j vector similarity system: 60% lower query latency while maintaining 95% retrieval accuracy. That work is really where I learned to treat retrieval as a product, not an afterthought.",
    ],
  },
  {
    query: "Show me your impact with numbers.",
    cites: ["exp-edplus", "exp-ker", "exp-zeus", "exp-eatfit"],
    paragraphs: [
      "Measured impact I can point at:\n\n",
      "• ",
      { cite: 1, text: "RAG system serving 60,000+ students" },
      " through 1,000+ faculty users, reducing a 4-hour manual process to 15 minutes.\n",
      "• ",
      { cite: 2, text: "Vector search at 60% lower latency, 95% accuracy" },
      " over 10,000+ daily faculty profiles.\n",
      "• ",
      { cite: 3, text: "Refactored a monolith into .NET microservices on Kubernetes" },
      " — 35% less resource use, 20% cost reduction, 70% faster deploys.\n",
      "• ",
      { cite: 4, text: "Driver-location tracking that cut costs by 45%" },
      " and grew users 25% QoQ.",
    ],
  },
  {
    query: "Where have you worked?",
    cites: ["exp-mystage", "exp-edplus", "exp-ker", "exp-zeus", "exp-eatfit"],
    paragraphs: [
      "Five roles across India and the US, trending from full-stack into applied AI:\n\n",
      "Currently ",
      { cite: 1, text: "AI/ML Engineer at MyStage Music" },
      " — GCP, FastAPI, Playwright pipelines with Gemini Vertex AI. Before that, two ASU roles: ",
      { cite: 2, text: "Student SWE at Edplus" },
      " leading the RAG platform, and ",
      { cite: 3, text: "Data Research Intern at KER" },
      " on the vector search work.\n\nI started in India as a ",
      { cite: 4, text: "Software Engineer at Zeus Learning" },
      " (Mumbai) doing .NET/Kubernetes microservices for Fortune 500 clients, and before that as a ",
      { cite: 5, text: "Product Intern at EAT.FIT" },
      " (Bengaluru) shipping realtime systems.",
    ],
  },
  {
    query: "What have you built outside work?",
    cites: ["proj-autodiff", "proj-imgrec", "proj-soccer", "proj-fitlife"],
    paragraphs: [
      "A few that mattered:\n\n• ",
      { cite: 1, text: "Reverse-mode autodiff in Python + CUDA" },
      " — wrote the gradient operators and GPU kernels from scratch to train MLPs. The most I’ve ever learned about what frameworks hide from you.\n",
      "• ",
      { cite: 2, text: "Image Recognition as a Service on AWS" },
      " — elastic SaaS serving 100 concurrent requests in 5s.\n",
      "• ",
      { cite: 3, text: "Soccer prediction with LSTM + XGBoost" },
      " — +12% accuracy by folding in sentiment and betting-market signals.\n",
      "• ",
      { cite: 4, text: "FitLife Android app" },
      " measuring heart and breath rate from the camera, with fuzzy-logic workout suggestions.",
    ],
  },
  {
    query: "Tell me about the hackathons.",
    cites: ["ach-orion", "ach-pulsar"],
    paragraphs: [
      "I’m drawn to space problems. Two recent podium finishes:\n\n• ",
      { cite: 1, text: "Orion Space Hackathon 2025 — 3rd place" },
      " for a light-pollution explorer that lets people see what the night sky would look like without us.\n",
      "• ",
      { cite: 2, text: "SpaceCode Hackathon — 3rd place" },
      " for an AI pulsar-detection pipeline over radio-telescope data. Both are the kind of problems where the science is as interesting as the code.",
    ],
  },
];

const ICON: Record<Doc["kind"], any> = { experience: Briefcase, project: Cpu, achievement: Trophy };

function Typewriter({ text, speed = 12, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return <>{text.slice(0, i)}</>;
}

export default function RagPortfolio() {
  const [history, setHistory] = useState<Answer[]>([]);
  const [retrieving, setRetrieving] = useState<string[] | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history, retrieving]);

  function ask(a: Answer) {
    if (retrieving) return;
    setRetrieving(a.cites);
    setTimeout(() => {
      setHistory((h) => [...h, a]);
      setRetrieving(null);
    }, 1100);
  }

  const suggestions = ANSWERS.filter((a) => !history.find((h) => h.query === a.query));

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111]" style={sans}>
      {/* top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fafaf7]/80 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-sm">archit.rag</div>
              <div className="text-[10px] text-neutral-500" style={mono}>v1 · 5 experiences · 7 projects · 4 awards indexed</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500" style={mono}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">retriever online</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 md:gap-8 px-4 md:px-8">
        {/* main chat column */}
        <section className="col-span-12 lg:col-span-8 py-10 md:py-16">
          {history.length === 0 && (
            <div className="mb-10">
              <p className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">A conversational portfolio</p>
              <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]" style={serif}>
                Hi — I’m <span className="italic">Archit</span>.<br/>
                <span className="text-neutral-500">Ask me anything.</span>
              </h1>
              <p className="mt-6 max-w-xl text-neutral-600 leading-relaxed">
                This page is, fittingly, a retrieval-augmented system — the same pattern I build for a living.
                Pick a question and watch it retrieve from my real experience, projects, and awards before answering.
              </p>
              <div className="mt-4 text-xs flex items-center gap-2 text-neutral-500" style={mono}>
                <Database className="w-3.5 h-3.5" /> knowledge base: 13 documents
                <span className="mx-1">·</span>
                <Network className="w-3.5 h-3.5" /> Neo4j + FAISS (simulated)
              </div>
            </div>
          )}

          {/* conversation */}
          <div className="space-y-10">
            {history.map((a, i) => (
              <div key={i} className="space-y-4">
                {/* user question bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-white border border-neutral-200 rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm">
                    <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1" style={mono}>you</div>
                    <div className="text-[15px]">{a.query}</div>
                  </div>
                </div>

                {/* retrieval trace */}
                <div className="flex gap-2 items-center text-xs text-neutral-500" style={mono}>
                  <Search className="w-3.5 h-3.5" />
                  <span>retrieved</span>
                  {a.cites.map((c, j) => {
                    const d = KB[c];
                    const Icon = ICON[d.kind];
                    return (
                      <button
                        key={c}
                        onMouseEnter={() => setActive(c)}
                        onMouseLeave={() => setActive(null)}
                        className="flex items-center gap-1 px-2 py-1 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-700 hover:bg-indigo-100"
                      >
                        <Icon className="w-3 h-3" />[{j + 1}]
                      </button>
                    );
                  })}
                </div>

                {/* answer */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-white to-[#f2f1ea] border border-neutral-200 rounded-2xl rounded-tl-sm px-6 py-5 shadow-sm"
                >
                  <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-2 flex items-center gap-2" style={mono}>
                    <Sparkles className="w-3 h-3" /> archit.rag
                  </div>
                  <div className="text-[16px] leading-relaxed whitespace-pre-wrap">
                    {a.paragraphs.map((p, k) => typeof p === "string" ? (
                      <span key={k}>{p}</span>
                    ) : (
                      <button
                        key={k}
                        onMouseEnter={() => setActive(a.cites[p.cite - 1])}
                        onMouseLeave={() => setActive(null)}
                        className="inline bg-indigo-50 border-b-2 border-indigo-300 text-indigo-900 px-0.5 hover:bg-indigo-100"
                      >
                        {p.text}<sup className="text-indigo-500 ml-0.5" style={mono}>[{p.cite}]</sup>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}

            {/* live retrieval preview */}
            <AnimatePresence>
              {retrieving && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex gap-2 items-center text-xs text-neutral-500" style={mono}>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  <Typewriter text={`running k-NN over 13 docs · top ${retrieving.length} retrieved · composing answer...`} />
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={endRef} />
          </div>

          {/* suggestion chips */}
          {suggestions.length > 0 && (
            <div className="mt-12">
              <div className="text-xs tracking-widest uppercase text-neutral-500 mb-3" style={mono}>
                {history.length ? "ask another" : "try one"}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.query}
                    onClick={() => ask(s)}
                    disabled={!!retrieving}
                    className="group text-left px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-indigo-400 hover:shadow-sm transition disabled:opacity-50"
                  >
                    <div className="text-sm">{s.query}</div>
                    <div className="text-[10px] text-neutral-400 mt-1" style={mono}>→ retrieves {s.cites.length} doc{s.cites.length > 1 ? "s" : ""}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* mock input */}
          <div className="mt-12 flex items-center gap-2 bg-white border border-neutral-300 rounded-full px-5 py-3 shadow-sm">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              disabled
              placeholder="free-form input coming soon — pick a chip above"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-400"
            />
            <button disabled className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* knowledge base sidebar */}
        <aside className="col-span-12 lg:col-span-4 py-10 md:py-16 lg:border-l lg:pl-8 border-neutral-200">
          <div className="sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm tracking-widest uppercase font-semibold">Knowledge Base</h2>
            </div>
            <p className="text-xs text-neutral-500 mb-6" style={mono}>
              hover a citation to highlight its source doc.
            </p>

            {(["experience", "project", "achievement"] as const).map((kind) => (
              <div key={kind} className="mb-6">
                <div className="text-[10px] tracking-widest uppercase text-neutral-400 mb-2" style={mono}>
                  {kind}s
                </div>
                <ul className="space-y-2">
                  {Object.values(KB).filter((d) => d.kind === kind).map((d) => {
                    const Icon = ICON[d.kind];
                    const on = active === d.id;
                    return (
                      <li key={d.id}
                        className={`border rounded-lg p-3 transition ${on ? "border-indigo-400 bg-indigo-50 shadow-sm" : "border-neutral-200 bg-white"}`}>
                        <div className="flex items-start gap-2">
                          <Icon className={`w-3.5 h-3.5 mt-0.5 ${on ? "text-indigo-600" : "text-neutral-400"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold truncate">{d.title}</div>
                            <div className="text-[10px] text-neutral-500" style={mono}>{d.meta}</div>
                            {on && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                          className="mt-2 text-[11px] text-neutral-700 leading-snug">
                                {d.snippet}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="mt-10 pt-6 border-t border-neutral-200 text-xs text-neutral-500 space-y-1" style={mono}>
              <div>archit_agrawal@mysta.ge</div>
              <div>mscs · arizona state university</div>
              <div className="flex gap-3 mt-2">
                <a className="underline hover:text-indigo-600" href="#">linkedin</a>
                <a className="underline hover:text-indigo-600" href="#">github</a>
                <a className="underline hover:text-indigo-600" href="/Archit_Agrawal_Resume.pdf">résumé.pdf</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
