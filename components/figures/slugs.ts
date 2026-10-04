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
