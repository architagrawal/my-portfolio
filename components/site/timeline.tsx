import Link from "next/link";
import { roles } from "@/lib/data/experience";

/* "Sept 2023" -> 2023.67; "Present" -> now */
function toYear(s: string) {
  const y = s.match(/\d{4}/);
  if (!y) return new Date().getFullYear() + new Date().getMonth() / 12;
  const m = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].findIndex((k) => s.toLowerCase().includes(k));
  return Number(y[0]) + Math.max(m, 0) / 12;
}

/* one row per role, newest first: the role and company on the left, its span on a shared year axis */
export function Timeline() {
  const spans = roles.map((r) => {
    const [a, b = "Present"] = r.period.split(/\s+[–-]\s+/);
    return { r, start: toYear(a), end: toYear(b) };
  });
  const lo = Math.floor(Math.min(...spans.map((x) => x.start)));
  const hi = Math.max(...spans.map((x) => x.end));
  /* total time worked, overlaps counted once, floored to the half year */
  let total = 0;
  let reach = -Infinity;
  for (const { start, end } of [...spans].sort((x, y) => x.start - y.start)) {
    total += Math.max(0, end - Math.max(start, reach));
    reach = Math.max(reach, end);
  }
  const years = Math.floor(total * 2) / 2;
  const pct = (y: number) => ((y - lo) / (hi - lo)) * 100;
  const ticks = Array.from({ length: Math.floor(hi) - lo + 1 }, (_, i) => lo + i);
  const grid = "grid grid-cols-[minmax(0,1fr)] gap-x-6 sm:grid-cols-[15rem_minmax(0,1fr)]";
  return (
    <div>
      <p className="mb-6 flex items-baseline gap-3">
        <span className="t-stat text-primary tabular-nums">{years}+</span>
        <span className="t-meta">years of work, {roles.length} roles</span>
      </p>
      <ul>
        {spans.map(({ r, start, end }) => (
          <li key={r.slug}>
            <Link href={`/work/${r.slug}`} className={`group ${grid} items-center py-2`}>
              <span className="min-w-0 text-[15px] leading-snug">
                <span className="ui-link-label block truncate font-semibold">{r.companyShort}</span>
                <span className="block truncate text-muted-foreground">{r.role}</span>
              </span>
              <span className="relative mt-1.5 block h-2.5 rounded-full bg-[hsl(var(--foreground)/0.06)] sm:mt-0">
                <span
                  className="absolute inset-y-0 rounded-full bg-primary transition-opacity group-hover:opacity-80"
                  style={{ left: `${pct(start)}%`, width: `max(${pct(end) - pct(start)}%, 6px)` }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`${grid} t-meta mt-1`}>
        <span className="hidden sm:block" />
        <span className="relative h-5">
          {ticks.map((y) => (
            <span key={y} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${pct(y)}%` }}>
              {y}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
