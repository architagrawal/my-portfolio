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
  /** every original point the highlights do not state in full, original wording */
  more: { label: string; items: string[] }[];
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
      2,
      6
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
      },
      {
        "text": "EdSpace: built in two days for the EdPlus hackathon, a live office map with room booking, desk claiming, walking routes and a 3D desk per person. Shown to leadership up to the CEO and chairman, and going live for 500+ people."
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
    "kind": "industry",
    "more": [
      {
        "label": "Highlights in full",
        "items": [
          "Own the architecture, roadmap and delivery of a platform that takes any structured dataset a team uploads and returns analysis traceable to its source: twelve agents over 76 registered tools, orchestrated by a Step Functions machine generated from a declarative graph, with Distributed Map fan-out, a bounded repair loop and a failure circuit breaker. 290k lines of TypeScript and Vue across 12 workspace packages, 4,077 tests, and no per-dataset pipeline to maintain.",
          "Shipped the product surface rather than stopping at a pipeline: a reader asks a question in plain English and gets a chart back, then edits it directly - stack, swap, sort, top-N, a second shape, highlight one category, filters on more than one value, and undo with redo - each of which had previously been reachable only by typing exactly the right sentence.",
          "Found where agency actually pays by moving it from executing analyses to choosing them: an analyst agent that sees one line per survey question and never a row returns typed intents that code compiles into plans, taking headlined claims recovered from a published analysis from 13% to 52-59% on held-out surveys against a rule-built baseline, at about $0.05 per 13 surveys.",
          "Eliminated a previously unmeasured failure mode with schema-constrained decoding, per-response correlation tokens and citation verification: out-of-codebook labels are rejected, silently overwritten rows are detected, join integrity reached 100% and label churn was zero across 114 of 114 rows on repeat runs. The benchmark pipeline destroyed a label on 13 of 102 rows, 12.7%, without flagging one."
        ]
      },
      {
        "label": "The agent system",
        "items": [
          "Grew the pipeline to twelve agents with their own tool sets: intake, label, qa, curate, adjudicate, analysis, analytics, viz, conclude, coordinator and explore, under an orchestrator whose tools are the other agents.",
          "Added a curate agent that repairs the codebook itself: cluster confusable codes, find the gaps, draft the distinction that separates two of them, then freeze the profile so labelling runs against a fixed target.",
          "Introduced an adjudicate agent that locates contested rows and re-decides only those, turning ensemble disagreement into a bounded second pass instead of a full re-label."
        ]
      },
      {
        "label": "Labelling reliability",
        "items": [
          "Recovered scrambled label batches instead of dropping rows: discard the batch whole, re-label at batch size 1, then quarantine and abstain, capped at 2 iterations. Correlation integrity has never dropped below 100% since.",
          "Calibrated codebook fit before spending anything on labelling: embed the question scope, sample-label 25 rows. The right codebook separates at 0.598 and a 4% abstain rate against 0.316 and 88%, for about $0.001."
        ]
      },
      {
        "label": "Intake",
        "items": [
          "Split intake into five gated stages (frame, repair, retype, classify, review) where the orchestrator is ordinary code and the model is consulted only where the rules are visibly unsure.",
          "Unlocked a time axis on roughly seven in ten real exports, which had been reporting no date column while carrying the timestamp packed inside an identifier. The same intake survives UTF-16 null-byte headers, duplicate headers overwriting a column, and 0/1 flags typed as rating scales.",
          "Emitted every intake decision as one replayable JSON recipe: across every export shape we could construct, the model is consulted a handful of times, the sweep costs a fraction of a cent, and a run has never once diverged from its replay."
        ]
      },
      {
        "label": "The ask path",
        "items": [
          "Structured the ask path as eight tools around a single model call: describe the survey, bind the question, choose a rung, execute the plan, compose the answer, compare runs, propose follow-ups.",
          "Compiled questions into Metabase's MBQL plan shape so one format serves both the agent and a UI query builder. A dashboard panel posts the plan the model would have written, at ~20 ms and $0.",
          "Designed refusal as the last rung of a ladder: substitute, decompose, sample, extend, request. An unanswerable question returns the missing column by name instead of an invented reason.",
          "Cached question-to-plan bindings with the plan hashed into the key, turning the one non-deterministic step in the read path into a lookup, and making falling hit similarity a signal that the corpus moved.",
          "Shipped a question passport on every answer (plan hash, dataset, registry and skill versions) that re-executes byte-identically, with shadow re-execution diffing recent answers whenever a definition changes.",
          "Wired metric lint to CI, so a declared metric that can no longer be computed against a stored run fails the build rather than rotting silently between releases."
        ]
      },
      {
        "label": "Visualization",
        "items": [
          "Composed a visualization agent of seven tools (propose, check, draw, repair, restyle, describe, shorten labels) over nine marks, where the request vocabulary is deliberately wider than the draw vocabulary so a refusal can name the word it could not honour.",
          "Fanned one chart spec into five artifacts through a constrained Vega-Lite compiler: the chart, an accessible data table, alt text, a CSV and an ASCII rendering, with repeatability tested by diffing specs instead of images.",
          "Made charts conversational: a reader asks about the chart in front of them and the reply lands where they are looking, still resolving to the facts the analytics stage computed.",
          "Derived mark selection from published visualization research (Cleveland & McGill, Bertin, Mackinlay's APT, Draco, Brehmer & Munzner) so chart choice cites evidence rather than taste, with the agent confined to proposing mark and encoding behind four gates.",
          "Attacked my own scorer with an oracle over the agent's search space before trusting it. A word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from."
        ]
      },
      {
        "label": "Data model",
        "items": [
          "Modelled the platform over a deliberately narrow fact table where dimension and key are columns, so a survey of departments and a survey of campuses union without a migration and without new SQL.",
          "Typed change itself with four lineage relations (relabel, recode, wave, wave_recoded) where only a new wave may claim topic movement, so a second labelling pass cannot present itself as a trend.",
          "Blocked the cross-survey join that silently double counts: a respondent fingerprint catches runs that share respondents, after a pooled breakdown counted every one of them twice while reporting a denominator that looked perfectly self-consistent."
        ]
      },
      {
        "label": "Application",
        "items": [
          "Delivered a 14-page Nuxt 4 front end over a NestJS API of ten modules (uploads, surveys, codebooks, analysis, comparisons, exports, governance, templates, jobs), all compiling against one shared TypeScript contract."
        ]
      },
      {
        "label": "AWS deployment",
        "items": [
          "Compiled one graph file into two deployment targets, Lambda-bound and AgentCore-bound, gated at load time so an edge to a node that does not exist fails before a run starts rather than halfway through one.",
          "Traced a fully SUCCEEDED execution that had silently dropped part of the corpus to concurrent Distributed Map iterations writing the same slot, then partitioned the writes and added a real fan-in, because green meant nothing until that held.",
          "Benchmarked a managed agent runtime against a hand-rolled loop, then removed it when the benchmark was repeated: AgentCore took labelling from partial to complete coverage where our own loop stalled, but once that loop was gone the stage made one tool call and stopped, and 49.8s of its 65.4s was the container booting. Both remaining harnesses now call their tool directly.",
          "Bounded blast radius with a ToleratedFailurePercentage circuit breaker at 5%, halting a run once that share of batches fails instead of grinding through every remaining batch and paying for all of them."
        ]
      },
      {
        "label": "Measurement",
        "items": [
          "Retired the 0.637 baseline every prior claim in the project rested on, after fresh runs reproduced it at 0.523 and traced the gap to a delivered spreadsheet that had been human-reviewed before it shipped.",
          "Held every agent to improve-or-discard: across the whole evaluation corpus not one chart proposal has beaten the deterministic rule table, so the rule table stayed. A consensus signal measured on held-out data separated about 4× better than the risk score it replaced."
        ]
      },
      {
        "label": "Platform architecture",
        "items": [
          "Built the semantic layer that decides what any dataset can be asked: plain English compiles to an MBQL plan, clears seven validation checks, then executes against stored facts with DuckDB on a miss. Metrics bind to column kinds rather than column names, so a survey the system has never seen is fully answerable the moment it lands, and a question nobody predeclared still returns a cited number.",
          "Authored the target architecture for the production platform that succeeds it: six documents, 80 logged decisions, four sequenced layers gated on exit criteria rather than dates, and eight candidate mechanisms each paired with an experiment that can validate or reject it.",
          "Staged the candidate-presentation ladder that makes a large codebook affordable: send it whole, split it by its own top level, cluster similar responses behind one shared shortlist, then retrieve per response. Each rung is tried before the next, and two measurements decide the drop.",
          "Specified learning scopes so a fix travels exactly as far as its evidence: a correction fixes one row, a codebook edit reaches one project's future runs, a shared definition change needs every affected department to sign off, and nothing alters a run already in flight.",
          "Made shared vocabularies forkable instead of contested: when two departments pull a definition in opposite directions it forks with its history intact, rather than one team silently winning.",
          "Sampled QC as a blind random audit per run, powering both the quality score and a corrected estimate published with an honest margin of error beside the raw number.",
          "Set accept and abstain cutoffs from conformal thresholds so the error rate on accepted labels stays under a stated bound, with every label carrying a calibrated 0–100 confidence rather than a vibe.",
          "Kept every correction instead of overwriting it: the model's original answer and each human change with who and when, plus run versions that reuse unchanged rows so a re-run shows the edit's effect rather than model randomness, at no extra cost.",
          "Ruled managed agent frameworks out of the control path with a stated reason: Bedrock Agents, Knowledge Bases and Flows own prompt construction, retrieval and orchestration, which are three of the four artifacts a published number's reproducibility depends on.",
          "Wrote the technology radar as scope markers rather than a wish list: in scope, out of scope, or field survey only, after the document was twice misread as a build list and once as a commitment to train models.",
          "Put PII redaction ahead of every model call and specified sensitive-disclosure triage with escalation, with sign-in on Cognito while every permission decision stays in code we own."
        ]
      },
      {
        "label": "Platform and governance",
        "items": [
          "Deployed the governance surface in the POC to match: Bedrock guardrails deployed as their own stack, entitlement-gated respondent-level retrieval, and spend caps enforced inside stages after an audit found the guard doing nothing. The personal-data layer was later removed by decision, with name-shaped columns kept as a descriptive kind that is never analysed, which has to be revisited before a real upload.",
          "Ran the platform with no database: DuckDB in-process over per-run JSON, Lance loaded as a DuckDB extension for vector and BM25 retrieval straight from S3, facts bounded at ~150 KB per run against 14–178 MB of payload.",
          "Proved scale with five reproducible checks rather than slides: 200× rows at unchanged ask latency, cross-scope queries over 216 runs in milliseconds, and replays that call no model at all."
        ]
      },
      {
        "label": "The design record",
        "items": [
          "Grounded the architecture in 12 logged prior-art passes: SSSOM mapping predicates, the DDI survey-metadata model, MBQL, Vega-Lite, Draco, Sato and Sherlock context-aware typing, XLSForm, GPTCache, LinkML, SDMX and SKOS.",
          "Documented what was deliberately not built and what would reopen it: no warehouse, so Cube and dbt's semantic layer stayed out; no text-to-SQL, since the model never sees a row after labelling; no agentic orchestrator, since the repair it was buying is a Choice state and a counter.",
          "Drew the line between what may extend and what may not: parsers, kinds, metrics, operators and marks extend without touching existing code, while the validator, the gate, provenance and grain enforcement require human review.",
          "Authored the decision record the team works from: roughly 200 measured experiments and rejected alternatives, each stating what it establishes and what it does not, including that at equal model the pipeline moves F1 by -0.007 while the model choice moves it by +0.230, and that the codebook-description lever the project had named its largest was measured and lost."
        ]
      }
    ]
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
    "kind": "industry",
    "more": [
      {
        "label": "Highlights in full",
        "items": [
          "As founding AI/ML engineer, re-architected a 14-Cloud-Function event pipeline into a single LangGraph agent-worker on Cloud Run Jobs - sourcing, extraction, resolution, and image fan-out now run as one composable, checkpointed graph."
        ]
      },
      {
        "label": "Graph architecture",
        "items": [
          "Factored out a reusable build_scraping_subgraph() factory compiled without a Firestore checkpointer so parent graphs compose it without nested-checkpoint conflicts; added route_entry bridge letting webhook-sourced scrapes skip URL-fetch and enter at extraction.",
          "Implemented interrupt()/resume pause-for-research contract: subgraph idempotently enqueues a domain-research task on missing domain_metadata/{tld}, calls interrupt(f\"domain_research:{tld}\"), resumes from checkpoint when external pipeline flips parent task to ready.",
          "Designed pure-function routing predicates (route_after_sourcing/extraction/resolution) over typed state for deterministic flow; used Send-based parallel image fan-out with per-Send error isolation via operator.add-reduced state field.",
          "Refactored a monolithic 1,600-LOC Cloud Run service into a callable subgraph with history preserved, a full import-path rewrite, and dependency relocation - cutting service dependencies 64% from 14 to 5."
        ]
      },
      {
        "label": "Concurrency and idempotency",
        "items": [
          "Wrote atomic Firestore claim transactions with status == \"ready\" preconditions for multi-worker concurrency; used deterministic agent-task IDs with create() + AlreadyExists for true retry idempotency (set() would clobber in-flight tasks).",
          "Extended canonical Performance entity with next_reprocess_time / last_reprocess_time / reprocess_count; built Cloud Scheduler trigger emitting process-reprocess-event-data tasks and most-stale URL selection over entity_sources ordered by last_successful_scrape_time ASC."
        ]
      },
      {
        "label": "Observability",
        "items": [
          "Wired Logfire distributed-trace context propagation: scheduler captures root ctx per URL into agent_tasks/{id}.ctx, runner attach_context() on claim and resume so worker spans nest under producer trace across pause/resume; added per-tick metric_counter instrumentation."
        ]
      },
      {
        "label": "Testing",
        "items": [
          "Covered routing predicates, fetcher nodes, mocked Firestore claim transactions, idempotent enqueue under retry, HITL resume payloads and image fan-out isolation with 200+ pytest unit and integration tests; pytest-asyncio auto mode with mock_async_db fixtures for Firestore-free runs."
        ]
      }
    ]
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
    "kind": "research",
    "more": [
      {
        "label": "Highlights in full",
        "items": [
          "Built an evaluation harness for text-conditioned video generation that scores physical plausibility separately from semantic fidelity, so a model that renders a beautiful scene with impossible motion loses points on exactly one axis instead of averaging the failure away.",
          "Designed a frame-sequence rubric for rigid-body motion: does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on.",
          "Measured inter-rater agreement on a held-out subset before trusting a single aggregate score, because a rubric two people apply differently is a preference, not a measurement."
        ]
      },
      {
        "label": "Prompt design",
        "items": [
          "Wrote minimal-pair prompts where exactly one clause changes (a ball rolls off the table against a ball is placed on the table) so a score gap isolates the causal claim rather than the scene.",
          "Mapped a prompt taxonomy across event ordering, counterfactual conditions, object permanence and multi-agent interaction, so a weakness lands in a named category instead of a general impression."
        ]
      },
      {
        "label": "Scoring",
        "items": [
          "Held generation fixed across models: identical seeds, resolution, frame count and sampler settings, so a comparison measures the model and nothing around it.",
          "Automated frame extraction and per-frame annotation in PyTorch and Diffusers, storing per-clip artifacts so any score traces back to the frames that produced it.",
          "Scored trajectories against a simple analytic baseline rather than by eye, flagging a clip when observed acceleration departs from constant-gravity motion beyond a stated tolerance."
        ]
      },
      {
        "label": "Findings",
        "items": [
          "Derived a failure taxonomy from the annotated clips: broken object permanence, non-conserved mass, contact that teleports, and physics that silently resets at a scene cut.",
          "Found counterfactual prompts degrade faster than descriptive ones at matched length, so apparent fluency on a benchmark prompt set overstates a model's grasp of causal structure.",
          "Reported the uncomfortable correlation: fluency and physical-plausibility scores track each other weakly, so a model ranked first on human preference can rank last on causality."
        ]
      }
    ]
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
    "kind": "industry",
    "more": [
      {
        "label": "Retrieval quality",
        "items": [
          "Built the Prompt Flow evaluation harness that scores groundedness, relevance and coherence on a fixed question set, so a prompt change shipped on evidence rather than on how the first three answers felt.",
          "Measured chunking instead of assuming it: fixed-size splitting against section-aware splitting on real course documents, because a policy paragraph cut in half answers half a question.",
          "Ran hybrid retrieval, vector plus keyword, since course codes and policy numbers are exactly the tokens an embedding blurs and exactly what faculty search for.",
          "Surfaced a citation with every answer, linking the source document and section, so a faculty member can check a claim rather than trust it."
        ]
      },
      {
        "label": "Multi-tenancy",
        "items": [
          "Enforced tenant isolation at retrieval rather than in the prompt, so one college's material cannot surface in another's answer even when the instruction is ignored.",
          "Kept per-tenant configuration declarative (corpus scope, model, prompt version), so onboarding a new college was a config change rather than a deployment."
        ]
      },
      {
        "label": "The knowledge graph",
        "items": [
          "Constrained generated Cypher to a schema allow-list, so a model-written query cannot traverse outside the sanctioned subgraph or return a node nobody meant to expose."
        ]
      },
      {
        "label": "Assessment platform",
        "items": [
          "Shipped the admin surfaces the instructional designers run on: bulk import, question reuse across banks, and a diff view before a bank is republished."
        ]
      },
      {
        "label": "Automation and UI",
        "items": [
          "Authored Google Apps Script automation generating Drive folder/doc hierarchies from Sheets metadata, eliminating manual course-provisioning toil."
        ]
      }
    ]
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
    "kind": "industry",
    "more": [
      {
        "label": "Retrieval",
        "items": [
          "Stood up a FastAPI embedding microservice over Postgres/pgvector for faculty-profile similarity, surfacing collaborator recommendations at 85% top-k precision.",
          "Lifted search relevance 15% over baseline with a bigram and n-gram ranking model over cleaned faculty profile text.",
          "Tuned the pgvector index against exact search rather than by feel, trading recall for latency deliberately and recording where the curve bends.",
          "Chose the FAISS index by measurement: a flat index is exact and does not survive the corpus growing, so the switch to a partitioned index came with its recall cost stated."
        ]
      },
      {
        "label": "Data pipeline",
        "items": [
          "Made the ETL idempotent on a natural key so a re-run after a partial failure updates rather than duplicates, which is what let the pipeline be retried without a cleanup script.",
          "Put the data-quality gates in Postgres rather than in the loader: uniqueness, not-null and range constraints, so bad rows fail at the boundary instead of being discovered in a report."
        ]
      },
      {
        "label": "Platform APIs",
        "items": [
          "Delivered 20+ production REST APIs for NSF-funded Knowledge Alliance tool using .NET 8 + Dapper + MediatR clean architecture, secured with JWT and queued via AWS SQS.",
          "Used MediatR pipeline behaviours for validation, logging and error shaping, so a new endpoint inherits the cross-cutting rules instead of reimplementing them, with long work pushed to SQS to keep the API responsive."
        ]
      },
      {
        "label": "Performance and load",
        "items": [
          "Wrote pytest unit + Locust load suites against FastAPI endpoints, establishing throughput and latency SLOs prior to release."
        ]
      }
    ]
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
    "kind": "industry",
    "more": [
      {
        "label": "Breaking up the monolith",
        "items": [
          "Ran the split as a strangler migration behind the existing API, so routes moved service by service while the monolith kept serving and no release needed a big-bang cutover.",
          "Found the 35% footprint cut in the requests and limits rather than the code: pods had been provisioned for a peak that the observed usage never reached."
        ]
      },
      {
        "label": "Delivery pipeline",
        "items": [
          "Made the SonarQube gate block the merge instead of warning after it, scoped to new code so a legacy backlog could not make the gate meaningless on day one."
        ]
      },
      {
        "label": "The prediction service",
        "items": [
          "Fed the desk-demand model on historical occupancy by floor, day and team, served from Redis so a booking screen across 300+ sites renders without waiting on a recompute."
        ]
      },
      {
        "label": "Frontend performance",
        "items": [
          "Cut the class-details page further with index-covering query rewrites after profiling showed the slow path was a full scan behind a join nobody had reviewed since the schema changed."
        ]
      },
      {
        "label": "Internal tooling",
        "items": [
          "Published an internal npm package wrapping the Slack Web API for paginated message + attachment + reaction retrieval, consumed by the company social platform with semver-disciplined releases."
        ]
      }
    ]
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
    "kind": "industry",
    "more": [
      {
        "label": "Order tracking",
        "items": [
          "Interpolated between location samples on the client so a slower poll still renders as continuous movement, which is what made the cost reduction invisible to the user.",
          "Kept the map honest under a stale fix: the marker holds its last known position with the timestamp shown rather than drifting toward a guess."
        ]
      },
      {
        "label": "Notifications",
        "items": [
          "Made reconnection safe: exponential backoff plus a per-message id, so a socket that drops mid-delivery resumes without sending the same notification twice.",
          "Wrote the degraded path deliberately: when the socket is unavailable the client falls back to polling rather than going silent, because a missed order update is a support ticket."
        ]
      },
      {
        "label": "Data",
        "items": [
          "Automated competitor-catalog harvesting with a Python scraping toolchain, pulling catalogs and reviews into the analytics warehouse on a schedule, normalized to one schema so pricing, positioning and CX workflows read the same shape."
        ]
      }
    ]
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
    "kind": "research",
    "more": [
      {
        "label": "Highlights in full",
        "items": [
          "Engineered the perception stack for autonomous driving end to end: radar and lidar capture, timestamp alignment, point-cloud processing, and what survives into a guidance decision.",
          "Built a replay harness over recorded sensor logs so a perception change could be evaluated against the same drive twice, which is the only way a change is attributable rather than anecdotal.",
          "Studied HD-map localization: matching observed lane geometry against a prior map to correct GPS drift in urban canyons where satellite fixes degrade exactly when precision matters most."
        ]
      },
      {
        "label": "Sensing",
        "items": [
          "Solved the extrinsic calibration that puts radar and lidar in one frame of reference, since two sensors disagreeing by a few centimetres produce a phantom object rather than a better one.",
          "Compared early fusion against late fusion on identical sequences: raw point-level merging preserves detail and inherits both sensors' noise, object-level merging is robust and loses the evidence that would have resolved a disagreement."
        ]
      },
      {
        "label": "Localization",
        "items": [
          "Examined vehicle-to-vehicle communication as a trust problem rather than a bandwidth one: what a car can publish about its own state, and how a receiver decides whether to act on a claim it cannot verify.",
          "Traced the map-matching failure that matters: a prior map is only as fresh as its last survey, so a repainted lane makes the localizer confidently wrong rather than uncertain."
        ]
      },
      {
        "label": "What breaks",
        "items": [
          "Documented the sensor failure modes a fusion layer has to arbitrate: rain attenuating lidar returns, radar multipath off guard rails reading as a stationary obstacle, and low sun blinding the camera lane that both others depend on."
        ]
      }
    ]
  }
];

export const roleBySlug = (s: string) => roles.find((r) => r.slug === s);
