// Product features, APIs and UI delivery lead this version.
import { detailedSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Full-Stack Software Engineer", pages: 1,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Own the software architecture", "Built the platform's web application", "Reduced AWS pipeline runtime", "Parallelized data labeling",
        "Accelerated publishing"],
    1: ["Built FastAPI and Algolia", "Scaled ingestion", "Consolidated a 14-Cloud-Function"],
    2: ["Built a multi-tenant course assistant", "Increased assessment-tool engagement", "Implemented tenant isolation",
        "Cut transcript-analysis time"],
    4: ["Built 20+ REST APIs", "Reduced API latency from"],
    5: ["Migrated a C#/.NET", "Reduced deployment time", "Built a Redis-backed"],
  },
  projects: [],
  detailed: {
    skills: detailedSkills,
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Own end-to-end architecture", "Cut end-to-end AWS pipeline", "Accelerated publishing",
          "Engineered 64-way", "Delivered interactive chart", "Reached 100% join integrity", "Secured the analytics proof"],
      1: ["Delivered sub-50 ms venue search", "Expanded Playwright ingestion", "Reduced production service dependencies",
          "Implemented pause-and-resume for incomplete", "Covered routing, transactional claims"],
      2: ["Built a multi-tenant course assistant", "Increased assessment-tool engagement", "Enabled configuration-based college onboarding",
          "Cut transcript-analysis time", "Established Prompt Flow release checks"],
      4: ["Delivered 20+ production REST APIs", "Cut API latency from", "Built an idempotent ETL pipeline", "Enforced uniqueness"],
      5: ["Migrated a C#/.NET", "Reduced deployment time", "Built a Redis-backed", "Improved student-listing"],
      6: ["Cut driver-tracking", "Built a WebSocket and Express"],
    },
    projects: [3, 4],
    pickProject: {
      3: ["Built a TypeScript/React Native", "Added idempotency keys", "Wrote Jest"],
      4: ["Built a React/ReactFlow", "Tested editor history"],
    },
  },
};
