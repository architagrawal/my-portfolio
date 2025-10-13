"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
// import Achievements from '@/components/sections/Achievements';
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/smooth-scroll";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        // "achievements",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SmoothScroll>
        {/* Hidden semantic content for AI crawlers */}
        <div className="sr-only" aria-hidden="true">
          <h1>Archit Agrawal - Software Engineer and AI/ML Enthusiast</h1>
          <p>
            Professional software engineer specializing in artificial
            intelligence, machine learning, generative AI, full-stack
            development, and intelligent automation. Master of Science in
            Computer Science from Arizona State University. Expert in building
            AI agents, voice bots, and scalable web applications using React,
            Next.js, Python, TypeScript, and modern cloud technologies.
          </p>
          <p>
            Keywords: Archit Agrawal, Software Engineer, AI Engineer, ML
            Engineer, Generative AI, Full-Stack Developer, React, Next.js,
            Python, TypeScript, AI Agents, Voice Bots, Automation, Arizona State
            University, IIT Mandi, LLM Applications, Machine Learning, Deep
            Learning, Node.js, Cloud Computing
          </p>
        </div>

        <motion.div
          className="min-h-screen bg-background text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header activeSection={activeSection} />
          <main className="relative" role="main" aria-label="Main content">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            {/* <Achievements /> */}
            <Contact />
            <Analytics />
          </main>
          <Footer />
        </motion.div>

        {/* External Script */}
        {/* <Script
          src="https://www.noupe.com/embed/019936c521a870d98ce210cbb3ccea9a5879.js"
          strategy="afterInteractive"
        /> */}
      </SmoothScroll>
    </ThemeProvider>
  );
}
