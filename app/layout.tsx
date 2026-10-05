import { Backdrop } from "@/components/site/scene";
import { SpotlightEffect } from "@/components/site/spotlight";
import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Caveat, Fraunces, Figtree } from "next/font/google";
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

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrawal-archit.vercel.app"),
  title: {
    default: "Archit Agrawal | AI Software Engineer",
    template: "%s | Archit Agrawal",
  },
  description:
    "Archit Agrawal builds reliable AI systems and full-stack products, from agent orchestration and evaluation to retrieval, data pipelines, APIs, and cloud infrastructure.",
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
    title: "Archit Agrawal | AI Software Engineer",
    description:
      "Production agent systems, retrieval infrastructure, and full-stack products backed by evaluation, testing, and observability.",
    type: "profile",
    locale: "en_US",
    url: "https://agrawal-archit.vercel.app",
    siteName: "Archit Agrawal Portfolio",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Archit Agrawal, AI Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-card.png"],
    title: "Archit Agrawal | AI Software Engineer",
    description:
      "Production agent systems, retrieval infrastructure, and full-stack products backed by evaluation, testing, and observability.",
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className={`light ${outfit.variable} ${spaceGrotesk.variable} ${caveat.variable} ${fraunces.variable} ${figtree.variable}`} suppressHydrationWarning>
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
        {/* Pick the painted scene before first paint, so its palette is there on the first frame.
            Never the scene the last visit showed; ?scene=<id> forces one. The list matches SCENE_IDS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=["mesas","saguaros","aurora","ocean","blackhole","canyon","flock","reef"],f=new URLSearchParams(location.search).get("scene"),l=sessionStorage.getItem("paint-scene"),p;if(t.indexOf(f)>-1)p=f;else{var c=t.filter(function(x){return x!==l});p=c[Math.floor(Math.random()*c.length)]}sessionStorage.setItem("paint-scene",p);document.documentElement.dataset.scene=p}catch(e){}`,
          }}
        />
        <meta name="author" content="Archit Agrawal" />
        <link rel="canonical" href="https://agrawal-archit.vercel.app" />
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        <Backdrop />
        <div className="relative z-10">{children}</div>
        <SpotlightEffect />
      </body>
    </html>
  );
}
