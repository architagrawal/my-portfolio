// Product features end to end: typed TypeScript stack, UI, APIs and real-time delivery lead this version.
import { detailedSkills, roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Full-Stack Software Engineer", pages: 1, skills: roleSkills.fullStack,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Own a full-stack TypeScript platform", "Shipped an AI chart builder", "Built EdSpace in two days"],
    1: ["Built FastAPI and Algolia", "Consolidated a 14-Cloud-Function"],
    2: ["Built a multi-tenant course assistant", "Increased assessment-tool engagement", "Built REST APIs and SQL-backed admin"],
    4: ["Built 20+ REST APIs", "Reduced API latency from"],
    5: ["Built React and Redux apps", "Migrated a C#/.NET"],
  },
  projects: [6],
  detailed: {
    skills: detailedSkills,
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Own a full-stack TypeScript platform", "Shipped an AI chart builder", "Built EdSpace in two days", "Accelerated publishing",
          "Delivered interactive chart", "Cut end-to-end AWS pipeline", "Secured the analytics proof"],
      1: ["Delivered sub-50 ms venue search", "Reduced production service dependencies", "Expanded Playwright ingestion",
          "Covered routing, transactional claims"],
      2: ["Built a multi-tenant course assistant", "Increased assessment-tool engagement", "Built REST APIs and SQL-backed admin",
          "Enabled configuration-based college onboarding", "Cut transcript-analysis time"],
      4: ["Delivered 20+ production REST APIs", "Cut API latency from", "Built an idempotent ETL pipeline"],
      5: ["Built React and Redux apps", "Migrated a C#/.NET", "Reduced deployment time", "Improved student-listing"],
      6: ["Cut driver-tracking", "Built a WebSocket and Express"],
    },
    projects: [6, 3, 9],
    pickProject: {
      6: ["Built a serverless analytics", "Shipped accessibility"],
      3: ["Built a TypeScript/React Native", "Added idempotency keys", "Wrote Jest"],
    },
  },
};
