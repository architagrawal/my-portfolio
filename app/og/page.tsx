import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Share card", robots: { index: false, follow: false } };

/* Source for public/og-card.png, the preview shown when the link is shared.
   To regenerate: open /og, scroll to top, screenshot the viewport, then crop the top-left
   2400x1260 (2x) and downscale to 1200x630. sips -c crops from the centre, so crop with PIL. */
export default function OgCard() {
  const stats = [
    ["12", "agents in production"],
    ["347k", "lines of code"],
    ["4,845", "tests"],
  ];
  return (
    <div id="og-card" className="relative h-[630px] w-[1200px] overflow-hidden bg-[#0a0e1a] font-sans text-white">
      {/* portrait fills the right side and fades into the background */}
      <div className="absolute inset-y-0 right-0 w-[500px]">
        <Image src="/archit-profile.webp" alt="" fill priority sizes="500px" className="object-cover" style={{ objectPosition: "42% 20%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #0a0e1a 0%, rgba(10,14,26,0.85) 18%, rgba(10,14,26,0) 55%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(0deg, #0a0e1a, rgba(10,14,26,0))" }} />
      </div>
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22), transparent 65%)" }} />

      <div className="relative flex h-full w-[760px] flex-col justify-center pl-[80px]">
        <div>
          <p className="text-[24px] font-bold uppercase tracking-[0.14em] text-[#60a5fa]">AI Software Engineer</p>
          <p className="mt-4 font-[family-name:var(--font-space)] text-[96px] font-bold leading-[0.95] tracking-[-0.035em]">
            Archit
            <br />
            Agrawal
          </p>
          <p className="mt-6 text-[32px] leading-snug text-white/80">Ships AI agents to production at ASU.</p>
        </div>
        <div className="mt-12">
          <div className="grid w-[620px] grid-cols-3 gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p className="font-[family-name:var(--font-space)] text-[46px] font-bold leading-none">{n}</p>
                <p className="mt-2 text-[19px] text-white/60">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[20px] font-semibold text-[#60a5fa]">agrawal-archit.vercel.app</p>
        </div>
      </div>
    </div>
  );
}
