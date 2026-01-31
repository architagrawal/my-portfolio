"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-16 pb-8 overflow-hidden">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground">
              Archit Agrawal
            </h3>
            <p className="text-muted-foreground font-sans max-w-sm">
              Engineering intelligent solutions. Specializing in AI/ML, Full-Stack Architecture, and Automation.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/architagrawal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/agrawal-archit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@architagrawal.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* System Status / Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-tech uppercase tracking-wider text-muted-foreground">
              // Navigation
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <a href="#about" className="text-foreground/80 hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                  About System
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/80 hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                  Modules
                </a>
              </li>
              <li>
                <a href="#skills" className="text-foreground/80 hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                  Capabilities
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-tech uppercase tracking-wider text-muted-foreground">
              // System Info
            </h4>
            <div className="space-y-2 text-sm font-mono text-foreground/80">
              <div className="flex justify-between border-b border-border pb-1">
                <span>Version</span>
                <span>2.4.0 <span className="text-primary">EDT</span></span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span>Status</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span>Region</span>
                <span>Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Footer Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-muted-foreground order-2 md:order-1">
            © {currentYear} Archit Agrawal. All systems operational.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-tech uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors order-1 md:order-2"
          >
            Return to Top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
