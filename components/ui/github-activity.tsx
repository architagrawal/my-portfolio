"use client";

import { useMemo, useState } from "react";
import type { Activity, ActivityDay } from "@/lib/github-activity";

// Fill steps for nonzero days; zero days use the muted fill
const LEVELS = ["bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"];

const fmtDay = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const fmtMonth = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/* Quartile cut points over nonzero days, so one huge day doesn't wash out the rest */
function thresholds(days: ActivityDay[]): number[] {
  const counts = days.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
  if (!counts.length) return [1, 1, 1];
  const q = (p: number) => counts[Math.floor(p * (counts.length - 1))];
  return [q(0.25), q(0.5), q(0.75)];
}

/* data is fetched at build time (lib/github-activity) and passed in; callers skip the section when it is null */
export function GithubActivity({ data }: { data: Activity }) {
  const [hovered, setHovered] = useState<ActivityDay | null>(null);
  const cuts = useMemo(() => thresholds(data.days), [data]);

  const level = (count: number) => {
    if (count === 0) return "bg-foreground/[0.07]";
    const i = cuts.findIndex((c) => count <= c);
    return LEVELS[i === -1 ? 3 : i];
  };

  // Pad the first column so each row is a fixed weekday (Sunday on top)
  const lead = new Date(data.days[0].date + "T00:00:00Z").getUTCDay();
  const weeks = Math.ceil((lead + data.days.length) / 7);
  const activeDays = data.days.filter((d) => d.count > 0).length;
  const first = data.days[0].date;
  const last = data.days[data.days.length - 1].date;

  return (
    <div>
      <p className="t-meta min-h-[1.5rem]" aria-live="polite">
        {hovered ? (
          <>
            <span className="text-foreground">{fmtDay(hovered.date)}</span>: {hovered.count}{" "}
            {hovered.count === 1 ? "contribution" : "contributions"}
          </>
        ) : (
          <>
            <span className="text-foreground">{data.total.toLocaleString()} contributions</span> in the
            last year, active on {activeDays} days.
          </>
        )}
      </p>

      <div
        role="img"
        aria-label={`GitHub activity: ${data.total} contributions between ${fmtDay(first)} and ${fmtDay(last)}`}
        className="mt-4 grid grid-flow-col gap-[2px] sm:gap-[3px]"
        // Inline because this Tailwind version has no grid-rows-7
        style={{
          gridTemplateRows: "repeat(7, auto)",
          gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {Array.from({ length: lead }, (_, i) => (
          <span key={`pad-${i}`} aria-hidden="true" />
        ))}
        {data.days.map((d) => (
          <span
            key={d.date}
            aria-hidden="true"
            onMouseEnter={() => setHovered(d)}
            className={`aspect-square rounded-[2px] ${level(d.count)} hover:outline hover:outline-1 hover:outline-foreground`}
          />
        ))}
      </div>

      <div className="t-meta mt-3 flex justify-between !text-[13px]">
        <span>{fmtMonth(first)}</span>
        <span className="flex gap-6">
          <a href="/api/github-activity.json" target="_blank" rel="noopener noreferrer" className="rounded-sm transition-colors hover:text-primary">
            Raw data
          </a>
          <span>{fmtMonth(last)}</span>
        </span>
      </div>
    </div>
  );
}
