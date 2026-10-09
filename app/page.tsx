import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { PushButton } from "@/components/site/push-button";
import { Replay } from "@/components/site/replay";
import { ScrollCue } from "@/components/site/scroll-cue";
import { CopyEmail } from "@/components/site/copy-email";
import { CountUp } from "@/components/site/lab-viz";
import { MetaRow, Section, Stats, TextLink } from "@/components/site/ui";
import { GithubActivity } from "@/components/ui/github-activity";
import { getActivity } from "@/lib/github-activity";
import { roles } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { experiments } from "@/lib/data/lab";

const CONTACT = [
  ["Resume", "/Archit_Agrawal_Resume.pdf"],
  ["GitHub", "https://github.com/architagrawal"],
  ["LinkedIn", "https://www.linkedin.com/in/agrawal-archit"],
] as const;

/* one row of a home list: title on the left, a quiet year or stat on the right, the whole row links */
function Row({ href, title, aside }: { href: string; title: React.ReactNode; aside: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group flex items-baseline justify-between gap-6 py-2.5 text-[1.0625rem]">
        <span className="min-w-0">
          <span className="ui-link-label">{title}</span>
        </span>
        <span className="t-meta shrink-0">{aside}</span>
      </Link>
    </li>
  );
}

export default async function Home() {
  const activity = await getActivity();
  const featured = projects.filter((p) => p.tier === "featured");
  return (
    <div className="min-h-screen text-foreground">
      {/* the painting is the hero, with nothing over it but the nav */}
      <SiteNav hero />
      <div className="hero-painting -mt-16 flex min-h-[100svh] flex-col pt-16">
        <ScrollCue target="intro" />
      </div>

      <div className="surface mx-auto max-w-4xl">
        <main className="px-6 pt-16 md:px-12">
          <section id="intro" className="scroll-mt-8">
            <Image
              src="/archit-profile.webp"
              alt="Archit Agrawal"
              width={112}
              height={112}
              priority
              className="h-14 w-14 rounded-full object-cover"
              style={{ objectPosition: "40% center" }}
            />
            <h1 className="t-h1 mt-6 max-w-[40rem]">Hi, I&apos;m Archit. I ship AI agents to production.</h1>
            <p className="t-lead mt-5 max-w-[36rem]">
              <strong className="font-semibold text-foreground">AI Software Engineer at ASU EdPlus</strong>, Phoenix. I own a
              12-agent analytics platform on AWS Bedrock, built in TypeScript and Python, with the tests to prove it works.
              Looking for my next AI engineering role, open to relocation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <PushButton href="mailto:architagrawal000@gmail.com">Email me</PushButton>
              {CONTACT.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ui-link">
                  <span className="ui-link-label">{label}</span>
                </a>
              ))}
              <CopyEmail className="ui-link" />
            </div>
          </section>

          <Stats
            className="mt-20"
            items={[
              [<CountUp key="a" value="12" />, "agents in production"],
              [<CountUp key="b" value="347k" />, "lines of code"],
              [<CountUp key="c" value="4,845" />, "tests behind them"],
              [<CountUp key="d" value="60,000+" />, "students reached"],
            ]}
          />

          <Section title="Current build" statement="Survey Agents">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
              <div>
                <p className="t-body max-w-[34rem] text-muted-foreground">
                  Ask any dataset a question in plain English and get an answer you can make a decision on. Every
                  number is computed by code, cited to its rows and checked before you see it: 85% fewer wrong answers
                  on 164 published figures, and 68% on StatQA, above GPT-4o&apos;s best reported score. Twelve agents in
                  production on AWS.
                </p>
                <TextLink href="/work/survey-agents" className="mt-5">
                  Case study
                </TextLink>
              </div>
              <Replay />
            </div>
          </Section>

          {activity && (
            <Section title="Always shipping">
              <GithubActivity data={activity} />
              <TextLink href="https://github.com/architagrawal" className="mt-6">
                GitHub
              </TextLink>
            </Section>
          )}

          <Section title="Experience" count={roles.length}>
            <p className="t-meta">{roles.length} roles since 2021, industry and research.</p>
            <ul className="mt-4">
              {roles.slice(0, 4).map((r) => (
                <Row
                  key={r.slug}
                  href={`/work/${r.slug}`}
                  title={
                    <>
                      <span className="font-semibold">{r.role}</span> <span className="text-muted-foreground">at {r.companyShort}</span>
                    </>
                  }
                  aside={r.period.match(/\d{4}/)?.[0]}
                />
              ))}
            </ul>
            <TextLink href="/work" className="mt-5">
              All experience
            </TextLink>
          </Section>

          <Section title="Projects" count={projects.length}>
            <p className="t-meta">{projects.length} builds, including an AI DJ and a receipt-splitting app.</p>
            <ul className="mt-4">
              {featured.slice(0, 3).map((p) => (
                <Row key={p.slug} href={`/projects/${p.slug}`} title={<span className="font-semibold">{p.title}</span>} aside={p.date.match(/\d{4}/)?.[0]} />
              ))}
            </ul>
            <TextLink href="/projects" className="mt-5">
              All projects
            </TextLink>
          </Section>

          <Section title="Lab notebook" count={experiments.length}>
            <p className="t-meta">{experiments.length} hard problems, each with the number that says it is solved.</p>
            <ul className="mt-4">
              {experiments.slice(1, 4).map((e) => (
                <li key={e.title}>
                  <Link href="/lab" className="group grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-4 py-2.5 text-[1.0625rem]">
                    <span className="t-h3 text-primary tabular-nums">{e.stat}</span>
                    <span className="ui-link-label font-semibold">{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <TextLink href="/lab" className="mt-5">
              Lab notebook
            </TextLink>
          </Section>

          <Section title="About">
            <p className="t-meta mb-6">How I got here, what I work with, and a year of GitHub activity.</p>
            <MetaRow
              items={[
                ["Based in", "Phoenix, AZ"],
                ["Degree", "MS CS, 4.0"],
                ["Works in", "TypeScript, Python"],
                ["Loves", "LangGraph, AWS"],
              ]}
            />
            <TextLink href="/about" className="mt-7">
              About me
            </TextLink>
          </Section>
        </main>
        <SiteFooter inset />
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
