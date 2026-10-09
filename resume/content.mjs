// Single source of truth for every resume variant.
// Bullet form: verb + mechanism (named tech inline) + measured outcome.
// `core` bullets go on the one-page resume; `core` + `extra` go on the detailed one.
// There is deliberately no SKILLS section: every technology is named inside the
// experience or project bullet where it was actually used.

export const profile = {
  name: "ARCHIT AGRAWAL",
  contact: [
    "Phoenix, AZ",
    "623-312-0435",
    { text: "architagrawal000@gmail.com", href: "mailto:architagrawal000@gmail.com" },
    { text: "linkedin.com/in/agrawal-archit", label: "LinkedIn", href: "https://linkedin.com/in/agrawal-archit" },
    { text: "github.com/architagrawal", label: "GitHub", href: "https://github.com/architagrawal" },
    { text: "agrawal-archit.vercel.app", label: "Personal Website", href: "https://agrawal-archit.vercel.app" },
  ],
};

export const experience = [
  {
    title: "AI Software Engineer",
    company: "EdPlus",
    location: "Phoenix, AZ",
    period: "May 2026 – Present",
    core: [
      "Own the architecture, roadmap and delivery of a 12-agent AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, verified answers; TypeScript, NestJS, Nuxt.",
      "Cut wrong answers 85% on 164 published benchmark figures by reading every answer back in plain words and verifying it against the question before display.",
      "Extended analysis to statistical and causal questions with 25 tests and six causal estimators validated against scipy and statsmodels, scoring 68% on StatQA versus GPT-4o's best reported 64.83%.",
      "Quadrupled the insights automated reports surface, 13% to 52–59% on unseen datasets, by having an LLM agent choose the analyses while deterministic code computes every number.",
      "Eliminated a silent failure mislabeling 1 in 8 rows in the prior pipeline, reaching 100% join integrity with schema-constrained LLM output.",
      "Scaled labeling as a distributed Step Functions fan-out across 64 parallel lanes with a 5% failure circuit breaker, after tracing silent row loss in a run that reported success.",
    ],
    extra: [
      "Showed model choice moves accuracy 33x more than pipeline design across models costing $5–$89 per 100k rows, redirecting the team's recommendation from accuracy to reliability.",
      "Raised accuracy on the hardest benchmark questions from 60% to 93% with zero wrong answers, by routing every component through one shared semantic layer after larger models did not help.",
      "Benchmarked the platform against Claude Opus 5.5 working blind on public survey data, cutting wrong charts 93% with judge-free rule checks and an expert-calibrated LLM judge.",
      "Built a plain-English chart experience in Nuxt where readers stack, sort, filter, take top-N and undo directly, backed by in-process DuckDB that held latency flat as rows grew 200x.",
      "Designed a chart recommender over 17 chart types grounded in visualization research, accepting an LLM suggestion only when it outscores the rules.",
      "Accelerated publishing of a 51,280-person, 220-column federal survey 10x, 19 minutes to 109 seconds, with an independent audit from raw data matching 100% of figures.",
      "Engineered the storage layer: kilobyte fact tables beside Lance payloads on S3 queried in-process by DuckDB, choosing Lance over Parquet on 114,000 rows for full-text and vector search.",
      "Detected table shape with 98% accuracy and survey weights in 100% of files that ship one, up from 0%, so crosstabs, long tables and weighted surveys publish with no per-file code.",
      "Sped up a full AWS pipeline run 6x, 500 to 85 seconds, by replacing managed agent-runtime stages with direct tool calls once benchmarks showed each made one call and stopped.",
      "Shipped a 14-page Nuxt 4 front end over a NestJS API of 11 modules and 70 routes, all compiled against one shared TypeScript contract.",
      "Reset the team's accuracy baseline after tracing a reported 0.637 F1 to a hand-reviewed spreadsheet; fresh runs reproduce 0.523.",
      "Authored the target production architecture: 80 logged decisions and 200+ measured experiments, grounded in prior art including SSSOM, DDI, Metabase MBQL, Vega-Lite, Draco and LIDA.",
      "Delivered governance in the POC: Bedrock Guardrails as their own CDK stack, entitlement-gated respondent retrieval, and per-stage spend caps enforced in code.",
      "Kept deterministic rules wherever an agent failed to beat them: no LLM chart proposal outscored the rule table, and two managed agent runtimes were removed after re-benchmarking.",
      "Changed the evaluation from scoring charts to scoring the questions a survey asked, after healthy chart scores hid that only 19% were answered; coverage rose to 78%.",
      "Lowered labeling spend by testing codebook fit on a 25-row sample first, separating a workable codebook (0.598 fit) from an unusable one (0.316) for about $0.001.",
      "Unlocked a time axis on roughly 70% of real exports that hid timestamps inside identifiers, through a five-stage intake that also survives UTF-16 and duplicate-header files.",
      "Blocked a cross-survey join that double counted respondents, using a fingerprint that detects runs sharing the same people.",
    ],
  },
  {
    title: "Founding AI/ML Engineer",
    company: "MyStage Music Inc.",
    location: "Remote",
    period: "Jul 2025 – May 2026",
    core: [
      "Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.",
      "Scaled ingestion to 70,000+ records a day from 650+ venues with a Playwright pipeline, transactional locking and Gemini entity resolution that raised search-dataset accuracy 25%.",
      "Delivered sub-50 ms search on FastAPI and Algolia with real-time Firestore sync, 200+ pytest tests and Logfire tracing.",
    ],
    extra: [
      "Implemented pause-and-resume on LangGraph interrupts, so a record missing context waits at its checkpoint instead of failing the batch.",
      "Guaranteed retry safety with deterministic task IDs and create-if-absent writes, so a retried job can never overwrite one already in flight.",
      "Designed a reusable scraping subgraph that parent graphs compose without checkpoint conflicts, letting webhook-triggered scrapes skip the fetch step.",
    ],
  },
  {
    title: "Software Engineer",
    company: "EdPlus",
    location: "Phoenix, AZ",
    period: "Sep 2023 – May 2025",
    core: [
      "Led a multi-tenant RAG assistant, React to retrieval layer, used by 1,000+ faculty to build courses for 60,000+ students.",
      "Cut transcript analysis 16x, four hours to 15 minutes, with a Neo4j knowledge graph queried by validated LLM-written Cypher.",
      "Isolated each college's data at the retrieval layer, so no tenant's material can surface in another's and onboarding became a config change, not a deployment.",
      "Built a Prompt Flow eval harness scoring groundedness, relevance and coherence to gate every prompt change on results.",
    ],
    extra: [
      "Added hybrid keyword and vector search so exact course codes resolve correctly where embeddings alone blur them together.",
      "Raised engagement 35% and reduced bounce 20% with React and Material UI tools for the assessment platform: bulk import, cross-bank question reuse and a diff view before republishing.",
      "Compared fixed-size against section-aware chunking on real course documents before choosing, because a split policy paragraph answers half a question.",
      "Attached a source citation to every answer, linking document and section, so faculty can verify a claim instead of trusting it.",
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
    location: "Phoenix, AZ",
    period: "Jun 2024 – Aug 2024",
    core: [
      "Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j search layer.",
      "Built a FastAPI and pgvector recommender reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8.",
      "Lowered API latency 90% with Redis caching and SQL rewrites, and raised dataset accuracy to 95% with PostgreSQL constraints.",
    ],
    extra: [
      "Rewrote the ETL to be idempotent on a natural key, so a rerun after partial failure updates rows rather than duplicating them.",
      "Raised dataset accuracy to 95% by enforcing uniqueness, not-null and range checks in PostgreSQL, so bad rows fail at the boundary instead of in a report.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Zeus Learning",
    location: "Mumbai, India",
    period: "Jan 2022 – Jul 2023",
    core: [
      "Built a Redis-backed desk-demand forecasting service used in 300+ Fortune 500 offices, with reported occupancy up 30%.",
      "Cut deploy time 70% and production incidents 40% by containerizing the CI/CD release pipeline and adding SonarQube gates.",
      "Migrated a C# .NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and footprint 35%.",
    ],
    extra: [
      "Sped up the student-listing screen 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full table scan.",
      "Right-sized Kubernetes requests and limits to observed usage, which is where the 35% footprint reduction came from.",
      "Published an internal npm package wrapping the Slack Web API with pagination, released under semver for the company social platform.",
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

// The one-pager carries the roles a hiring manager expects to see; the detailed
// variant carries everything.
export const ONE_PAGE_ROLES = [0, 1, 2, 4, 5];
// Projects on the one-pager, by index into `projects`.
export const ONE_PAGE_PROJECTS = [0, 2];

export const education = [
  {
    school: "Arizona State University (ASU)",
    degree: "Master of Science, Computer Science",
    location: "Tempe, AZ, USA",
    detail: "GPA: 4.0",
    period: "Aug 2023 – May 2025",
  },
  {
    school: "Dhirubhai Ambani Institute of Information and Communication Technology",
    degree: "Bachelor of Technology, Information and Communication Technology",
    location: "India",
    detail: "",
    period: "Aug 2018 – May 2022",
  },
];

export const projects = [
  {
    name: "SRP Electric MCP Server",
    period: "Dec 2025 – Jan 2026",
    href: "https://github.com/architagrawal/srp-electric-mcp",
    core: "Reverse-engineered an undocumented utility portal into a read-only TypeScript MCP server with Zod-validated tool schemas, normalized meter data and typed errors an agent can act on.",
    extra: [
      "Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.",
      "Rate-limited and cached server-side, because a portal built for humans clicking does not expect an agent asking for a year of 15-minute intervals in a loop.",
    ],
  },
  {
    name: "MCP GitHub PR Review Agent",
    period: "Jul 2025 – Aug 2025",
    core: "Built a TypeScript MCP service that reviews pull requests from the diff, linked ticket and CI result, returning schema-typed inline findings that gate merges by category.",
    extra: [
      "Reviews large PRs file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.",
      "Made the bot idempotent across pushes after the first version stacked eleven comments on one branch, and wired Asana both ways off the branch-name ticket id.",
    ],
  },
  {
    name: "AiJockey – AI DJ Pipeline",
    period: "2025 – Present",
    href: "https://github.com/architagrawal/aiJockey",
    core: "Built an end-to-end AI DJ in PyTorch and FastAPI: stem separation, an LLM transition planner, 25+ DSP transitions and LUFS mastering, ported off CUDA to an AMD MI300X.",
    extra: [
      "Trained a MERT-95M reward head predicting four-axis audio aesthetics (final MSE 0.127) so the segment picker scores candidates without running full inference per render.",
      "Built DPO/KTO/IPO trainer variants for preference tuning, cutting DPO loss 31% (0.68 to 0.47) on labeled preference pairs.",
    ],
  },
];

// Two to five lines a recruiter and an ATS can scan. Only skills a bullet above
// or a linked repo can back up; nothing listed that has not been used for real.
export const skills = [
  { label: "Languages", items: "Python, TypeScript, JavaScript, SQL, C#" },
  { label: "Frameworks", items: "FastAPI, NestJS, Node.js, .NET, React, Vue/Nuxt, Next.js, LangGraph, PyTorch" },
  { label: "AI & Data", items: "RAG, LLM evaluation, MCP, AWS Bedrock, PostgreSQL, pgvector, FAISS, Neo4j, Redis, DuckDB, ETL pipelines" },
  { label: "Cloud & DevOps", items: "AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD" },
];
