"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
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
];

/* Curated featured systems shown as full editorial articles */
interface FeaturedMeta {
  index: number;
  visual: "audio" | "appshot" | "analytics";
  badge?: string;
  caption: string;
  highlights: string[];
}

const featuredMeta: FeaturedMeta[] = [
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
};

function ProjectLinks({ demoUrl, githubUrl }: { demoUrl?: string; githubUrl?: string }) {
  if (!demoUrl && !githubUrl) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
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

                  <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
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
