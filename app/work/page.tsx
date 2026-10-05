import type { Metadata } from "next";
import Link from "next/link";
import { roles, type Role } from "@/lib/data/experience";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Viz } from "@/components/soft/viz";
import { Points, TextLink } from "@/components/site/ui";
import { ScrollSpine } from "@/components/site/scroll-spine";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles, research and education: what Archit Agrawal built at ASU EdPlus, MyStage, Zeus Learning and more.",
  alternates: { canonical: "/work" },
};

const EDUCATION = [
  {
    school: "Arizona State University",
    degree: "MS, Computer Science",
    period: "Aug 2023 – May 2025",
    note: "GPA 4.0",
  },
  {
    school: "DA-IICT, Gandhinagar",
    degree: "B.Tech, Information and Communication Technology",
    period: "Aug 2018 – May 2022",
  },
];

function RoleEntry({ r }: { r: Role }) {
  return (
    <article className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-[9rem_1fr]">
      <p className="t-meta pt-1.5">{r.period}</p>
      <div className="min-w-0">
        <h3 className="t-h2">
          <Link href={`/work/${r.slug}`} className="transition-colors hover:text-primary">
            {r.role}
          </Link>
        </h3>
        <p className="t-meta mt-1">
          {r.company}, {r.location}
        </p>
        <div className="mt-6">
          <Points items={r.featured.map((i) => r.achievements[i]).filter(Boolean).map((a) => a.text)} />
        </div>
        {r.visual && <Viz v={r.visual} className="mt-8" />}
        <TextLink href={`/work/${r.slug}`} className="mt-6 !flex w-fit text-[15px]">
          Full role
        </TextLink>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const industry = roles.filter((r) => r.kind === "industry");
  const research = roles.filter((r) => r.kind === "research");
  return (
    <Shell
      header={
        <PageHeader eyebrow="Experience" title="Where I've shipped">
          Five years across AI platforms, data pipelines and product engineering,
          plus research in evaluation and computer vision.
        </PageHeader>
      }
    >

      <ScrollSpine>
        <SectionTitle count={industry.length}>Industry</SectionTitle>
        {industry.map((r) => (
          <RoleEntry key={r.slug} r={r} />
        ))}

        <SectionTitle count={research.length}>Research</SectionTitle>
        {research.map((r) => (
          <RoleEntry key={r.slug} r={r} />
        ))}
      </ScrollSpine>

      <SectionTitle>Education</SectionTitle>
      {EDUCATION.map((e) => (
        <div
          key={e.school}
          className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[9rem_1fr]"
        >
          <p className="t-meta pt-0.5">
            {e.period}
          </p>
          <div>
            <h3 className="t-h3">
              {e.school}
            </h3>
            <p className="t-meta mt-1">
              {e.degree}
              {e.note && `, ${e.note}`}
            </p>
          </div>
        </div>
      ))}
    </Shell>
  );
}
