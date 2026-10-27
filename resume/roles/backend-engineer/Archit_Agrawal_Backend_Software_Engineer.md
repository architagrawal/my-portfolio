# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own the backend of a TypeScript analytics platform: a 10-module NestJS API and a Step Functions workflow compiled from one declarative graph and validated at load, so a broken edge fails before a run starts.
- Traced silent row loss in Step Functions runs that reported success and fixed it with partitioned writes and fan-in across 64 parallel lanes.
- Ran the platform without a database: in-process DuckDB over per-run JSON and Lance on S3 held ask latency flat at 200x rows and queried 216 runs in milliseconds.

### MyStage Music Inc. | 03/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Consolidated a 14-Cloud-Function backend into a checkpointed Python/LangGraph workflow on GCP Cloud Run, reducing production service dependencies 64%.
- Made the pipeline fault tolerant with deterministic task IDs, atomic Firestore claims, per-branch error isolation across parallel fan-out and 200+ pytest tests.
- Propagated OpenTelemetry trace context through Logfire across queue, claim and resume, so worker spans nest under the producer's trace, with per-tick metrics.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Built REST APIs and SQL-backed admin tools for ASU Online quiz platforms and question banks, with schema-level invariants protecting assessment integrity.
- Enabled configuration-based college onboarding through tenant-scoped retrieval, keeping each college's documents within its own search boundary.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Delivered 20+ production REST APIs using .NET 8, Dapper and MediatR, with JWT authentication and AWS SQS for queued work.
- Cut API latency from 198 to 20 ms with Redis caching and SQL rewrites, verified under simulated peak load with Locust.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Split a .NET monolith into Kubernetes microservices as a strangler migration with no big-bang cutover, cutting infrastructure cost 20% and footprint 35% by right-sizing pods.
- Reduced deployment time 70% and production incidents 40% through containerized CI/CD and SonarQube quality gates.

## PROJECTS

### Image Recognition as a Service | 01/2024 - 02/2024

- Built an AWS EC2/SQS image-processing service with queue-based scaling, asynchronous results and idempotent workers for safe message retries.

## TECHNICAL SKILLS

**Languages & APIs:** Python, TypeScript, SQL, C#, NestJS, FastAPI, Node.js, .NET 8, REST, WebSockets

**Data & Messaging:** PostgreSQL, Redis, DuckDB, Firestore, AWS SQS, RabbitMQ, S3

**Systems:** Distributed systems, idempotency, concurrency control, caching, circuit breakers, OpenTelemetry

**Cloud & Delivery:** AWS (Step Functions, Lambda, CDK), GCP Cloud Run, Docker, Kubernetes, CI/CD, pytest, Locust


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *Gandhinagar, India*

