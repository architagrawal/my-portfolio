"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeSection: string;
}

const navigation = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => goTo("#hero")}
          className="text-sm font-semibold tracking-wide text-foreground"
        >
          Archit Agrawal
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className={cn(
                "border-b py-1 text-sm transition-colors",
                activeSection === item.href.slice(1)
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.name}
            </button>
          ))}
          <a
            href="/Archit_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
          >
            Résumé
          </a>
        </nav>

        <button
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center text-foreground md:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <nav
          className="border-t border-border bg-background px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          {navigation.map((item) => (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className="block min-h-11 w-full text-left text-base text-foreground"
            >
              {item.name}
            </button>
          ))}
          <a
            href="/Archit_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center text-base text-primary"
          >
            Résumé
          </a>
        </nav>
      )}
    </header>
  );
}
