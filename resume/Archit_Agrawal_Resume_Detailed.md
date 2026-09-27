# ARCHIT AGRAWAL

Phoenix, AZ | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [linkedin.com/in/agrawal-archit](https://linkedin.com/in/agrawal-archit) | [github.com/architagrawal](https://github.com/architagrawal) | [agrawal-archit.vercel.app](https://agrawal-archit.vercel.app)

## EXPERIENCE

### AI Software Engineer - EdPlus

Phoenix, AZ | May 2026 – Present

- Architected and currently own a 12-agent analytics platform turning any structured dataset into interactive charts and cited answers without dataset-specific code; TypeScript, NestJS, AWS Bedrock, Step Functions.
- Designed a deterministic chart selector across 17 chart types grounded in visualization research, accepting an LLM recommendation only when it outscores the rules-based baseline.
- Quadrupled insight recall in automated reports, from 13% to 52–59% on held-out datasets, by letting an agent pick the analyses while deterministic code computes every number.
- Stopped a silent defect mislabeling 13% of rows before it reached institutional reports, reaching 100% join integrity with schema-constrained LLM output and citation validation.
- Benchmarked models and pipeline variants at $5–$89 per 100k rows, finding model choice swung F1 33x more than architecture; traced a reported 0.637 accuracy to a hand-reviewed spreadsheet and set a reproducible 0.523 baseline.
- Built the Nuxt front end where a plain-English question returns an interactive chart with sort, filter, top-N and undo, backed by in-process DuckDB holding latency steady as data volume grew 200x.
- Shipped a 14-page Nuxt 4 front end over a NestJS API of ten modules, all compiling against one shared TypeScript contract.
- Authored the target architecture the production platform is built from: 80 logged decisions and 200 measured experiments, each stating what it does not establish, grounded in 12 prior-art passes across SSSOM, DDI, Metabase MBQL, Vega-Lite, Draco and LIDA.
- Changed what the evaluation measured after every chart-level score stayed healthy while the page answered 6 of the 32 questions a survey actually asked; scoring coverage instead of marks took it to 25 of 32.

### Founding AI/ML Engineer - MyStage Music Inc.

Remote | Jul 2025 – May 2026

- Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.
- Built a Playwright ingestion pipeline handling 70,000+ records a day from 650+ venues, with transactional locking against duplicate work and Gemini entity resolution raising dataset accuracy 25%.
- Delivered sub-50 ms search on FastAPI and Algolia with real-time Firestore sync, covered by 200+ pytest tests and end-to-end Logfire tracing.
- Implemented a pause-for-research contract on LangGraph interrupt/resume: a missing domain enqueues research, the graph interrupts, then resumes from checkpoint when the external pipeline marks it ready, so a blocked record costs one venue rather than the day's batch.
- Used deterministic task IDs with create-and-catch-AlreadyExists rather than set, because set would clobber an in-flight task on retry.

### Software Engineer - EdPlus

Phoenix, AZ | Sep 2023 – May 2025

- Led end-to-end development of a multi-tenant RAG assistant, React front end to retrieval layer, used by 1,000+ faculty to author courses reaching 60,000+ students.
- Reduced transcript-analysis time 16x, from four hours to 15 minutes, with a Neo4j knowledge graph queried by schema-validated LLM-generated Cypher.
- Enforced per-college data isolation at the retrieval layer so one tenant's material cannot surface in another's, making onboarding a config change, not a deployment.
- Built a Prompt Flow evaluation harness scoring groundedness, relevance and coherence, so every prompt change shipped on evidence rather than opinion.
- Added hybrid keyword and vector search to fix course-code lookups an embedding alone blurs together.
- Raised engagement 35% and cut bounce 20% with React and Material UI surfaces over the assessment platform: bulk import, question reuse across banks, and a diff view before a bank is republished.

### Student Researcher - Arizona State University

Phoenix, AZ | Aug 2024 – May 2025

- Built a PyTorch and Diffusers benchmark for text-to-video models scoring physical plausibility separately from visual quality, with seed, resolution and sampler held fixed.
- Demonstrated weak correlation between visual quality and physical plausibility: the model ranked first in human preference but last in causal consistency.
- Designed a frame-sequence rubric for rigid-body motion (does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on) and measured inter-rater agreement before trusting any aggregate score.

### Data Research Aide - Knowledge Exchange for Resilience, Arizona State University

Phoenix, AZ | Jun 2024 – Aug 2024

- Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j search layer.
- Built a FastAPI and pgvector recommendation service reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, alongside 20+ REST APIs on .NET 8.
- Reduced API latency 90%, from 198 ms to 20 ms, with Redis caching and SQL rewrites, verified under Locust load rather than on a single warm request.

### Software Engineer - Zeus Learning

Mumbai, India | Jan 2022 – Jul 2023

- Built a Redis-backed desk-demand forecasting service used across 300+ offices at Fortune 500 companies, with reported desk occupancy up 30%.
- Cut deploy time 70% and production incidents 40% by containerizing the release pipeline and adding SonarQube quality gates scoped to new code.
- Migrated a C# and .NET monolith to Dockerized Kubernetes microservices incrementally behind the existing API, cutting infrastructure cost 20% and footprint 35%.
- Sped up the student-listing screen 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full scan behind a join nobody had reviewed since the schema changed.

### Product Intern - EAT.FIT

Bengaluru, India | Sep 2021 – Dec 2021

- Cut driver-tracking server cost 45% with distance-based polling and client-side interpolation that kept map movement smooth.
- Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.

### Computer Vision Researcher - DA-IICT

Gandhinagar, India | May 2021 – Aug 2021

- Engineered an autonomous-driving perception stack in Python: radar and lidar capture, timestamp alignment, extrinsic calibration and point-cloud processing, with a replay harness over recorded drives.
- Compared early against late sensor fusion on identical sequences: point-level merging preserves detail and inherits both sensors' noise, object-level merging is robust and discards the evidence that would have resolved the disagreement.

## PROJECTS

### SRP Electric MCP Server

Dec 2025 – Jan 2026

- Reverse-engineered an undocumented utility portal's session contract and exposed it as a read-only TypeScript MCP server with Zod-validated tool schemas, normalized interval meter data, and typed errors an agent can act on, backed by a fixture test suite that runs without credentials.
- Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.

### MCP GitHub PR Review Agent

Jul 2025 – Aug 2025

- Built a TypeScript MCP service that assembles the diff, neighboring files, linked ticket criteria and CI result in a fixed order before reasoning, returns findings as a schema (file, line, category, severity, rationale) rendered as inline comments, and gates merges on category rather than volume.
- Reviews large PRs file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.

### AiJockey – AI DJ Pipeline

2025 – Present

- Built an end-to-end AI DJ pipeline in PyTorch and FastAPI: Demucs stem separation, BPM and phrase analysis, an LLM transition planner, 25+ DSP transition modules and adaptive LUFS mastering, running on a ROCm MI300X container as a non-CUDA port.
- Trained a MERT-95M reward head predicting four-axis audio aesthetics (final MSE 0.127) so the segment picker scores candidates without running full inference per render.

## EDUCATION

**M.S., Computer Science**, Arizona State University, GPA 4.0 | Aug 2023 – May 2025  
**B.Tech., Information and Communication Technology**, DA-IICT | Aug 2018 – May 2022  
