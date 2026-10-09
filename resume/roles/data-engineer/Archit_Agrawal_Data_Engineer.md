# ARCHIT AGRAWAL

Phoenix, AZ | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Personal Website](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus | 05/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own the architecture, roadmap and delivery of a 12-agent AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, verified answers; TypeScript, NestJS, Nuxt.
- Engineered the storage layer: kilobyte fact tables beside Lance payloads on S3 queried in-process by DuckDB, choosing Lance over Parquet on 114,000 rows for full-text and vector search.
- Scaled labeling as a distributed Step Functions fan-out across 64 parallel lanes with a 5% failure circuit breaker, after tracing silent row loss in a run that reported success.
- Detected table shape with 98% accuracy and survey weights in 100% of files that ship one, up from 0%, so crosstabs, long tables and weighted surveys publish with no per-file code.
- Accelerated publishing of a 51,280-person, 220-column federal survey 10x, 19 minutes to 109 seconds, with an independent audit from raw data matching 100% of figures.
- Eliminated a silent failure mislabeling 1 in 8 rows in the prior pipeline, reaching 100% join integrity with schema-constrained LLM output.

### MyStage Music Inc. | 07/2025 - 05/2026

*Founding AI/ML Engineer* | *Remote*

- Scaled ingestion to 70,000+ records a day from 650+ venues with a Playwright pipeline, transactional locking and Gemini entity resolution that raised search-dataset accuracy 25%.
- Guaranteed retry safety with deterministic task IDs and create-if-absent writes, so a retried job can never overwrite one already in flight.
- Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.

### EdPlus | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Cut transcript analysis 16x, four hours to 15 minutes, with a Neo4j knowledge graph queried by validated LLM-written Cypher.
- Isolated each college's data at the retrieval layer, so no tenant's material can surface in another's and onboarding became a config change, not a deployment.
- Led a multi-tenant RAG assistant, React to retrieval layer, used by 1,000+ faculty to build courses for 60,000+ students.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Built a FastAPI and pgvector recommender reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8.
- Raised dataset accuracy to 95% by enforcing uniqueness, not-null and range checks in PostgreSQL, so bad rows fail at the boundary instead of in a report.
- Rewrote the ETL to be idempotent on a natural key, so a rerun after partial failure updates rows rather than duplicating them.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Migrated a C# .NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and footprint 35%.
- Cut deploy time 70% and production incidents 40% by containerizing the CI/CD release pipeline and adding SonarQube gates.

## PROJECTS

### SRP Electric MCP Server | [GitHub](https://github.com/architagrawal/srp-electric-mcp) | 12/2025 - 01/2026

- Reverse-engineered an undocumented utility portal into a read-only TypeScript MCP server with Zod-validated tool schemas, normalized meter data and typed errors an agent can act on.

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

