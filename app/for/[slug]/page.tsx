import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { domainBySlug, domains, sourceOf, type DomainPoint } from "@/lib/data/domains";
import { DOMAIN_RESUMES } from "@/lib/resume";
import { SITE, pageMeta } from "@/app/metadata";
import { PageHeader, Shell } from "@/components/site/shell";
import { Chips, NextLink, Section, Stats, TextLink, splitLead } from "@/components/site/ui";

export function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = domainBySlug(params.slug);
  return d ? { ...pageMeta({ title: d.seoTitle, description: d.description, path: `/for/${d.slug}` }), keywords: [...d.keywords, "Archit Agrawal"] } : {};
}

/* Points set like the role pages, each with the role or project it comes from underneath */
function SourcedPoints({ items }: { items: DomainPoint[] }) {
  return (
    <ul className="ui-points">
      {items.map((p) => {
        const [lead, rest] = splitLead(p.text);
        const src = sourceOf(p);
        return (
          <li key={p.text}>
            <span className="font-medium text-foreground">{lead}</span>
            {rest && <span className="text-muted-foreground"> {rest}</span>}
            <Link href={src.href} className="t-meta mt-1 block w-fit transition-colors hover:text-primary">
              {src.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function DomainPage({ params }: { params: { slug: string } }) {
  const d = domainBySlug(params.slug);
  if (!d) notFound();
  const next = domains[(domains.indexOf(d) + 1) % domains.length];
  const resume = DOMAIN_RESUMES[d.slug];
  const url = `${SITE}/for/${d.slug}`;
  /* The page as a profile of the site's Person, its place under Experience, and its resume */
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": url,
        url,
        name: `${d.seoTitle} | Archit Agrawal`,
        description: d.description,
        keywords: d.keywords.join(", "),
        mainEntity: { "@id": `${SITE}/#person` },
        hasPart: { "@type": "DigitalDocument", name: `Archit Agrawal, ${d.title} resume`, url: `${SITE}${resume}`, encodingFormat: "application/pdf" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Experience", item: `${SITE}/work` },
          { "@type": "ListItem", position: 2, name: d.title, item: url },
        ],
      },
    ],
  };

  return (
    <Shell
      resume={resume}
      header={
        <PageHeader back={{ href: "/work", label: "All experience" }} eyebrow="Domain" title={d.title}>
          <p>{d.summary}</p>
          <TextLink href={resume} className="mt-6 !flex w-fit text-[15px]">
            {d.title} resume
          </TextLink>
        </PageHeader>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Stats className="mt-12" items={d.stats} />

      {d.groups.map((g) => (
        <Section key={g.title} title={g.title} count={g.points.length}>
          <SourcedPoints items={g.points} />
        </Section>
      ))}

      <Section title="Case studies" count={d.caseStudies.length}>
        <ul className="-mt-3">
          {d.caseStudies.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block py-3">
                <span className="t-h3 flex items-baseline gap-2">
                  <span className="ui-link-label">{c.title}</span>
                  <span aria-hidden="true" className="ui-arrow text-primary opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
                </span>
                <span className="t-meta mt-1 block">{c.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tools">
        <Chips items={d.tools} />
      </Section>

      <NextLink href={`/for/${next.slug}`} label="Next domain" title={next.title} />
    </Shell>
  );
}
