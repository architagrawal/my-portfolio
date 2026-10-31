import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roleBySlug, roles } from "@/lib/data/experience";
import { pageMeta, snippet } from "@/app/metadata";
import { PageHeader, Shell } from "@/components/site/shell";
import { Viz } from "@/components/soft/viz";
import { Chips, MetaRow, MoreDetail, NextLink, Points, Section } from "@/components/site/ui";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = roleBySlug(params.slug);
  if (!r) return {};
  const lead = r.achievements[r.featured[0]]?.text ?? "";
  return pageMeta({ title: `${r.role}, ${r.companyShort}`, description: snippet(`${r.role} at ${r.company}, ${r.period}. ${lead}`), path: `/work/${r.slug}` });
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
      <Chips items={r.technologies} className="mt-8" />
      <div className="mt-10">
        <MetaRow items={[["When", r.period], ["Where", r.location]]} />
      </div>

      {r.visual && <Viz v={r.visual} className="mt-14" />}

      <Section title="Highlights" count={r.achievements.length}>
        <Points items={r.achievements.slice(0, 3).map((a) => a.text)} />
        {r.achievements.length > 3 && (
          <details className="ui-more mt-4">
            <summary className="ui-link">
              <span className="ui-link-label">{r.achievements.length - 3} more</span>
            </summary>
            <Points items={r.achievements.slice(3).map((a) => a.text)} />
          </details>
        )}
      </Section>

      {r.more.length > 0 && (
        <Section title="More detail">
          <MoreDetail groups={r.more} />
        </Section>
      )}


      {next && <NextLink href={`/work/${next.slug}`} label="Next role" title={`${next.role}, ${next.companyShort}`} />}
    </Shell>
  );
}
