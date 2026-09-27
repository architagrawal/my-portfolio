import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { BumpChart, Crossfade, FindingsBars } from "@/components/soft/drawings";

/* The picture for a featured project: the real screenshot, or a small drawing of what it does */
export function ProjectVisual({ p, tall = false }: { p: Project; tall?: boolean }) {
  const h = tall ? "h-72" : "h-48";
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
