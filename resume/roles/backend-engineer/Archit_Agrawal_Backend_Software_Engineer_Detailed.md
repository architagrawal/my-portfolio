# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own the backend of a TypeScript analytics platform: a 10-module NestJS API and a Step Functions workflow compiled from one declarative graph and validated at load, so a broken edge fails before a run starts.
- Traced silent row loss in Step Functions runs that reported success and fixed it with partitioned writes and fan-in across 64 parallel lanes.
- Ran the platform without a database: in-process DuckDB over per-run JSON and Lance on S3 held ask latency flat at 200x rows and queried 216 runs in milliseconds.
- Cut end-to-end AWS pipeline runtime from 500 to 85 seconds by removing managed-agent startup overhead and invoking the underlying tools directly.
- Made every answer reproducible: a passport of plan hash, dataset and versions re-executes byte-identically, and shadow re-execution diffs recent answers whenever a definition changes.
- Cached question-to-plan bindings keyed on a plan hash, turning the one non-deterministic step in the read path into a lookup.
- Reached 100% join integrity on repeat runs with schema-constrained LLM output and per-row IDs; the prior pipeline silently mislabeled 1 in 8 rows.
- Secured the analytics proof of concept with entitlement-gated row-level access, Bedrock Guardrails deployed through AWS CDK and enforced per-stage spend limits.

### MyStage Music Inc. | 03/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Consolidated a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run, reducing production service dependencies 64%.
- Made the pipeline fault tolerant with deterministic task IDs, atomic Firestore claims, per-branch error isolation across parallel fan-out and 200+ pytest tests.
- Propagated OpenTelemetry trace context through Logfire across queue, claim and resume, so worker spans nest under the producer's trace, with per-tick metrics.
- Delivered sub-50 ms venue search through FastAPI and Algolia, synchronizing Firestore updates into the search index in real time.
- Built a Cloud Scheduler reprocessing loop that refreshes the most-stale sources first, tracking reprocess time and count per entity.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Built REST APIs and SQL-backed admin tools for ASU Online quiz platforms and question banks, with schema-level invariants protecting assessment integrity.
- Enabled configuration-based college onboarding through tenant-scoped retrieval, keeping each college's documents within its own search boundary.
- Cut transcript-analysis time from four hours to 15 minutes with a Neo4j knowledge graph and schema-validated, LLM-generated Cypher queries.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Delivered 20+ production REST APIs using .NET 8, Dapper and MediatR, with JWT authentication and AWS SQS for queued work.
- Cut API latency from 198 to 20 ms with Redis caching and SQL rewrites, verified under simulated peak load with Locust.
- Centralized validation, logging and error shaping in MediatR pipeline behaviors so new endpoints inherit them, pushing long work to AWS SQS to keep the API responsive.
- Set throughput and latency SLOs before release with Locust load tests and pytest suites against FastAPI endpoints.
- Built an idempotent ETL pipeline for 10,000+ researcher profiles daily, using PostgreSQL natural-key upserts to prevent duplicates after partial failures.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Split a .NET monolith into Kubernetes microservices as a strangler migration with no big-bang cutover, cutting infrastructure cost 20% and footprint 35% by right-sizing pods.
- Reduced deployment time 70% and production incidents 40% through containerized CI/CD and SonarQube quality gates.
- Built a Redis-backed desk-booking service used across 300+ offices at Fortune 500 companies.

### EAT.FIT | 09/2021 - 12/2021

*Product Intern* | *Bengaluru, India*

- Built a WebSocket and Express notification service with backpressure-aware fan-out and duplicate-safe redelivery; reported CSAT rose 28% and support volume fell 35%.
- Cut driver-tracking server cost 45% with distance-based polling and client-side interpolation that kept map movement smooth.

## PROJECTS

### Image Recognition as a Service | 01/2024 - 02/2024

- Built an AWS EC2/SQS image-processing service with queue-based scaling, asynchronous results and idempotent workers for safe message retries.
- Capped worker capacity and used scale-in cooldowns to control cost and prevent instance churn during changing demand.

### PrismSplit | 2025 - Present

- Built a TypeScript/React Native expense app with transactional PostgreSQL billing and settlement, integer-cent accounting and offline write persistence.
- Added idempotency keys, real-time Supabase subscriptions and versioned persistence to handle retries and cached data across app upgrades.

## TECHNICAL SKILLS

**Languages:** Python, TypeScript, SQL, C#, JavaScript

**Backend & APIs:** NestJS, FastAPI, Node.js, Express, .NET 8, Dapper, MediatR, REST, WebSockets, JWT

**Data & Messaging:** PostgreSQL, Redis, DuckDB, Firestore, Algolia, Neo4j, AWS SQS, RabbitMQ, S3

**Systems:** Distributed systems, event-driven design, idempotency, concurrency control, caching, multi-tenancy, circuit breakers

**Observability & Testing:** OpenTelemetry, Logfire, CloudWatch, pytest, Vitest, Jest, Locust, SonarQube

**Cloud & Delivery:** AWS (Step Functions, Lambda, S3, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *Gandhinagar, India*

