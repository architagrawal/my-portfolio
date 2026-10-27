# ARCHIT AGRAWAL

San Francisco Bay Area | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Portfolio](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus, Arizona State University | 06/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Designed a serverless data lake on S3: a narrow fact table plus Lance payloads queried in-process by DuckDB, so new datasets union without a migration.
- Built schema-inferring ingestion for any table shape, from crosstabs to weighted surveys and UTF-16 files, emitting each decision as a JSON recipe that replays exactly.
- Traced silent row loss in Step Functions runs that reported success and fixed it with partitioned writes and fan-in across 64 parallel lanes.
- Tracked data lineage with four typed relations (relabel, recode, wave, wave_recoded), so a second labeling pass can never pose as a trend.

### MyStage Music Inc. | 03/2025 - 06/2026

*Founding AI/ML Engineer* | *Remote*

- Scaled ingestion to 70,000+ records daily from 650+ venues using Playwright, transactional locking and entity resolution.
- Made ingestion retries safe with deterministic task IDs and atomic create-if-absent writes, preventing duplicate jobs from overwriting in-flight work.
- Built a Cloud Scheduler reprocessing loop that refreshes the most-stale sources first, tracking reprocess time and count per entity.

### EdPlus, Arizona State University | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Reduced transcript-analysis time from four hours to 15 minutes using a Neo4j knowledge graph and validated Cypher queries.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Built an idempotent ETL pipeline for 10,000+ researcher profiles daily, using PostgreSQL natural-key upserts to prevent duplicates after partial failures.
- Put data-quality gates in PostgreSQL, with uniqueness, not-null and range constraints, so bad rows fail at ingestion; dataset accuracy rose to 95%.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Migrated a C#/.NET monolith to Dockerized Kubernetes microservices, reducing infrastructure cost 20% and resource footprint 35%.

## PROJECTS

### Image Recognition as a Service | 01/2024 - 02/2024

- Built an AWS EC2/SQS image-processing service with queue-based scaling, asynchronous results and idempotent workers for safe message retries.

## TECHNICAL SKILLS

**Languages & Storage:** Python, SQL, TypeScript, S3, PostgreSQL, DuckDB, Lance, Firestore, Redis

**Pipelines & Orchestration:** ETL, AWS Step Functions (Distributed Map), Lambda, SQS, Cloud Run Jobs, Cloud Scheduler, Playwright

**Data Quality & Ops:** Data validation, data lineage, schema inference, idempotent reprocessing, entity resolution, CI checks, Docker, pytest


## EDUCATION

### Arizona State University (ASU) | 08/2023 - 05/2025

*M.S., Computer Science | GPA: 4.0* | *Tempe, AZ*

### Dhirubhai Ambani Institute of Information and Communication Technology | 08/2018 - 05/2022

*B.Tech., Information and Communication Technology* | *Gandhinagar, India*

