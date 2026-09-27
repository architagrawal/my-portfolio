import type { Metadata } from "next";
import { PageHeader, Shell } from "@/components/site/shell";
import { LabGame } from "@/components/site/lab-game";
import { ThemeText } from "@/components/site/theme-text";

export const metadata: Metadata = {
  title: "Lab notebook",
  description: "The hardest problems Archit Agrawal has solved across AI agents, audio and mobile, each with a measured result.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <Shell>
      <PageHeader eyebrow="Lab notebook" title={<ThemeText v={{ midnight: "The hard parts.", graphite: "Hard problems, solved.", ember: "The hard parts.", forest: "Problems worth the time.", steel: "Technical highlights" }} />}>
        The problems that took the longest to crack, and the number that says they are solved.
      </PageHeader>
      <div className="mt-12">
        <LabGame />
      </div>
    </Shell>
  );
}
