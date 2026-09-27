import Link from "next/link";
import { PageHeader, Shell } from "@/components/site/shell";

export default function NotFound() {
  return (
    <Shell>
      <PageHeader eyebrow="404" title="This page doesn't exist">
        The link may be old. Everything lives in{" "}
        <Link href="/work" className="text-foreground underline decoration-border underline-offset-[6px] hover:decoration-primary">
          Work
        </Link>
        ,{" "}
        <Link href="/projects" className="text-foreground underline decoration-border underline-offset-[6px] hover:decoration-primary">
          Projects
        </Link>{" "}
        and{" "}
        <Link href="/" className="text-foreground underline decoration-border underline-offset-[6px] hover:decoration-primary">
          the home page
        </Link>
        .
      </PageHeader>
    </Shell>
  );
}
