import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Survey Agents — Case Study",
  description:
    "A five-agent pipeline that turns a raw survey export into coded responses, tool-computed facts and charts. The design decisions, the prior art behind them, and what 40 recorded experiments actually measured.",
  alternates: { canonical: "/work/survey-agents" },
  openGraph: {
    title: "Survey Agents — Case Study | Archit Agrawal",
    description:
      "Everything is an agent, every deterministic operation is a tool. Five gated stages, zero destroyed labels, and the measurement that showed the model pin matters thirty times more than the architecture.",
    url: "/work/survey-agents",
    type: "article",
  },
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
