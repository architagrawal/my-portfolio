import type { ReactNode } from "react";

/* The one filled action on a page. Lifts a pixel on hover, settles on press (.ui-btn in globals.css). */
export function PushButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="ui-btn">
      {children}
    </a>
  );
}

export function PushAction({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="ui-btn">
      {children}
    </button>
  );
}
