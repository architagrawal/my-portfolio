import "./globals.css";
import "./skills-animation.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import {
  personSchema,
  websiteSchema,
  professionalServiceSchema,
} from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "Archit Agrawal - Software Engineer & AI/ML Enthusiast | Full-Stack Developer",
    template: "%s | Archit Agrawal",
  },
  description:
    "Archit Agrawal is a Software Engineer specializing in AI/ML, Generative AI, Full-Stack Development, and Intelligent Automation. MSCS from Arizona State University. Expert in building AI agents, voice bots, and scalable applications using React, Python, TypeScript, and modern cloud technologies.",
  keywords: [
    "Archit Agrawal",
    "Archit Agrawal Software Engineer",
    "Archit Agrawal AI Engineer",
    "Software Engineer",
    "AI/ML Engineer",
    "Generative AI",
    "Full Stack Developer",
    "Arizona State University",
    "ASU MSCS",
    "IIT Mandi",
    "Machine Learning",
    "Deep Learning",
    "AI Agents",
    "Voice Bots",
    "Automation",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "TypeScript",
    "Node.js",
    "LLM Applications",
    "RAG Systems",
    "Artificial Intelligence",
    "Software Development",
    "System Design",
    "Cloud Computing",
  ],
  authors: [
    { name: "Archit Agrawal", url: "https://agrawal-archit.vercel.app" },
  ],
  creator: "Archit Agrawal",
  publisher: "Archit Agrawal",
  openGraph: {
    title: "Archit Agrawal - Software Engineer & AI/ML Enthusiast",
    description:
      "Software Engineer specializing in AI/ML, Generative AI, Full-Stack Development, and Intelligent Automation. Building cutting-edge AI agents, voice bots, and scalable applications.",
    type: "profile",
    locale: "en_US",
    url: "https://agrawal-archit.vercel.app",
    siteName: "Archit Agrawal Portfolio",
    images: [
      {
        url: "https://agrawal-archit.vercel.app/archit-profile.png",
        width: 1200,
        height: 630,
        alt: "Archit Agrawal - Software Engineer & AI/ML Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archit Agrawal - Software Engineer & AI/ML Enthusiast",
    description:
      "Software Engineer specializing in AI/ML, Generative AI, Full-Stack Development, and Intelligent Automation.",
    creator: "@architagrawal", // Update with your Twitter handle if different
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <Script
          id="professional-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        {/* AI-Friendly Meta Tags */}
        <meta name="author" content="Archit Agrawal" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <link rel="canonical" href="https://agrawal-archit.vercel.app" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
