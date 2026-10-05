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
    <div className="mt-3">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <a href={`mailto:${EMAIL}`} className="ui-link t-h3 break-all !text-foreground transition-colors hover:!text-primary">
          <span className="ui-link-label">{EMAIL}</span>
        </a>
        <button onClick={copy} aria-live="polite" className="text-[15px] font-semibold text-primary transition-opacity hover:opacity-80">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="t-meta mt-2 min-h-[1.5em]">{time && <>{time} in Phoenix right now</>}</p>
    </div>
  );
}
