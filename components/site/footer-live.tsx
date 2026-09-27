"use client";

import { useEffect, useState } from "react";

const EMAIL = "architagrawal000@gmail.com";

/* Local time in Phoenix and a copy-email button */
export function FooterLive() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Phoenix" });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(t);
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a href={`mailto:${EMAIL}`} className="link-grow pb-0.5 font-bold text-primary">
        {EMAIL}
      </a>
      <button onClick={copy} className="rounded-lg bg-card px-2.5 py-1 text-xs font-bold text-muted-foreground shadow-soft transition-colors hover:text-primary">
        {copied ? "Copied" : "Copy"}
      </button>
      {time && <span className="text-sm text-muted-foreground">It&apos;s {time} in Phoenix right now.</span>}
    </div>
  );
}
