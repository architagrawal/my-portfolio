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
    company: "EdPlus, Arizona State University",
    role: "AI Software Engineer",
    location: "Tempe, AZ",
    period: "June 2026 – Present",
    featured: [0, 1, 2],
    achievements: [
      {
        text: "Own the end-to-end architecture of EdPlus's agentic survey-analysis platform: five agents coordinate roughly 30 deterministic tools across 74,000 lines of TypeScript and 1,021 tests. The core rule is simple—the agent decides, the tool computes—so every reported number is traceable to deterministic code.",
        relatedTechs: ["TypeScript", "AWS Bedrock", "AgentCore", "Vitest"],
      },
      {
        text: "Built the control experiment our architecture could lose: model choice moved labeling F1 by 0.230, while architecture changed it by −0.007 at a fixed model and cost 4–8× more. Reframed the adoption decision around reliability—not unsupported accuracy claims—and replaced a non-reproducible baseline.",
        relatedTechs: ["TypeScript", "AWS Bedrock"],
      },
      {
        text: "Eliminated a silent data-integrity failure with schema-constrained decoding and per-response correlation tokens: invalid labels fell from 9 to 0, overwritten rows from 13 of 102 to 0, join integrity reached 100%, and repeat runs produced 0% label churn.",
        relatedTechs: ["TypeScript", "AWS Bedrock"],
      },
      {
        text: "Ran the research phase as a deliverable, not a preamble: 12 prior-art passes mapped the design onto SSSOM mapping predicates, the DDI survey-metadata model, Metabase MBQL as the plan format, Vega-Lite as the chart contract, Draco/CompassQL/Voyager for constraint solving, Sato and Sherlock for context-aware column typing (F1 0.89 values-only against 0.925 with context), XLSForm/ODK, GPTCache, LinkML, CEL, SDMX and SKOS. Every borrowed mechanism is cited in the decision record; the ~10 that had no prior art are labeled as ours to get wrong.",
        relatedTechs: ["TypeScript", "Vega-Lite"],
      },
      {
        text: "Closed the research phase on purpose with a written design freeze: new references land in a parked list with a named trigger instead of changing direction mid-build. Wrote the decision record the team now works from: scope, approaches considered, findings and problem logs across 40 measured experiments over 253 recorded runs, each stating what it establishes and what it does not.",
        relatedTechs: ["TypeScript", "Vitest"],
      },
      {
        text: "Wrote down what we deliberately did not build and why: no warehouse, so Cube Core and the dbt semantic layer were rejected as dependencies that model over one; no text-to-SQL, because the model never sees a row after labeling; no agentic orchestrator, because the one thing it was buying (repair) is a Choice state plus a counter. Each rejection carries the condition that would reopen it.",
        relatedTechs: ["TypeScript", "Step Functions", "DuckDB"],
      },
      {
        text: "Designed the mechanisms that have no prior art behind them: a question passport (plan hash plus dataset, registry and skill versions) that re-executes any answer byte-identically, metric lint in CI that fails a metric which can no longer be computed on a stored run, shadow re-execution that diffs recent answers when a definition changes, a negative catalog that publishes what a scope cannot answer so the UI grays the control out instead of refusing after the fact, deterministic tie-breaking so one question cannot answer two ways on two days, and content-hash upload identity so two people uploading the same export get one run rather than two conflicting sets of numbers.",
        relatedTechs: ["TypeScript", "Vitest", "Nuxt 4"],
      },
      {
        text: "Modeled change itself: four lineage relations (relabel, recode, wave, wave_recoded) where only a new wave may claim topic movement, so a second labeling pass cannot present itself as a trend, and codelist drift accumulates unmatched values with counts instead of failing the load, so the drift becomes the report.",
        relatedTechs: ["TypeScript", "DuckDB"],
      },
      {
        text: "Set the extension policy the codebase is governed by: parsers, column kinds, metrics, operators, chart marks and backends extend without touching existing code, while the validator, the gate, provenance and grain enforcement deliberately do not, so a human review sits on every change to a guarantee.",
        relatedTechs: ["TypeScript", "Vitest"],
      },
      {
        text: "Built the semantic layer that decides what a dataset can be asked: ~10 declared operators, metrics minted by usage and bound to column kinds rather than column names so an unseen survey works on arrival, questions compiled to plans in Metabase's MBQL shape so one format serves both the agent and a UI query builder, a binding cache (plan hashed into the key) so repeat questions are lookups, and a refusal ladder that substitutes, decomposes, samples and extends before it refuses, and a refusal names the column that is missing rather than inventing a reason.",
        relatedTechs: ["TypeScript", "DuckDB"],
      },
      {
        text: "Shipped the pipeline on AWS with CDK: a Step Functions state machine with a Distributed Map over label slices, a Choice-based repair loop, and a ToleratedFailurePercentage circuit breaker that halts at 5% failed batches instead of grinding through 190 more and paying for every one. Found and fixed a fan-in defect where a fully SUCCEEDED execution had silently dropped 2% of the corpus because concurrent map iterations wrote the same slot.",
        relatedTechs: ["AWS CDK", "Step Functions", "AWS Bedrock"],
      },
      {
        text: "Established where each managed service earns its place: AgentCore's harness at the stage level, where it took labeling from 50/102 to 102/102 after our own agent loop failed, and Step Functions at the orchestration level, with the remaining cost gap traced to per-slice prompt-cache writes. Deployed eight agent harnesses with per-agent tool sets and load-time gates, withholding one tool at runtime until its precondition exists after it executed 0 times in 19 recorded runs.",
        relatedTechs: ["AgentCore", "Step Functions", "AWS CDK"],
      },
      {
        text: "Treated deployment as its own test surface: it surfaced 6 defects in the Step Functions path and 7 in the Flows path, none reachable by typecheck, unit tests or cdk synth. That result is why the deployed path, not the local one, is now the reference implementation.",
        relatedTechs: ["AWS CDK", "Step Functions"],
      },
      {
        text: "Built the visualization layer as specs rather than images: a constrained Vega-Lite subset where one spec yields the chart, an accessible data table, alt text, a CSV and an ASCII rendering, with mark selection derived from published research (Cleveland & McGill 1984, Bertin 1967, Mackinlay's APT 1986, Draco 2019, Brehmer & Munzner 2013) and the agent restricted to proposing mark and encoding behind four gates. 75 chart properties are classified rather than opened up, each carrying a class that says how a refusal is reported. That classification is how three accepted-and-inert bugs were found.",
        relatedTechs: ["Vega-Lite", "TypeScript", "Nuxt 4"],
      },
      {
        text: "Instituted an agent-earns-its-place protocol the team applies to every new component: held-out batches, eagerness sweeps that ask whether consulting the model more often ever hurts, and oracle runs over the agent's own search space that find the scorer's exploits before the agent does. Results included 0 of 36 chart proposals beating the deterministic rule table, a consensus signal that separates ~4× better than the hand-built risk score it replaced, and a temperature-0 case that scored 0.80/0.40/0.40/0.40/0.64 across five identical runs, which is why no claim here rests on a single pass.",
        relatedTechs: ["TypeScript", "AWS Bedrock", "Vitest"],
      },
      {
        text: "Made thresholds measured rather than guessed: codebook fit is calibrated before any labeling spend by embedding question scope and sample-labeling 25 responses, separating the right codebook at 0.598 / 4% abstain from the wrong one at 0.316 / 88% for about $0.001. The thresholds we would have written from intuition would have passed the wrong codebook with a warning.",
        relatedTechs: ["TypeScript", "AWS Bedrock"],
      },
      {
        text: "Declared every loop's exit condition before building it: tool loop at 8 calls, repair loop at 2 iterations before quarantine, verify loop at 2 redrafts before the sentence is stripped. A global spend budget is checked before every stage and inside the long ones, so exceeding it halts with partial results instead of truncating in silence.",
        relatedTechs: ["TypeScript", "AWS Bedrock"],
      },
      {
        text: "Hardened intake against exports that parse cleanly and are still wrong: UTF-16 headers full of null bytes, duplicate headers overwriting whole columns, 0/1 flags typed as rating scales, report titles occupying the header row, and 22 of 32 files hiding their timestamp inside an identifier column. Five gated stages over 30+ hand-written export shapes: 6 files need a stage at all, 11 model calls, $0.0023, and zero divergences between a run and its replay.",
        relatedTechs: ["TypeScript", "Node.js"],
      },
      {
        text: "Built the governance surface the platform is judged on: personal-data classification inside intake, Bedrock guardrails deployed as their own stack, entitlement-gated respondent-level retrieval, spend caps enforced inside stages rather than only between them after an audit found the guard had been doing nothing, and weight columns typed and reported but never applied so nothing silently rescales.",
        relatedTechs: ["TypeScript", "AWS Bedrock", "AWS CDK"],
      },
      {
        text: "Ran the data platform with no database: DuckDB in-process over per-run JSON, Lance serving vector and BM25 retrieval straight from S3, facts bounded at ~150 KB per run. One npm install, zero infrastructure to stand up, and scale demonstrated with five reproducible proofs rather than slides: 200× rows at unchanged ask latency, cross-scope queries over 216 runs in milliseconds, replays that call no model at all, namespace and entitlement checks, and byte-identical re-execution from a passport.",
        relatedTechs: ["DuckDB", "Lance", "Node.js"],
      },
      {
        text: "Shipped the internal web application: a Nuxt 4 front end over a NestJS API, both compiling against one shared TypeScript contract, with the printable report assembled by the same builder that serves the app, and capability menus generated from the registry rather than hand-written after the same staleness bug appeared three times.",
        relatedTechs: ["Nuxt 4", "NestJS", "TypeScript"],
      },
      {
        text: "Published the limits alongside the results: every accuracy number is self-graded by the author of the pipeline it grades, two corpora and two codebooks is a monoculture, and two real codebooks produced zero lexical mapping proposals between them, so cross-survey comparison needs a shared codebook, not a better matcher. Each limit ships with the test input that would resolve it.",
        relatedTechs: ["TypeScript", "Vitest"],
      },
    ],
    technologies: [
      "TypeScript",
      "AWS Bedrock",
      "AgentCore",
      "Step Functions",
      "AWS CDK",
      "DuckDB",
      "Lance",
      "Vega-Lite",
      "Nuxt 4",
      "NestJS",
      "Vitest",
      "Node.js",
    ],
    color: "blue",
  },
  {
    company: "MyStage Music Inc",
    role: "Founding AI/ML Engineer",
    location: "Remote",
    period: "July 2025 – Present",
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
    company: "EdPlus, Arizona State University",
    role: "Instructional Design Assistant · Software Engineering",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    featured: [0, 1, 4],
    achievements: [
      {
        text: "Led development of a multi-tenant RAG assistant used by 1,000+ faculty members to author courses reaching 60,000+ students, with Prompt Flow evaluations for response quality.",
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
        text: "Shipped a Redis-backed demand-prediction service for desk reservations across 300+ Fortune 500 sites, including Goldman Sachs and Merck; reported occupancy improved 30% under COVID-era hot-desk constraints.",
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
            [String(experiences.length), "roles"],
            ["End-to-end", "ownership"],
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
