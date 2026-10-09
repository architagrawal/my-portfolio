// Role-targeted variant: Full-Stack Software Engineer (product, APIs, front end).
export default {
  company: "Role variant",
  position: "Full-Stack Software Engineer",
  pages: 1,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Own the architecture", "Built a plain-English chart", "Shipped a 14-page Nuxt 4", "Cut wrong answers 85%",
        "Sped up a full AWS pipeline", "Quadrupled the insights"],
    1: ["Delivered sub-50 ms search", "Re-architected a 14-Cloud-Function", "Scaled ingestion"],
    2: ["Led a multi-tenant RAG", "Raised engagement 35%", "Isolated each college's data"],
    4: ["Built a FastAPI and pgvector", "Lowered API latency 90%"],
    5: ["Built a Redis-backed", "Cut deploy time 70%", "Migrated a C# .NET"],
  },
  projects: [0, 2],
  // Two-page version: product, APIs and front end throughout.
  detailed: {
    roles: [0, 1, 2, 4, 5, 6],
    pick: {
      0: ["Own the architecture", "Built a plain-English chart", "Shipped a 14-page Nuxt 4", "Cut wrong answers 85%",
          "Sped up a full AWS pipeline", "Quadrupled the insights", "Delivered governance",
          "Scaled labeling as a distributed", "Eliminated a silent failure", "Extended analysis",
          "Designed a chart recommender", "Engineered the storage layer", "Accelerated publishing",
          "Raised accuracy on the hardest", "Blocked a cross-survey join"],
      1: ["Delivered sub-50 ms search", "Re-architected a 14-Cloud-Function", "Scaled ingestion", "Guaranteed retry safety",
          "Designed a reusable scraping"],
      2: ["Led a multi-tenant RAG", "Raised engagement 35%", "Isolated each college's data", "Attached a source citation",
          "Added hybrid keyword", "Built a Prompt Flow"],
      4: ["Built a FastAPI and pgvector", "Lowered API latency 90%", "Cut p95 retrieval", "Rewrote the ETL"],
      5: ["Built a Redis-backed", "Cut deploy time 70%", "Migrated a C# .NET", "Sped up the student-listing",
          "Published an internal npm", "Right-sized Kubernetes"],
      6: ["Cut driver-tracking", "Built a WebSocket and Express", "Shipped live order tracking", "Designed a polling fallback"],
    },
    projects: [0, 1, 2],
    pickProject: {
      0: ["Reverse-engineered an undocumented", "Kept every tool read-only"],
      1: ["Built a TypeScript MCP service", "Made the bot idempotent"],
      2: ["Built an end-to-end AI DJ"],
    },
  },
};
