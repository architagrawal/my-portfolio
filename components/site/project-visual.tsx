import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { BumpChart, Crossfade, FindingsBars } from "@/components/soft/drawings";
import { HairlineFigure } from "@/components/site/hairline-figure";

/* The picture for a featured project: the real screenshot, or a small drawing of what it does.
   With a hairline figure, hovering the card swaps the picture for the figure, which follows the pointer. */
export function ProjectVisual({ p, tall = false }: { p: Project; tall?: boolean }) {
  const h = tall ? "h-72" : "h-48";
  const still = <Still p={p} h={h} />;
  if (!p.figure) return still;
  return (
    <div className={`relative ${h} overflow-hidden`}>
      <div className="transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">{still}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-card opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {/* figures draw at 5:4, so width is 1.25x the box height */}
        <HairlineFigure name={p.figure} label={`${p.title}, interactive figure`} className={tall ? "w-[22.5rem]" : "w-60"} />
      </div>
    </div>
  );
}

function Still({ p, h }: { p: Project; h: string }) {
  if (p.visual === "appshot") {
    return <Image src="/prismsplit-app.jpg" alt={`${p.title} app screens`} width={1000} height={620} className={`${h} w-full object-cover object-top`} />;
  }
  const art = p.visual === "agents" ? <FindingsBars /> : p.visual === "audio" ? <Crossfade /> : p.visual === "analytics" ? <BumpChart /> : null;
  if (!art) return null;
  return (
    <div className={`flex ${h} items-center justify-center bg-gradient-to-br from-muted/60 to-card px-8`}>
      {/* drawings are sized for a card; wider and their labels balloon */}
      <div className="w-full max-w-[24rem]">{art}</div>
    </div>
  );
}
