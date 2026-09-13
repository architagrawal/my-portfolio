"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectMini, type MiniKind } from "@/components/ui/project-mini";

type Project = (typeof projects)[number];

const projects = [
  {
    title: "AiJockey - AI DJ Pipeline",
    description:
      "An end-to-end AI DJ system that separates stems, understands musical structure, plans and renders transitions, and masters the final mix - with audio-quality feedback improving future decisions.",
    date: "2025 – Present",
    achievements: [
      "Built multi-stage AI DJ pipeline: ingest → stem-sep (Demucs + Mel-Band Roformer) → BPM/key/phrase analysis → LLM Director plan → segment picker → transition execute → multi-band mastering, end-to-end in a single FastAPI service.",
      "Implemented 25+ DSP transition modules: sidechain ducking, frequency-masked EQ swaps, echo-throw, beat juggle, spectral hold, reverse reverb, riser synth, MS multiband widen, bass-mono fold, LUFS-arc, BPM grid snap, glitch repair, de-esser, double-drop, EDM smile EQ.",
      "Wrote fx_orchestrator with mutex effect groups + per-set FX budget (35%) - fixes too-many-effects-per-junction without killing variety; mutex groups model perceptual conflicts.",
      "Phrase-aware crossfade scheduling with vocal-phrase boundary snapping + section-pair validator (intro→verse, drop→breakdown legality); 3-tier vocal_guard (SHREDDERS/HEAVY/ARTIFACT_PRONE) gating stem isolation per source-clip artifact risk.",
      "Adaptive LUFS targeting + tape saturation mastering chain; Matchering reference-match alt-path; DeepAFx-ST learned mastering wrapper.",
      "Trained MERT-reward head: MERT-95M embeddings → 4-axis regressor predicting Audiobox aesthetics (PQ/PC/CE/CU); grid-sweep renders n=32, final MSE 0.127. Used as picker-time reward without running Audiobox inference every render.",
      "Fine-tuned VampNet coarse model on user clips (2 epochs); debugged token-vs-latent input shape, vocab×T×n_pred interleaving bug, weights_only=False Lightning ckpt patch, removed deprecated return_signal kwarg.",
      "Built DPO/KTO/IPO/DPO-P trainer variants for VampNet preference tuning; DPO converged loss 0.68 → 0.47 on 4 Audiobox-PQ-labeled preference pairs.",
      "Generated 145 VampNet bridges (Apache + CC-clean) as synthetic library expansion; vampnet_register.py promotes bridges to first-class clips with proper manifest schema (BPM/key/phrase re-run on synthetic audio).",
      "Wired CLAP-rerank + MERT-rerank + Audiobox-aesthetic critics into picker scoring - multi-critic ensemble with per-critic-error fallback.",
      "Reference-free audio quality eval stack: Audiobox Aesthetics, MuQ-Eval, AudioMOS DORA-MOS, CLAP coherence. PQ ceiling 7.61 (mashup mode); variant deltas tracked via composite (PQ+CE)/2.",
      "Closed-loop refinement: render N variants → score with Audiobox → feed best/worst as DPO preference pairs into Director LLM; plan_stats.jsonl collects KTO-compatible thumbs-up/down for future training; per-segment Audiobox slice prescore at cache-build so picker scores 30s windows pre-render.",
      "Ran GPU stack on DigitalOcean MI300X (192 GB HBM3) ROCm container - non-CUDA path, ported torch/Demucs/VampNet/MERT/Audiobox to ROCm builds; restore-from-checkpoint runbook (cache + sidecars + ckpts = 80 MB → re-spin ~30 min).",
      "FastAPI backend + Gradio UI on HF Space, ngrok reserved-domain tunnel, sign-in + 1-render/user/day rate limit, SSE streaming progress ticker.",
      "Multi-stage caching: per-clip JSON sidecar (BPM/key/phrase), NPZ stem features, Audiobox slice JSON, MERT prediction JSON, stem-level Audiobox prescore - 186 clips × 5 sidecars = O(1) re-picker without re-analysis.",
      "Auto-recovery: yt-dlp re-pull on missing source audio, tar checkpoint + RESTORE.md so a destroyed droplet costs 30 min not a day.",
      "Diagnosed a class of PSNR-up-but-sounds-worse bugs - Audiobox PQ ≠ DJ-ear quality; designed mutex-budget orchestrator after measuring v5 PQ 7.60 felt messier than v4 PQ 7.51.",
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
      "Most expenses aren't split 50/50 - you order a steak, they order a salad. PrismSplit splits bills at the item level: scan a receipt, AI extracts every item, and everyone pays exactly what they owe.",
    date: "2025 – Present",
    achievements: [
      "Shipped a web target alongside the native app: 116 .web.tsx surfaces sharing the same stores and services, with keyboard focus rings, pointer affordances and claim-link visitors kept out of signed-in chrome.",
      "Built the insights surface: personal and group spend charts computed server-side through Postgres RPCs (get_user_insights, versioned to v3), a ranked people list that replaced a balance bar chart, an activity heatmap, a category breakdown, a spending radar and a trend line.",
      "Wrote the insights copy to describe what happened rather than grade the reader, after a pass that removed every word implying fault.",
      "Held charts to one currency per axis and a net position line over Friends and Spaces, so a balance that mixes currencies cannot be drawn as if it were one number.",
      "Gated multi-payer bills and raised free-tier limits behind versioned Supabase migrations, with a quota system surfacing usage and a blocked-state sheet rather than a silent failure.",
      "Ran a pre-launch audit across app, web and charts: contrast and theme tokens, an adaptive-ink rule for conditional fills with a validator enforcing the class, keyboard and tap targets, font scaling, and visible focus on every control including auth.",
      "Added settlement claims awaiting confirmation to the activity feed, and made the settle screen state what the settlement leaves behind rather than reporting a bare success.",
      "Built one search model across the tabs with recents as the resting state, and versioned every persisted store so a cache written by an older build cannot crash a screen.",
      "Architected feature-sliced Zustand state (billsStore/activityStore/networkStore/uiStore/alertStore) split into actions/selectors for testability; normalized billsById index killing O(n) lookups on detail screens.",
      "Built idempotency-key + MMKV persistence layer as foundation for offline writes and conflict resolution; real-time Supabase channel subscriptions with lifecycle-aware cleanup.",
      "Wrote Postgres RPC functions (Supabase migrations) for atomic bill creation, settlement, and group-balance compute - multi-table writes stay transactional.",
      "Renamed Group → Space across schema, RPCs, store, and UI via versioned migrations with zero data loss.",
      "Implemented direct-ledger clustering algorithm minimizing settlement transactions between users (graph reduction over debt edges); integer-cent money/currency module eliminating float drift in splits.",
      "Unified reportError reporting system replacing scattered console.error - severity-tagged, routed to logging sink, wired through every catch; screen-level React ErrorBoundary surfacing recovery UI.",
      "Added Android release-build preflight (npm run preflight) + Maestro E2E flows catching ProGuard/native/env regressions Jest can't; authored explicit ProGuard keep rules for Google Sign-In, Firebase, and other native SDKs after diagnosing release-only silent failures.",
      "Perf: memoization audits, Tamagui style hoisting, dead-code removal, batched activity subs, selective balance invalidation on bill mutation, deferred non-critical fetches, Android build-flag tuning, spring → 250ms cubic easing for low-end Android frame-time wins.",
      "Designed 4-font typography system (Sora/Space Grotesk/Outfit/SpaceMono) enforced via Title/Body/Label/Numeric wrappers; useThemeColors() hook with light/dark token sets (lavender primary, peach secondary).",
      "Built LedgerItemRow - focus-driven expand/collapse row replacing modal-based item editing; auto-advance Enter, validate-on-blur, integer-only qty.",
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
      "A TypeScript MCP server that turns an undocumented utility portal into validated, structured tools for secure energy-data analysis by AI agents.",
    date: "Dec 2025 – Jan 2026",
    achievements: [
      "Built TypeScript MCP server enabling agentic AI interactions with energy consumption systems via standardized tool interfaces.",
      "Reverse-engineered undocumented authentication flow of a legacy utility portal under highly ambiguous constraints - no docs, no spec.",
      "Converted unstructured enterprise portal data into structured JSON tools surfaced through MCP for secure, deterministic LLM reasoning.",
      "Designed tool schemas enforcing argument validation and safe downstream automation against the third-party portal.",
      "Recovered the session contract by observation, not documentation: the portal issues a short-lived token behind a multi-step form post, so the server re-authenticates on expiry and retries the original call once rather than surfacing a 401 to the agent.",
      "Made every tool read-only by default. Nothing in the surfaced tool set can change a billing setting or submit a form, because an agent exploring an undocumented portal should not be able to mutate an account.",
      "Normalized interval meter data into one shape (timestamp, kWh, cost, tier) so 15-minute reads, daily rollups and billing-period totals answer through the same tool instead of three that disagree on units.",
      "Rate-limited and cached at the server rather than trusting the caller: a portal built for humans clicking does not expect an agent asking for a year of intervals in a loop.",
      "Returned typed errors an agent can act on, separating authentication expiry, a rate limit, a genuinely absent meter and a portal outage, so the model retries the recoverable case and reports the rest.",
      "Wrote a fixture-backed test suite over recorded portal responses, so the server is testable without credentials and a portal HTML change fails a test instead of silently returning nothing.",
    ],
    technologies: ["TypeScript", "MCP", "Node.js", "REST APIs", "Zod"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "MCP-Based GitHub PR Review Automation Agent",
    description:
      "An MCP-based review service that combines repository context, ticket metadata, CI results, and LLM reasoning to automate pull-request analysis and workflow updates.",
    date: "Jul 2025 – Aug 2025",
    achievements: [
      "Built MCP-based workflow automation integrating GitHub webhooks, LLM reasoning, and automated pull-request analysis pipelines.",
      "Designed context-routing logic letting agents retrieve repository state, ticket metadata, and CI/CD execution context before generating review decisions.",
      "Automated engineering workflows across GitHub Actions and Asana - status updates, ticket linking, review summaries without manual coordination.",
      "Surfaced structured review verdicts to PR comments, gating merges on automated reasoning checks.",
      "Assembled context in a fixed order before any reasoning: the diff, the touched files' neighbours, the linked ticket's acceptance criteria, then the CI result, so a review cannot comment on intent it was never given.",
      "Budgeted the diff rather than truncating it: large PRs are reviewed file by file with a per-file verdict, because one 8,000-line diff in a single prompt produces a summary, not a review.",
      "Returned findings as a schema (file, line, category, severity, rationale) so a verdict renders as inline comments and can be counted, instead of a paragraph a human has to re-read.",
      "Gated the merge on category rather than on volume: a correctness finding blocks, a style note does not, so the bot cannot hold a release over formatting.",
      "Made the bot idempotent on re-runs, updating its existing review comment instead of stacking a new one on every push, after the first version left eleven comments on one branch.",
      "Wired Asana both ways: a PR opening moves the ticket to review and a merge closes it, with the ticket id parsed from the branch name so nobody has to remember to link it.",
      "Kept a manual override that is logged, since a review gate with no escape hatch gets disabled entirely the first time it is wrong.",
    ],
    technologies: ["TypeScript", "MCP", "GitHub Actions", "Asana API", "LLM"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "No-Code Pipeline Builder",
    description:
      "A visual DAG editor with typed nodes, reliable undo and redo, autosave, keyboard workflows, and server-side graph validation.",
    date: "2025",
    achievements: [
      "Built no-code pipeline builder on React 18 + ReactFlow 11 modeling a DAG of typed nodes (input, output, LLM, text + 5 demo nodes) with smoothstep edges and animated markers.",
      "Centralized graph state in Zustand store exposing onNodesChange/onEdgesChange/onConnect reducers wrapping ReactFlow's applyNodeChanges/applyEdgeChanges/addEdge helpers.",
      "Designed config-driven BaseNode: each node type declares {title, handles, fields, category}; renders text/textarea/select/display fields and distributes handles via top: distribute(i, n) - eliminated per-node boilerplate.",
      "Implemented bounded undo/redo (50-entry ring) with past/future stacks of deep-cloned snapshots; gated pushes on semantic changes only (add/remove/replace, dimension-resize-end, drag-start) so position deltas don't flood history.",
      "Tracked in-flight drags via _draggingIds Set for exactly one snapshot per drag gesture; _isReplaying reentrancy flag so undo/redo don't recursively push history.",
      "Debounced localStorage autosave (300ms trailing-edge timer, single pending payload) with sanitized node/edge serialization stripping ReactFlow runtime fields.",
      "Hydration on store init seeds nodeIDs counters by regex-parsing existing IDs (/^(.+)-(\\d+)$/) - new-node IDs never collide post-reload; useAutosave hook bumps a savedPulse counter the SavedIndicator listens to.",
      "useKeyboardShortcuts wires Cmd/Ctrl+Z/Shift+Z, Cmd/Ctrl+D, Delete/Backspace, F (fitView) - suppressed inside inputs/textareas/contenteditable.",
      "Selection-aware mutations: deleteSelection cascades edge removal for deleted nodes; duplicateSelection offsets by (+30,+30), allocates fresh IDs, clears selection on originals.",
      "Text node parses {{ var }} Handlebars-style refs with deduped regex extraction (/\\{\\{\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\}\\}/g); derived input handles update reactively as user types.",
      "SubmitButton POSTs {nodes, edges} to FastAPI /pipelines/parse, surfaces num_nodes/num_edges/is_dag via toast banner; handles HTTP + network failure paths with disabled-while-pending guard.",
      "~20 Jest + RTL suites covering store reducers, persistence round-trips, selection logic, keyboard shortcuts, edge presentation, header, rail.",
      "Property-based tests with fast-check for history invariants, persistence sanitization, node-category mapping, duplicate semantics, edge presentation - catches edge cases unit tests miss.",
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
      "A serverless analytics platform that collects and transforms clan data on a schedule, then turns it into responsive, cross-filtered D3 visualizations and decision tools.",
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
      "PlayerProfileModal: Combat DNA radar, deck history, evo insights, percentile bars, recommendations - replaced legacy radar modal; PlayerDetailPanel as responsive bottom-sheet (mobile) / side-pushed sidebar (tablet+) with skeleton states matching final grid breakpoints.",
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
      "An elastic image-recognition service that scales compute automatically with request volume.",
    date: "Jan 2024 – Feb 2024",
    achievements: [
      "Developed an elastic cloud infrastructure SaaS using AWS EC2, AWS SQS, and Lambda.",
      "Enabled automatic linear scaling based on demand, serving 100 concurrent requests in 5 seconds.",
      "Split the queue in two, requests in and results out, so a web tier can return immediately with a request id and a slow inference never holds an HTTP connection open.",
      "Scaled on queue depth rather than CPU, because an instance waiting on a GPU-bound model looks idle to a CPU metric right when more capacity is needed.",
      "Made the scaler decide from one number, messages in flight divided by per-instance throughput, and capped it, so a traffic spike cannot spin up an unbounded bill.",
      "Scaled in conservatively and out aggressively, with a cooldown, after an early version thrashed instances up and down on a sawtooth load.",
      "Used SQS visibility timeouts as the retry mechanism: a worker that dies mid-image releases the message back rather than losing it, so at-least-once delivery does the failure handling for free.",
      "Made the workers idempotent on an input hash, since at-least-once means the same image will occasionally be classified twice and the second result must not conflict with the first.",
      "Measured the cold path honestly: end-to-end latency for the first request after a scale-out is dominated by model load, not inference, which is what the instance warm pool exists for.",
    ],
    technologies: ["AWS EC2", "AWS SQS", "AWS Lambda", "Python", "Docker"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Soccer Game Result Prediction",
    description:
      "A match-outcome prediction pipeline combining sequence models, tree ensembles, sentiment, and betting data.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Increased prediction accuracy by 12% using LSTM, RNN, and Random Forest with XGBoost.",
      "Incorporated sentiment analysis and game bet data for improved predictions.",
      "Split the data by date, never at random: a shuffled split lets the model see future matches while predicting past ones, which inflates accuracy and would have made the 12% meaningless.",
      "Built rolling-window form features (last five results, goal difference, rest days, home and away splits) computed only from matches already played at prediction time.",
      "Treated the betting odds as a benchmark rather than a feature at first, because the market is a strong baseline and a model that cannot beat implied probability is not adding information.",
      "Compared the sequence models against the tree ensemble on the same folds: LSTM captures form streaks, XGBoost handles the sparse categorical features better, and the ensemble of both beat either alone.",
      "Scored on log loss rather than accuracy for the final comparison, since a three-outcome match with a draw rewards calibrated probability over a confident guess.",
      "Checked calibration explicitly with a reliability plot, which is where the sentiment features helped least: they moved confidence without moving correctness.",
      "Handled the draw as the genuinely hard class, reporting per-class recall instead of hiding a model that never predicts one behind a decent overall number.",
    ],
    technologies: ["Python", "Deep Learning", "Data Science", "Statistics", "XGBoost"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "FitLife Health Tracking App",
    description:
      "An Android health app that measures heart and breathing rates and recommends personalized workout routines.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Programmed an Android app measuring heart and breath rates.",
      "Suggested personalized workout routines using machine learning and Fuzzy Logic Control.",
      "Measured heart rate from the camera and flash: the fingertip changes colour with each pulse, so the signal is the mean red channel over time rather than anything the phone exposes as a sensor.",
      "Band-pass filtered the signal to the plausible human range before peak counting, since ambient light flicker and a shifting finger both land in the raw trace as convincing false peaks.",
      "Derived breathing rate from accelerometer motion at the chest, a far lower frequency band, so the two measurements do not contaminate each other.",
      "Rejected a reading rather than reporting a wrong one: low signal amplitude or an unstable peak interval returns try again, because a health number presented confidently is worse than no number.",
      "Used fuzzy logic deliberately over hard thresholds, since a resting rate of 79 and one of 81 should not produce two different workout recommendations.",
      "Tuned the membership functions against measurements taken alongside a commercial monitor, which is what turned the rules from a guess into something defensible.",
      "Kept every reading on the device, with no account and no upload, because heart-rate data does not need to leave a phone to recommend a workout.",
    ],
    technologies: ["Android Studio", "MATLAB", "Machine Learning", "Java"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Reverse-Mode Automatic Differentiation",
    description:
      "A reverse-mode automatic-differentiation engine with custom gradient operators and CUDA kernels for neural-network training.",
    date: "Feb 2024 – Mar 2024",
    achievements: [
      "Built the tape: every forward operation records its inputs and a local gradient rule, so backward is a reverse walk over the recorded graph rather than a hand-derived formula per model.",
      "Implemented the operator set with its adjoints - add, multiply, matmul, transpose, reshape, ReLU, softmax and cross-entropy - each one a forward rule plus a vector-Jacobian product.",
      "Got broadcasting right, which is where a hand-rolled engine usually breaks: a gradient flowing back into a broadcast dimension has to be summed over that axis or the shapes silently stop matching.",
      "Wrote CUDA kernels for the matmul and elementwise paths, with the reduction in the backward pass done in shared memory rather than with an atomic per element.",
      "Verified every adjoint against central-difference numerical gradients before trusting a single training run, since a wrong gradient trains to a worse loss instead of crashing.",
      "Accumulated rather than overwrote gradients at nodes with multiple consumers, the bug that makes a network with any weight reuse train subtly wrong.",
      "Trained MLPs end to end against a reference implementation, matching loss curves step for step on a fixed seed as the correctness bar.",
      "Freed the tape after backward so a training loop does not retain every intermediate for the whole run, which is the difference between a toy and something that finishes an epoch.",
    ],
    technologies: ["Python", "CUDA", "Neural Networks", "NumPy"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "E-Commerce Platform",
    description:
      "An online storefront with authentication, product discovery, Stripe payments, a React interface, and a Django REST backend backed by PostgreSQL and Redis.",
    date: "Sept 2024 – Dec 2024",
    achievements: [
      "Built an online shopping platform with user authentication, a searchable product catalog, and Stripe payment processing.",
      "Delivered a responsive React interface and a Django REST API.",
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
      "A collaborative project-management tool with task ownership, progress tracking, deadline notifications, JWT authentication, and a React interface.",
    date: "Feb 2024 – May 2024",
    achievements: [
      "Built collaborative workflows for task assignment, progress tracking, and deadline notifications.",
      "Developed a Flask REST API with SQLAlchemy for persistence.",
      "Designed the React interface and implemented JWT authentication.",
      "Enforced permissions in the query rather than the view: a task list is scoped to the projects a user belongs to at the database layer, so a forgotten UI check cannot leak another team's board.",
      "Modelled status as a state machine with declared transitions, so a task cannot go from done back to unassigned and skip the reopen that would have notified its owner.",
      "Made deadline notifications idempotent per task and per day, because a scheduler that runs every hour will otherwise mail someone seven times about one overdue item.",
      "Added optimistic UI updates with rollback on failure, so reassigning a task feels instant but a rejected write does not leave the board showing a lie.",
      "Indexed the list query on (project_id, status, due_date), the three columns every board view filters on, after the first version scanned the whole table to render one column.",
    ],
    technologies: ["React", "Flask", "SQLAlchemy", "JWT", "Docker", "AWS", "PostgreSQL"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging platform with private and group conversations, Redis-backed WebSockets, geolocation features, and interactive usage maps.",
    date: "July 2024 – October 2024",
    achievements: [
      "Built private and group messaging over Django Channels WebSockets.",
      "Used Redis for message queuing and real-time event delivery.",
      "Added geolocation features and Plotly visualizations for user-location analysis.",
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
    title: "Survey Agents - Coding & Analysis Platform",
    description:
      "A ten-agent platform that turns any raw survey export into coded responses, tool-verified facts, charts and reproducible answers, with no per-survey pipeline to maintain. Every deterministic operation is a tool, so no figure that reaches a stakeholder is ever computed by a model.",
    date: "June 2026 – Present",
    achievements: [
      "Ten agents with their own tool sets: intake, label, qa, curate, adjudicate, analysis, analytics, viz and conclude, under an orchestrator whose tools are the other agents.",
      "A curate agent that repairs the codebook itself: cluster confusable codes, find the gaps, draft the distinction that separates two of them, then freeze the profile so labelling runs against a fixed target.",
      "An adjudicate agent that locates contested rows and re-decides only those, turning ensemble disagreement into a bounded second pass rather than a full re-label.",
      "The ask path as eight tools around a single model call: describe the survey, bind the question, choose a rung, execute the plan, compose the answer, compare runs, propose follow-ups.",
      "A visualization agent of seven tools (propose, check, draw, repair, restyle, describe, shorten labels) over nine marks, where the request vocabulary is deliberately wider than the draw vocabulary so a refusal can name the word it could not honour.",
      "Charts you can talk to: a reader asks about the chart in front of them and the reply lands where they are looking, still resolving to the facts the analytics stage computed.",
      "A 14-page Nuxt 4 front end over a NestJS API of ten modules (uploads, surveys, codebooks, analysis, comparisons, exports, governance, templates, jobs), all compiling against one shared TypeScript contract.",
      "Five-stage intake pipeline (frame, repair, retype, classify, review) where the orchestrator is ordinary code and a model is consulted only where the rules are visibly unsure; every decision lands in one JSON recipe that replays without it. Over 30 hand-written export shapes: 6 files need a stage, 11 model calls, $0.0023, and 0 divergences between a run and its replay.",
      "Label integrity by construction: a schema enum makes an out-of-codebook code unrepresentable rather than discouraged (the prompt this replaced threatened a $1,000 penalty and got 9 invented tags anyway), and a per-response correlation token catches batch scrambles that count-matching cannot see.",
      "Escalation ladder for failed batches: discard the batch whole, re-label at batch size 1, then quarantine and ABSTAIN, capped at 2 iterations. Correlation integrity 100%, every row joined, and zero rows carrying a destroyed label against roughly one in eight on the pipeline it was benchmarked against.",
      "verify_citations makes the reporting valve mechanical: every figure in the drafted prose must resolve to a fact the analytics stage computed, or the sentence is redrafted naming the offending number and then removed.",
      "Ran the control experiment that the architecture could lose: at a fixed model the two pipelines tie on F1 (0.685 vs 0.692, overlapping ranges), model choice moves F1 by 0.230 and architecture by −0.007, and the pipeline costs ~4–8× and ~6× the wall clock of three plain API calls. Also showed the 0.637 baseline every earlier claim rested on was never reproducible.",
      "Batch size measured as a quality parameter rather than a throughput knob: the sweep leaves F1 flat and moves the precision/recall split, so the ladder is a dial with a documented shape instead of a guess.",
      "Consensus routing wired in after ensemble voting was tested on runs already on disk: the consensus signal separates ~4× better than the hand-built risk score, which measured as useless. Nested ensemble arms carry no information and nearly shipped.",
      "Corrected my own published finding twice on reasoning: non-termination came from an unbounded reasoning budget and a rules block, not from an incompatibility between reasoning and constrained decoding. Reasoning then won on F1 and lost the product.",
      "Deployed on AWS with CDK: Step Functions state machine (Distributed Map over label slices, merge, Choice-based repair loop, ToleratedFailurePercentage circuit breaker) reaching complete coverage on consecutive executions, after an early green run silently dropped part of the corpus because concurrent map iterations overwrote a shared slot.",
      "Established where AgentCore earns its place: its harness took labeling from partial to complete coverage where our own agent loop stalled, and at the orchestration level a state machine is faster, durable and cheaper once the fan-out shares its prompt prefix, since nearly every cache-write token had been wasted on slices each writing their own.",
      "Semantic layer over the facts: ~10 declared operators, metrics minted by usage and bound to column kinds rather than names, a binding cache so repeat questions are lookups, and a refusal ladder that substitutes, decomposes, samples, extends and requests before it refuses.",
      "Question passport on every answer (plan hash, dataset version, registry version, skill version) so an answer re-executes byte-identically and a stale one is detectable; shadow re-execution diffs recent answers when a definition changes, so a moved number is found before a reader finds it.",
      "Negative catalog computed at intake: what a dataset cannot answer and why, so the interface grays out the control instead of refusing after the fact.",
      "Visualization layer on a constrained Vega-Lite subset: one spec produces the chart, an accessible data table, alt text, a CSV and an ASCII rendering. Mark selection is deterministic, borrowed from Cleveland & McGill, Bertin, Mackinlay's APT, Draco's constraint split and Brehmer & Munzner's task vocabulary.",
      "Chart agent held to improve-or-discard behind four gates: across the whole evaluation corpus not one proposal beat the rule table, and the single case with headroom scored five different ways across five identical runs. An oracle over the agent's own search space found the scorer's exploits first: a word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from.",
      "Nuxt 4 web app over a NestJS API, both compiling against one shared TypeScript contract, rendering the same specs the CLI prints; DuckDB in-process as the compute engine with no server, and Lance serving vector plus BM25 search straight from S3.",
      "Intake hardened against real files: UTF-16 headers full of null bytes, a duplicate header silently overwriting a column, 0/1 flags typed as rating scales, report titles in the header row, and roughly seven in ten exports hiding their timestamp inside the identifier so a header-trusting pipeline reports no date column while holding the dates the whole time.",
      "116k lines of TypeScript across 592 modules, 1,255 tests, 258 recorded runs and 40 measured experiments, each stating what it establishes and what it does not, including that every accuracy number is self-graded and the fixture corpus is a monoculture.",
      "Codebook fit is checked before any spend: question scope is embedded and 25 responses are sample-labeled, giving mean best match 0.598 with a 4% abstain rate on the right codebook against 0.316 and 88% on the wrong one, for about $0.001. The thresholds written from a guess before calibration ran would have let the wrong codebook through with a warning.",
      "Upload identity is content, not filename: a normalized content hash means two people uploading the same export get one run instead of two conflicting sets of numbers for one survey, and the first sighting wins for the wave's date.",
      "Run lineage on two axes with four relations (relabel, recode, wave, wave_recoded), because only a new wave may claim topic movement. A second labeling pass over the same responses cannot present itself as a trend.",
      "Cross-run comparison guarded by what the runs actually are: 9 of 13 recorded runs are the same respondents, so a pooled total is refused where a dimension is missing, drift across unequal runs is reported as a share rather than a count, and the axis is never assumed to be time.",
      "Cross-codebook mappings earn trust by behaving alike: a proposal is checked against the co-occurrence and sentiment profiles of both codes before confirmation, and carries an SSSOM predicate so a narrowMatch is never aggregated as an exact match. Two real codebooks produced 0 lexical proposals, which is itself the finding.",
      "Time buckets follow the academic calendar rather than the Gregorian one, because a month boundary falls mid-semester and term-to-term is the comparison a reader can act on.",
      "Deterministic insight sweep says what stands out the moment an upload finishes, corrected for multiple comparisons, every claim resolving to a fact. Building it surfaced two false-discovery traps: correcting after an effect-size filter, and a null model that preserved the sparsity pattern, both of which made noise look like findings.",
      "Chart properties are classified rather than opened up: 75 styling properties each carry a class, which is how three accepted-and-inert bugs were found where a restyle answered a field no branch ever read.",
      "Capability menus are generated from the registry rather than hand-written, after the same staleness bug appeared three times, and a panel's declared requirement is the same predicate the validator enforces, so the interface cannot offer what the run will refuse.",
      "Spend control that actually binds: caps on both tokens and dollars, checked inside a stage rather than only between stages, after an audit found the guard had been doing nothing at all.",
      "The graph is data with load-time gates rather than a trusted stage list, and the pipeline emits one replayable recipe; ten agent harnesses were deployed with per-agent tool sets, one withheld at runtime until its precondition exists after telemetry showed it never firing.",
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
  {
    title: "Survey Intelligence Platform - Target Architecture",
    description:
      "The production platform the POC argues for: departments bring any survey, schema or taxonomy and get analysis they can trace, with no custom pipeline per upload. Six documents, 80 logged decisions, four sequenced layers gated on exit criteria rather than dates.",
    date: "August 2026",
    achievements: [
      "A novelty ledger recording eight mechanisms with no published counterpart, each paired with the instrument that would measure it, so a claim of novelty is falsifiable rather than decorative: continuous audit-sample QC, promotion criteria for local-to-global learning, confusion-driven codebook merge and split, the two-call versus combined-call ablation on arbitrary codebooks, the tokens-per-card knee, fitted non-uniform class-definition rendering, cluster-shared versus per-row candidate sets, and fork-versus-fix for shared vocabularies.",
      "A four-rung candidate-presentation ladder that makes a large codebook affordable: send it whole, split it by its own top level, cluster similar responses behind one shared shortlist, then retrieve per response. The rung that was missing is the one for codebooks with no usable top level, which used to fall straight to the expensive answer.",
      "Two measurements decide when a project drops a rung, total prompt size and label count, whichever is hit first, because one number alone let oversized prompts through.",
      "Learning scopes, so a fix travels exactly as far as its evidence: a correction fixes one row, a codebook edit reaches one project's future runs, a shared definition change needs every affected department to sign off, and a prompt change needs evidence from many projects. Nothing alters a run already in flight.",
      "Fork-with-provenance for shared vocabularies: when two departments pull a definition in opposite directions it forks with its history kept, instead of one team silently winning. Error, ambiguity and perspective are triaged differently.",
      "Continuous QC as a blind random audit sample per run, powering both the quality score and a corrected estimate published with an honest margin of error beside the raw number.",
      "Conformal accept and abstain thresholds so the error rate on accepted labels stays under a stated bound, with every label carrying a calibrated 0–100 confidence rather than a vibe.",
      "Correction history that is never overwritten: the model's original answer and each human change with who and when, plus run versions that reuse unchanged rows so a re-run shows the edit's effect rather than model randomness, at no cost.",
      "An estimator registry where published numbers come only from registered statistical code, weighted designs carry correct variance, and a model can never produce a published figure.",
      "One model gateway with a one-way valve stated as model authority never widens, rather than the weaker no-model-call-below-the-boundary it replaced.",
      "Four agent surfaces with bounded jobs (DataPlan, Discovery, Diagnosis, Findings Assistant), none of which owns control flow.",
      "Managed agent frameworks ruled out of the control path with a reason: Bedrock Agents, Knowledge Bases and Flows own prompt construction, retrieval and orchestration, three of the four artifacts a published number's reproducibility depends on. Step Functions as run truth is out for the same reason, with run state assigned to a Postgres state machine.",
      "A technology radar written as scope markers instead of a wish list: in scope, out of scope, or field survey only, after the document was twice misread as a build list and once as a commitment to train models. Training, fine-tuning and self-hosted weights are a permanent product boundary.",
      "PII redaction ahead of every model call, sensitive-disclosure triage with escalation, sign-in on Cognito while every permission decision stays in code we own, and browser-direct uploads so large files never pass through the services.",
      "Bedrock Batch designed in as a run mode with its fencing pattern resolved, immutable model versions pinned where the provider offers them, and multi-region warm standby as the target recovery posture.",
      "Four sequenced layers, core AI system then platform services then product surfaces then operations, each with exit criteria rather than dates, because delivery is one developer working in sequence.",
      "An interactive diagram set alongside the prose: a system map, a stakeholder view, an AI explorer, and a Structurizr DSL model, so a reader can see the platform rather than read 8,600 lines about it.",
    ],
    technologies: [
      "AWS Bedrock",
      "PostgreSQL",
      "pgvector",
      "TypeScript",
      "Zod",
      "DuckDB",
      "AWS Cognito",
      "OpenTelemetry",
      "Structurizr",
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
    caption: "Illustrative system view, drawn in code - not a product screenshot",
    caseStudyUrl: "/work/survey-agents",
    highlights: [
      "Architected and shipped ten agents over 65 registered tools, orchestrated by a Step Functions machine generated from a declarative graph: Distributed Map fan-out, a bounded repair loop, a 5% failure circuit breaker, 116k lines of TypeScript, and 1,255 tests.",
      "Schema-constrained decoding plus per-response correlation tokens: out-of-codebook labels rejected, silently overwritten rows detected, and 100% join integrity across recorded runs. The benchmark pipeline lost roughly one row in eight without flagging it.",
      "Questions compile to MBQL plans, clear seven validation checks, then execute over stored facts with DuckDB on a miss. Metrics bind to column kinds, so an unseen survey is answerable on arrival.",
      "Charts are specs, never images: one constrained Vega-Lite spec emits the chart, an accessible data table, alt text, a CSV and an ASCII rendering, with mark selection deterministic.",
      "Every number in a drafted report resolves to a fact the analytics stage computed, or the sentence is redrafted naming the offending figure and then removed.",
    ],
  },
  {
    index: 1,
    visual: "appshot",
    badge: "Active build",
    caption: "Actual product UI - in active development",
    highlights: [
      "Scan → itemize → split → settle: receipt scanning extracts the merchant, items, tax, and tip, while each item supports equal, percentage, share-based, or exact splits.",
      "A Postgres RPC ledger keeps bill creation, settlement, and balance calculations transactional; integer-cent arithmetic prevents rounding drift.",
      "Debt-edge reduction algorithm minimizes the number of settlement transactions inside a group.",
      "Offline-aware core: idempotency keys and MMKV persistence underneath real-time Supabase subscriptions.",
      "Maestro E2E flows and enforced coverage thresholds guard every release build.",
    ],
  },
  {
    index: 0,
    visual: "audio",
    caption: "Illustrative system view, drawn in code - not a product screenshot",
    highlights: [
      "One FastAPI service runs the full render path: stem separation, BPM/key/phrase analysis, LLM-directed planning, 25+ DSP transitions, and multiband mastering.",
      "A closed feedback loop scores rendered variants with Audiobox critics and turns the results into DPO preference pairs for the Director.",
      "A trained MERT reward head predicts aesthetic quality during selection, avoiding full critic inference for every render.",
      "The PyTorch, Demucs, and VampNet stack runs in a ROCm container on a DigitalOcean MI300X with 192 GB of HBM3.",
    ],
  },
  {
    index: 5,
    visual: "analytics",
    caption: "Illustrative system view, drawn in code - not a product screenshot",
    highlights: [
      "Scheduled Cloudflare Workers collect and deduplicate battle data before incrementally loading a D1 analytics store.",
      "A D3 visualization suite - bump, sunburst, ridgeline, force, chord, and radial charts - cross-filters through shared application state.",
      "Resolved D1's 100-parameter SQL constraint and corrected upstream defects in week bucketing and duel-winner attribution.",
      "Accessibility includes skip navigation, focus traps, reduced-motion support, and 44-pixel touch targets.",
    ],
  },
];

const featuredIndexes = featuredMeta.map((f) => f.index);

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Sort key for a free-text date range ("Sept 2024 – Dec 2024", "2025 – Present").
 * Ranks on when the work ENDED, so ongoing work leads and a finished 2023 project
 * cannot outrank it. Unparseable dates sort last rather than to the top.
 */
function recencyKey(date: string): number {
  if (/present|ongoing/i.test(date)) return Number.MAX_SAFE_INTEGER;
  const tail = date.split(/[–-]/).pop() ?? date;
  const year = tail.match(/\d{4}/)?.[0] ?? date.match(/\d{4}/g)?.pop();
  if (!year) return 0;
  const month = tail.toLowerCase().match(/[a-z]{3}/)?.[0];
  return Number(year) * 12 + (month && month in MONTHS ? MONTHS[month] : 11);
}

const archiveIndexes = projects
  .map((_, i) => i)
  .filter((i) => !featuredIndexes.includes(i))
  .sort((a, b) => recencyKey(projects[b].date) - recencyKey(projects[a].date));

/* --- Bespoke animated visuals (no stock photos) --- */

const DJ_RING = [
  { id: "ingest", note: "yt-dlp pull · sidecar cache" },
  { id: "stems", note: "Demucs + Mel-Band Roformer" },
  { id: "analysis", note: "bpm · key · phrase boundaries" },
  { id: "director", note: "LLM plan · section-pair validator" },
  { id: "picker", note: "CLAP + MERT + Audiobox critics" },
  { id: "transition", note: "25 DSP modules · mutex groups" },
  { id: "master", note: "adaptive LUFS · tape saturation" },
  { id: "score", note: "4-axis aesthetics · reward head" },
];

const AXES = [
  { k: "PQ", v: 0.76 },
  { k: "PC", v: 0.69 },
  { k: "CE", v: 0.72 },
  { k: "CU", v: 0.65 },
];

const R_OUT = 74;
const R_IN = 62;
const CX = 100;
const CY = 100;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

/** One arc segment of the ring, as a filled band. */
function segment(from: number, to: number, rOut: number, rIn: number) {
  const [x1, y1] = polar(CX, CY, rOut, from);
  const [x2, y2] = polar(CX, CY, rOut, to);
  const [x3, y3] = polar(CX, CY, rIn, to);
  const [x4, y4] = polar(CX, CY, rIn, from);
  const large = to - from > 180 ? 1 : 0;
  return `M${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
}

/**
 * 03 - drawn as a ring because the system closes on itself: every render is
 * scored on four aesthetic axes and the best and worst become preference pairs
 * that retrain the director. The spokes inside are the live critic scores; the
 * outer arc is the FX budget that caps effects per junction.
 */
function AudioPipelineVisual() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % DJ_RING.length), 1050);
    return () => clearInterval(id);
  }, [reduce]);

  const stepDeg = 360 / DJ_RING.length;
  const active = DJ_RING[i];
  const fx = 0.34 + (i / DJ_RING.length) * 0.62;

  return (
    <div className="h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Closed-loop render
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
            {active.id}
          </p>
        </div>
        <p className="font-tech text-xs text-primary tabular-nums">variant 3 / 4</p>
      </div>

      <div className="flex-1 min-h-[12rem] mt-2 flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-auto max-h-[19rem]">
          {/* the FX budget, an arc that fills toward its cap */}
          <path d={segment(0, 359.9, 88, 82)} fill="hsl(var(--border))" />
          <motion.path
            d={segment(0, Math.max(1, 359.9 * fx), 88, 82)}
            fill="hsl(var(--primary) / 0.5)"
            initial={false}
            animate={{ opacity: 1 }}
          />

          {/* the eight stages of the loop */}
          {DJ_RING.map((st, idx) => {
            const from = idx * stepDeg + 2;
            const to = (idx + 1) * stepDeg - 2;
            const isActive = idx === i;
            const [lx, ly] = polar(CX, CY, 96, from + stepDeg / 2);
            return (
              <g key={st.id}>
                <motion.path
                  d={segment(from, to, R_OUT, R_IN)}
                  fill="hsl(var(--primary))"
                  initial={false}
                  animate={{ fillOpacity: isActive ? 1 : 0.2 }}
                  transition={{ duration: 0.35 }}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={lx > CX + 4 ? "start" : lx < CX - 4 ? "end" : "middle"}
                  dominantBaseline="middle"
                  className="font-tech"
                  fontSize="7.5"
                  fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                >
                  {st.id}
                </text>
              </g>
            );
          })}

          {/* the critic polygon: four aesthetic axes as one shape */}
          <motion.polygon
            points={AXES.map((ax, idx) => polar(CX, CY, 12 + ax.v * 36, idx * 90 + 45).join(",")).join(" ")}
            fill="hsl(var(--primary) / 0.2)"
            stroke="hsl(var(--primary))"
            strokeWidth="1.4"
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* axis guides and labels */}
          {AXES.map((ax, idx) => {
            const deg = idx * 90 + 45;
            const [ex, ey] = polar(CX, CY, 12 + ax.v * 36, deg);
            const [tx, ty] = polar(CX, CY, 54, deg);
            return (
              <g key={ax.k}>
                <line x1={CX} y1={CY} x2={tx} y2={ty} stroke="hsl(var(--border))" strokeWidth="0.6" />
                <circle cx={ex} cy={ey} r="1.7" fill="hsl(var(--primary))" />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-tech"
                  fontSize="7"
                  fill="hsl(var(--muted-foreground))"
                >
                  {ax.k}
                </text>
              </g>
            );
          })}
          <circle cx={CX} cy={CY} r="2.4" fill="hsl(var(--primary))" />

          {/* the token that carries a variant around the loop */}
          {!reduce && (
            <motion.circle
              r="3"
              fill="hsl(var(--primary))"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8.4, repeat: Infinity, ease: "linear" }}
              style={{
                offsetPath: `path("M100 32 A 68 68 0 1 1 99.9 32")`,
                offsetRotate: "0deg",
              } as React.CSSProperties}
            />
          )}
        </svg>
      </div>

      <div className="mt-2 border-t border-border pt-3 space-y-1.5">
        <motion.p
          key={active.note}
          className="font-tech text-[10.5px] text-foreground/75 truncate"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          {active.note}
        </motion.p>
        <p className="font-tech text-[10px] text-muted-foreground">
          best + worst → DPO pairs → director · loss 0.68 → 0.47
        </p>
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

/**
 * 01 - a run in flight rather than a static diagram. A phase machine walks the
 * pipeline, the label stage fans out into slices, QA occasionally returns
 * repairable and kicks the run back, and the counters follow the phase.
 * Reduced motion gets the finished state with no ticking.
 */
/** Filled ribbon between two horizontal spans, the Sankey primitive. */
function ribbon(a1: number, a2: number, y1: number, b1: number, b2: number, y2: number) {
  const m = (y1 + y2) / 2;
  return `M${a1} ${y1} C ${a1} ${m}, ${b1} ${m}, ${b1} ${y2} L ${b2} ${y2} C ${b2} ${m}, ${a2} ${m}, ${a2} ${y1} Z`;
}

const SANKEY_STAGES = [
  { id: "intake", y: 62, note: "scan_file · find_headers · check_columns" },
  { id: "curate", y: 112, note: "confusable_clusters · distinctions" },
  { id: "label", y: 180, note: "distributed map · schema-constrained" },
  { id: "qa", y: 248, note: "integrity · conflicts · outliers" },
  { id: "analytics", y: 298, note: "count_by · crosstab · cooccurrence" },
];

const TRUNK = [112, 188] as const; // the single-file span
const LANES = [
  [30, 82],
  [112, 164],
  [194, 246],
] as const; // three parallel label slices, clearly separated
const OUTS = [
  { span: [30, 82], t: "facts" },
  { span: [112, 164], t: "charts" },
  { span: [194, 246], t: "report" },
] as const;

/**
 * 01 - drawn as a Sankey because fan-out and merge *is* the architecture: one
 * export widens across parallel label slices, narrows back through QA, and
 * splits again into facts, charts and prose. Ribbon width is volume; the thin
 * strand peeling off QA is the bounded repair pass.
 */
function SurveyAgentsVisual() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? SANKEY_STAGES.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((p) => (p + 1) % (SANKEY_STAGES.length + 1)), 1150);
    return () => clearInterval(id);
  }, [reduce]);

  const active = Math.min(step, SANKEY_STAGES.length - 1);
  const cycling = step >= SANKEY_STAGES.length;

  return (
    <div className="h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Coding pipeline
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
            {cycling ? "conclude" : SANKEY_STAGES[active].id}
          </p>
        </div>
        <div className="text-right">
          <p className="font-tech text-xs text-primary">0 destroyed labels</p>
          <p className="mt-1 font-tech text-[10px] text-muted-foreground">
            every figure tool-computed
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[13rem] mt-4 flex items-center" aria-hidden="true">
        <svg viewBox="0 0 276 348" className="w-full h-auto max-h-[24rem]">
          {/* one file in */}
          <path
            d={ribbon(128, 172, 26, TRUNK[0], TRUNK[1], 62)}
            fill="hsl(var(--primary) / 0.1)"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.6"
          />
          <path
            d={ribbon(TRUNK[0], TRUNK[1], 68, TRUNK[0], TRUNK[1], 112)}
            fill="hsl(var(--primary) / 0.1)"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.6"
          />

          {/* widening into three parallel slices, then merging back */}
          {LANES.map(([a, b], i) => {
            const third = (TRUNK[1] - TRUNK[0]) / 3;
            const fa = TRUNK[0] + i * third;
            return (
              <g key={i}>
                <motion.path
                  d={ribbon(fa, fa + third, 118, a, b, 180)}
                  fill="hsl(var(--primary) / 0.2)"
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth="0.6"
                  initial={false}
                  animate={{ opacity: active >= 2 ? 1 : 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                />
                <motion.path
                  d={ribbon(a, b, 186, fa, fa + third, 248)}
                  fill="hsl(var(--primary) / 0.2)"
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth="0.6"
                  initial={false}
                  animate={{ opacity: active >= 3 ? 1 : 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                />
              </g>
            );
          })}

          {/* the thin repair strand peeling off QA and back into label */}
          <motion.path
            d="M110 252 C 8 254, 4 196, 26 186"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            initial={false}
            animate={{ opacity: cycling ? 1 : 0.25 }}
            transition={{ duration: 0.4 }}
          />
          <path
            d={ribbon(TRUNK[0], TRUNK[1], 254, TRUNK[0], TRUNK[1], 298)}
            fill="hsl(var(--primary) / 0.1)"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.6"
          />

          {/* facts split three ways */}
          {OUTS.map((o, i) => {
            const third = (TRUNK[1] - TRUNK[0]) / 3;
            const fa = TRUNK[0] + i * third;
            return (
              <motion.path
                key={o.t}
                d={ribbon(fa, fa + third, 304, o.span[0], o.span[1], 330)}
                fill="hsl(var(--primary) / 0.1)"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="0.6"
                initial={false}
                animate={{ opacity: active >= 4 || cycling ? 1 : 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              />
            );
          })}

          {/* stage bars */}
          <rect x="128" y="20" width="44" height="6" fill="hsl(var(--muted-foreground) / 0.5)" />
          <text x="128" y="15" className="font-tech" fontSize="8.5" fill="hsl(var(--muted-foreground))">
            any survey export
          </text>
          {SANKEY_STAGES.map((st, idx) => {
            const isLabel = st.id === "label";
            return isLabel ? (
              <g key={st.id}>
                {LANES.map(([a, b]) => (
                  <motion.rect
                    key={a}
                    x={a}
                    y={st.y}
                    width={b - a}
                    height="6"
                    fill="hsl(var(--primary))"
                    initial={false}
                    animate={{ fillOpacity: idx === active && !cycling ? 1 : 0.4 }}
                    transition={{ duration: 0.35 }}
                  />
                ))}
                <text
                  x={LANES[0][0]}
                  y={st.y - 5}
                  className="font-tech"
                  fontSize="9"
                  fill={idx === active && !cycling ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                >
                  label · 3 slices
                </text>
              </g>
            ) : (
              <g key={st.id}>
                <motion.rect
                  x={TRUNK[0]}
                  y={st.y}
                  width={TRUNK[1] - TRUNK[0]}
                  height="6"
                  fill="hsl(var(--primary))"
                  initial={false}
                  animate={{ fillOpacity: idx === active && !cycling ? 1 : 0.4 }}
                  transition={{ duration: 0.35 }}
                />
                <text
                  x={TRUNK[0]}
                  y={st.y - 5}
                  className="font-tech"
                  fontSize="9"
                  fill={idx === active && !cycling ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                >
                  {st.id}
                </text>
              </g>
            );
          })}
          {OUTS.map((o) => (
            <g key={o.t}>
              <rect x={o.span[0]} y="330" width={o.span[1] - o.span[0]} height="6" fill="hsl(var(--primary) / 0.6)" />
              <text x={o.span[0]} y="346" className="font-tech" fontSize="8.5" fill="hsl(var(--muted-foreground))">
                {o.t}
              </text>
            </g>
          ))}

          {!reduce && (
            <motion.circle
              cx="150"
              cy={26}
              r="2.4"
              fill="hsl(var(--primary))"
              initial={{ cy: 26, opacity: 0 }}
              animate={{ cy: [26, 330], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5.75, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <motion.p
          key={cycling ? "loop" : SANKEY_STAGES[active].note}
          className="font-tech text-[10.5px] text-foreground/75 truncate"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          {cycling ? "repairable → relabel the flagged rows only" : SANKEY_STAGES[active].note}
        </motion.p>
      </div>
    </div>
  );
}

/** Eight weeks of finishing position per member. Crossings are the story. */
const BUMP = [
  { tag: "ARCHIT", ranks: [3, 3, 2, 2, 1, 1, 1, 1] },
  { tag: "K1NGSL", ranks: [1, 1, 1, 1, 2, 3, 2, 2] },
  { tag: "NOVA", ranks: [2, 2, 3, 4, 3, 2, 3, 3] },
  { tag: "RAZR", ranks: [5, 4, 4, 3, 4, 4, 5, 4] },
  { tag: "PIXEL", ranks: [4, 5, 5, 5, 5, 5, 4, 5] },
];

const BW = 34; // horizontal gap per week
const BH = 26; // vertical gap per rank

/**
 * 04 - a bump chart, because a clan ladder is a story about positions changing
 * hands, and a bar chart cannot show a crossing. Each line is one member's
 * finishing rank across eight river races; the lines draw in, then the leader
 * separates.
 */
function AnalyticsVisual() {
  const reduce = useReducedMotion();

  const pts = (ranks: number[]) =>
    ranks.map((r, i) => [18 + i * BW, 14 + (r - 1) * BH] as const);
  const line = (ranks: number[]) =>
    pts(ranks)
      .map(([x, y], i) => (i === 0 ? `M${x} ${y}` : `L${x} ${y}`))
      .join(" ");

  return (
    <div className="h-full flex flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            River race ladder
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
            8 weeks
          </p>
        </div>
        <p className="font-tech text-xs text-primary">3 lead changes</p>
      </div>

      <div className="flex-1 min-h-[11rem] mt-6 flex items-center" aria-hidden="true">
        <svg viewBox="0 0 290 150" className="w-full h-auto">
          {/* rank guides */}
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <line
                x1="18"
                y1={14 + r * BH}
                x2="256"
                y2={14 + r * BH}
                stroke="hsl(var(--border))"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
              <text x="4" y={17 + r * BH} className="font-tech" fontSize="8" fill="hsl(var(--muted-foreground))">
                {r + 1}
              </text>
            </g>
          ))}

          {BUMP.map((m, i) => {
            const leader = m.tag === "ARCHIT";
            return (
              <g key={m.tag}>
                <motion.path
                  d={line(m.ranks)}
                  fill="none"
                  stroke={leader ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.5)"}
                  strokeWidth={leader ? 2.2 : 1.2}
                  strokeLinejoin="round"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.15 + i * 0.12, ease: "easeInOut" }}
                />
                {pts(m.ranks).map(([x, y], j) => (
                  <motion.circle
                    key={j}
                    cx={x}
                    cy={y}
                    r={leader ? 2.6 : 1.8}
                    fill={leader ? "hsl(var(--primary))" : "hsl(var(--background))"}
                    stroke={leader ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.5)"}
                    strokeWidth="0.9"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.3 + i * 0.12 + j * 0.11 }}
                  />
                ))}
                <motion.text
                  x={18 + 7 * BW + 8}
                  y={17 + (m.ranks[7] - 1) * BH}
                  className="font-tech"
                  fontSize="8.5"
                  fill={leader ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                  initial={reduce ? false : { opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 1.5 + i * 0.08 }}
                >
                  {m.tag}
                </motion.text>
              </g>
            );
          })}

          <text x="18" y="146" className="font-tech" fontSize="8" fill="hsl(var(--muted-foreground))">
            W01
          </text>
          <text x="232" y="146" className="font-tech" fontSize="8" fill="hsl(var(--muted-foreground))">
            W08
          </text>
        </svg>
      </div>

      <div className="mt-auto border-t border-border pt-3 grid grid-cols-3 gap-3">
        {[
          ["48,620", "clan fame"],
          ["+12.4%", "week on week"],
          ["94%", "war participation"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-tech text-[11px] tabular-nums text-foreground/80">{v}</p>
            <p className="font-tech text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70">
              {l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Which compact animation an archive row reveals when it opens. */
const MINI_BY_TITLE: Record<string, MiniKind> = {
  "SRP Electric MCP Server": "mcp-auth",
  "MCP-Based GitHub PR Review Automation Agent": "pr-review",
  "No-Code Pipeline Builder": "dag-editor",
  "Image Recognition as a Service": "autoscale",
  "Soccer Game Result Prediction": "calibration",
  "FitLife Health Tracking App": "ppg",
  "Reverse-Mode Automatic Differentiation": "autodiff",
  "E-Commerce Platform": "funnel",
  "Task Management System": "state-machine",
  "Real-Time Chat Application": "fanout",
  "Survey Intelligence Platform - Target Architecture": "ladder",
};

/**
 * An archive row. Native <details> keeps the semantics and the no-JS fallback;
 * the open state is mirrored into React only so the animation mounts on expand
 * rather than looping forever inside a closed row.
 */
function ArchiveRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const mini = MINI_BY_TITLE[project.title];

  return (
    <details
      className="group/row border-b border-border transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100 open:!opacity-100"
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer list-none py-5 grid sm:grid-cols-[9rem_1fr_auto] gap-x-6 gap-y-1 items-baseline">
        <span className="font-tech text-xs uppercase tracking-wider text-muted-foreground">
          {project.date}
        </span>
        <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground transition-transform duration-300 group-hover/row:translate-x-2">
          {project.title}
        </span>
        <span className="font-tech text-xs uppercase tracking-[0.2em] text-primary justify-self-start sm:justify-self-end">
          <span className="group-open/row:hidden">+ View details</span>
          <span className="hidden group-open/row:inline">− Hide details</span>
        </span>
      </summary>

      <div className="pb-7 sm:pl-[9.5rem] grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-x-10 gap-y-6 items-start">
        <div className="max-w-3xl">
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          <ul className="mt-4 space-y-2.5">
            {project.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={reduce || !open ? false : { opacity: 0, y: 6 }}
                animate={open ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.32, delay: Math.min(i, 12) * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mt-2 w-1 h-1 bg-primary/50 shrink-0" />
                <span className="text-xs text-foreground/80 font-mono leading-relaxed">
                  {achievement}
                </span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 font-tech text-xs uppercase tracking-wider text-muted-foreground leading-relaxed">
            {project.technologies.join(" · ")}
          </p>
          <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
        </div>

        {mini && open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <ProjectMini kind={mini} />
          </motion.div>
        )}
      </div>
    </details>
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
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <details className="mt-5 group/details">
                    <summary className="cursor-pointer list-none inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors">
                      <span className="group-open/details:hidden">
                        + View {project.achievements.length} implementation notes
                      </span>
                      <span className="hidden group-open/details:inline">Hide implementation notes</span>
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
            Additional Projects
          </motion.h3>
          <p className="text-sm text-muted-foreground mb-8">
            More AI, cloud, data, and full-stack work. Expand a project for implementation details.
          </p>

          <div className="border-t border-border group/list">
            {archiveIndexes.map((index) => (
              <ArchiveRow key={projects[index].title} project={projects[index]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
