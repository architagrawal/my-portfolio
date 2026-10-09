// Role-targeted variant: AI Software Engineer. Picks resolve against content.mjs.
export default {
  company: "Role variant",
  position: "AI Software Engineer",
  pages: 1,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Own the architecture", "Cut wrong answers 85%", "Extended analysis", "Quadrupled the insights",
        "Raised accuracy on the hardest", "Eliminated a silent failure"],
    1: ["Re-architected a 14-Cloud-Function", "Scaled ingestion"],
    2: ["Led a multi-tenant RAG", "Cut transcript analysis", "Built a Prompt Flow"],
    3: ["Built a PyTorch and Diffusers", "Found visual quality"],
    4: ["Cut p95 retrieval", "Built a FastAPI and pgvector"],
    5: ["Built a Redis-backed", "Cut deploy time 70%", "Migrated a C# .NET"],
  },
  projects: [0, 2],
  // Two-page version: every role, deeper on the AI work.
  detailed: {
    // The resume the portfolio links to: every Resume link serves this file.
    publishAs: "Archit_Agrawal_AI_Software_Engineer_Resume",
    roles: [0, 1, 2, 3, 4, 5, 6, 7],
    pick: {
      0: ["Own the architecture", "Cut wrong answers 85%", "Extended analysis", "Quadrupled the insights",
          "Raised accuracy on the hardest", "Eliminated a silent failure", "Scaled labeling as a distributed",
          "Showed model choice", "Benchmarked the platform against Claude", "Built a plain-English chart",
          "Designed a chart recommender", "Sped up a full AWS pipeline", "Kept deterministic rules",
          "Changed the evaluation"],
      1: ["Re-architected a 14-Cloud-Function", "Scaled ingestion", "Delivered sub-50 ms search",
          "Implemented pause-and-resume", "Guaranteed retry safety", "Designed a reusable scraping"],
      2: ["Led a multi-tenant RAG", "Cut transcript analysis", "Isolated each college's data", "Built a Prompt Flow",
          "Added hybrid keyword", "Attached a source citation"],
      3: ["Built a PyTorch and Diffusers", "Found visual quality", "Designed a frame-level rubric"],
      4: ["Cut p95 retrieval", "Built a FastAPI and pgvector", "Lowered API latency 90%"],
      5: ["Built a Redis-backed", "Cut deploy time 70%", "Migrated a C# .NET"],
      6: ["Cut driver-tracking"],
      7: ["Engineered an autonomous-driving"],
    },
    projects: [0, 1, 2],
    pickProject: {
      0: ["Reverse-engineered an undocumented", "Kept every tool read-only"],
      1: ["Built a TypeScript MCP service", "Reviews large PRs"],
      2: ["Built an end-to-end AI DJ", "Trained a MERT-95M"],
    },
  },
};
