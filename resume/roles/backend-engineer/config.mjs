// Distributed systems first: APIs, idempotency, concurrency, data integrity, tracing and load.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Backend Software Engineer", pages: 1, skills: roleSkills.backend,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Own the backend of a TypeScript", "Traced silent row loss", "Ran the platform without a database"],
    1: ["Consolidated a 14-Cloud-Function", "Made the pipeline fault tolerant", "Propagated OpenTelemetry trace context"],
    2: ["Built REST APIs and SQL-backed admin"],
    4: ["Delivered 20+ production REST APIs", "Cut API latency from"],
    5: ["Split a .NET monolith", "Reduced deployment time"],
  },
  projects: [10],
  detailed: {
    publishAs: "Archit_Agrawal_Backend_Engineer_Resume",
    skills: roleSkills.backendDetailed,
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Own the backend of a TypeScript", "Traced silent row loss", "Ran the platform without a database", "Cut end-to-end AWS pipeline",
          "Made every answer reproducible", "Cached question-to-plan", "Reached 100% join integrity", "Secured the analytics proof"],
      1: ["Consolidated a 14-Cloud-Function", "Made the pipeline fault tolerant", "Propagated OpenTelemetry trace context",
          "Delivered sub-50 ms venue search", "Built a Cloud Scheduler reprocessing"],
      2: ["Built REST APIs and SQL-backed admin", "Enabled configuration-based college onboarding", "Cut transcript-analysis time"],
      4: ["Delivered 20+ production REST APIs", "Cut API latency from", "Centralized validation, logging",
          "Set throughput and latency SLOs", "Built an idempotent ETL pipeline"],
      5: ["Split a .NET monolith", "Reduced deployment time", "Built a Redis-backed"],
      6: ["Built a WebSocket and Express", "Cut driver-tracking"],
    },
    projects: [10, 9, 11, 5],
    pickProject: {
      10: ["Built a serverless document", "Automated EC2"],
      11: ["Built a Flask and SQLAlchemy", "Added optimistic UI"],
      5: ["Built an AWS EC2/SQS", "Capped worker capacity"],
    },
  },
};
