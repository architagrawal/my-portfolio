"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ExternalLink,
  Github,
  Linkedin,
  Code,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sparkle from "@/components/ui/Sparkle";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load heavy background animation
const BackgroundPaths = dynamic(
  () => import("@/components/ui/background-paths").then((mod) => ({ default: mod.BackgroundPaths })),
  { ssr: false }
);

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Paths Component - without title to remove background text */}
      <div className="absolute inset-0">
        <BackgroundPaths title="" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 p-1"
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="/archit-profile.png"
                alt="Archit Agrawal"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                style={{ objectPosition: "40% center" }}
                priority
                quality={85}
              />
            </div>
          </motion.div>

          {/* Animated Name - positioned just below icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80">
              ARCHIT AGRAWAL
            </h1>
          </motion.div>

          {/* Professional Info Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-2xl"
            style={{ margin: "10px" }}
          >
            <div
              className="backdrop-blur-sm border rounded-lg"
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.1)",
                padding: "20px",
                border: "2px solid rgba(100, 100, 100, 0.5)",
                lineHeight: "1.6",
              }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                <div className="flip-container">
                  <div id="flip">
                    <div>
                      <div>Software Engineer</div>
                    </div>
                    <div>
                      <div>ML Engineer</div>
                    </div>
                    <div>
                      <div>AI Engineer</div>
                    </div>
                    <div>
                      <div>LLM Engineer</div>
                    </div>
                    <div>
                      <div>Data Engineer</div>
                    </div>
                    <div>
                      <div>Software Engineer</div>
                    </div>
                  </div>
                </div>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Building intelligent solutions and automating the future, one
                line of code at a time
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center flex-wrap gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 sparkle-button"
            >
              <a
                href="https://www.linkedin.com/in/agrawal-archit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Linkedin className="w-5 h-5 group-hover:text-blue-600" />
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-800 sparkle-button"
            >
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Github className="w-5 h-5" />
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-900/20 sparkle-button"
            >
              <a
                href="https://leetcode.com/architagrawal000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Code className="w-5 h-5 group-hover:text-orange-600" />
                <span>LeetCode</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </motion.div>

          {/* CTA Button with Discover Excellence Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div
              className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
              dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
              overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Button
                variant="ghost"
                onClick={scrollToAbout}
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                text-black dark:text-white transition-all duration-300 
                group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Explore My Work
                </span>
                <ArrowDown className="ml-3 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - moved to bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
