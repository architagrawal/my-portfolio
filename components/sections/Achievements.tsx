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
  {
    event: "Orion Space Hackathon",
    year: "2025",
    placement: "3rd place",
    project: "Light Pollution Explorer",
    summary:
      "Turns satellite radiance data into an answer to one question: where is the nearest sky dark enough to see anything from.",
    detail:
      "Night-lights raster tiles are resampled to a viewing-quality scale, then scored against travel time from wherever you are, so the recommendation trades darkness against how far you would have to drive rather than reporting the darkest pixel on the map.",
    stack: ["Python", "Geospatial rasters", "React", "Mapping"],
  },
  {
    event: "SpaceCode Hackathon",
    year: "2025",
    placement: "3rd place",
    project: "AI-Powered Pulsar Detection",
    summary:
      "Classifies pulsar candidates from radio-telescope statistics, on a corpus where the honest baseline is doing nothing.",
    detail:
      "Real candidate sets are roughly 9% signal, so a model that answers no every time scores above 90% and finds not one pulsar. Scoring on recall at a fixed false-alarm budget instead of accuracy is what made the model's improvement visible at all.",
    stack: ["Python", "scikit-learn", "Class imbalance", "Signal features"],
  },
  {
    event: "KrackHack 2.0 · GDG",
    year: "2025",
    placement: "3rd place",
    project: "Dealora Marketplace",
    summary:
      "A peer-to-peer marketplace built inside a hackathon weekend, with listings, search and settlement working end to end.",
    detail:
      "Scope was cut deliberately on the first evening: one category, one currency, no messaging, so what shipped was a complete path from listing to settled transaction rather than four features that each stopped halfway.",
    stack: ["React", "Node.js", "Postgres", "Auth"],
  },
];

interface Certification {
  title: string;
  issuer: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "LangChain: Chat with Your Data",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Building Systems with the ChatGPT API",
    issuer: "DeepLearning.AI",
  },
  {
    title: "Google Cloud Skills Boost",
    issuer: "Google Cloud · public profile",
    link: "https://www.cloudskillsboost.google/public_profiles/d4bd12d2-80fb-43a7-ba30-536890e3e09f",
  },
  {
    title: "Advanced Python: Working with Data",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/cbaafd2959fdd9c1f7582a234173da86cd0bfed1cf7f05d66c4ffa2c9b6773f7",
  },
  {
    title: "DevOps with AWS",
    issuer: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/0a554bf6692410db2e6064d5fe1cdf41ad584cef0705577cd3842005ddbab24c",
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft · LinkedIn",
  },
];

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
