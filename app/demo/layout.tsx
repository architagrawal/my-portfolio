import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;700&family=Caveat:wght@400;600&family=Kalam:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
