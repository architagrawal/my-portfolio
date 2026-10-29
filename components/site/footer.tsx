import { RESUME_URL } from "@/lib/resume";
import { FooterLive } from "./footer-live";

/* inset: the footer closes a content surface, so it takes the surface's padding, not its own width.
   resume: the PDF this page's Resume link serves, the site-wide one unless a page names its own. */
export function SiteFooter({ wide = false, inset = false, resume = RESUME_URL }: { wide?: boolean; inset?: boolean; resume?: string }) {
  const links = [
    ["LinkedIn", "https://www.linkedin.com/in/agrawal-archit"],
    ["GitHub", "https://github.com/architagrawal"],
    ["Resume", resume],
  ] as const;
  return (
    <footer className={inset ? "mt-32 px-6 md:px-12" : `mx-auto mt-32 px-6 ${wide ? "max-w-4xl" : "max-w-3xl"}`}>
      <div className="grid gap-8 pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="t-eyebrow">Get in touch</p>
          <FooterLive />
        </div>
        <ul className="flex gap-6 text-[15px] font-semibold text-foreground/75">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="pb-10 text-[13px] text-muted-foreground">© {new Date().getFullYear()} Archit Agrawal, San Francisco Bay Area</p>
    </footer>
  );
}
