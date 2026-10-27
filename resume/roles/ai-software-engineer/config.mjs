// AI engineering first: agents, evals, traceability, observability and RAG, then supporting delivery.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "AI Software Engineer", pages: 1, skills: roleSkills.ai,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Own a multi-agent LLM platform", "Built the LLM eval harness", "Built traceability into every LLM run", "Cut pipeline latency from 500"],
    1: ["Rebuilt a 14-Cloud-Function", "Instrumented LLM observability", "Lifted dataset accuracy 25%"],
    2: ["Shipped a multi-tenant RAG assistant", "Gated every prompt release"],
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
      0: ["Own a multi-agent LLM platform", "Built the LLM eval harness", "Built traceability into every LLM run",
          "Cut pipeline latency from 500", "Raised accuracy from 60%", "Built hybrid retrieval over S3",
          "Traced silent row loss", "Validated 25 statistical", "Quadrupled the headline findings", "Showed model choice",
          "Reduced publishing time from 19"],
      1: ["Rebuilt a 14-Cloud-Function", "Instrumented LLM observability", "Lifted dataset accuracy 25%",
          "Made the pipeline fault tolerant", "Delivered sub-50 ms venue search"],
      2: ["Shipped a multi-tenant RAG assistant", "Gated every prompt release", "Enabled configuration-based college onboarding",
          "Compared fixed-size and section-aware", "Built GraphRAG over a Neo4j"],
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
