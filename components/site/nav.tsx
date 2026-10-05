"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  return (
    <nav className={`mx-auto flex w-full items-center justify-between px-6 pt-8 ${hero ? "max-w-6xl md:px-12" : wide ? "max-w-4xl md:px-12" : "max-w-3xl"}`}>
      <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
        Archit Agrawal
      </Link>
      <div className="flex items-center gap-1 text-[15px] font-semibold text-foreground/70 sm:gap-2" onMouseLeave={() => setHover(null)}>
        {LINKS.map(({ label, href }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHover(href)}
              className={`relative isolate rounded-full px-3 py-1.5 transition-colors hover:text-primary ${active ? "font-bold text-primary" : ""}`}
            >
              {pill === href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-card/80 shadow-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {label}
            </Link>
          );
        })}
        <a href="/Archit_Agrawal_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden px-3 py-1.5 transition-colors hover:text-primary sm:inline">
          Resume
        </a>
        <button
          onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
          aria-label="Open command menu"
          className="ml-2 hidden rounded-lg bg-card/70 px-2 py-1 text-xs font-bold text-muted-foreground shadow-soft transition-colors hover:text-primary md:inline"
        >
          ⌘K
        </button>
      </div>
      <CommandMenu />
    </nav>
  );
}
