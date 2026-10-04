import type { Series } from "@/components/soft/line-chart";
// Every role with its full detail. `featured` picks the bullets shown on /work;
// the role's own page shows everything, grouped by `groups`.
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
  groups: { label: string; indexes: number[] }[];
  achievements: Achievement[];
  technologies: string[];
  series?: Series;
}

export const roles: Role[] = [
  {
    "slug": "ai-software-engineer-edplus-2026",
    "series": {"label": "rows losing a label, per pipeline build, illustrative", "points": [{"x": "benchmark", "y": 12.7, "label": "12.7%"}, {"x": "1", "y": 9.8}, {"x": "2", "y": 7.4}, {"x": "3", "y": 7.9}, {"x": "4", "y": 4.1}, {"x": "5", "y": 2.6}, {"x": "6", "y": 1.2}, {"x": "current", "y": 0, "label": "0 of 114"}]},
    "company": "EdPlus, Arizona State University",
    "companyShort": "EdPlus",
    "role": "AI Software Engineer",
    "location": "Phoenix, AZ",
    "period": "May 2026 – Present",
    "featured": [
      0,
      1,
      2,
      3
    ],
    "groups": [
      {
        "label": "The agent system",
        "indexes": [
          6,
          7,
          8
        ]
      },
      {
        "label": "Labelling reliability",
        "indexes": [
          9,
          10
        ]
      },
      {
        "label": "Intake",
        "indexes": [
          11,
          12,
          13
        ]
      },
      {
        "label": "The ask path",
        "indexes": [
          14,
          15,
          16,
          17,
          18,
          19
        ]
      },
      {
        "label": "Visualization",
        "indexes": [
          20,
          21,
          22,
          23,
          24
        ]
      },
      {
        "label": "Data model",
        "indexes": [
          26,
          27,
          28
        ]
      },
      {
        "label": "Application",
        "indexes": [
          25
        ]
      },
      {
        "label": "AWS deployment",
        "indexes": [
          29,
          30,
          31,
          32
        ]
      },
      {
        "label": "Measurement",
        "indexes": [
          33,
          34,
          35
        ]
      },
      {
        "label": "Platform architecture",
        "indexes": [
          4,
          5,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44
        ]
      },
      {
        "label": "Platform and governance",
        "indexes": [
          45,
          46,
          47
        ]
      },
      {
        "label": "The design record",
        "indexes": [
          48,
          49,
          50,
          51
        ]
      }
    ],
    "achievements": [
      {
        "text": "Own the architecture, roadmap and delivery of a platform that takes any structured dataset a team uploads and returns analysis traceable to its source: twelve agents over 76 registered tools, orchestrated by a Step Functions machine generated from a declarative graph, with Distributed Map fan-out, a bounded repair loop and a failure circuit breaker. 290k lines of TypeScript and Vue across 12 workspace packages, 4,077 tests, and no per-dataset pipeline to maintain.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "AgentCore",
          "Step Functions",
          "AWS CDK"
        ]
      },
      {
        "text": "Shipped the product surface rather than stopping at a pipeline: a reader asks a question in plain English and gets a chart back, then edits it directly - stack, swap, sort, top-N, a second shape, highlight one category, filters on more than one value, and undo with redo - each of which had previously been reachable only by typing exactly the right sentence.",
        "techs": [
          "Nuxt 4",
          "TypeScript",
          "Vega-Lite"
        ]
      },
      {
        "text": "Found where agency actually pays by moving it from executing analyses to choosing them: an analyst agent that sees one line per survey question and never a row returns typed intents that code compiles into plans, taking headlined claims recovered from a published analysis from 13% to 52-59% on held-out surveys against a rule-built baseline, at about $0.05 per 13 surveys.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Eliminated a previously unmeasured failure mode with schema-constrained decoding, per-response correlation tokens and citation verification: out-of-codebook labels are rejected, silently overwritten rows are detected, join integrity reached 100% and label churn was zero across 114 of 114 rows on repeat runs. The benchmark pipeline destroyed a label on 13 of 102 rows, 12.7%, without flagging one.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "Zod",
          "Vitest"
        ]
      },
      {
        "text": "Built the semantic layer that decides what any dataset can be asked: plain English compiles to an MBQL plan, clears seven validation checks, then executes against stored facts with DuckDB on a miss. Metrics bind to column kinds rather than column names, so a survey the system has never seen is fully answerable the moment it lands, and a question nobody predeclared still returns a cited number.",
        "techs": [
          "TypeScript",
          "DuckDB",
          "Zod"
        ]
      },
      {
        "text": "Authored the target architecture for the production platform that succeeds it: six documents, 80 logged decisions, four sequenced layers gated on exit criteria rather than dates, and eight candidate mechanisms each paired with an experiment that can validate or reject it.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "PostgreSQL"
        ]
      },
      {
        "text": "Grew the pipeline to twelve agents with their own tool sets: intake, label, qa, curate, adjudicate, analysis, analytics, viz, conclude, coordinator and explore, under an orchestrator whose tools are the other agents.",
        "techs": [
          "TypeScript",
          "AgentCore"
        ]
      },
      {
        "text": "Added a curate agent that repairs the codebook itself: cluster confusable codes, find the gaps, draft the distinction that separates two of them, then freeze the profile so labelling runs against a fixed target.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Introduced an adjudicate agent that locates contested rows and re-decides only those, turning ensemble disagreement into a bounded second pass instead of a full re-label.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Recovered scrambled label batches instead of dropping rows: discard the batch whole, re-label at batch size 1, then quarantine and abstain, capped at 2 iterations. Correlation integrity has never dropped below 100% since.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Calibrated codebook fit before spending anything on labelling: embed the question scope, sample-label 25 rows. The right codebook separates at 0.598 and a 4% abstain rate against 0.316 and 88%, for about $0.001.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Split intake into five gated stages (frame, repair, retype, classify, review) where the orchestrator is ordinary code and the model is consulted only where the rules are visibly unsure.",
        "techs": [
          "TypeScript",
          "Node.js"
        ]
      },
      {
        "text": "Unlocked a time axis on roughly seven in ten real exports, which had been reporting no date column while carrying the timestamp packed inside an identifier. The same intake survives UTF-16 null-byte headers, duplicate headers overwriting a column, and 0/1 flags typed as rating scales.",
        "techs": [
          "TypeScript",
          "Node.js"
        ]
      },
      {
        "text": "Emitted every intake decision as one replayable JSON recipe: across every export shape we could construct, the model is consulted a handful of times, the sweep costs a fraction of a cent, and a run has never once diverged from its replay.",
        "techs": [
          "TypeScript",
          "Node.js"
        ]
      },
      {
        "text": "Structured the ask path as eight tools around a single model call: describe the survey, bind the question, choose a rung, execute the plan, compose the answer, compare runs, propose follow-ups.",
        "techs": [
          "TypeScript",
          "DuckDB",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Compiled questions into Metabase's MBQL plan shape so one format serves both the agent and a UI query builder. A dashboard panel posts the plan the model would have written, at ~20 ms and $0.",
        "techs": [
          "TypeScript",
          "Nuxt 4",
          "DuckDB"
        ]
      },
      {
        "text": "Designed refusal as the last rung of a ladder: substitute, decompose, sample, extend, request. An unanswerable question returns the missing column by name instead of an invented reason.",
        "techs": [
          "TypeScript",
          "DuckDB"
        ]
      },
      {
        "text": "Cached question-to-plan bindings with the plan hashed into the key, turning the one non-deterministic step in the read path into a lookup, and making falling hit similarity a signal that the corpus moved.",
        "techs": [
          "TypeScript",
          "Lance"
        ]
      },
      {
        "text": "Shipped a question passport on every answer (plan hash, dataset, registry and skill versions) that re-executes byte-identically, with shadow re-execution diffing recent answers whenever a definition changes.",
        "techs": [
          "TypeScript",
          "Vitest"
        ]
      },
      {
        "text": "Wired metric lint to CI, so a declared metric that can no longer be computed against a stored run fails the build rather than rotting silently between releases.",
        "techs": [
          "TypeScript",
          "Vitest"
        ]
      },
      {
        "text": "Composed a visualization agent of seven tools (propose, check, draw, repair, restyle, describe, shorten labels) over nine marks, where the request vocabulary is deliberately wider than the draw vocabulary so a refusal can name the word it could not honour.",
        "techs": [
          "Vega-Lite",
          "TypeScript"
        ]
      },
      {
        "text": "Fanned one chart spec into five artifacts through a constrained Vega-Lite compiler: the chart, an accessible data table, alt text, a CSV and an ASCII rendering, with repeatability tested by diffing specs instead of images.",
        "techs": [
          "Vega-Lite",
          "TypeScript",
          "Nuxt 4"
        ]
      },
      {
        "text": "Made charts conversational: a reader asks about the chart in front of them and the reply lands where they are looking, still resolving to the facts the analytics stage computed.",
        "techs": [
          "Vega-Lite",
          "Nuxt 4",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Derived mark selection from published visualization research (Cleveland & McGill, Bertin, Mackinlay's APT, Draco, Brehmer & Munzner) so chart choice cites evidence rather than taste, with the agent confined to proposing mark and encoding behind four gates.",
        "techs": [
          "Vega-Lite",
          "TypeScript"
        ]
      },
      {
        "text": "Attacked my own scorer with an oracle over the agent's search space before trusting it. A word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from.",
        "techs": [
          "Vega-Lite",
          "TypeScript",
          "Vitest"
        ]
      },
      {
        "text": "Delivered a 14-page Nuxt 4 front end over a NestJS API of ten modules (uploads, surveys, codebooks, analysis, comparisons, exports, governance, templates, jobs), all compiling against one shared TypeScript contract.",
        "techs": [
          "Nuxt 4",
          "NestJS",
          "TypeScript"
        ]
      },
      {
        "text": "Modelled the platform over a deliberately narrow fact table where dimension and key are columns, so a survey of departments and a survey of campuses union without a migration and without new SQL.",
        "techs": [
          "TypeScript",
          "DuckDB"
        ]
      },
      {
        "text": "Typed change itself with four lineage relations (relabel, recode, wave, wave_recoded) where only a new wave may claim topic movement, so a second labelling pass cannot present itself as a trend.",
        "techs": [
          "TypeScript",
          "DuckDB"
        ]
      },
      {
        "text": "Blocked the cross-survey join that silently double counts: a respondent fingerprint catches runs that share respondents, after a pooled breakdown counted every one of them twice while reporting a denominator that looked perfectly self-consistent.",
        "techs": [
          "TypeScript",
          "DuckDB"
        ]
      },
      {
        "text": "Compiled one graph file into two deployment targets, Lambda-bound and AgentCore-bound, gated at load time so an edge to a node that does not exist fails before a run starts rather than halfway through one.",
        "techs": [
          "AWS CDK",
          "Step Functions",
          "AgentCore"
        ]
      },
      {
        "text": "Traced a fully SUCCEEDED execution that had silently dropped part of the corpus to concurrent Distributed Map iterations writing the same slot, then partitioned the writes and added a real fan-in, because green meant nothing until that held.",
        "techs": [
          "Step Functions",
          "AWS CDK"
        ]
      },
      {
        "text": "Benchmarked a managed agent runtime against a hand-rolled loop, then removed it when the benchmark was repeated: AgentCore took labelling from partial to complete coverage where our own loop stalled, but once that loop was gone the stage made one tool call and stopped, and 49.8s of its 65.4s was the container booting. Both remaining harnesses now call their tool directly.",
        "techs": [
          "AgentCore",
          "Step Functions"
        ]
      },
      {
        "text": "Bounded blast radius with a ToleratedFailurePercentage circuit breaker at 5%, halting a run once that share of batches fails instead of grinding through every remaining batch and paying for all of them.",
        "techs": [
          "Step Functions",
          "AWS CDK"
        ]
      },
      {
        "text": "Built the control run my own architecture could lose and isolated the dominant variable: model choice moved labelling F1 by 0.230, roughly 33× the 0.007 movement from pipeline shape. Redirected the team's recommendation from accuracy to reliability.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "Vitest"
        ]
      },
      {
        "text": "Retired the 0.637 baseline every prior claim in the project rested on, after fresh runs reproduced it at 0.523 and traced the gap to a delivered spreadsheet that had been human-reviewed before it shipped.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Held every agent to improve-or-discard: across the whole evaluation corpus not one chart proposal has beaten the deterministic rule table, so the rule table stayed. A consensus signal measured on held-out data separated about 4× better than the risk score it replaced.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "Vitest"
        ]
      },
      {
        "text": "Staged the candidate-presentation ladder that makes a large codebook affordable: send it whole, split it by its own top level, cluster similar responses behind one shared shortlist, then retrieve per response. Each rung is tried before the next, and two measurements decide the drop.",
        "techs": [
          "TypeScript",
          "AWS Bedrock",
          "PostgreSQL"
        ]
      },
      {
        "text": "Specified learning scopes so a fix travels exactly as far as its evidence: a correction fixes one row, a codebook edit reaches one project's future runs, a shared definition change needs every affected department to sign off, and nothing alters a run already in flight.",
        "techs": [
          "TypeScript",
          "PostgreSQL"
        ]
      },
      {
        "text": "Made shared vocabularies forkable instead of contested: when two departments pull a definition in opposite directions it forks with its history intact, rather than one team silently winning.",
        "techs": [
          "TypeScript",
          "PostgreSQL"
        ]
      },
      {
        "text": "Sampled QC as a blind random audit per run, powering both the quality score and a corrected estimate published with an honest margin of error beside the raw number.",
        "techs": [
          "TypeScript",
          "PostgreSQL"
        ]
      },
      {
        "text": "Set accept and abstain cutoffs from conformal thresholds so the error rate on accepted labels stays under a stated bound, with every label carrying a calibrated 0–100 confidence rather than a vibe.",
        "techs": [
          "TypeScript",
          "AWS Bedrock"
        ]
      },
      {
        "text": "Kept every correction instead of overwriting it: the model's original answer and each human change with who and when, plus run versions that reuse unchanged rows so a re-run shows the edit's effect rather than model randomness, at no extra cost.",
        "techs": [
          "TypeScript",
          "PostgreSQL"
        ]
      },
      {
        "text": "Ruled managed agent frameworks out of the control path with a stated reason: Bedrock Agents, Knowledge Bases and Flows own prompt construction, retrieval and orchestration, which are three of the four artifacts a published number's reproducibility depends on.",
        "techs": [
          "AWS Bedrock",
          "Step Functions",
          "TypeScript"
        ]
      },
      {
        "text": "Wrote the technology radar as scope markers rather than a wish list: in scope, out of scope, or field survey only, after the document was twice misread as a build list and once as a commitment to train models.",
        "techs": [
          "TypeScript",
          "PostgreSQL"
        ]
      },
      {
        "text": "Put PII redaction ahead of every model call and specified sensitive-disclosure triage with escalation, with sign-in on Cognito while every permission decision stays in code we own.",
        "techs": [
          "AWS Bedrock",
          "PostgreSQL",
          "TypeScript"
        ]
      },
      {
        "text": "Deployed the governance surface in the POC to match: Bedrock guardrails deployed as their own stack, entitlement-gated respondent-level retrieval, and spend caps enforced inside stages after an audit found the guard doing nothing. The personal-data layer was later removed by decision, with name-shaped columns kept as a descriptive kind that is never analysed, which has to be revisited before a real upload.",
        "techs": [
          "AWS Bedrock",
          "AWS CDK",
          "TypeScript"
        ]
      },
      {
        "text": "Ran the platform with no database: DuckDB in-process over per-run JSON, Lance loaded as a DuckDB extension for vector and BM25 retrieval straight from S3, facts bounded at ~150 KB per run against 14–178 MB of payload.",
        "techs": [
          "DuckDB",
          "Lance",
          "Node.js"
        ]
      },
      {
        "text": "Proved scale with five reproducible checks rather than slides: 200× rows at unchanged ask latency, cross-scope queries over 216 runs in milliseconds, and replays that call no model at all.",
        "techs": [
          "DuckDB",
          "Lance",
          "Vitest"
        ]
      },
      {
        "text": "Grounded the architecture in 12 logged prior-art passes: SSSOM mapping predicates, the DDI survey-metadata model, MBQL, Vega-Lite, Draco, Sato and Sherlock context-aware typing, XLSForm, GPTCache, LinkML, SDMX and SKOS.",
        "techs": [
          "TypeScript",
          "Vega-Lite"
        ]
      },
      {
        "text": "Documented what was deliberately not built and what would reopen it: no warehouse, so Cube and dbt's semantic layer stayed out; no text-to-SQL, since the model never sees a row after labelling; no agentic orchestrator, since the repair it was buying is a Choice state and a counter.",
        "techs": [
          "TypeScript",
          "Step Functions",
          "DuckDB"
        ]
      },
      {
        "text": "Drew the line between what may extend and what may not: parsers, kinds, metrics, operators and marks extend without touching existing code, while the validator, the gate, provenance and grain enforcement require human review.",
        "techs": [
          "TypeScript",
          "Vitest"
        ]
      },
      {
        "text": "Authored the decision record the team works from: roughly 200 measured experiments and rejected alternatives, each stating what it establishes and what it does not, including that at equal model the pipeline moves F1 by -0.007 while the model choice moves it by +0.230, and that the codebook-description lever the project had named its largest was measured and lost.",
        "techs": [
          "TypeScript",
          "Vitest"
        ]
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
    "series": {"label": "search latency by day in ms, illustrative", "points": [{"x": "day 1", "y": 38}, {"x": "1", "y": 41}, {"x": "2", "y": 36}, {"x": "3", "y": 44}, {"x": "4", "y": 39}, {"x": "5", "y": 35}, {"x": "6", "y": 42}, {"x": "7", "y": 40}, {"x": "8", "y": 37}, {"x": "9", "y": 43}, {"x": "10", "y": 38}, {"x": "11", "y": 36}, {"x": "12", "y": 41}, {"x": "day 14", "y": 39}]},
    "company": "MyStage Music Inc",
    "companyShort": "MyStage Music Inc",
    "role": "Founding AI/ML Engineer",
    "location": "Remote",
    "period": "July 2025 – May 2026",
    "featured": [
      0,
      5,
      6
    ],
    "groups": [
      {
        "label": "Graph architecture",
        "indexes": [
          1,
          2,
          3,
          8
        ]
      },
      {
        "label": "Concurrency and idempotency",
        "indexes": [
          4,
          9
        ]
      },
      {
        "label": "Serving and search",
        "indexes": [
          7
        ]
      },
      {
        "label": "Observability",
        "indexes": [
          10
        ]
      },
      {
        "label": "Testing",
        "indexes": [
          11
        ]
      }
    ],
    "achievements": [
      {
        "text": "As founding AI/ML engineer, re-architected a 14-Cloud-Function event pipeline into a single LangGraph agent-worker on Cloud Run Jobs - sourcing, extraction, resolution, and image fan-out now run as one composable, checkpointed graph.",
        "techs": [
          "Python",
          "LangGraph",
          "GCP",
          "Cloud Run"
        ]
      },
      {
        "text": "Factored out a reusable build_scraping_subgraph() factory compiled without a Firestore checkpointer so parent graphs compose it without nested-checkpoint conflicts; added route_entry bridge letting webhook-sourced scrapes skip URL-fetch and enter at extraction.",
        "techs": [
          "Python",
          "LangGraph"
        ]
      },
      {
        "text": "Implemented interrupt()/resume pause-for-research contract: subgraph idempotently enqueues a domain-research task on missing domain_metadata/{tld}, calls interrupt(f\"domain_research:{tld}\"), resumes from checkpoint when external pipeline flips parent task to ready.",
        "techs": [
          "Python",
          "LangGraph",
          "Google Firestore"
        ]
      },
      {
        "text": "Designed pure-function routing predicates (route_after_sourcing/extraction/resolution) over typed state for deterministic flow; used Send-based parallel image fan-out with per-Send error isolation via operator.add-reduced state field.",
        "techs": [
          "Python",
          "LangGraph"
        ]
      },
      {
        "text": "Wrote atomic Firestore claim transactions with status == \"ready\" preconditions for multi-worker concurrency; used deterministic agent-task IDs with create() + AlreadyExists for true retry idempotency (set() would clobber in-flight tasks).",
        "techs": [
          "Python",
          "Google Firestore"
        ]
      },
      {
        "text": "Built and operated a Playwright scraping service on Compute Engine that indexes 70,000+ records a day from 650+ locations, rotating proxies and backing off when sites push back.",
        "techs": [
          "Python",
          "Playwright",
          "GCP"
        ]
      },
      {
        "text": "Added Gemini-based entity resolution and dedupe before records reach Firestore and Algolia, lifting downstream search dataset accuracy by 25%.",
        "techs": [
          "Python",
          "Gemini Vertex AI",
          "Google Firestore",
          "Algolia"
        ]
      },
      {
        "text": "Shipped FastAPI + Cloud Functions REST endpoints fronting Algolia for sub-50ms search latency and Firestore for real-time sync.",
        "techs": [
          "Python",
          "FastAPI",
          "GCP",
          "Algolia",
          "Google Firestore"
        ]
      },
      {
        "text": "Refactored a monolithic 1,600-LOC Cloud Run service into a callable subgraph with history preserved, a full import-path rewrite, and dependency relocation - cutting service dependencies 64% from 14 to 5.",
        "techs": [
          "Python",
          "Cloud Run"
        ]
      },
      {
        "text": "Extended canonical Performance entity with next_reprocess_time / last_reprocess_time / reprocess_count; built Cloud Scheduler trigger emitting process-reprocess-event-data tasks and most-stale URL selection over entity_sources ordered by last_successful_scrape_time ASC.",
        "techs": [
          "Python",
          "Google Firestore",
          "GCP"
        ]
      },
      {
        "text": "Wired Logfire distributed-trace context propagation: scheduler captures root ctx per URL into agent_tasks/{id}.ctx, runner attach_context() on claim and resume so worker spans nest under producer trace across pause/resume; added per-tick metric_counter instrumentation.",
        "techs": [
          "Python",
          "Logfire"
        ]
      },
      {
        "text": "Covered routing predicates, fetcher nodes, mocked Firestore claim transactions, idempotent enqueue under retry, HITL resume payloads and image fan-out isolation with 200+ pytest unit and integration tests; pytest-asyncio auto mode with mock_async_db fixtures for Firestore-free runs.",
        "techs": [
          "Python",
          "pytest"
        ]
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
    "series": {"label": "inter-rater agreement per rubric revision, illustrative", "points": [{"x": "v1", "y": 0.44}, {"x": "1", "y": 0.51}, {"x": "2", "y": 0.49}, {"x": "3", "y": 0.58}, {"x": "4", "y": 0.63}, {"x": "5", "y": 0.66}, {"x": "v7", "y": 0.71}]},
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
    "groups": [
      {
        "label": "Prompt design",
        "indexes": [
          3,
          4
        ]
      },
      {
        "label": "Scoring",
        "indexes": [
          5,
          6,
          7
        ]
      },
      {
        "label": "Findings",
        "indexes": [
          8,
          9,
          10
        ]
      }
    ],
    "achievements": [
      {
        "text": "Built an evaluation harness for text-conditioned video generation that scores physical plausibility separately from semantic fidelity, so a model that renders a beautiful scene with impossible motion loses points on exactly one axis instead of averaging the failure away.",
        "techs": [
          "Python",
          "PyTorch",
          "Diffusers"
        ]
      },
      {
        "text": "Designed a frame-sequence rubric for rigid-body motion: does a falling object accelerate rather than drift, does momentum carry through a collision, does an occluded object reappear on the trajectory it left on.",
        "techs": [
          "Python",
          "PyTorch",
          "Computer Vision"
        ]
      },
      {
        "text": "Measured inter-rater agreement on a held-out subset before trusting a single aggregate score, because a rubric two people apply differently is a preference, not a measurement.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Wrote minimal-pair prompts where exactly one clause changes (a ball rolls off the table against a ball is placed on the table) so a score gap isolates the causal claim rather than the scene.",
        "techs": [
          "Python",
          "Diffusers"
        ]
      },
      {
        "text": "Mapped a prompt taxonomy across event ordering, counterfactual conditions, object permanence and multi-agent interaction, so a weakness lands in a named category instead of a general impression.",
        "techs": [
          "Python",
          "Diffusers",
          "Video Generation"
        ]
      },
      {
        "text": "Held generation fixed across models: identical seeds, resolution, frame count and sampler settings, so a comparison measures the model and nothing around it.",
        "techs": [
          "Python",
          "PyTorch",
          "Diffusers"
        ]
      },
      {
        "text": "Automated frame extraction and per-frame annotation in PyTorch and Diffusers, storing per-clip artifacts so any score traces back to the frames that produced it.",
        "techs": [
          "Python",
          "PyTorch",
          "Computer Vision"
        ]
      },
      {
        "text": "Scored trajectories against a simple analytic baseline rather than by eye, flagging a clip when observed acceleration departs from constant-gravity motion beyond a stated tolerance.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Derived a failure taxonomy from the annotated clips: broken object permanence, non-conserved mass, contact that teleports, and physics that silently resets at a scene cut.",
        "techs": [
          "Python",
          "Video Generation"
        ]
      },
      {
        "text": "Found counterfactual prompts degrade faster than descriptive ones at matched length, so apparent fluency on a benchmark prompt set overstates a model's grasp of causal structure.",
        "techs": [
          "Python",
          "Diffusers",
          "Video Generation"
        ]
      },
      {
        "text": "Reported the uncomfortable correlation: fluency and physical-plausibility scores track each other weakly, so a model ranked first on human preference can rank last on causality.",
        "techs": [
          "Python",
          "Video Generation"
        ]
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
    "series": {"label": "transcript analysis time per release, illustrative", "points": [{"x": "before", "y": 240, "label": "4 h"}, {"x": "1", "y": 236}, {"x": "2", "y": 205}, {"x": "3", "y": 150}, {"x": "4", "y": 92}, {"x": "5", "y": 48}, {"x": "6", "y": 24}, {"x": "after", "y": 15, "label": "15 min"}]},
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
    "groups": [
      {
        "label": "Retrieval quality",
        "indexes": [
          5,
          6,
          7,
          8
        ]
      },
      {
        "label": "Multi-tenancy",
        "indexes": [
          9,
          10
        ]
      },
      {
        "label": "The knowledge graph",
        "indexes": [
          11
        ]
      },
      {
        "label": "Assessment platform",
        "indexes": [
          12
        ]
      },
      {
        "label": "Automation and UI",
        "indexes": [
          3,
          4
        ]
      }
    ],
    "achievements": [
      {
        "text": "Led the end-to-end development of a multi-tenant RAG assistant used by 1,000+ faculty members to author courses reaching 60,000+ students, with Prompt Flow evaluations for response quality.",
        "techs": [
          "Python",
          "LangChain",
          "OpenAI",
          "Prompt Flow",
          "Semantic Kernel"
        ]
      },
      {
        "text": "Combined a Neo4j knowledge graph with LLM-generated Cypher queries, making transcript analysis 16× faster by cutting it from 4 hours to 15 minutes.",
        "techs": [
          "Python",
          "Neo4j",
          "OpenAI",
          "LangChain"
        ]
      },
      {
        "text": "Designed REST APIs and SQL-backed admin surfaces powering quiz platforms and question banks across ASU Online; enforced schema-level invariants for assessment integrity.",
        "techs": [
          "Python",
          "JavaScript",
          "SQL"
        ]
      },
      {
        "text": "Authored Google Apps Script automation generating Drive folder/doc hierarchies from Sheets metadata, eliminating manual course-provisioning toil.",
        "techs": [
          "JavaScript",
          "Google Apps Script"
        ]
      },
      {
        "text": "Lifted engagement 35% and cut bounce 20% with responsive React and Material UI interfaces.",
        "techs": [
          "JavaScript"
        ]
      },
      {
        "text": "Built the Prompt Flow evaluation harness that scores groundedness, relevance and coherence on a fixed question set, so a prompt change shipped on evidence rather than on how the first three answers felt.",
        "techs": [
          "Python",
          "Prompt Flow",
          "OpenAI"
        ]
      },
      {
        "text": "Measured chunking instead of assuming it: fixed-size splitting against section-aware splitting on real course documents, because a policy paragraph cut in half answers half a question.",
        "techs": [
          "Python",
          "LangChain"
        ]
      },
      {
        "text": "Ran hybrid retrieval, vector plus keyword, since course codes and policy numbers are exactly the tokens an embedding blurs and exactly what faculty search for.",
        "techs": [
          "Python",
          "LangChain",
          "OpenAI"
        ]
      },
      {
        "text": "Surfaced a citation with every answer, linking the source document and section, so a faculty member can check a claim rather than trust it.",
        "techs": [
          "Python",
          "LangChain"
        ]
      },
      {
        "text": "Enforced tenant isolation at retrieval rather than in the prompt, so one college's material cannot surface in another's answer even when the instruction is ignored.",
        "techs": [
          "Python",
          "Semantic Kernel",
          "SQL"
        ]
      },
      {
        "text": "Kept per-tenant configuration declarative (corpus scope, model, prompt version), so onboarding a new college was a config change rather than a deployment.",
        "techs": [
          "Python",
          "Semantic Kernel"
        ]
      },
      {
        "text": "Constrained generated Cypher to a schema allow-list, so a model-written query cannot traverse outside the sanctioned subgraph or return a node nobody meant to expose.",
        "techs": [
          "Python",
          "Neo4j",
          "LangChain"
        ]
      },
      {
        "text": "Shipped the admin surfaces the instructional designers run on: bulk import, question reuse across banks, and a diff view before a bank is republished.",
        "techs": [
          "JavaScript",
          "SQL",
          "Python"
        ]
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
    "series": {"label": "API latency per optimization pass, illustrative", "points": [{"x": "baseline", "y": 198, "label": "198ms"}, {"x": "1", "y": 184}, {"x": "2", "y": 131}, {"x": "3", "y": 118}, {"x": "4", "y": 76}, {"x": "5", "y": 61}, {"x": "6", "y": 34}, {"x": "final", "y": 20, "label": "20ms"}]},
    "company": "Knowledge Exchange for Resilience, Arizona State University",
    "companyShort": "Knowledge Exchange for Resilience",
    "role": "Data Research Aide",
    "location": "Phoenix, AZ",
    "period": "June 2024 – August 2024",
    "featured": [
      0,
      2,
      5
    ],
    "groups": [
      {
        "label": "Retrieval",
        "indexes": [
          1,
          6,
          7,
          8
        ]
      },
      {
        "label": "Data pipeline",
        "indexes": [
          9,
          10
        ]
      },
      {
        "label": "Platform APIs",
        "indexes": [
          4,
          11
        ]
      },
      {
        "label": "Performance and load",
        "indexes": [
          3
        ]
      }
    ],
    "achievements": [
      {
        "text": "Cut p95 query latency 60% while holding 95% recall, with a hybrid FAISS and Neo4j retrieval layer.",
        "techs": [
          "Python",
          "FAISS",
          "Neo4j"
        ]
      },
      {
        "text": "Stood up a FastAPI embedding microservice over Postgres/pgvector for faculty-profile similarity, surfacing collaborator recommendations at 85% top-k precision.",
        "techs": [
          "Python",
          "FastAPI",
          "PostgreSQL"
        ]
      },
      {
        "text": "Raised dataset accuracy to 95% across 10,000+ faculty profiles ingested a day, through an idempotent ETL pipeline with Postgres constraints and validation checks.",
        "techs": [
          "Python",
          "Pandas",
          "PostgreSQL"
        ]
      },
      {
        "text": "Wrote pytest unit + Locust load suites against FastAPI endpoints, establishing throughput and latency SLOs prior to release.",
        "techs": [
          "Python",
          "FastAPI",
          "Locust"
        ]
      },
      {
        "text": "Delivered 20+ production REST APIs for NSF-funded Knowledge Alliance tool using .NET 8 + Dapper + MediatR clean architecture, secured with JWT and queued via AWS SQS.",
        "techs": [
          ".NET 8",
          "C#",
          "Dapper",
          "MediatR",
          "JWT",
          "AWS SQS"
        ]
      },
      {
        "text": "Took API latency from 198ms to 20ms, nearly 90%, from 198ms to 20ms, with Redis caching and SQL query rewrites, then verified the result under simulated peak load.",
        "techs": [
          "Redis",
          "SQL",
          ".NET 8"
        ]
      },
      {
        "text": "Lifted search relevance 15% over baseline with a bigram and n-gram ranking model over cleaned faculty profile text.",
        "techs": [
          "Python",
          "Deep Learning"
        ]
      },
      {
        "text": "Tuned the pgvector index against exact search rather than by feel, trading recall for latency deliberately and recording where the curve bends.",
        "techs": [
          "Python",
          "PostgreSQL",
          "FAISS"
        ]
      },
      {
        "text": "Chose the FAISS index by measurement: a flat index is exact and does not survive the corpus growing, so the switch to a partitioned index came with its recall cost stated.",
        "techs": [
          "Python",
          "FAISS"
        ]
      },
      {
        "text": "Made the ETL idempotent on a natural key so a re-run after a partial failure updates rather than duplicates, which is what let the pipeline be retried without a cleanup script.",
        "techs": [
          "Python",
          "Pandas",
          "PostgreSQL"
        ]
      },
      {
        "text": "Put the data-quality gates in Postgres rather than in the loader: uniqueness, not-null and range constraints, so bad rows fail at the boundary instead of being discovered in a report.",
        "techs": [
          "PostgreSQL",
          "Python"
        ]
      },
      {
        "text": "Used MediatR pipeline behaviours for validation, logging and error shaping, so a new endpoint inherits the cross-cutting rules instead of reimplementing them, with long work pushed to SQS to keep the API responsive.",
        "techs": [
          ".NET 8",
          "C#",
          "MediatR",
          "AWS SQS"
        ]
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
    "series": {"label": "desk occupancy across a work week, illustrative", "points": [{"x": "Mon", "y": 48}, {"x": "1", "y": 57}, {"x": "2", "y": 71}, {"x": "3", "y": 78}, {"x": "4", "y": 74}, {"x": "5", "y": 69}, {"x": "6", "y": 76}, {"x": "7", "y": 81}, {"x": "8", "y": 72}, {"x": "9", "y": 58}, {"x": "10", "y": 43}, {"x": "Fri", "y": 38}]},
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
    "groups": [
      {
        "label": "Breaking up the monolith",
        "indexes": [
          6,
          7
        ]
      },
      {
        "label": "Delivery pipeline",
        "indexes": [
          8
        ]
      },
      {
        "label": "The prediction service",
        "indexes": [
          9
        ]
      },
      {
        "label": "Frontend performance",
        "indexes": [
          3,
          5,
          10
        ]
      },
      {
        "label": "Internal tooling",
        "indexes": [
          4
        ]
      }
    ],
    "achievements": [
      {
        "text": "Split a .NET monolith into microservices on Kubernetes, cutting resource footprint by 35% and infrastructure cost by 20%.",
        "techs": [
          ".NET",
          "C#",
          "Docker",
          "Kubernetes",
          "AWS"
        ]
      },
      {
        "text": "Hardened CI/CD with SonarQube quality gates and containerized release pipelines - deploy time down 70%, production incidents down 40%.",
        "techs": [
          "Git",
          "Docker",
          "Kubernetes",
          "SonarQube"
        ]
      },
      {
        "text": "Shipped a Redis-backed demand-prediction service for desk reservations across 300+ offices at Fortune 500 companies; reported occupancy improved 30% under COVID-era hot-desk constraints.",
        "techs": [
          ".NET",
          "C#",
          "Redis",
          "React",
          "Node.js"
        ]
      },
      {
        "text": "Optimized Angular student-listing screen with paginated fetching and AWS S3-backed asset delivery - 30% faster screen load; streamlined MySQL queries on class-details page for additional 10% latency reduction.",
        "techs": [
          "Angular",
          "JavaScript",
          "AWS S3",
          "MySQL"
        ]
      },
      {
        "text": "Published an internal npm package wrapping the Slack Web API for paginated message + attachment + reaction retrieval, consumed by the company social platform with semver-disciplined releases.",
        "techs": [
          "Node.js",
          "Git"
        ]
      },
      {
        "text": "Built React + Redux SPAs with normalized client-side state and typed REST integration, raising measured UX scores by 40%.",
        "techs": [
          "Node.js"
        ]
      },
      {
        "text": "Ran the split as a strangler migration behind the existing API, so routes moved service by service while the monolith kept serving and no release needed a big-bang cutover.",
        "techs": [
          ".NET",
          "C#",
          "Kubernetes",
          "Nginx"
        ]
      },
      {
        "text": "Found the 35% footprint cut in the requests and limits rather than the code: pods had been provisioned for a peak that the observed usage never reached.",
        "techs": [
          "Kubernetes",
          "Docker",
          "AWS"
        ]
      },
      {
        "text": "Made the SonarQube gate block the merge instead of warning after it, scoped to new code so a legacy backlog could not make the gate meaningless on day one.",
        "techs": [
          "SonarQube",
          "Git",
          "Docker"
        ]
      },
      {
        "text": "Fed the desk-demand model on historical occupancy by floor, day and team, served from Redis so a booking screen across 300+ sites renders without waiting on a recompute.",
        "techs": [
          ".NET",
          "C#",
          "Redis",
          "React"
        ]
      },
      {
        "text": "Cut the class-details page further with index-covering query rewrites after profiling showed the slow path was a full scan behind a join nobody had reviewed since the schema changed.",
        "techs": [
          "MySQL",
          "Angular",
          "JavaScript"
        ]
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
    "series": {"label": "location poll interval as the driver approaches, illustrative", "points": [{"x": "5 km out", "y": 30}, {"x": "1", "y": 29}, {"x": "2", "y": 27}, {"x": "3", "y": 24}, {"x": "4", "y": 20}, {"x": "5", "y": 17}, {"x": "6", "y": 13}, {"x": "7", "y": 10}, {"x": "8", "y": 7}, {"x": "9", "y": 5}, {"x": "10", "y": 4}, {"x": "arrived", "y": 3}]},
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
    "groups": [
      {
        "label": "Order tracking",
        "indexes": [
          3,
          4
        ]
      },
      {
        "label": "Notifications",
        "indexes": [
          5,
          6
        ]
      },
      {
        "label": "Data",
        "indexes": [
          7
        ]
      }
    ],
    "achievements": [
      {
        "text": "Cut driver-location serving cost 45% by replacing fixed-interval polling with intervals keyed to distance remaining, so a driver two streets away is tracked closely and one across the city is not.",
        "techs": [
          "React.js",
          "Google Maps API",
          "Node.js"
        ]
      },
      {
        "text": "Built the live order-tracking screen on the Google Maps API with route polylines and an ETA recomputed on every fix, shipped during a quarter of 25% user growth.",
        "techs": [
          "React.js",
          "Google Maps API"
        ]
      },
      {
        "text": "Shipped a WebSocket and Express.js notification service with backpressure-aware fan-out; after launch, reported CSAT rose 28% and support volume fell 35%.",
        "techs": [
          "React.js",
          "Node.js",
          "Express.js"
        ]
      },
      {
        "text": "Interpolated between location samples on the client so a slower poll still renders as continuous movement, which is what made the cost reduction invisible to the user.",
        "techs": [
          "React.js",
          "Google Maps API"
        ]
      },
      {
        "text": "Kept the map honest under a stale fix: the marker holds its last known position with the timestamp shown rather than drifting toward a guess.",
        "techs": [
          "React.js",
          "Google Maps API"
        ]
      },
      {
        "text": "Made reconnection safe: exponential backoff plus a per-message id, so a socket that drops mid-delivery resumes without sending the same notification twice.",
        "techs": [
          "Node.js",
          "Express.js"
        ]
      },
      {
        "text": "Wrote the degraded path deliberately: when the socket is unavailable the client falls back to polling rather than going silent, because a missed order update is a support ticket.",
        "techs": [
          "React.js",
          "Node.js"
        ]
      },
      {
        "text": "Automated competitor-catalog harvesting with a Python scraping toolchain, pulling catalogs and reviews into the analytics warehouse on a schedule, normalized to one schema so pricing, positioning and CX workflows read the same shape.",
        "techs": [
          "Python"
        ]
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
    "series": {"label": "localization error along a drive, illustrative", "points": [{"x": "start", "y": 0.4}, {"x": "1", "y": 0.5}, {"x": "2", "y": 0.4}, {"x": "3", "y": 0.6}, {"x": "4", "y": 1.8}, {"x": "5", "y": 2.3}, {"x": "6", "y": 0.7}, {"x": "7", "y": 0.5}, {"x": "8", "y": 0.4}, {"x": "9", "y": 0.5}, {"x": "10", "y": 2.1}, {"x": "11", "y": 0.6}, {"x": "12", "y": 0.4}, {"x": "13", "y": 0.5}, {"x": "end", "y": 0.4}]},
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
    "groups": [
      {
        "label": "Sensing",
        "indexes": [
          3,
          4
        ]
      },
      {
        "label": "Localization",
        "indexes": [
          5,
          6
        ]
      },
      {
        "label": "What breaks",
        "indexes": [
          7
        ]
      }
    ],
    "achievements": [
      {
        "text": "Engineered the perception stack for autonomous driving end to end: radar and lidar capture, timestamp alignment, point-cloud processing, and what survives into a guidance decision.",
        "techs": [
          "Python",
          "Lidar",
          "Radar",
          "Computer Vision"
        ]
      },
      {
        "text": "Built a replay harness over recorded sensor logs so a perception change could be evaluated against the same drive twice, which is the only way a change is attributable rather than anecdotal.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Studied HD-map localization: matching observed lane geometry against a prior map to correct GPS drift in urban canyons where satellite fixes degrade exactly when precision matters most.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Solved the extrinsic calibration that puts radar and lidar in one frame of reference, since two sensors disagreeing by a few centimetres produce a phantom object rather than a better one.",
        "techs": [
          "Python",
          "Lidar",
          "Radar"
        ]
      },
      {
        "text": "Compared early fusion against late fusion on identical sequences: raw point-level merging preserves detail and inherits both sensors' noise, object-level merging is robust and loses the evidence that would have resolved a disagreement.",
        "techs": [
          "Python",
          "Lidar",
          "Radar"
        ]
      },
      {
        "text": "Examined vehicle-to-vehicle communication as a trust problem rather than a bandwidth one: what a car can publish about its own state, and how a receiver decides whether to act on a claim it cannot verify.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Traced the map-matching failure that matters: a prior map is only as fresh as its last survey, so a repainted lane makes the localizer confidently wrong rather than uncertain.",
        "techs": [
          "Python",
          "Computer Vision"
        ]
      },
      {
        "text": "Documented the sensor failure modes a fusion layer has to arbitrate: rain attenuating lidar returns, radar multipath off guard rails reading as a stationary obstacle, and low sun blinding the camera lane that both others depend on.",
        "techs": [
          "Python",
          "Lidar",
          "Radar",
          "Computer Vision"
        ]
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
