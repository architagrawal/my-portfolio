import "./globals.css";
import "./skills-animation.css";
import "./lenis.css";
import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Cinzel, Syne, Caveat } from "next/font/google";
import Script from "next/script";
import {
  personSchema,
  websiteSchema,
} from "./metadata";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "500", "600"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrawal-archit.vercel.app"),
  title: {
    default: "Archit Agrawal | Founding AI Engineer & Software Engineer",
    template: "%s | Archit Agrawal",
  },
  description:
    "Archit Agrawal is a founding AI/ML engineer at MyStage Music building production agent systems — LangGraph orchestration, retrieval, entity resolution — and full-stack products. MSCS, Arizona State University.",
  keywords: [
    "Archit Agrawal",
    "Software Engineer",
    "AI/ML Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full-Stack Engineer",
    "AI Agents",
    "Agentic AI",
    "Multi-Agent Systems",
    "Prompt Engineering",
    "Claude Code",
    "MCP",
    "LLM",
    "Large Language Models",
    "Generative AI",
    "LangGraph",
    "LangChain",
    "RAG Systems",
    "Retrieval-Augmented Generation",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "USA",
    "Open to Relocation",
    "Arizona State University",
  ],
  authors: [
    { name: "Archit Agrawal", url: "https://agrawal-archit.vercel.app" },
  ],
  creator: "Archit Agrawal",
  publisher: "Archit Agrawal",
  openGraph: {
    title: "Archit Agrawal | Founding AI Engineer & Software Engineer",
    description:
      "Production agent systems, retrieval infrastructure, and full-stack products. Founding AI/ML engineer at MyStage Music.",
    type: "profile",
    locale: "en_US",
    url: "https://agrawal-archit.vercel.app",
    siteName: "Archit Agrawal Portfolio",
    images: [
      {
        url: "https://agrawal-archit.vercel.app/archit-profile.png",
        width: 1200,
        height: 630,
        alt: "Portrait of Archit Agrawal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archit Agrawal | Founding AI Engineer & Software Engineer",
    description:
      "Production agent systems, retrieval infrastructure, and full-stack products. Founding AI/ML engineer at MyStage Music.",
    images: ["https://agrawal-archit.vercel.app/archit-profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://agrawal-archit.vercel.app",
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
  },
  category: "technology",
};

import CustomCursor from "@/components/ui/custom-cursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="preload" href="/archit-profile.webp" as="image" type="image/webp" />
        
        {/* Structured Data for AI and Search Engines */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <meta name="author" content="Archit Agrawal" />
        <link rel="canonical" href="https://agrawal-archit.vercel.app" />
      </head>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${cinzel.variable} ${syne.variable} ${caveat.variable} antialiased font-sans`}>
        <CustomCursor />
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
