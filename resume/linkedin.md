# LinkedIn profile

The single source for LinkedIn. Same facts as `content.mjs` and the portfolio; wording follows
the house rules: each bullet leads with a term and a colon, concrete numbers, no em-dashes.
LinkedIn limits: headline 220 characters, About 2,600, each experience or project description 2,000.

## Headline

AI Software Engineer at ASU EdPlus. LLM agents, RAG and data platforms on AWS.

## Location

San Francisco Bay Area

## About

I build AI systems people can trust with real decisions.

At EdPlus, Arizona State University's online learning enterprise, I own the architecture, roadmap and delivery of a 12-agent analytics platform on AWS Bedrock and Step Functions. Ask any dataset a question in plain English and get a chart where every number is computed by code, cited to the rows it came from, and checked before it is shown. When it is unsure, it asks instead of guessing.

What it does today:
• Fewer wrong answers: cut 85% on 164 published benchmark figures by reading every answer back and verifying it.
• Statistics and causality: 25 statistical tests and six causal estimators matching scipy and statsmodels; 68% on StatQA test selection, above GPT-4o's best reported 64.83%.
• Hardest questions: accuracy up from 60% to 93%, with zero wrong answers.
• Better reports: an analyst agent quadrupled the insights a report surfaces, 13% to 52–59% on datasets it had never seen.
• Any file: reads table shapes with 98% accuracy and applies survey weights automatically, from Qualtrics exports to a 51,280-person federal survey.

How I work:
• Control first: I build the baseline the architecture could lose to. At a fixed model, model choice moved accuracy 33x more than pipeline design, which redirected the team toward reliability.
• Agents where they win: agents choose, code computes. Where rules matched an agent, the rules stayed, and removing two agent stages made a full AWS run 6x faster.
• Measured against the best: benchmarked on StatQA, QRData and BLADE, and against Claude Opus 5.5 working blind.

Before this:
• MyStage Music: as founding AI/ML engineer, rebuilt a 14-service backend as one LangGraph agent on GCP and scaled ingestion to 70,000+ records a day.
• EdPlus: led a multi-tenant RAG assistant used by 1,000+ faculty to build courses for 60,000+ students.
• ASU research: a benchmark showing text-to-video models that look best often get physics worst.
• Zeus Learning: shipped services used across 300+ Fortune 500 offices and cut deploy time 70%.

Outside work: AiJockey, an AI DJ with its own audio-quality reward model, and MCP servers that give AI agents safe tools.

Tools: Python, TypeScript, SQL, LangGraph, AWS (Bedrock, Lambda, Step Functions), GCP, PostgreSQL, Neo4j, Redis, Kubernetes, React.

MS Computer Science, Arizona State University, 4.0 GPA. Based in the San Francisco Bay Area and open to AI engineering, machine learning and data platform roles.

Case studies: agrawal-archit.vercel.app

## Experience

### AI Software Engineer, EdPlus at Arizona State University (Jun 2026 – Present, contract)

• Platform: own the architecture, roadmap and delivery of a 12-agent AI analytics platform on AWS Bedrock and Step Functions that turns any structured dataset into cited, verified answers with no per-dataset code.
• Answer checking: cut wrong answers 85% on 164 published benchmark figures by reading each answer back in plain words and verifying it before display.
• Statistics and causality: added 25 statistical tests and six causal estimators validated against scipy and statsmodels; 68% on StatQA versus GPT-4o's best reported 64.83%.
• Analyst agent: quadrupled the insights automated reports surface, 13% to 52–59% on unseen datasets, with the agent choosing analyses and code computing every number.
• Hardest questions: raised accuracy from 60% to 93% with zero wrong answers by giving every component one shared semantic layer, after bigger models did not help.
• Frontier benchmark: tested against Claude Opus 5.5 working blind on public survey data; general fixes cut wrong charts 93%.
• Reliability: eliminated a silent failure that mislabeled 1 in 8 rows in the prior pipeline, reaching 100% join integrity.
• Scale: fanned labeling across 64 parallel lanes with a 5% failure circuit breaker, and made a 51,280-person federal survey publish 10x faster.
• Product: a Nuxt and NestJS app where readers ask in plain English, then stack, sort, filter and undo on the chart directly.
• Reading any file: detects table shape with 98% accuracy and survey weights in 100% of files that ship one, so new datasets need no custom code.
• Fewer agents, faster: replacing two managed agent-runtime stages with direct tool calls made a full AWS run 6x faster.
• Cost: the analyst agent runs at about $0.03 a survey, and dashboards make zero model calls.
• Evidence: 200+ measured experiments and 80 logged decisions behind the production architecture.

### Software Engineer, EdPlus at Arizona State University (Sep 2023 – May 2025, student employment)

• RAG assistant: led a multi-tenant Graph RAG assistant, React front end to retrieval layer, used by 1,000+ faculty to build courses reaching 60,000+ students.
• Knowledge graph: cut transcript analysis 16x, four hours to 15 minutes, with a Neo4j knowledge graph queried by schema-validated, LLM-written Cypher.
• Tenant isolation: kept each college's material out of other colleges' answers at the retrieval layer, so onboarding a college became a config change, not a deployment.
• Evaluation: built a Prompt Flow harness scoring groundedness, relevance and coherence, so every prompt change shipped on measured results.
• Retrieval quality: hybrid keyword and vector search for course codes that embeddings blur, tested chunking strategies, and a source citation on every answer.
• Course feedback: an LLM system turning end-of-semester course evaluations into improvement suggestions.
• Assessment platform: React and Material UI tools for question banks lifted engagement 35% and cut bounce 20%.
• Automation: Google Apps Script that builds Drive folders and documents from Sheets, ending manual course setup.

### Founding AI/ML Engineer, MyStage Music (Mar 2025 – Jun 2026, full-time, remote)

• Agent re-architecture: rebuilt a 14-Cloud-Function event pipeline as one checkpointed LangGraph agent in Python on GCP Cloud Run, cutting production service dependencies 64%.
• Ingestion at scale: a Playwright scraping service collecting 70,000+ records a day from 650+ venues, with proxy rotation, backoff and transactional locking against duplicate work.
• Entity resolution: Gemini on Vertex AI deduplicates events before they reach search, raising search-dataset accuracy 25%.
• Search: sub-50 ms search on FastAPI and Algolia with real-time Firestore sync.
• Pause and resume: a record missing context waits at its checkpoint while research runs, instead of failing the day's batch.
• Safe retries: atomic claim transactions and deterministic task IDs, so a retried job never overwrites one in flight.
• Extensibility: adding a new data source is one Python module with zero changes to the graph.
• Quality: 200+ pytest unit and integration tests and end-to-end Logfire tracing across pause and resume.

### Student Researcher, Arizona State University (Aug 2024 – May 2025)

• Benchmark: built a PyTorch and Diffusers harness scoring text-to-video models on physical plausibility separately from visual quality, with seed, resolution and sampler held fixed.
• Physics rubric: scored rigid-body motion, gravity, momentum and occlusion frame by frame against a constant-gravity baseline, checking inter-rater agreement first.
• Prompt design: minimal-pair prompts where exactly one clause changes, so a score gap isolates the causal claim.
• Findings: visual quality barely predicts physical plausibility; the model ranked first by human preference ranked last on causal consistency, and counterfactual prompts degrade fastest.
• Failure taxonomy: broken object permanence, non-conserved mass, teleporting contact and physics that resets at a scene cut.

### Data Research Aide, Knowledge Exchange for Resilience at ASU (Jun 2024 – Aug 2024, internship)

NSF-funded Knowledge Alliance project.
• Hybrid retrieval: a FAISS and Neo4j search layer cut p95 latency 60% at 95% recall.
• API latency: Redis caching and SQL rewrites took latency from 198 ms to 20 ms, a 90% cut, verified under Locust load tests.
• Recommendations: a FastAPI and pgvector service matching collaborators at 85% top-k precision.
• Search relevance: an n-gram ranking model over cleaned profile text lifted search relevance 15%.
• ETL: an idempotent pipeline ingesting 10,000+ faculty profiles a day, with PostgreSQL integrity checks raising dataset accuracy to 95%.
• APIs: 20+ production REST APIs on .NET 8 with Dapper, MediatR, JWT and AWS SQS.

### Software Engineer, Zeus Learning (Jun 2022 – Jul 2023, full-time)

• Booking platform: a Redis-backed desk and meeting-room booking service across 300+ offices at Fortune 500 companies including Goldman Sachs and Merck; reported occupancy up 30%.
• Microservices: migrated a .NET monolith to Kubernetes microservices behind the existing API, reducing infrastructure cost 20% and resource footprint 35%.
• Delivery: containerized the CI/CD release pipeline and added SonarQube quality gates; deploy time down 70%, production incidents down 40%.
• Performance: made the student-listing screen 30% faster with pagination and S3 asset delivery, and cut class-detail latency 10% with query rewrites.
• Internal tooling: a published npm package wrapping the Slack Web API for the company's social platform.

### Software Engineer Intern, Zeus Learning (Jan 2022 – Jun 2022)

• Learning platform: exam grading and solution-video linking in a custom LMS used by 100+ teachers and 10,000+ students, in React and Node.js.
• Testing: Jest unit tests across the platform.
• Community app: an internal social site where employees form interest groups and run events.

### Product Intern, Curefoods (EatFit) (Sep 2021 – Dec 2021)

• Order tracking: cut driver-tracking server cost 45% with distance-based polling and client-side interpolation, so movement still looks smooth.
• Live tracking: a Google Maps order-tracking screen with route lines and a live ETA, shipped during a quarter of 25% user growth.
• Notifications: a WebSocket and Express notification service with safe reconnection; reported CSAT rose 28% and support volume fell 35%.
• Competitor data: automated scraping of competitor prices and reviews in Python, Selenium and Django.
• Product: revamped the deals page and categories section after customer interviews.

### Computer Vision Researcher, DA-IICT (May 2021 – Aug 2021, internship)

• Perception stack: engineered autonomous-driving perception in Python, from radar and lidar capture and timestamp alignment to point-cloud processing.
• Calibration and fusion: put radar and lidar in one frame of reference and compared early against late sensor fusion on identical drives.
• Replay harness: replayed recorded drives so a perception change is evaluated on the same data twice.
• Localization: studied HD-map matching to correct GPS drift in urban canyons.

## Education

Arizona State University: Master's degree, Computer Science, Aug 2023 – May 2025. Grade: 4.0 GPA. Keep the course list.

## Projects

Add (new on LinkedIn):
- Survey Agents (Jun 2026 – Present, EdPlus), link agrawal-archit.vercel.app/work/survey-agents: Ask any dataset a question in plain English and get an answer you can make a decision on. Every number is computed by code, cited to its rows and checked before it is shown. Cut wrong answers 85% on 164 published figures; 68% on StatQA, above GPT-4o's best reported 64.83%.
- EdSpace (Oct 2026, EdPlus), link agrawal-archit.vercel.app/work/edspace: A live map of the EdPlus office: find your people, book a room in three taps, walk to any desk, and make your own desk in 3D. Built in two days for the EdPlus hackathon, shown to leadership up to the CEO and chairman, and going live for 500+ people.
- AiJockey (2025 – Present), link github.com/architagrawal/aiJockey: An end-to-end AI DJ that separates stems, reads musical structure, plans and renders 25+ kinds of transitions, and masters the mix, with an audio-quality reward model improving future decisions. Ported off CUDA to an AMD MI300X.
- SRP Electric MCP Server (Dec 2025 – Jan 2026), link github.com/architagrawal/srp-electric-mcp: A Python MCP server (Model Context Protocol, the standard way to give AI agents tools) that logs into an undocumented utility portal and gives agents 7 tools and 4 analysis prompts for billing, usage, payments and outages.
- PR Review Agent (Jul 2025 – Aug 2025): An MCP service that reviews pull requests from the diff, linked ticket and CI result, posting schema-typed inline findings that gate merges by category.
- No-Code Pipeline Builder (2025): A visual pipeline editor with typed nodes, reliable undo and redo, autosave, keyboard workflows and server-side graph validation, in React, ReactFlow and FastAPI.
- Survey Intelligence Platform (Aug 2026, EdPlus): The production architecture the survey POC argues for: six documents, 80 logged decisions and four layers gated on exit criteria rather than dates.
- Soccer Result Prediction (Oct 2023 – Dec 2023): Match-outcome prediction combining LSTM, RNN, Random Forest and XGBoost with sentiment and betting data; accuracy up 12%.
- E-Commerce Platform (Sep 2024 – Dec 2024): A storefront with authentication, product search and Stripe payments on React, Django, PostgreSQL and Redis.
- Task Management System (Feb 2024 – May 2024): A collaborative task tool with ownership, progress tracking, deadline notifications and JWT authentication on React and Flask.
- Real-Time Chat Application (Jul 2024 – Oct 2024): Private and group messaging over Django Channels WebSockets, with geolocation features and usage maps.

Rewrite (already on LinkedIn, keep dates as they are there):
- Remaining useful life of jet engines: Predicts how many operating cycles a jet engine has left from its sensor history, on NASA's CMAPSS turbofan data. Engineered features to find the sensors that carry the most signal about wear, then compared machine learning, deep learning and generative AI regressors.
- ERC-721 Token Standard Smart Contract: Wrote and deployed an ERC-721 NFT contract in Solidity to the Polygon Amoy testnet for ASU's CSE 598, tested in Remix IDE with MetaMask.
- Serverless Document Processing Pipeline: A serverless document system on AWS S3, Lambda, API Gateway, DynamoDB and EC2 with a React front end, handling 1,000+ concurrent requests at 99.9% uptime. Automated EC2 management cut processing time 40%.
- Image Recognition as a Service: An image-recognition service on AWS EC2 and SQS that scales out and in with demand, capped at 20 instances, serving 100 concurrent requests.
- Reverse-Mode Automatic Differentiation: An autodiff engine with custom gradient operators and CUDA kernels that trains multilayer perceptrons.
- Handwritten Digit Recognition: A convolutional network in TensorFlow reading MNIST digits at 99.2% accuracy, improving on a logistic-regression baseline.
- FitLife Health Track App: An Android app measuring heart and breathing rates and recommending workout routines with machine learning and fuzzy logic.
- Application of statistical learning theory in big data analysis: Graduate course project; see Remaining useful life of jet engines.
- clankeeper and prismSplit: synced from connected apps, so they cannot be edited on LinkedIn.

## Skills

Add: Python, TypeScript, SQL, Large Language Models (LLM), AI Agents, Retrieval-Augmented Generation (RAG), LangGraph, LangChain, LLM Evaluation, Model Context Protocol (MCP), PyTorch, Amazon Bedrock, AWS Lambda, AWS Step Functions, Google Cloud Platform (GCP), Kubernetes, Docker, CI/CD, Distributed Systems, Microservices, PostgreSQL, Neo4j, Redis, FastAPI, NestJS, Node.js, React.js, ETL, Data Pipelines.
Top skills (pinned): Python, Large Language Models (LLM), Retrieval-Augmented Generation (RAG), Amazon Web Services (AWS), Distributed Systems.
Keep the existing skills.

## Featured

- Replace the resume link with agrawal-archit.vercel.app/Archit_Agrawal_AI_Software_Engineer_Resume.pdf.
- Add the Survey Agents case study, agrawal-archit.vercel.app/work/survey-agents.
- Keep the GitHub profile link.
