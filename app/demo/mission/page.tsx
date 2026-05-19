"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Navigation, Radio, Award, ChevronRight } from "lucide-react";

const sans = { fontFamily: "'Space Grotesk', Inter, system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };

type Mission = {
  code: string; name: string; status: "active" | "completed";
  org: string; location: string; period: string; duration: string;
  coords: string; payload: string[]; objective: string; outcomes: string[];
};

const missions: Mission[] = [
  {
    code: "AA-05", name: "MYSTAGE", status: "active",
    org: "MyStage Music Inc.", location: "REMOTE", period: "Jul 2025 — present", duration: "ongoing",
    coords: "33.42°N · 111.93°W",
    payload: ["Python", "FastAPI", "Playwright", "GCP", "Gemini Vertex AI", "Algolia", "Firestore"],
    objective: "Build scalable data & retrieval infrastructure for a live-music discovery product.",
    outcomes: [
      "RESTful APIs for low-latency cloud integrations.",
      "Playwright scraping pipelines w/ proxy rotation on Compute Engine.",
      "Dedup pipelines with Algolia + Firestore, Gemini Vertex AI.",
    ],
  },
  {
    code: "AA-04", name: "EDPLUS", status: "completed",
    org: "ASU Edplus", location: "TEMPE · AZ", period: "Sep 2023 — May 2025", duration: "20 months",
    coords: "33.42°N · 111.94°W",
    payload: ["Python", "LangChain", "OpenAI", "Neo4j", "Prompt Flow", "Semantic Kernel", "React"],
    objective: "Ship a RAG course-design assistant for ASU Online faculty and students.",
    outcomes: [
      "RAG chatbot serving 1,000+ faculty and 60,000+ students.",
      "Neo4j + LLM knowledge graph: transcript processing 4h → 15min.",
      "REST APIs & quiz platforms; UI up-lift +35% engagement, −20% bounce.",
    ],
  },
  {
    code: "AA-03", name: "K.E.R.", status: "completed",
    org: "Knowledge Exchange for Resilience · ASU", location: "TEMPE · AZ", period: "Jun — Aug 2024", duration: "3 months",
    coords: "33.42°N · 111.94°W",
    payload: ["Python", "FAISS", "Neo4j", "FastAPI", "PostgreSQL", "Pandas", "Locust"],
    objective: "Production-grade vector search over the university’s faculty knowledge base.",
    outcomes: [
      "FAISS + Neo4j retrieval: −60% query latency at 95% accuracy.",
      "Embedding microservice for 10,000+ faculty profiles / day.",
      "Stress-tested APIs under Locust load.",
    ],
  },
  {
    code: "AA-02", name: "ZEUS", status: "completed",
    org: "Zeus Learning", location: "MUMBAI · IN", period: "Jan 2022 — Jul 2023", duration: "19 months",
    coords: "19.07°N · 72.87°E",
    payload: [".NET", "C#", "Kubernetes", "Docker", "AWS", "Redis", "RabbitMQ", "SonarQube"],
    objective: "Migrate legacy monolith to a resilient microservice platform for Fortune-500 client.",
    outcomes: [
      "MVC microservices refactor: −35% resource use, −20% cost.",
      "CI/CD pipelines: −70% deploy time, −40% prod incidents.",
      "ML space-reservation system across 300+ office locations: +30% occupancy.",
    ],
  },
  {
    code: "AA-01", name: "EATFIT", status: "completed",
    org: "EAT.FIT (cult.fit)", location: "BENGALURU · IN", period: "Sep — Dec 2021", duration: "4 months",
    coords: "12.97°N · 77.59°E",
    payload: ["React", "Node.js", "Express", "Google Maps API", "Python"],
    objective: "Optimize order-tracking and realtime ops for a food-delivery arm.",
    outcomes: [
      "Driver-tracking rewrite: −45% cost, +25% QoQ user growth.",
      "WebSocket notifications: +28% CSAT, −35% support calls.",
      "Automated scrapers for product & review analytics.",
    ],
  },
];

const awards = [
  { code: "HX-01", name: "Light Pollution Explorer", event: "Orion Space Hackathon 2025", place: "3RD" },
  { code: "HX-02", name: "AI Pulsar Detection",      event: "SpaceCode Hackathon",        place: "3RD" },
  { code: "HX-03", name: "Dealora Marketplace",      event: "KrackHack 2.0 · GDG",        place: "3RD" },
];

export default function MissionLog() {
  const [active, setActive] = useState<Mission>(missions[0]);

  return (
    <main className="min-h-screen bg-[#f5f3ea] text-[#1a1a1a]" style={sans}>
      {/* top telemetry strip */}
      <div className="border-b border-[#1a1a1a] bg-[#ecebe2] px-6 md:px-10 py-2 grid grid-cols-6 gap-4 text-[10px] tracking-[0.25em] uppercase" style={mono}>
        <div className="col-span-2">Mission Log · v1.0</div>
        <div><span className="text-neutral-500">OP </span>archit.agrawal</div>
        <div><span className="text-neutral-500">ROLE </span>ai/ml engineer</div>
        <div><span className="text-neutral-500">STATUS </span><span className="text-emerald-700">● ready</span></div>
        <div className="text-right"><span className="text-neutral-500">TS </span>2026.04.20</div>
      </div>

      {/* hero banner */}
      <section className="border-b-2 border-[#1a1a1a] px-6 md:px-10 pt-10 pb-14 relative">
        <div className="absolute top-10 right-10 hidden md:block">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="58" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
            <circle cx="60" cy="60" r="40" fill="none" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="2 2"/>
            <circle cx="60" cy="60" r="3" fill="#d84315"/>
            <text x="60" y="14" textAnchor="middle" fontSize="8" fontFamily="monospace" letterSpacing="2">N</text>
            <text x="60" y="114" textAnchor="middle" fontSize="8" fontFamily="monospace" letterSpacing="2">S</text>
            <line x1="60" y1="20" x2="60" y2="100" stroke="#1a1a1a" strokeWidth="0.3"/>
            <line x1="20" y1="60" x2="100" y2="60" stroke="#1a1a1a" strokeWidth="0.3"/>
          </svg>
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>Flight Recorder · Personal</p>
        <h1 className="mt-4 text-[13vw] md:text-[9vw] leading-[0.9] tracking-[-0.02em]" style={serif}>
          Five missions.<br/>
          <span className="italic">Two continents.</span><br/>
          One engineer.
        </h1>
        <p className="mt-6 max-w-xl text-neutral-700 leading-relaxed">
          A log of every tour I&rsquo;ve flown as an engineer — from early ops in Bengaluru to current AI/ML
          deployment at MyStage. Select a mission on the left to open its flight-card.
        </p>
      </section>

      {/* mission console */}
      <section className="grid grid-cols-12 border-b-2 border-[#1a1a1a]">
        {/* mission list */}
        <ul className="col-span-12 md:col-span-4 lg:col-span-3 border-r-2 border-[#1a1a1a] divide-y divide-[#1a1a1a]">
          <li className="px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-neutral-500 flex items-center gap-2" style={mono}>
            <Navigation className="w-3 h-3" /> Flight Manifest
          </li>
          {missions.map((m) => (
            <li key={m.code}>
              <button onClick={() => setActive(m)}
                className={`w-full text-left px-5 py-4 transition group ${active.code === m.code ? "bg-[#1a1a1a] text-[#f5f3ea]" : "hover:bg-[#ecebe2]"}`}>
                <div className="flex items-center justify-between text-[10px] tracking-widest" style={mono}>
                  <span>{m.code}</span>
                  <span className={m.status === "active" ? "text-emerald-500" : "text-neutral-500"}>
                    ● {m.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-1 text-xl font-semibold tracking-tight">{m.name}</div>
                <div className={`text-[11px] ${active.code === m.code ? "text-neutral-400" : "text-neutral-500"}`} style={mono}>
                  {m.location} · {m.duration}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* flight card */}
        <motion.div key={active.code}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="col-span-12 md:col-span-8 lg:col-span-9 p-6 md:p-10 relative">
          {/* corner marks */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#1a1a1a]" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#1a1a1a]" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#1a1a1a]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#1a1a1a]" />

          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase" style={mono}>
                <span className="bg-[#1a1a1a] text-[#f5f3ea] px-2 py-0.5">{active.code}</span>
                <span className={active.status === "active" ? "text-emerald-700" : "text-neutral-500"}>
                  ● {active.status}
                </span>
                <span className="text-neutral-500">CLASSIFIED · INTERNAL</span>
              </div>
              <h2 className="mt-3 text-6xl md:text-7xl tracking-[-0.02em] leading-[0.95]" style={serif}>
                {active.name}
              </h2>
              <div className="mt-1 text-neutral-600">{active.org}</div>
            </div>
            <Rocket className="w-10 h-10 text-[#d84315]" />
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border-y-2 border-[#1a1a1a]">
            {[
              ["LOCATION", active.location],
              ["PERIOD", active.period],
              ["DURATION", active.duration],
              ["COORDS", active.coords],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#f5f3ea] p-4">
                <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-500" style={mono}>{k}</div>
                <div className="mt-1 text-sm font-medium" style={mono}>{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 flex items-center gap-2" style={mono}>
                <Radio className="w-3 h-3" /> Mission Objective
              </div>
              <p className="mt-2 text-2xl leading-snug" style={serif}>
                {active.objective}
              </p>

              <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>Flight Notes</div>
              <ul className="mt-3 space-y-2">
                {active.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-neutral-800 leading-relaxed">
                    <span className="text-[#d84315] mt-1" style={mono}>▸</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>Payload · stack</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.payload.map((p) => (
                  <span key={p} className="px-2.5 py-1 border border-[#1a1a1a] text-xs" style={mono}>{p}</span>
                ))}
              </div>

              <div className="mt-8 bg-[#ecebe2] border border-[#1a1a1a] p-4 relative">
                <div className="absolute -top-2 left-3 bg-[#f5f3ea] px-2 text-[9px] tracking-[0.3em] uppercase text-neutral-600" style={mono}>
                  Debrief
                </div>
                <p className="text-[13px] leading-relaxed text-neutral-700 mt-2">
                  {active.status === "active"
                    ? "Mission in progress. Debrief available upon request after rotation."
                    : "Mission complete. Full debrief, references, and artifacts available on request."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* commendations */}
      <section className="px-6 md:px-10 py-14 border-b-2 border-[#1a1a1a]">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>
          <Award className="w-3 h-3" /> Commendations
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {awards.map((a) => (
            <div key={a.code} className="bg-[#f5f3ea] p-6">
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>
                <span>{a.code}</span>
                <span className="px-2 py-0.5 bg-[#d84315] text-white">{a.place}</span>
              </div>
              <div className="mt-5 text-2xl tracking-tight leading-tight" style={serif}>{a.name}</div>
              <div className="mt-1 text-xs text-neutral-500" style={mono}>{a.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* sign-off */}
      <section className="px-6 md:px-10 py-16 flex flex-wrap justify-between items-end gap-6">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500" style={mono}>Ground Control</div>
          <a href="mailto:admin@mysta.ge" className="block mt-2 text-6xl md:text-8xl leading-none tracking-[-0.02em] hover:text-[#d84315] transition" style={serif}>
            Open comms →
          </a>
          <div className="mt-4 text-sm text-neutral-500 flex gap-4" style={mono}>
            <span>admin@mysta.ge</span>
            <span>·</span>
            <a href="#" className="hover:text-black">linkedin</a>
            <a href="#" className="hover:text-black">github</a>
          </div>
        </div>
        <div className="border border-[#1a1a1a] p-4 text-[11px] max-w-xs" style={mono}>
          <div className="tracking-[0.3em] uppercase text-neutral-500">Authorization</div>
          <div className="mt-1 leading-relaxed">
            Signed by Archit Agrawal<br/>
            MSCS · Arizona State University<br/>
            Issued 2026.04.20 · valid through next rotation
          </div>
        </div>
      </section>
    </main>
  );
}
