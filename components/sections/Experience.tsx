"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { TimelineNode } from "@/components/ui/timeline-node";
import { ExperienceCard } from "@/components/ui/experience-card";

interface Achievement {
  text: string;
  relatedTechs?: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: (string | Achievement)[];
  technologies: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "MyStage Music Inc",
    role: "AI/ML Engineer",
    location: "Remote",
    period: "July 2025 - Present",
    achievements: [
      {
        text: "Migrated a 14-Cloud-Function event pipeline into a unified LangGraph agent-worker on Cloud Run Jobs, collapsing six per-stage task types into one process-new-event-url graph composing sourcing → extraction → resolution → entity-source write → image fan-out sub-graphs.",
        relatedTechs: ["Python", "LangGraph", "GCP", "Cloud Run"],
      },
      {
        text: "Built reusable build_scraping_subgraph() factory compiled without a Firestore checkpointer so parent graphs compose it without nested-checkpoint conflicts; added route_entry bridge letting webhook-sourced scrapes skip URL-fetch and enter at extraction.",
        relatedTechs: ["Python", "LangGraph"],
      },
      {
        text: "Implemented interrupt()/resume pause-for-research contract: subgraph idempotently enqueues a domain-research task on missing domain_metadata/{tld}, calls interrupt(f\"domain_research:{tld}\"), resumes from checkpoint when external pipeline flips parent task to ready.",
        relatedTechs: ["Python", "LangGraph", "Google Firestore"],
      },
      {
        text: "Designed pure-function routing predicates (route_after_sourcing/extraction/resolution) over typed state for deterministic flow; used Send-based parallel image fan-out with per-Send error isolation via operator.add-reduced state field.",
        relatedTechs: ["Python", "LangGraph"],
      },
      {
        text: "Wrote atomic Firestore claim transactions with status == \"ready\" preconditions for multi-worker concurrency; used deterministic agent-task IDs with create() + AlreadyExists for true retry idempotency (set() would clobber in-flight tasks).",
        relatedTechs: ["Python", "Google Firestore"],
      },
      {
        text: "Architected resilient Playwright scraper with proxy rotation and exponential backoff on Compute Engine, indexing 70,000+ records/day across 650+ locations through anti-bot measures.",
        relatedTechs: ["Python", "Playwright", "GCP"],
      },
      {
        text: "Built Gemini Pro (Vertex AI) semantic entity-resolution and dedupe pass over raw event data, lifting downstream search dataset accuracy by 25%.",
        relatedTechs: ["Python", "Gemini Vertex AI", "Google Firestore", "Algolia"],
      },
      {
        text: "Shipped FastAPI + Cloud Functions REST endpoints fronting Algolia for sub-50ms search latency and Firestore for real-time sync.",
        relatedTechs: ["Python", "FastAPI", "GCP", "Algolia", "Google Firestore"],
      },
      {
        text: "Refactored a monolithic 1,600-LOC source-generic Cloud Run service into a callable subgraph inside packages/mystage-agents/scraping/ via git mv (history preserved), full import-path rewrite, and dep relocation — service deps trimmed 14 → 5.",
        relatedTechs: ["Python", "Cloud Run"],
      },
      {
        text: "Extended canonical Performance entity with next_reprocess_time / last_reprocess_time / reprocess_count; built Cloud Scheduler trigger emitting process-reprocess-event-data tasks and most-stale URL selection over entity_sources ordered by last_successful_scrape_time ASC.",
        relatedTechs: ["Python", "Google Firestore", "GCP"],
      },
      {
        text: "Wired Logfire distributed-trace context propagation: scheduler captures root ctx per URL into agent_tasks/{id}.ctx, runner attach_context() on claim and resume so worker spans nest under producer trace across pause/resume; added per-tick metric_counter instrumentation.",
        relatedTechs: ["Python", "Logfire"],
      },
      {
        text: "Wrote 200+ pytest unit + integration tests covering routing predicates, fetcher nodes, mocked Firestore claim transactions, idempotent enqueue under retry, HITL resume payloads, image fan-out isolation; pytest-asyncio auto mode with mock_async_db fixtures for Firestore-free runs.",
        relatedTechs: ["Python", "pytest"],
      },
    ],
    technologies: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Playwright",
      "GCP",
      "Cloud Run",
      "Gemini Vertex AI",
      "Logfire",
      "Algolia",
      "Google Firestore",
      "pytest",
      "asyncio",
    ],
    color: "purple",
  },
  {
    company: "Edplus, Arizona State University",
    role: "Student Software Developer",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    achievements: [
      {
        text: "Led design and delivery of a multi-tenant RAG chatbot orchestrated via LangChain + Semantic Kernel with Prompt Flow evaluation harness, serving 1,000+ faculty authoring courses for 60,000+ students.",
        relatedTechs: [
          "Python",
          "LangChain",
          "OpenAI",
          "Prompt Flow",
          "Semantic Kernel",
        ],
      },
      {
        text: "Engineered a Neo4j knowledge graph layered with LLM-driven Cypher synthesis, cutting transcript-to-insight loop from 4 hours to 15 minutes via deterministic graph traversal over noisy NL queries.",
        relatedTechs: ["Python", "Neo4j", "OpenAI", "LangChain"],
      },
      {
        text: "Designed REST APIs and SQL-backed admin surfaces powering quiz platforms and question banks across ASU Online; enforced schema-level invariants for assessment integrity.",
        relatedTechs: ["Python", "JavaScript", "SQL"],
      },
      {
        text: "Authored Google Apps Script automation generating Drive folder/doc hierarchies from Sheets metadata, eliminating manual course-provisioning toil.",
        relatedTechs: ["JavaScript", "Google Apps Script"],
      },
      {
        text: "Built responsive React + Material UI interfaces with measurable UX outcomes: +35% engagement, −20% bounce rate.",
        relatedTechs: ["JavaScript"],
      },
    ],
    technologies: [
      "Python",
      "LangChain",
      "OpenAI",
      "Prompt Flow",
      "Semantic Kernel",
      "Neo4j",
      "JavaScript",
      "Google Apps Script",
      "SQL",
      "Pandas",
    ],
    color: "blue",
  },
  {
    company: "Knowledge Exchange for Resilience, Arizona State University",
    role: "Data Research Intern",
    location: "Tempe, AZ",
    period: "June 2024 – August 2024",
    achievements: [
      {
        text: "Designed a FAISS + Neo4j hybrid retrieval layer (dense ANN over graph-anchored entities) delivering 60% lower p95 query latency at 95% recall.",
        relatedTechs: ["Python", "FAISS", "Neo4j"],
      },
      {
        text: "Built a FastAPI embedding microservice over Postgres/pgvector for faculty-profile similarity, surfacing collaborator recommendations at 85% top-k precision.",
        relatedTechs: ["Python", "FastAPI", "PostgreSQL"],
      },
      {
        text: "Architected an idempotent ETL pipeline ingesting 10,000+ faculty profiles/day with Pandas-based transforms and Postgres upserts; raised dataset accuracy to 95% via constraint-driven validation.",
        relatedTechs: ["Python", "Pandas", "PostgreSQL"],
      },
      {
        text: "Wrote pytest unit + Locust load suites against FastAPI endpoints, establishing throughput and latency SLOs prior to release.",
        relatedTechs: ["Python", "FastAPI", "Locust"],
      },
    ],
    technologies: [
      "Python",
      "PostgreSQL",
      "Pandas",
      "FAISS",
      "FastAPI",
      "Neo4j",
      "Docker",
      "Git",
      "REST APIs",
      "Locust",
    ],
    color: "teal",
  },
  {
    company: "Zeus Learning",
    role: "Software Engineer",
    location: "Mumbai, India",
    period: "Jan 2022 – July 2023",
    achievements: [
      {
        text: "Decomposed a .NET monolith into SOLID-aligned microservices on Kubernetes with bounded-context service boundaries, driving 35% lower resource footprint and 20% cost reduction across the fleet.",
        relatedTechs: [".NET", "C#", "Docker", "Kubernetes", "AWS"],
      },
      {
        text: "Hardened CI/CD with SonarQube quality gates and containerized release pipelines: −70% deploy time, −40% production incidents.",
        relatedTechs: ["Git", "Docker", "Kubernetes", "SonarQube"],
      },
      {
        text: "Shipped a Redis-backed ML demand-prediction service for desk/room reservations across 300+ Fortune 500 sites, lifting occupancy by 30%.",
        relatedTechs: [".NET", "C#", "Redis"],
      },
      {
        text: "Published an internal npm package wrapping the Slack Web API for paginated message + attachment + reaction retrieval, consumed by the company social platform with semver-disciplined releases.",
        relatedTechs: ["Node.js", "Git"],
      },
      {
        text: "Built React + Redux SPAs with normalized client-side state and typed REST integration, raising measured UX scores by 40%.",
        relatedTechs: ["Node.js"],
      },
    ],
    technologies: [
      ".NET",
      "C#",
      "MessageQueue",
      "Redis",
      "AWS",
      "Nginx",
      "Docker",
      "Kubernetes",
      "RabbitMQ",
      "Node.js",
      "SonarQube",
      "Git",
    ],
    color: "orange", // Changed to orange for backend/cloud vibe
  },
  {
    company: "EAT.FIT",
    role: "Product Intern",
    location: "Bengaluru, India",
    period: "Sept 2021 – Dec 2021",
    achievements: [
      {
        text: "Owned end-to-end order-tracking experience over Google Maps API with optimized driver geolocation polling, yielding 45% cost reduction and 25% QoQ user growth.",
        relatedTechs: ["React.js", "Google Maps API"],
      },
      {
        text: "Built a Python scraping toolchain harvesting product catalogs and reviews into the analytics warehouse, feeding pricing/positioning and CX workflows.",
        relatedTechs: ["Python"],
      },
      {
        text: "Delivered a full-stack WebSocket + Express.js notification service with backpressure-aware fan-out, raising CSAT by 28% and cutting support volume by 35%.",
        relatedTechs: ["React.js"],
      },
    ],
    technologies: ["React.js", "Google Maps API", "Python"],
    color: "blue",
  },
];

export default function Experience() {

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients - Removed for Editorial Theme */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs font-semibold uppercase tracking-widest hover:bg-primary/10 transition-colors">
            <Rocket className="w-3 h-3" />
            <span>Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/40 pb-2">
            Professional Odyssey
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Building innovative solutions and driving measurable impact across the digital universe.
          </p>
        </motion.div>

        <div className="relative pl-6 md:pl-12">

          <div className="space-y-16">
            {experiences.map((exp, expIndex) => (
              <div key={expIndex} className="relative pl-10 sm:pl-12 md:pl-16">
                
                {/* Timeline Star & Path */}
                <div className="absolute left-0 top-0 bottom-0 -ml-[5px] md:-ml-[9px] w-12 flex flex-col items-center pt-8">
                    <TimelineNode color={exp.color} isLast={expIndex === experiences.length - 1} />
                </div>

                <ExperienceCard exp={exp} expIndex={expIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

