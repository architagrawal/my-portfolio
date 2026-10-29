// The resume every "Resume" link on the site serves. resume/build.mjs publishes it from
// resume/roles/ai-software-engineer (the `publishAs` field in that role's detailed block).
export const RESUME_URL = "/Archit_Agrawal_AI_Software_Engineer_Resume.pdf";

// One resume per /for/<domain> page, published by the `publishAs` field in that family's
// resume/roles/<family>/config.mjs. On those pages the nav and footer serve it instead.
export const DOMAIN_RESUMES: Record<string, string> = {
  "ai-engineering": RESUME_URL,
  backend: "/Archit_Agrawal_Backend_Engineer_Resume.pdf",
  "full-stack": "/Archit_Agrawal_Full_Stack_Engineer_Resume.pdf",
  "data-science": "/Archit_Agrawal_Data_Scientist_Resume.pdf",
  "data-engineering": "/Archit_Agrawal_Data_Engineer_Resume.pdf",
  "ml-engineering": "/Archit_Agrawal_ML_Engineer_Resume.pdf",
};

export const resumeFor = (path: string) => DOMAIN_RESUMES[path.match(/^\/for\/([^/]+)/)?.[1] ?? ""] ?? RESUME_URL;
