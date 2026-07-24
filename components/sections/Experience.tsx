import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionHeading } from "@/components/ui/section-heading";

interface Achievement {
  text: string;
  relatedTechs?: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: (string | Achievement)[];
  featuredAchievementIndexes?: number[];
  technologies: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "MyStage Music Inc",
    role: "Founding AI/ML Engineer",
    location: "Remote",
    period: "July 2025 - Present",
    achievements: [
      {
        text: "Migrated a 14-Cloud-Function event pipeline into a unified LangGraph agent-worker on Cloud Run Jobs, collapsing six per-stage task types into one process-new-event-url graph composing sourcing → extraction → resolution → entity-source write → image fan-out sub-graphs.",
        relatedTechs: ["Python", "LangGraph", "GCP", "Cloud Run"],
      },
      {
        text: "Built reusable build_scraping_subgraph() factory compiled without a Firestore checkpointer so parent graphs compose it without nested-checkpoint conflicts; added route_entry bridge letting webhook-sourced scrapes skip URL-fetch and enter at extraction.",
        relatedTechs: ["Python", "LangGraph"],
      },
      {
        text: "Implemented interrupt()/resume pause-for-research contract: subgraph idempotently enqueues a domain-research task on missing domain_metadata/{tld}, calls interrupt(f\"domain_research:{tld}\"), resumes from checkpoint when external pipeline flips parent task to ready.",
        relatedTechs: ["Python", "LangGraph", "Google Firestore"],
      },
      {
        text: "Designed pure-function routing predicates (route_after_sourcing/extraction/resolution) over typed state for deterministic flow; used Send-based parallel image fan-out with per-Send error isolation via operator.add-reduced state field.",
        relatedTechs: ["Python", "LangGraph"],
      },
      {
        text: "Wrote atomic Firestore claim transactions with status == \"ready\" preconditions for multi-worker concurrency; used deterministic agent-task IDs with create() + AlreadyExists for true retry idempotency (set() would clobber in-flight tasks).",
        relatedTechs: ["Python", "Google Firestore"],
      },
      {
        text: "Built and operated a Playwright scraping service on Compute Engine. It processes 70,000+ records per day from 650+ locations and rotates proxies when sites block requests.",
        relatedTechs: ["Python", "Playwright", "GCP"],
      },
      {
        text: "Added Gemini-based entity resolution before records enter Firestore and Algolia. Internal dataset checks improved by 25%.",
        relatedTechs: ["Python", "Gemini Vertex AI", "Google Firestore", "Algolia"],
      },
      {
        text: "Shipped FastAPI + Cloud Functions REST endpoints fronting Algolia for sub-50ms search latency and Firestore for real-time sync.",
        relatedTechs: ["Python", "FastAPI", "GCP", "Algolia", "Google Firestore"],
      },
      {
        text: "Refactored a monolithic 1,600-LOC source-generic Cloud Run service into a callable subgraph inside packages/mystage-agents/scraping/ via git mv (history preserved), full import-path rewrite, and dep relocation — service deps trimmed 14 → 5.",
        relatedTechs: ["Python", "Cloud Run"],
      },
      {
        text: "Extended canonical Performance entity with next_reprocess_time / last_reprocess_time / reprocess_count; built Cloud Scheduler trigger emitting process-reprocess-event-data tasks and most-stale URL selection over entity_sources ordered by last_successful_scrape_time ASC.",
        relatedTechs: ["Python", "Google Firestore", "GCP"],
      },
      {
        text: "Wired Logfire distributed-trace context propagation: scheduler captures root ctx per URL into agent_tasks/{id}.ctx, runner attach_context() on claim and resume so worker spans nest under producer trace across pause/resume; added per-tick metric_counter instrumentation.",
        relatedTechs: ["Python", "Logfire"],
      },
      {
        text: "Added 200+ pytest tests for routing, task claims, retries, pause and resume behavior, and image fan-out. Mocked Firestore fixtures let most suites run locally.",
        relatedTechs: ["Python", "pytest"],
      },
    ],
    featuredAchievementIndexes: [5, 6, 11],
    technologies: [
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
      "asyncio",
    ],
    color: "purple",
  },
  {
    company: "Arizona State University",
    role: "Student Researcher",
    location: "Tempe, AZ",
    period: "August 2024 – May 2025",
    achievements: [
      {
        text: "Designed prompts to test cause-and-effect ordering and counterfactual reasoning in text-conditioned video generation models.",
        relatedTechs: ["Python", "PyTorch", "Diffusers"],
      },
      {
        text: "Built a frame-sequence rubric for measuring whether generated rigid-body motion follows gravity, momentum, and collision behavior.",
        relatedTechs: ["Python", "PyTorch", "Computer Vision"],
      },
    ],
    featuredAchievementIndexes: [0, 1],
    technologies: ["Python", "PyTorch", "Diffusers", "Computer Vision", "Video Generation"],
    color: "purple",
  },
  {
    company: "Edplus, Arizona State University",
    role: "Instructional Design Assistant · Software Engineering",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    achievements: [
      {
        text: "Led development of a multi-tenant RAG assistant used by 1,000+ faculty members who author courses for 60,000+ students.",
        relatedTechs: [
          "Python",
          "LangChain",
          "OpenAI",
          "Prompt Flow",
          "Semantic Kernel",
        ],
      },
      {
        text: "Combined Neo4j with generated Cypher queries to reduce transcript analysis from four hours to 15 minutes.",
        relatedTechs: ["Python", "Neo4j", "OpenAI", "LangChain"],
      },
      {
        text: "Designed REST APIs and SQL-backed admin surfaces powering quiz platforms and question banks across ASU Online; enforced schema-level invariants for assessment integrity.",
        relatedTechs: ["Python", "JavaScript", "SQL"],
      },
      {
        text: "Authored Google Apps Script automation generating Drive folder/doc hierarchies from Sheets metadata, eliminating manual course-provisioning toil.",
        relatedTechs: ["JavaScript", "Google Apps Script"],
      },
      {
        text: "Built React and Material UI interfaces that increased engagement by 35% and reduced bounce rate by 20%.",
        relatedTechs: ["JavaScript"],
      },
    ],
    featuredAchievementIndexes: [0, 1, 4],
    technologies: [
      "Python",
      "LangChain",
      "OpenAI",
      "Prompt Flow",
      "Semantic Kernel",
      "Neo4j",
      "JavaScript",
      "Google Apps Script",
      "SQL",
      "Pandas",
    ],
    color: "blue",
  },
  {
    company: "Knowledge Exchange for Resilience, Arizona State University",
    role: "Data Research Aide",
    location: "Tempe, AZ",
    period: "June 2024 – August 2024",
    achievements: [
      {
        text: "Combined FAISS retrieval with Neo4j entities, reducing p95 query latency by 60% while maintaining 95% recall.",
        relatedTechs: ["Python", "FAISS", "Neo4j"],
      },
      {
        text: "Built a FastAPI embedding microservice over Postgres/pgvector for faculty-profile similarity, surfacing collaborator recommendations at 85% top-k precision.",
        relatedTechs: ["Python", "FastAPI", "PostgreSQL"],
      },
      {
        text: "Built an idempotent ETL pipeline for 10,000+ faculty profiles per day. Postgres constraints and validation checks raised dataset accuracy to 95%.",
        relatedTechs: ["Python", "Pandas", "PostgreSQL"],
      },
      {
        text: "Wrote pytest unit + Locust load suites against FastAPI endpoints, establishing throughput and latency SLOs prior to release.",
        relatedTechs: ["Python", "FastAPI", "Locust"],
      },
      {
        text: "Delivered 20+ production REST APIs for NSF-funded Knowledge Alliance tool using .NET 8 + Dapper + MediatR clean architecture, secured with JWT and queued via AWS SQS.",
        relatedTechs: [".NET 8", "C#", "Dapper", "MediatR", "JWT", "AWS SQS"],
      },
      {
        text: "Reduced API latency from 198 ms to 20 ms with Redis caching and SQL query changes, then verified the result under load.",
        relatedTechs: ["Redis", "SQL", ".NET 8"],
      },
      {
        text: "Built bigram/n-gram ranking model over cleaned faculty profile text — 15% lift in search relevance over baseline.",
        relatedTechs: ["Python", "Deep Learning"],
      },
    ],
    featuredAchievementIndexes: [0, 2, 5],
    technologies: [
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
      "Locust",
    ],
    color: "teal",
  },
  {
    company: "Zeus Learning",
    role: "Software Engineer",
    location: "Mumbai, India",
    period: "Jan 2022 – July 2023",
    achievements: [
      {
        text: "Helped split a .NET monolith into Kubernetes services, reducing resource use by 35% and infrastructure cost by 20%.",
        relatedTechs: [".NET", "C#", "Docker", "Kubernetes", "AWS"],
      },
      {
        text: "Added SonarQube checks and containerized release pipelines. Deployment time fell by 70% and production incidents by 40%.",
        relatedTechs: ["Git", "Docker", "Kubernetes", "SonarQube"],
      },
      {
        text: "Worked on a Redis-backed demand prediction service for desk and room reservations across 300+ enterprise sites. Reported occupancy increased by 30%.",
        relatedTechs: [".NET", "C#", "Redis", "React", "Node.js"],
      },
      {
        text: "Optimized Angular student-listing screen with paginated fetching and AWS S3-backed asset delivery — 30% faster screen load; streamlined MySQL queries on class-details page for additional 10% latency reduction.",
        relatedTechs: ["Angular", "JavaScript", "AWS S3", "MySQL"],
      },
      {
        text: "Published an internal npm package wrapping the Slack Web API for paginated message + attachment + reaction retrieval, consumed by the company social platform with semver-disciplined releases.",
        relatedTechs: ["Node.js", "Git"],
      },
      {
        text: "Built React + Redux SPAs with normalized client-side state and typed REST integration, raising measured UX scores by 40%.",
        relatedTechs: ["Node.js"],
      },
    ],
    featuredAchievementIndexes: [0, 1, 2],
    technologies: [
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
      "Git",
    ],
    color: "orange", // Changed to orange for backend/cloud vibe
  },
  {
    company: "EAT.FIT",
    role: "Product Intern",
    location: "Bengaluru, India",
    period: "Sept 2021 – Dec 2021",
    achievements: [
      {
        text: "Built the order-tracking flow around Google Maps and changed driver-location polling to reduce operating cost by 45%. The product reported 25% quarter-over-quarter user growth.",
        relatedTechs: ["React.js", "Google Maps API"],
      },
      {
        text: "Built Python jobs that collected product catalogs and reviews for pricing and customer-experience analysis.",
        relatedTechs: ["Python"],
      },
      {
        text: "Built a WebSocket and Express notification service. Reported customer satisfaction increased by 28% and support volume fell by 35%.",
        relatedTechs: ["React.js"],
      },
    ],
    technologies: ["React.js", "Google Maps API", "Python"],
    color: "blue",
  },
  {
    company: "Dhirubhai Ambani Institute of Information and Communication Technology",
    role: "Computer Vision Researcher",
    location: "Gandhinagar, India",
    period: "May 2021 – August 2021",
    achievements: [
      {
        text: "Studied how sensor data is captured, stored, and processed for vehicle guidance in self-driving systems.",
        relatedTechs: ["Python", "Computer Vision"],
      },
      {
        text: "Worked with radar and lidar acquisition concepts, vehicle-to-vehicle communication, and HD-map localization.",
        relatedTechs: ["Python", "Lidar", "Computer Vision"],
      },
    ],
    technologies: ["Python", "Computer Vision", "Lidar", "Radar"],
    color: "teal",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Experience" title="Professional work" />
        <div className="border-t border-border">
          {experiences.map((exp, expIndex) => (
            <ExperienceCard
              key={`${exp.company}-${exp.period}`}
              exp={exp}
              expIndex={expIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
