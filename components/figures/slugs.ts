/* Projects that have their own figure. Plain module so server components can ask too. */
const SLUGS = new Set([
  "survey-agents",
  "prismsplit",
  "aijockey",
  "clash-royale-clan-analytics-platform",
  "srp-electric-mcp-server",
  "mcp-based-github-pr-review-automation-agent",
  "no-code-pipeline-builder",
  "image-recognition-as-a-service",
  "reverse-mode-automatic-differentiation",
  "survey-intelligence-platform",
]);

export const hasFigure = (slug: string) => SLUGS.has(slug);

type BBox = [x: number, y: number, w: number, h: number];

/* Each drawing's still-pose bounding box on the 400 x 320 canvas, large and small variants,
   measured with svg.getBBox() under reduced motion. Re-measure after editing a figure. */
const BOUNDS: Record<string, { lg: BBox; sm: BBox }> = {
  "survey-agents": { lg: [83.5, 58.2, 233.1, 256.4], sm: [83.5, 58.2, 233.1, 256.4] },
  prismsplit: { lg: [77.1, 97.3, 245.8, 155.3], sm: [77.1, 97.3, 245.8, 155.3] },
  aijockey: { lg: [58, 54.9, 286.1, 211.8], sm: [58, 54.9, 286.1, 211.8] },
  "clash-royale-clan-analytics-platform": { lg: [65.5, 39, 269, 237], sm: [65.5, 39, 269, 237] },
  "srp-electric-mcp-server": { lg: [92.2, 76, 211.7, 176.7], sm: [92.2, 76, 211.7, 176.7] },
  "mcp-based-github-pr-review-automation-agent": { lg: [50, 73.5, 328.6, 173.2], sm: [50, 74.6, 300, 173.2] },
  "no-code-pipeline-builder": { lg: [50, 101.9, 300, 173.2], sm: [50, 101.9, 300, 173.2] },
  "image-recognition-as-a-service": { lg: [89.4, 114.9, 249.4, 142.9], sm: [89.4, 114.9, 249.4, 123.4] },
  "reverse-mode-automatic-differentiation": { lg: [79.6, 76.7, 236.6, 153.7], sm: [50, 78.1, 265, 164.5] },
  "survey-intelligence-platform": { lg: [112.4, 49.3, 171.8, 208.8], sm: [112.4, 80.3, 171.8, 177.9] },
};

const W = 400;
const H = 320;

/* Large: keep the scale, centre the drawing. Small: centre it and scale so its longer side
   fills 75% of the 5:4 frame. */
export function figureViewBox(slug: string, small: boolean): string {
  const b = BOUNDS[slug];
  if (!b) return `0 0 ${W} ${H}`;
  const [x, y, w, h] = small ? b.sm : b.lg;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const vw = small ? Math.max(w, (h * W) / H) / 0.75 : W;
  const vh = (vw * H) / W;
  const r = (n: number) => Math.round(n * 10) / 10;
  return `${r(cx - vw / 2)} ${r(cy - vh / 2)} ${r(vw)} ${r(vh)}`;
}
