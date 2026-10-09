"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RESUME_URL } from "@/lib/resume";
import { CommandMenu } from "./command-menu";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
];

/* The same top bar on every page. A soft pill sits under the current section and glides to whatever you hover. */
export function SiteNav({ wide = false, hero = false }: { wide?: boolean; hero?: boolean }) {
  const path = usePathname();
  const [hover, setHover] = useState<string | null>(null);
  const current = LINKS.find(({ href }) => path === href || path.startsWith(href + "/"))?.href ?? null;
  const pill = hover ?? current;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className="site-nav" data-scrolled={scrolled}>
    <div className={`mx-auto flex h-16 w-full items-center justify-between px-6 ${hero ? "max-w-6xl md:px-12" : wide ? "max-w-4xl md:px-12" : "max-w-3xl"}`}>
      <Link href="/" className="shrink-0 whitespace-nowrap font-display text-base font-extrabold tracking-tight transition-colors hover:text-primary sm:text-lg">
        <span className="sm:hidden">Archit</span>
        <span className="hidden sm:inline">Archit Agrawal</span>
      </Link>
      <div className="flex items-center gap-1 text-[15px] font-semibold text-foreground/90 sm:gap-1" onMouseLeave={() => setHover(null)}>
        {LINKS.map(({ label, href }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHover(href)}
              className={`relative isolate rounded-full px-2.5 py-1.5 sm:px-3 transition-colors hover:text-foreground ${active ? "text-foreground" : ""}`}
            >
              {pill === href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {label}
            </Link>
          );
        })}
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hidden rounded-full px-3 py-1.5 transition-colors hover:text-foreground sm:inline">
          Resume
        </a>
        <button
          onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
          aria-label="Open command menu"
          className="ml-2 hidden rounded-full px-3 py-1.5 text-[13px] font-semibold text-foreground/90 transition-colors hover:bg-foreground/10 hover:text-foreground md:inline"
        >
          ⌘K
        </button>
      </div>
    </div>
      <CommandMenu />
    </nav>
  );
}
