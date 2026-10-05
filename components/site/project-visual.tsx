import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { BumpChart, Crossfade, FindingsBars } from "@/components/soft/drawings";
import { ProjectFigure } from "@/components/figures";
import { hasFigure } from "@/components/figures/slugs";

/* The card shows the project's own animated figure. The detail page shows the figure beside
   the real material: the app screenshot, or the drawing of results. */
export function ProjectVisual({ p, tall = false }: { p: Project; tall?: boolean }) {
  const h = tall ? "h-72" : "h-48";
  const figure = hasFigure(p.slug) ? (
    <div className={`flex ${h} items-center justify-center px-6`}>
      <ProjectFigure slug={p.slug} title={p.title} className="h-full" />
    </div>
  ) : null;
  if (!tall) return figure ?? <Still p={p} h={h} />;
  const still = <Still p={p} h={h} />;
  if (!figure) return still;
  if (!p.visual) return figure;
  return (
    <div className="grid sm:grid-cols-2">
      {figure}
      {still}
    </div>
  );
}

function Still({ p, h }: { p: Project; h: string }) {
  if (p.visual === "appshot") {
    return (
      <Image
        src="/prismsplit-app.jpg"
        alt={`${p.title} app screens`}
        width={1000}
        height={620}
        className={`${h} w-full object-cover object-top`}
      />
    );
  }
  const art =
    p.visual === "agents" ? (
      <FindingsBars />
    ) : p.visual === "audio" ? (
      <Crossfade />
    ) : p.visual === "analytics" ? (
      <BumpChart />
    ) : null;
  if (!art) return null;
  return (
    <div className={`flex ${h} items-center justify-center px-8`}>
      {/* drawings are sized for a card; wider and their labels balloon */}
      <div className="w-full max-w-[24rem]">{art}</div>
    </div>
  );
}
