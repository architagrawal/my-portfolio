"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Linkedin, MapPin } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { label: "Resume", href: "/Archit_Agrawal_Resume.pdf" },
  { label: "GitHub", href: "https://github.com/architagrawal", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/agrawal-archit", icon: Linkedin },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "architagrawal000@gmail.com";
  const reduce = useReducedMotion();

  // Saffron block wipes up over the dark page as it scrolls into view
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 95%", "start 45%"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-20">
        <Marquee items={["Let's Talk", "Open to Work", "Ship It", "AI/ML", "Full-Stack"]} />
      </div>

      <motion.div
        ref={blockRef}
        style={reduce ? undefined : { clipPath }}
        className="relative left-1/2 -translate-x-1/2 w-screen mb-20 bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display uppercase tracking-wide leading-[0.95]">
            Let&apos;s Work Together
          </h2>
          <p className="mt-6 text-lg sm:text-xl opacity-90 max-w-2xl mx-auto font-light">
            Got a project, a role, or just want to talk shop? I&apos;m always up for building something worth shipping.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <p className="font-tech text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Drop me a line
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={`mailto:${email}`}
            className="font-tech font-semibold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-foreground break-all border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors pb-1"
          >
            {email}
          </a>
          <button
            onClick={copyToClipboard}
            title="Copy email to clipboard"
            aria-label={copied ? "Email copied" : "Copy email to clipboard"}
            className="w-11 h-11 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          USA · open to relocation anywhere · AI/ML and full-stack roles
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          {links.map(({ label, href }) => (
            <Magnetic key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                {label}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
