"use client";

import { useState, useEffect } from "react";
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



// Typewriter loop hook
function useTypewriterLoop(phrases: string[], typeSpeed: number = 80, deleteSpeed: number = 50, pauseDuration: number = 2000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (text === currentPhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return text;
}

// Typewriter roles component
function TypewriterRoles() {
  const roles = [
    "Software Engineer",
    "ML Engineer",
    "AI Engineer",
    "LLM Engineer",
    "Data Engineer"
  ];
  
  const text = useTypewriterLoop(roles);

  return (
    <span className="inline-flex items-center text-blue-600 dark:text-blue-400">
       {text}
       <span className="ml-1 w-0.5 h-6 bg-blue-600 dark:bg-blue-400 animate-blink" />
    </span>
  );
}

// Typewriter tagline component
// Static tagline component
function TypewriterTagline() {
  return (
    <p className="text-lg text-muted-foreground leading-relaxed">
      Building intelligent solutions and automating the future, one line of code at a time
    </p>
  );
}

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
          {/* Profile Image with Animated Glow Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-32 h-32 rounded-full relative"
          >
            {/* Animated glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 animate-profile-glow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 animate-profile-spin opacity-60" />
            {/* Inner container */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
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
            className="mx-auto max-w-2xl mt-2.5 mb-2.5"
          >
            <div className="backdrop-blur-sm rounded-lg bg-gray-500/10 p-5 border-2 border-gray-500/50 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 h-10 flex items-center justify-center">
                 <TypewriterRoles />
              </h2>
              <TypewriterTagline />
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
              className="group hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <a
                href="https://www.linkedin.com/in/agrawal-archit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Linkedin className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-800 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20"
            >
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Github className="w-5 h-5 transition-colors" />
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-900/20 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <a
                href="https://leetcode.com/architagrawal000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LeetCode profile"
                className="flex items-center space-x-2"
              >
                <Sparkle />
                <Code className="w-5 h-5 group-hover:text-orange-600 transition-colors" />
                <span>LeetCode</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          </motion.div>

          {/* CTA Button with Animated Gradient Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="inline-block group relative">
              {/* Animated gradient glow background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition-all duration-500 group-hover:duration-200 animate-gradient-glow" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-500 group-hover:duration-200" />
              
              <Button
                variant="ghost"
                onClick={scrollToAbout}
                className="relative rounded-2xl px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                text-black dark:text-white transition-all duration-300 
                group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                group-hover:border-blue-500/50 dark:group-hover:border-cyan-500/50
                hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-cyan-500/25"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Explore My Work
                </span>
                <ArrowDown className="ml-3 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-1 group-hover:text-blue-500 transition-all duration-300" />
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
