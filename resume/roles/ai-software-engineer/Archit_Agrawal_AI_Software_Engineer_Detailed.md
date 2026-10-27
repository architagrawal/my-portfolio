# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own a multi-agent LLM platform end to end on AWS Bedrock and Step Functions: 12 tool-calling agents over 76 tools answer questions on any structured dataset, each answer cited to its source rows.
- Built the LLM eval harness: code-scored benchmarks and LLM-as-judge rubrics gate every agent and prompt change; answer verification cut hallucinated figures 85% across 164 published results.
- Built traceability into every LLM run: per-row correlation IDs, versioned outputs and corrections, lineage and replayable runs; structured outputs reached 100% join integrity where 1 in 8 rows used to be mislabeled.
- Cut pipeline latency from 500 to 85 seconds with direct tool calls and held a 19-call run to $0.03 with Bedrock prompt caching, bounding failures and spend with a 5% circuit breaker and per-stage caps.
- Raised accuracy from 60% to 93% on the hardest benchmark questions through context engineering: a shared semantic layer compiles questions into query plans behind 7 validation checks.
- Built hybrid retrieval over S3, Lance vector search plus BM25 through DuckDB, behind entitlement-gated row-level access and Bedrock Guardrails deployed through AWS CDK.
- Traced silent row loss in Step Functions runs that reported success and fixed it with partitioned writes and fan-in across 64 parallel lanes.
- Validated 25 statistical tests and six causal estimators against SciPy and statsmodels; scored 68% on a 100-question StatQA sample, against GPT-4o's best reported 64.83%.
- Quadrupled the headline findings automated reports recover, 13% to 52–59% on held-out datasets, by letting an LLM choose analyses while code computes every number.
- Showed model choice moves labeling F1 33x more than pipeline design (0.230 vs 0.007), redirecting the team toward reliability.
- Reduced publishing time from 19 minutes to 109 seconds for a 51,280-respondent survey; an independent raw-data audit matched all evaluated figures.

### MyStage Music Inc. | 03/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Rebuilt a 14-Cloud-Function backend as one durable LangGraph agent workflow on GCP Cloud Run, with checkpointing and human-in-the-loop interrupt and resume, cutting service dependencies 64%.
- Instrumented LLM observability via Logfire (OpenTelemetry), tracing each run across pause and resume.
- Lifted dataset accuracy 25% with Gemini entity resolution, scored by LLM-as-judge, over 70,000+ records a day.
- Made the pipeline fault tolerant with deterministic task IDs, atomic Firestore claims, per-branch error isolation across parallel fan-out and 200+ pytest tests.
- Delivered sub-50 ms venue search through FastAPI and Algolia, synchronizing Firestore updates into the search index in real time.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Shipped a multi-tenant RAG assistant to 1,000+ faculty building courses for 60,000+ students, with hybrid vector and keyword search, section-aware chunking and a source citation on every answer.
- Gated every prompt release on Prompt Flow LLM-as-judge evals for groundedness, relevance and coherence.
- Enabled configuration-based college onboarding through tenant-scoped retrieval, keeping each college's documents within its own search boundary.
- Compared fixed-size and section-aware chunking on course documents to preserve complete policy passages in retrieved results.
- Built GraphRAG over a Neo4j knowledge graph with schema-validated, LLM-generated Cypher, cutting transcript analysis from four hours to 15 minutes.

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

**AI Engineering:** Multi-agent systems, tool calling, agentic RAG, GraphRAG, hybrid search, context engineering, structured outputs, guardrails, prompt caching, human-in-the-loop

**Evals & Observability:** LLM-as-judge, code-scored benchmarks, golden datasets, Prompt Flow, Logfire, OpenTelemetry, distributed tracing, CloudWatch

**Models & Frameworks:** AWS Bedrock, OpenAI, Gemini, LangGraph, LangChain, Semantic Kernel, MCP, PyTorch

**Retrieval & Data:** pgvector, FAISS, Lance, Neo4j, DuckDB, PostgreSQL, Redis, Algolia, Firestore

**Backend & Web:** FastAPI, NestJS, Node.js, .NET, React, Nuxt

**Cloud & Quality:** AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD, pytest


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *Gandhinagar, India*

