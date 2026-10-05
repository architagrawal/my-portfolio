import type { Metadata } from "next";
import type React from "react";
import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/lib/data/projects";
import { PageHeader, Shell } from "@/components/site/shell";
import { Chips, MetaRow, NextLink, Points, Section, TextLink } from "@/components/site/ui";
import { Viz } from "@/components/soft/viz";
import { ProjectVisual } from "@/components/site/project-visual";
import { hasFigure } from "@/components/figures/slugs";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projectBySlug(params.slug);
  return p ? { title: p.title, description: p.description, alternates: { canonical: `/projects/${p.slug}` } } : {};
}

const TIER = { featured: "Featured build", build: "Side build", coursework: "Coursework" } as const;

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projectBySlug(params.slug);
  if (!p) notFound();
  const links = [
    p.caseStudyUrl && { label: "Case study", href: p.caseStudyUrl },
    p.githubUrl && { label: "Code", href: p.githubUrl },
    p.demoUrl && { label: "Demo", href: p.demoUrl },
  ].filter(Boolean) as { label: string; href: string }[];
  const extra = p.achievements.filter((a) => !p.highlights.includes(a));
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <Shell
      header={
        <PageHeader back={{ href: "/projects", label: "All projects" }} eyebrow={p.subtitle || TIER[p.tier]} title={p.title}>
          {p.description}
        </PageHeader>
      }
    >
      <div className="mt-10">
        <MetaRow
          items={[
            ["When", p.date],
            ["Type", TIER[p.tier]],
            ...(links.length
              ? ([[
                  "Links",
                  <span key="l" className="flex flex-wrap gap-x-5 gap-y-1">
                    {links.map((l) => (
                      <TextLink key={l.href} href={l.href} className="text-[15px]">
                        {l.label}
                      </TextLink>
                    ))}
                  </span>,
                ]] as [string, React.ReactNode][])
              : []),
          ]}
        />
      </div>

      {(p.visual || hasFigure(p.slug)) && (
        <div className="mt-14 overflow-hidden rounded-2xl">
          <ProjectVisual p={p} tall />
        </div>
      )}

      {p.viz && <Viz v={p.viz} className="mt-14" />}

      {p.highlights.length > 0 && (
        <Section title="Highlights" count={p.highlights.length}>
          <Points items={p.highlights} />
        </Section>
      )}
      {extra.length > 0 && (
        <Section title={p.highlights.length ? "Build notes" : "What I built"} count={extra.length}>
          <Points items={extra} />
        </Section>
      )}

      <Section title="Tools">
        <Chips items={p.technologies} />
      </Section>

      <NextLink href={`/projects/${next.slug}`} label="Next project" title={next.title} />
    </Shell>
  );
}
