"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeSection: string;
}

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  // { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes the takeover menu; body scroll locks while it is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-sm font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Archit Agrawal
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors relative font-heading tracking-wide",
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-primary"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-11 h-11 p-0 relative"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Desktop Resume Link */}
            <a
              href="/Archit_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors"
            >
              Resume
            </a>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-11 h-11 p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile fullscreen takeover menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[60] md:hidden bg-background/[0.97] backdrop-blur-xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <div className="flex items-center justify-between h-16 px-4">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  Archit Agrawal
                </span>
                <button
                  autoFocus
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 flex items-center justify-center border border-border text-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                className="flex-1 flex flex-col justify-center px-6 gap-1"
                aria-label="Mobile"
              >
                {navigation.map((item, i) => (
                  <div key={item.name} className="overflow-hidden py-1">
                    <motion.button
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{
                        y: "110%",
                        transition: { duration: reduce ? 0 : 0.2, delay: 0 },
                      }}
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : 0.06 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "flex items-baseline gap-4 font-display text-[7.5vw] font-extrabold uppercase tracking-tight leading-none transition-colors",
                        activeSection === item.href.substring(1)
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      <span className="font-tech text-xs text-primary font-normal">
                        0{i + 1}
                      </span>
                      {item.name}
                    </motion.button>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15, delay: 0 } }}
                transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.4 }}
                className="px-6 pb-10 flex flex-wrap items-center gap-x-7 gap-y-4"
              >
                <a
                  href="/Archit_Agrawal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-0.5"
                >
                  Resume <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/architagrawal"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/agrawal-archit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:architagrawal000@gmail.com"
                  aria-label="Email"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
