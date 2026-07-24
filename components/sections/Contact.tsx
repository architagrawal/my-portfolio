import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Contact" title="Get in touch" />

        <div className="grid gap-10 border-t border-border pt-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="max-w-2xl text-xl leading-relaxed sm:text-2xl">
              If my experience is relevant to a role or engineering problem on
              your team, email is the simplest way to reach me.
            </p>
            <a
              href="mailto:architagrawal000@gmail.com"
              className="mt-8 inline-flex items-center gap-3 text-lg underline decoration-border underline-offset-4 hover:decoration-primary sm:text-2xl"
            >
              architagrawal000@gmail.com
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">New York metro area</p>
            <a
              href="mailto:architagrawal000@gmail.com"
              className="flex items-center gap-2 hover:text-primary"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href="https://github.com/architagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/agrawal-archit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="/Archit_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <ArrowUpRight className="h-4 w-4" /> Résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
