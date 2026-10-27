// Single source of truth for every resume variant.
// `core` is the general SWE selection; role configs select from core + extra.
// EdPlus/MyStage arrangements were confirmed by the user; other context follows
// resume/linkedin.md. Do not infer arrangements or transitions from overlapping dates.
// Measurements describe their workload or evaluation, rather than implying universal results.

export const profile = {
  name: "ARCHIT AGRAWAL",
  contact: [
    "San Francisco Bay Area",
    "623-312-0435",
    { text: "architagrawal000@gmail.com", href: "mailto:architagrawal000@gmail.com" },
    { text: "linkedin.com/in/agrawal-archit", label: "LinkedIn", href: "https://linkedin.com/in/agrawal-archit" },
    { text: "github.com/architagrawal", label: "GitHub", href: "https://github.com/architagrawal" },
    { text: "agrawal-archit.vercel.app", label: "Portfolio", href: "https://agrawal-archit.vercel.app" },
  ],
};

export const experience = [
  {
    title: "AI Software Engineer",
    company: "EdPlus, Arizona State University",
    employment: "Contract",
    location: "Phoenix, AZ",
    period: "Jun 2026 – Present",
    core: [
      "Own the software architecture and delivery of an AWS analytics platform for any structured dataset, spanning the web application, APIs and data pipelines.",
      "Built the platform's web application with a Nuxt frontend and NestJS backend, sharing TypeScript contracts across 70 API routes.",
      "Reduced AWS pipeline runtime from 500 to 85 seconds by replacing two managed-agent stages with direct tool calls.",
      "Parallelized data labeling across 64 AWS Step Functions lanes, with a failure circuit breaker to detect incomplete runs.",
    ],
    extra: [
      "Built interactive charts with sorting, filtering and undo in Nuxt, backed by in-process DuckDB for query execution.",
      "Own architecture and delivery of an AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, code-computed answers.",
      "Cut incorrect answers 85% in an evaluation against 164 published benchmark figures by adding answer verification before display.",
      "Validated 25 statistical tests and six causal estimators against SciPy and statsmodels; scored 68% on a 100-question StatQA sample, against GPT-4o's best reported 64.83%.",
      "Quadrupled the headline findings automated reports recover, 13% to 52–59% on held-out datasets, by letting an LLM choose analyses while code computes every number.",
      "Improved accuracy from 60% to 93% on the hardest benchmark questions by consolidating column definitions in a shared semantic layer.",
      "Designed a chart recommender covering 17 chart types, retaining deterministic rules when LLM proposals failed to improve evaluation scores.",
      "Reduced publishing time from 19 minutes to 109 seconds for a 51,280-respondent survey; an independent raw-data audit matched all evaluated figures.",
      "Designed S3 storage with compact fact tables and Lance payloads, queried through DuckDB for full-text and vector search.",
      "Built dataset intake for any table shape, from crosstabs and long tables to weighted surveys, including UTF-16 files and duplicate-header validation.",
      "Added access-controlled row-level retrieval, AWS Bedrock Guardrails and per-stage spending limits to the analytics proof of concept.",
      "Documented the proposed production architecture and engineering tradeoffs across 80 decisions and 200+ experiments.",
      "Showed model choice moves labeling F1 33x more than pipeline design (0.230 vs 0.007), redirecting the team toward reliability.",
      "Blocked double counting in cross-dataset joins by detecting runs that share the same people.",
      "Own end-to-end architecture and delivery of an AWS analytics platform for any structured dataset: a 14-page Nuxt frontend, 70 NestJS API routes and shared TypeScript contracts.",
      "Cut end-to-end AWS pipeline runtime from 500 to 85 seconds by removing managed-agent startup overhead and invoking the underlying tools directly.",
      "Accelerated publishing of a 51,280-respondent survey from 19 minutes to 109 seconds; an independent raw-data audit matched all evaluated figures.",
      "Engineered 64-way AWS Step Functions processing with a failure circuit breaker after diagnosing silent row loss in runs that reported success.",
      "Delivered interactive chart sorting, filtering, top-N and undo in Nuxt; in-process DuckDB kept measured query latency flat as input rows grew 200x.",
      "Reached 100% join integrity on repeat runs with schema-constrained LLM output and per-row IDs; the prior pipeline silently mislabeled 1 in 8 rows.",
      "Secured the analytics proof of concept with entitlement-gated row-level access, Bedrock Guardrails deployed through AWS CDK and enforced per-stage spend limits.",
      "Own a multi-agent LLM platform end to end on AWS Bedrock and Step Functions: 12 tool-calling agents over 76 tools answer questions on any structured dataset, each answer cited to its source rows.",
      "Built the LLM eval harness: code-scored benchmarks and LLM-as-judge rubrics gate every agent and prompt change; answer verification cut hallucinated figures 85% across 164 published results.",
      "Built traceability into every LLM run: per-row correlation IDs, versioned outputs and corrections, lineage and replayable runs; structured outputs reached 100% join integrity where 1 in 8 rows used to be mislabeled.",
      "Cut pipeline latency from 500 to 85 seconds with direct tool calls and held a 19-call run to $0.03 with Bedrock prompt caching, bounding failures and spend with a 5% circuit breaker and per-stage caps.",
      "Raised accuracy from 60% to 93% on the hardest benchmark questions through context engineering: a shared semantic layer compiles questions into query plans behind 7 validation checks.",
      "Built hybrid retrieval over S3, Lance vector search plus BM25 through DuckDB, behind entitlement-gated row-level access and Bedrock Guardrails deployed through AWS CDK.",
      "Traced silent row loss in Step Functions runs that reported success and fixed it with partitioned writes and fan-in across 64 parallel lanes.",
      "Own a full-stack TypeScript platform end to end: a 14-page Nuxt 4 frontend over a 10-module NestJS API sharing one typed contract, with 4,845 tests across 347k lines in 12 workspace packages.",
      "Shipped an AI chart builder: readers ask in plain English, get a Vega-Lite chart, then edit it with sort, stack, top-N, filters and undo/redo; every chart also ships an accessible data table and alt text.",
      "Built EdSpace in two days for the EdPlus hackathon: a live office map with room booking, desk claiming, walking routes and 3D desks, shown to leadership up to the CEO and going live for 500+ people.",
      "Own the backend of a TypeScript analytics platform: a 10-module NestJS API and a Step Functions workflow compiled from one declarative graph and validated at load, so a broken edge fails before a run starts.",
      "Made every answer reproducible: a passport of plan hash, dataset and versions re-executes byte-identically, and shadow re-execution diffs recent answers whenever a definition changes.",
      "Cached question-to-plan bindings keyed on a plan hash, turning the one non-deterministic step in the read path into a lookup.",
      "Ran the platform without a database: in-process DuckDB over per-run JSON and Lance on S3 held ask latency flat at 200x rows and queried 216 runs in milliseconds.",
      "Designed a controlled experiment showing model choice moves text-classification F1 33x more than pipeline design (0.230 vs 0.007), redirecting the team's roadmap toward reliability.",
      "Designed conformal accept and abstain thresholds that bound the error rate on accepted labels, giving every label a calibrated 0–100 confidence.",
      "Designed blind random QC audits per run that yield both a quality score and a corrected estimate published with its margin of error.",
      "Retired a 0.637 baseline the project's claims rested on after fresh runs reproduced it at 0.523, tracing the gap to a human-reviewed delivery file.",
      "Cut cross-run disagreements from 30,405 to 263 across 411 runs by giving every column one meaning in one semantic model.",
      "Calibrated codebook fit before labeling: a 25-row sample separated the right codebook at 0.598 with 4% abstention vs 0.316 and 88%, for about $0.001.",
      "Designed a serverless data lake on S3: a narrow fact table plus Lance payloads queried in-process by DuckDB, so new datasets union without a migration.",
      "Built schema-inferring ingestion for any table shape, from crosstabs to weighted surveys and UTF-16 files, emitting each decision as a JSON recipe that replays exactly.",
      "Tracked data lineage with four typed relations (relabel, recode, wave, wave_recoded), so a second labeling pass can never pose as a trend.",
      "Wired metric lint into CI, so a metric that can no longer be computed against stored runs fails the build instead of rotting.",
    ],
  },
  {
    title: "Founding AI/ML Engineer",
    company: "MyStage Music Inc.",
    employment: "Full-time",
    location: "Remote",
    period: "Mar 2025 – Jun 2026",
    core: [
      "Built FastAPI and Algolia search with sub-50 ms latency, real-time Firestore synchronization, 200+ pytest tests and Logfire tracing.",
      "Scaled ingestion to 70,000+ records daily from 650+ venues using Playwright, transactional locking and entity resolution.",
      "Consolidated a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run, reducing production service dependencies 64%.",
    ],
    extra: [
      "Implemented checkpointed pause-and-resume so records missing context wait for additional information without failing the ingestion batch.",
      "Made ingestion retries safe with deterministic task IDs and atomic create-if-absent writes, preventing duplicate jobs from overwriting in-flight work.",
      "Designed reusable scraping modules so new data sources can be added without changing the orchestration graph.",
      "Delivered sub-50 ms venue search through FastAPI and Algolia, synchronizing Firestore updates into the search index in real time.",
      "Expanded Playwright ingestion to 70,000+ records daily from 650+ venues, using proxy rotation, backoff and transactional locking to handle unreliable sources.",
      "Reduced production service dependencies 64% by consolidating a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run.",
      "Implemented pause-and-resume for incomplete records and retry-safe task processing through deterministic IDs and atomic Firestore claims.",
      "Covered routing, transactional claims, retries and checkpoint resumes with 200+ pytest unit and integration tests; traced workflow execution through Logfire.",
      "Rebuilt a 14-Cloud-Function backend as one durable LangGraph agent workflow on GCP Cloud Run, with checkpointing and human-in-the-loop interrupt and resume, cutting service dependencies 64%.",
      "Instrumented LLM observability via Logfire (OpenTelemetry), tracing each run across pause and resume.",
      "Lifted dataset accuracy 25% with Gemini entity resolution, scored by LLM-as-judge, over 70,000+ records a day.",
      "Made the pipeline fault tolerant with deterministic task IDs, atomic Firestore claims, per-branch error isolation across parallel fan-out and 200+ pytest tests.",
      "Propagated OpenTelemetry trace context through Logfire across queue, claim and resume, so worker spans nest under the producer's trace, with per-tick metrics.",
      "Built a Cloud Scheduler reprocessing loop that refreshes the most-stale sources first, tracking reprocess time and count per entity.",
    ],
  },
  {
    title: "Software Engineer",
    company: "EdPlus, Arizona State University",
    employment: "Student employment",
    location: "Phoenix, AZ",
    period: "Sep 2023 – May 2025",
    core: [
      "Built a multi-tenant course assistant from React UI to retrieval services, used by 1,000+ faculty creating courses for 60,000+ students.",
      "Built React and Material UI assessment tools for bulk import, question reuse and revision comparison; engagement rose 35% and bounce fell 20%.",
      "Implemented tenant isolation in retrieval services and configuration-based onboarding for additional colleges.",
    ],
    extra: [
      "Reduced transcript-analysis time from four hours to 15 minutes using a Neo4j knowledge graph and validated Cypher queries.",
      "Built a Prompt Flow evaluation harness to check groundedness, relevance and coherence before releasing prompt changes.",
      "Added hybrid keyword and vector retrieval to resolve exact course codes alongside semantic document search.",
      "Compared fixed-size and section-aware chunking on course documents to preserve complete policy passages in retrieved results.",
      "Linked generated answers to their source document and section so faculty could verify claims.",
      "Increased assessment-tool engagement 35% and reduced bounce 20% by building responsive React and Material UI workflows for bulk import, question reuse and revision comparison.",
      "Enabled configuration-based college onboarding through tenant-scoped retrieval, keeping each college's documents within its own search boundary.",
      "Cut transcript-analysis time from four hours to 15 minutes with a Neo4j knowledge graph and schema-validated, LLM-generated Cypher queries.",
      "Established Prompt Flow release checks for groundedness, relevance and coherence, evaluating prompt changes against measured results before deployment.",
      "Shipped a multi-tenant RAG assistant to 1,000+ faculty building courses for 60,000+ students, with hybrid vector and keyword search, section-aware chunking and a source citation on every answer.",
      "Gated every prompt release on Prompt Flow LLM-as-judge evals for groundedness, relevance and coherence.",
      "Built GraphRAG over a Neo4j knowledge graph with schema-validated, LLM-generated Cypher, cutting transcript analysis from four hours to 15 minutes.",
      "Built REST APIs and SQL-backed admin tools for ASU Online quiz platforms and question banks, with schema-level invariants protecting assessment integrity.",
    ],
  },
  {
    title: "Student Researcher",
    company: "Arizona State University",
    location: "Phoenix, AZ",
    period: "Aug 2024 – May 2025",
    core: [
      "Built a PyTorch and Diffusers benchmark for text-to-video models that scores physical plausibility separately from visual quality, holding seed, resolution and sampler fixed.",
      "Found visual quality barely predicts physical plausibility: the top model by human preference ranked last on causal consistency.",
    ],
    extra: [
      "Designed a frame-level rubric for rigid-body motion, gravity, momentum and occlusion, and measured inter-rater agreement before trusting any aggregate score.",
      "Derived a failure taxonomy from annotated clips: broken object permanence, non-conserved mass, teleporting contact and physics that resets at a scene cut.",
    ],
  },
  {
    title: "Data Research Aide",
    company: "Knowledge Exchange for Resilience, Arizona State University",
    employment: "Internship",
    location: "Phoenix, AZ",
    period: "Jun 2024 – Aug 2024",
    core: [
      "Built 20+ REST APIs in .NET 8 and an ETL pipeline ingesting 10,000+ researcher profiles daily into PostgreSQL.",
      "Reduced API latency from 198 to 20 ms using Redis caching and SQL rewrites, verified with Locust load tests.",
    ],
    extra: [
      "Reduced p95 retrieval latency 60% at 95% recall using hybrid FAISS and Neo4j search.",
      "Built a FastAPI and pgvector collaborator recommender achieving 85% top-k precision in evaluation.",
      "Made ETL reruns idempotent through natural-key upserts, preventing duplicate records after partial failures.",
      "Enforced uniqueness, not-null and range constraints in PostgreSQL to reject invalid records during ingestion.",
      "Delivered 20+ production REST APIs using .NET 8, Dapper and MediatR, with JWT authentication and AWS SQS for queued work.",
      "Cut API latency from 198 to 20 ms with Redis caching and SQL rewrites, verified under simulated peak load with Locust.",
      "Built an idempotent ETL pipeline for 10,000+ researcher profiles daily, using PostgreSQL natural-key upserts to prevent duplicates after partial failures.",
      "Centralized validation, logging and error shaping in MediatR pipeline behaviors so new endpoints inherit them, pushing long work to AWS SQS to keep the API responsive.",
      "Set throughput and latency SLOs before release with Locust load tests and pytest suites against FastAPI endpoints.",
      "Lifted search relevance 15% over baseline with an n-gram ranking model over cleaned researcher-profile text.",
      "Put data-quality gates in PostgreSQL, with uniqueness, not-null and range constraints, so bad rows fail at ingestion; dataset accuracy rose to 95%.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Zeus Learning",
    employment: "Intern Jan–Jun 2022; full-time Jun 2022–Jul 2023",
    location: "Mumbai, India",
    period: "Jan 2022 – Jul 2023",
    core: [
      "Migrated a C#/.NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and resource footprint 35%.",
      "Reduced deployment time 70% and production incidents 40% through containerized CI/CD and SonarQube quality gates.",
    ],
    extra: [
      "Built a Redis-backed desk-booking service used across 300+ offices at Fortune 500 companies.",
      "Improved student-listing performance 30% with pagination and S3 asset delivery; reduced class-detail latency 10% through SQL query rewrites.",
      "Published an internal npm package wrapping the Slack Web API with pagination, released under semver for the company social platform.",
      "Split a .NET monolith into Kubernetes microservices as a strangler migration with no big-bang cutover, cutting infrastructure cost 20% and footprint 35% by right-sizing pods.",
      "Built React and Redux apps with normalized client state and typed REST integration, raising measured UX scores 40%.",
      "Built a desk-demand forecasting model on historical occupancy by floor, day and team, served from Redis to 300+ offices; reported occupancy improved 30%.",
    ],
  },
  {
    title: "Product Intern",
    company: "EAT.FIT",
    location: "Bengaluru, India",
    period: "Sep 2021 – Dec 2021",
    core: [
      "Cut driver-tracking server cost 45% with distance-based polling and client-side interpolation that kept map movement smooth.",
    ],
    extra: [
      "Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.",
      "Shipped live order tracking on the Google Maps API with route polylines and a per-fix ETA, during a quarter of 25% user growth.",
      "Designed a polling fallback for when the socket drops, so customers never lose order updates.",
      "Automated competitor-catalog harvesting with a Python scraping toolchain that loads catalogs and reviews into the analytics warehouse on a schedule, normalized to one schema.",
    ],
  },
  {
    title: "Computer Vision Researcher",
    company: "DA-IICT",
    location: "Gandhinagar, India",
    period: "May 2021 – Aug 2021",
    core: [
      "Engineered an autonomous-driving perception stack in Python: radar and lidar capture, timestamp alignment, extrinsic calibration and point-cloud processing, with a replay harness over recorded drives.",
    ],
    extra: [
      "Compared early and late sensor fusion on identical sequences, showing point-level merging keeps detail but inherits both sensors' noise while object-level merging is robust but discards evidence.",
    ],
  },
];

// Default roles for a config that does not list its own.
export const ONE_PAGE_ROLES = [0, 1, 2, 4, 5];

export const education = [
  {
    school: "Arizona State University (ASU)",
    degree: "M.S., Computer Science | GPA: 4.0",
    location: "Tempe, AZ",
    detail: "",
    period: "Aug 2023 – May 2025",
  },
  {
    school: "Dhirubhai Ambani Institute of Information and Communication Technology",
    degree: "B.Tech., Information and Communication Technology",
    location: "Gandhinagar, India",
    detail: "",
    period: "Aug 2018 – May 2022",
  },
];

export const projects = [
  {
    name: "SRP Electric MCP Server",
    period: "Dec 2025 – Jan 2026",
    href: "https://github.com/architagrawal/srp-electric-mcp",
    core: "Built a Python/FastMCP integration exposing seven utility-account tools for billing, usage and outage queries, with an interactive setup wizard.",
    extra: [
      "Reverse-engineered the portal's login flow and API calls, since the utility publishes no API documentation.",
      "Added analysis prompts for usage trends, bill explanations, savings advice and account comparison on top of the raw data tools.",
    ],
  },
  {
    name: "MCP GitHub PR Review Agent",
    period: "Jul 2025 – Aug 2025",
    core: "Built a TypeScript PR-review integration combining code diffs, tickets and CI results into schema-validated inline findings.",
    extra: [
      "Processed large pull requests file by file to keep review context bounded and return individual verdicts.",
      "Made review comments idempotent across pushes and synchronized ticket context with Asana.",
    ],
  },
  {
    name: "AiJockey – AI DJ Pipeline",
    period: "2025 – Present",
    href: "https://github.com/architagrawal/aiJockey",
    core: "Built a PyTorch/FastAPI audio pipeline with stem separation, LLM transition planning and 25+ DSP transitions; ported inference to AMD MI300X.",
    extra: [
      "Trained a MERT-95M reward head to score audio segments across four aesthetic dimensions for candidate selection.",
      "Fine-tuned with DPO, KTO and IPO preference training; reduced DPO training loss from 0.68 to 0.47 on labeled pairs.",
    ],
  },
  {
    name: "PrismSplit",
    period: "2025 – Present",
    core: "Built a TypeScript/React Native expense app with transactional PostgreSQL billing and settlement, integer-cent accounting and offline write persistence.",
    extra: [
      "Added idempotency keys, real-time Supabase subscriptions and versioned persistence to handle retries and cached data across app upgrades.",
      "Wrote Jest unit and interaction tests, Maestro end-to-end flows and Android release-build checks.",
    ],
  },
  {
    name: "No-Code Pipeline Builder",
    period: "2025",
    core: "Built a React/ReactFlow workflow editor with typed nodes, undo/redo and autosave, backed by FastAPI graph validation.",
    extra: [
      "Tested editor history, persistence and keyboard interactions with Jest, React Testing Library and property-based tests.",
    ],
  },
  {
    name: "Image Recognition as a Service",
    period: "Jan 2024 – Feb 2024",
    core: "Built an AWS EC2/SQS image-processing service with queue-based scaling, asynchronous results and idempotent workers for safe message retries.",
    extra: [
      "Capped worker capacity and used scale-in cooldowns to control cost and prevent instance churn during changing demand.",
    ],
  },
  {
    name: "Clash Royale Analytics",
    period: "2025",
    core: "Built a serverless analytics platform on Cloudflare Workers and D1 with Drizzle ORM, fronted by Next.js 16 and React 19 on Vercel, with cross-filtered D3 visualizations.",
    extra: [
      "Built a scheduled ETL pipeline that dedupes battle data, loads incrementally and runs backfills without blocking the live cron, with Vitest coverage per stage.",
      "Shipped accessibility with skip navigation, focus traps, reduced-motion support and 44-pixel touch targets.",
    ],
  },
  {
    name: "Soccer Result Prediction",
    period: "Oct 2023 – Dec 2023",
    core: "Lifted match-outcome accuracy 12% by ensembling LSTM and XGBoost over rolling-window form features, with a time-based split that prevents leakage.",
    extra: [
      "Scored models on log loss, checked calibration with reliability plots and reported per-class recall for the hard draw class.",
    ],
  },
  {
    name: "Jet Engine Remaining Useful Life",
    period: "Oct 2024 – Dec 2024",
    core: "Predicted jet-engine remaining useful life from NASA CMAPSS sensor time series, engineering features and comparing machine learning, deep learning and generative regressors.",
    extra: [],
  },
  {
    name: "E-Commerce Platform",
    period: "Sep 2024 – Dec 2024",
    core: "Built an e-commerce platform with a Django REST API, React frontend, Stripe payments, PostgreSQL with Redis caching, Docker and GitHub Actions CI.",
    extra: [],
  },
  {
    name: "Serverless Document Pipeline",
    period: "Mar 2024 – Apr 2024",
    core: "Built a serverless document pipeline on AWS Lambda, API Gateway, S3 and DynamoDB with a React frontend, handling 1,000+ concurrent requests at 99.9% uptime.",
    extra: [
      "Automated EC2 instance management for heavier processing jobs, cutting processing time 40%.",
    ],
  },
  {
    name: "Task Management System",
    period: "Feb 2024 – May 2024",
    core: "Built a Flask and SQLAlchemy REST API with JWT auth and a React UI, enforcing permissions at the query layer and sending idempotent deadline notifications.",
    extra: [
      "Added optimistic UI with rollback on failure and a composite index on project, status and due date after the first version scanned the whole table.",
    ],
  },
];

// Two to five lines a recruiter and an ATS can scan. Only skills a bullet above
// or a linked repo can back up; nothing listed that has not been used for real.
export const skills = [
  { label: "Languages", items: "Python, TypeScript, JavaScript, SQL, C#" },
  { label: "Web & Data", items: "React, Nuxt, NestJS, FastAPI, .NET, PostgreSQL, Redis" },
  { label: "Cloud & Quality", items: "AWS, GCP, Docker, Kubernetes, CI/CD, pytest, Jest" },
];

// The detailed SWE version has space for the stack demonstrated in the
// experience, selected projects and portfolio. Keep the application version concise.
export const detailedSkills = [
  { label: "Languages", items: "TypeScript, JavaScript, Python, Java, SQL, C#, HTML, CSS" },
  { label: "Frontend", items: "React, Next.js, Vue/Nuxt, Angular, React Native, Redux, Zustand, TanStack Query, Tailwind CSS, Material UI, D3" },
  { label: "Backend & APIs", items: "Node.js, NestJS, Express, FastAPI, Django, Flask, .NET 8, REST APIs, WebSockets, JWT" },
  { label: "Databases & Search", items: "PostgreSQL, MySQL, Redis, DynamoDB, Firestore, Supabase, DuckDB, Algolia, Neo4j, pgvector" },
  { label: "Cloud & DevOps", items: "AWS (Lambda, API Gateway, S3, SQS, Step Functions, CDK), GCP Cloud Run, Vercel, Cloudflare Workers, Docker, Kubernetes, GitHub Actions" },
  { label: "Testing & Observability", items: "Jest, Vitest, React Testing Library, Maestro, pytest, Locust, SonarQube, Logfire, OpenTelemetry" },
  { label: "AI Applications", items: "AWS Bedrock, OpenAI, LangGraph, RAG, LLM evals, MCP" },
];

export const roleSkills = {
  ai: [
    { label: "Languages & APIs", items: "Python, TypeScript, SQL, FastAPI, NestJS, REST APIs" },
    { label: "AI Engineering", items: "AI agents, multi-agent systems, tool calling, RAG, GraphRAG, prompt engineering, LLM evals, LLM-as-judge, structured outputs, guardrails, fine-tuning (DPO)" },
    { label: "Models & Frameworks", items: "OpenAI, AWS Bedrock, Gemini, LangGraph, LangChain, MCP, PyTorch, Hugging Face" },
    { label: "Data & Cloud", items: "pgvector, FAISS, Neo4j, PostgreSQL, AWS, GCP, Docker, Kubernetes, Logfire, OpenTelemetry" },
  ],
  // Two-page AI version, the resume the site links to.
  aiDetailed: [
    { label: "Languages", items: "Python, TypeScript, JavaScript, SQL, C#" },
    { label: "AI Engineering", items: "AI agents, multi-agent systems, tool calling, agentic RAG, GraphRAG, hybrid search, context engineering, prompt engineering, structured outputs, guardrails, prompt caching, human-in-the-loop" },
    { label: "Evals & Observability", items: "LLM evals, LLM-as-judge, code-scored benchmarks, golden datasets, Prompt Flow, LLMOps, Logfire, OpenTelemetry, CloudWatch" },
    { label: "Models & Frameworks", items: "OpenAI, AWS Bedrock, Gemini, LangGraph, LangChain, Semantic Kernel, MCP, Hugging Face, llama.cpp" },
    { label: "ML & Training", items: "PyTorch, fine-tuning (DPO, KTO), reward models, embeddings, CUDA, ROCm" },
    { label: "Retrieval & Data", items: "Vector databases (pgvector, FAISS, Lance), Neo4j, DuckDB, PostgreSQL, Redis, Algolia, Firestore" },
    { label: "Backend & Cloud", items: "FastAPI, NestJS, Node.js, AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, GitHub Actions, pytest" },
  ],
  ml: [
    { label: "Languages & Models", items: "Python, SQL, PyTorch, Diffusers, NumPy, SciPy, statsmodels" },
    { label: "Retrieval & Evaluation", items: "FAISS, pgvector, Neo4j, RAG, LLM evaluation, LangGraph" },
    { label: "Serving & Cloud", items: "FastAPI, AWS Bedrock, GCP Cloud Run, Docker, pytest" },
  ],
  data: [
    { label: "Languages & Storage", items: "Python, SQL, TypeScript, S3, PostgreSQL, MySQL, DuckDB, DynamoDB, Firestore, Redis, SQLite" },
    { label: "Pipelines & Orchestration", items: "ETL, incremental loads, backfills, AWS Step Functions, Lambda, SQS, Cloud Run Jobs, Cloud Scheduler, Cloudflare Workers" },
    { label: "Data Modeling & Quality", items: "Data modeling, fact tables, data warehousing, data validation, data lineage, schema inference, deduplication, entity resolution" },
    { label: "DevOps", items: "Docker, Kubernetes, GitHub Actions, CI/CD, pytest, Vitest" },
  ],
  dataDetailed: [
    { label: "Languages", items: "Python, SQL, TypeScript, C#" },
    { label: "Storage & Query", items: "S3 data lake, DuckDB, Lance, PostgreSQL, MySQL, DynamoDB, Firestore, SQLite, Redis, Neo4j, pgvector, Algolia" },
    { label: "Pipelines & Orchestration", items: "ETL, batch and incremental loads, backfills, AWS Step Functions (Distributed Map), Lambda, SQS, LangGraph, GCP Cloud Run Jobs, Cloud Scheduler, Cloudflare Workers, Playwright" },
    { label: "Data Modeling & Quality", items: "Data modeling, fact tables, data warehousing, data validation, constraints, data lineage, schema inference, replayable runs, deduplication, entity resolution" },
    { label: "Governance & Reliability", items: "Row-level access control, idempotent reprocessing, circuit breakers, OpenTelemetry tracing" },
    { label: "DevOps", items: "Docker, Kubernetes, GitHub Actions, CI/CD, pytest, Vitest" },
  ],
  fullStack: [
    { label: "Languages", items: "TypeScript, JavaScript, Python, Java, SQL, HTML, CSS" },
    { label: "Frontend", items: "React, Next.js, Vue/Nuxt, Angular, React Native, Redux, TanStack Query, Tailwind CSS, Material UI, D3" },
    { label: "Backend & Data", items: "Node.js, NestJS, Express, FastAPI, Django, REST APIs, WebSockets, PostgreSQL, Redis, Supabase, Firestore" },
    { label: "Cloud & Testing", items: "AWS, GCP, Vercel, Docker, GitHub Actions, CI/CD, Jest, Vitest, React Testing Library" },
  ],
  backend: [
    { label: "Languages & Frameworks", items: "Python, TypeScript, Java, C#, SQL, Node.js, NestJS, FastAPI, Django, Flask, .NET 8" },
    { label: "Data & Messaging", items: "PostgreSQL, MySQL, Redis, DynamoDB, Firestore, AWS SQS, RabbitMQ, S3" },
    { label: "Systems", items: "Microservices, REST APIs, distributed systems, event-driven design, idempotency, caching, OpenTelemetry" },
    { label: "Cloud & DevOps", items: "AWS (Lambda, API Gateway, Step Functions, CDK), GCP, Docker, Kubernetes, GitHub Actions, CI/CD, Locust" },
  ],
  backendDetailed: [
    { label: "Languages", items: "Python, TypeScript, Java, C#, SQL, JavaScript" },
    { label: "Backend & APIs", items: "NestJS, FastAPI, Django, Flask, Node.js, Express, .NET 8, Dapper, MediatR, SQLAlchemy, REST APIs, WebSockets, JWT" },
    { label: "Data & Messaging", items: "PostgreSQL, MySQL, Redis, DynamoDB, Firestore, DuckDB, Algolia, Neo4j, AWS SQS, RabbitMQ, S3" },
    { label: "Systems", items: "Microservices, distributed systems, event-driven design, idempotency, concurrency control, caching, multi-tenancy, circuit breakers" },
    { label: "Observability & Testing", items: "OpenTelemetry, Logfire, CloudWatch, pytest, Vitest, Jest, Locust, SonarQube" },
    { label: "Cloud & DevOps", items: "AWS (Lambda, API Gateway, Step Functions, S3, CDK), GCP Cloud Run, Docker, Kubernetes, Nginx, GitHub Actions, CI/CD" },
  ],
  dataScience: [
    { label: "Languages & Libraries", items: "Python, SQL, pandas, NumPy, scikit-learn, XGBoost, SciPy, statsmodels, PyTorch, TensorFlow" },
    { label: "Statistics", items: "Hypothesis testing, A/B testing, experiment design, causal inference, regression, calibration, conformal prediction" },
    { label: "Machine Learning", items: "Classification, NLP, embeddings, clustering, recommendation, time series, forecasting, deep learning" },
    { label: "Evaluation & Visualization", items: "Model evaluation, log loss, F1, precision@k, inter-rater agreement, LLM evals, Plotly, D3, Vega-Lite" },
  ],
  dataScienceDetailed: [
    { label: "Languages & Libraries", items: "Python, SQL, pandas, NumPy, scikit-learn, XGBoost, SciPy, statsmodels, PyTorch, TensorFlow, Diffusers" },
    { label: "Statistics", items: "Hypothesis testing, A/B testing, experiment design, causal inference, regression, survey weighting, sampling, margin of error, conformal prediction" },
    { label: "Machine Learning", items: "Classification, NLP, text classification, embeddings, clustering, recommendation, ranking, time series, forecasting, deep learning (LSTM, CNN), fine-tuning (DPO)" },
    { label: "Evaluation", items: "Model evaluation, benchmark design, log loss, F1, precision@k, recall, calibration, inter-rater agreement, LLM-as-judge" },
    { label: "Data & Visualization", items: "DuckDB, PostgreSQL, pgvector, FAISS, Neo4j, AWS Bedrock, Plotly, D3, Vega-Lite" },
  ],
};
