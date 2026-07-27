"use client";

import { motion } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Terminal,
  Code2,
  Layers,
  Brain,
  Bot,
  Plug,
  Cloud,
  Database,
  FlaskConical,
  LucideIcon,
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "agents-llm",
    title: "Agents & LLM Engineering",
    tagline: "Agentic systems end to end, tracking every iteration since 2023.",
    icon: Bot,
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "Pydantic AI",
      "Semantic Kernel",
      "Prompt Flow",
      "Claude Agent SDK",
      "OpenAI API",
      "Anthropic API (Claude)",
      "Gemini / Vertex AI",
      "Agentic AI",
      "Multi-Agent Systems",
      "Agent Orchestration",
      "Subagents / Orchestrator-Worker Patterns",
      "Agent Memory (short & long-term)",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Context Engineering",
      "Chain-of-Thought (CoT)",
      "ReAct",
      "Few-shot / Zero-shot",
      "Structured Outputs",
      "Function Calling / Tool Use",
      "Prompt Caching",
      "Token Streaming (SSE)",
      "Guardrails",
      "LLM Evals / LLM-as-Judge",
      "Human-in-the-Loop",
      "LLM Observability & Tracing",
    ],
  },
  {
    id: "mcp-tooling",
    title: "MCP & AI-Native Tooling",
    tagline: "MCP server dev & deploy, agent skills, hooks, agentic coding daily drivers.",
    icon: Plug,
    skills: [
      "MCP (Model Context Protocol)",
      "MCP Server Development",
      "MCP Server Deployment (stdio / Streamable HTTP)",
      "FastMCP",
      "MCP Tools, Resources & Prompts",
      "A2A Protocol",
      "Claude Code",
      "OpenAI Codex",
      "Kiro",
      "Agent Skills (Claude Skills)",
      "Skill Development",
      "Custom Slash Commands & Hooks",
      "CLAUDE.md / AGENTS.md",
      "Spec-Driven Development",
      "Agentic Coding",
      "AI-Assisted Code Review",
      "Sandboxed Agent Execution",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    tagline: "Model training, fine-tuning, audio ML, RL preference tuning.",
    icon: Brain,
    skills: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "Transformers",
      "Diffusers",
      "Fine-tuning (LoRA / PEFT)",
      "DPO / KTO",
      "OCR (Tesseract)",
      "PaddleOCR",
      "Bark (TTS)",
      "Stable Video Diffusion",
      "MERT",
      "VampNet",
      "Demucs",
      "Audiobox",
      "CLAP",
      "Matchering",
      "Audio DSP",
      "librosa",
      "torchaudio",
      "Neo4j (KG)",
      "FAISS",
      "pgvector",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Jupyter",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    tagline: "Daily-driver syntax across web, systems, scripting.",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "C#", "Go", "C", "C++", "SQL", "Bash", "PowerShell", "HTML/CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks & UI",
    tagline: "Production-grade web and mobile stack.",
    icon: Layers,
    skills: [
      "React",
      "React 19",
      "Next.js",
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "OpenAPI / Swagger",
      "Pydantic",
      ".NET Core",
      "Vite",
      "Tailwind CSS",
      "Tamagui",
      "Radix UI",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "ReactFlow",
      "Framer Motion",
      "D3.js",
      "Recharts",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "GCP-heavy, multi-cloud, GPU infra.",
    icon: Cloud,
    skills: [
      "AWS",
      "AWS EKS",
      "AWS SQS",
      "AWS S3",
      "AWS Lambda",
      "AWS EC2",
      "GCP",
      "Cloud Run",
      "Cloud Functions",
      "Cloud Storage (GCS)",
      "Compute Engine",
      "Firebase",
      "Cloud Scheduler",
      "Cloud Tasks",
      "Pub/Sub",
      "Cloudflare Workers",
      "Vercel",
      "DigitalOcean",
      "ROCm / MI300X",
      "HuggingFace Spaces",
      "EAS",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Serverless",
      "Microservices",
      "Git",
      "CI/CD",
      "Jenkins",
      "GitLab CI",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "RabbitMQ",
      "Logfire",
      "OpenTelemetry",
    ],
  },
  {
    id: "hpc",
    title: "HPC & Compute",
    tagline: "GPU systems, parallel compute, profiling.",
    icon: Terminal,
    skills: [
      "CUDA",
      "C++",
      "ROCm",
      "GPU Profiling (Nsight)",
      "Linux (Bash/Shell)",
      "Vertex AI",
      "MI300X",
    ],
  },
  {
    id: "databases",
    title: "Databases & Search",
    tagline: "Relational, document, vector, edge.",
    icon: Database,
    skills: [
      "PostgreSQL",
      "Firestore",
      "Supabase",
      "SQLite",
      "Cloudflare D1",
      "Drizzle ORM",
      "SQL Alchemy",
      "Redis",
      "MMKV",
      "Algolia",
      "Pinecone",
      "DynamoDB",
      "Neo4j",
    ],
  },
  {
    id: "testing",
    title: "Testing & Tooling",
    tagline: "Unit, integration, property-based, E2E.",
    icon: FlaskConical,
    skills: [
      "pytest",
      "pytest-asyncio",
      "Jest",
      "Vitest",
      "React Testing Library",
      "fast-check",
      "Maestro",
      "Playwright",
      "Locust",
      "SonarQube",
      "ESLint",
      "Prettier",
      "Postman",
    ],
  },
];

function SkillCard({ cat, idx }: { cat: SkillCategory; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      whileHover={{ y: -6 }}
      className="skill-card group relative overflow-hidden border border-border bg-card/40 p-6 transition-colors duration-200 hover:border-primary/40"
      style={{
        // @ts-expect-error -- CSS vars
        "--mx": "50%",
        "--my": "50%",
      }}
    >
      {/* Mouse-tracked spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), hsl(var(--primary) / 0.15), transparent 60%)",
        }}
      />

      <div className="absolute inset-0 bg-card/60 -z-10" />

      <div className="relative flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="p-2.5 bg-primary/10 border border-primary/20 text-primary"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <span className="font-display text-4xl md:text-5xl font-bold leading-none tracking-tight text-foreground/10 select-none">
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="relative text-[11px] font-tech uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
        {cat.tagline}
      </p>
      <h3 className="relative text-xl font-display font-extrabold uppercase tracking-tight mb-4 text-foreground">
        {cat.title}
      </h3>

      <div className="relative flex flex-wrap gap-1.5">
        {cat.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 + i * 0.015 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-2 py-0.5 text-[11px] font-mono bg-background/60 border border-border text-foreground/90 hover:border-primary hover:text-primary transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading eyebrow="04 // Tech Stack" title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((cat, idx) => (
            <SkillCard key={cat.id} cat={cat} idx={idx} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 border-t border-border/50 pt-6 text-sm text-muted-foreground"
        >
          <span className="font-tech text-xs uppercase tracking-[0.2em] text-primary mr-3">
            Next rabbit holes
          </span>
          Multi-agent orchestration patterns · LLM evals at scale · audio ML —
          the list never really ends.
        </motion.p>

        <div className="sr-only">
          <h3>Skills List</h3>
          <ul>
            {skillCategories.map((cat) => (
              <li key={cat.id}>
                <h4>{cat.title}</h4>
                <ul>
                  {cat.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
