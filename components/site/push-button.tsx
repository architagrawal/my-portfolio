import type { ReactNode } from "react";

/* A raised button that sinks when pressed (after Josh Comeau's "pushable" button) */
const TONES = {
  violet: { base: "bg-[hsl(var(--primary-deep))]", face: "bg-primary text-primary-foreground" },
  pink: { base: "bg-[hsl(var(--secondary-deep))]", face: "bg-secondary text-secondary-foreground" },
  white: { base: "bg-border", face: "bg-card text-foreground" },
} as const;

type Tone = keyof typeof TONES;

function Face({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`block -translate-y-1 rounded-xl px-6 py-3 text-[16px] font-bold transition-transform duration-150 ease-out group-hover:-translate-y-1.5 group-active:-translate-y-0.5 ${TONES[tone].face}`}
    >
      {children}
    </span>
  );
}

export function PushButton({ href, tone = "violet", children }: { href: string; tone?: Tone; children: ReactNode }) {
  return (
    <a href={href} className={`group relative inline-block rounded-xl outline-offset-4 ${TONES[tone].base}`}>
      <Face tone={tone}>{children}</Face>
    </a>
  );
}

export function PushAction({ onClick, tone = "violet", children }: { onClick: () => void; tone?: Tone; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`group relative inline-block rounded-xl outline-offset-4 ${TONES[tone].base}`}>
      <Face tone={tone}>{children}</Face>
    </button>
  );
}
