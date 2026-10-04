import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Scene } from "@/components/site/scene";
import { PushButton } from "@/components/site/push-button";
import { Replay } from "@/components/site/replay";
import { Scribble } from "@/components/site/scribble";
import { ThemeText } from "@/components/site/theme-text";
import { CopyEmail } from "@/components/site/copy-email";
import { CountUp } from "@/components/site/lab-viz";
import { GithubActivity } from "@/components/ui/github-activity";
import { roles } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { experiments } from "@/lib/data/lab";

function Card({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`tcard spotlight group block rounded-2xl bg-card p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {children}
    </Link>
  );
}

const cardTitle = "font-display text-2xl font-extrabold tracking-tight";
const cardText = "mt-2 text-[16px] leading-relaxed text-muted-foreground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Scene tall painted="inside">
        <SiteNav />
        <div className="hero relative mx-auto max-w-3xl px-6 pt-20 sm:pt-24">
          <p className="only-graphite mb-6 font-tech text-[15px] text-primary">
            ~/archit $ whoami<span className="caret" />
          </p>
          {/* a face to go with the name, in the same column as the text */}
          <Image
            src="/archit-profile.webp"
            alt="Archit Agrawal"
            width={144}
            height={144}
            priority
            className="mb-6 inline-block h-16 w-16 rounded-full object-cover ring-4 ring-card shadow-lift sm:h-20 sm:w-20"
            style={{ objectPosition: "40% center" }}
          />
          <h1 className="hero-title max-w-2xl font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[4rem]">
            Hi, I&apos;m Archit. I ship AI agents <Scribble>to production.</Scribble>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
            <strong className="font-semibold text-foreground">AI Software Engineer at ASU EdPlus</strong>, Phoenix. I own a
            12-agent analytics platform on AWS Bedrock, built in TypeScript and Python, with the tests to prove it works.
            Looking for my next AI engineering role, open to relocation.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <PushButton href="mailto:architagrawal000@gmail.com">Email me</PushButton>
            {[
              ["Resume", "/Archit_Agrawal_Resume.pdf"],
              ["GitHub", "https://github.com/architagrawal"],
              ["LinkedIn", "https://www.linkedin.com/in/agrawal-archit"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link-grow pb-0.5 text-[16px] font-bold text-primary">
                {label}
              </a>
            ))}
            <CopyEmail className="link-grow pb-0.5 text-[16px] font-bold text-primary" />
          </div>
        </div>
      </Scene>

      <main className="mx-auto max-w-3xl px-6">
        <section className="tcard relative z-10 -mt-24 mb-6 rounded-2xl bg-card p-7 shadow-lift sm:-mt-32">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary">
              <ThemeText v={{ midnight: "Shipping every week", graphite: <span className="normal-case">git log --since=1.year</span>, ember: "Always shipping", forest: "A year of steady work", steel: "Commit record" }} />
            </p>
            <a href="https://github.com/architagrawal" target="_blank" rel="noopener noreferrer" className="link-grow pb-0.5 text-[15px] font-bold text-primary">
              GitHub
            </a>
          </div>
          <GithubActivity />
        </section>

        <Card href="/work/survey-agents" className="grid gap-8 sm:grid-cols-[1fr_19rem] sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-secondary">
              <ThemeText v={{ midnight: "Now building", graphite: <span className="normal-case">./now_building</span>, ember: "Current build", forest: "What I am working on", steel: "Current project" }} />
            </p>
            <h2 className={`mt-2 ${cardTitle}`}>Survey Agents</h2>
            <p className={cardText}>
              Upload a survey export, ask it a question in plain English, and get a chart where every number traces back
              to the data. Twelve agents in production on AWS.
            </p>
            <span className="link-grow mt-5 inline-block pb-0.5 font-bold text-primary">Read the case study</span>
          </div>
          <Replay />
        </Card>

        <section className="tcard mt-6 grid grid-cols-2 gap-6 rounded-2xl bg-card p-7 shadow-soft sm:grid-cols-4">
          {[
            ["12", "agents in production"],
            ["290k", "lines of code"],
            ["4,077", "tests behind them"],
            ["60,000+", "students reached"],
          ].map(([n, label]) => (
            <div key={label}>
              <p className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.03em] text-primary tabular-nums">
                <CountUp value={n} />
              </p>
              <p className="mt-2 text-[14px] font-semibold text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card href="/work">
            <h2 className={cardTitle}>Experience</h2>
            <p className={cardText}>
              {roles.length} roles since 2021, industry and research.
            </p>
            <ul className="mt-5 space-y-3">
              {roles.slice(0, 4).map((r) => (
                <li key={r.slug} className="flex items-baseline justify-between gap-4 rounded-xl bg-muted px-4 py-3 text-[15px]">
                  <span className="font-semibold">
                    {r.role} <span className="font-normal text-muted-foreground">at {r.companyShort}</span>
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{r.period.match(/\d{4}/)?.[0]}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card href="/projects">
            <h2 className={cardTitle}>Projects</h2>
            <p className={cardText}>{projects.length} builds, including an AI DJ and a receipt-splitting app.</p>
            <Image src="/prismsplit-app.jpg" alt="PrismSplit app screens" width={700} height={380} className="mt-5 h-36 w-full rounded-xl object-cover object-top" />
            <ul className="mt-3 space-y-3">
              {projects
                .filter((p) => p.tier === "featured")
                .slice(0, 3)
                .map((p) => (
                  <li key={p.slug} className="flex items-baseline justify-between gap-4 rounded-xl bg-muted px-4 py-3 text-[15px]">
                    <span className="font-semibold">{p.title}</span>
                    <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{p.date.match(/\d{4}/)?.[0]}</span>
                  </li>
                ))}
            </ul>
          </Card>
          <Card href="/lab">
            <h2 className={cardTitle}>Lab notebook</h2>
            <p className={cardText}>
              {experiments.length} hard problems, each with the number that says it is solved.
            </p>
            <ul className="mt-5 space-y-3">
              {experiments.slice(1, 4).map((e) => (
                <li key={e.title} className="flex items-baseline gap-4 rounded-xl bg-muted px-4 py-3 text-[15px]">
                  <span className="w-14 shrink-0 font-display text-lg font-extrabold text-primary tabular-nums">{e.stat}</span>
                  <span className="font-semibold">{e.title}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card href="/about">
            <h2 className={cardTitle}>About</h2>
            <p className={cardText}>How I got here, what I work with, and a year of GitHub activity.</p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Based in", "Phoenix, AZ"],
                ["Degree", "MS CS, 4.0"],
                ["Works in", "TypeScript, Python"],
                ["Loves", "LangGraph, AWS"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-primary">{k}</dt>
                  <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </main>
      <SiteFooter />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
