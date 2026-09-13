# ARCHIT AGRAWAL

Tempe, AZ | 623-312-0435 | architagrawal000@gmail.com  
[LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## EXPERIENCE

### AI Software Engineer - EdPlus, Arizona State University

Tempe, AZ | Jun 2026–Present

- Architected and shipped a reusable survey-analysis platform of 10 agents and 65 registered tools; replaced bespoke pipelines with a declarative TypeScript architecture on Bedrock, AgentCore, Step Functions, and CDK.
- Prevented roughly 12% silent row loss through schema-constrained decoding, response correlation tokens, and citation verification; achieved 100% join integrity and zero label churn across repeat runs.
- Made newly uploaded surveys immediately queryable without dataset-specific configuration by building a natural-language semantic layer over DuckDB.
- Redirected the team roadmap through a controlled evaluation showing model choice moved labeling F1 by 0.230 - roughly 33× the 0.007 movement from pipeline architecture.
- Eliminated a Distributed Map race that reported success while dropping data through partitioned writes and fan-in, verified across 258 runs; held query latency flat at 200× row volume.

### Founding AI/ML Engineer - MyStage Music Inc.

Remote | Jul 2025–Present

- As founding AI/ML engineer, cut service dependencies 64% (14 to 5) by re-architecting a 14-Cloud-Function pipeline as one checkpointed LangGraph worker on Cloud Run.
- Indexed 70,000+ records per day across 650+ venues through a Playwright service with proxy rotation and adaptive backoff; improved search accuracy 25% with Gemini entity resolution and deduplication.
- Served search at sub-50 ms latency through FastAPI and Algolia with real-time Firestore synchronization.
- Made concurrent retries safe with atomic claim transactions and deterministic task IDs; added human-in-the-loop pause/resume, Logfire tracing, and 200+ pytest tests.

### Software Engineer - EdPlus, Arizona State University

Tempe, AZ | Sep 2023–May 2025

- Led the end-to-end development of a multi-tenant RAG assistant used by 1,000+ faculty members authoring courses for 60,000+ students.
- Made transcript analysis 16× faster, reducing it from four hours to 15 minutes with a Neo4j knowledge graph and schema-constrained, LLM-generated Cypher.
- Reduced new-college onboarding from a deployment to a configuration change while enforcing tenant isolation in retrieval; evaluated groundedness, relevance, and coherence.

### Data Research Aide - Knowledge Exchange for Resilience, ASU

Tempe, AZ | Jun 2024–Aug 2024

- Reduced p95 retrieval latency 60% at 95% recall with hybrid FAISS and Neo4j retrieval; cut API latency nearly 90% (198 ms to 20 ms) through Redis and SQL optimization.
- Delivered 20+ .NET 8 REST APIs for an NSF-funded platform and an idempotent ETL pipeline ingesting 10,000+ faculty profiles per day.

### Software Engineer - Zeus Learning

Mumbai, India | Jan 2022–Jul 2023

- Reduced resource usage 35% and infrastructure cost 20% by migrating a .NET monolith to Kubernetes microservices through a strangler pattern.
- Reduced deployment time 70% and production incidents 40% with SonarQube merge gates and containerized delivery; shipped demand prediction across 300+ enterprise sites.

### Product Intern - EAT.FIT

Bengaluru, India | Sep 2021–Dec 2021

- Reduced driver-location serving cost 45% through distance-aware polling and client interpolation; built a backpressure-aware WebSocket notification service with idempotent redelivery.

## EDUCATION

**M.S., Computer Science**, Arizona State University - GPA: 4.0 | Aug 2023–May 2025  
**B.Tech., Information and Communication Technology**, DA-IICT | Aug 2018–May 2022

## SELECTED PROJECTS

**MCP GitHub PR Review Agent:** Built a webhook-triggered MCP service combining repository state, ticket metadata, and CI context for automated review decisions.  
**SRP Electric MCP Server:** Exposed an undocumented utility portal as validated TypeScript tools after reverse-engineering its authentication flow.  
**Video Generation Physics Evaluation:** Built an evaluation harness separating physical plausibility from semantic fidelity; found counterfactual prompts degraded faster at matched length.

## SKILLS

**Languages:** Python, TypeScript, C#, SQL, JavaScript  
**AI and data:** LangGraph, MCP, Bedrock/AgentCore, Vertex AI, OpenAI, RAG, DuckDB, PostgreSQL/pgvector, Neo4j, FAISS, Lance, Algolia, Redis, Firestore  
**Backend and cloud:** FastAPI, NestJS, .NET 8, React, Nuxt 4, AWS, GCP, Docker, Kubernetes, Terraform, GitHub Actions  
**Quality:** pytest, Vitest, Locust, Logfire, distributed tracing
