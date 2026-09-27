import type { ReactNode } from "react";

/* Plain wrapper kept so pages keep their structure; content no longer animates in */
export function Reveal({ children, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}
