import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { Keycaps } from "@/components/site/keycaps";
import { MetaRow, Section } from "@/components/site/ui";
import { GithubActivity } from "@/components/ui/github-activity";
import { getActivity } from "@/lib/github-activity";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills and GitHub activity of Archit Agrawal, AI software engineer.",
  alternates: { canonical: "/about" },
};

const FACTS: [string, string][] = [
  ["Now", "AI Software Engineer, ASU EdPlus"],
  ["Education", "MS Computer Science, ASU, 4.0 GPA"],
  ["Focus", "Agents, RAG, evaluation, full-stack"],
  ["Based in", "Phoenix, Arizona, open to relocation"],
];

export default async function AboutPage() {
  const activity = await getActivity();
  return (
    <Shell header={<PageHeader eyebrow="About" title="Hi, I'm Archit" />}>
      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-12">
        <Reveal className="t-lead max-w-[36rem] space-y-6">
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
        <Reveal delay={0.1} className="order-first md:order-none">
          <Image
            src="/archit-profile.webp"
            alt="Archit Agrawal"
            width={352}
            height={440}
            className="aspect-[4/5] w-32 rounded-2xl object-cover md:w-full"
            style={{ objectPosition: "40% center" }}
            priority
          />
        </Reveal>
      </div>

      <div className="mt-14">
        <MetaRow items={FACTS} />
      </div>

      <Section title="Stack">
        <p className="t-meta mb-8">Go ahead, press a key.</p>
        <Keycaps />
      </Section>

      {activity && (
        <Section title="GitHub activity">
          <GithubActivity data={activity} />
        </Section>
      )}
    </Shell>
  );
}
