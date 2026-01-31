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
    <span className="inline-flex items-center text-primary">
       {text}
       <span className="ml-1 w-0.5 h-6 bg-primary animate-blink" />
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
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
            className="mx-auto w-32 h-32 rounded-none relative"
          >
            {/* Animated glow ring - Removed for Editorial look */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 animate-profile-glow" /> */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 animate-profile-spin opacity-60" /> */}
            {/* Inner container */}
            <div className="absolute inset-0 rounded-none bg-border p-[1px]">
              <div className="w-full h-full rounded-none overflow-hidden bg-background relative grayscale hover:grayscale-0 transition-all duration-500">
                <div className="absolute inset-0 border border-primary/20 z-10"></div>
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

            {/* Animated Name - Editorial Engineering Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground font-heading uppercase">
              Archit Agrawal
            </h1>
          </motion.div>

          {/* Professional Info Container - Technical Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-3xl mt-8 mb-8"
          >
            <div className="bg-background/80 backdrop-blur-md border border-border p-6 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
              
              <h2 className="text-xl sm:text-2xl font-medium text-primary mb-4 h-8 flex items-center justify-center font-tech tracking-wide uppercase">
                 <TypewriterRoles />
              </h2>
              <div className="font-tech text-muted-foreground text-sm sm:text-base border-t border-border pt-4 mt-4">
                <TypewriterTagline />
              </div>
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
              className="group bg-background/50 hover:bg-primary/10 border-primary/20 hover:border-primary/50 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] backdrop-blur-sm"
            >
              <a
                href="https://www.linkedin.com/in/agrawal-archit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="flex items-center space-x-2 font-tech"
              >
                <Sparkle />
                <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group bg-background/50 hover:bg-primary/10 border-primary/20 hover:border-primary/50 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] backdrop-blur-sm"
            >
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="flex items-center space-x-2 font-tech"
              >
                <Sparkle />
                <Github className="w-5 h-5 transition-colors group-hover:text-primary" />
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group bg-background/50 hover:bg-primary/10 border-primary/20 hover:border-primary/50 sparkle-button transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] backdrop-blur-sm"
            >
              <a
                href="https://leetcode.com/architagrawal000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LeetCode profile"
                className="flex items-center space-x-2 font-tech"
              >
                <Sparkle />
                <Code className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span>LeetCode</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </a>
            </Button>
          </motion.div>

          {/* CTA Buttons - flex container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Resume Button - Solid Primary */}
            <div className="inline-block group relative">
              <Button
                asChild
                className="relative rounded-none px-8 py-6 text-lg font-medium font-tech tracking-wider
                bg-primary text-primary-foreground transition-all duration-300 
                hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]
                uppercase border border-primary"
              >
                <a href="/Archit_Agrawal_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <span>Download Resume</span>
                  <ExternalLink className="ml-3 w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Initialize Button - Outline */}
            <div className="inline-block group relative">
              <Button
                variant="outline"
                onClick={scrollToAbout}
                className="relative rounded-none px-12 py-6 text-lg font-medium font-tech tracking-wider
                bg-transparent border-primary/50 text-foreground transition-all duration-300 
                hover:bg-primary/10 hover:border-primary
                uppercase"
              >
                <span>Initialize</span>
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
