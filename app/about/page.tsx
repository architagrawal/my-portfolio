import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { Keycaps } from "@/components/site/keycaps";
import { GithubActivity } from "@/components/ui/github-activity";
import { ThemeText } from "@/components/site/theme-text";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills and GitHub activity of Archit Agrawal, AI software engineer.",
  alternates: { canonical: "/about" },
};

const FACTS = [
  ["Now", "AI Software Engineer, ASU EdPlus"],
  ["Education", "MS Computer Science, ASU, 4.0 GPA"],
  ["Focus", "Agents, RAG, evaluation, full-stack"],
  ["Based in", "Phoenix, Arizona, open to relocation"],
];

export default function AboutPage() {
  return (
    <Shell>
      <PageHeader eyebrow="About" title={<ThemeText v={{ midnight: "Hi, I'm Archit", graphite: <span className="normal-case">whoami</span>, ember: "Hi, I'm Archit", forest: "A little about me", steel: "About Archit" }} />} />

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_12rem]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            I finished my MS in Computer Science at Arizona State with a 4.0 and stayed on at EdPlus, where I own an
            analytics platform end to end. You upload a survey export, ask a question in plain English, and it answers
            with a chart whose numbers trace back to the data.
          </p>
          <p>
            Before that I was the founding AI/ML engineer at MyStage, where I rebuilt a 14-function pipeline as one
            LangGraph worker and ran scraping that indexed 70,000+ records a day. Earlier I led a RAG platform used for
            course development for 60,000+ students, shipped software at Zeus Learning, and did computer-vision
            research on radar and lidar.
          </p>
          <p>Outside work I build AiJockey, an AI DJ, and tune its transitions until they sound human.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/archit-profile.webp"
            alt="Archit Agrawal"
            width={384}
            height={480}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lift"
            style={{ objectPosition: "40% center" }}
            priority
          />
          <dl className="mt-6 space-y-4 text-sm">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-bold uppercase tracking-[0.08em] text-primary">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <SectionTitle>Stack</SectionTitle>
      <p className="-mt-3 mb-6 text-[15px] text-muted-foreground">Go ahead, press a key.</p>
      <div className="tcard rounded-2xl bg-card p-7 shadow-soft">
        <Keycaps />
      </div>

      <SectionTitle>GitHub activity</SectionTitle>
      <GithubActivity />
    </Shell>
  );
}
