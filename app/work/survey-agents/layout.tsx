import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survey Agents - Case Study",
  description:
    "How a twelve-agent data-analysis platform reads any table, answers statistical and causal questions, and checks every answer before showing it, measured against StatQA, QRData, BLADE and Claude Opus 5.5 working blind.",
  alternates: { canonical: "/work/survey-agents" },
  openGraph: {
    title: "Survey Agents - Case Study | Archit Agrawal",
    description:
      "Ask any dataset a question and get an answer you can make a decision on: every number computed by code and checked before it is shown. 85% fewer wrong answers, 68% on StatQA.",
    url: "/work/survey-agents",
    type: "article",
  },
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
