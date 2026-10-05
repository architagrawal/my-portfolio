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

  // Themed groups first, in the order the role defines; anything unclaimed goes last
  const claimed = new Set(r.groups.flatMap((g) => g.indexes));
  const groups = [
    { label: "Highlights", indexes: r.featured },
    ...r.groups.map((g) => ({ label: g.label, indexes: g.indexes.filter((i) => !r.featured.includes(i)) })),
    { label: "More", indexes: r.achievements.map((_, i) => i).filter((i) => !claimed.has(i) && !r.featured.includes(i)) },
  ].filter((g) => g.indexes.length > 0);

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

      {groups.map((g) => (
        <Section key={g.label} title={g.label} count={g.indexes.length}>
          <Points items={g.indexes.map((idx) => r.achievements[idx]).filter(Boolean).map((a) => a.text)} />
        </Section>
      ))}

      <Section title="Tools">
        <Chips items={r.technologies} />
      </Section>

      {next && <NextLink href={`/work/${next.slug}`} label="Next role" title={`${next.role}, ${next.companyShort}`} />}
    </Shell>
  );
}
