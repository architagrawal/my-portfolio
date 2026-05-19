"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Cpu, Trophy, User, X, ExternalLink } from "lucide-react";

const sans = { fontFamily: "'Inter', system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };

type NodeKind = "me" | "experience" | "project" | "skill" | "achievement";
type Node = {
  id: string; kind: NodeKind; label: string; sub?: string;
  x: number; y: number; r: number;
  detail?: { title: string; body: string; metrics?: string[]; date?: string };
};

const nodes: Node[] = [
  { id: "me", kind: "me", label: "Archit Agrawal", sub: "MSCS · ASU", x: 50, y: 50, r: 34 },

  // experiences (orbit 1)
  { id: "e-mystage", kind: "experience", label: "MyStage Music", sub: "AI/ML Eng", x: 50, y: 12, r: 20,
    detail: { title: "AI/ML Engineer · MyStage Music Inc", date: "Jul 2025 – Present",
      body: "RESTful APIs on GCP, Playwright scraping pipelines with proxy rotation, Algolia + Firestore dedup with Gemini Vertex AI.",
      metrics: ["Remote", "Python · FastAPI · GCP"] } },
  { id: "e-edplus", kind: "experience", label: "ASU Edplus", sub: "Student SWE", x: 85, y: 28, r: 22,
    detail: { title: "Student SWE · Edplus @ ASU", date: "Sep 2023 – May 2025",
      body: "Led a RAG chatbot for 1,000+ faculty designing courses for 60,000+ students. Neo4j + LLM knowledge graph cut transcript processing 4h → 15min.",
      metrics: ["60,000+ students", "1,000+ faculty", "4h → 15min"] } },
  { id: "e-ker", kind: "experience", label: "ASU · KER", sub: "Data Research", x: 88, y: 70, r: 20,
    detail: { title: "Data Research Intern · Knowledge Exchange for Resilience", date: "Jun – Aug 2024",
      body: "FAISS + Neo4j vector similarity search. FastAPI microservice for faculty embeddings; ETL over 10k+ profiles daily.",
      metrics: ["60% faster queries", "95% accuracy", "10k+ profiles/day"] } },
  { id: "e-zeus", kind: "experience", label: "Zeus Learning", sub: "SWE · Mumbai", x: 50, y: 88, r: 22,
    detail: { title: "Software Engineer · Zeus Learning", date: "Jan 2022 – Jul 2023",
      body: "Refactored a monolith into .NET microservices on Kubernetes for Fortune 500 clients. CI/CD hardening.",
      metrics: ["35% less resource use", "20% cost cut", "70% faster deploys"] } },
  { id: "e-eatfit", kind: "experience", label: "EAT.FIT", sub: "Product · BLR", x: 12, y: 70, r: 18,
    detail: { title: "Product Intern · EAT.FIT", date: "Sep – Dec 2021",
      body: "Driver-location tracking system, realtime notifications with WebSockets + Express.",
      metrics: ["45% cost reduction", "25% QoQ growth"] } },

  // projects (outer ring)
  { id: "p-autodiff", kind: "project", label: "Autodiff + CUDA", x: 15, y: 28, r: 15,
    detail: { title: "Reverse-Mode Automatic Differentiation", date: "2024",
      body: "Gradient operators (Add, MatMul) from scratch; CUDA kernels training MLPs end-to-end.",
      metrics: ["Python", "CUDA", "Neural Nets"] } },
  { id: "p-imgrec", kind: "project", label: "Image Rec SaaS", x: 28, y: 20, r: 14,
    detail: { title: "Image Recognition as a Service", date: "2024",
      body: "Elastic AWS SaaS with auto-scaling EC2/SQS/Lambda.",
      metrics: ["100 req in 5s", "AWS"] } },
  { id: "p-soccer", kind: "project", label: "Soccer Pred", x: 72, y: 20, r: 13,
    detail: { title: "Soccer Game Result Prediction", date: "2023",
      body: "LSTM + RNN + XGBoost, folding in sentiment + betting-market signals.",
      metrics: ["+12% accuracy"] } },
  { id: "p-fitlife", kind: "project", label: "FitLife", x: 78, y: 52, r: 13,
    detail: { title: "FitLife Health Tracker", date: "2023",
      body: "Android app measuring heart/breath rate; fuzzy-logic workout suggestions.",
      metrics: ["Android", "MATLAB", "ML"] } },
  { id: "p-chat", kind: "project", label: "Realtime Chat", x: 22, y: 52, r: 13,
    detail: { title: "Real-Time Chat Application", date: "2024",
      body: "Django Channels + Redis; Plotly maps of active users.",
      metrics: ["WebSockets", "Geolocation"] } },
  { id: "p-ecom", kind: "project", label: "E-Commerce", x: 35, y: 82, r: 13,
    detail: { title: "E-Commerce Platform", date: "2024",
      body: "React + Django + Postgres, Stripe payments, Redis cache, CI on GCP.",
      metrics: ["Stripe", "Full-stack"] } },

  // achievements
  { id: "a-orion", kind: "achievement", label: "Orion · 3rd", x: 65, y: 82, r: 12,
    detail: { title: "Orion Space Hackathon 2025 — 3rd Place", date: "2025",
      body: "Light Pollution Explorer — geospatial tool visualizing the night sky without us.",
      metrics: ["Hackathon", "Geospatial"] } },
  { id: "a-pulsar", kind: "achievement", label: "SpaceCode · 3rd", x: 8, y: 42, r: 12,
    detail: { title: "SpaceCode Hackathon — 3rd Place", date: "2024",
      body: "AI-powered pulsar detection over radio telescope signals.",
      metrics: ["Hackathon", "ML · Astronomy"] } },

  // skill cluster (floating around center)
  { id: "s-rag", kind: "skill", label: "RAG", x: 38, y: 38, r: 10 },
  { id: "s-neo4j", kind: "skill", label: "Neo4j", x: 62, y: 38, r: 10 },
  { id: "s-faiss", kind: "skill", label: "FAISS", x: 62, y: 62, r: 10 },
  { id: "s-langchain", kind: "skill", label: "LangChain", x: 38, y: 62, r: 10 },
];

// id -> id edges
const edges: [string, string][] = [
  ["me", "e-mystage"], ["me", "e-edplus"], ["me", "e-ker"], ["me", "e-zeus"], ["me", "e-eatfit"],
  ["me", "s-rag"], ["me", "s-neo4j"], ["me", "s-faiss"], ["me", "s-langchain"],
  ["e-edplus", "s-rag"], ["e-edplus", "s-neo4j"], ["e-edplus", "s-langchain"],
  ["e-ker", "s-faiss"], ["e-ker", "s-neo4j"],
  ["e-mystage", "s-langchain"],
  ["e-edplus", "p-chat"],
  ["e-ker", "p-imgrec"],
  ["e-zeus", "p-ecom"],
  ["e-mystage", "p-autodiff"],
  ["p-autodiff", "s-faiss"],
  ["p-soccer", "e-ker"],
  ["p-fitlife", "e-eatfit"],
  ["a-orion", "me"], ["a-pulsar", "me"],
  ["a-pulsar", "s-faiss"],
];

const COLOR: Record<NodeKind, { fill: string; ring: string; text: string }> = {
  me:          { fill: "#111",    ring: "#111",    text: "#fff" },
  experience:  { fill: "#eef2ff", ring: "#6366f1", text: "#1e1b4b" },
  project:     { fill: "#ecfeff", ring: "#0891b2", text: "#083344" },
  skill:       { fill: "#fff7ed", ring: "#ea580c", text: "#7c2d12" },
  achievement: { fill: "#fef3c7", ring: "#d97706", text: "#78350f" },
};

const ICON: Record<NodeKind, any> = { me: User, experience: Briefcase, project: Cpu, skill: Cpu, achievement: Trophy };

export default function GraphPortfolio() {
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState<Node | null>(null);
  const [filter, setFilter] = useState<NodeKind | "all">("all");

  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), []);

  const highlighted = useMemo(() => {
    if (!hover) return new Set<string>();
    const s = new Set<string>([hover]);
    for (const [a, b] of edges) {
      if (a === hover) s.add(b);
      if (b === hover) s.add(a);
    }
    return s;
  }, [hover]);

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#111] overflow-hidden" style={sans}>
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-500" style={mono}>Portfolio · Graph View</div>
          <div className="text-lg font-semibold tracking-tight mt-1">Archit Agrawal</div>
        </div>
        <div className="flex gap-1 bg-white border border-neutral-200 p-1 rounded-full text-xs" style={mono}>
          {(["all", "experience", "project", "skill", "achievement"] as const).map((k) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-widest transition ${
                filter === k ? "bg-black text-white" : "text-neutral-500 hover:text-black"
              }`}>
              {k}
            </button>
          ))}
        </div>
      </header>

      {/* hero overlay text */}
      <div className="absolute top-24 left-6 md:left-10 z-10 max-w-md pointer-events-none">
        <h1 className="text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]" style={serif}>
          My work, <span className="italic text-neutral-500">rendered</span> as a graph.
        </h1>
        <p className="mt-4 text-sm text-neutral-600 pointer-events-auto">
          I build knowledge graphs for a living — so here&rsquo;s mine. Hover a node to see its connections,
          click to open the detail. 5 roles, 7 projects, 4 skills, 2 hackathon podiums.
        </p>
      </div>

      {/* legend bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-10 z-10 flex flex-wrap gap-3 text-xs" style={mono}>
        {(["experience", "project", "skill", "achievement"] as const).map((k) => (
          <div key={k} className="flex items-center gap-1.5 bg-white/80 backdrop-blur border border-neutral-200 px-2.5 py-1 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full border-2" style={{ background: COLOR[k].fill, borderColor: COLOR[k].ring }} />
            <span className="uppercase tracking-widest text-neutral-600">{k}</span>
          </div>
        ))}
      </div>

      {/* the graph */}
      <svg viewBox="0 0 100 100" className="w-screen h-screen" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.3" cy="0.3" r="0.15" fill="#e5e4df" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* edges */}
        {edges.map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b];
          if (!na || !nb) return null;
          const dim = filter !== "all" && na.kind !== filter && nb.kind !== filter && na.id !== "me" && nb.id !== "me";
          const on = hover && (highlighted.has(a) && highlighted.has(b));
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={on ? "#111" : "#c7c6c0"}
              strokeWidth={on ? 0.35 : 0.15}
              opacity={dim ? 0.12 : (hover && !on ? 0.15 : 0.55)} />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const c = COLOR[n.kind];
          const dim = filter !== "all" && n.kind !== filter && n.id !== "me";
          const on = !hover || highlighted.has(n.id);
          return (
            <motion.g key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => n.detail && setActive(n)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: dim ? 0.2 : (on ? 1 : 0.35), scale: 1 }}
              transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
              style={{ cursor: n.detail ? "pointer" : "default" }}
              className="group"
            >
              {/* pulsing ring on hover */}
              {hover === n.id && (
                <motion.circle cx={n.x} cy={n.y} r={n.r / 10 + 1}
                  fill="none" stroke={c.ring} strokeWidth={0.2}
                  initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }} />
              )}
              <circle cx={n.x} cy={n.y} r={n.r / 10}
                fill={c.fill} stroke={c.ring} strokeWidth={hover === n.id ? 0.35 : 0.22} />
              <text x={n.x} y={n.y + n.r / 40 + 0.3}
                textAnchor="middle" fontSize={n.kind === "me" ? 1.4 : 1.1}
                fontWeight={n.kind === "me" ? 700 : 500}
                fill={c.text} style={{ pointerEvents: "none" }}>
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x} y={n.y + n.r / 40 + 1.8}
                  textAnchor="middle" fontSize={0.8} fill={c.text} opacity={0.6}
                  style={{ pointerEvents: "none" }}>
                  {n.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {/* detail drawer */}
      <AnimatePresence>
        {active && active.detail && (
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[420px] bg-white border-l border-neutral-200 shadow-2xl z-30 p-8 overflow-y-auto"
          >
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-neutral-100">
              <X className="w-4 h-4" />
            </button>
            <div className="text-xs tracking-[0.3em] uppercase text-neutral-500" style={mono}>
              {active.kind}
            </div>
            <h2 className="mt-2 text-3xl leading-tight" style={serif}>{active.detail.title}</h2>
            {active.detail.date && (
              <div className="mt-2 text-xs text-neutral-500" style={mono}>{active.detail.date}</div>
            )}
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">{active.detail.body}</p>
            {active.detail.metrics && (
              <div className="mt-6 flex flex-wrap gap-2">
                {active.detail.metrics.map((m) => (
                  <span key={m} className="px-3 py-1 text-xs border border-neutral-300 rounded-full" style={mono}>{m}</span>
                ))}
              </div>
            )}
            <div className="mt-10 text-xs text-neutral-500 flex items-center gap-2" style={mono}>
              <ExternalLink className="w-3 h-3" /> {edges.filter(([a, b]) => a === active.id || b === active.id).length} connections
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
