import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const impact = [
  ["70,000+", "records indexed each day"],
  ["60,000+", "students supported by ASU systems"],
  ["4 hours → 15 minutes", "transcript processing time"],
  ["200+", "tests around production agent workflows"],
];

export default function Hero() {
  return (
    <section id="hero" className="border-b border-border px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-7 font-tech text-sm text-muted-foreground">
          AI/ML Engineer · Software Engineer
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(3.4rem,10vw,8rem)] font-bold leading-[0.86] tracking-[-0.065em]">
              Archit
              <br />
              Agrawal
            </h1>
          </div>

          <figure className="w-40 lg:w-full">
            <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
              <Image
                src="/archit-profile.webp"
                alt="Portrait of Archit Agrawal"
                fill
                priority
                sizes="(max-width: 1024px) 160px, 224px"
                className="object-cover"
                style={{ objectPosition: "40% center" }}
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              New York metro area
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-[minmax(0,48rem)_1fr]">
          <div>
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              I work on production AI infrastructure at MyStage, including
              LangGraph workflows, entity resolution, scraping pipelines, and
              the services that operate them.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              My earlier work spans retrieval systems at Arizona State
              University, backend and cloud infrastructure, and full-stack
              products. This site documents the engineering decisions behind
              that work.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href="/Archit_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm underline decoration-border underline-offset-4 hover:decoration-primary"
            >
              Résumé <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:architagrawal000@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href="https://github.com/architagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/agrawal-archit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        <dl className="mt-16 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {impact.map(([value, label], index) => (
            <div
              key={label}
              className="border-b border-border py-6 sm:px-5 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="font-display text-2xl font-semibold tracking-tight">
                {value}
              </dt>
              <dd className="mt-2 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="#about"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Continue <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
