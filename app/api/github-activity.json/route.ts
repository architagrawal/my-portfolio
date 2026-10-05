import { NextResponse } from "next/server";
import { getActivity } from "@/lib/github-activity";

// Static export: written to out/api/github-activity at build time, the raw data behind the calendar
export const dynamic = "force-static";

export async function GET() {
  const data = await getActivity();
  return NextResponse.json(data ?? { error: "No contribution data at build time" });
}
