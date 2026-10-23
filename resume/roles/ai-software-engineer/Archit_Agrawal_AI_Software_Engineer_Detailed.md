# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own architecture and delivery of an AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, code-computed answers.
- Built the platform's web application with a Nuxt frontend and NestJS backend, sharing TypeScript contracts across 70 API routes.
- Reduced AWS pipeline runtime from 500 to 85 seconds by replacing two managed-agent stages with direct tool calls.
- Cut incorrect answers 85% in an evaluation against 164 published benchmark figures by adding answer verification before display.
- Validated 25 statistical tests and six causal estimators against SciPy and statsmodels; scored 68% on a 100-question StatQA sample, against GPT-4o's best reported 64.83%.
- Improved accuracy from 60% to 93% on the hardest benchmark questions by consolidating column definitions in a shared semantic layer.
- Quadrupled the headline findings automated reports recover, 13% to 52–59% on held-out datasets, by letting an LLM choose analyses while code computes every number.
- Reached 100% join integrity on repeat runs with schema-constrained LLM output and per-row IDs; the prior pipeline silently mislabeled 1 in 8 rows.
- Showed model choice moves labeling F1 33x more than pipeline design (0.230 vs 0.007), redirecting the team toward reliability.

### MyStage Music Inc. | 07/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Consolidated a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run, reducing production service dependencies 64%.
- Built FastAPI and Algolia search with sub-50 ms latency, real-time Firestore synchronization, 200+ pytest tests and Logfire tracing.
- Scaled ingestion to 70,000+ records daily from 650+ venues using Playwright, transactional locking and entity resolution.
- Implemented checkpointed pause-and-resume so records missing context wait for additional information without failing the ingestion batch.
- Made ingestion retries safe with deterministic task IDs and atomic create-if-absent writes, preventing duplicate jobs from overwriting in-flight work.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Built a multi-tenant course assistant from React UI to retrieval services, used by 1,000+ faculty creating courses for 60,000+ students.
- Established Prompt Flow release checks for groundedness, relevance and coherence, evaluating prompt changes against measured results before deployment.
- Implemented tenant isolation in retrieval services and configuration-based onboarding for additional colleges.
- Added hybrid keyword and vector retrieval to resolve exact course codes alongside semantic document search.
- Reduced transcript-analysis time from four hours to 15 minutes using a Neo4j knowledge graph and validated Cypher queries.

### Arizona State University | 08/2024 - 05/2025

*Student Researcher* | *Phoenix, AZ*

- Built a PyTorch and Diffusers benchmark for text-to-video models that scores physical plausibility separately from visual quality, holding seed, resolution and sampler fixed.
- Found visual quality barely predicts physical plausibility: the top model by human preference ranked last on causal consistency.
- Designed a frame-level rubric for rigid-body motion, gravity, momentum and occlusion, and measured inter-rater agreement before trusting any aggregate score.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Reduced p95 retrieval latency 60% at 95% recall using hybrid FAISS and Neo4j search.
- Built a FastAPI and pgvector collaborator recommender achieving 85% top-k precision in evaluation.
- Cut API latency from 198 to 20 ms with Redis caching and SQL rewrites, verified under simulated peak load with Locust.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Reduced deployment time 70% and production incidents 40% through containerized CI/CD and SonarQube quality gates.
- Migrated a C#/.NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and resource footprint 35%.
- Built a Redis-backed desk-booking service used across 300+ offices at Fortune 500 companies.

## PROJECTS

### SRP Electric MCP Server | [GitHub](https://github.com/architagrawal/srp-electric-mcp) | 12/2025 - 01/2026

- Built a Python/FastMCP integration exposing seven utility-account tools for billing, usage and outage queries, with an interactive setup wizard.
- Reverse-engineered the portal's login flow and API calls, since the utility publishes no API documentation.

### MCP GitHub PR Review Agent | 07/2025 - 08/2025

- Built a TypeScript PR-review integration combining code diffs, tickets and CI results into schema-validated inline findings.
- Made review comments idempotent across pushes and synchronized ticket context with Asana.

### AiJockey – AI DJ Pipeline | [GitHub](https://github.com/architagrawal/aiJockey) | 2025 - Present

- Built a PyTorch/FastAPI audio pipeline with stem separation, LLM transition planning and 25+ DSP transitions; ported inference to AMD MI300X.
- Trained a MERT-95M reward head to score audio segments across four aesthetic dimensions for candidate selection.

## TECHNICAL SKILLS

**Languages:** Python, TypeScript, JavaScript, SQL, C#

**AI & LLM:** AWS Bedrock, LangGraph, RAG, LLM evaluation, Prompt Flow, MCP, PyTorch

**Retrieval & Data:** PostgreSQL, pgvector, FAISS, Neo4j, Redis, Algolia, Firestore

**Backend & Web:** FastAPI, NestJS, Node.js, .NET, React, Nuxt

**Cloud & Quality:** AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD, pytest


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *Gandhinagar, India*

