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
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions across AI/ML, web development, and
            robotics
          </p>
        </motion.div>

        <ProjectsCarousel totalCards={projects.length}>
          {projects.map((project, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm relative h-full group"
            >
              <HexagonBackground
                className="absolute inset-0 flex items-center justify-center -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-transparent"
                hexagonProps={{
                  className:
                    "hover:before:bg-sky-200 dark:hover:before:bg-sky-900 hover:after:bg-sky-100 dark:hover:after:bg-sky-950",
                }}
              />
              <div className="relative z-10">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFBE1Fx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADERIh/9oADAMBAAIRAxEAPwDK9B1a3p1Wes1CrHYhmPJZEJABHogEewe2FW6rkltWpbEsMSSyuXdlQAFieScYxlWO1Jv7n//Z"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </Badge>
                  </div>
                  {project.award && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                        <Award className="w-3 h-3 mr-1" />
                        {project.award}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 experience-bullet-item group"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50" />
                          <span className="text-xs text-muted-foreground leading-relaxed transition-all duration-300 group-hover:text-white group-hover:drop-shadow-md">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                          className="animated-skill animated-skill-small"
                        >
                          <div className="animated-skill-inner">
                            <span className="animated-skill-text">{tech}</span>
                          </div>
                        </motion.div>
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
