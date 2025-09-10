"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar, TrendingUp } from "lucide-react";

const experiences = [
  {
    company: "Edplus, Arizona State University",
    role: "Student Software Developer",
    location: "Tempe, AZ",
    period: "Sept 2023 – May 2025",
    achievements: [
      "Leading development of a retrieval-augmented generation (RAG) chatbot system, facilitating 1,000+ faculty to design courses for 60,000+ students.",
      "Automated Google Drive folder and document creation based on Google Sheets data, streamlining workflows.",
      "Designed REST APIs and webpages for quiz platforms and question banks in ASU Online courses.",
      "Architected and deployed a Neo4j-powered knowledge graph system integrated with LLMs, enabling complex relationship queries reducing manual processing time from 4 hours to 15 minutes per transcript.",
      "Created responsive front-end interfaces with React.js and Material UI, improving user engagement by 35% and decreasing bounce rates by 20%.",
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
    color: "teal",
  },
  {
    company: "Knowledge Exchange for Resilience,Arizona State University",
    role: "Data Reserch Intern",
    location: "Tempe, AZ",
    period: "June 2024 – August 2024",
    achievements: [
      "Built a Python-based vector similarity search system using FAISS and Neo4j, reducing query response time by 60% while maintaining 95% accuracy.",
      "Created a Python microservice for generating and storing vector embeddings of faculty profiles, enabling similarity-based recommendations with 85% accuracy.",
      "Formulated high-performance ETL pipeline processing 10,000+ faculty profiles daily, improving data accuracy by 95%.",
      "Developed unit and stress tests for API endpoints ensuring system performance under high user traffic.",
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
      "Refactored monolithic backend services into MVC microservices following SOLID principles to optimize and scale the infrastructure using Kubernetes,resulting in a 35% reduction in resource usage and a 20% cost reduction.",
      "Executed CI/CD pipelines reducing deployment time by 70% and decreasing production incidents by 40%.",
      "Developed ML prediction system to optimize space reservation systems for booking desks and meeting rooms for 300+ locations, enhancing occupancy rates by 30% for Fortune500 company.",
      "Formulated a custom node package for retrieving 10 latest messages from Slack channels, including attached media, documents, and reactions into an internal social networking web app maintaining version control. ",
      "Built responsive single-page applications using React.js and Redux, implementing client-side state management and RESTful API integration that improved user experience scores by 40%",
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
    color: "blue",
  },
  {
    company: "EAT.FIT",
    role: "Product Intern",
    location: "Bengaluru, India",
    period: "Sept 2021 – Dec 2021",
    achievements: [
      "Managed cross-functional order tracking system optimizing driver location tracking, reducing costs by 45% and enhancing user growth by 25% quarter on quarter.",
      "Automated system to scrap product details and reviews using script for better business data analytics, positioning of products, and improving customer service Managed software development life cycle sprints on Kanban. ",
      "Developed a full stack notification system using WebSockets and Express.js, enabling real-time updates that increased customer satisfaction by 28% and reduced support calls by 35%.",
    ],
    technologies: ["React.js", "Google Maps API", "Python"],
    color: "teal",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions and driving measurable impact
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full border-4 border-background hidden md:block" />

                <Card
                  className={`md:ml-16 hover:shadow-lg transition-all duration-300 border-l-4 bg-background/50 backdrop-blur-sm ${
                    exp.color === "blue"
                      ? "border-l-blue-500 hover:border-l-blue-600"
                      : "border-l-teal-500 hover:border-l-teal-600"
                  }`}
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2 flex items-center gap-2 text-foreground">
                          <Building className="w-5 h-5" />
                          {exp.company}
                        </CardTitle>
                        <p className="text-lg font-semibold text-muted-foreground mb-2">
                          {exp.role}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-foreground">
                        <TrendingUp className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted/80 transition-colors backdrop-blur-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
