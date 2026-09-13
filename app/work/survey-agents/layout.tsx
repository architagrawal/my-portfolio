import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survey Agents - Case Study",
  description:
    "How a ten-agent survey-analysis platform achieved deterministic reporting, zero destroyed labels, and reproducible answers - and what 40 experiments showed about its cost and accuracy.",
  alternates: { canonical: "/work/survey-agents" },
  openGraph: {
    title: "Survey Agents - Case Study | Archit Agrawal",
    description:
      "Five gated stages, zero destroyed labels, reproducible answers, and the experiment that showed model choice mattered more than architecture for accuracy.",
    url: "/work/survey-agents",
    type: "article",
  },
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
