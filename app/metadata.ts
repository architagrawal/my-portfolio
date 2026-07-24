export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Archit Agrawal",
  jobTitle: "Founding AI/ML Engineer",
  description:
    "Founding AI/ML Engineer at MyStage Music. Builds agent workflows, retrieval systems, data pipelines, backend services, and full-stack applications.",
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
      name: "IIT Mandi",
      sameAs: "https://www.iitmandi.ac.in/",
    },
  ],
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "AI agents",
    "Retrieval systems",
    "Full-stack development",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Node.js",
    "LangGraph",
    "Neo4j",
    "FastAPI",
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
    addressRegion: "New York metro area",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Archit Agrawal Portfolio",
  url: "https://agrawal-archit.vercel.app",
  description:
    "Work and project notes from Archit Agrawal, a founding AI/ML engineer and software engineer.",
  author: {
    "@type": "Person",
    name: "Archit Agrawal",
  },
  inLanguage: "en-US",
};
