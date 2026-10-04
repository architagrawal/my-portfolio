import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/lib/data/projects";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { LineChart } from "@/components/soft/line-chart";
import { Reveal } from "@/components/site/reveal";
import { ProjectVisual } from "@/components/site/project-visual";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projectBySlug(params.slug);
  return p ? { title: p.title, description: p.description, alternates: { canonical: `/projects/${p.slug}` } } : {};
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <Reveal key={t}>
          <li className="flex gap-3 text-[16px] leading-relaxed text-foreground/85">
            <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{t}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projectBySlug(params.slug);
  if (!p) notFound();
  const links = [
    p.caseStudyUrl && { label: "Read the full case study", href: p.caseStudyUrl },
    p.githubUrl && { label: "View the code", href: p.githubUrl },
    p.demoUrl && { label: "Try the demo", href: p.demoUrl },
  ].filter(Boolean) as { label: string; href: string }[];
  const extra = p.achievements.filter((a) => !p.highlights.includes(a));
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <Shell>
      <Link href="/projects" className="link-grow pb-0.5 text-[15px] font-bold text-primary"> All projects
      </Link>
      <div className="mt-8">
        <PageHeader eyebrow={p.date} title={p.title}>
          {p.subtitle && <span className="block text-foreground">{p.subtitle}</span>}
          {p.description}
        </PageHeader>
      </div>

      {links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l, n) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="link-grow pb-0.5 text-[16px] font-bold text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      {p.visual && (
        <Reveal className="mt-12 overflow-hidden rounded-2xl bg-card shadow-soft">
          <ProjectVisual p={p} tall />
        </Reveal>
      )}

      {p.series && <LineChart series={p.series} className="mt-12" />}

      {p.highlights.length > 0 && (
        <>
          <SectionTitle count={p.highlights.length}>Highlights</SectionTitle>
          <Bullets items={p.highlights} />
        </>
      )}
      {extra.length > 0 && (
        <>
          <SectionTitle count={extra.length}>{p.highlights.length ? "Implementation notes" : "What I built"}</SectionTitle>
          <Bullets items={extra} />
        </>
      )}

      <SectionTitle>Tools</SectionTitle>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{p.technologies.join(", ")}</p>

      <Link href={`/projects/${next.slug}`} className="group mt-16 block rounded-2xl bg-card p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
        <span className="text-sm font-bold uppercase tracking-[0.08em] text-primary">Next project</span>
        <span className="mt-1 block font-display text-2xl font-extrabold tracking-tight">{next.title}</span>
      </Link>
    </Shell>
  );
}
