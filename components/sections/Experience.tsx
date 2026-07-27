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
  /** Indexes of achievements to surface first; the rest collapse into technical notes */
  featured?: number[];
  technologies: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "MyStage Music Inc",
    role: "Founding AI/ML Engineer",
    location: "Remote",
    period: "July 2025 - Present",
    featured: [0, 5, 6],
    achievements: [
      {
        text: "Replaced a 14-Cloud-Function event pipeline with a single LangGraph agent-worker on Cloud Run Jobs — sourcing, extraction, resolution, and image fan-out now run as one composable, checkpointed graph.",
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
        text: "Built and operate a Playwright scraping service on Compute Engine that indexes 70,000+ records a day from 650+ locations, rotating proxies and backing off when sites push back.",
        relatedTechs: ["Python", "Playwright", "GCP"],
      },
      {
        text: "Added Gemini-based entity resolution and dedupe before records reach Firestore and Algolia, lifting downstream search dataset accuracy by 25%.",
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
        text: "Designed evaluation prompts that isolate cause-and-effect ordering and counterfactual reasoning in text-conditioned video generation models.",
        relatedTechs: ["Python", "PyTorch", "Diffusers"],
      },
      {
        text: "Built a frame-sequence rubric measuring whether generated rigid-body motion obeys gravity, momentum, and collision behavior.",
        relatedTechs: ["Python", "PyTorch", "Computer Vision"],
      },
    ],
    technologies: ["Python", "PyTorch", "Diffusers", "Computer Vision", "Video Generation"],
    color: "purple",
  },
  {
    company: "Edplus, Arizona State University",
    role: "Instructional Design Assistant · Software Engineering",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    featured: [0, 1, 4],
    achievements: [
      {
        text: "Led development of a multi-tenant RAG assistant (LangChain + Semantic Kernel, Prompt Flow evals) used by 1,000+ faculty authoring courses for 60,000+ students.",
        relatedTechs: [
          "Python",
          "LangChain",
          "OpenAI",
          "Prompt Flow",
          "Semantic Kernel",
        ],
      },
      {
        text: "Combined a Neo4j knowledge graph with LLM-generated Cypher queries, cutting transcript analysis from 4 hours to 15 minutes.",
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
    featured: [0, 2, 5],
    achievements: [
      {
        text: "Built a hybrid FAISS + Neo4j retrieval layer that cut p95 query latency by 60% while holding 95% recall.",
        relatedTechs: ["Python", "FAISS", "Neo4j"],
      },
      {
        text: "Built a FastAPI embedding microservice over Postgres/pgvector for faculty-profile similarity, surfacing collaborator recommendations at 85% top-k precision.",
        relatedTechs: ["Python", "FastAPI", "PostgreSQL"],
      },
      {
        text: "Built an idempotent ETL pipeline ingesting 10,000+ faculty profiles a day; Postgres constraints and validation checks raised dataset accuracy to 95%.",
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
        text: "Cut API latency from 198ms to 20ms with a Redis caching layer and SQL query rewrites, then verified the result under simulated peak load.",
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
    featured: [0, 1, 2],
    achievements: [
      {
        text: "Split a .NET monolith into microservices on Kubernetes, cutting resource footprint by 35% and infrastructure cost by 20%.",
        relatedTechs: [".NET", "C#", "Docker", "Kubernetes", "AWS"],
      },
      {
        text: "Hardened CI/CD with SonarQube quality gates and containerized release pipelines — deploy time down 70%, production incidents down 40%.",
        relatedTechs: ["Git", "Docker", "Kubernetes", "SonarQube"],
      },
      {
        text: "Shipped a Redis-backed demand-prediction service for desk reservations across 300+ Fortune 500 sites (incl. Goldman Sachs, Merck); reported occupancy improved 30% under COVID hot-desk constraints.",
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
        text: "Built the order-tracking experience on Google Maps API and optimized driver-location polling, cutting its serving cost by 45%; shipped during a quarter of 25% user growth.",
        relatedTechs: ["React.js", "Google Maps API"],
      },
      {
        text: "Built a Python scraping toolchain harvesting product catalogs and reviews into the analytics warehouse, feeding pricing/positioning and CX workflows.",
        relatedTechs: ["Python"],
      },
      {
        text: "Built a full-stack WebSocket + Express.js notification service with backpressure-aware fan-out; after launch, reported CSAT rose 28% and support volume fell 35%.",
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

        <div className="flex flex-wrap gap-x-12 gap-y-4 -mt-6 mb-14">
          {[
            ["4+", "years"],
            ["7", "roles"],
            ["∞", "iteration"],
          ].map(([value, label]) => (
            <div key={label}>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {value}
              </span>
              <span className="ml-2 font-tech text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative pl-6 md:pl-12">

          <div className="space-y-16 group/list">
            {experiences.map((exp, expIndex) => (
              <div
                key={expIndex}
                className="relative pl-10 sm:pl-12 md:pl-16 transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100"
              >

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

