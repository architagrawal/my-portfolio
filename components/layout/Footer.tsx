"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Github, Linkedin, Code, ArrowUp } from "lucide-react";
import { FireworksBackground } from "@/components/animate-ui/components/backgrounds/fireworks";
import { Button } from "@/components/ui/button";

// Tech badge data for cleaner rendering
const techBadges = [
  { name: "React", colors: "from-cyan-400/10 to-cyan-600/10 border-cyan-400/20 text-cyan-600 dark:text-cyan-400 hover:from-cyan-400/20 hover:to-cyan-600/20" },
  { name: "Next.js", colors: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 hover:from-blue-500/20 hover:to-cyan-500/20" },
  { name: "TypeScript", colors: "from-blue-600/10 to-blue-400/10 border-blue-600/20 text-blue-700 dark:text-blue-300 hover:from-blue-600/20 hover:to-blue-400/20" },
  { name: "Tailwind", colors: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20" },
  { name: "Radix UI", colors: "from-slate-500/10 to-slate-600/10 border-slate-500/20 text-slate-600 dark:text-slate-400 hover:from-slate-500/20 hover:to-slate-600/20" },
  { name: "Framer Motion", colors: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20" },
  { name: "Lenis", colors: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:from-emerald-500/20 hover:to-teal-500/20" },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      <FireworksBackground
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
        color="white"
        population={5}
        fireworkSpeed={{ min: 2, max: 4 }}
        fireworkSize={{ min: 2, max: 6 }}
        particleSpeed={{ min: 1, max: 5}}
        particleSize={{ min: 1, max: 4 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Archit Agrawal</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Software Engineer & AI/ML Enthusiast building the future through
              innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/agrawal-archit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="w-10 h-10 bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="w-10 h-10 bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>

              <a
                href="https://leetcode.com/architagrawal000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LeetCode profile"
                className="w-10 h-10 bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <Code className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:text-right"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-muted-foreground hover:text-foreground hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300"
              >
                About
              </a>
              <a
                href="#experience"
                className="block text-muted-foreground hover:text-foreground hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="block text-muted-foreground hover:text-foreground hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="block text-muted-foreground hover:text-foreground hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="block text-muted-foreground hover:text-foreground hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
            using
            {techBadges.map((badge, index) => (
              <span
                key={badge.name}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r ${badge.colors} border font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-default`}
              >
                {badge.name}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              aria-label="Back to top"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
