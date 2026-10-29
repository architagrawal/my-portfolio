import type { Metadata } from "next";
import { PageHeader, Shell } from "@/components/site/shell";
import { LabGame } from "@/components/site/lab-game";
import { pageMeta } from "@/app/metadata";

export const metadata: Metadata = pageMeta({
  title: "Lab notebook",
  description: "The hardest problems Archit Agrawal has solved across AI agents, audio and mobile, each with a measured result.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <Shell
      header={
        <PageHeader eyebrow="Lab notebook" title="The hard parts.">
          The problems that took the longest to crack, and the number that says they are solved.
        </PageHeader>
      }
    >
      <div className="mt-8">
        <LabGame />
      </div>
    </Shell>
  );
}
