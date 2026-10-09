# ARCHIT AGRAWAL

Phoenix, AZ | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Personal Website](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus | 05/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own the architecture, roadmap and delivery of a 12-agent AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, verified answers; TypeScript, NestJS, Nuxt.
- Built a plain-English chart experience in Nuxt where readers stack, sort, filter, take top-N and undo directly, backed by in-process DuckDB that held latency flat as rows grew 200x.
- Shipped a 14-page Nuxt 4 front end over a NestJS API of 11 modules and 70 routes, all compiled against one shared TypeScript contract.
- Cut wrong answers 85% on 164 published benchmark figures by reading every answer back in plain words and verifying it against the question before display.
- Sped up a full AWS pipeline run 6x, 500 to 85 seconds, by replacing managed agent-runtime stages with direct tool calls once benchmarks showed each made one call and stopped.
- Quadrupled the insights automated reports surface, 13% to 52–59% on unseen datasets, by having an LLM agent choose the analyses while deterministic code computes every number.
- Delivered governance in the POC: Bedrock Guardrails as their own CDK stack, entitlement-gated respondent retrieval, and per-stage spend caps enforced in code.
- Scaled labeling as a distributed Step Functions fan-out across 64 parallel lanes with a 5% failure circuit breaker, after tracing silent row loss in a run that reported success.
- Eliminated a silent failure mislabeling 1 in 8 rows in the prior pipeline, reaching 100% join integrity with schema-constrained LLM output.
- Extended analysis to statistical and causal questions with 25 tests and six causal estimators validated against scipy and statsmodels, scoring 68% on StatQA versus GPT-4o's best reported 64.83%.
- Designed a chart recommender over 17 chart types grounded in visualization research, accepting an LLM suggestion only when it outscores the rules.
- Engineered the storage layer: kilobyte fact tables beside Lance payloads on S3 queried in-process by DuckDB, choosing Lance over Parquet on 114,000 rows for full-text and vector search.
- Accelerated publishing of a 51,280-person, 220-column federal survey 10x, 19 minutes to 109 seconds, with an independent audit from raw data matching 100% of figures.
- Raised accuracy on the hardest benchmark questions from 60% to 93% with zero wrong answers, by routing every component through one shared semantic layer after larger models did not help.
- Blocked a cross-survey join that double counted respondents, using a fingerprint that detects runs sharing the same people.

### MyStage Music Inc. | 07/2025 - 05/2026

*Founding AI/ML Engineer* | *Remote*

- Delivered sub-50 ms search on FastAPI and Algolia with real-time Firestore sync, 200+ pytest tests and Logfire tracing.
- Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.
- Scaled ingestion to 70,000+ records a day from 650+ venues with a Playwright pipeline, transactional locking and Gemini entity resolution that raised search-dataset accuracy 25%.
- Guaranteed retry safety with deterministic task IDs and create-if-absent writes, so a retried job can never overwrite one already in flight.
- Designed a reusable scraping subgraph that parent graphs compose without checkpoint conflicts, letting webhook-triggered scrapes skip the fetch step.

### EdPlus | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Led a multi-tenant RAG assistant, React to retrieval layer, used by 1,000+ faculty to build courses for 60,000+ students.
- Raised engagement 35% and reduced bounce 20% with React and Material UI tools for the assessment platform: bulk import, cross-bank question reuse and a diff view before republishing.
- Isolated each college's data at the retrieval layer, so no tenant's material can surface in another's and onboarding became a config change, not a deployment.
- Attached a source citation to every answer, linking document and section, so faculty can verify a claim instead of trusting it.
- Added hybrid keyword and vector search so exact course codes resolve correctly where embeddings alone blur them together.
- Built a Prompt Flow eval harness scoring groundedness, relevance and coherence to gate every prompt change on results.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Built a FastAPI and pgvector recommender reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8.
- Lowered API latency 90% with Redis caching and SQL rewrites, and raised dataset accuracy to 95% with PostgreSQL constraints.
- Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j search layer.
- Rewrote the ETL to be idempotent on a natural key, so a rerun after partial failure updates rows rather than duplicating them.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Built a Redis-backed desk-demand forecasting service used in 300+ Fortune 500 offices, with reported occupancy up 30%.
- Cut deploy time 70% and production incidents 40% by containerizing the CI/CD release pipeline and adding SonarQube gates.
- Migrated a C# .NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and footprint 35%.
- Sped up the student-listing screen 30% with paginated fetching and S3 asset delivery, then another 10% with index-covering query rewrites after profiling found a full table scan.
- Published an internal npm package wrapping the Slack Web API with pagination, released under semver for the company social platform.
- Right-sized Kubernetes requests and limits to observed usage, which is where the 35% footprint reduction came from.

### EAT.FIT | 09/2021 - 12/2021

*Product Intern* | *Bengaluru, India*

- Cut driver-tracking server cost 45% with distance-based polling and client-side interpolation that kept map movement smooth.
- Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.
- Shipped live order tracking on the Google Maps API with route polylines and a per-fix ETA, during a quarter of 25% user growth.
- Designed a polling fallback for when the socket drops, so customers never lose order updates.

## PROJECTS

### SRP Electric MCP Server | [GitHub](https://github.com/architagrawal/srp-electric-mcp) | 12/2025 - 01/2026

- Reverse-engineered an undocumented utility portal into a read-only TypeScript MCP server with Zod-validated tool schemas, normalized meter data and typed errors an agent can act on.
- Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.

### MCP GitHub PR Review Agent | 07/2025 - 08/2025

- Built a TypeScript MCP service that reviews pull requests from the diff, linked ticket and CI result, returning schema-typed inline findings that gate merges by category.
- Made the bot idempotent across pushes after the first version stacked eleven comments on one branch, and wired Asana both ways off the branch-name ticket id.

### AiJockey – AI DJ Pipeline | [GitHub](https://github.com/architagrawal/aiJockey) | 2025 - Present

- Built an end-to-end AI DJ in PyTorch and FastAPI: stem separation, an LLM transition planner, 25+ DSP transitions and LUFS mastering, ported off CUDA to an AMD MI300X.

## TECHNICAL SKILLS

**Languages:** Python, TypeScript, JavaScript, SQL, C#  
**Frameworks:** FastAPI, NestJS, Node.js, .NET, React, Vue/Nuxt, Next.js, LangGraph, PyTorch  
**AI & Data:** RAG, LLM evaluation, MCP, AWS Bedrock, PostgreSQL, pgvector, FAISS, Neo4j, Redis, DuckDB, ETL pipelines  
**Cloud & DevOps:** AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD  

## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*Master of Science, Computer Science* | *Tempe, AZ, USA*

- GPA: 4.0

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*Bachelor of Technology, Information and Communication Technology* | *India*

