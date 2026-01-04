"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Zap } from "lucide-react";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Grid Effect Background for entire section */}
      {/* <div className="card-with-grid absolute inset-0 opacity-20">
        <div className="card__img h-full">
          <div className="card__grid-effect">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="card__grid-effect-tile"></div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Driven by curiosity, powered by code, aiming to create impactful
            products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                One word which drives me - &quot;Curiosity&quot;
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a software engineer recently graduated with MSCS from
                Arizona State University. With a strong foundation in full-stack
                development, applied machine learning and Generative AI, I
                thrive on building real-world applications that make a
                difference.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From voice bots to AI agents, I enjoy creating intelligent
                solutions that solve complex problems. My passion for automation
                drives me to build systems that not only work efficiently but
                also continuously improve themselves.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span>Arizona State University — M.S. Computer Science</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="card-animated border-2 border-blue-100 dark:border-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-background/50 backdrop-blur-sm relative overflow-hidden h-full group">
              <HexagonBackground
                className="absolute inset-0 flex items-center justify-center -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-transparent"
                hexagonProps={{
                  className:
                    "hover:before:bg-blue-200 dark:hover:before:bg-blue-900 hover:after:bg-blue-100 dark:hover:after:bg-blue-950",
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Innovation Focus
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Building cutting-edge AI agents and automation tools that
                  streamline complex workflows and enhance user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="card-animated border-2 border-teal-100 dark:border-teal-900/20 hover:border-teal-300 dark:hover:border-teal-700 transition-colors bg-background/50 backdrop-blur-sm relative overflow-hidden h-full group">
              <HexagonBackground
                className="absolute inset-0 flex items-center justify-center -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-transparent"
                hexagonProps={{
                  className:
                    "hover:before:bg-teal-200 dark:hover:before:bg-teal-900 hover:after:bg-teal-100 dark:hover:after:bg-teal-950",
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                    <Heart className="w-5 h-5 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Passion Projects
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  From geospatial analysis tools to voice AI systems, I love
                  tackling diverse challenges that push the boundaries of
                  technology.
                </p>
              </CardContent>
            </Card>

            <Card className="card-animated border-2 border-purple-100 dark:border-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-colors bg-background/50 backdrop-blur-sm relative overflow-hidden h-full group">
              <HexagonBackground
                className="absolute inset-0 flex items-center justify-center -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-transparent"
                hexagonProps={{
                  className:
                    "hover:before:bg-purple-200 dark:hover:before:bg-purple-900 hover:after:bg-purple-100 dark:hover:after:bg-purple-950",
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Continuous Learning
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Always exploring new technologies and methodologies to stay at
                  the forefront of AI/ML and software development.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
