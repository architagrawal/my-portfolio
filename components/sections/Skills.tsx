"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Wrench, Cloud, Database } from "lucide-react";
import SkillCardScroll from "@/components/skill-card-scroll";

// Define the allowed color values as a union type
type SkillCategoryColor = "blue" | "teal" | "purple" | "orange";

// Define the skill category interface
interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  color: SkillCategoryColor;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "C#", "Go", "C", "SQL", "TypeScript", "JavaScript"],
    color: "blue",
  },
  {
    title: "Libraries & Frameworks",
    icon: Wrench,
    skills: [
      "Node.js",
      "React.js",
      "Express.js",
      ".NET",
      "LangChain",
      "Llama Index",
      "Gradio",
      "Flask",
      "Django",
      "Ruby on Rails",
    ],
    color: "teal",
  },
  {
    title: "Tools & Platforms",
    icon: Cloud,
    skills: [
      "AWS (EC2, SQS, S3, Lambda)",
      "Docker",
      "Kubernetes",
      "Redis",
      "RabbitMQ",
      "Nginx",
      "Postman",
      "Git",
      "Linux",
    ],
    color: "purple",
  },
  {
    title: "Data & Analytics",
    icon: Database,
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "TensorFlow",
      "scikit-learn",
      "Hugging Face",
      "Prompt Engineering",
    ],
    color: "orange",
  },
];

const colorVariants: Record<SkillCategoryColor, string> = {
  blue: "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
  teal: "border-teal-200 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-700",
  purple:
    "border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700",
  orange:
    "border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700",
};

const iconColorVariants: Record<SkillCategoryColor, string> = {
  blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
  teal: "text-teal-600 bg-teal-100 dark:bg-teal-900/20",
  purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/20",
  orange: "text-orange-600 bg-orange-100 dark:bg-orange-900/20",
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCardScroll
              key={index}
              index={index}
              totalCards={skillCategories.length}
            >
              <Card
                className={`h-full border-2 transition-all duration-300 hover:shadow-lg bg-background/50 backdrop-blur-sm ${
                  colorVariants[category.color]
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <div
                      className={`p-2 rounded-lg ${
                        iconColorVariants[category.color]
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="animated-skill"
                      >
                        <div className="animated-skill-inner">
                          <span className="animated-skill-text">{skill}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SkillCardScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
