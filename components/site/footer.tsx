import Link from "next/link";
import { FooterLive } from "./footer-live";

/* inset: the footer closes a content surface, so it takes the surface's padding, not its own width */
export function SiteFooter({ wide = false, inset = false }: { wide?: boolean; inset?: boolean }) {
  return (
    <footer className={inset ? "mt-12 px-6 md:px-12" : `mx-auto mt-24 px-6 ${wide ? "max-w-4xl" : "max-w-3xl"}`}>
      <div className="py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4 text-[15px]">
        <FooterLive />
        <div className="flex gap-5 text-muted-foreground">
          <a href="https://www.linkedin.com/in/agrawal-archit" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href="https://github.com/architagrawal" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
          <a href="/Archit_Agrawal_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Resume</a>
        </div>
      </div>
      <p className="mt-6 font-tech text-xs text-muted-foreground">
        © {new Date().getFullYear()} Archit Agrawal, Phoenix, Arizona. <Link href="/" className="hover:text-foreground">Home</Link>
      </p>
      </div>
    </footer>
  );
}
