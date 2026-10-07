import type { MetadataRoute } from "next";
import { roles } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";

const BASE = "https://agrawal-archit.vercel.app";

/* Every public page, so a search for the name surfaces the sub-pages too */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/projects", "/lab", "/about", "/work/survey-agents", "/work/edspace"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...roles.filter((r) => r.slug !== "survey-agents").map((r) => ({ url: `${BASE}/work/${r.slug}`, lastModified: now, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
