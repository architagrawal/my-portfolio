"use client";

import { useState } from "react";

const EMAIL = "architagrawal000@gmail.com";

/* For people without a mail app set up: one click puts the address on the clipboard */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard?.writeText(EMAIL).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          },
          () => {},
        )
      }
      className={className}
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
