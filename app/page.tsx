import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { PushButton } from "@/components/site/push-button";
import { Replay } from "@/components/site/replay";
import { ScrollCue } from "@/components/site/scroll-cue";
import { Plaque } from "@/components/site/plaque";
import { CopyEmail } from "@/components/site/copy-email";
import { CountUp } from "@/components/site/lab-viz";
import { Section, Stats, TextLink } from "@/components/site/ui";
import { GithubActivity } from "@/components/ui/github-activity";
import { getActivity } from "@/lib/github-activity";
import { roles } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { experiments } from "@/lib/data/lab";
import { RESUME_URL } from "@/lib/resume";
import { domains } from "@/lib/data/domains";
import { Marquee } from "@/components/site/marquee";
import { skillCategories } from "@/lib/data/skills";
import { Timeline } from "@/components/site/timeline";
import { ProjectVisual } from "@/components/site/project-visual";

const SHIPPED_AT = ["ASU EdPlus", "MyStage Music", "Zeus Learning", "DA-IICT"];

const CHIPS = ["AI Engineer, ASU EdPlus", "MS CS, 4.0 GPA", "Agents", "RAG", "Evals", "Full-stack", "Bay Area", "Open to relocate"];

const CONTACT = [
  ["Resume", RESUME_URL],
  ["GitHub", "https://github.com/architagrawal"],
  ["LinkedIn", "https://www.linkedin.com/in/agrawal-archit"],
] as const;

export default async function Home() {
  const activity = await getActivity();
  const featured = projects.filter((p) => p.tier === "featured");
  return (
    <div className="min-h-screen text-foreground">
      {/* the painting is the hero: the cover line, the contact links under it, and the plaque */}
      <SiteNav hero />
      <div className="hero-painting -mt-16 flex min-h-[100svh] flex-col pt-16">
        {/* the contact links, under the cover line (.hero-links in globals.css follows it per scene) */}
        <div className="hero-links hero-copy flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-7 px-6">
          <PushButton href="mailto:architagrawal000@gmail.com">Email me</PushButton>
          {CONTACT.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ui-link">
              <span className="ui-link-label">{label}</span>
            </a>
          ))}
          <CopyEmail className="ui-link" />
        </div>
        <ScrollCue target="intro" />
        <Plaque />
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
            <h1 className="t-h1 mt-6 max-w-[40rem]">I ship AI agents to production</h1>
            <p className="t-lead mt-5 max-w-[36rem]">
              <strong className="font-semibold text-foreground">AI Software Engineer at ASU EdPlus</strong>. Open to new roles.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="t-eyebrow mr-2">Hiring for</span>
              {domains.map((d) => (
                <Link
                  key={d.slug}
                  href={`/for/${d.slug}`}
                  className="rounded-full bg-[hsl(var(--primary)/0.14)] px-3.5 py-1.5 text-[14px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {d.slug === "data-engineering" ? "Data eng" : d.title.replace(" engineering", "")}
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <span className="t-eyebrow">Shipped at</span>
              {SHIPPED_AT.map((c) => (
                <span key={c} className="font-display text-[1.125rem] uppercase tracking-wide text-muted-foreground">
                  {c}
                </span>
              ))}
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
          <Marquee className="mt-14">
            {skillCategories.slice(0, 2).flatMap((c) => c.skills).map((t) => (
              <span key={t} className="whitespace-nowrap font-display text-[1.25rem] text-muted-foreground">
                {t}
              </span>
            ))}
          </Marquee>

          <Section title="Current build" statement="Survey Agents">
            <p className="t-h3 max-w-[30rem]">Ask any dataset in plain English. Every number cited and checked.</p>
            <div className="mt-8 max-w-[26rem]">
              <Replay />
            </div>
            <TextLink href="/work/survey-agents" className="mt-6">
              Case study
            </TextLink>
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
            <Timeline />
            <TextLink href="/work" className="mt-6">
              All experience
            </TextLink>
          </Section>

          <Section title="Projects" count={projects.length}>
            <ul className="grid gap-8 sm:grid-cols-3">
              {featured.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <div className="overflow-hidden rounded-lg bg-foreground/[0.04]">
                      <ProjectVisual p={p} />
                    </div>
                    <span className="ui-link-label mt-3 block font-semibold">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <TextLink href="/projects" className="mt-5">
              All projects
            </TextLink>
          </Section>

          <Section title="Lab notebook" count={experiments.length}>
            <ul className="grid gap-8 sm:grid-cols-3">
              {experiments.slice(1, 4).map((e) => (
                <li key={e.title}>
                  <Link href="/lab" className="group block">
                    <span className="t-stat block text-primary tabular-nums">{e.stat}</span>
                    <span className="ui-link-label mt-2 block font-medium">{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <TextLink href="/lab" className="mt-5">
              Lab notebook
            </TextLink>
          </Section>

          <Section title="About">
            <ul className="flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <li key={c} className="rounded-full bg-foreground/[0.06] px-3.5 py-1.5 text-[14px] font-medium">
                  {c}
                </li>
              ))}
            </ul>
            <TextLink href="/about" className="mt-7">
              About me
            </TextLink>
          </Section>
          <section className="mt-32 pb-8">
            <h2 className="t-h1 max-w-[36rem]">Hiring an AI engineer?</h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <PushButton href="mailto:architagrawal000@gmail.com">Email me</PushButton>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ui-link">
                <span className="ui-link-label">Resume</span>
              </a>
            </div>
          </section>
        </main>
        <SiteFooter inset />
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
