import { NextResponse } from "next/server";

// Re-fetch from GitHub at most once a day
export const revalidate = 86400;

const LOGIN = "architagrawal";

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

export interface ActivityDay {
  date: string;
  count: number;
}

export interface Activity {
  total: number;
  privateCount: number;
  days: ActivityDay[];
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 503 });
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
    next: { revalidate },
  });
  if (!res.ok) {
    return NextResponse.json({ error: `GitHub responded ${res.status}` }, { status: 502 });
  }

  const json = await res.json();
  const collection = json.data?.user?.contributionsCollection;
  if (!collection) {
    return NextResponse.json({ error: "No contribution data" }, { status: 502 });
  }

  const activity: Activity = {
    total: collection.contributionCalendar.totalContributions,
    privateCount: collection.restrictedContributionsCount,
    days: collection.contributionCalendar.weeks.flatMap(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    ),
  };
  return NextResponse.json(activity);
}
