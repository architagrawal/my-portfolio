import type { ReactNode } from "react";

export const THEMES = ["midnight", "graphite", "ember", "forest", "steel"] as const;
export type ThemeName = (typeof THEMES)[number];

/* Copy that changes with the design. Every variant is rendered and CSS shows the one matching
   <html data-theme>, so the server and client agree and nothing flashes. midnight is the fallback. */
export function ThemeText({ v }: { v: Record<ThemeName, ReactNode> }) {
  return (
    <>
      {THEMES.map((t) => (
        <span key={t} className={`tt tt-${t}`}>
          {v[t]}
        </span>
      ))}
    </>
  );
}
