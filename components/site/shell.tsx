import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";
import { TextLink } from "./ui";

/* Page frame shared by every sub-page. The painting (Backdrop, in the root layout) is the
   setting: a tall band shows it with the title over it, then the content sits on a centred
   surface and the painting stays visible in the side margins on wide screens. */
export function Shell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      <SiteNav wide />
      <div className="hero-band">
        <div className="mx-auto flex min-h-[calc(55vh-4rem)] max-w-4xl flex-col justify-end px-6 pb-14 pt-12 md:min-h-[calc(62vh-4rem)] md:px-12">
          <div className="hero-copy">{header}</div>
        </div>
      </div>
      <div className="surface mx-auto max-w-4xl">
        <main className="relative px-6 pt-2 md:px-12">{children}</main>
        <SiteFooter inset />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  back,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <header>
      {back && (
        <TextLink href={back.href} back className="mb-10 !flex w-fit text-[15px]">
          {back.label}
        </TextLink>
      )}
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      <h1 className="t-h1 mt-4 max-w-3xl">{title}</h1>
      {children && <div className="t-lead mt-5 max-w-2xl">{children}</div>}
    </header>
  );
}

/* Section opening: one size, one gap above (96px wide, 64px phone), count as a quiet numeral */
export function SectionTitle({ children, count }: { children: ReactNode; count?: number }) {
  return (
    <h2 className="t-h2 mb-8 mt-16 md:mt-24">
      {children}
      {count != null && <span className="t-count">{count}</span>}
    </h2>
  );
}
