import type { Metadata } from "next";
import Link from "next/link";
import { projects, type Project } from "@/lib/data/projects";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { ProjectVisual } from "@/components/site/project-visual";
import { ThemeText } from "@/components/site/theme-text";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI agents, retrieval systems, audio ML and full-stack products built by Archit Agrawal.",
  alternates: { canonical: "/projects" },
};

function Row({ p }: { p: Project }) {
  return (
    <Reveal>
      <Link href={`/projects/${p.slug}`} className="tcard spotlight group mb-4 grid gap-x-8 gap-y-1 rounded-2xl bg-card p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:grid-cols-[9rem_1fr] sm:items-baseline">
        <span className="text-sm font-semibold text-muted-foreground tabular-nums">{p.date}</span>
        <span>
          <span className="font-display text-xl font-extrabold tracking-tight">{p.title}</span>
          <span className="mt-1 block text-[15px] leading-relaxed text-muted-foreground line-clamp-2">{p.description}</span>
        </span>
      </Link>
    </Reveal>
  );
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.tier === "featured");
  const builds = projects.filter((p) => p.tier === "build");
  const coursework = projects.filter((p) => p.tier === "coursework");
  return (
    <Shell paint="projects">
      <PageHeader eyebrow="Projects" title={<ThemeText v={{ midnight: "Things I've built", graphite: "Builds", ember: "Stuff I've shipped", forest: "Things I've made", steel: "Selected projects" }} />}>
        Production AI at work, and side projects where I try ideas end to end. Each one opens into the
        full write-up.
      </PageHeader>

      <SectionTitle count={featured.length}>Featured</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((p, n) => (
          <Reveal key={p.slug} delay={(n % 2) * 0.06}>
            <Link
              href={`/projects/${p.slug}`}
              className="tcard spotlight group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div>
                <ProjectVisual p={p} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-muted-foreground">{p.date}</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/75 line-clamp-3">{p.highlights[0] ?? p.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <SectionTitle count={builds.length}>Other builds</SectionTitle>
      {builds.map((p) => <Row key={p.slug} p={p} />)}

      <SectionTitle count={coursework.length}>Coursework</SectionTitle>
      {coursework.map((p) => <Row key={p.slug} p={p} />)}
    </Shell>
  );
}
