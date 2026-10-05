import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roleBySlug, roles } from "@/lib/data/experience";
import { PageHeader, Shell } from "@/components/site/shell";
import { Viz } from "@/components/soft/viz";
import { Chips, MetaRow, NextLink, Points, Section } from "@/components/site/ui";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = roleBySlug(params.slug);
  return r ? { title: `${r.role}, ${r.companyShort}`, alternates: { canonical: `/work/${r.slug}` } } : {};
}

export default function RolePage({ params }: { params: { slug: string } }) {
  const r = roleBySlug(params.slug);
  if (!r) notFound();

  const i = roles.indexOf(r);
  const next = roles[i + 1];

  return (
    <Shell
      header={
        <PageHeader back={{ href: "/work", label: "All experience" }} eyebrow={r.kind === "research" ? "Research" : "Industry"} title={r.role}>
          {r.company}
        </PageHeader>
      }
    >
      <div className="mt-10">
        <MetaRow items={[["When", r.period], ["Where", r.location]]} />
      </div>

      {r.visual && <Viz v={r.visual} className="mt-14" />}

      <Section title="Highlights" count={r.achievements.length}>
        <Points items={r.achievements.map((a) => a.text)} />
      </Section>

      <Section title="Tools">
        <Chips items={r.technologies} />
      </Section>

      {next && <NextLink href={`/work/${next.slug}`} label="Next role" title={`${next.role}, ${next.companyShort}`} />}
    </Shell>
  );
}
