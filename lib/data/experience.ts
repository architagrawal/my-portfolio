import type { Visual } from "@/components/soft/viz/types";
// Every role. `featured` picks the bullets shown on /work; the role page shows all.
export interface Achievement {
  text: string;
  techs?: string[];
}

export interface Role {
  slug: string;
  company: string;
  companyShort: string;
  role: string;
  location: string;
  period: string;
  kind: "industry" | "research";
  featured: number[];
  achievements: Achievement[];
  technologies: string[];
  visual?: Visual;
}

export const roles: Role[] = [
  {
    "slug": "ai-software-engineer-edplus-2026",
    "visual": {
      "kind": "waffle",
      "caption": "Rows that silently lost their label, one square per row",
      "rows": [
        {
          "label": "benchmark pipeline",
          "hit": 13,
          "total": 102,
          "value": "13 of 102, 12.7%"
        },
        {
          "label": "this platform, repeat runs",
          "hit": 0,
          "total": 114,
          "value": "0 of 114"
        }
      ]
    },
    "company": "EdPlus, Arizona State University",
    "companyShort": "EdPlus",
    "role": "AI Software Engineer",
    "location": "Phoenix, AZ",
    "period": "May 2026 – Present",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Platform ownership: own the architecture, roadmap and delivery of a platform that turns any uploaded dataset into analysis traceable to its source. Twelve agents over 76 registered tools on Step Functions, 290k lines of TypeScript and Vue across 12 workspace packages, 4,077 tests."
      },
      {
        "text": "Analyst agent: it sees one line per survey question and never a row, and returns typed intents that code compiles into plans. Headlined claims recovered went from 13% to 52-59% on held-out surveys, at about $0.05 per 13 surveys."
      },
      {
        "text": "Label reliability: schema-constrained decoding, per-response correlation tokens and citation verification took join integrity to 100% and label churn to zero across 114 of 114 rows. The benchmark pipeline destroyed a label on 13 of 102 rows, 12.7%, without flagging one."
      },
      {
        "text": "Charts from plain English: a reader asks a question, gets a chart back, then edits it directly with stack, swap, sort, top-N, filters, and undo with redo."
      },
      {
        "text": "Controlled experiment: model choice moved labelling F1 by 0.230, roughly 33× the 0.007 movement from pipeline shape, which redirected the team's recommendation from accuracy to reliability."
      },
      {
        "text": "Target architecture: authored the plan for the production platform that succeeds it, with six documents, 80 logged decisions, and four layers gated on exit criteria rather than dates."
      }
    ],
    "technologies": [
      "TypeScript",
      "AWS Bedrock",
      "AgentCore",
      "Step Functions",
      "AWS CDK",
      "DuckDB",
      "Lance",
      "Vega-Lite",
      "Nuxt 4",
      "NestJS",
      "Zod",
      "PostgreSQL",
      "Vitest",
      "Node.js"
    ],
    "kind": "industry"
  },
  {
    "slug": "founding-ai-ml-engineer-mystage-music-inc-2025",
    "visual": {
      "kind": "flow",
      "caption": "Where a scraped record goes before anyone can search it",
      "stages": [
        {
          "label": "650+ locations"
        },
        {
          "label": "Playwright",
          "note": "70,000+ a day"
        },
        {
          "label": "Gemini dedupe",
          "note": "+25% accuracy"
        },
        {
          "label": "Algolia"
        }
      ]
    },
    "company": "MyStage Music Inc",
    "companyShort": "MyStage Music Inc",
    "role": "Founding AI/ML Engineer",
    "location": "Remote",
    "period": "July 2025 – May 2026",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Pipeline re-architecture: as founding AI/ML engineer, rebuilt a 14-Cloud-Function event pipeline as a single checkpointed LangGraph agent-worker on Cloud Run Jobs."
      },
      {
        "text": "Scraping at scale: built and operated a Playwright service on Compute Engine that indexes 70,000+ records a day from 650+ locations, rotating proxies and backing off when sites push back."
      },
      {
        "text": "Entity resolution: Gemini-based dedupe before records reach Firestore and Algolia lifted downstream search dataset accuracy by 25%."
      },
      {
        "text": "Monolith to subgraph: refactored a 1,600-LOC Cloud Run service into a callable subgraph, cutting service dependencies 64% from 14 to 5."
      },
      {
        "text": "Search endpoints: FastAPI and Cloud Functions endpoints fronting Algolia for sub-50ms search latency and Firestore for real-time sync."
      },
      {
        "text": "Safe concurrency: atomic Firestore claim transactions and deterministic task IDs for retry idempotency, covered by 200+ pytest unit and integration tests."
      }
    ],
    "technologies": [
      "Python",
      "LangGraph",
      "FastAPI",
      "Playwright",
      "GCP",
      "Cloud Run",
      "Gemini Vertex AI",
      "Logfire",
      "Algolia",
      "Google Firestore",
      "pytest",
      "asyncio"
    ],
    "kind": "industry"
  },
  {
    "slug": "student-researcher-arizona-state-university-2024",
    "visual": {
      "kind": "quadrant",
      "caption": "Scored on two axes, so a pretty clip with impossible motion fails only one, illustrative",
      "x": "semantic fidelity",
      "y": "physics",
      "points": [
        {
          "x": 0.88,
          "y": 0.18,
          "label": "pretty, impossible motion",
          "accent": true
        },
        {
          "x": 0.82,
          "y": 0.84,
          "label": "good on both"
        },
        {
          "x": 0.28,
          "y": 0.72,
          "label": "right physics, wrong scene"
        }
      ]
    },
    "company": "Arizona State University",
    "companyShort": "Arizona State University",
    "role": "Student Researcher",
    "location": "Phoenix, AZ",
    "period": "August 2024 – May 2025",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Video evaluation harness: scores text-to-video output on physical plausibility separately from semantic fidelity, so impossible motion in a beautiful scene loses points on exactly one axis. Built in PyTorch and Diffusers."
      },
      {
        "text": "Physics rubric: a frame-sequence rubric for rigid-body motion, with trajectories scored against a constant-gravity analytic baseline rather than by eye."
      },
      {
        "text": "Controlled comparisons: minimal-pair prompts where exactly one clause changes, with seeds, resolution, frame count and sampler settings held fixed across models."
      },
      {
        "text": "Rater agreement: measured inter-rater agreement on a held-out subset before trusting a single aggregate score."
      },
      {
        "text": "Causality findings: counterfactual prompts degrade faster than descriptive ones at matched length, and fluency tracks physical plausibility only weakly, so a model ranked first on human preference can rank last on causality."
      }
    ],
    "technologies": [
      "Python",
      "PyTorch",
      "Diffusers",
      "Computer Vision",
      "Video Generation"
    ],
    "kind": "research"
  },
  {
    "slug": "software-engineer-edplus-2023",
    "visual": {
      "kind": "ratio",
      "caption": "Transcript analysis, 16x faster with a Neo4j graph and generated Cypher",
      "parts": 16,
      "before": "before: 4 hours, in 15-minute blocks",
      "after": "after: 15 minutes"
    },
    "company": "EdPlus, Arizona State University",
    "companyShort": "EdPlus",
    "role": "Software Engineer",
    "location": "Phoenix, AZ",
    "period": "Sept 2023 – May 2025",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Multi-tenant RAG assistant: led end-to-end development of an assistant used by 1,000+ faculty members to author courses reaching 60,000+ students."
      },
      {
        "text": "Knowledge graph: combined Neo4j with LLM-generated Cypher queries, making transcript analysis 16× faster by cutting it from 4 hours to 15 minutes."
      },
      {
        "text": "Retrieval quality: Prompt Flow evaluations for groundedness, relevance and coherence, hybrid vector plus keyword retrieval, and a citation on every answer."
      },
      {
        "text": "Tenant isolation: enforced at retrieval rather than in the prompt, with declarative per-tenant config, so onboarding a new college was a config change rather than a deployment."
      },
      {
        "text": "Assessment platform: REST APIs and SQL-backed admin surfaces for quiz platforms and question banks across ASU Online, with schema-level invariants for assessment integrity."
      },
      {
        "text": "Frontend engagement: responsive React and Material UI interfaces lifted engagement 35% and cut bounce 20%."
      }
    ],
    "technologies": [
      "Python",
      "LangChain",
      "OpenAI",
      "Prompt Flow",
      "Semantic Kernel",
      "Neo4j",
      "JavaScript",
      "Google Apps Script",
      "SQL",
      "Pandas"
    ],
    "kind": "industry"
  },
  {
    "slug": "data-research-aide-knowledge-exchange-for-resilience-2024",
    "visual": {
      "kind": "slope",
      "caption": "API latency after Redis caching and SQL rewrites",
      "from": {
        "tag": "before",
        "value": 198,
        "label": "198ms"
      },
      "to": {
        "tag": "after",
        "value": 20,
        "label": "20ms"
      }
    },
    "company": "Knowledge Exchange for Resilience, Arizona State University",
    "companyShort": "Knowledge Exchange for Resilience",
    "role": "Data Research Aide",
    "location": "Phoenix, AZ",
    "period": "June 2024 – August 2024",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Hybrid retrieval: a FAISS and Neo4j layer cut p95 query latency 60% while holding 95% recall."
      },
      {
        "text": "Latency reduction: Redis caching and SQL query rewrites took API latency from 198ms to 20ms, nearly 90%, verified under simulated peak load."
      },
      {
        "text": "ETL pipeline: an idempotent pipeline with Postgres constraints and validation checks raised dataset accuracy to 95% across 10,000+ faculty profiles ingested a day."
      },
      {
        "text": "Production APIs: delivered 20+ REST APIs for the NSF-funded Knowledge Alliance tool on .NET 8, Dapper and MediatR, secured with JWT and queued via AWS SQS."
      },
      {
        "text": "Recommendations and search: a FastAPI pgvector embedding service surfaced collaborator recommendations at 85% top-k precision, and an n-gram ranking model lifted search relevance 15% over baseline."
      }
    ],
    "technologies": [
      "Python",
      "PostgreSQL",
      "Pandas",
      "FAISS",
      "FastAPI",
      ".NET 8",
      "Dapper",
      "MediatR",
      "AWS SQS",
      "Redis",
      "Neo4j",
      "Docker",
      "Git",
      "REST APIs",
      "Locust"
    ],
    "kind": "industry"
  },
  {
    "slug": "software-engineer-zeus-learning-2022",
    "company": "Zeus Learning",
    "companyShort": "Zeus Learning",
    "role": "Software Engineer",
    "location": "Mumbai, India",
    "period": "Jan 2022 – July 2023",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Monolith to microservices: split a .NET monolith into microservices on Kubernetes as a strangler migration, cutting resource footprint by 35% and infrastructure cost by 20%."
      },
      {
        "text": "Release pipeline: SonarQube quality gates that block the merge plus containerized release pipelines, with deploy time down 70% and production incidents down 40%."
      },
      {
        "text": "Demand prediction: a Redis-backed desk-reservation service for 300+ offices at Fortune 500 companies; reported occupancy improved 30% under COVID-era hot-desk constraints."
      },
      {
        "text": "Frontend performance: paginated fetching and AWS S3-backed assets made the Angular student-listing screen 30% faster, and MySQL query rewrites cut class-details latency a further 10%."
      },
      {
        "text": "Single-page apps: React and Redux apps with normalized client-side state and typed REST integration raised measured UX scores by 40%."
      }
    ],
    "technologies": [
      ".NET",
      "C#",
      "MessageQueue",
      "Redis",
      "AWS",
      "Nginx",
      "Docker",
      "Kubernetes",
      "RabbitMQ",
      "Node.js",
      "SonarQube",
      "Git"
    ],
    "kind": "industry"
  },
  {
    "slug": "product-intern-eat-fit-2021",
    "visual": {
      "kind": "cadence",
      "caption": "Location polls keyed to distance left, sparse across town, dense near the door",
      "start": "across the city",
      "end": "two streets away",
      "ticks": [
        0,
        0.22,
        0.4,
        0.55,
        0.66,
        0.75,
        0.82,
        0.87,
        0.91,
        0.94,
        0.965,
        0.985,
        1
      ]
    },
    "company": "EAT.FIT",
    "companyShort": "EAT.FIT",
    "role": "Product Intern",
    "location": "Bengaluru, India",
    "period": "Sept 2021 – Dec 2021",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Adaptive polling: cut driver-location serving cost 45% with poll intervals keyed to distance remaining, interpolated on the client so movement still looks continuous."
      },
      {
        "text": "Live order tracking: a Google Maps screen with route polylines and an ETA recomputed on every fix, shipped during a quarter of 25% user growth."
      },
      {
        "text": "Notification service: WebSocket and Express.js with backpressure-aware fan-out and duplicate-safe reconnection; after launch, reported CSAT rose 28% and support volume fell 35%."
      },
      {
        "text": "Competitor data: a Python scraping toolchain pulling catalogs and reviews into the analytics warehouse on a schedule, normalized to one schema."
      }
    ],
    "technologies": [
      "React.js",
      "Google Maps API",
      "Python",
      "Node.js",
      "Express.js"
    ],
    "kind": "industry"
  },
  {
    "slug": "computer-vision-researcher-da-iict-2021",
    "company": "Dhirubhai Ambani Institute of Information and Communication Technology",
    "companyShort": "DA-IICT",
    "role": "Computer Vision Researcher",
    "location": "Gandhinagar, India",
    "period": "May 2021 – August 2021",
    "featured": [
      0,
      1,
      2
    ],
    "achievements": [
      {
        "text": "Perception stack: engineered autonomous-driving perception end to end, from radar and lidar capture and timestamp alignment to point-cloud processing."
      },
      {
        "text": "Replay harness: replayed recorded sensor logs so a perception change is evaluated against the same drive twice."
      },
      {
        "text": "Calibration and fusion: solved radar and lidar extrinsic calibration, and compared early against late fusion on identical sequences."
      },
      {
        "text": "HD-map localization: matched observed lane geometry against a prior map to correct GPS drift in urban canyons."
      }
    ],
    "technologies": [
      "Python",
      "Computer Vision",
      "Lidar",
      "Radar"
    ],
    "kind": "research"
  }
];

export const roleBySlug = (s: string) => roles.find((r) => r.slug === s);
