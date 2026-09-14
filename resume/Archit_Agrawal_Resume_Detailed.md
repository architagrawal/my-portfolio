# ARCHIT AGRAWAL

Tempe, AZ | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [linkedin.com/in/agrawal-archit](https://linkedin.com/in/agrawal-archit) | [github.com/architagrawal](https://github.com/architagrawal) | [agrawal-archit.vercel.app](https://agrawal-archit.vercel.app)

## EXPERIENCE

### AI Software Engineer - EdPlus, Arizona State University

Tempe, AZ | May 2026 – Present

- Architected the agentic survey-analysis platform that retired every per-survey pipeline: 10 agents over 65 tools in TypeScript/NestJS on a Step Functions machine generated from a declarative graph, with Distributed Map fan-out and a 5% failure circuit breaker.
- Eliminated a silent failure mode dropping roughly 1 row in 8 unflagged: schema-constrained decoding, correlation tokens and citation checks took join integrity to 100% and label churn to zero across 258 runs.
- Isolated the dominant variable in labeling quality: model choice moved F1 by 0.230 against 0.007 for pipeline shape, 33x, redirecting the team's roadmap from orchestration to model selection.
- Retired the 0.637 accuracy baseline every prior claim rested on, after fresh runs reproduced it at 0.523 and traced the gap to a spreadsheet human-reviewed before delivery.
- Ran the platform with no database, on in-process DuckDB over per-run JSON with Lance retrieval from S3: ask latency held flat at 200x row volume, cross-scope queries over 216 runs in milliseconds.
- Authored the target architecture the production platform is built from: 80 logged decisions and 40 measured experiments, each stating what it does not establish.
- Shipped a 14-page Nuxt 4 front end over a NestJS API of ten modules, all compiling against one shared TypeScript contract.
- Built the governance surface: personal-data classification inside intake, Bedrock Guardrails deployed as their own CDK stack, entitlement-gated respondent-level retrieval, and per-stage spend caps enforced in code after an audit found the existing guard doing nothing.
- Cut labeling spend by calibrating codebook fit before any run: a 25-row sample separates a workable codebook (0.598 fit, 4% abstain) from an unusable one (0.316, 88%) for about $0.001.
- Unlocked a time axis on roughly 7 in 10 real exports that reported no date column while carrying the timestamp packed inside an identifier, through a five-stage intake that also survives UTF-16 null-byte headers and duplicate headers overwriting a column.

### Founding AI/ML Engineer - MyStage Music Inc.

Remote | Jul 2025 – May 2026

- Owned the backend as founding engineer: re-architected a 14-Cloud-Function pipeline into one checkpointed LangGraph agent-worker on Cloud Run, cutting production service dependencies 64%, from 14 to 5.
- Built and operate a Playwright ingestion service indexing 70,000+ records a day across 650+ venues, with proxy rotation and atomic Firestore claim transactions making multi-worker retries idempotent.
- Lifted downstream search accuracy 25% with Gemini entity resolution and dedupe applied before records reach Firestore and Algolia.
- Delivered sub-50 ms search behind FastAPI and Algolia with real-time Firestore sync, traced by Logfire propagation that survives pause and resume, covered by 200+ pytest tests.
- Implemented a pause-for-research contract on LangGraph interrupt/resume: a missing domain enqueues research, the graph interrupts, then resumes from checkpoint when the external pipeline marks it ready, so a blocked record costs one venue rather than the day's batch.
- Used deterministic task IDs with create-and-catch-AlreadyExists rather than set, because set would clobber an in-flight task on retry.

### Software Engineer - EdPlus, Arizona State University

Tempe, AZ | Sep 2023 – May 2025

- Led end-to-end development of a multi-tenant RAG assistant used by 1,000+ faculty to author courses reaching 60,000+ students.
- Made transcript analysis 16x faster, 4 hours to 15 minutes, pairing a Neo4j knowledge graph with LLM-generated Cypher constrained to a schema allow-list.
- Enforced tenant isolation at retrieval rather than in the prompt, so one college's material cannot surface in another's answer, and made onboarding a college a config change, not a deployment.
- Shipped prompt changes on evidence with a Prompt Flow harness scoring groundedness, relevance and coherence on a fixed question set, plus hybrid retrieval for the course codes an embedding blurs.
- Raised engagement 35% and cut bounce 20% with React and Material UI surfaces over the assessment platform: bulk import, question reuse across banks, and a diff view before a bank is republished.
- Measured chunking rather than assuming it, comparing fixed-size against section-aware splitting on real course documents, because a policy paragraph cut in half answers half a question.

### Student Researcher - Arizona State University

Tempe, AZ | Aug 2024 – May 2025

- Built a PyTorch and Diffusers harness for text-to-video generation scoring physical plausibility separately from semantic fidelity, holding seed, resolution and sampler fixed so a score gap measures the model.
- Showed fluency and physical plausibility correlate only weakly, so a model ranked first on human preference can rank last on causality.
- Designed a frame-sequence rubric for rigid-body motion (does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on) and measured inter-rater agreement before trusting any aggregate score.

### Data Research Aide - Knowledge Exchange for Resilience, Arizona State University

Tempe, AZ | Jun 2024 – Aug 2024

- Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j layer, choosing the index by measurement and stating the recall cost of leaving an exact one.
- Surfaced collaborator recommendations at 85% top-k precision from a FastAPI embedding service over Postgres/pgvector, fed by an idempotent ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8 with Dapper, MediatR and SQS.
- Cut API latency 90%, from 198 ms to 20 ms, with Redis caching and SQL rewrites, verified under Locust load rather than on a single warm request.

### Software Engineer - Zeus Learning

Mumbai, India | Jan 2022 – Jul 2023

- Shipped a Redis-backed desk-demand prediction service across 300+ Fortune 500 sites including Goldman Sachs and Merck, improving reported occupancy 30%.
- Split a .NET monolith into Kubernetes microservices as a strangler migration behind the existing API, no big-bang cutover; footprint down 35%, infrastructure cost down 20%.
- Cut deploy time 70% and production incidents 40% by making the SonarQube gate block the merge, scoped to new code so a legacy backlog could not neuter it on day one.
- Cut student-listing screen load 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full scan behind a join nobody had reviewed since the schema changed.

### Product Intern - EAT.FIT

Bengaluru, India | Sep 2021 – Dec 2021

- Cut driver-location serving cost 45% by keying poll intervals to distance remaining, interpolating client-side so slower polling still rendered as continuous movement.
- Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.

### Computer Vision Researcher - DA-IICT

Gandhinagar, India | May 2021 – Aug 2021

- Worked the autonomous-driving perception stack end to end in Python: radar and lidar capture, timestamp alignment, extrinsic calibration and point-cloud processing, with a replay harness over recorded drives so a perception change was attributable rather than anecdotal.
- Compared early against late sensor fusion on identical sequences: point-level merging preserves detail and inherits both sensors' noise, object-level merging is robust and discards the evidence that would have resolved the disagreement.

## PROJECTS

### SRP Electric MCP Server

Dec 2025 – Jan 2026

- Reverse-engineered an undocumented utility portal's session contract and exposed it as a read-only TypeScript MCP server with Zod-validated tool schemas, normalized interval meter data, and typed errors an agent can act on, backed by a fixture test suite that runs without credentials.
- Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.

### MCP GitHub PR Review Agent

Jul 2025 – Aug 2025

- Built a TypeScript MCP service that assembles the diff, neighbouring files, linked ticket criteria and CI result in a fixed order before reasoning, returns findings as a schema (file, line, category, severity, rationale) rendered as inline comments, and gates merges on category rather than volume.
- Reviews large PRs file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.

### AiJockey – AI DJ Pipeline

2025 – Present

- Built an end-to-end AI DJ pipeline in PyTorch and FastAPI: Demucs stem separation, BPM and phrase analysis, an LLM transition planner, 25+ DSP transition modules and adaptive LUFS mastering, running on a ROCm MI300X container as a non-CUDA port.
- Trained a MERT-95M reward head predicting four-axis audio aesthetics (final MSE 0.127) so the segment picker scores candidates without running full inference per render.

## EDUCATION

**M.S., Computer Science**, Arizona State University, GPA 4.0 | Aug 2023 – May 2025  
**B.Tech., Information and Communication Technology**, DA-IICT | Aug 2018 – May 2022  
