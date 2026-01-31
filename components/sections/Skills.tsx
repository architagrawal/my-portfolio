"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillNetwork from "@/components/ui/skill-network";
import { Magnetic } from "@/components/ui/magnetic";

// Define the skill category interface
interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C#", "Go", "C", "SQL", "HTML/CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "FastAPI",
      ".NET Core",
      "Tailwind CSS"
    ],
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    skills: [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "LlamaIndex",
      "Hugging Face",
      "OpenAI API",
      "scikit-learn",
      "Pandas",
      "NumPy"
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "CI/CD",
      "Linux",
      "Nginx",
      "Redis",
      "RabbitMQ"
    ],
  },
];

// Flatten skills for the network
const allSkills = skillCategories.flatMap(cat => 
  cat.skills.map(name => ({ name, category: cat.id }))
);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 p-20 opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute bottom-0 left-0 p-20 opacity-20 pointer-events-none transform -translate-x-1/2 translate-y-1/2">
        <div className="w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/40 pb-2">
            Technical Proficiency
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Explore my technical solar system. <span className="text-foreground font-medium">Hover</span> to interact, <span className="text-foreground font-medium">Filter</span> to focus.
          </p>
        </motion.div>

        {/* Controls - Floating HUD */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
           <Tabs 
            defaultValue="all" 
            className="flex flex-col items-center"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-background/20 backdrop-blur-xl border border-white/5 p-2 h-auto gap-2 rounded-full flex flex-wrap justify-center shadow-2xl mx-auto">
              <Magnetic>
                <TabsTrigger 
                    value="all" 
                    className="rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 font-medium"
                >
                    All System
                </TabsTrigger>
              </Magnetic>
              <Magnetic>
                <TabsTrigger value="languages" className="rounded-full px-5 py-2.5 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300">Languages</TabsTrigger>
              </Magnetic>
              <Magnetic>
                <TabsTrigger value="frameworks" className="rounded-full px-5 py-2.5 data-[state=active]:bg-teal-500 data-[state=active]:text-white transition-all duration-300">Frameworks</TabsTrigger>
              </Magnetic>
              <Magnetic>
                <TabsTrigger value="ai-ml" className="rounded-full px-5 py-2.5 data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all duration-300">AI & ML</TabsTrigger>
              </Magnetic>
              <Magnetic>
                <TabsTrigger value="cloud-devops" className="rounded-full px-5 py-2.5 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300">Cloud</TabsTrigger>
              </Magnetic>
            </TabsList>
          </Tabs>
        </div>

        {/* Canvas Network */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
        >
          <SkillNetwork 
             skills={allSkills} 
             activeCategory={activeTab} 
          />
        </motion.div>
        
        {/* Screen Reader Only Content for Accessibility */}
        <div className="sr-only">
          <h3>Skills List</h3>
          <ul>
            {skillCategories.map(cat => (
                <li key={cat.id}>
                    <h4>{cat.title}</h4>
                    <ul>
                        {cat.skills.map(skill => (
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
