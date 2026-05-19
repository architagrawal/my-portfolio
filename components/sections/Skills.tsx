"use client";

import { motion } from "framer-motion";
import { useRef, MouseEvent } from "react";
import {
  Terminal,
  Code2,
  Layers,
  Brain,
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
  accent: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    tagline: "Daily-driver syntax across web, systems, scripting.",
    icon: Code2,
    accent: "from-blue-500/20 to-blue-500/0 border-blue-500/30 text-blue-400",
    skills: ["Python", "JavaScript", "TypeScript", "C#", "Go", "C", "C++", "SQL", "Bash", "PowerShell", "HTML/CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks & UI",
    tagline: "Production-grade web and mobile stack.",
    icon: Layers,
    accent: "from-teal-500/20 to-teal-500/0 border-teal-500/30 text-teal-400",
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
      "GraphQL",
      ".NET Core",
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
    id: "ai-ml",
    title: "AI & ML",
    tagline: "LLM orchestration, audio ML, RL preference tuning.",
    icon: Brain,
    accent: "from-purple-500/20 to-purple-500/0 border-purple-500/30 text-purple-400",
    skills: [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Hugging Face",
      "Transformers",
      "Diffusers",
      "Pydantic AI",
      "MCP",
      "CrewAI",
      "OpenAI API",
      "Gemini / Vertex AI",
      "RAG",
      "Prompt Flow",
      "Semantic Kernel",
      "OCR (Tesseract)",
      "PaddleOCR",
      "Bark (TTS)",
      "Stable Video Diffusion",
      "DPO / KTO",
      "MERT",
      "VampNet",
      "Demucs",
      "Audiobox",
      "CLAP",
      "Matchering",
      "Audio DSP",
      "Neo4j (KG)",
      "FAISS",
      "pgvector",
      "scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "GCP-heavy, multi-cloud, GPU infra.",
    icon: Cloud,
    accent: "from-orange-500/20 to-orange-500/0 border-orange-500/30 text-orange-400",
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
      "Compute Engine",
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
      "Kubernetes",
      "Git",
      "CI/CD",
      "Jenkins",
      "GitLab CI",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "RabbitMQ",
      "Logfire",
    ],
  },
  {
    id: "hpc",
    title: "HPC & Compute",
    tagline: "GPU systems, parallel compute, profiling.",
    icon: Terminal,
    accent: "from-yellow-500/20 to-yellow-500/0 border-yellow-500/30 text-yellow-400",
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
    accent: "from-emerald-500/20 to-emerald-500/0 border-emerald-500/30 text-emerald-400",
    skills: [
      "PostgreSQL",
      "Firestore",
      "Supabase",
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
    accent: "from-pink-500/20 to-pink-500/0 border-pink-500/30 text-pink-400",
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
    ],
  },
];

function SkillCard({ cat, idx }: { cat: SkillCategory; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;
  const iconColor = cat.accent.split(" ").find((c) => c.startsWith("text-")) ?? "";

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
      className={`skill-card group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${cat.accent} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20`}
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
          className={`p-2.5 rounded-xl bg-background/50 border border-white/5 ${iconColor}`}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <span className="text-[10px] font-tech uppercase tracking-widest text-muted-foreground">
          {String(cat.skills.length).padStart(2, "0")} items
        </span>
      </div>

      <h3 className="relative text-lg font-heading uppercase tracking-wide mb-1 text-foreground">
        {cat.title}
      </h3>
      <p className="relative text-xs text-muted-foreground mb-4 leading-relaxed font-light">
        {cat.tagline}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {cat.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 + i * 0.015 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-2 py-0.5 text-[11px] font-mono bg-background/60 border border-border rounded-md text-foreground/90 hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/30 transition-colors cursor-default"
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
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
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
      {/* Single soft accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs font-semibold uppercase tracking-widest hover:bg-primary/10 transition-colors">
            <Terminal className="w-3 h-3" />
            <span>Tech Stack</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide font-display uppercase text-foreground pb-2">
            Technical Proficiency
          </h2>
          <p className="text-base md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Tools, frameworks, and infra I work with daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((cat, idx) => (
            <SkillCard key={cat.id} cat={cat} idx={idx} />
          ))}
        </div>

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
