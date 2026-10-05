/* GitHub contribution calendar, fetched once at build time and baked into the static pages.
   With GITHUB_TOKEN set it uses the GraphQL API (which also reports the private count);
   without one it reads the public contributions calendar. Any failure returns null, and the
   pages leave the section out rather than show an empty box. */

const LOGIN = "architagrawal";

export interface ActivityDay {
  date: string;
  count: number;
}

export interface Activity {
  total: number;
  privateCount: number | null;
  days: ActivityDay[];
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

async function fromGraphql(token: string): Promise<Activity | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
    cache: "force-cache",
  });
  if (!res.ok) return null;
  const c = (await res.json()).data?.user?.contributionsCollection;
  if (!c) return null;
  return {
    total: c.contributionCalendar.totalContributions,
    privateCount: c.restrictedContributionsCount,
    days: c.contributionCalendar.weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    ),
  };
}

/* The public calendar: one cell per day (id + data-date) and a tooltip per cell with the count */
async function fromPublic(): Promise<Activity | null> {
  const res = await fetch(`https://github.com/users/${LOGIN}/contributions`, { cache: "force-cache" });
  if (!res.ok) return null;
  const html = await res.text();
  const dates = new Map<string, string>();
  for (const m of Array.from(html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"/g))) dates.set(m[2], m[1]);
  const days: ActivityDay[] = [];
  for (const m of Array.from(html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</g))) {
    const date = dates.get(m[1]);
    if (!date) continue;
    const n = m[2].match(/^([\d,]+) contribution/);
    days.push({ date, count: n ? parseInt(n[1].replace(/,/g, ""), 10) : 0 });
  }
  if (days.length < 300) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = html.match(/([\d,]+)\s+contributions\s+in the last year/);
  return {
    total: total ? parseInt(total[1].replace(/,/g, ""), 10) : days.reduce((s, d) => s + d.count, 0),
    privateCount: null,
    days,
  };
}

let cached: Promise<Activity | null> | null = null;

export function getActivity(): Promise<Activity | null> {
  cached ??= (async () => {
    try {
      const token = process.env.GITHUB_TOKEN;
      return (token && (await fromGraphql(token))) || (await fromPublic());
    } catch {
      return null;
    }
  })();
  return cached;
}
