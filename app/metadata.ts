// Structured data for AI and search engines
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Archit Agrawal",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer and AI/ML Enthusiast specializing in full-stack development, machine learning, generative AI, and intelligent automation systems. Recently graduated with MSCS from Arizona State University.",
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
    "Generative AI",
    "Full Stack Development",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Node.js",
    "AI Agents",
    "Voice Bots",
    "Automation",
    "Cloud Computing",
    "System Design",
  ],
  sameAs: [
    "https://github.com/architagrawal",
    "https://linkedin.com/in/archit-agrawal",
  ],
  email: "mailto:contact@agrawal-archit.vercel.app",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Archit Agrawal Portfolio",
  url: "https://agrawal-archit.vercel.app",
  description:
    "Professional portfolio of Archit Agrawal - Software Engineer specializing in AI/ML, Full-Stack Development, and Intelligent Automation",
  author: {
    "@type": "Person",
    name: "Archit Agrawal",
  },
  inLanguage: "en-US",
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Archit Agrawal - Software Engineering Services",
  description:
    "Expert software engineering services specializing in AI/ML applications, full-stack development, voice bots, AI agents, and automation solutions",
  provider: {
    "@type": "Person",
    name: "Archit Agrawal",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Software Development",
    "AI/ML Development",
    "Full Stack Development",
    "AI Agent Development",
    "Automation Solutions",
    "Generative AI Applications",
  ],
};
