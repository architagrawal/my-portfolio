import { roleBySlug } from "./experience";
import { projectBySlug } from "./projects";
// One page per job family under /for. Every point names the role or project it comes from,
// and an unknown slug throws at build, so a point cannot outlive its source.

export interface DomainPoint {
  text: string;
  role?: string;
  project?: string;
}

export interface Domain {
  slug: string;
  title: string;
  /* search title and snippet: the job title people search for, then what the page proves */
  seoTitle: string;
  description: string;
  keywords: string[];
  summary: string;
  stats: [string, string][];
  groups: { title: string; points: DomainPoint[] }[];
  caseStudies: { title: string; href: string; meta: string }[];
  tools: string[];
}

const AI = "ai-software-engineer-edplus-2026";
const MYSTAGE = "founding-ai-ml-engineer-mystage-music-inc-2025";
const RESEARCH = "student-researcher-arizona-state-university-2024";
const SWE = "software-engineer-edplus-2023";
const KER = "data-research-aide-knowledge-exchange-for-resilience-2024";
const ZEUS = "software-engineer-zeus-learning-2022";
const EATFIT = "product-intern-eat-fit-2021";
const CV = "computer-vision-researcher-da-iict-2021";

const SA = "Survey Agents case study";
const study = (title: string, chapter: string) => ({ title, href: `/work/survey-agents#${chapter}`, meta: SA });

export const domains: Domain[] = [
  {
    slug: "ai-engineering",
    title: "AI engineering",
    seoTitle: "AI Engineer: Agents, LLM Evals and RAG",
    description:
      "AI engineering by Archit Agrawal: multi-agent LLM systems on AWS Bedrock, LLM-as-judge evals, RAG and tracing, with 85% fewer wrong answers on 164 figures.",
    keywords: ["AI Engineer", "AI Software Engineer", "LLM Engineer", "AI agents", "multi-agent systems", "LLM evals", "LLM-as-judge", "RAG", "AWS Bedrock", "LangGraph", "MCP"],
    summary:
      "LLM systems that can be checked: agents that call tools, evals that gate every change, and answers traced to the rows they came from. Today a 12-agent analytics platform on AWS Bedrock, before it a durable LangGraph pipeline and a RAG assistant for 1,000+ faculty.",
    stats: [
      ["85%", "fewer wrong answers"],
      ["68%", "on StatQA, above GPT-4o"],
      ["76", "tools across 12 agents"],
      ["1,000+", "faculty on a RAG assistant"],
    ],
    groups: [
      {
        title: "Agents",
        points: [
          { role: AI, text: "Multi-agent platform: twelve agents over 76 registered tools on AWS Step Functions turn any uploaded dataset into analysis cited to its source rows." },
          { role: AI, text: "Agency where it pays: an analyst agent that chooses which analyses a survey deserves took headline findings recovered from 13% to 52-59% on unseen surveys, at about $0.05 per 13 surveys. Code computes every number." },
          { role: MYSTAGE, text: "Durable agent workflow: rebuilt a 14-Cloud-Function pipeline as one checkpointed LangGraph worker on Cloud Run, which pauses for research and resumes from its checkpoint." },
          { project: "srp-electric-mcp-server", text: "MCP tool server: gives agents 7 tools over a utility portal with no public API, built by reverse-engineering its login flow and calls." },
        ],
      },
      {
        title: "Evals",
        points: [
          { role: AI, text: "Answer checking: every answer is read back in words and judged before it is shown, cutting wrong answers 85% on 164 published figures." },
          { role: AI, text: "Benchmarks scored by code: published toplines, nvBench 2.0, StatQA and QRData. StatQA test choice rose from 40% to 68%, above GPT-4o's best reported 64.83%." },
          { role: SWE, text: "Release gates: a Prompt Flow harness scores groundedness, relevance and coherence on a fixed question set, so a prompt change ships on evidence." },
          { role: AI, text: "Improve or discard: an agent stays only if it beats the rule baseline. No chart proposal beat the rule table across the evaluation corpus, so the rule table stayed." },
        ],
      },
      {
        title: "Retrieval",
        points: [
          { role: SWE, text: "Multi-tenant RAG: led an assistant used by 1,000+ faculty authoring courses for 60,000+ students, with hybrid vector and keyword search and a citation on every answer." },
          { role: SWE, text: "Tenant isolation at retrieval: one college's material cannot surface in another's answer, even when the prompt is ignored." },
          { role: SWE, text: "Knowledge graph: Neo4j with LLM-written Cypher held to a schema allow-list cut transcript analysis from 4 hours to 15 minutes." },
          { role: KER, text: "Hybrid retrieval: FAISS plus Neo4j cut p95 query latency 60% while holding 95% recall." },
        ],
      },
      {
        title: "Reliability",
        points: [
          { role: AI, text: "Structured outputs: schema-constrained decoding and per-response correlation tokens took join integrity to 100%. The benchmark pipeline silently lost a label on 1 in 8 rows." },
          { role: AI, text: "Reproducible answers: each answer carries a passport (plan hash, dataset, registry and skill versions) and re-executes byte for byte." },
          { role: MYSTAGE, text: "Distributed tracing: Logfire trace context carried across queue, claim and resume, so worker spans nest under the producer's trace through a pause." },
          { role: AI, text: "Guardrails and spend: Bedrock Guardrails as their own stack, a 5% failure circuit breaker, and spend caps enforced inside each stage." },
        ],
      },
    ],
    caseStudies: [
      { title: "Survey Agents", href: "/work/survey-agents", meta: "Full case study" },
      study("The one place agency clearly won", "the-analyst"),
      study("A strong model as the bar", "against-opus-5-5"),
      study("Cheaper with fewer agents", "subtraction"),
      study("Where managed services earn their place", "deployment"),
    ],
    tools: ["TypeScript", "Python", "AWS Bedrock", "AgentCore", "Step Functions", "LangGraph", "LangChain", "MCP", "Gemini", "OpenAI", "Prompt Flow", "Neo4j", "Lance", "Logfire"],
  },
  {
    slug: "backend",
    title: "Backend engineering",
    seoTitle: "Backend Engineer: APIs, Workflows and Performance",
    description:
      "Backend engineering by Archit Agrawal: NestJS, FastAPI and .NET 8 APIs, Step Functions workflows, idempotent retries, and API latency cut from 198 ms to 20 ms.",
    keywords: ["Backend Engineer", "Backend Software Engineer", "API design", "distributed systems", "NestJS", "FastAPI", ".NET 8", "AWS Step Functions", "PostgreSQL", "Redis", "microservices"],
    summary:
      "Services that stay correct under retries, concurrency and partial failure. APIs in NestJS, FastAPI and .NET 8, workflows on Step Functions and Cloud Run, and latency work measured under load.",
    stats: [
      ["90%", "API latency cut, 198 to 20 ms"],
      ["20+", "production REST APIs"],
      ["70%", "faster deploys"],
      ["64%", "fewer service dependencies"],
    ],
    groups: [
      {
        title: "APIs",
        points: [
          { role: KER, text: "Production APIs: 20+ REST APIs for an NSF-funded tool on .NET 8, Dapper and MediatR, secured with JWT, with long work queued on SQS." },
          { role: KER, text: "Cross-cutting rules once: MediatR pipeline behaviours handle validation, logging and error shaping, so a new endpoint inherits them." },
          { role: AI, text: "One typed contract: a NestJS API of ten modules and a 14-page Nuxt app compile against one shared TypeScript contract." },
          { project: "edspace", text: "Zero runtime dependencies: the EdSpace API runs on Node's built-in HTTP server and SQLite, with 240 tests." },
        ],
      },
      {
        title: "Failure",
        points: [
          { role: AI, text: "Workflow as data: one graph file compiles to Step Functions for Lambda or AgentCore, and a broken edge fails at load, before a run starts." },
          { role: AI, text: "Silent data loss: traced a run that reported success while dropping part of the corpus to parallel Distributed Map writes on one slot, then partitioned the writes and added a real fan-in." },
          { role: AI, text: "Bounded blast radius: a 5% failure circuit breaker halts a run instead of paying for every remaining batch." },
          { role: MYSTAGE, text: "Idempotent retries: deterministic task IDs with create-if-absent and atomic Firestore claims, so two workers never take the same task." },
        ],
      },
      {
        title: "Performance",
        points: [
          { role: KER, text: "API latency cut: Redis caching and SQL rewrites took it from 198 ms to 20 ms, verified under simulated peak load." },
          { role: KER, text: "Load tested before release: pytest and Locust suites set throughput and latency SLOs." },
          { role: MYSTAGE, text: "Search latency: FastAPI endpoints fronting Algolia for sub-50 ms search, with Firestore for real-time sync." },
          { role: ZEUS, text: "Query tuning: paginated fetching made a listing screen 30% faster, and MySQL query rewrites cut class-details latency a further 10%." },
        ],
      },
      {
        title: "Architecture",
        points: [
          { role: ZEUS, text: "Monolith to microservices: a strangler migration onto Kubernetes cut resource footprint 35% and infrastructure cost 20%." },
          { role: ZEUS, text: "Release pipeline: SonarQube gates that block the merge and containerized releases cut deploy time 70% and production incidents 40%." },
          { role: MYSTAGE, text: "Monolith to subgraph: a 1,600-line Cloud Run service became a callable subgraph, cutting service dependencies 64%." },
          { project: "image-recognition-as-a-service", text: "Queue-driven scaling: SQS in and out, scaling on queue depth rather than CPU, with idempotent workers under at-least-once delivery." },
        ],
      },
    ],
    caseStudies: [
      study("The workflow graph is versioned data", "orchestration"),
      study("Where it runs, what it passes", "architecture"),
      study("A question, settled by code", "ask-path"),
      study("Where managed services earn their place", "deployment"),
      { title: "EdSpace", href: "/work/edspace", meta: "Full case study" },
    ],
    tools: ["TypeScript", "Python", "C#", "Node.js", "NestJS", "FastAPI", ".NET 8", "PostgreSQL", "Redis", "Step Functions", "Lambda", "SQS", "Docker", "Kubernetes"],
  },
  {
    slug: "full-stack",
    title: "Full-stack engineering",
    seoTitle: "Full-Stack Engineer: React, Next.js, Nuxt and Node",
    description:
      "Full-stack work by Archit Agrawal: Nuxt, Next.js and React Native apps over NestJS and Postgres, including a live office map built in two days for 500+ people.",
    keywords: ["Full-Stack Engineer", "Full-Stack Software Engineer", "React", "Next.js", "Nuxt", "React Native", "TypeScript", "NestJS", "Node.js", "PostgreSQL", "D3"],
    summary:
      "The whole product: the interface people use, the API behind it and the tests that keep both honest. Recent work spans a 14-page Nuxt app, a live office map for 500+ people and a React Native app with a web target.",
    stats: [
      ["500+", "people on EdSpace"],
      ["2 days", "EdSpace, first commit to demo"],
      ["4,845", "tests on one platform"],
      ["35%", "engagement lift"],
    ],
    groups: [
      {
        title: "Products",
        points: [
          { role: AI, text: "Charts from plain English: a reader asks a question, gets a chart, then edits it directly with sort, stack, top-N, filters and undo." },
          { project: "edspace", text: "Office map in two days: EdSpace, a live office map with room booking, walking routes and a 3D desk per person, going live for 500+ people." },
          { project: "prismsplit", text: "Receipt splitting: PrismSplit splits bills at the item level from a scanned receipt, in React Native with a web target of 116 surfaces sharing the same stores." },
          { project: "clash-royale-clan-analytics-platform", text: "Clash Royale Analytics: a Next.js 16 and React 19 dashboard of cross-filtered D3 charts over a serverless Cloudflare D1 store." },
        ],
      },
      {
        title: "Frontend",
        points: [
          { project: "survey-agents", text: "Accessible charts: one Vega-Lite spec emits the chart, a data table, alt text, a CSV and an ASCII rendering." },
          { project: "clash-royale-clan-analytics-platform", text: "Accessibility: skip navigation, focus traps, reduced-motion support and 44-pixel touch targets." },
          { role: SWE, text: "Engagement lift: responsive React and Material UI interfaces lifted engagement 35% and cut bounce 20%." },
          { project: "no-code-pipeline-builder", text: "Undo that holds: bounded undo and redo with one snapshot per drag, debounced autosave and property-based tests." },
        ],
      },
      {
        title: "Data and state",
        points: [
          { role: AI, text: "One contract: a 14-page Nuxt 4 front end and a 10-module NestJS API compile against one shared TypeScript contract." },
          { project: "prismsplit", text: "Money that adds up: Postgres RPCs keep bill creation and settlement transactional, with integer-cent arithmetic so splits never drift." },
          { project: "prismsplit", text: "Offline-aware: idempotency keys and MMKV persistence under real-time Supabase subscriptions." },
          { role: EATFIT, text: "Real-time updates: WebSocket notifications with duplicate-safe reconnection and a polling fallback. Reported CSAT rose 28% and support volume fell 35%." },
        ],
      },
      {
        title: "Testing",
        points: [
          { role: AI, text: "Tests at scale: 4,845 tests across 347k lines in 12 workspace packages." },
          { project: "edspace", text: "Two-day build, still tested: 240 tests across the API, the web app and the shared floor model." },
          { project: "prismsplit", text: "Release gates: Maestro end-to-end flows and enforced coverage thresholds guard every release build." },
        ],
      },
    ],
    caseStudies: [
      { title: "EdSpace", href: "/work/edspace", meta: "Full case study" },
      study("Every chart posts a plan", "the-app"),
      study("Charts are specs, never images", "visualization"),
      study("Drew well, answered little", "question-coverage"),
    ],
    tools: ["TypeScript", "React", "Next.js", "Nuxt 4", "Vue", "React Native", "NestJS", "Node.js", "PostgreSQL", "Supabase", "D3", "Vega-Lite", "three.js", "Vitest", "Jest"],
  },
  {
    slug: "data-science",
    title: "Data science",
    seoTitle: "Data Scientist: Experiments, Statistics and Evaluation",
    description:
      "Data science by Archit Agrawal: controlled experiments, 25 statistical tests checked against scipy, conformal thresholds, and model benchmarks scored by code.",
    keywords: ["Data Scientist", "experiment design", "hypothesis testing", "causal inference", "statistics", "model evaluation", "calibration", "Python", "scikit-learn", "XGBoost", "statsmodels"],
    summary:
      "Every claim treated as an experiment, with a control, a baseline and a stated error. That has meant controlled model comparisons, calibrated thresholds, 25 statistical tests checked against scipy, and benchmarks scored by code rather than taste.",
    stats: [
      ["33×", "model vs pipeline effect on F1"],
      ["85%", "fewer wrong answers"],
      ["25", "statistical tests, checked"],
      ["12%", "accuracy lift, match model"],
    ],
    groups: [
      {
        title: "Experiments",
        points: [
          { role: AI, text: "Controlled experiment: model choice moved labelling F1 by 0.230, about 33 times the 0.007 from pipeline design, which moved the team's recommendation from accuracy to reliability." },
          { role: AI, text: "Baselines that hold: retired the 0.637 baseline every earlier claim rested on, after fresh runs reproduced it at 0.523." },
          { project: "survey-agents", text: "Agency measured: the analyst agent tied or lost wherever it executed a known analysis, and beat its rule baseline 13% to 52-59% where it chose which analyses to run." },
          { role: RESEARCH, text: "Minimal pairs: prompts where exactly one clause changes, with seeds, resolution and sampler settings held fixed across models." },
        ],
      },
      {
        title: "Statistics",
        points: [
          { role: AI, text: "Tests and causes: 25 statistical tests checked against scipy and statsmodels, causal effect estimators matching statsmodels, and causal discovery that says unsettled rather than guess a direction." },
          { project: "survey-agents", text: "False discoveries: an insight sweep corrected for multiple comparisons, after two traps made noise look like findings." },
          { role: AI, text: "Conformal thresholds: accept and abstain cutoffs keep the error rate on accepted labels under a stated bound." },
          { role: AI, text: "Honest error: a blind random audit per run gives a corrected estimate with its margin of error beside the raw number." },
        ],
      },
      {
        title: "Evaluation",
        points: [
          { role: AI, text: "Scored by code: four benchmarks (published toplines, nvBench 2.0, StatQA, QRData). StatQA test choice rose from 40% to 68%." },
          { role: AI, text: "Calibrated before spend: sample-labelling 25 rows separates the right codebook (0.598, 4% abstain) from the wrong one (0.316, 88%) for about $0.001." },
          { role: AI, text: "Scorer attacked first: an oracle found a word cloud sized by a free-text column scoring a perfect 1.00, which is where the measure gate came from." },
          { role: RESEARCH, text: "Rater agreement: measured on a held-out subset before trusting a single aggregate score." },
        ],
      },
      {
        title: "Modelling",
        points: [
          { project: "soccer-game-result-prediction", text: "Match prediction: an LSTM and XGBoost ensemble lifted accuracy 12%, on a date-based split so no future match leaks into training." },
          { project: "soccer-game-result-prediction", text: "Calibrated probabilities: scored on log loss with a reliability plot, which showed sentiment features moved confidence without moving correctness." },
          { project: "jet-engine-remaining-useful-life", text: "Remaining useful life: compared machine learning, deep learning and generative regressors on NASA's CMAPSS turbofan data." },
          { role: KER, text: "Search ranking: an n-gram ranking model lifted search relevance 15% over baseline, and pgvector recommendations reached 85% top-k precision." },
        ],
      },
    ],
    caseStudies: [
      study("Model choice mattered more than architecture", "measurement"),
      study("Three decisive control runs", "controls"),
      study("Tests, causes, no wrong numbers", "any-table"),
      study("Telling a real difference from noise", "relationships"),
      study("Scored by code, not by taste", "benchmarks"),
    ],
    tools: ["Python", "SQL", "pandas", "NumPy", "scikit-learn", "XGBoost", "PyTorch", "TensorFlow", "SciPy", "statsmodels", "DuckDB"],
  },
  {
    slug: "data-engineering",
    title: "Data engineering",
    seoTitle: "Data Engineer: ETL, Pipelines and Data Quality",
    description:
      "Data engineering by Archit Agrawal: idempotent ETL, scraping 70,000+ records a day, DuckDB and Lance on S3, typed data lineage, and quality gates in Postgres.",
    keywords: ["Data Engineer", "ETL", "data pipelines", "data quality", "data lineage", "data modeling", "DuckDB", "AWS S3", "PostgreSQL", "Cloudflare Workers", "Python"],
    summary:
      "Pipelines that can be re-run without fear: idempotent loads, typed lineage and quality gates at the boundary. They have ingested 70,000+ records a day at MyStage, any table shape at EdPlus, and scheduled ETL in my own projects.",
    stats: [
      ["70,000+", "records scraped a day"],
      ["95%", "dataset accuracy"],
      ["100%", "join integrity"],
      ["216", "runs queried in milliseconds"],
    ],
    groups: [
      {
        title: "Ingestion",
        points: [
          { role: MYSTAGE, text: "Scraping at scale: a Playwright service indexing 70,000+ records a day from 650+ locations, rotating proxies and backing off when sites push back." },
          { role: AI, text: "Any table shape: five gated intake stages survive UTF-16 null-byte headers and duplicate columns, and found the timestamp hidden in identifiers on about seven in ten exports." },
          { role: AI, text: "Replayable intake: every decision lands in one JSON recipe, and a run has never diverged from its replay." },
          { role: MYSTAGE, text: "Freshest first: a Cloud Scheduler loop reprocesses the most-stale sources first." },
        ],
      },
      {
        title: "Pipelines",
        points: [
          { role: KER, text: "Idempotent ETL: keyed on a natural key, so a re-run after a partial failure updates rather than duplicates. Dataset accuracy rose to 95% across 10,000+ profiles a day." },
          { project: "clash-royale-clan-analytics-platform", text: "Scheduled ETL: a Cloudflare Workers cron extracts, dedupes and incrementally loads a D1 store, with backfills that reprocess history without blocking live runs." },
          { role: AI, text: "No silent loss: partitioned writes and a real fan-in, after a run reported success while dropping part of the corpus." },
          { role: EATFIT, text: "Warehouse feeds: a Python scraping toolchain normalizes competitor catalogs and reviews into one schema in the analytics warehouse." },
        ],
      },
      {
        title: "Storage",
        points: [
          { role: AI, text: "Narrow fact table: dimension and key are columns, so new datasets union without a migration." },
          { role: AI, text: "No database to run: DuckDB in-process over per-run JSON and Lance on S3, with facts at about 150 KB per run against 14 to 178 MB of payload." },
          { role: AI, text: "Scale shown, not claimed: 200× rows at unchanged ask latency, and cross-scope queries over 216 runs in milliseconds." },
          { project: "survey-agents", text: "Content identity: uploads keyed on a normalized content hash, so the same export uploaded twice is one run." },
        ],
      },
      {
        title: "Quality",
        points: [
          { role: KER, text: "Gates in Postgres: uniqueness, not-null and range constraints, so bad rows fail at the boundary instead of in a report." },
          { role: AI, text: "Typed lineage: four relations (relabel, recode, wave, wave_recoded), so a second labelling pass cannot pose as a trend." },
          { role: AI, text: "One meaning per column: a semantic model per run took disagreements across 411 runs from 30,405 to 263." },
          { role: AI, text: "Metric lint in CI: a metric that can no longer be computed against a stored run fails the build." },
        ],
      },
    ],
    caseStudies: [
      study("Five gated stages, one replayable recipe", "intake"),
      study("One narrow fact table", "the-data-model"),
      study("Facts small, payload searchable", "storage"),
      study("Every reading is a decision", "reading-the-file"),
      study("One place for a column's meaning", "semantic-model"),
    ],
    tools: ["Python", "SQL", "TypeScript", "DuckDB", "PostgreSQL", "Lance", "AWS S3", "Step Functions", "Cloudflare Workers", "D1", "Firestore", "Playwright", "pandas", "Redis"],
  },
  {
    slug: "ml-engineering",
    title: "ML engineering",
    seoTitle: "ML Engineer: Training, Evaluation and Retrieval",
    description:
      "ML engineering by Archit Agrawal: DPO preference tuning in PyTorch, a MERT reward model, video-model evals, FAISS and pgvector retrieval, and CUDA autodiff.",
    keywords: ["ML Engineer", "Machine Learning Engineer", "PyTorch", "preference tuning", "DPO", "reward model", "model evaluation", "FAISS", "pgvector", "CUDA", "computer vision"],
    summary:
      "Models trained, tuned and served, and checked against a reference before a result is trusted. The work runs from a PyTorch audio pipeline on an MI300X to a video-model eval harness, retrieval at 95% recall and a CUDA autodiff engine.",
    stats: [
      ["60%", "p95 retrieval latency cut"],
      ["85%", "top-k precision"],
      ["0.127", "reward-head MSE"],
      ["192 GB", "MI300X on ROCm"],
    ],
    groups: [
      {
        title: "Training",
        points: [
          { project: "aijockey", text: "Preference tuning: DPO, KTO and IPO trainers for VampNet, and a loop that turns Audiobox-scored renders into preference pairs for the planner." },
          { project: "aijockey", text: "Reward model: a head on MERT embeddings predicts four Audiobox aesthetic axes at MSE 0.127, so selection skips full critic inference on every render." },
          { project: "aijockey", text: "Non-CUDA GPU stack: PyTorch, Demucs and VampNet ported to ROCm on a 192 GB MI300X." },
          { project: "reverse-mode-automatic-differentiation", text: "Autodiff from scratch: a reverse-mode engine with CUDA kernels, every adjoint checked against numerical gradients." },
        ],
      },
      {
        title: "Evaluation",
        points: [
          { role: RESEARCH, text: "Video model evals: physical plausibility scored apart from semantic fidelity, with trajectories checked against a constant-gravity baseline." },
          { role: RESEARCH, text: "Research finding: fluency tracks physical plausibility only weakly, so a model ranked first on human preference can rank last on causality." },
          { project: "aijockey", text: "Metric versus ear: diagnosed renders that scored higher and sounded worse (PQ 7.60 against 7.51), and capped effects per set in response." },
        ],
      },
      {
        title: "Serving",
        points: [
          { role: KER, text: "Hybrid retrieval: FAISS and Neo4j cut p95 latency 60% at 95% recall, with the FAISS index chosen by measurement." },
          { role: KER, text: "Embedding service: a FastAPI and pgvector service for collaborator recommendations at 85% top-k precision." },
          { role: ZEUS, text: "Demand forecasting: a desk-demand model on occupancy by floor, day and team, served from Redis to 300+ offices." },
          { project: "aijockey", text: "One FastAPI service: runs separation, analysis, LLM planning, 25+ DSP transitions and mastering, behind a rate-limited Gradio UI." },
        ],
      },
      {
        title: "Perception",
        points: [
          { role: CV, text: "Sensor fusion: radar and lidar extrinsic calibration, with early and late fusion compared on identical sequences." },
          { role: CV, text: "Replay harness: recorded sensor logs replayed, so a perception change is judged on the same drive twice." },
        ],
      },
    ],
    caseStudies: [
      { title: "AiJockey", href: "/projects/aijockey", meta: "Project write-up" },
      study("The axis nobody scored", "retrieval"),
      study("The mechanisms under the scores", "techniques"),
    ],
    tools: ["Python", "PyTorch", "CUDA", "ROCm", "Diffusers", "TensorFlow", "XGBoost", "FAISS", "pgvector", "FastAPI", "Demucs", "MERT"],
  },
];

export const domainBySlug = (s: string) => domains.find((d) => d.slug === s);

/* Where a point comes from, as a link. Throws on a missing or unknown source. */
export function sourceOf(p: DomainPoint): { label: string; href: string } {
  if (p.role) {
    const r = roleBySlug(p.role);
    if (r) return { label: `${r.role}, ${r.companyShort}`, href: `/work/${r.slug}` };
  }
  if (p.project) {
    const pr = projectBySlug(p.project);
    if (pr) return { label: pr.title, href: `/projects/${pr.slug}` };
  }
  throw new Error(`domains: no source for "${p.text.slice(0, 40)}"`);
}
