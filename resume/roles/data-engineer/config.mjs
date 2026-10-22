// Storage, ingestion, retries and data quality lead this version.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Data Engineer", pages: 1, skills: roleSkills.data,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Designed S3 storage", "Parallelized data labeling", "Prevented mislabeled", "Reduced publishing time"],
    1: ["Scaled ingestion", "Made ingestion retries safe"],
    2: ["Implemented tenant isolation"],
    4: ["Built 20+ REST APIs", "Made ETL reruns", "Enforced uniqueness"],
    5: ["Migrated a C#/.NET"],
  },
  projects: [5],
  detailed: {
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Designed S3 storage", "Parallelized data labeling", "Prevented mislabeled", "Accelerated publishing",
          "Built dataset intake", "Blocked double counting", "Reduced AWS pipeline runtime", "Added access-controlled"],
      1: ["Scaled ingestion", "Made ingestion retries safe", "Consolidated a 14-Cloud-Function",
          "Designed reusable scraping", "Implemented checkpointed"],
      2: ["Implemented tenant isolation", "Reduced transcript-analysis", "Added hybrid keyword"],
      4: ["Built 20+ REST APIs", "Made ETL reruns", "Enforced uniqueness", "Cut API latency from", "Reduced p95 retrieval"],
      5: ["Migrated a C#/.NET", "Reduced deployment time", "Improved student-listing"],
      6: ["Built a WebSocket and Express"],
    },
    projects: [5, 4],
    pickProject: {
      5: ["Built an AWS EC2/SQS", "Capped worker capacity"],
      4: ["Built a React/ReactFlow"],
    },
  },
};
