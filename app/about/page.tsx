import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { Keycaps } from "@/components/site/keycaps";
import { GithubActivity } from "@/components/ui/github-activity";

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
    <Shell header={<PageHeader eyebrow="About" title="Hi, I'm Archit" />}>
      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_12rem]">
        <Reveal className="t-lead max-w-[38rem] space-y-6">
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
                <dt className="t-eyebrow">{k}</dt>
                <dd className="mt-1 text-[15px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <SectionTitle>Stack</SectionTitle>
      <p className="t-meta -mt-5 mb-8">Go ahead, press a key.</p>
      <Keycaps />

      <SectionTitle>GitHub activity</SectionTitle>
      <GithubActivity />
    </Shell>
  );
}
