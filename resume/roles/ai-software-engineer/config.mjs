// Application delivery first, with AI reliability and evaluation as supporting evidence.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "AI Software Engineer", pages: 1, skills: roleSkills.ai,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Own architecture and delivery", "Built a survey analytics application", "Reduced AWS pipeline runtime", "Cut incorrect answers"],
    1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia"],
    2: ["Built a multi-tenant course assistant", "Established Prompt Flow"],
    3: ["Built a PyTorch and Diffusers"],
    4: ["Reduced p95 retrieval"],
    5: ["Reduced deployment time"],
  },
  projects: [0],
  detailed: {
    publishAs: "Archit_Agrawal_AI_Software_Engineer_Resume",
    roles: [0, 1, 2, 3, 4, 5],
    pick: {
      0: ["Own architecture and delivery", "Built a survey analytics application", "Reduced AWS pipeline runtime",
          "Cut incorrect answers", "Validated 25 statistical", "Improved accuracy from",
          "Increased recovery of reference", "Prevented mislabeled"],
      1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia", "Scaled ingestion",
          "Implemented checkpointed", "Made ingestion retries safe"],
      2: ["Built a multi-tenant course assistant", "Established Prompt Flow", "Implemented tenant isolation",
          "Added hybrid keyword", "Reduced transcript-analysis"],
      3: ["Built a PyTorch and Diffusers", "Found visual quality"],
      4: ["Reduced p95 retrieval", "Built a FastAPI and pgvector"],
      5: ["Reduced deployment time", "Migrated a C#/.NET"],
    },
    projects: [0, 1],
    pickProject: {
      0: ["Built a Python/FastMCP", "Reverse-engineered"],
      1: ["Built a TypeScript PR-review", "Made review comments"],
    },
  },
};
