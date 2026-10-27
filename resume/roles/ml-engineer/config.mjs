// Model evaluation, retrieval and training evidence lead the applied-ML version.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Machine Learning Engineer", pages: 1, skills: roleSkills.ml,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Own architecture and delivery", "Validated 25 statistical", "Improved accuracy from"],
    1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia"],
    2: ["Built a Prompt Flow", "Added hybrid keyword"],
    3: ["Built a PyTorch and Diffusers", "Found visual quality"],
    4: ["Reduced p95 retrieval"],
    5: ["Reduced deployment time"],
  },
  projects: [2],
  pickProject: { 2: ["Built a PyTorch/FastAPI", "Trained a MERT-95M"] },
  detailed: {
    roles: [0, 1, 2, 3, 4, 5, 7],
    pick: {
      0: ["Own architecture and delivery", "Validated 25 statistical", "Improved accuracy from",
          "Cut incorrect answers", "Quadrupled the headline findings", "Showed model choice", "Designed a chart recommender"],
      1: ["Consolidated a 14-Cloud-Function", "Built FastAPI and Algolia", "Scaled ingestion", "Implemented checkpointed"],
      2: ["Established Prompt Flow", "Added hybrid keyword", "Built a multi-tenant course assistant",
          "Compared fixed-size", "Reduced transcript-analysis"],
      3: ["Built a PyTorch and Diffusers", "Found visual quality", "Designed a frame-level rubric", "Derived a failure taxonomy"],
      4: ["Reduced p95 retrieval", "Built a FastAPI and pgvector"],
      5: ["Reduced deployment time"],
      7: ["Engineered an autonomous-driving", "Compared early and late sensor fusion"],
    },
    projects: [2],
    pickProject: { 2: ["Built a PyTorch/FastAPI", "Trained a MERT-95M", "Fine-tuned with DPO"] },
  },
};
