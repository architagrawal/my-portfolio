import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const projects = [
  {
    title: "AiJockey — AI DJ Pipeline",
    description:
      "An AI-assisted DJ rendering system that separates stems, analyzes musical structure, plans transitions, applies DSP, and masters the final mix. The GPU workload runs on ROCm and MI300X hardware.",
    date: "2025 – Present",
    achievements: [
      "Combined ingestion, stem separation, BPM/key/phrase analysis, transition planning, rendering, and mastering in one FastAPI service.",
      "Implemented 25+ DSP transition modules: sidechain ducking, frequency-masked EQ swaps, echo-throw, beat juggle, spectral hold, reverse reverb, riser synth, MS multiband widen, bass-mono fold, LUFS-arc, BPM grid snap, glitch repair, de-esser, double-drop, EDM smile EQ.",
      "Added mutually exclusive effect groups and a 35% per-set effect budget after listening tests showed that unrestricted combinations made transitions worse.",
      "Phrase-aware crossfade scheduling with vocal-phrase boundary snapping + section-pair validator (intro→verse, drop→breakdown legality); 3-tier vocal_guard (SHREDDERS/HEAVY/ARTIFACT_PRONE) gating stem isolation per source-clip artifact risk.",
      "Adaptive LUFS targeting + tape saturation mastering chain; Matchering reference-match alt-path; DeepAFx-ST learned mastering wrapper.",
      "Trained MERT-reward head: MERT-95M embeddings → 4-axis regressor predicting Audiobox aesthetics (PQ/PC/CE/CU); grid-sweep renders n=32, final MSE 0.127. Used as picker-time reward without running Audiobox inference every render.",
      "Fine-tuned VampNet coarse model on user clips (2 epochs); debugged token-vs-latent input shape, vocab×T×n_pred interleaving bug, weights_only=False Lightning ckpt patch, removed deprecated return_signal kwarg.",
      "Implemented DPO, KTO, IPO, and DPO-P training paths for VampNet. In a small four-pair experiment, DPO loss moved from 0.68 to 0.47.",
      "Generated 145 VampNet bridges (Apache + CC-clean) as synthetic library expansion; vampnet_register.py promotes bridges to first-class clips with proper manifest schema (BPM/key/phrase re-run on synthetic audio).",
      "Wired CLAP-rerank + MERT-rerank + Audiobox-aesthetic critics into picker scoring — multi-critic ensemble with per-critic-error fallback.",
      "Reference-free audio quality eval stack: Audiobox Aesthetics, MuQ-Eval, AudioMOS DORA-MOS, CLAP coherence. PQ ceiling 7.61 (mashup mode); variant deltas tracked via composite (PQ+CE)/2.",
      "Closed-loop refinement: render N variants → score with Audiobox → feed best/worst as DPO preference pairs into Director LLM; plan_stats.jsonl collects KTO-compatible thumbs-up/down for future training; per-segment Audiobox slice prescore at cache-build so picker scores 30s windows pre-render.",
      "Ran GPU stack on DigitalOcean MI300X (192 GB HBM3) ROCm container — non-CUDA path, ported torch/Demucs/VampNet/MERT/Audiobox to ROCm builds; restore-from-checkpoint runbook (cache + sidecars + ckpts = 80 MB → re-spin ~30 min).",
      "Exposed rendering through FastAPI and a Gradio interface, with sign-in, daily rate limits, and server-sent progress updates.",
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
    award: undefined,
  },
  {
    title: "PrismSplit",
    description:
      "A React Native bill-splitting application with a Postgres ledger, real-time activity, offline-aware state, settlement calculation, and receipt scanning.",
    date: "2025 – Present",
    achievements: [
      "Architected feature-sliced Zustand state (billsStore/activityStore/networkStore/uiStore/alertStore) split into actions/selectors for testability; normalized billsById index killing O(n) lookups on detail screens.",
      "Added idempotency keys, MMKV persistence, and lifecycle-aware Supabase subscriptions as the basis for offline writes and real-time updates.",
      "Moved bill creation, settlement, and group-balance calculations into Postgres functions so related writes remain transactional.",
      "Renamed Group → Space across schema, RPCs, store, and UI via versioned migrations with zero data loss.",
      "Implemented debt-edge reduction to lower the number of settlement transactions and stored money as integer cents to avoid floating-point drift.",
      "Unified reportError reporting system replacing scattered console.error — severity-tagged, routed to logging sink, wired through every catch; screen-level React ErrorBoundary surfacing recovery UI.",
      "Added Android release-build preflight (npm run preflight) + Maestro E2E flows catching ProGuard/native/env regressions Jest can't; authored explicit ProGuard keep rules for Google Sign-In, Firebase, and other native SDKs after diagnosing release-only silent failures.",
      "Perf: memoization audits, Tamagui style hoisting, dead-code removal, batched activity subs, selective balance invalidation on bill mutation, deferred non-critical fetches, Android build-flag tuning, spring → 250ms cubic easing for low-end Android frame-time wins.",
      "Designed 4-font typography system (Sora/Space Grotesk/Outfit/SpaceMono) enforced via Title/Body/Label/Numeric wrappers; useThemeColors() hook with light/dark token sets (lavender primary, peach secondary).",
      "Built LedgerItemRow — focus-driven expand/collapse row replacing modal-based item editing; auto-advance Enter, validate-on-blur, integer-only qty.",
      "Receipt-scan pipeline UI (scan → processing → review → create) with draft persistence surviving app kill; reusable primitives: ModernAlert, ConfirmDialog, EmptyState, Avatar, Skeleton, ListItem, SplitModeSelector.",
      "Raised test coverage from near zero to enforced thresholds across stores, services, actions, helpers, and UI interactions.",
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
    award: undefined,
  },
  {
    title: "SRP Electric MCP Server",
    description:
      "A TypeScript MCP server that converts data from a legacy utility portal into validated tools for energy-use queries.",
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
    award: undefined,
  },
  {
    title: "MCP-Based GitHub PR Review Automation Agent",
    description:
      "A pull-request review service that combines GitHub webhooks, repository context, CI results, and Asana ticket data.",
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
    award: undefined,
  },
  {
    title: "No-Code Pipeline Builder",
    description:
      "A visual DAG editor built with ReactFlow. It supports typed nodes, undo and redo, local persistence, keyboard shortcuts, and server-side graph validation.",
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
    award: undefined,
  },
  {
    title: "Clash Royale Clan Analytics Platform",
    description:
      "A clan analytics application with scheduled data collection, a Cloudflare D1 warehouse, a Next.js interface, and interactive D3 visualizations.",
    date: "2025",
    achievements: [
      "Built the application with Cloudflare Workers and D1 behind a Next.js interface, using Drizzle for the database layer.",
      "Designed multi-route Worker (admin, analytics, data, invites, notes, settings) with custom router/middleware layer and typed request handlers.",
      "Added a scheduled worker that polls the Clash Royale API, deduplicates battles, and incrementally updates the warehouse.",
      "ETL pipeline (worker/src/etl/) split into aggregate / extract / load / processor / transform stages with Vitest unit coverage; backfill jobs (backfill.ts, agg-backfill.ts, backfill_facts.ts) reprocess historical data without blocking live cron, plus /api/admin/fix/backfill-enrichment admin endpoint.",
      "Worked around D1 100-parameter SQL limit by chunking IN (...) lists to 99 ids/statement, killing too-many-SQL-variables failures at scale.",
      "Fixed per-week fame misattribution by switching week-bucketing key from broken upstream battle.seasonId to playerWarStats.timestamp.",
      "Enriched deck/card transformer with evoCount, avgCardLevel, maxLevel, iconUrlEvolution, gameModeDetail; extended Drizzle schema and shipped migration.",
      "Fixed upstream-API edge case where duel rounds resolved 2-1 produced incorrect winner attribution.",
      "Designed REST endpoints for clan/member analytics, war logs, weekly trends, invites, player profile aggregations (handlePlayerAnalytics, getInsightsClanData, getInsightsHistory, getMemberBattleStats); weekStart query param serves per-week fame slices on demand; weeklyTrends payload powers 10-week sparklines.",
      "Built D3 views for rank changes, role and player contribution, distributions, relationships, and multi-week performance.",
      "Reusable D3 theme utility (shared scales, color tokens, typography, responsive margins) used across every chart; ResizeObserver + viewport-scaled font sizes + dynamic SVG margins for clean mobile→desktop reflow.",
      "Cross-filtering between charts (FameDistribution, InsightsQuadrant, BattleModePanel, MomentumGrid) sharing single InsightsFilterContext with Escape-key reset.",
      "What-If simulator + projected-finish banner with guarded division-by-zero math and dropdown overflow fixes for clipped Radix dialogs.",
      "PlayerProfileModal: Combat DNA radar, deck history, evo insights, percentile bars, recommendations — replaced legacy radar modal; PlayerDetailPanel as responsive bottom-sheet (mobile) / side-pushed sidebar (tablet+) with skeleton states matching final grid breakpoints.",
      "Perf: TanStack Query for server-state caching/deduping/background refetch; tabular-nums on stat numerics; replaced blanket transition-all with property-scoped transition-colors across 23 elements to cut paint cost; responsive Recharts/D3 heights eliminating CLS on small viewports.",
      "Added skip navigation, landmarks, reduced-motion support, modal focus traps, keyboard-visible tooltips, and 44-pixel touch targets.",
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
    award: undefined,
  },
  {
    title: "Image Recognition as a Service",
    description:
      "An AWS image-recognition service that adds and removes workers in response to queue depth.",
    date: "Jan 2024 – Feb 2024",
    achievements: [
      "Developed an elastic cloud infrastructure SaaS using AWS EC2, AWS SQS, and Lambda.",
      "Enabled automatic linear scaling based on demand, serving 100 concurrent requests in 5 seconds.",
    ],
    technologies: ["AWS EC2", "AWS SQS", "AWS Lambda", "Python"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Soccer Game Result Prediction",
    description:
      "A match-result model combining historical results, betting data, and sentiment features.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Increased prediction accuracy by 12% using LSTM, RNN, and Random Forest with XGBoost.",
      "Incorporated sentiment analysis and game bet data for improved predictions.",
    ],
    technologies: ["Python", "Deep Learning", "Data Science", "Statistics"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "FitLife Health Tracking App",
    description:
      "An Android application that estimates heart and breathing rates from camera input and suggests workouts.",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Programmed an Android app measuring heart and breath rates.",
      "Suggested personalized workout routines using machine learning and Fuzzy Logic Control.",
    ],
    technologies: ["Android Studio", "Matlab", "Machine Learning"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Reverse-Mode Automatic Differentiation",
    description:
      "A small automatic-differentiation engine with gradient graph operators and CUDA kernels.",
    date: "Feb 2024 – Mar 2024",
    achievements: [
      "Developed operators like Add and Matrix Multiplication for gradient node construction.",
      "Added CUDA GPU kernels for training simple neural networks like MLP models.",
    ],
    technologies: ["Python", "CUDA", "Neural Networks"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "E-Commerce Platform",
    description:
      "A React and Django storefront with authentication, product data, Stripe payments, PostgreSQL, and Redis caching.",
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
    award: undefined,
  },
  {
    title: "Task Management System",
    description:
      "A task-management application with assignments, progress tracking, notifications, a Flask API, and a React interface.",
    date: "Feb 2024 – May 2024",
    achievements: [
      "Created a collaborative project management tool with task assignment, progress tracking, and deadline notifications",
      "Built RESTful API with Flask and SQL Alchemy ORM for database interactions",
      "Designed intuitive UI with React.js and implemented JWT authentication",
    ],
    technologies: ["React", "Flask", "SQL Alchemy", "JWT", "Docker", "AWS"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Real-Time Chat Application",
    description:
      "A Django Channels chat application with private and group messaging, Redis, geolocation, and Plotly visualizations.",
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
    award: undefined,
  },
];

const evidenceIndexes: Record<number, number[]> = {
  0: [0, 2, 7, 12],
  1: [1, 2, 4, 11],
  5: [0, 2, 9, 15],
};

function ProjectVisual({ type }: { type: "audio" | "mobile" | "analytics" }) {
  if (type === "mobile") {
    return (
      <div className="flex min-h-[22rem] items-center justify-center bg-card p-8">
        <div className="w-48 border border-border bg-background p-4 shadow-2xl">
          <p className="text-xs text-muted-foreground">Apartment</p>
          <p className="mt-2 font-display text-2xl font-semibold">$1,284.50</p>
          <div className="mt-6 space-y-3">
            {[
              ["Groceries", "$86.42"],
              ["Utilities", "$143.10"],
              ["Dinner", "$72.00"],
            ].map(([name, amount]) => (
              <div key={name} className="flex justify-between border-t border-border pt-3 text-xs">
                <span>{name}</span>
                <span className="text-muted-foreground">{amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-primary px-3 py-2 text-center text-xs text-primary-foreground">
            Add expense
          </div>
        </div>
      </div>
    );
  }

  if (type === "analytics") {
    const values = [32, 58, 44, 76, 62, 88, 72, 96];
    return (
      <div className="min-h-[22rem] bg-card p-7">
        <div className="flex items-baseline justify-between border-b border-border pb-5">
          <div>
            <p className="text-xs text-muted-foreground">Weekly clan performance</p>
            <p className="mt-2 font-display text-3xl font-semibold">48,620</p>
          </div>
          <p className="text-xs text-primary">+12.4%</p>
        </div>
        <div className="mt-8 flex h-40 items-end gap-3">
          {values.map((value, index) => (
            <div key={index} className="flex h-full flex-1 items-end">
              <div
                className="w-full border-t border-primary bg-primary/15"
                style={{ height: `${value}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-tech text-[10px] text-muted-foreground">
          <span>W01</span>
          <span>W08</span>
        </div>
      </div>
    );
  }

  const steps = ["Sources", "Stem separation", "Analysis", "LLM director", "DSP + master"];
  return (
    <div className="flex min-h-[22rem] items-center bg-card p-7">
      <div className="w-full">
        <p className="mb-6 text-xs text-muted-foreground">Simplified render path</p>
        {steps.map((step, index) => (
          <div key={step} className="grid grid-cols-[2rem_1fr] items-center gap-4">
            <div className="font-tech text-xs text-primary">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="border-t border-border py-4 text-sm">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectLinks({
  demoUrl,
  githubUrl,
}: {
  demoUrl: string;
  githubUrl: string;
}) {
  if (!demoUrl && !githubUrl) return null;
  return (
    <div className="mt-6 flex gap-5">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm underline decoration-border underline-offset-4 hover:decoration-primary"
        >
          <Github className="h-4 w-4" /> Source
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm underline decoration-border underline-offset-4 hover:decoration-primary"
        >
          <ExternalLink className="h-4 w-4" /> Demo
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const featured = [
    { index: 0, visual: "audio" as const },
    { index: 1, visual: "mobile" as const },
    { index: 5, visual: "analytics" as const },
  ];
  const systems = [2, 3, 4];
  const used = new Set([...featured.map(({ index }) => index), ...systems]);
  const archive = projects.map((_, index) => index).filter((index) => !used.has(index));

  return (
    <section id="projects" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
          <SectionHeading eyebrow="Projects" title="Selected systems" className="mb-0" />
          <p className="leading-relaxed text-muted-foreground">
            Three detailed examples are shown first. The diagrams are simplified
            system views, not product screenshots. Complete implementation notes
            remain available under each project.
          </p>
        </div>

        <div className="mt-16 space-y-24">
          {featured.map(({ index, visual }, position) => {
            const project = projects[index];
            const selected = evidenceIndexes[index] ?? [0, 1, 2];
            return (
              <article key={project.title} className="border-t border-border pt-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-tech text-primary">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <span>{project.date}</span>
                    </div>
                    <h3 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <h4 className="mt-8 text-sm font-medium">Selected implementation evidence</h4>
                    <ul className="mt-4 max-w-3xl space-y-4">
                      {selected.map((achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="grid grid-cols-[0.8rem_1fr] gap-3 text-sm leading-relaxed text-foreground/90"
                        >
                          <span className="mt-[0.55rem] h-1 w-1 bg-primary" />
                          <span>{project.achievements[achievementIndex]}</span>
                        </li>
                      ))}
                    </ul>

                    <details className="mt-7 max-w-3xl border-t border-border pt-5">
                      <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                        Complete engineering notes ({project.achievements.length})
                      </summary>
                      <ul className="mt-5 space-y-4">
                        {project.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="grid grid-cols-[1.5rem_1fr] gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="font-tech text-xs text-foreground/40">
                              {String(achievementIndex + 1).padStart(2, "0")}
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </details>

                    <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
                      {project.technologies.join(" · ")}
                    </p>
                    <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
                  </div>

                  <figure className="order-first lg:order-none">
                    <ProjectVisual type={visual} />
                    <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      Simplified system view based on the implementation described here.
                    </figcaption>
                  </figure>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-24 border-t border-border pt-10">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            Agents and developer tools
          </h3>
          <div className="mt-8 border-t border-border">
            {systems.map((index) => {
              const project = projects[index];
              return (
                <details key={project.title} className="border-b border-border py-6">
                  <summary className="grid cursor-pointer gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline">
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                    <span className="font-medium">{project.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {project.achievements.length} notes
                    </span>
                  </summary>
                  <div className="max-w-4xl pb-3 pt-6 sm:ml-40">
                    <p className="leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <ul className="mt-6 space-y-4">
                      {project.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="text-sm leading-relaxed text-foreground/85"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs text-muted-foreground">
                      {project.technologies.join(" · ")}
                    </p>
                    <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            Earlier projects
          </h3>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 pr-6 font-normal">Dates</th>
                  <th className="py-3 pr-6 font-normal">Project</th>
                  <th className="py-3 pr-6 font-normal">Summary</th>
                  <th className="py-3 font-normal">Stack</th>
                </tr>
              </thead>
              <tbody>
                {archive.map((index) => {
                  const project = projects[index];
                  return (
                    <tr key={project.title} className="border-b border-border align-top">
                      <td className="whitespace-nowrap py-5 pr-6 text-muted-foreground">
                        {project.date}
                      </td>
                      <td className="py-5 pr-6 font-medium">{project.title}</td>
                      <td className="max-w-md py-5 pr-6 leading-relaxed text-muted-foreground">
                        {project.description}
                      </td>
                      <td className="max-w-xs py-5 text-xs leading-relaxed text-muted-foreground">
                        {project.technologies.join(" · ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
