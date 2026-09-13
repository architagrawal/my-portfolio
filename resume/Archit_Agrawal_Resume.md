# ARCHIT AGRAWAL

Tempe, AZ | 623-312-0435 | architagrawal000@gmail.com  
[LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

AI Software Engineer with 4+ years building production agent systems, retrieval infrastructure, and full-stack products. Specializes in turning experimental AI workflows into reliable systems through evaluation, schema enforcement, idempotency, observability, and measurable performance.

## EXPERIENCE

### AI Software Engineer - EdPlus, Arizona State University

Tempe, AZ | Jun 2026–Present

- Architected and shipped a reusable survey-analysis platform comprising 10 agents and 65 registered tools; replaced bespoke per-survey pipelines with a declarative TypeScript architecture on Bedrock, AgentCore, Step Functions, and CDK.
- Prevented roughly 12% silent row loss through schema-constrained decoding, response correlation tokens, and citation verification; achieved 100% join integrity and zero label churn across repeat runs.
- Made newly uploaded surveys queryable without dataset-specific configuration by building a natural-language semantic layer over DuckDB.
- Held query latency flat at 200× row volume using in-process DuckDB over Lance on S3.
- Redirected the team roadmap through a controlled evaluation showing model choice moved labeling F1 by 0.230 - roughly 33× the 0.007 movement from pipeline architecture.
- Eliminated a Distributed Map race that reported success while dropping data by introducing partitioned writes and fan-in, verified across 258 runs.
- Delivered the platform through a 14-page Nuxt 4 application and 10-module NestJS API compiled against one shared TypeScript contract.

### Founding AI/ML Engineer - MyStage Music Inc.

Remote | Jul 2025–Present

- As founding AI/ML engineer, cut service dependencies 64% (14 to 5) by re-architecting a 14-Cloud-Function pipeline as one checkpointed LangGraph worker on Cloud Run.
- Indexed 70,000+ records per day across 650+ venues through a Playwright scraping service with proxy rotation and adaptive backoff.
- Improved downstream search accuracy 25% by resolving and deduplicating entities with Gemini before Firestore ingestion.
- Served search at sub-50 ms latency through FastAPI and Algolia with real-time Firestore synchronization.
- Made concurrent retries safe through atomic Firestore claim transactions and deterministic task IDs; added human-in-the-loop pause and resume.
- Made failures diagnosable and changes safe by instrumenting the graph with Logfire distributed tracing and writing 200+ pytest tests.

### Software Engineer - EdPlus, Arizona State University

Tempe, AZ | Sep 2023–May 2025

- Led the end-to-end development of a multi-tenant RAG assistant used by 1,000+ faculty members authoring courses for 60,000+ students.
- Made transcript analysis 16× faster, reducing it from four hours to 15 minutes with a Neo4j knowledge graph and schema-constrained, LLM-generated Cypher.
- Reduced new-college onboarding from a deployment to a configuration change through per-tenant configuration, while enforcing isolation in retrieval rather than prompts.
- Improved retrieval coverage with hybrid vector and keyword search for exact-token queries such as course codes; evaluated responses for groundedness, relevance, and coherence.

### Data Research Aide - Knowledge Exchange for Resilience, ASU

Tempe, AZ | Jun 2024–Aug 2024

- Reduced p95 retrieval latency 60% while maintaining 95% recall with hybrid FAISS and Neo4j retrieval over Postgres/pgvector.
- Reduced API latency nearly 90%, from 198 ms to 20 ms, through Redis caching and SQL rewrites, verified under Locust load.
- Delivered 20+ REST APIs for an NSF-funded research platform using .NET 8, Dapper, MediatR, JWT, and SQS.
- Ingested 10,000+ faculty profiles per day through an idempotent ETL pipeline with Postgres quality gates.

### Software Engineer - Zeus Learning

Mumbai, India | Jan 2022–Jul 2023

- Split a .NET monolith into Kubernetes microservices through a strangler migration, reducing resource usage 35% and infrastructure cost 20%.
- Reduced deployment time 70% and production incidents 40% with SonarQube merge gates and containerized release pipelines.
- Shipped a Redis-backed demand-prediction service used across 300+ enterprise sites, including Goldman Sachs and Merck; reported occupancy increased 30%.

### Product Intern - EAT.FIT

Bengaluru, India | Sep 2021–Dec 2021

- Reduced driver-location serving cost 45% with distance-aware polling and client-side interpolation.
- Built a WebSocket notification service with backpressure-aware fan-out and idempotent redelivery.

## EDUCATION

**M.S., Computer Science**, Arizona State University - GPA: 4.0 | Aug 2023–May 2025  
**B.Tech., Information and Communication Technology**, DA-IICT | Aug 2018–May 2022

## SELECTED PROJECTS

- **MCP GitHub PR Review Agent (2025):** Built an MCP service triggered by GitHub webhooks that combines repository state, ticket metadata, and CI context to automate review decisions.
- **SRP Electric MCP Server (2026):** Built a TypeScript MCP server that exposes an undocumented utility portal as validated tools after reverse-engineering its authentication flow.
- **Video Generation Physics Evaluation, ASU (2024–2025):** Built an evaluation harness separating physical plausibility from semantic fidelity; found counterfactual prompts degraded faster at matched length.

## SKILLS

**Languages:** Python, TypeScript, C#, SQL, JavaScript  
**AI systems:** LangGraph, MCP, Pydantic AI, LangChain, Bedrock/AgentCore, Vertex AI, OpenAI, RAG, structured outputs, evaluation harnesses  
**Data:** DuckDB, PostgreSQL/pgvector, Neo4j, FAISS, Lance, Algolia, Redis, Firestore  
**Backend:** FastAPI, NestJS, .NET 8, Node.js, Nuxt 4, React  
**Cloud and quality:** AWS Step Functions, Lambda, CDK, SQS, S3, GCP Cloud Run, Docker, Kubernetes, Terraform, GitHub Actions, pytest, Vitest, Locust, Logfire
