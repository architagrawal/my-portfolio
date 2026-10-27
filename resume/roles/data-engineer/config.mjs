// Pipelines, storage, data quality, lineage and safe reprocessing lead this version.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Data Engineer", pages: 1, skills: roleSkills.data,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Designed a serverless data lake", "Built schema-inferring ingestion", "Traced silent row loss", "Tracked data lineage"],
    1: ["Scaled ingestion", "Made ingestion retries safe"],
    2: ["Reduced transcript-analysis"],
    4: ["Built an idempotent ETL pipeline", "Put data-quality gates in PostgreSQL"],
    5: ["Migrated a C#/.NET"],
  },
  projects: [6],
  pickProject: { 6: ["Built a scheduled ETL pipeline"] },
  detailed: {
    skills: roleSkills.dataDetailed,
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Designed a serverless data lake", "Built schema-inferring ingestion", "Traced silent row loss", "Reached 100% join integrity",
          "Tracked data lineage", "Parallelized data labeling", "Wired metric lint into CI", "Blocked double counting",
          "Reduced publishing time", "Cut cross-run disagreements", "Secured the analytics proof"],
      1: ["Scaled ingestion", "Made ingestion retries safe", "Built a Cloud Scheduler reprocessing", "Consolidated a 14-Cloud-Function",
          "Lifted dataset accuracy 25%", "Designed reusable scraping"],
      2: ["Reduced transcript-analysis", "Implemented tenant isolation"],
      4: ["Built an idempotent ETL pipeline", "Put data-quality gates in PostgreSQL", "Cut API latency from", "Reduced p95 retrieval"],
      5: ["Migrated a C#/.NET", "Improved student-listing"],
      6: ["Automated competitor-catalog harvesting"],
    },
    projects: [6, 10, 5],
    pickProject: {
      6: ["Built a scheduled ETL pipeline", "Built a serverless analytics"],
      5: ["Built an AWS EC2/SQS", "Capped worker capacity"],
    },
  },
};
