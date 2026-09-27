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
    { text: "linkedin.com/in/agrawal-archit", href: "https://linkedin.com/in/agrawal-archit" },
    { text: "github.com/architagrawal", href: "https://github.com/architagrawal" },
    { text: "agrawal-archit.vercel.app", href: "https://agrawal-archit.vercel.app" },
  ],
};

export const experience = [
  {
    title: "AI Software Engineer",
    company: "EdPlus",
    location: "Phoenix, AZ",
    period: "May 2026 – Present",
    core: [
      "Architected and own a 12-agent analytics platform turning any structured dataset into charts and cited answers with zero per-dataset code; TypeScript, NestJS, AWS Bedrock, Step Functions.",
      "Built the Nuxt front end where a plain-English question returns an interactive chart with sort, filter, top-N and undo, on in-process DuckDB holding latency flat at 200x row volume.",
      "Designed a rules-based chart selector across 17 chart types grounded in visualization research; an LLM suggestion is used only if it scores better, so AI cannot worsen a chart.",
      "Quadrupled insight recall in automated reports, 13% to 52-59% on held-out datasets, by letting an agent pick the analyses while deterministic code computes every number.",
      "Caught a silent bug mislabeling 13% of rows before it reached institutional reports, reaching 100% join integrity with schema-constrained LLM output and citation checks.",
      "Showed model choice moves F1 33x more than pipeline architecture, across models costing $5 to $89 per 100k rows, redirecting the team roadmap toward model selection.",
      "Found the team's headline accuracy of 0.637 could not be reproduced, fresh runs scoring 0.523, traced it to a hand-reviewed spreadsheet and reset the baseline.",
    ],
    extra: [
      "Shipped a 14-page Nuxt 4 front end over a NestJS API of ten modules, all compiling against one shared TypeScript contract.",
      "Authored the target architecture the production platform is built from: 80 logged decisions and 200 measured experiments, each stating what it does not establish, grounded in 12 prior-art passes across SSSOM, DDI, Metabase MBQL, Vega-Lite, Draco and LIDA.",
      "Reset the benchmark the team reported against after fresh runs reproduced its 0.637 baseline at 0.523, tracing the gap to a spreadsheet hand-reviewed before delivery.",
      "Reset the benchmark the team reported against after fresh runs reproduced its 0.637 baseline at 0.523, tracing the gap to a spreadsheet hand-reviewed before delivery.",
      "Changed what the evaluation measured after every chart-level score stayed healthy while the page answered 6 of the 32 questions a survey actually asked; scoring coverage instead of marks took it to 25 of 32.",
      "Held every agent to improve-or-discard: no chart proposal beat the deterministic rule table across the evaluation corpus, so the rule table stayed, and two managed agent runtimes were removed once a repeat benchmark showed 49.8s of a 65.4s stage was container boot for a decision that never varied.",
      "Built the governance surface: Bedrock Guardrails deployed as their own CDK stack, entitlement-gated respondent-level retrieval, and per-stage spend caps enforced in code after an audit found the existing guard doing nothing.",
      "Cut labeling spend by calibrating codebook fit before any run: a 25-row sample separates a workable codebook (0.598 fit, 4% abstain) from an unusable one (0.316, 88%) for about $0.001.",
      "Unlocked a time axis on roughly 7 in 10 real exports that reported no date column while carrying the timestamp packed inside an identifier, through a five-stage intake that also survives UTF-16 null-byte headers and duplicate headers overwriting a column.",
      "Blocked a cross-survey join that silently double counted, using a respondent fingerprint to catch runs sharing respondents after a pooled breakdown counted each one twice behind a self-consistent denominator.",
    ],
  },
  {
    title: "Founding AI/ML Engineer",
    company: "MyStage Music Inc.",
    location: "Remote",
    period: "Jul 2025 – May 2026",
    core: [
      "Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.",
      "Built a Playwright ingestion pipeline handling 70,000+ records a day from 650+ venues, with transactional locking against duplicate work and Gemini entity resolution raising dataset accuracy 25%.",
      "Delivered sub-50 ms search on FastAPI and Algolia with real-time Firestore sync, covered by 200+ pytest tests and end-to-end Logfire tracing.",
    ],
    extra: [
      "Implemented a pause-for-research contract on LangGraph interrupt/resume: a missing domain enqueues research, the graph interrupts, then resumes from checkpoint when the external pipeline marks it ready, so a blocked record costs one venue rather than the day's batch.",
      "Used deterministic task IDs with create-and-catch-AlreadyExists rather than set, because set would clobber an in-flight task on retry.",
      "Designed a reusable scraping subgraph factory compiled without a checkpointer so parent graphs compose it without nested-checkpoint conflicts, with a route-entry bridge letting webhook-sourced scrapes skip the fetch step.",
    ],
  },
  {
    title: "Software Engineer",
    company: "EdPlus",
    location: "Phoenix, AZ",
    period: "Sep 2023 – May 2025",
    core: [
      "Led end-to-end development of a multi-tenant RAG assistant, React front end to retrieval layer, used by 1,000+ faculty to author courses reaching 60,000+ students.",
      "Cut transcript analysis from 4 hours to 15 minutes, 16x, with a Neo4j knowledge graph queried by schema-validated LLM-generated Cypher.",
      "Enforced per-college data isolation at the retrieval layer so one tenant's material cannot surface in another's, making onboarding a config change, not a deployment.",
      "Built a Prompt Flow evaluation harness scoring groundedness, relevance and coherence, so every prompt change shipped on evidence rather than opinion.",
    ],
    extra: [
      "Added hybrid keyword and vector search to fix course-code lookups an embedding alone blurs together.",
      "Raised engagement 35% and cut bounce 20% with React and Material UI surfaces over the assessment platform: bulk import, question reuse across banks, and a diff view before a bank is republished.",
      "Measured chunking rather than assuming it, comparing fixed-size against section-aware splitting on real course documents, because a policy paragraph cut in half answers half a question.",
      "Surfaced a citation with every answer, linking source document and section, so a faculty member can check a claim rather than trust it.",
    ],
  },
  {
    title: "Student Researcher",
    company: "Arizona State University",
    location: "Phoenix, AZ",
    period: "Aug 2024 – May 2025",
    core: [
      "Built a PyTorch and Diffusers benchmark for text-to-video models scoring physical plausibility separately from visual quality, with seed, resolution and sampler held fixed.",
      "Showed visual fluency and physical plausibility correlate only weakly: the model ranked first on human preference ranked last on causality.",
    ],
    extra: [
      "Designed a frame-sequence rubric for rigid-body motion (does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on) and measured inter-rater agreement before trusting any aggregate score.",
      "Derived a failure taxonomy from the annotated clips: broken object permanence, non-conserved mass, contact that teleports, and physics that silently resets at a scene cut.",
    ],
  },
  {
    title: "Data Research Aide",
    company: "Knowledge Exchange for Resilience, Arizona State University",
    location: "Phoenix, AZ",
    period: "Jun 2024 – Aug 2024",
    core: [
      "Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j search layer.",
      "Built a FastAPI and pgvector recommendation service reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, alongside 20+ REST APIs on .NET 8.",
    ],
    extra: [
      "Reduced API latency 90%, from 198 ms to 20 ms, with Redis caching and SQL rewrites, verified under Locust load rather than on a single warm request.",
      "Put the data-quality gates in Postgres rather than the loader (uniqueness, not-null, range), so bad rows fail at the boundary instead of being discovered in a report, raising dataset accuracy to 95%.",
      "Rewrote the ETL to be idempotent on a natural key so a re-run after partial failure updates rather than duplicates, which is what let it be retried without a cleanup script.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Zeus Learning",
    location: "Mumbai, India",
    period: "Jan 2022 – Jul 2023",
    core: [
      "Built a Redis-backed desk-demand forecasting service used across 300+ Fortune 500 offices including Goldman Sachs and Merck, with reported desk occupancy up 30%.",
      "Cut deploy time 70% and production incidents 40% by containerising the release pipeline and adding SonarQube quality gates scoped to new code.",
      "Migrated a C# and .NET monolith to Dockerised Kubernetes microservices incrementally behind the existing API, cutting infrastructure cost 20% and footprint 35%.",
    ],
    extra: [
      "Sped up the student-listing screen 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full scan behind a join nobody had reviewed since the schema changed.",
      "Found the 35% footprint cut in requests and limits rather than the code: pods had been provisioned for a peak the observed usage never reached.",
      "Published an internal npm package wrapping the Slack Web API for paginated message, attachment and reaction retrieval, released under semver and consumed by the company social platform.",
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
      "Shipped the live order-tracking screen on the Google Maps API with route polylines and an ETA recomputed on every fix, shipped during a quarter of 25% user growth.",
      "Wrote the degraded path deliberately: when the socket is unavailable the client falls back to polling rather than going silent, because a missed order update is a support ticket.",
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
      "Compared early against late sensor fusion on identical sequences: point-level merging preserves detail and inherits both sensors' noise, object-level merging is robust and discards the evidence that would have resolved the disagreement.",
    ],
  },
];

// The one-pager carries the roles a hiring manager expects to see; the detailed
// variant carries everything.
export const ONE_PAGE_ROLES = [0, 1, 2, 3, 4, 5, 6];

export const education = [
  {
    degree: "M.S., Computer Science",
    school: "Arizona State University",
    detail: "GPA 4.0",
    period: "Aug 2023 – May 2025",
  },
  {
    degree: "B.Tech., Information and Communication Technology",
    school: "DA-IICT",
    detail: "",
    period: "Aug 2018 – May 2022",
  },
];

export const projects = [
  {
    name: "SRP Electric MCP Server",
    period: "Dec 2025 – Jan 2026",
    core: "Reverse-engineered an undocumented utility portal's session contract and exposed it as a read-only TypeScript MCP server with Zod-validated tool schemas, normalized interval meter data, and typed errors an agent can act on, backed by a fixture test suite that runs without credentials.",
    extra: [
      "Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.",
      "Rate-limited and cached server-side, because a portal built for humans clicking does not expect an agent asking for a year of 15-minute intervals in a loop.",
    ],
  },
  {
    name: "MCP GitHub PR Review Agent",
    period: "Jul 2025 – Aug 2025",
    core: "Built a TypeScript MCP service that assembles the diff, neighbouring files, linked ticket criteria and CI result in a fixed order before reasoning, returns findings as a schema (file, line, category, severity, rationale) rendered as inline comments, and gates merges on category rather than volume.",
    extra: [
      "Reviews large PRs file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.",
      "Made the bot idempotent across pushes after the first version stacked eleven comments on one branch, and wired Asana both ways off the branch-name ticket id.",
    ],
  },
  {
    name: "AiJockey – AI DJ Pipeline",
    period: "2025 – Present",
    core: "Built an end-to-end AI DJ pipeline in PyTorch and FastAPI: Demucs stem separation, BPM and phrase analysis, an LLM transition planner, 25+ DSP transition modules and adaptive LUFS mastering, running on a ROCm MI300X container as a non-CUDA port.",
    extra: [
      "Trained a MERT-95M reward head predicting four-axis audio aesthetics (final MSE 0.127) so the segment picker scores candidates without running full inference per render.",
      "Built DPO/KTO/IPO trainer variants for preference tuning; DPO converged 0.68 to 0.47 on labeled preference pairs.",
    ],
  },
];
