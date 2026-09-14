// Single source of truth for every resume variant.
// Bullet form: verb + mechanism (named tech inline) + measured outcome.
// `core` bullets go on the one-page resume; `core` + `extra` go on the detailed one.
// There is deliberately no SKILLS section: every technology is named inside the
// experience or project bullet where it was actually used.

export const profile = {
  name: "ARCHIT AGRAWAL",
  contact: [
    "Tempe, AZ",
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
    company: "EdPlus, Arizona State University",
    location: "Tempe, AZ",
    period: "May 2026 – Present",
    core: [
      "Architected the agentic survey-analysis platform that retired every per-survey pipeline: 10 agents over 65 tools in TypeScript/NestJS on a Step Functions machine generated from a declarative graph, with Distributed Map fan-out and a 5% failure circuit breaker.",
      "Eliminated a silent failure mode dropping roughly 1 row in 8 unflagged: schema-constrained decoding, correlation tokens and citation checks took join integrity to 100% and label churn to zero across 258 runs.",
      "Isolated the dominant variable in labeling quality: model choice moved F1 by 0.230 against 0.007 for pipeline shape, 33x, redirecting the team's roadmap from orchestration to model selection.",
      "Retired the 0.637 accuracy baseline every prior claim rested on, after fresh runs reproduced it at 0.523 and traced the gap to a spreadsheet human-reviewed before delivery.",
      "Ran the platform with no database, on in-process DuckDB over per-run JSON with Lance retrieval from S3: ask latency held flat at 200x row volume, cross-scope queries over 216 runs in milliseconds.",
      "Authored the target architecture the production platform is built from: 80 logged decisions and 40 measured experiments, each stating what it does not establish.",
    ],
    extra: [
      "Shipped a 14-page Nuxt 4 front end over a NestJS API of ten modules, all compiling against one shared TypeScript contract.",
      "Built the governance surface: personal-data classification inside intake, Bedrock Guardrails deployed as their own CDK stack, entitlement-gated respondent-level retrieval, and per-stage spend caps enforced in code after an audit found the existing guard doing nothing.",
      "Cut labeling spend by calibrating codebook fit before any run: a 25-row sample separates a workable codebook (0.598 fit, 4% abstain) from an unusable one (0.316, 88%) for about $0.001.",
      "Unlocked a time axis on roughly 7 in 10 real exports that reported no date column while carrying the timestamp packed inside an identifier, through a five-stage intake that also survives UTF-16 null-byte headers and duplicate headers overwriting a column.",
      "Blocked a cross-survey join that silently double counted, using a respondent fingerprint to catch runs sharing respondents after a pooled breakdown counted each one twice behind a self-consistent denominator.",
      "Held every agent to improve-or-discard: no chart proposal beat the deterministic rule table across the evaluation corpus, so the rule table stayed.",
    ],
  },
  {
    title: "Founding AI/ML Engineer",
    company: "MyStage Music Inc.",
    location: "Remote",
    period: "Jul 2025 – May 2026",
    core: [
      "Owned the backend as founding engineer: re-architected a 14-Cloud-Function pipeline into one checkpointed LangGraph agent-worker on Cloud Run, cutting production service dependencies 64%, from 14 to 5.",
      "Built and operate a Playwright ingestion service indexing 70,000+ records a day across 650+ venues, with proxy rotation and atomic Firestore claim transactions making multi-worker retries idempotent.",
      "Lifted downstream search accuracy 25% with Gemini entity resolution and dedupe applied before records reach Firestore and Algolia.",
      "Delivered sub-50 ms search behind FastAPI and Algolia with real-time Firestore sync, traced by Logfire propagation that survives pause and resume, covered by 200+ pytest tests.",
    ],
    extra: [
      "Implemented a pause-for-research contract on LangGraph interrupt/resume: a missing domain enqueues research, the graph interrupts, then resumes from checkpoint when the external pipeline marks it ready, so a blocked record costs one venue rather than the day's batch.",
      "Used deterministic task IDs with create-and-catch-AlreadyExists rather than set, because set would clobber an in-flight task on retry.",
      "Built a reusable scraping subgraph factory compiled without a checkpointer so parent graphs compose it without nested-checkpoint conflicts, with a route-entry bridge letting webhook-sourced scrapes skip the fetch step.",
    ],
  },
  {
    title: "Software Engineer",
    company: "EdPlus, Arizona State University",
    location: "Tempe, AZ",
    period: "Sep 2023 – May 2025",
    core: [
      "Led end-to-end development of a multi-tenant RAG assistant used by 1,000+ faculty to author courses reaching 60,000+ students.",
      "Made transcript analysis 16x faster, 4 hours to 15 minutes, pairing a Neo4j knowledge graph with LLM-generated Cypher constrained to a schema allow-list.",
      "Enforced tenant isolation at retrieval rather than in the prompt, so one college's material cannot surface in another's answer, and made onboarding a college a config change, not a deployment.",
      "Shipped prompt changes on evidence with a Prompt Flow harness scoring groundedness, relevance and coherence on a fixed question set, plus hybrid retrieval for the course codes an embedding blurs.",
    ],
    extra: [
      "Raised engagement 35% and cut bounce 20% with React and Material UI surfaces over the assessment platform: bulk import, question reuse across banks, and a diff view before a bank is republished.",
      "Measured chunking rather than assuming it, comparing fixed-size against section-aware splitting on real course documents, because a policy paragraph cut in half answers half a question.",
      "Surfaced a citation with every answer, linking source document and section, so a faculty member can check a claim rather than trust it.",
    ],
  },
  {
    title: "Student Researcher",
    company: "Arizona State University",
    location: "Tempe, AZ",
    period: "Aug 2024 – May 2025",
    core: [
      "Built a PyTorch and Diffusers harness for text-to-video generation scoring physical plausibility separately from semantic fidelity, holding seed, resolution and sampler fixed so a score gap measures the model.",
      "Showed fluency and physical plausibility correlate only weakly, so a model ranked first on human preference can rank last on causality.",
    ],
    extra: [
      "Designed a frame-sequence rubric for rigid-body motion (does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on) and measured inter-rater agreement before trusting any aggregate score.",
      "Built a failure taxonomy from the annotated clips: broken object permanence, non-conserved mass, contact that teleports, and physics that silently resets at a scene cut.",
    ],
  },
  {
    title: "Data Research Aide",
    company: "Knowledge Exchange for Resilience, Arizona State University",
    location: "Tempe, AZ",
    period: "Jun 2024 – Aug 2024",
    core: [
      "Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j layer, choosing the index by measurement and stating the recall cost of leaving an exact one.",
      "Surfaced collaborator recommendations at 85% top-k precision from a FastAPI embedding service over Postgres/pgvector, fed by an idempotent ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8 with Dapper, MediatR and SQS.",
    ],
    extra: [
      "Cut API latency 90%, from 198 ms to 20 ms, with Redis caching and SQL rewrites, verified under Locust load rather than on a single warm request.",
      "Put the data-quality gates in Postgres rather than the loader (uniqueness, not-null, range), so bad rows fail at the boundary instead of being discovered in a report, raising dataset accuracy to 95%.",
      "Made the ETL idempotent on a natural key so a re-run after partial failure updates rather than duplicates, which is what let it be retried without a cleanup script.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Zeus Learning",
    location: "Mumbai, India",
    period: "Jan 2022 – Jul 2023",
    core: [
      "Shipped a Redis-backed desk-demand prediction service across 300+ Fortune 500 sites including Goldman Sachs and Merck, improving reported occupancy 30%.",
      "Split a .NET monolith into Kubernetes microservices as a strangler migration behind the existing API, no big-bang cutover; footprint down 35%, infrastructure cost down 20%.",
      "Cut deploy time 70% and production incidents 40% by making the SonarQube gate block the merge, scoped to new code so a legacy backlog could not neuter it on day one.",
    ],
    extra: [
      "Cut student-listing screen load 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full scan behind a join nobody had reviewed since the schema changed.",
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
      "Cut driver-location serving cost 45% by keying poll intervals to distance remaining, interpolating client-side so slower polling still rendered as continuous movement.",
    ],
    extra: [
      "Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.",
      "Built the live order-tracking screen on the Google Maps API with route polylines and an ETA recomputed on every fix, shipped during a quarter of 25% user growth.",
      "Wrote the degraded path deliberately: when the socket is unavailable the client falls back to polling rather than going silent, because a missed order update is a support ticket.",
    ],
  },
  {
    title: "Computer Vision Researcher",
    company: "DA-IICT",
    location: "Gandhinagar, India",
    period: "May 2021 – Aug 2021",
    core: [
      "Worked the autonomous-driving perception stack end to end in Python: radar and lidar capture, timestamp alignment, extrinsic calibration and point-cloud processing, with a replay harness over recorded drives so a perception change was attributable rather than anecdotal.",
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
