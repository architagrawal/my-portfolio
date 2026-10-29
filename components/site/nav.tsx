"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { resumeFor } from "@/lib/resume";
import { CommandMenu } from "./command-menu";
import { domains } from "@/lib/data/domains";

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
              className={`relative isolate rounded-full px-2 py-1.5 sm:px-3 transition-colors hover:text-foreground ${active ? "text-foreground" : ""} ${href === "/lab" ? "hidden sm:block" : ""}`}
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
        <Expertise path={path} />
        <a href={resumeFor(path)} target="_blank" rel="noopener noreferrer" className="hidden rounded-full px-3 py-1.5 transition-colors hover:text-foreground sm:inline">
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

/* "Expertise": the /for domain pages as a menu. Opens on hover or click, closes on Escape,
   an outside click, or picking a page. */
function Expertise({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = path.startsWith("/for/");
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-colors hover:text-foreground sm:px-3 ${active || open ? "bg-foreground/10 text-foreground" : ""}`}
      >
        Expertise
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14" fill="none" className={`hidden transition-transform sm:block ${open ? "rotate-180" : ""}`}>
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full pt-2">
          <ul className="w-56 rounded-2xl bg-background/95 p-2 shadow-lg backdrop-blur-md">
            {domains.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/for/${d.slug}`}
                  aria-current={path === `/for/${d.slug}` ? "page" : undefined}
                  className="block rounded-xl px-3 py-2 transition-colors hover:bg-foreground/10 hover:text-foreground aria-[current=page]:text-primary"
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
