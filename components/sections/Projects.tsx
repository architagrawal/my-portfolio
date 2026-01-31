"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";
import ProjectsCarousel from "@/components/projects-carousel";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import Image from "next/image";

const projects = [
  {
    title: "Image Recognition as a Service",
    description:
      "Elastic cloud infrastructure SaaS for image recognition using deep learning models.",
    image:
      "https://nordicapis.com/wp-content/uploads/7-Best-Image-Recognition-APIs-e1587080882739.jpg",
    date: "Jan 2024 – Feb 2024",
    achievements: [
      "Developed an elastic cloud infrastructure SaaS using AWS EC2, AWS SQS, and Lambda.",
      "Enabled automatic linear scaling based on demand, serving 100 concurrent requests in 5 seconds.",
    ],
    technologies: ["AWS EC2", "AWS SQS", "AWS Lambda", "Python"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Soccer Game Result Prediction",
    description:
      "Enhanced soccer game result prediction accuracy using advanced ML techniques.",
    image:
      "https://localsportsjournal.com/wp-content/uploads/2022/05/soccer-logo-general-scaled.jpg",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Increased prediction accuracy by 12% using LSTM, RNN, and Random Forest with XGBoost.",
      "Incorporated sentiment analysis and game bet data for improved predictions.",
    ],
    technologies: ["Python", "Deep Learning", "Data Science", "Statistics"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "FitLife Health Tracking App",
    description:
      "Android app for tracking heart/breath rates and personalized workout routines.",
    image:
      "https://thumbs.dreamstime.com/b/illustration-depicting-various-health-fitness-technology-interactions-features-illustration-depicting-various-health-395487611.jpg",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Programmed an Android app measuring heart and breath rates.",
      "Suggested personalized workout routines using machine learning and Fuzzy Logic Control.",
    ],
    technologies: ["Android Studio", "Matlab", "Machine Learning"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Reverse-Mode Automatic Differentiation",
    description:
      "Implemented reverse-mode auto-differentiation for training neural networks.",
    image: "https://i.ytimg.com/vi/1dqoFhl3zQQ/sddefault.jpg",
    date: "Feb 2024 – Mar 2024",
    achievements: [
      "Developed operators like Add and Matrix Multiplication for gradient node construction.",
      "Added CUDA GPU kernels for training simple neural networks like MLP models.",
    ],
    technologies: ["Python", "CUDA", "Neural Networks"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "E-Commerce Platform",
    description: "",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    date: "Sept 2024 – Dec 2024",
    achievements: [
      "Built a full-featured online shopping platform with user authentication, product catalog, and payment processing",
      "Implemented responsive front-end using React.js and back-end using Django REST framework",
      "Integrated PostgreSQL database with Redis caching for optimized performance.",
    ],
    technologies: [
      "React",
      "Django",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Stripe",
      "GCP",
      "GitHub Actions",
      "Jest",
    ],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Task Management System",
    description: "",
    image:
      "https://terotam.com/wp-content/uploads/2022/07/Task-Management-software.png",
    date: "Feb 2024 – May 2024",
    achievements: [
      "Created a collaborative project management tool with task assignment, progress tracking, and deadline notifications",
      "Built RESTful API with Flask and SQL Alchemy ORM for database interactions",
      "Designed intuitive UI with React.js and implemented JWT authentication",
    ],
    technologies: ["React", "Flask", "SQL Alchemy", "JWT", "Docker", "AWS"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Real-Time Chat Application",
    description: "",
    image:
      "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
    date: "July 2024 – October 2024",
    achievements: [
      "Developed a scalable chat platform with private messaging and group chat functionality",
      "Utilized Django Channels for WebSocket connections and Redis for message queuing",
      "Implemented geolocation features and interactive data visualizations with Plotly to visualize the location of users.",
    ],
    technologies: [
      "Django",
      "Django Channels",
      "Redis",
      "React",
      "Plotly",
      "Docker",
      "AWS",
    ],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground font-heading uppercase tracking-tighter">
            System Modules
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-tech">
            // deployed_projects_and_experiments
          </p>
        </motion.div>

        <ProjectsCarousel totalCards={projects.length}>
          {projects.map((project, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] overflow-hidden transition-all duration-300 border border-border bg-card relative h-full group rounded-none hover:border-primary/50"
            >
              {/* Technical Header Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Image Container - Technical Aspect */}
                <div className="aspect-video bg-muted overflow-hidden relative border-b border-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 400px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFBE1Fx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADERIh/9oADAMBAAIRAxEAPwDK9B1a3p1Wes1CrHYhmPJZEJABHogEewe2FW6rkltWpbEsMSSyuXdlQAFieScYxlWO1Jv7n//Z"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-background/90 border border-border px-2 py-1 font-tech text-xs tracking-wider uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-foreground font-heading uppercase tracking-wide">
                      {project.title}
                    </CardTitle>
                    <TrendingUp className="w-5 h-5 text-primary opacity-70" />
                  </div>
                  <div className="h-px w-full bg-border mb-2" />
                  <p className="text-muted-foreground leading-relaxed text-sm font-sans">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-xs text-muted-foreground font-tech uppercase tracking-wider">
                      // Key Metrics
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 group/item"
                        >
                          <span className="text-primary mt-1 text-[10px]">▶</span>
                          <span className="text-xs text-foreground font-mono leading-relaxed group-hover/item:text-primary transition-colors">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-xs text-muted-foreground font-tech uppercase tracking-wider">// Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="px-2 py-1 bg-muted border border-border text-[10px] font-tech text-foreground uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-3 h-3 mr-2" />
                          View Source
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </ProjectsCarousel>
      </div>
    </section>
  );
}
