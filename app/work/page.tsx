import type { Metadata } from "next";
import Link from "next/link";
import { roles, type Role } from "@/lib/data/experience";
import { PageHeader, SectionTitle, Shell } from "@/components/site/shell";
import { Reveal } from "@/components/site/reveal";
import { ScrollSpine } from "@/components/site/scroll-spine";
import { ThemeText } from "@/components/site/theme-text";
import { TiltCard } from "@/components/site/tilt-card";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, research and education: what Archit Agrawal built at ASU EdPlus, MyStage, Zeus Learning and more.",
  alternates: { canonical: "/work" },
};

const EDUCATION = [
  { school: "Arizona State University", degree: "MS, Computer Science", period: "Aug 2023 – May 2025", note: "GPA 4.0" },
  { school: "DA-IICT, Gandhinagar", degree: "B.Tech, Information and Communication Technology", period: "Aug 2018 – May 2022" },
];

function RoleEntry({ r }: { r: Role }) {
  const more = r.achievements.length - r.featured.length;
  return (
    <Reveal>
      <TiltCard className="mb-5" max={1.5}>
      <article className="tcard spotlight grid gap-x-8 gap-y-2 rounded-2xl bg-card p-7 shadow-soft sm:grid-cols-[9rem_1fr]">
        <p className="text-sm font-semibold text-muted-foreground tabular-nums">{r.period}</p>
        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight">
            <Link href={`/work/${r.slug}`} className="hover:text-primary transition-colors">
              {r.role}
            </Link>
          </h3>
          <p className="mt-0.5 text-[15px] text-muted-foreground">
            {r.company}, {r.location}
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-foreground/80">
            {r.featured.map((i) => r.achievements[i]).filter(Boolean).map((a) => (
              <li key={a.text} className="flex gap-3">
                <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
          {more > 0 && (
            <Link href={`/work/${r.slug}`} className="link-grow mt-4 inline-block pb-0.5 text-[15px] font-bold text-primary">
              See the full role
            </Link>
          )}
        </div>
      </article>
      </TiltCard>
    </Reveal>
  );
}

export default function WorkPage() {
  const industry = roles.filter((r) => r.kind === "industry");
  const research = roles.filter((r) => r.kind === "research");
  return (
    <Shell>
      <PageHeader eyebrow="Experience" title={<ThemeText v={{ midnight: "Where I've worked", graphite: "Work log", ember: "Where I've shipped", forest: "The path so far", steel: "Experience" }} />}>
        Five years across AI platforms, data pipelines and product engineering, plus research in evaluation
        and computer vision. Each role opens into the full detail.
      </PageHeader>

      <ScrollSpine>
      <SectionTitle count={industry.length}>Industry</SectionTitle>
      {industry.map((r) => <RoleEntry key={r.slug} r={r} />)}

      <SectionTitle count={research.length}>Research</SectionTitle>
      {research.map((r) => <RoleEntry key={r.slug} r={r} />)}
      </ScrollSpine>

      <SectionTitle>Education</SectionTitle>
      {EDUCATION.map((e) => (
        <div key={e.school} className="tcard mb-5 grid gap-x-8 rounded-2xl bg-card p-7 shadow-soft sm:grid-cols-[9rem_1fr]">
          <p className="text-sm font-semibold text-muted-foreground tabular-nums">{e.period}</p>
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight">{e.school}</h3>
            <p className="mt-0.5 text-[15px] text-muted-foreground">
              {e.degree}
              {e.note && `, ${e.note}`}
            </p>
          </div>
        </div>
      ))}
    </Shell>
  );
}
