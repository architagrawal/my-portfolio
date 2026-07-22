"use client";

import { motion } from "framer-motion";
import { TimelineNode } from "@/components/ui/timeline-node";
import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionHeading } from "@/components/ui/section-heading";

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
    role: "Founding AI/ML Engineer",
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
    company: "Arizona State University",
    role: "Student Researcher",
    location: "Tempe, AZ",
    period: "August 2024 – May 2025",
    achievements: [
      {
        text: "Project 1 — Probed temporal and logical reasoning capabilities of text-conditioned video generation models; designed evaluation prompts isolating cause-effect ordering and counterfactual scene logic.",
        relatedTechs: ["Python", "PyTorch", "Diffusers"],
      },
      {
        text: "Project 2 — Quantified physical-law adherence of rigid-body motion in GenAI video outputs (gravity, momentum, collision); built scoring rubric scoring real-world plausibility per frame sequence.",
        relatedTechs: ["Python", "PyTorch", "Computer Vision"],
      },
    ],
    technologies: ["Python", "PyTorch", "Diffusers", "Computer Vision", "Video Generation"],
    color: "purple",
  },
  {
    company: "Edplus, Arizona State University",
    role: "IDA",
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
    role: "Data Research Aide",
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
      {
        text: "Delivered 20+ production REST APIs for NSF-funded Knowledge Alliance tool using .NET 8 + Dapper + MediatR clean architecture, secured with JWT and queued via AWS SQS.",
        relatedTechs: [".NET 8", "C#", "Dapper", "MediatR", "JWT", "AWS SQS"],
      },
      {
        text: "Cut API latency 198ms → 20ms (≈90%) via Redis caching layer + complex SQL query rewrites, holding sub-second responses under simulated peak load.",
        relatedTechs: ["Redis", "SQL", ".NET 8"],
      },
      {
        text: "Built bigram/n-gram ranking model over cleaned faculty profile text — 15% lift in search relevance over baseline.",
        relatedTechs: ["Python", "Deep Learning"],
      },
    ],
    technologies: [
      "Python",
      "PostgreSQL",
      "Pandas",
      "FAISS",
      "FastAPI",
      ".NET 8",
      "Dapper",
      "MediatR",
      "AWS SQS",
      "Redis",
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
        text: "Shipped a Redis-backed ML demand-prediction service for desk/room reservations across 300+ Fortune 500 sites (incl. Goldman Sachs, Merck), lifting occupancy by 30% amid COVID-era hot-desk constraints.",
        relatedTechs: [".NET", "C#", "Redis", "React", "Node.js"],
      },
      {
        text: "Optimized Angular student-listing screen with paginated fetching and AWS S3-backed asset delivery — 30% faster screen load; streamlined MySQL queries on class-details page for additional 10% latency reduction.",
        relatedTechs: ["Angular", "JavaScript", "AWS S3", "MySQL"],
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
  {
    company: "Dhirubhai Ambani Institute of Information and Communication Technology",
    role: "Computer Vision Researcher",
    location: "Gandhinagar, India",
    period: "May 2021 – August 2021",
    achievements: [
      {
        text: "Explored AI/ML for self-driving cars with focus on sensor data — capture, recording, processing, and downstream use for vehicle guidance.",
        relatedTechs: ["Python", "Computer Vision"],
      },
      {
        text: "Studied radar + Lidar data acquisition pipelines, vehicle-to-vehicle (p2p) communication, and HD-map localization techniques.",
        relatedTechs: ["Python", "Lidar", "Computer Vision"],
      },
    ],
    technologies: ["Python", "Computer Vision", "Lidar", "Radar"],
    color: "teal",
  },
];

export default function Experience() {

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-card/40">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading eyebrow="02 // Journey" title="Experience" />

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

