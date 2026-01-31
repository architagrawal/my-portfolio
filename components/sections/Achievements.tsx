"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, ExternalLink } from "lucide-react";

const achievements = [
  {
    title: "Orion Space Hackathon 2025",
    position: "3rd Place",
    description: "Light Pollution Explorer project",
    icon: Trophy,
  },
  {
    title: "SpaceCode Hackathon",
    position: "3rd Place",
    description: "AI-Powered Pulsar Detection",
    icon: Award,
  },
  {
    title: "KrackHack 2.0 (GDG)",
    position: "3rd Place",
    description: "Dealora Marketplace project",
    icon: Award,
  },
  {
    title: "KrackHack 2.0 (GDG)",
    position: "3rd Place",
    description: "Dealora Marketplace project",
    icon: Award,
  },
];

const certifications = [
  {
    title: "Google Cloud Public Profile",
    description: "Comprehensive cloud skills and achievements",
    link: "https://www.cloudskillsboost.google/public_profiles/d4bd12d2-80fb-43a7-ba30-536890e3e09f",
  },
  {
    title: "Advanced Python: Working with Data",
    description: "LinkedIn Learning Certification",
    link: "https://www.linkedin.com/learning/certificates/cbaafd2959fdd9c1f7582a234173da86cd0bfed1cf7f05d66c4ffa2c9b6773f7",
  },
  {
    title: "DevOps with AWS",
    description: "LinkedIn Learning Certification",
    link: "https://www.linkedin.com/learning/certificates/0a554bf6692410db2e6064d5fe1cdf41ad584cef0705577cd3842005ddbab24c?lipi=urn:li:page:d_flagship3_profile_view_base_certifications_details;tq+kjguvQNyolStsUlEIpg==",
  },
  {
    title: "Career Essentials in Generative AI",
    description: "Microsoft and LinkedIn Certification",
    link: "https://www.linkedin.com/learning/certificates/cbaafd2959fdd9c1f7582a234173da86cd0bfed1cf7f05d66c4ffa2c9b6773f7",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for innovation and technical excellence
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Hackathon Achievements */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground"
            >
              <Trophy className="w-6 h-6 text-primary" />
              Hackathon Wins
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 bg-background/50 backdrop-blur-sm rounded-none">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                        <achievement.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">
                        {achievement.title}
                      </CardTitle>
                      <Badge className="mx-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                        {achievement.position}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground"
            >
              <Award className="w-6 h-6 text-secondary" />
              Certifications
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50 bg-background/50 backdrop-blur-sm rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-foreground">
                        <div className="w-10 h-10 bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-secondary" />
                        </div>
                        {cert.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {cert.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full bg-background/50 backdrop-blur-sm hover:bg-secondary/10 hover:text-secondary rounded-none border-border"
                      >
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
