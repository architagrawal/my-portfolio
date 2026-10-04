import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roleBySlug, roles } from "@/lib/data/experience";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Viz } from "@/components/soft/viz";
import { Reveal } from "@/components/site/reveal";

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
    <Shell>
      <Link href="/work" className="link-grow pb-0.5 text-[15px] font-bold text-primary"> All experience
      </Link>
      <div className="mt-8">
        <PageHeader eyebrow={`${r.period}, ${r.location}`} title={r.role}>
          {r.company}
        </PageHeader>
      </div>

      {r.visual && <Viz v={r.visual} className="mt-10" />}

      {groups.map((g) => (
        <section key={g.label}>
          <SectionTitle count={g.indexes.length}>{g.label}</SectionTitle>
          <ul className="space-y-4">
            {g.indexes.map((idx) => r.achievements[idx]).filter(Boolean).map((a) => (
              <Reveal key={a.text}>
                <li className="flex gap-3 text-[16px] leading-relaxed text-foreground/85">
                  <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{a.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}

      <SectionTitle>Tools</SectionTitle>
      <p className="text-[15px] leading-relaxed text-muted-foreground">{r.technologies.join(", ")}</p>

      {next && (
        <Link href={`/work/${next.slug}`} className="group mt-16 block rounded-2xl bg-card p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
          <span className="text-sm font-bold uppercase tracking-[0.08em] text-primary">Next role</span>
          <span className="mt-1 block font-display text-2xl font-extrabold tracking-tight">
            {next.role}, {next.companyShort}
          </span>
        </Link>
      )}
    </Shell>
  );
}
