"use client";

import type { ComponentType } from "react";
import { AiJockeyFigure } from "./projects/aijockey";
import { AutodiffFigure } from "./projects/autodiff";
import { ClashRoyaleFigure } from "./projects/clash-royale";
import { ImageRecognitionFigure } from "./projects/image-recognition";
import { PipelineBuilderFigure } from "./projects/pipeline-builder";
import { PrReviewFigure } from "./projects/pr-review";
import { PrismSplitFigure } from "./projects/prismsplit";
import { SrpElectricFigure } from "./projects/srp-electric";
import { SurveyAgentsFigure } from "./projects/survey-agents";
import { SurveyIntelligenceFigure } from "./projects/survey-intelligence";

type FigureProps = { label: string; className?: string; small?: boolean };

/* One drawing per project, keyed by slug */
const FIGURES: Record<string, ComponentType<FigureProps>> = {
  "survey-agents": SurveyAgentsFigure,
  prismsplit: PrismSplitFigure,
  aijockey: AiJockeyFigure,
  "clash-royale-clan-analytics-platform": ClashRoyaleFigure,
  "srp-electric-mcp-server": SrpElectricFigure,
  "mcp-based-github-pr-review-automation-agent": PrReviewFigure,
  "no-code-pipeline-builder": PipelineBuilderFigure,
  "image-recognition-as-a-service": ImageRecognitionFigure,
  "reverse-mode-automatic-differentiation": AutodiffFigure,
  "survey-intelligence-platform": SurveyIntelligenceFigure,
};

export function ProjectFigure({
  slug,
  title,
  className,
  small = false,
}: {
  slug: string;
  title: string;
  className?: string;
  /* the ~7.5rem card-row size: fewer, bolder parts */
  small?: boolean;
}) {
  const Figure = FIGURES[slug];
  if (!Figure) return null;
  return <Figure label={`${title}, animated drawing`} className={className} small={small} />;
}
