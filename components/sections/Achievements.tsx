"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

interface Hackathon {
  event: string;
  year: string;
  placement: string;
  project: string;
  summary: string;
  detail: string;
  stack: string[];
}

const hackathons: Hackathon[] = [
  // VERIFY BEFORE RENDERING. Event names and placements are the only fields that
  // predate this file's rewrite. Year, project detail and stack were inferred and
  // have been cleared rather than guessed again.
  { event: "Orion Space Hackathon", year: "", placement: "3rd place", project: "Light Pollution Explorer", summary: "", detail: "", stack: [] },
  { event: "SpaceCode Hackathon", year: "", placement: "3rd place", project: "AI-Powered Pulsar Detection", summary: "", detail: "", stack: [] },
  { event: "KrackHack 2.0 · GDG", year: "", placement: "3rd place", project: "Dealora Marketplace", summary: "", detail: "", stack: [] },
];

interface Certification {
  title: string;
  issuer: string;
  link?: string;
}

// VERIFY OWNERSHIP BEFORE RENDERING. The credential URLs that were here came from
// the repo, not from a verified source, and two of them pointed at the same page.
// Links are removed until each one is confirmed to belong to this profile.
const certifications: Certification[] = [];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading eyebrow="05 // Recognition" title="Achievements" />

        <div className="flex flex-wrap gap-x-12 gap-y-4 -mt-6 mb-14">
          {[
            [String(hackathons.length), "podium finishes"],
            ["48h", "typical build window"],
            [String(certifications.length), "certifications"],
          ].map(([value, label]) => (
            <div key={label}>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">
                {value}
              </span>
              <span className="ml-2 font-tech text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-border border border-border">
          {hackathons.map((h, i) => (
            <motion.article
              key={h.project}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group bg-background p-7 flex flex-col gap-4 transition-colors duration-200 hover:bg-card/40"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {h.event} · {h.year}
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-primary whitespace-nowrap">
                  {h.placement}
                </span>
              </div>

              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight leading-[0.95] text-foreground">
                {h.project}
              </h3>

              <p className="text-sm text-foreground/80 leading-relaxed">{h.summary}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.detail}</p>

              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                {h.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-medium border border-primary/10 bg-primary/5 text-muted-foreground transition-colors group-hover:text-primary group-hover:border-primary/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Certifications
          </p>
          <ul className="border-t border-border">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="group grid sm:grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-border py-4 transition-colors hover:bg-card/30"
              >
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-base text-foreground/90">{c.title}</span>
                  <span className="font-tech text-[11px] text-muted-foreground">{c.issuer}</span>
                </span>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors"
                  >
                    Verify
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                    On file
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
