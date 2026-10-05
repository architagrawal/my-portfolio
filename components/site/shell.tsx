import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";
import { Reveal } from "./reveal";

/* Page frame shared by every sub-page. The painting (Backdrop, in the root layout) is the
   setting: a tall band shows it with the title over it, then the content sits on a centred
   surface and the painting stays visible in the side margins on wide screens. */
export function Shell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      <SiteNav wide />
      <div className="mx-auto flex min-h-[55vh] max-w-4xl flex-col justify-end px-6 pb-12 pt-16 md:min-h-[60vh] md:px-12">
        <div className="hero-copy">{header}</div>
      </div>
      <div className="surface mx-auto max-w-4xl">
        <main className="relative px-6 pt-4 md:px-12">{children}</main>
        <SiteFooter inset />
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal>
      <header>
        {eyebrow && <p className="w-fit text-sm font-bold uppercase tracking-[0.08em] text-primary">{eyebrow}</p>}
        <h1 className="hero-title mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-[3.4rem]">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/85">{children}</div>}
      </header>
    </Reveal>
  );
}

export function SectionTitle({ children, count }: { children: ReactNode; count?: number }) {
  return (
    <h2 className="mt-16 mb-6 font-display text-2xl font-extrabold tracking-tight">
      {children}
      {count != null && <span className="ml-3 font-sans text-base font-medium text-muted-foreground tabular-nums">{count}</span>}
    </h2>
  );
}
