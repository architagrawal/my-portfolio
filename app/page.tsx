"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { ProjectsSkeleton } from "@/components/skeletons/projects-skeleton";

// Lazy load heavy sections that are below the fold
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="min-h-screen" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <div className="min-h-screen" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <ProjectsSkeleton />,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "about", "experience", "projects", "skills", "contact"];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.set(e.target.id, e.intersectionRatio);
        }
        let best = "hero";
        let bestRatio = 0;
        visible.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (bestRatio > 0) setActiveSection(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeSection={activeSection} />
      <main role="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </div>
  );
}
