"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Zap, Code, Terminal, Cpu, Award, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

const TechBlock = ({
  icon: Icon,
  title,
  description,
  delay
}: {
  icon: any,
  title: string,
  description: string,
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative h-full bg-background/50 border border-border p-6 transition-colors duration-200 hover:border-primary/50"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 border border-primary/20">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-display uppercase tracking-wider text-lg font-bold text-foreground">
            {title}
          </h4>
        </div>

        <p className="font-tech text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover visual effect line */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background"
    >
      {/* Structural Guidelines Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 sticky top-24"
          >
            <SectionHeading eyebrow="01 // Identity" title="About Me" className="mb-0" />

            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg font-light leading-relaxed border-l-2 border-primary/30 pl-4">
                Founding AI/ML Engineer shipping <span className="text-foreground font-medium">production agentic systems</span>.
              </p>

              <p className="leading-relaxed">
                I&apos;m an AI engineer (MSCS, Arizona State University, 4.0 GPA)
                building the agent infrastructure at MyStage: LangGraph
                orchestration, entity resolution with LLMs, and data pipelines
                indexing 70,000+ records a day.
              </p>

              <p className="leading-relaxed">
                Before that: multi-tenant RAG serving 60,000+ students, hybrid
                vector + knowledge-graph retrieval, and microservices used by
                Fortune 500 clients. I work across the full stack, from React
                frontends to model inference and cloud infra.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <div className="inline-flex items-center space-x-3 px-4 py-2 border border-secondary/50 bg-muted/20">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-tech text-sm">MSCS @ Arizona State University</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 border border-secondary/50 bg-muted/20">
                <span className="font-tech text-sm text-secondary font-semibold">GPA 4.0 / 4.0</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 border border-secondary/50 bg-muted/20">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-tech text-sm">NYC Metro Area</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-secondary" />
                <span className="font-tech text-xs uppercase tracking-[0.2em] text-secondary">Certifications</span>
              </div>
              <ul className="space-y-2 text-sm font-tech text-muted-foreground">
                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/70 before:shrink-0">
                  LangChain Chat with Your Data
                </li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/70 before:shrink-0">
                  Building Systems with the ChatGPT API
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Technical Specs */}
          <div className="lg:col-span-7 space-y-16 pt-8 lg:pt-0">

            {/* Bold Statement Lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {[
                {
                  line: "I figure things out.",
                  desc: "Throw a vague spec, a gnarly bug, or an unfamiliar stack at me and I'll map a path through it. I'm at home in the messy part of a project, turning ambiguity into working architecture.",
                },
                {
                  line: "I build things people use.",
                  desc: "Demos are easy, production is the job. I've shipped AI agents, voice bots, and full-stack apps that real users depend on, not just prototypes that sit in a repo.",
                },
                {
                  line: "I own the full stack.",
                  desc: "Comfortable from a polished React UI down to model inference, database schema, and the cloud infra that keeps it all running.",
                },
                {
                  line: "I keep learning.",
                  desc: "AI/ML moves fast. I stay close to the frontier, currently deep in agentic workflows and automation systems.",
                },
              ].map((item, i) => (
                <div key={item.line} className="group grid sm:grid-cols-12 gap-4 sm:gap-8 border-t border-border/50 pt-6">
                  <span className="sm:col-span-1 font-tech text-sm text-primary pt-2">
                    0{i + 1}
                  </span>
                  <h3 className="sm:col-span-5 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95] transition-transform duration-300 group-hover:translate-x-2">
                    {item.line}
                  </h3>
                  <p className="sm:col-span-6 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">

            <motion.div className="sm:col-span-2">
               <TechBlock
                icon={Terminal}
                title="Agentic Systems"
                description="LangGraph agent-workers in production: checkpointed pause/resume, idempotent task claims, parallel fan-out, distributed tracing. Not demos. Systems that survive retries and concurrency."
                delay={0.2}
              />
            </motion.div>

            <TechBlock
              icon={Zap}
              title="LLM Engineering"
              description="RAG at scale, entity resolution with Gemini, preference tuning (DPO/KTO), eval harnesses, and prompt pipelines with measurable accuracy lifts."
              delay={0.3}
            />

            <TechBlock
              icon={Heart}
              title="Full-Stack Delivery"
              description="React/Next.js frontends, FastAPI and .NET services, Postgres/Firestore data layers, CI/CD on GCP and AWS. Owned end to end."
              delay={0.4}
            />

            <div className="sm:col-span-2">
               <TechBlock
                icon={Cpu}
                title="Reliability & Testing"
                description="200+ pytest suites on agent pipelines, property-based testing, load testing with SLOs, observability with Logfire. AI systems earn trust through evals and tests."
                delay={0.5}
              />
            </div>

          </div>

          </div>

        </div>
      </div>
    </section>
  );
}
