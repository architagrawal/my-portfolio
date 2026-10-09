"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { roles } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { RESUME_URL } from "@/lib/resume";

const EMAIL = "architagrawal000@gmail.com";

interface Item {
  group: string;
  label: string;
  hint?: string;
  run: () => void;
}

/* ⌘K / Ctrl+K anywhere: jump to any page, role or project, copy the email, open the resume */
export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      { group: "Pages", label: "Home", run: go("/") },
      { group: "Pages", label: "Experience", run: go("/work") },
      { group: "Pages", label: "Projects", run: go("/projects") },
      { group: "Pages", label: "Lab notebook", run: go("/lab") },
      { group: "Pages", label: "About", run: go("/about") },
      { group: "Pages", label: "Survey Agents case study", run: go("/work/survey-agents") },
      { group: "Pages", label: "EdSpace case study", run: go("/work/edspace") },
      {
        group: "Contact",
        label: "Copy email address",
        hint: EMAIL,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      { group: "Contact", label: "Open resume (PDF)", run: () => window.open(RESUME_URL, "_blank") },
      { group: "Contact", label: "LinkedIn", run: () => window.open("https://www.linkedin.com/in/agrawal-archit", "_blank") },
      { group: "Contact", label: "GitHub", run: () => window.open("https://github.com/architagrawal", "_blank") },
      ...roles.map((r) => ({ group: "Roles", label: `${r.role}, ${r.companyShort}`, hint: r.period, run: go(`/work/${r.slug}`) })),
      ...projects.map((p) => ({ group: "Projects", label: p.title, hint: p.date, run: go(`/projects/${p.slug}`) })),
    ];
  }, [router]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => input.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    item.run();
    if (item.label !== "Copy email address") setOpen(false);
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-card p-2 shadow-lift"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") (e.preventDefault(), setActive((a) => Math.min(a + 1, shown.length - 1)));
                if (e.key === "ArrowUp") (e.preventDefault(), setActive((a) => Math.max(a - 1, 0)));
                if (e.key === "Enter") (e.preventDefault(), choose(shown[active]));
              }}
              placeholder="Jump to a page, role or project..."
              className="w-full rounded-xl bg-foreground/[0.06] px-4 py-3.5 text-[16px] placeholder:text-muted-foreground focus-visible:!outline-offset-0"
            />
            <ul className="mt-1 max-h-[50vh] overflow-y-auto" role="listbox">
              {shown.length === 0 && <li className="t-meta px-3 py-6 text-center">No matches</li>}
              {shown.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={item.group + item.label}>
                    {header && <p className="t-eyebrow px-3 pb-1.5 pt-4">{header}</p>}
                    <button
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(item)}
                      className={`flex w-full items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-[15px] ${
                        i === active ? "bg-foreground/[0.08]" : ""
                      }`}
                    >
                      <span className="font-medium">
                        {item.label === "Copy email address" && copied ? "Copied!" : item.label}
                      </span>
                      {item.hint && <span className="t-meta shrink-0 truncate !text-[13px]">{item.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
