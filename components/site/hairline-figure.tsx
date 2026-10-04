"use client";

import * as Hairline from "@lucasmarkes/hairline/react";
import type { FigureName } from "@/lib/data/projects";

/* One hairline figure, tinted to the site palette through its custom properties */
export function HairlineFigure({ name, label, className = "" }: { name: FigureName; label: string; className?: string }) {
  const Figure = Hairline[name];
  return <Figure label={label} intensity={0.7} className={`hairline-site ${className}`} />;
}
