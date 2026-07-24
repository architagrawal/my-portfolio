import { SectionHeading } from "@/components/ui/section-heading";
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
    tagline: "Languages used across recent roles and projects.",
    icon: Code2,
    accent: "from-blue-500/20 to-blue-500/0 border-blue-500/30 text-blue-400",
    skills: ["Python", "JavaScript", "TypeScript", "C#", "Go", "C", "C++", "SQL", "Bash", "PowerShell", "HTML/CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks & UI",
    tagline: "Application frameworks and interface libraries.",
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
    tagline: "Models, orchestration, retrieval, and evaluation.",
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
    tagline: "Deployment, compute, messaging, and operations.",
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
    tagline: "GPU execution and profiling.",
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
    tagline: "Relational, document, vector, graph, and search systems.",
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
    tagline: "Unit, integration, property-based, load, and end-to-end testing.",
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

const operatingStrengths = [
  {
    title: "Production AI systems",
    description:
      "Most recent work: LangGraph orchestration, retrieval, entity resolution, evaluation, preference tuning, and asynchronous worker infrastructure.",
  },
  {
    title: "Application and backend engineering",
    description:
      "React and React Native clients, Python and .NET services, API design, relational and document data models, and background processing.",
  },
  {
    title: "Operations and reliability",
    description:
      "Idempotency, transaction boundaries, distributed tracing, unit and integration tests, load testing, release checks, and recovery procedures.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Skills" title="Technical index" />

        <div className="grid border-y border-border lg:grid-cols-3">
          {operatingStrengths.map((strength) => (
            <article
              key={strength.title}
              className="border-b border-border py-7 last:border-b-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
            >
              <h3 className="font-medium">{strength.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {strength.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[13rem_1fr]"
            >
              <div>
                <h3 className="font-medium">{category.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {category.tagline}
                </p>
              </div>
              <p className="text-sm leading-7 text-foreground/85">
                {category.skills.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
