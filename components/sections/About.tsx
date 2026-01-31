"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, Zap, Code, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

// Technical Corner Marker Component
const CornerMarkers = () => (
  <>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
  </>
);

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
      className="group relative h-full bg-background/50 backdrop-blur-md border border-border/50 p-6 transition-all duration-300 hover:bg-background/80"
    >
      <CornerMarkers />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 border border-primary/20">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-heading uppercase tracking-wider text-lg font-bold text-foreground">
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
            <div className="space-y-2">
              <span className="font-tech text-primary text-sm uppercase tracking-[0.2em]">
                01 // Identity
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading uppercase tracking-tighter text-foreground">
                About Me
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg font-light leading-relaxed border-l-2 border-primary/30 pl-4">
                Driven by <span className="text-foreground font-medium">curiosity</span>, powered by <span className="text-foreground font-medium">code</span>.
              </p>
              
              <p className="leading-relaxed">
                I&apos;m a software engineer recently graduated with MSCS from
                Arizona State University. With a strong foundation in full-stack
                development, applied machine learning and Generative AI, I
                thrive on building real-world applications that make a difference.
              </p>
              
              <p className="leading-relaxed">
                From voice bots to AI agents, I enjoy creating intelligent
                solutions that solve complex problems. My passion for automation
                drives me to build systems that not only work efficiently but
                also continuously improve themselves.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center space-x-3 px-4 py-2 border border-border bg-muted/20">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-tech text-sm">MSCS @ Arizona State University</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Technical Specs */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 pt-8 lg:pt-0">
            
            <motion.div className="sm:col-span-2">
               <TechBlock
                icon={Terminal}
                title="Engineering Philosophy"
                description="I believe in clean, scalable architecture. Code is not just about functionality; it's about craft, maintainability, and the elegance of the solution."
                delay={0.2}
              />
            </motion.div>

            <TechBlock
              icon={Zap}
              title="Innovation Focus"
              description="Building cutting-edge AI agents and automation tools that streamline complex workflows and enhance user experiences."
              delay={0.3}
            />

            <TechBlock
              icon={Heart}
              title="Passion Projects"
              description="From geospatial analysis tools to voice AI systems, I love tackling diverse challenges that push the boundaries of technology."
              delay={0.4}
            />

            <div className="sm:col-span-2">
               <TechBlock
                icon={Cpu}
                title="Continuous Learning"
                description="Always exploring new technologies and methodologies to stay at the forefront of AI/ML and software development. Currently diving deep into Agentic Workflows."
                delay={0.5}
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
