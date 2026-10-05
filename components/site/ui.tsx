import Link from "next/link";
import type { ReactNode } from "react";

/* Shared editorial primitives. One type scale (t-* in globals.css), one link, one chip,
   one list style. Pages compose these instead of restating class strings. */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-eyebrow ${className}`}>{children}</p>;
}

/* Text link with an arrow that nudges on hover. External hrefs open in a new tab. */
export function TextLink({ href, children, back = false, className = "" }: { href: string; children: ReactNode; back?: boolean; className?: string }) {
  const ext = /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");
  const inner = (
    <>
      {back && <span aria-hidden="true" className="ui-arrow ui-arrow-back">&larr;</span>}
      <span className="ui-link-label">{children}</span>
      {!back && <span aria-hidden="true" className="ui-arrow">&rarr;</span>}
    </>
  );
  const cls = `ui-link ${className}`;
  if (ext)
    return (
      <a href={href} className={cls} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Chips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="ui-chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

/* Split a long achievement into a scannable lead and its detail, without rewording it:
   at a colon if the lead is short, else after the first sentence. */
export function splitLead(t: string): [string, string] {
  const m = t.match(/^(.{12,110}?:)\s+(.+)$/);
  if (m) return [m[1], m[2]];
  const s = t.match(/^(.{20,160}?[.;])\s+(.+)$/);
  if (s) return [s[1], s[2]];
  return [t, ""];
}

export function Points({ items }: { items: string[] }) {
  return (
    <ul className="ui-points">
      {items.map((t) => {
        const [lead, rest] = splitLead(t);
        return (
          <li key={t}>
            <span className="font-medium text-foreground">{lead}</span>
            {rest && <span className="text-muted-foreground"> {rest}</span>}
          </li>
        );
      })}
    </ul>
  );
}

/* A detail-page section: label in the left rail on wide screens, content on the right.
   The rail is the same 9rem column the list pages use for dates, so edges line up site-wide. */
export function Section({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <section className="ui-section">
      <h2 className="t-h3">
        {title}
        {count != null && <span className="t-count">{count}</span>}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/* The meta row under a detail title: a small table of facts */
export function MetaRow({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="ui-meta" style={{ ["--meta-cols" as string]: Math.max(items.length, 2) }}>
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="t-eyebrow">{k}</dt>
          <dd className="mt-1.5 text-[15px] font-medium text-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function NextLink({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <Link href={href} className="ui-next group">
      <span className="t-eyebrow">{label}</span>
      <span className="t-h2 mt-2 flex items-baseline gap-3">
        <span className="ui-link-label">{title}</span>
        <span aria-hidden="true" className="ui-arrow">&rarr;</span>
      </span>
    </Link>
  );
}
