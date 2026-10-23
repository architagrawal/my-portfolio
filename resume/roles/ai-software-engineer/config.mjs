// Application delivery first, with AI reliability and evaluation as supporting evidence.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "AI Software Engineer", pages: 1, skills: roleSkills.ai,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Own architecture and delivery", "Built the platform's web application", "Reduced AWS pipeline runtime", "Cut incorrect answers"],
    1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia"],
    2: ["Built a multi-tenant course assistant", "Established Prompt Flow"],
    3: ["Built a PyTorch and Diffusers"],
    4: ["Reduced p95 retrieval"],
    5: ["Reduced deployment time"],
  },
  projects: [0],
  detailed: {
    publishAs: "Archit_Agrawal_AI_Software_Engineer_Resume",
    skills: roleSkills.aiDetailed,
    roles: [0, 1, 2, 3, 4, 5],
    pick: {
      0: ["Own architecture and delivery", "Built the platform's web application", "Reduced AWS pipeline runtime",
          "Cut incorrect answers", "Validated 25 statistical", "Improved accuracy from",
          "Quadrupled the headline findings", "Reached 100% join integrity", "Showed model choice"],
      1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia", "Scaled ingestion",
          "Implemented checkpointed", "Made ingestion retries safe"],
      2: ["Built a multi-tenant course assistant", "Established Prompt Flow", "Implemented tenant isolation",
          "Added hybrid keyword", "Reduced transcript-analysis"],
      3: ["Built a PyTorch and Diffusers", "Found visual quality", "Designed a frame-level rubric"],
      4: ["Reduced p95 retrieval", "Built a FastAPI and pgvector", "Cut API latency from"],
      5: ["Reduced deployment time", "Migrated a C#/.NET", "Built a Redis-backed"],
    },
    projects: [0, 1, 2],
    pickProject: {
      0: ["Built a Python/FastMCP", "Reverse-engineered"],
      1: ["Built a TypeScript PR-review", "Made review comments"],
      2: ["Built a PyTorch/FastAPI", "Trained a MERT-95M"],
    },
  },
};
