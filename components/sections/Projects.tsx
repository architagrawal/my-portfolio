"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Calendar,
  ArrowRight,
} from "lucide-react";
import ProjectsCarousel from "@/components/projects-carousel";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

const projects = [
  {
    title: "AiJockey — AI DJ Pipeline",
    description:
      "End-to-end AI DJ rendering pipeline on ROCm/MI300X: stem separation → musical analysis → LLM Director → 25+ DSP transitions → mastering, with closed-loop preference tuning over Audiobox critics.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
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
    award: undefined,
  },
  {
    title: "PrismSplit",
    description:
      "React Native / Expo bill-splitting app on Supabase + Tamagui — feature-sliced Zustand stores, Postgres RPC ledger, real-time activity, AI receipt scan.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
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
    award: undefined,
  },
  {
    title: "SRP Electric MCP Server",
    description:
      "TypeScript MCP server exposing a legacy utility portal to LLM agents — reverse-engineered authentication, structured JSON tools for energy data reasoning.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
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
      "MCP workflow automation service integrating GitHub webhooks, LLM reasoning, and pull-request analysis pipelines across GitHub Actions + Asana.",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
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
      "React 18 + ReactFlow 11 visual DAG editor with typed nodes, Zustand-backed undo/redo, debounced localStorage autosave, and FastAPI DAG-validation backend.",
    image:
      "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=800&q=80",
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
      "Serverless analytics platform on Cloudflare Workers + D1 with Next.js 16 / React 19 frontend on Vercel; scheduled ETL, D3 viz gallery, TanStack Query, WCAG-compliant UI.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
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
    award: undefined,
  },
  {
    title: "Image Recognition as a Service",
    description:
      "Elastic cloud infrastructure SaaS for image recognition using deep learning models.",
    image:
      "https://nordicapis.com/wp-content/uploads/7-Best-Image-Recognition-APIs-e1587080882739.jpg",
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
      "Enhanced soccer game result prediction accuracy using advanced ML techniques.",
    image:
      "https://localsportsjournal.com/wp-content/uploads/2022/05/soccer-logo-general-scaled.jpg",
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
      "Android app for tracking heart/breath rates and personalized workout routines.",
    image:
      "https://thumbs.dreamstime.com/b/illustration-depicting-various-health-fitness-technology-interactions-features-illustration-depicting-various-health-395487611.jpg",
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
      "Implemented reverse-mode auto-differentiation for training neural networks.",
    image: "https://i.ytimg.com/vi/1dqoFhl3zQQ/sddefault.jpg",
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
      "Full-featured online shopping platform with auth, product catalog, Stripe payments, React frontend, and Django REST backend on PostgreSQL + Redis.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
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
      "Collaborative project management tool with task assignment, progress tracking, and deadline notifications — Flask REST API, SQLAlchemy ORM, JWT auth, React UI.",
    image:
      "https://terotam.com/wp-content/uploads/2022/07/Task-Management-software.png",
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
      "Scalable chat platform with private/group messaging — Django Channels WebSockets, Redis message queue, geolocation features, Plotly user-location viz.",
    image:
      "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
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

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const open = activeProject !== null ? projects[activeProject] : null;

  useEffect(() => {
    if (activeProject === null) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [activeProject]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="03 // Work" title="Projects" />

        <ProjectsCarousel totalCards={projects.length}>
          {projects.map((project, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[360px] lg:w-[380px] overflow-hidden transition-colors duration-200 border border-border bg-card relative h-[540px] flex flex-col group rounded-none hover:border-primary/50 cursor-pointer"
              onClick={() => setActiveProject(index)}
            >

              <div className="relative z-10 flex flex-col h-full min-h-0">
                {/* Image Container - Technical Aspect */}
                <div className="h-[140px] bg-muted overflow-hidden relative border-b border-border shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFBE1Fx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADERIh/9oADAMBAAIRAxEAPwDK9B1a3p1Wes1CrHYhmPJZEJABHogEewe2FW6rkltWpbEsMSSyuXdlQAFieScYxlWO1Jv7n//Z"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-background/90 border border-border px-2 py-1 font-tech text-xs tracking-wider uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2 pt-3">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <CardTitle className="text-base text-foreground font-heading uppercase tracking-wide leading-tight line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-primary opacity-70 shrink-0 mt-0.5" />
                  </div>
                  <div className="h-px w-full bg-border mb-1.5" />
                  <p className="text-muted-foreground leading-snug text-xs font-sans line-clamp-2">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3 flex-1 min-h-0 flex flex-col pb-4">
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-[10px] text-muted-foreground font-tech uppercase tracking-wider">
                      Highlights
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.slice(0, 3).map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 group/item"
                        >
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                          <span className="text-[11px] text-foreground font-mono leading-snug line-clamp-2">
                            {typeof achievement === "string" ? achievement : achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {project.achievements.length > 3 && (
                      <p className="text-[10px] text-primary/80 font-tech pl-3">
                        +{project.achievements.length - 3} more →
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-[10px] text-muted-foreground font-tech uppercase tracking-wider">Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 6).map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="px-1.5 py-0.5 bg-muted border border-border text-[9px] font-tech text-foreground uppercase tracking-wider"
                        >
                          {tech}
                        </div>
                      ))}
                      {project.technologies.length > 6 && (
                        <div className="px-1.5 py-0.5 text-[9px] font-tech text-muted-foreground">
                          +{project.technologies.length - 6}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 mt-auto">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(index);
                      }}
                      className="group/btn flex-1"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} GitHub repository`}
                        className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors shrink-0"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} live demo`}
                        className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </ProjectsCarousel>
      </div>

      <Dialog open={activeProject !== null} onOpenChange={(o) => !o && setActiveProject(null)}>
        <DialogContent
          onWheel={(e) => e.stopPropagation()}
          className="!grid-cols-1 block max-w-3xl max-h-[85vh] overflow-y-auto rounded-none border-border bg-card p-0 gap-0 overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {open && (
            <>
              <div className="relative aspect-[21/9] bg-muted overflow-hidden border-b border-border">
                <Image
                  src={open.image}
                  alt={open.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-background/90 border border-border font-tech text-[10px] tracking-wider uppercase mb-2">
                    <Calendar className="w-3 h-3" />
                    {open.date}
                  </div>
                </div>
              </div>
              <DialogHeader className="px-6 pt-4 pb-2">
                <DialogTitle className="text-2xl font-heading uppercase tracking-wide">
                  {open.title}
                </DialogTitle>
                {open.description && (
                  <DialogDescription className="text-sm font-sans leading-relaxed">
                    {open.description}
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="px-6 pb-6 space-y-5">
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-muted-foreground font-tech uppercase tracking-wider">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {open.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="text-xs text-foreground font-mono leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-muted-foreground font-tech uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {open.technologies.map((tech, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 bg-muted border border-border text-[10px] font-tech text-foreground uppercase tracking-wider"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                {(open.demoUrl || open.githubUrl) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {open.demoUrl && (
                      <Button size="sm" asChild>
                        <a href={open.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {open.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={open.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-2" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
