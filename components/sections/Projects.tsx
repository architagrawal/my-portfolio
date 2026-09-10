"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

const projects = [
  {
    title: "AiJockey — AI DJ Pipeline",
    description:
      "An AI DJ system that separates stems, analyzes musical structure, plans transitions with an LLM Director, applies DSP, and masters the final mix — closed-loop preference tuning over audio critics, running on ROCm/MI300X.",
    date: "2025 – Present",
    achievements: [
      "Built multi-stage AI DJ pipeline: ingest → stem-sep (Demucs + Mel-Band Roformer) → BPM/key/phrase analysis → LLM Director plan → segment picker → transition execute → multi-band mastering, end-to-end in a single FastAPI service.",
      "Implemented 25+ DSP transition modules: sidechain ducking, frequency-masked EQ swaps, echo-throw, beat juggle, spectral hold, reverse reverb, riser synth, MS multiband widen, bass-mono fold, LUFS-arc, BPM grid snap, glitch repair, de-esser, double-drop, EDM smile EQ.",
      "Wrote fx_orchestrator with mutex effect groups + per-set FX budget (35%) — fixes too-many-effects-per-junction without killing variety; mutex groups model perceptual conflicts.",
      "Phrase-aware crossfade scheduling with vocal-phrase boundary snapping + section-pair validator (intro→verse, drop→breakdown legality); 3-tier vocal_guard (SHREDDERS/HEAVY/ARTIFACT_PRONE) gating stem isolation per source-clip artifact risk.",
      "Adaptive LUFS targeting + tape saturation mastering chain; Matchering reference-match alt-path; DeepAFx-ST learned mastering wrapper.",
      "Trained MERT-reward head: MERT-95M embeddings → 4-axis regressor predicting Audiobox aesthetics (PQ/PC/CE/CU); grid-sweep renders n=32, final MSE 0.127. Used as picker-time reward without running Audiobox inference every render.",
      "Fine-tuned VampNet coarse model on user clips (2 epochs); debugged token-vs-latent input shape, vocab×T×n_pred interleaving bug, weights_only=False Lightning ckpt patch, removed deprecated return_signal kwarg.",
      "Built DPO/KTO/IPO/DPO-P trainer variants for VampNet preference tuning; DPO converged loss 0.68 → 0.47 on 4 Audiobox-PQ-labeled preference pairs.",
      "Generated 145 VampNet bridges (Apache + CC-clean) as synthetic library expansion; vampnet_register.py promotes bridges to first-class clips with proper manifest schema (BPM/key/phrase re-run on synthetic audio).",
      "Wired CLAP-rerank + MERT-rerank + Audiobox-aesthetic critics into picker scoring — multi-critic ensemble with per-critic-error fallback.",
      "Reference-free audio quality eval stack: Audiobox Aesthetics, MuQ-Eval, AudioMOS DORA-MOS, CLAP coherence. PQ ceiling 7.61 (mashup mode); variant deltas tracked via composite (PQ+CE)/2.",
      "Closed-loop refinement: render N variants → score with Audiobox → feed best/worst as DPO preference pairs into Director LLM; plan_stats.jsonl collects KTO-compatible thumbs-up/down for future training; per-segment Audiobox slice prescore at cache-build so picker scores 30s windows pre-render.",
      "Ran GPU stack on DigitalOcean MI300X (192 GB HBM3) ROCm container — non-CUDA path, ported torch/Demucs/VampNet/MERT/Audiobox to ROCm builds; restore-from-checkpoint runbook (cache + sidecars + ckpts = 80 MB → re-spin ~30 min).",
      "FastAPI backend + Gradio UI on HF Space, ngrok reserved-domain tunnel, sign-in + 1-render/user/day rate limit, SSE streaming progress ticker.",
      "Multi-stage caching: per-clip JSON sidecar (BPM/key/phrase), NPZ stem features, Audiobox slice JSON, MERT prediction JSON, stem-level Audiobox prescore — 186 clips × 5 sidecars = O(1) re-picker without re-analysis.",
      "Auto-recovery: yt-dlp re-pull on missing source audio, tar checkpoint + RESTORE.md so a destroyed droplet costs 30 min not a day.",
      "Diagnosed a class of PSNR-up-but-sounds-worse bugs — Audiobox PQ ≠ DJ-ear quality; designed mutex-budget orchestrator after measuring v5 PQ 7.60 felt messier than v4 PQ 7.51.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "ROCm",
      "FastAPI",
      "Demucs",
      "VampNet",
      "MERT",
      "Audiobox",
      "CLAP",
      "Matchering",
      "Gradio",
      "DPO/KTO",
      "DSP",
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "PrismSplit",
    description:
      "Most expenses aren't split 50/50 — you order a steak, they order a salad. PrismSplit splits bills at the item level: scan a receipt, AI extracts every item, and everyone pays exactly what they owe.",
    date: "2025 – Present",
    achievements: [
      "Architected feature-sliced Zustand state (billsStore/activityStore/networkStore/uiStore/alertStore) split into actions/selectors for testability; normalized billsById index killing O(n) lookups on detail screens.",
      "Built idempotency-key + MMKV persistence layer as foundation for offline writes and conflict resolution; real-time Supabase channel subscriptions with lifecycle-aware cleanup.",
      "Wrote Postgres RPC functions (Supabase migrations) for atomic bill creation, settlement, and group-balance compute — multi-table writes stay transactional.",
      "Renamed Group → Space across schema, RPCs, store, and UI via versioned migrations with zero data loss.",
      "Implemented direct-ledger clustering algorithm minimizing settlement transactions between users (graph reduction over debt edges); integer-cent money/currency module eliminating float drift in splits.",
      "Unified reportError reporting system replacing scattered console.error — severity-tagged, routed to logging sink, wired through every catch; screen-level React ErrorBoundary surfacing recovery UI.",
      "Added Android release-build preflight (npm run preflight) + Maestro E2E flows catching ProGuard/native/env regressions Jest can't; authored explicit ProGuard keep rules for Google Sign-In, Firebase, and other native SDKs after diagnosing release-only silent failures.",
      "Perf: memoization audits, Tamagui style hoisting, dead-code removal, batched activity subs, selective balance invalidation on bill mutation, deferred non-critical fetches, Android build-flag tuning, spring → 250ms cubic easing for low-end Android frame-time wins.",
      "Designed 4-font typography system (Sora/Space Grotesk/Outfit/SpaceMono) enforced via Title/Body/Label/Numeric wrappers; useThemeColors() hook with light/dark token sets (lavender primary, peach secondary).",
      "Built LedgerItemRow — focus-driven expand/collapse row replacing modal-based item editing; auto-advance Enter, validate-on-blur, integer-only qty.",
      "Receipt-scan pipeline UI (scan → processing → review → create) with draft persistence surviving app kill; reusable primitives: ModernAlert, ConfirmDialog, EmptyState, Avatar, Skeleton, ListItem, SplitModeSelector.",
      "Lifted test coverage from near-zero to enforced thresholds: unit tests across stores/services/actions/helpers/UI; interaction tests for LedgerItemRow (focus, expand, validation); full action-suite tests for billsStore (create, update, delete, item toggle); shared render helpers + store mocks + fixture factories.",
      "Product: AI receipt scanning with reviewable OCR drafts; deep-linked friend-add flow with auto profile fetch from invite code; Privacy/ToS/OSS-Licenses screens; lightweight i18n helpers (interpolation + pluralization) without a full runtime.",
      "DX: EAS configured with .easignore slimming build uploads; UI strings extracted to constants module; centralized URL config; long-press dev-only /experiment route for pre-port UI prototyping.",
    ],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "Supabase",
      "Postgres",
      "Tamagui",
      "MMKV",
      "Maestro",
      "Jest",
      "EAS",
    ],
    demoUrl: "",
    githubUrl: "https://github.com/architagrawal/PrismSplit",
  },
  {
    title: "SRP Electric MCP Server",
    description:
      "TypeScript MCP server exposing a legacy utility portal to LLM agents — reverse-engineered authentication, structured JSON tools for energy data reasoning.",
    date: "Dec 2025 – Jan 2026",
    achievements: [
      "Built TypeScript MCP server enabling agentic AI interactions with energy consumption systems via standardized tool interfaces.",
      "Reverse-engineered undocumented authentication flow of a legacy utility portal under highly ambiguous constraints — no docs, no spec.",
      "Converted unstructured enterprise portal data into structured JSON tools surfaced through MCP for secure, deterministic LLM reasoning.",
      "Designed tool schemas enforcing argument validation and safe downstream automation against the third-party portal.",
    ],
    technologies: ["TypeScript", "MCP", "Node.js", "REST APIs"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "MCP-Based GitHub PR Review Automation Agent",
    description:
      "MCP workflow automation service integrating GitHub webhooks, LLM reasoning, and pull-request analysis pipelines across GitHub Actions + Asana.",
    date: "Jul 2025 – Aug 2025",
    achievements: [
      "Built MCP-based workflow automation integrating GitHub webhooks, LLM reasoning, and automated pull-request analysis pipelines.",
      "Designed context-routing logic letting agents retrieve repository state, ticket metadata, and CI/CD execution context before generating review decisions.",
      "Automated engineering workflows across GitHub Actions and Asana — status updates, ticket linking, review summaries without manual coordination.",
      "Surfaced structured review verdicts to PR comments, gating merges on automated reasoning checks.",
    ],
    technologies: ["TypeScript", "MCP", "GitHub Actions", "Asana API", "LLM"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "No-Code Pipeline Builder",
    description:
      "React 18 + ReactFlow 11 visual DAG editor with typed nodes, Zustand-backed undo/redo, debounced localStorage autosave, and FastAPI DAG-validation backend.",
    date: "2025",
    achievements: [
      "Built no-code pipeline builder on React 18 + ReactFlow 11 modeling a DAG of typed nodes (input, output, LLM, text + 5 demo nodes) with smoothstep edges and animated markers.",
      "Centralized graph state in Zustand store exposing onNodesChange/onEdgesChange/onConnect reducers wrapping ReactFlow's applyNodeChanges/applyEdgeChanges/addEdge helpers.",
      "Designed config-driven BaseNode: each node type declares {title, handles, fields, category}; renders text/textarea/select/display fields and distributes handles via top: distribute(i, n) — eliminated per-node boilerplate.",
      "Implemented bounded undo/redo (50-entry ring) with past/future stacks of deep-cloned snapshots; gated pushes on semantic changes only (add/remove/replace, dimension-resize-end, drag-start) so position deltas don't flood history.",
      "Tracked in-flight drags via _draggingIds Set for exactly one snapshot per drag gesture; _isReplaying reentrancy flag so undo/redo don't recursively push history.",
      "Debounced localStorage autosave (300ms trailing-edge timer, single pending payload) with sanitized node/edge serialization stripping ReactFlow runtime fields.",
      "Hydration on store init seeds nodeIDs counters by regex-parsing existing IDs (/^(.+)-(\\d+)$/) — new-node IDs never collide post-reload; useAutosave hook bumps a savedPulse counter the SavedIndicator listens to.",
      "useKeyboardShortcuts wires Cmd/Ctrl+Z/Shift+Z, Cmd/Ctrl+D, Delete/Backspace, F (fitView) — suppressed inside inputs/textareas/contenteditable.",
      "Selection-aware mutations: deleteSelection cascades edge removal for deleted nodes; duplicateSelection offsets by (+30,+30), allocates fresh IDs, clears selection on originals.",
      "Text node parses {{ var }} Handlebars-style refs with deduped regex extraction (/\\{\\{\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\}\\}/g); derived input handles update reactively as user types.",
      "SubmitButton POSTs {nodes, edges} to FastAPI /pipelines/parse, surfaces num_nodes/num_edges/is_dag via toast banner; handles HTTP + network failure paths with disabled-while-pending guard.",
      "~20 Jest + RTL suites covering store reducers, persistence round-trips, selection logic, keyboard shortcuts, edge presentation, header, rail.",
      "Property-based tests with fast-check for history invariants, persistence sanitization, node-category mapping, duplicate semantics, edge presentation — catches edge cases unit tests miss.",
      "UX: light/dark theme via CSS custom-property tokenization persisted across reload; data-category visual accenting, EmptyStateOverlay on empty canvas, ResultBanner for submit feedback, SavedIndicator pulse animation.",
    ],
    technologies: [
      "React 18",
      "ReactFlow 11",
      "Zustand",
      "TypeScript",
      "FastAPI",
      "Jest",
      "React Testing Library",
      "fast-check",
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Clash Royale Clan Analytics Platform",
    description:
      "A serverless clan-analytics platform: scheduled data collection into a Cloudflare D1 warehouse, a Next.js 16 / React 19 frontend, and an interactive cross-filtering D3 visualization gallery.",
    date: "2025",
    achievements: [
      "Built serverless analytics platform on Cloudflare Workers + D1 (SQLite) with Drizzle ORM, fronted by Next.js 16 / React 19 App Router on Vercel.",
      "Designed multi-route Worker (admin, analytics, data, invites, notes, settings) with custom router/middleware layer and typed request handlers.",
      "Scheduled cron pipeline (worker/src/cron.ts) polling upstream Clash Royale API, deduping battles, incrementally hydrating warehouse.",
      "ETL pipeline (worker/src/etl/) split into aggregate / extract / load / processor / transform stages with Vitest unit coverage; backfill jobs (backfill.ts, agg-backfill.ts, backfill_facts.ts) reprocess historical data without blocking live cron, plus /api/admin/fix/backfill-enrichment admin endpoint.",
      "Worked around D1 100-parameter SQL limit by chunking IN (...) lists to 99 ids/statement, killing too-many-SQL-variables failures at scale.",
      "Fixed per-week fame misattribution by switching week-bucketing key from broken upstream battle.seasonId to playerWarStats.timestamp.",
      "Enriched deck/card transformer with evoCount, avgCardLevel, maxLevel, iconUrlEvolution, gameModeDetail; extended Drizzle schema and shipped migration.",
      "Fixed upstream-API edge case where duel rounds resolved 2-1 produced incorrect winner attribution.",
      "Designed REST endpoints for clan/member analytics, war logs, weekly trends, invites, player profile aggregations (handlePlayerAnalytics, getInsightsClanData, getInsightsHistory, getMemberBattleStats); weekStart query param serves per-week fame slices on demand; weeklyTrends payload powers 10-week sparklines.",
      "D3 v7 viz gallery: bump chart (rank ribbons across war weeks), sunburst (hierarchical fame by role/player), ridgeline plot, force-directed bubble with quadrant clustering + in-bounds clamping, chord diagram, radial fame distribution.",
      "Reusable D3 theme utility (shared scales, color tokens, typography, responsive margins) used across every chart; ResizeObserver + viewport-scaled font sizes + dynamic SVG margins for clean mobile→desktop reflow.",
      "Cross-filtering between charts (FameDistribution, InsightsQuadrant, BattleModePanel, MomentumGrid) sharing single InsightsFilterContext with Escape-key reset.",
      "What-If simulator + projected-finish banner with guarded division-by-zero math and dropdown overflow fixes for clipped Radix dialogs.",
      "PlayerProfileModal: Combat DNA radar, deck history, evo insights, percentile bars, recommendations — replaced legacy radar modal; PlayerDetailPanel as responsive bottom-sheet (mobile) / side-pushed sidebar (tablet+) with skeleton states matching final grid breakpoints.",
      "Perf: TanStack Query for server-state caching/deduping/background refetch; tabular-nums on stat numerics; replaced blanket transition-all with property-scoped transition-colors across 23 elements to cut paint cost; responsive Recharts/D3 heights eliminating CLS on small viewports.",
      "A11y: skip-nav link, <main> landmark, self-hosted fonts, prefers-reduced-motion, viewport-fit=cover for iOS safe areas; focus traps in modals, keyboard focus rings on tooltips, 44×44px min touch targets (WCAG 2.5.5).",
      "Wired aria-expanded / aria-controls with persistent DOM nodes, roles on chart SVGs, descriptive aria-labels on delta/filter buttons; suppressed Recharts' inner accessibility tree to avoid duplicate announcements; fixed MemberTable contrast, swapped indigo/purple decorative colors for brand tokens, corrected backdrop-filter fallbacks via @supports.",
      "Vitest suites for ETL transform/processor and Worker middleware; PowerShell + Node scripts (db:sync-local, db:sync-manual) pulling production D1 snapshots into local dev; local runners (local-agg-runner.ts, local-process-runner.ts) executing aggregation/processing outside Worker runtime for faster iteration.",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "Cloudflare Workers",
      "D1",
      "Drizzle ORM",
      "TanStack Query",
      "D3 v7",
      "Recharts",
      "Vitest",
      "Vercel",
      "TypeScript",
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Image Recognition as a Service",
    description:
      "Elastic cloud infrastructure SaaS for image recognition using deep learning models.",
    date: "Jan 2024 – Feb 2024",
    achievements: [
      "Developed an elastic cloud infrastructure SaaS using AWS EC2, AWS SQS, and Lambda.",
      "Enabled automatic linear scaling based on demand, serving 100 concurrent requests in 5 seconds.",
    ],
    technologies: ["AWS EC2", "AWS SQS", "AWS Lambda", "Python"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Soccer Game Result Prediction",
    description:
      "Enhanced soccer game result prediction accuracy using advanced ML techniques.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Increased prediction accuracy by 12% using LSTM, RNN, and Random Forest with XGBoost.",
      "Incorporated sentiment analysis and game bet data for improved predictions.",
    ],
    technologies: ["Python", "Deep Learning", "Data Science", "Statistics"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "FitLife Health Tracking App",
    description:
      "Android app for tracking heart/breath rates and personalized workout routines.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Programmed an Android app measuring heart and breath rates.",
      "Suggested personalized workout routines using machine learning and Fuzzy Logic Control.",
    ],
    technologies: ["Android Studio", "Matlab", "Machine Learning"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Reverse-Mode Automatic Differentiation",
    description:
      "Implemented reverse-mode auto-differentiation for training neural networks.",
    date: "Feb 2024 – Mar 2024",
    achievements: [
      "Developed operators like Add and Matrix Multiplication for gradient node construction.",
      "Added CUDA GPU kernels for training simple neural networks like MLP models.",
    ],
    technologies: ["Python", "CUDA", "Neural Networks"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online shopping platform with auth, product catalog, Stripe payments, React frontend, and Django REST backend on PostgreSQL + Redis.",
    date: "Sept 2024 – Dec 2024",
    achievements: [
      "Built a full-featured online shopping platform with user authentication, product catalog, and payment processing",
      "Implemented responsive front-end using React.js and back-end using Django REST framework",
      "Integrated PostgreSQL database with Redis caching for optimized performance.",
    ],
    technologies: [
      "React",
      "Django",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Stripe",
      "GCP",
      "GitHub Actions",
      "Jest",
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Task Management System",
    description:
      "Collaborative project management tool with task assignment, progress tracking, and deadline notifications — Flask REST API, SQLAlchemy ORM, JWT auth, React UI.",
    date: "Feb 2024 – May 2024",
    achievements: [
      "Created a collaborative project management tool with task assignment, progress tracking, and deadline notifications",
      "Built RESTful API with Flask and SQL Alchemy ORM for database interactions",
      "Designed intuitive UI with React.js and implemented JWT authentication",
    ],
    technologies: ["React", "Flask", "SQL Alchemy", "JWT", "Docker", "AWS"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "Scalable chat platform with private/group messaging — Django Channels WebSockets, Redis message queue, geolocation features, Plotly user-location viz.",
    date: "July 2024 – October 2024",
    achievements: [
      "Developed a scalable chat platform with private messaging and group chat functionality",
      "Utilized Django Channels for WebSocket connections and Redis for message queuing",
      "Implemented geolocation features and interactive data visualizations with Plotly to visualize the location of users.",
    ],
    technologies: [
      "Django",
      "Django Channels",
      "Redis",
      "React",
      "Plotly",
      "Docker",
      "AWS",
    ],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Survey Agents — Coding & Analysis Platform",
    description:
      "A five-agent pipeline that turns a raw survey export into coded responses, tool-computed facts and charts, plus a semantic layer that decides what a dataset can be asked. Everything is an agent, every deterministic operation is a tool, and no number in a report is ever produced by a model.",
    date: "June 2026 – Present",
    achievements: [
      "Five-stage intake pipeline (frame, repair, retype, classify, review) where the orchestrator is ordinary code and a model is consulted only where the rules are visibly unsure; every decision lands in one JSON recipe that replays without it. Over 30 hand-written export shapes: 6 files need a stage, 11 model calls, $0.0023, and 0 divergences between a run and its replay.",
      "Label integrity by construction: a schema enum makes an out-of-codebook code unrepresentable rather than discouraged (the prompt this replaced threatened a $1,000 penalty and got 9 invented tags anyway), and a per-response correlation token catches batch scrambles that count-matching cannot see.",
      "Escalation ladder for failed batches: discard the batch whole, re-label at batch size 1, then quarantine and ABSTAIN, capped at 2 iterations. Correlation integrity 100%, 114/114 rows joined, 0 rows carrying a destroyed label against 13 of 102 (12.7%) on the pipeline it was benchmarked against.",
      "verify_citations makes the reporting valve mechanical: every figure in the drafted prose must resolve to a fact the analytics stage computed, or the sentence is redrafted naming the offending number and then removed.",
      "Ran the control experiment that the architecture could lose: at a fixed model the two pipelines tie on F1 (0.685 vs 0.692, overlapping ranges), model choice moves F1 by 0.230 and architecture by −0.007, and the pipeline costs ~4–8× and ~6× the wall clock of three plain API calls. Also showed the 0.637 baseline every earlier claim rested on was never reproducible.",
      "Batch size measured as a quality parameter rather than a throughput knob: the sweep leaves F1 flat and moves the precision/recall split, so the ladder is a dial with a documented shape instead of a guess.",
      "Consensus routing wired in after ensemble voting was tested on runs already on disk: the consensus signal separates ~4× better than the hand-built risk score, which measured as useless. Nested ensemble arms carry no information and nearly shipped.",
      "Corrected my own published finding twice on reasoning: non-termination came from an unbounded reasoning budget and a rules block, not from an incompatibility between reasoning and constrained decoding. Reasoning then won on F1 and lost the product.",
      "Deployed on AWS with CDK: Step Functions state machine (Distributed Map over 3 label slices, merge, Choice-based repair loop, ToleratedFailurePercentage circuit breaker) reaching 4 consecutive succeeded runs at 102/102, after the first green run silently labelled 100 of 102 because concurrent map iterations overwrote one slot.",
      "Established where AgentCore earns its place: its harness took labelling from 50/102 to 102/102 where our own agent loop failed, and at the orchestration level a state machine is faster, durable and cheaper once the fan-out shares its prompt prefix (106,951 of 109,969 cache-write tokens sat in three slices each writing its own).",
      "Semantic layer over the facts: ~10 declared operators, metrics minted by usage and bound to column kinds rather than names, a binding cache so repeat questions are lookups, and a refusal ladder that substitutes, decomposes, samples, extends and requests before it refuses.",
      "Question passport on every answer (plan hash, dataset version, registry version, skill version) so an answer re-executes byte-identically and a stale one is detectable; shadow re-execution diffs recent answers when a definition changes, so a moved number is found before a reader finds it.",
      "Negative catalog computed at intake: what a dataset cannot answer and why, so the interface greys out the control instead of refusing after the fact.",
      "Visualization layer on a constrained Vega-Lite subset: one spec produces the chart, an accessible data table, alt text, a CSV and an ASCII rendering. Mark selection is deterministic, borrowed from Cleveland & McGill, Bertin, Mackinlay's APT, Draco's constraint split and Brehmer & Munzner's task vocabulary.",
      "Chart agent held to improve-or-discard behind four gates: over 36 cases, 0 of 36 proposals beat the rule table, 1 case had headroom, and 5 identical runs on it disagreed (0.80/0.40/0.40/0.40/0.64). An oracle over the agent's own search space found the scorer's exploits first: a word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from.",
      "Nuxt 4 web app over a NestJS API, both compiling against one shared TypeScript contract, rendering the same specs the CLI prints; DuckDB in-process as the compute engine with no server, and Lance serving vector plus BM25 search straight from S3.",
      "Intake hardened against real files: UTF-16 headers full of null bytes, a duplicate header silently overwriting a column, 0/1 flags typed as rating scales, report titles in the header row, and 22 of 32 CSVs hiding their timestamp inside the identifier so every survey reported no date column while holding dates the whole time.",
      "74k lines of TypeScript across 353 modules, 1,021 tests, 253 recorded runs and 40 measured experiments, each stating what it establishes and what it does not, including that every accuracy number is self-graded and the fixture corpus is a monoculture.",
      "Codebook fit is checked before any spend: question scope is embedded and 25 responses are sample-labelled, giving mean best match 0.598 with a 4% abstain rate on the right codebook against 0.316 and 88% on the wrong one, for about $0.001. The thresholds written from a guess before calibration ran would have let the wrong codebook through with a warning.",
      "Upload identity is content, not filename: a normalised content hash means two people uploading the same export get one run instead of two conflicting sets of numbers for one survey, and the first sighting wins for the wave's date.",
      "Run lineage on two axes with four relations (relabel, recode, wave, wave_recoded), because only a new wave may claim topic movement. A second labelling pass over the same responses cannot present itself as a trend.",
      "Cross-run comparison guarded by what the runs actually are: 9 of 13 recorded runs are the same respondents, so a pooled total is refused where a dimension is missing, drift across unequal runs is reported as a share rather than a count, and the axis is never assumed to be time.",
      "Cross-codebook mappings earn trust by behaving alike: a proposal is checked against the co-occurrence and sentiment profiles of both codes before confirmation, and carries an SSSOM predicate so a narrowMatch is never aggregated as an exact match. Two real codebooks produced 0 lexical proposals, which is itself the finding.",
      "Time buckets follow the academic calendar rather than the Gregorian one, because a month boundary falls mid-semester and term-to-term is the comparison a reader can act on.",
      "Deterministic insight sweep says what stands out the moment an upload finishes, corrected for multiple comparisons, every claim resolving to a fact. Building it surfaced two false-discovery traps: correcting after an effect-size filter, and a null model that preserved the sparsity pattern, both of which made noise look like findings.",
      "Chart properties are classified rather than opened up: 75 styling properties each carry a class, which is how three accepted-and-inert bugs were found where a restyle answered a field no branch ever read.",
      "Capability menus are generated from the registry rather than hand-written, after the same staleness bug appeared three times, and a panel's declared requirement is the same predicate the validator enforces, so the interface cannot offer what the run will refuse.",
      "Spend control that actually binds: caps on both tokens and dollars, checked inside a stage rather than only between stages, after an audit found the guard had been doing nothing at all.",
      "The graph is data with load-time gates rather than a trusted stage list, and the pipeline emits one replayable recipe; eight agent harnesses were deployed with per-agent tool sets, one withheld at runtime until its precondition exists after it executed 0 times in 19 recorded runs.",
      "Progressive transcript compaction borrowed from production harnesses, then measured: batch size rather than compaction is the dominant cost lever, and the 8,192-token output cap is the real constraint on batch size.",
      "Five reproducible scaling proofs instead of slides: 200x rows at unchanged ask latency, cross-scope queries over 216 runs in milliseconds, zero-model-call replays, namespace and entitlement checks, and byte-identical re-execution from a passport.",
      "Skills authored in the open Agent Skills standard and loaded into the cached system prefix, then held to the same bar as everything else: the first one changed no outcome on the batch and cost slightly less, which is the result rather than the pitch.",
      "A review stage that reads the finished profile instead of each decision, because per-decision gates are blind to upstream bugs. Verified by reintroducing a known sampler defect (a stride that aliased against alternating data and silently halved a dimension's values on any file over ~200 rows) and confirming the stage catches what the gates missed.",
    ],
    technologies: [
      "TypeScript",
      "AWS Bedrock",
      "AgentCore",
      "Step Functions",
      "AWS CDK",
      "Nuxt 4",
      "NestJS",
      "Vega-Lite",
      "DuckDB",
      "Lance",
      "Vitest",
      "llama.cpp",
    ],
    demoUrl: "",
    githubUrl: "",
  },
];

/* Curated featured systems shown as full editorial articles */
interface FeaturedMeta {
  index: number;
  visual: "audio" | "appshot" | "analytics" | "agents";
  badge?: string;
  caption: string;
  caseStudyUrl?: string;
  highlights: string[];
}

const featuredMeta: FeaturedMeta[] = [
  {
    index: 13,
    visual: "agents",
    badge: "Case study",
    caption: "Illustrative system view, drawn in code — not a product screenshot",
    caseStudyUrl: "/work/survey-agents",
    highlights: [
      "The agent decides, a tool computes. Every figure in a report has to resolve to a fact a tool produced, or the sentence is redrafted and then removed. The result is a system that structurally cannot fabricate a number.",
      "Constrained decoding plus a per-response correlation token: zero invalid labels and zero silently overwritten rows, against 9 invented tags and 12.7% destroyed rows on the pipeline it was benchmarked against.",
      "Measured against its own premise: at a fixed model the two architectures tie on F1, the model pin moves F1 thirty times more than the architecture does, and what the agents buy is reliability rather than accuracy.",
      "Questions compile to MBQL-shaped plans; metrics bind to column kinds, not names; refusal is the last rung of a ladder that substitutes, decomposes and samples first.",
      "Charts are specs, never images. The agent proposes a mark and an encoding, never data, and four gates mean an eagerly invoked agent can cost a call but cannot damage a chart.",
    ],
  },
  {
    index: 1,
    visual: "appshot",
    badge: "Active build",
    caption: "Actual product UI — in active development",
    highlights: [
      "Scan → itemize → split → settle: AI receipt scanning extracts merchant, items, tax, and tip; every item splits by equal, percentage, shares, or exact amounts.",
      "Postgres RPC ledger keeps bill creation, settlement, and balance math transactional — money lives as integer cents, so splits never drift.",
      "Debt-edge reduction algorithm minimizes the number of settlement transactions inside a group.",
      "Offline-aware core: idempotency keys and MMKV persistence underneath real-time Supabase subscriptions.",
      "Maestro E2E flows and enforced coverage thresholds guard every release build.",
    ],
  },
  {
    index: 0,
    visual: "audio",
    caption: "Illustrative system view, drawn in code — not a product screenshot",
    highlights: [
      "Full render path — stem separation, BPM/key/phrase analysis, LLM Director planning, 25+ DSP transitions, multi-band mastering — in one FastAPI service.",
      "Closed-loop tuning: rendered variants are scored by Audiobox critics and fed back to the Director as DPO preference pairs.",
      "Trained a MERT reward head that predicts aesthetic scores at pick time, skipping full critic inference per render.",
      "Runs on a DigitalOcean MI300X (192 GB) ROCm container — the whole torch/Demucs/VampNet stack ported off CUDA.",
    ],
  },
  {
    index: 5,
    visual: "analytics",
    caption: "Illustrative system view, drawn in code — not a product screenshot",
    highlights: [
      "Scheduled Workers cron polls the Clash Royale API, dedupes battles, and incrementally hydrates a D1 warehouse.",
      "D3 gallery — bump chart, sunburst, ridgeline, force-directed bubbles, chord diagram — cross-filtering through one shared context.",
      "Worked around D1's 100-parameter SQL limit; fixed upstream week-bucketing and duel-winner attribution bugs.",
      "Accessibility built in: skip-nav, focus traps, reduced-motion support, 44px touch targets.",
    ],
  },
];

const featuredIndexes = featuredMeta.map((f) => f.index);
const archiveIndexes = projects
  .map((_, i) => i)
  .filter((i) => !featuredIndexes.includes(i));

/* --- Bespoke animated visuals (no stock photos) --- */

function AudioPipelineVisual() {
  const reduce = useReducedMotion();
  const stages = ["Sources", "Stem separation", "Analysis", "LLM Director", "DSP + master"];
  const bars = [42, 68, 35, 82, 55, 90, 48, 73, 60, 38, 85, 52];

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8">
      <div>
        <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
          Render path
        </p>
        <div className="relative">
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
          {!reduce && (
            <motion.div
              className="absolute left-[11px] w-[5px] h-[5px] bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
              animate={{ top: ["3%", "94%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
          <ol className="space-y-4 relative">
            {stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-4">
                <span className="w-[27px] h-[27px] shrink-0 flex items-center justify-center border border-border bg-background font-tech text-[10px] text-primary relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground/85">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-16 mt-8" aria-hidden="true">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-primary/60 origin-bottom"
            style={{ height: `${h}%` }}
            animate={reduce ? undefined : { scaleY: [1, 0.4, 0.85, 0.55, 1] }}
            transition={{
              duration: 1.8 + (i % 5) * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AppShotVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden group/shot aspect-[3/2]">
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/prismsplit-app.jpg"
          alt="Three PrismSplit screens: itemized grocery split, home dashboard with settle-up balances, and recording a payment"
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover transition-transform duration-700 group-hover/shot:scale-[1.03]"
        />
      </motion.div>
    </div>
  );
}

function SurveyAgentsVisual() {
  const reduce = useReducedMotion();
  const stages = [
    { name: "intake", tools: "4 tools", fill: 62 },
    { name: "label", tools: "5 + 1", fill: 100 },
    { name: "qa", tools: "6 tools", fill: 78 },
    { name: "analytics", tools: "4 tools", fill: 54 },
    { name: "conclude", tools: "2 + 1", fill: 40 },
  ];
  const loops = [
    { name: "tool loop", bound: "8 calls, then graceful exit" },
    { name: "repair loop", bound: "2 iterations, then quarantine" },
    { name: "verify loop", bound: "2 redrafts, then strip" },
  ];

  return (
    <div className="h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Intake pipeline
          </p>
          <p className="mt-1 font-display text-3xl font-bold tracking-tight tabular-nums">
            102 / 102
          </p>
        </div>
        <p className="font-tech text-xs text-primary">0 destroyed labels</p>
      </div>

      <div className="flex-1 min-h-[10rem] mt-6 flex flex-col justify-between gap-8">
        <div className="space-y-3">
          {stages.map((stage, i) => (
            <div key={stage.name} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3">
              <span className="font-tech text-[11px] text-foreground/85">{stage.name}</span>
              <span className="relative h-2 bg-border/60" aria-hidden="true">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: `${stage.fill}%` }}
                />
              </span>
              <span className="font-tech text-[10px] text-muted-foreground text-right tabular-nums">
                {stage.tools}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Graph, hashed onto the run manifest
          </p>
          <pre
            className="font-mono text-[10px] leading-[1.7] text-muted-foreground/90 whitespace-pre overflow-hidden"
            aria-hidden="true"
          >{`intake -> label -> qa -> analytics -> conclude
                     |
                     +- repairable? -> re-label requeued
                                       rows only, max 2`}</pre>
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Bounded loops
          </p>
          <div className="space-y-2">
            {loops.map((loop) => (
              <div key={loop.name} className="flex items-baseline justify-between gap-4">
                <span className="font-tech text-[11px] text-foreground/85">{loop.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground text-right">
                  {loop.bound}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-muted-foreground truncate">
          [fact:F-0142] net sentiment +6.1 pp
        </span>
        <span className="inline-flex items-center gap-2 shrink-0">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            {!reduce && (
              <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">
            verified
          </span>
        </span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const reduce = useReducedMotion();
  const values = [32, 58, 44, 76, 62, 88, 72, 96];

  return (
    <div className="h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Weekly clan fame
          </p>
          <p className="mt-1 font-display text-3xl font-bold tracking-tight tabular-nums">
            48,620
          </p>
        </div>
        <p className="font-tech text-xs text-primary">+12.4%</p>
      </div>
      <div className="relative flex-1 min-h-[10rem] mt-6 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 flex items-end gap-2.5">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-primary/15 border-t border-primary origin-bottom"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
        {!reduce && (
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-primary/50"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
      <div className="mt-3 flex justify-between font-tech text-[10px] text-muted-foreground">
        <span>W01</span>
        <span>W08</span>
      </div>
    </div>
  );
}

const visualComponents = {
  audio: AudioPipelineVisual,
  appshot: AppShotVisual,
  analytics: AnalyticsVisual,
  agents: SurveyAgentsVisual,
};

function ProjectLinks({
  demoUrl,
  githubUrl,
  caseStudyUrl,
}: {
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}) {
  if (!demoUrl && !githubUrl && !caseStudyUrl) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
      {caseStudyUrl && (
        <Link
          href={caseStudyUrl}
          className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary border-b border-primary pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
        >
          <FileText className="w-4 h-4" /> Read the case study
        </Link>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
        >
          <Github className="w-4 h-4" /> Source
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Live demo
        </a>
      )}
    </div>
  );
}

export default function Projects() {

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="03 // Work" title="Projects" />

        {/* Featured systems */}
        <div className="space-y-20 md:space-y-28">
          {featuredMeta.map((meta, order) => {
            const project = projects[meta.index];
            const Visual = visualComponents[meta.visual];
            const flip = order % 2 === 1;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch"
              >
                <div className={flip ? "lg:order-2" : undefined}>
                  <div className="flex flex-wrap items-baseline gap-4 mb-3">
                    <span className="font-tech text-sm text-primary">
                      {String(order + 1).padStart(2, "0")}
                    </span>
                    <span className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.date}
                    </span>
                    {meta.badge && (
                      <span className="inline-flex items-center gap-2 border border-primary/40 px-2.5 py-1">
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                          <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
                        </span>
                        <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-primary">
                          {meta.badge}
                        </span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-foreground">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {meta.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-primary shrink-0" />
                        <span className="text-sm text-foreground/85 leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <details className="mt-5 group/details">
                    <summary className="cursor-pointer list-none inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors">
                      <span className="group-open/details:hidden">
                        + {project.achievements.length} implementation notes
                      </span>
                      <span className="hidden group-open/details:inline">show less</span>
                    </summary>
                    <ul className="mt-4 space-y-2.5">
                      {project.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 bg-primary/50 shrink-0" />
                          <span className="text-xs text-muted-foreground/90 font-mono leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <p className="mt-6 font-tech text-xs uppercase tracking-wider text-muted-foreground leading-relaxed">
                    {project.technologies.join(" · ")}
                  </p>

                  <ProjectLinks
                    demoUrl={project.demoUrl}
                    githubUrl={project.githubUrl}
                    caseStudyUrl={meta.caseStudyUrl}
                  />
                </div>

                <figure
                  className={`flex flex-col ${
                    meta.visual === "appshot" ? "lg:self-start" : ""
                  } ${flip ? "lg:order-1" : ""}`}
                >
                  <div
                    className={`border border-border bg-card/40 overflow-hidden ${
                      meta.visual === "appshot" ? "" : "flex-1 min-h-[22rem]"
                    }`}
                  >
                    <Visual />
                  </div>
                  <figcaption className="mt-3 font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {meta.caption}
                  </figcaption>
                </figure>
              </motion.article>
            );
          })}
        </div>

        {/* Index of remaining builds */}
        <div className="mt-24 md:mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground mb-2"
          >
            More builds
          </motion.h3>
          <p className="text-sm text-muted-foreground mb-8">
            Agents, tooling, and earlier work — expand any row for the details.
          </p>

          <div className="border-t border-border group/list">
            {archiveIndexes.map((index) => {
              const project = projects[index];
              return (
                <details
                  key={project.title}
                  className="group/row border-b border-border transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100 open:!opacity-100"
                >
                  <summary className="cursor-pointer list-none py-5 grid sm:grid-cols-[9rem_1fr_auto] gap-x-6 gap-y-1 items-baseline">
                    <span className="font-tech text-xs uppercase tracking-wider text-muted-foreground">
                      {project.date}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground transition-transform duration-300 group-hover/row:translate-x-2">
                      {project.title}
                    </span>
                    <span className="font-tech text-xs uppercase tracking-[0.2em] text-primary justify-self-start sm:justify-self-end">
                      <span className="group-open/row:hidden">+ expand</span>
                      <span className="hidden group-open/row:inline">− close</span>
                    </span>
                  </summary>
                  <div className="pb-7 sm:pl-[9.5rem] max-w-3xl">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {project.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 bg-primary/50 shrink-0" />
                          <span className="text-xs text-foreground/80 font-mono leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 font-tech text-xs uppercase tracking-wider text-muted-foreground leading-relaxed">
                      {project.technologies.join(" · ")}
                    </p>
                    <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
