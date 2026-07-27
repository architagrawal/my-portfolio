"use client";

import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">
          <div className="space-y-4 max-w-sm">
            <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-foreground">
              Archit Agrawal
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed and built by me — Next.js, Tailwind CSS, and Framer
              Motion, with type set in Syne and Space Grotesk. The starfield is
              a hand-rolled canvas.
            </p>
            <a
              href="https://github.com/architagrawal/my-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              View source
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
            <span className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Sections
            </span>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#experience" className="text-foreground/80 hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="text-foreground/80 hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="text-foreground/80 hover:text-primary transition-colors">Skills</a>
          </nav>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Elsewhere
            </span>
            <a
              href="https://github.com/architagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/agrawal-archit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="mailto:architagrawal000@gmail.com"
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            © {currentYear} Archit Agrawal
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors order-1 md:order-2"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
