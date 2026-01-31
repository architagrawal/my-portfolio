"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { TimelineNode } from "@/components/ui/timeline-node";
import { ExperienceCard } from "@/components/ui/experience-card";

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
  technologies: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "MyStage Music Inc",
    role: "AI/ML Engineer",
    location: "Remote",
    period: "July 2025 - Present",
    achievements: [
      {
        text: "Designed and deployed RESTful APIs, enabling scalable, low-latency integrations across cloud-based services.",
        relatedTechs: ["Python", "FastAPI", "GCP"],
      },
      {
        text: "Built scalable web scraping pipelines using Playwright with proxy rotation, deployed on Compute Engine with automated scheduling via Cron jobs to ensure reliable data collection.",
        relatedTechs: ["Python", "Playwright", "GCP"],
      },
      {
        text: "Developed data pipelines with location and event deduplication logic, ensuring high-quality, clean datasets for downstream analytics and applications.",
        relatedTechs: [
          "Python",
          "Algolia",
          "Google Firestore",
          "Gemini Vertex AI",
        ],
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Playwright",
      "GCP",
      "Gemini Vertex AI",
      "Log fire",
      "Algolia",
      "Google Firestore",
    ],
    color: "purple", // Changed to purple for AI/ML vibe
  },
  {
    company: "Edplus, Arizona State University",
    role: "Student Software Developer",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    achievements: [
      {
        text: "Leading development of a retrieval-augmented generation (RAG) chatbot system, facilitating 1,000+ faculty to design courses for 60,000+ students.",
        relatedTechs: [
          "Python",
          "LangChain",
          "OpenAI",
          "Prompt Flow",
          "Semantic Kernel",
        ],
      },
      {
        text: "Automated Google Drive folder and document creation based on Google Sheets data, streamlining workflows.",
        relatedTechs: ["JavaScript", "Google Apps Script"],
      },
      {
        text: "Designed REST APIs and webpages for quiz platforms and question banks in ASU Online courses.",
        relatedTechs: ["Python", "JavaScript", "SQL"],
      },
      {
        text: "Architected and deployed a Neo4j-powered knowledge graph system integrated with LLMs, enabling complex relationship queries reducing manual processing time from 4 hours to 15 minutes per transcript.",
        relatedTechs: ["Python", "Neo4j", "OpenAI", "LangChain"],
      },
      {
        text: "Created responsive front-end interfaces with React.js and Material UI, improving user engagement by 35% and decreasing bounce rates by 20%.",
        relatedTechs: ["JavaScript"],
      },
    ],
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
    role: "Data Research Intern",
    location: "Tempe, AZ",
    period: "June 2024 – August 2024",
    achievements: [
      {
        text: "Built a Python-based vector similarity search system using FAISS and Neo4j, reducing query response time by 60% while maintaining 95% accuracy.",
        relatedTechs: ["Python", "FAISS", "Neo4j"],
      },
      {
        text: "Created a Python microservice for generating and storing vector embeddings of faculty profiles, enabling similarity-based recommendations with 85% accuracy.",
        relatedTechs: ["Python", "FastAPI", "PostgreSQL"],
      },
      {
        text: "Formulated high-performance ETL pipeline processing 10,000+ faculty profiles daily, improving data accuracy by 95%.",
        relatedTechs: ["Python", "Pandas", "PostgreSQL"],
      },
      {
        text: "Developed unit and stress tests for API endpoints ensuring system performance under high user traffic.",
        relatedTechs: ["Python", "FastAPI", "Locust"],
      },
    ],
    technologies: [
      "Python",
      "PostgreSQL",
      "Pandas",
      "FAISS",
      "FastAPI",
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
        text: "Refactored monolithic backend services into MVC microservices following SOLID principles to optimize and scale the infrastructure using Kubernetes,resulting in a 35% reduction in resource usage and a 20% cost reduction.",
        relatedTechs: [".NET", "C#", "Docker", "Kubernetes", "AWS"],
      },
      {
        text: "Executed CI/CD pipelines reducing deployment time by 70% and decreasing production incidents by 40%.",
        relatedTechs: ["Git", "Docker", "Kubernetes", "SonarQube"],
      },
      {
        text: "Developed ML prediction system to optimize space reservation systems for booking desks and meeting rooms for 300+ locations, enhancing occupancy rates by 30% for Fortune500 company.",
        relatedTechs: [".NET", "C#", "Redis"],
      },
      {
        text: "Formulated a custom node package for retrieving 10 latest messages from Slack channels, including attached media, documents, and reactions into an internal social networking web app maintaining version control.",
        relatedTechs: ["Node.js", "Git"],
      },
      {
        text: "Built responsive single-page applications using React.js and Redux, implementing client-side state management and RESTful API integration that improved user experience scores by 40%",
        relatedTechs: ["Node.js"],
      },
    ],
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
        text: "Managed cross-functional order tracking system optimizing driver location tracking, reducing costs by 45% and enhancing user growth by 25% quarter on quarter.",
        relatedTechs: ["React.js", "Google Maps API"],
      },
      {
        text: "Automated system to scrap product details and reviews using script for better business data analytics, positioning of products, and improving customer service Managed software development life cycle sprints on Kanban.",
        relatedTechs: ["Python"],
      },
      {
        text: "Developed a full stack notification system using WebSockets and Express.js, enabling real-time updates that increased customer satisfaction by 28% and reduced support calls by 35%.",
        relatedTechs: ["React.js"],
      },
    ],
    technologies: ["React.js", "Google Maps API", "Python"],
    color: "blue",
  },
];

export default function Experience() {

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients - Removed for Editorial Theme */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs font-semibold uppercase tracking-widest hover:bg-primary/10 transition-colors">
            <Rocket className="w-3 h-3" />
            <span>Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/40 pb-2">
            Professional Odyssey
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Building innovative solutions and driving measurable impact across the digital universe.
          </p>
        </motion.div>

        <div className="relative pl-4 md:pl-12">
          
          <div className="space-y-16">
            {experiences.map((exp, expIndex) => (
              <div key={expIndex} className="relative pl-8 md:pl-16">
                
                {/* Timeline Star & Path */}
                <div className="absolute left-0 top-0 bottom-0 -ml-[5px] md:-ml-[9px] w-12 flex flex-col items-center pt-8">
                    <TimelineNode color={exp.color} isLast={expIndex === experiences.length - 1} />
                </div>

                <ExperienceCard exp={exp} expIndex={expIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

