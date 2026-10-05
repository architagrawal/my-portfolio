import type { Metadata } from "next";
import Link from "next/link";
import { projects, type Project } from "@/lib/data/projects";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { ProjectVisual } from "@/components/site/project-visual";
import { ProjectFigure } from "@/components/figures";
import { hasFigure } from "@/components/figures/slugs";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI agents, retrieval systems, audio ML and full-stack products built by Archit Agrawal.",
  alternates: { canonical: "/projects" },
};

function Row({ p }: { p: Project }) {
  const fig = hasFigure(p.slug);
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={`group grid gap-x-8 gap-y-1 py-6 md:grid-cols-[9rem_1fr] md:items-start ${fig ? "md:grid-cols-[9rem_1fr_7rem]" : ""}`}
    >
      <span className="t-meta md:pt-1">{p.date}</span>
      <span className="min-w-0">
        <span className="t-h3 flex items-baseline gap-2">
          <span className="ui-link-label">{p.title}</span>
          <span aria-hidden="true" className="ui-arrow text-primary opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
        </span>
        <span className="mt-1.5 block max-w-xl text-[15px] leading-relaxed text-muted-foreground line-clamp-2">{p.description}</span>
      </span>
      {fig && <ProjectFigure slug={p.slug} title={p.title} className="hidden w-28 self-center md:block" />}
    </Link>
  );
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.tier === "featured");
  const builds = projects.filter((p) => p.tier === "build");
  const coursework = projects.filter((p) => p.tier === "coursework");
  return (
    <Shell
      header={
        <PageHeader eyebrow="Projects" title="Stuff I've shipped">
          Production AI at work, and side projects where I try ideas end to end.
        </PageHeader>
      }
    >

      <SectionTitle count={featured.length}>Featured</SectionTitle>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {featured.map((p, n) => (
          <Reveal key={p.slug} delay={(n % 2) * 0.06}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full flex-col"
              >
                <div className="overflow-hidden rounded-2xl bg-foreground/[0.04] transition-colors duration-300 group-hover:bg-foreground/[0.07]">
                  <ProjectVisual p={p} />
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <p className="t-meta">{p.date}</p>
                  <h3 className="t-h2 mt-1.5">
                    <span className="ui-link-label">{p.title}</span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground line-clamp-3">
                    {p.highlights[0] ?? p.description}
                  </p>
                </div>
              </Link>
          </Reveal>
        ))}
      </div>

      <SectionTitle count={builds.length}>Other builds</SectionTitle>
      {builds.map((p) => (
        <Row key={p.slug} p={p} />
      ))}

      <SectionTitle count={coursework.length}>Coursework</SectionTitle>
      {coursework.map((p) => (
        <Row key={p.slug} p={p} />
      ))}
    </Shell>
  );
}
