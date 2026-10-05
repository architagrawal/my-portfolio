import { PageHeader, Shell } from "@/components/site/shell";
import { TextLink } from "@/components/site/ui";

export default function NotFound() {
  return (
    <Shell header={<PageHeader eyebrow="404" title="This page doesn't exist">The link may be old.</PageHeader>}>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {[
          ["Home", "/"],
          ["Work", "/work"],
          ["Projects", "/projects"],
          ["Lab", "/lab"],
        ].map(([label, href]) => (
          <li key={href}>
            <TextLink href={href}>{label}</TextLink>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
