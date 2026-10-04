import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { PaintLayer, Scene } from "./scene";
import { SiteFooter } from "./footer";
import { Reveal } from "./reveal";

/* Page frame shared by every sub-page */
export function Shell({ children, paint = false }: { children: ReactNode; paint?: boolean }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Scene painted={paint ? "outside" : undefined}>
        <SiteNav />
      </Scene>
      {/* spans the nav scene and the page header, not just the scene strip */}
      {paint && <PaintLayer className="inset-x-0 top-0 h-[36rem] sm:h-[40rem]" />}
      <main className="relative mx-auto max-w-3xl px-6 pt-4">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal>
      <header>
        {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.08em] text-primary">{eyebrow}</p>}
        <h1 className="hero-title mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem]">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </header>
    </Reveal>
  );
}

export function SectionTitle({ children, count }: { children: ReactNode; count?: number }) {
  return (
    <h2 className="mt-20 mb-6 font-display text-2xl font-extrabold tracking-tight">
      {children}
      {count != null && <span className="ml-3 font-sans text-base font-medium text-muted-foreground tabular-nums">{count}</span>}
    </h2>
  );
}
