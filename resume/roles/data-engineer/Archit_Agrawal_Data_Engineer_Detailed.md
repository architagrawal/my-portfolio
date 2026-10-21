# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Designed S3 storage with compact fact tables and Lance payloads, queried through DuckDB for full-text and vector search.
- Parallelized data labeling across 64 AWS Step Functions lanes, with a failure circuit breaker to detect incomplete runs.
- Prevented mislabeled and dropped records with schema-constrained output and row correlation checks in the data-processing pipeline.
- Accelerated publishing of a 51,280-respondent survey from 19 minutes to 109 seconds; an independent raw-data audit matched all evaluated figures.
- Built dataset intake for crosstabs, long tables and weighted surveys, including UTF-16 files and duplicate-header validation.
- Blocked double counting across survey runs by detecting shared respondents before joining datasets.
- Reduced AWS pipeline runtime from 500 to 85 seconds by replacing two managed-agent stages with direct tool calls.
- Added access-controlled respondent retrieval, AWS Bedrock Guardrails and per-stage spending limits to the analytics proof of concept.

### MyStage Music Inc. | 07/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Scaled ingestion to 70,000+ records daily from 650+ venues using Playwright, transactional locking and entity resolution.
- Made ingestion retries safe with deterministic task IDs and atomic create-if-absent writes, preventing duplicate jobs from overwriting in-flight work.
- Consolidated a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run, reducing production service dependencies 64%.
- Designed reusable scraping modules so new data sources can be added without changing the orchestration graph.
- Implemented checkpointed pause-and-resume so records missing context wait for additional information without failing the ingestion batch.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Implemented tenant isolation in retrieval services and configuration-based onboarding for additional colleges.
- Reduced transcript-analysis time from four hours to 15 minutes using a Neo4j knowledge graph and validated Cypher queries.
- Added hybrid keyword and vector retrieval to resolve exact course codes alongside semantic document search.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Built 20+ REST APIs in .NET 8 and an ETL pipeline ingesting 10,000+ researcher profiles daily into PostgreSQL.
- Made ETL reruns idempotent through natural-key upserts, preventing duplicate records after partial failures.
- Enforced uniqueness, not-null and range constraints in PostgreSQL to reject invalid records during ingestion.
- Cut API latency from 198 to 20 ms with Redis caching and SQL rewrites, verified under simulated peak load with Locust.
- Reduced p95 retrieval latency 60% at 95% recall using hybrid FAISS and Neo4j search.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer | Intern Jan–Jun 2022; engineer Jun 2022–Jul 2023* | *Mumbai, India*

- Migrated a C#/.NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and resource footprint 35%.
- Reduced deployment time 70% and production incidents 40% through containerized CI/CD and SonarQube quality gates.
- Improved student-listing performance 30% with pagination and S3 asset delivery; reduced class-detail latency 10% through SQL query rewrites.

### EAT.FIT | 09/2021 - 12/2021

*Product Intern* | *Bengaluru, India*

- Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.

## PROJECTS

### Image Recognition as a Service | 01/2024 - 02/2024

- Built an AWS EC2/SQS image-processing service with queue-based scaling, asynchronous results and idempotent workers for safe message retries.
- Capped worker capacity and used scale-in cooldowns to control cost and prevent instance churn during changing demand.

### No-Code Pipeline Builder | 2025

- Built a React/ReactFlow workflow editor with typed nodes, undo/redo and autosave, backed by FastAPI graph validation.

## TECHNICAL SKILLS

**Languages & Storage:** Python, SQL, TypeScript, PostgreSQL, DuckDB, S3, Lance, Redis

**Pipelines:** ETL, Step Functions, Lambda, GCP Cloud Run, FastAPI

**Quality & Deployment:** Data validation, idempotent processing, Docker, Kubernetes, CI/CD, pytest


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ, USA*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *India*

