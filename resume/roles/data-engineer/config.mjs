// Role-targeted variant: Data Engineer (pipelines, storage, data quality).
export default {
  company: "Role variant",
  position: "Data Engineer",
  pages: 1,
  roles: [0, 1, 2, 4, 5],
  pick: {
    0: ["Own the architecture", "Engineered the storage layer", "Scaled labeling as a distributed", "Detected table shape",
        "Accelerated publishing", "Eliminated a silent failure"],
    1: ["Scaled ingestion", "Guaranteed retry safety", "Re-architected a 14-Cloud-Function"],
    2: ["Cut transcript analysis", "Isolated each college's data", "Led a multi-tenant RAG"],
    4: ["Built a FastAPI and pgvector", "Raised dataset accuracy to 95%", "Rewrote the ETL"],
    5: ["Migrated a C# .NET", "Cut deploy time 70%"],
  },
  projects: [0, 2],
  // Two-page version: pipelines, storage and data quality throughout.
  detailed: {
    roles: [0, 1, 2, 4, 5, 6, 7],
    pick: {
      0: ["Own the architecture", "Engineered the storage layer", "Scaled labeling as a distributed",
          "Detected table shape", "Accelerated publishing", "Eliminated a silent failure", "Unlocked a time axis",
          "Blocked a cross-survey join", "Sped up a full AWS pipeline", "Lowered labeling spend",
          "Cut wrong answers 85%", "Extended analysis", "Delivered governance", "Authored the target production",
          "Reset the team's accuracy baseline", "Quadrupled the insights"],
      1: ["Scaled ingestion", "Guaranteed retry safety", "Re-architected a 14-Cloud-Function",
          "Delivered sub-50 ms search", "Designed a reusable scraping", "Implemented pause-and-resume"],
      2: ["Cut transcript analysis", "Isolated each college's data", "Led a multi-tenant RAG", "Compared fixed-size", "Added hybrid keyword"],
      4: ["Built a FastAPI and pgvector", "Cut p95 retrieval", "Rewrote the ETL", "Raised dataset accuracy to 95%"],
      5: ["Migrated a C# .NET", "Cut deploy time 70%", "Sped up the student-listing", "Right-sized Kubernetes"],
      6: ["Cut driver-tracking", "Built a WebSocket and Express"],
      7: ["Engineered an autonomous-driving", "Compared early and late sensor fusion"],
    },
    projects: [0, 1, 2],
    pickProject: {
      0: ["Reverse-engineered an undocumented", "Rate-limited and cached"],
      1: ["Built a TypeScript MCP service"],
      2: ["Built an end-to-end AI DJ"],
    },
  },
};
