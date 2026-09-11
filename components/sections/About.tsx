"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap, Heart, Zap, Code, Terminal, Cpu, Award, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

/* Statement row that comes into focus when it crosses the middle of the viewport */
const StatementRow = ({ line, desc, index }: { line: string; desc: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inFocus = useInView(ref, { margin: "-38% 0px -38% 0px" });
  const focused = reduce ? true : inFocus;

  return (
    <div
      ref={ref}
      className={cn(
        "group grid sm:grid-cols-12 gap-4 sm:gap-8 border-t border-border/50 pt-6 transition-opacity duration-500",
        focused ? "opacity-100" : "opacity-50"
      )}
    >
      <span
        className={cn(
          "sm:col-span-1 font-tech text-sm pt-2 transition-colors duration-500",
          focused ? "text-primary" : "text-muted-foreground"
        )}
      >
        0{index + 1}
      </span>
      <h3
        className={cn(
          "sm:col-span-5 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95] transition-transform duration-500 group-hover:translate-x-2",
          focused && "sm:translate-x-2"
        )}
      >
        {line}
      </h3>
      <p className="sm:col-span-6 text-sm text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

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
              <p className="text-lg font-light leading-relaxed">
                AI/ML engineer building <span className="text-foreground font-medium">reliable agentic systems for real users</span>.
              </p>

              <p className="leading-relaxed">
                I hold an MS in Computer Science from Arizona State University
                (4.0 GPA). At EdPlus I own the architecture of an agentic
                survey-analysis platform: ten agents over 65 registered tools, 116k
                lines of TypeScript on Bedrock and Step Functions, plus the
                target architecture for the production system that follows it.
                At MyStage I build LangGraph workflows, LLM-powered entity
                resolution, and pipelines that process more than 70,000 records
                a day.
              </p>

              <p className="leading-relaxed">
                Earlier, I led a multi-tenant RAG platform supporting course
                development for 60,000+ students, built hybrid vector and
                knowledge-graph retrieval, and shipped microservices used by
                Fortune 500 clients. I work across the system—from product UI
                and APIs to model evaluation, data, and cloud infrastructure.
              </p>

              <p className="leading-relaxed">
                Outside work, I&apos;m usually running my own playlists through
                AiJockey—the AI DJ project below—and tuning
                transitions until they stop sounding like a robot made them.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <div className="inline-flex items-center space-x-3 px-4 py-2 border border-secondary/50 bg-muted/20">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-tech text-sm">MSCS @ Arizona State University</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 border border-secondary/50 bg-muted/20">
                <span className="font-tech text-sm font-semibold">GPA 4.0 / 4.0</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 border border-secondary/50 bg-muted/20">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-tech text-sm">United States · Open to Relocation</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Recognition
                </span>
              </div>
              <ul className="space-y-2 text-sm font-tech text-muted-foreground">
                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/70 before:shrink-0">
                  3 hackathon podium finishes
                </li>
                <li className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/70 before:shrink-0">
                  6 certifications, listed in full below
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
                  line: "I turn ambiguity into architecture.",
                  desc: "Give me an unclear requirement, a hard failure, or an unfamiliar system and I'll create a practical path forward—from the first decision record to production behavior.",
                },
                {
                  line: "I ship beyond the prototype.",
                  desc: "I build AI agents and full-stack products for real users, then add the tests, observability, failure handling, and operating discipline that production requires.",
                },
                {
                  line: "I own the system end to end.",
                  desc: "I work comfortably from a polished React interface through APIs, model inference, data design, and the cloud infrastructure that keeps the product running.",
                },
                {
                  line: "I measure before I claim.",
                  desc: "I use baselines, evaluations, and failure analysis to separate useful architecture from impressive-looking complexity—and I document what the evidence does not prove.",
                },
              ].map((item, i) => (
                <StatementRow key={item.line} line={item.line} desc={item.desc} index={i} />
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">

            <motion.div className="sm:col-span-2">
               <TechBlock
                icon={Terminal}
                title="Production Agent Systems"
                description="LangGraph workers with checkpointed pause and resume, idempotent task claims, parallel fan-out, and distributed tracing—designed to survive retries and concurrency."
                delay={0.2}
              />
            </motion.div>

            <TechBlock
              icon={Zap}
              title="LLM Engineering"
              description="RAG at scale, Gemini-based entity resolution, preference tuning (DPO/KTO), evaluation harnesses, and prompt pipelines with measured quality improvements."
              delay={0.3}
            />

            <TechBlock
              icon={Heart}
              title="Full-Stack Delivery"
              description="React and Next.js interfaces, FastAPI and .NET services, Postgres and Firestore data layers, plus CI/CD across GCP and AWS."
              delay={0.4}
            />

            <div className="sm:col-span-2">
               <TechBlock
                icon={Cpu}
                title="Reliability & Testing"
                description="200+ pytest cases for production agents, plus property-based testing, load testing against SLOs, and distributed observability with Logfire."
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
