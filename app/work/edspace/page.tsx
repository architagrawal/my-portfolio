import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Shell } from "@/components/site/shell";
import { Chips, NextLink, Points, Section, Stats } from "@/components/site/ui";
import { projectBySlug } from "@/lib/data/projects";
import { Film } from "./_film";

export const metadata: Metadata = {
  title: "EdSpace - Case Study",
  description:
    "A live map of the EdPlus office: find your people, book a room in three taps, and make your desk your own in 3D. Built in two days, going live for 500+ people.",
  alternates: { canonical: "/work/edspace" },
  openGraph: {
    title: "EdSpace - Case Study | Archit Agrawal",
    description:
      "A live office map with room booking, walking routes and a 3D desk per person. Built in two days, going live for 500+ people at EdPlus.",
    url: "/work/edspace",
    type: "article",
  },
};

const stats: [string, string][] = [
  ["500+", "people at launch"],
  ["2 days", "first commit to demo"],
  ["320", "desks across 16 teams"],
  ["240", "tests"],
];

/* The demo people in these screenshots are made up; the seed script checks them against the
   real seating charts so no real name appears. */
const tour = [
  {
    src: "/edspace/home.webp",
    title: "Start at your desk",
    text: "Your 3D desk is the home page, with today at a glance: when rooms open, your seat, your next booking.",
  },
  {
    src: "/edspace/map.webp",
    title: "The whole floor, live",
    text: "37 rooms, 320 desks and 16 team areas. Seats show who is in, rooms show who booked them, and exits, AEDs and printers appear as building signs.",
  },
  {
    src: "/edspace/teammate-route.webp",
    title: "Find a teammate, walk over",
    text: "Search anyone, see their week, and get a walking route that goes around rooms and desk pods, never through them.",
  },
  {
    src: "/edspace/room.webp",
    title: "Book in three taps",
    text: "Pick a time on the day's strip, then add a title and invitees like Outlook. If nobody checks in within 10 minutes, the room frees itself.",
  },
  {
    src: "/edspace/desk.webp",
    title: "Make your desk yours",
    text: "Decorate it in 3D, pin notes and photos, leave a teammate a note. Headphones on the desk set you to Do not disturb.",
  },
];

const features: [string, string][] = [
  ["Floor map", "See every room and desk, search anyone by name, see where each team sits"],
  ["Directions", "Walk to any room or desk, find the nearest exit, see the walk time"],
  ["Rooms", "Find a free room now, book in three taps, pick by size or screen"],
  ["Meetings", "Invite people by name, see who is away that day, no-shows free the room"],
  ["Room care", "Report a broken screen, see it on the map, say if a room is too cold"],
  ["Desks", "Claim your own desk, book a hot desk, sit near your team"],
  ["3D desk", "Decorate in 3D, pin notes and photos, leave teammates a note"],
  ["People", "See who is in today, plan your office days, share your status"],
  ["Facilities", "Edit the floor plan, add rooms, desks and signs, track broken equipment"],
];

const build = [
  "No framework: Vite and plain JavaScript, Leaflet (a web map library) drawing the floor as vector shapes traced from the real plan, and three.js for the 3D desks.",
  "Zero runtime dependencies in the API: Node's built-in HTTP server and SQLite, one database file, two commands to run it.",
  "Walking routes: a grid pathfinder over the walkable floor only, so a route never cuts through a room, a desk pod or a gap narrower than a person.",
  "Rooms free themselves: check-in opens 5 minutes before a booking and closes 10 after. No-shows are cleared whenever bookings are read, so there are no timers to run.",
  "Safe photo uploads: the browser re-encodes every photo to strip its location data, and the server checks the file's real type, caps it at 2 MB and never accepts SVG.",
  "Made for everyone: Atkinson Hyperlegible (a typeface designed for low vision) for body text, WCAG AA contrast, and safety signs coloured like the building's own.",
  "The film is the app: the 3D floor, captions and soundtrack are rendered by the app itself, then exported frame by frame to video.",
  "Tested: 240 tests across the API, the web app and the shared floor model.",
];

const tools = projectBySlug("edspace")?.technologies ?? [];

export default function EdSpaceCaseStudy() {
  return (
    <Shell
      header={
        <PageHeader eyebrow="Case study, 2026, EdPlus hackathon" title="EdSpace">
          A live map of the EdPlus office: find your people, book a room in three taps, and make
          your desk your own in 3D.
        </PageHeader>
      }
    >
      <div className="pt-10">
        <p className="t-body max-w-[40rem] text-muted-foreground">
          Built in two days for Prhacktical, the EdPlus hackathon, for the 500+ people at the
          SkySong 3 office. Shown to EdPlus leadership, including the CEO, chairman, vice
          chairman and department head, and now going live for the whole office, with a wider
          rollout planned.
        </p>

        <figure className="mt-12">
          <Film />
          <figcaption className="t-meta mt-3">
            The launch film, 92 seconds. Sound on.
          </figcaption>
        </figure>

        <Stats className="mt-14" items={stats} />

        <Section title="A day in it" count={tour.length}>
          <div className="space-y-16">
            {tour.map((s, i) => (
              <figure key={s.src}>
                <Image
                  src={s.src}
                  alt={`EdSpace: ${s.title}`}
                  width={1600}
                  height={1000}
                  className="w-full rounded-2xl"
                />
                <figcaption className="mt-4 max-w-[36rem]">
                  <span className="t-h3 block">
                    <span className="t-count !ml-0 mr-2">{i + 1}</span>
                    {s.title}
                  </span>
                  <span className="t-body mt-1.5 block text-muted-foreground">{s.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Features" count={features.length}>
          <div className="ui-table-scroll">
            <table className="ui-table ui-table-fit">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>What you can do</th>
                </tr>
              </thead>
              <tbody>
                {features.map(([area, what]) => (
                  <tr key={area}>
                    <td className="whitespace-nowrap">{area}</td>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="How it's built" count={build.length}>
          <Points items={build} />
        </Section>

        <Section title="Tools">
          <Chips items={tools} />
        </Section>

        <NextLink href="/work/survey-agents" label="Next case study" title="Survey Agents" />
      </div>
    </Shell>
  );
}
