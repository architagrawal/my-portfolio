"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Code, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                className="w-10 h-10 bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-blue-600" />
              </a>
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                href="https://leetcode.com/architagrawal000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Code className="w-5 h-5 text-muted-foreground group-hover:text-orange-600" />
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
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-400/10 to-cyan-600/10 border border-cyan-400/20 text-cyan-600 dark:text-cyan-400 font-medium">
              React
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-medium">
              Next.js
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600/10 to-blue-400/10 border border-blue-600/20 text-blue-700 dark:text-blue-300 font-medium">
              TypeScript
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-medium">
              Tailwind
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 font-medium">
              Radix UI
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-medium">
              Framer Motion
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
              Lenis
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
