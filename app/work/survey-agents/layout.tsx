import type { Metadata } from "next";
import { OG_IMAGE } from "@/app/metadata";

export const metadata: Metadata = {
  title: "Survey Agents - Case Study",
  description:
    "A twelve-agent analytics platform that answers statistical and causal questions on any table and checks every answer: 85% fewer wrong answers, 68% on StatQA.",
  alternates: { canonical: "/work/survey-agents" },
  openGraph: {
    title: "Survey Agents - Case Study | Archit Agrawal",
    description:
      "Ask any dataset a question and get an answer you can make a decision on: every number computed by code and checked before it is shown. 85% fewer wrong answers, 68% on StatQA.",
    url: "/work/survey-agents",
    type: "article",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: "Survey Agents - Case Study | Archit Agrawal", images: [OG_IMAGE.url] },
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
