# ARCHIT AGRAWAL

Phoenix, AZ | 623-312-0435 | [architagrawal000@gmail.com](mailto:architagrawal000@gmail.com) | [LinkedIn](https://linkedin.com/in/agrawal-archit) | [GitHub](https://github.com/architagrawal) | [Personal Website](https://agrawal-archit.vercel.app)

## PROFESSIONAL EXPERIENCE

### EdPlus | 05/2026 - Present

*AI Software Engineer* | *Phoenix, AZ*

- Own the architecture, roadmap and delivery of a 12-agent AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, verified answers; TypeScript, NestJS, Nuxt.
- Cut wrong answers 85% on 164 published benchmark figures by reading every answer back in plain words and verifying it against the question before display.
- Extended analysis to statistical and causal questions with 25 tests and six causal estimators validated against scipy and statsmodels, scoring 68% on StatQA versus GPT-4o's best reported 64.83%.
- Quadrupled the insights automated reports surface, 13% to 52–59% on unseen datasets, by having an LLM agent choose the analyses while deterministic code computes every number.
- Showed model choice moves accuracy 33x more than pipeline design across models costing $5–$89 per 100k rows, redirecting the team's recommendation from accuracy to reliability.
- Benchmarked the platform against Claude Opus 5.5 working blind on public survey data, cutting wrong charts 93% with judge-free rule checks and an expert-calibrated LLM judge.
- Raised accuracy on the hardest benchmark questions from 60% to 93% with zero wrong answers, by routing every component through one shared semantic layer after larger models did not help.
- Reset the team's accuracy baseline after tracing a reported 0.637 F1 to a hand-reviewed spreadsheet; fresh runs reproduce 0.523.
- Kept deterministic rules wherever an agent failed to beat them: no LLM chart proposal outscored the rule table, and two managed agent runtimes were removed after re-benchmarking.
- Changed the evaluation from scoring charts to scoring the questions a survey asked, after healthy chart scores hid that only 19% were answered; coverage rose to 78%.
- Lowered labeling spend by testing codebook fit on a 25-row sample first, separating a workable codebook (0.598 fit) from an unusable one (0.316) for about $0.001.
- Designed a chart recommender over 17 chart types grounded in visualization research, accepting an LLM suggestion only when it outscores the rules.
- Eliminated a silent failure mislabeling 1 in 8 rows in the prior pipeline, reaching 100% join integrity with schema-constrained LLM output.
- Detected table shape with 98% accuracy and survey weights in 100% of files that ship one, up from 0%, so crosstabs, long tables and weighted surveys publish with no per-file code.
- Scaled labeling as a distributed Step Functions fan-out across 64 parallel lanes with a 5% failure circuit breaker, after tracing silent row loss in a run that reported success.
- Sped up a full AWS pipeline run 6x, 500 to 85 seconds, by replacing managed agent-runtime stages with direct tool calls once benchmarks showed each made one call and stopped.
- Authored the target production architecture: 80 logged decisions and 200+ measured experiments, grounded in prior art including SSSOM, DDI, Metabase MBQL, Vega-Lite, Draco and LIDA.

### MyStage Music Inc. | 07/2025 - 05/2026

*Founding AI/ML Engineer* | *Remote*

- Re-architected a 14-Cloud-Function backend into one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.
- Scaled ingestion to 70,000+ records a day from 650+ venues with a Playwright pipeline, transactional locking and Gemini entity resolution that raised search-dataset accuracy 25%.
- Implemented pause-and-resume on LangGraph interrupts, so a record missing context waits at its checkpoint instead of failing the batch.
- Designed a reusable scraping subgraph that parent graphs compose without checkpoint conflicts, letting webhook-triggered scrapes skip the fetch step.
- Delivered sub-50 ms search on FastAPI and Algolia with real-time Firestore sync, 200+ pytest tests and Logfire tracing.

### EdPlus | 09/2023 - 05/2025

*Software Engineer* | *Phoenix, AZ*

- Built a Prompt Flow eval harness scoring groundedness, relevance and coherence to gate every prompt change on results.
- Led a multi-tenant RAG assistant, React to retrieval layer, used by 1,000+ faculty to build courses for 60,000+ students.
- Added hybrid keyword and vector search so exact course codes resolve correctly where embeddings alone blur them together.
- Compared fixed-size against section-aware chunking on real course documents before choosing, because a split policy paragraph answers half a question.
- Cut transcript analysis 16x, four hours to 15 minutes, with a Neo4j knowledge graph queried by validated LLM-written Cypher.
- Attached a source citation to every answer, linking document and section, so faculty can verify a claim instead of trusting it.

### Arizona State University | 08/2024 - 05/2025

*Student Researcher* | *Phoenix, AZ*

- Built a PyTorch and Diffusers benchmark for text-to-video models that scores physical plausibility separately from visual quality, holding seed, resolution and sampler fixed.
- Found visual quality barely predicts physical plausibility: the top model by human preference ranked last on causal consistency.
- Designed a frame-level rubric for rigid-body motion, gravity, momentum and occlusion, and measured inter-rater agreement before trusting any aggregate score.
- Derived a failure taxonomy from annotated clips: broken object permanence, non-conserved mass, teleporting contact and physics that resets at a scene cut.

### Knowledge Exchange for Resilience, Arizona State University | 06/2024 - 08/2024

*Data Research Aide* | *Phoenix, AZ*

- Cut p95 retrieval latency 60% at 95% recall with a hybrid FAISS and Neo4j search layer.
- Built a FastAPI and pgvector recommender reaching 85% top-k precision for collaborator matching, fed by an ETL ingesting 10,000+ profiles a day, plus 20+ REST APIs on .NET 8.
- Lowered API latency 90% with Redis caching and SQL rewrites, and raised dataset accuracy to 95% with PostgreSQL constraints.

### Zeus Learning | 01/2022 - 07/2023

*Software Engineer* | *Mumbai, India*

- Built a Redis-backed desk-demand forecasting service used in 300+ Fortune 500 offices, with reported occupancy up 30%.

### DA-IICT | 05/2021 - 08/2021

*Computer Vision Researcher* | *Gandhinagar, India*

- Engineered an autonomous-driving perception stack in Python: radar and lidar capture, timestamp alignment, extrinsic calibration and point-cloud processing, with a replay harness over recorded drives.
- Compared early and late sensor fusion on identical sequences, showing point-level merging keeps detail but inherits both sensors' noise while object-level merging is robust but discards evidence.

## PROJECTS

### AiJockey – AI DJ Pipeline | [GitHub](https://github.com/architagrawal/aiJockey) | 2025 - Present

- Built an end-to-end AI DJ in PyTorch and FastAPI: stem separation, an LLM transition planner, 25+ DSP transitions and LUFS mastering, ported off CUDA to an AMD MI300X.
- Trained a MERT-95M reward head predicting four-axis audio aesthetics (final MSE 0.127) so the segment picker scores candidates without running full inference per render.
- Built DPO/KTO/IPO trainer variants for preference tuning, cutting DPO loss 31% (0.68 to 0.47) on labeled preference pairs.

### SRP Electric MCP Server | [GitHub](https://github.com/architagrawal/srp-electric-mcp) | 12/2025 - 01/2026

- Reverse-engineered an undocumented utility portal into a read-only TypeScript MCP server with Zod-validated tool schemas, normalized meter data and typed errors an agent can act on.
- Kept every tool read-only, so an agent exploring an undocumented portal cannot change a billing setting.

### MCP GitHub PR Review Agent | 07/2025 - 08/2025

- Built a TypeScript MCP service that reviews pull requests from the diff, linked ticket and CI result, returning schema-typed inline findings that gate merges by category.
- Reviews large PRs file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.

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

