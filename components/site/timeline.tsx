import Link from "next/link";
import { roles } from "@/lib/data/experience";

/* "Sept 2023" -> 2023.67; "Present" -> now */
function toYear(s: string) {
  const y = s.match(/\d{4}/);
  if (!y) return new Date().getFullYear() + new Date().getMonth() / 12;
  const m = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].findIndex((k) => s.toLowerCase().includes(k));
  return Number(y[0]) + Math.max(m, 0) / 12;
}

/* every role as a bar on one time axis; overlapping roles stack into lanes */
export function Timeline() {
  const spans = roles
    .map((r) => {
      const [a, b = "Present"] = r.period.split(/\s+[–-]\s+/);
      return { r, start: toYear(a), end: toYear(b) };
    })
    .sort((x, y) => x.start - y.start);
  const lo = Math.floor(spans[0].start);
  const hi = Math.max(...spans.map((x) => x.end));
  const lanes: number[] = [];
  const placed = spans.map((x) => {
    let lane = lanes.findIndex((end) => end <= x.start);
    if (lane < 0) lane = lanes.length;
    lanes[lane] = x.end;
    return { ...x, lane };
  });
  const pct = (y: number) => ((y - lo) / (hi - lo)) * 100;
  const years = Array.from({ length: Math.floor(hi) - lo + 1 }, (_, i) => lo + i);
  return (
    <div>
      <div className="relative" style={{ height: `${lanes.length * 2.75}rem` }}>
        {placed.map(({ r, start, end, lane }) => (
          <Link
            key={r.slug}
            href={`/work/${r.slug}`}
            title={`${r.role} at ${r.companyShort}`}
            className="group absolute flex h-9 items-center overflow-hidden rounded-md bg-[hsl(var(--primary)/0.22)] px-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            style={{ left: `${pct(start)}%`, width: `calc(${pct(end) - pct(start)}% - 3px)`, top: `${lane * 2.75}rem` }}
          >
            {pct(end) - pct(start) > 8 && <span className="truncate">{r.companyShort}</span>}
          </Link>
        ))}
      </div>
      <div className="t-meta relative mt-2 h-5">
        {years.map((y) => (
          <span key={y} className="absolute tabular-nums" style={{ left: `${pct(y)}%` }}>
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}
