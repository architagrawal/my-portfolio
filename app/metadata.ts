import type { Metadata } from "next";

export const SITE = "https://agrawal-archit.vercel.app";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Archit Agrawal",
  jobTitle: "AI/ML Engineer and Software Engineer",
  description:
    "AI/ML and software engineer who builds reliable agent workflows, retrieval systems, data pipelines, backend services, and full-stack products.",
  url: "https://agrawal-archit.vercel.app",
  image: "https://agrawal-archit.vercel.app/archit-profile.png",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Arizona State University",
      sameAs: "https://www.asu.edu/",
    },
    {
      "@type": "EducationalOrganization",
      name: "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)",
      sameAs: "https://www.daiict.ac.in/",
    },
    {
      "@type": "EducationalOrganization",
      name: "IIT Mandi",
      sameAs: "https://www.iitmandi.ac.in/",
    },
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Large Language Models (LLMs)",
    "Generative AI",
    "AI agents",
    "Multi-agent systems",
    "Prompt engineering",
    "Model Context Protocol (MCP)",
    "MCP server development and deployment",
    "Agent skills and tool development",
    "AI-assisted development (Claude Code, OpenAI Codex, Kiro)",
    "Retrieval-Augmented Generation (RAG)",
    "Retrieval systems",
    "Full-stack development",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Node.js",
    "LangGraph",
    "LangChain",
    "PyTorch",
    "Neo4j",
    "FastAPI",
    "REST APIs",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud Platform",
    "Microservices",
    "Cloud Computing",
    "System Design",
  ],
  sameAs: [
    "https://github.com/architagrawal",
    "https://www.linkedin.com/in/agrawal-archit",
  ],
  email: "mailto:architagrawal000@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  workLocation: {
    "@type": "Place",
    name: "United States (open to relocation nationwide, remote, or hybrid)",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Archit Agrawal Portfolio",
  url: "https://agrawal-archit.vercel.app",
  description:
    "Selected experience, engineering projects, and technical case studies from AI/ML and software engineer Archit Agrawal.",
  author: {
    "@type": "Person",
    name: "Archit Agrawal",
  },
  inLanguage: "en-US",
};

export const OG_IMAGE = { url: "/og-card.png", width: 1200, height: 630, alt: "Archit Agrawal, AI Software Engineer" };

/* Title, description, canonical and share card for one page. A page that sets no openGraph
   inherits the home page's, so its share card would name and link the home page instead. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} | Archit Agrawal`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, type: "website", siteName: "Archit Agrawal Portfolio", locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}

/* A search snippet: the text cut at a word boundary to fit about 155 characters */
export function snippet(text: string, max = 155): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.]$/, "")}...`;
}
