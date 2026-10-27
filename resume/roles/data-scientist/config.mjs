// Statistics, experiment design and evaluation lead; modeling and analysis results back them.
import { roleSkills } from "../../content.mjs";
export default {
  company: "Role variant", position: "Data Scientist", pages: 1, skills: roleSkills.dataScience,
  roles: [0, 1, 2, 3, 4, 5],
  pick: {
    0: ["Validated 25 statistical", "Designed a controlled experiment", "Quadrupled the headline findings", "Designed conformal accept"],
    1: ["Lifted dataset accuracy 25%"],
    2: ["Gated every prompt release"],
    3: ["Built a PyTorch and Diffusers", "Found visual quality"],
    4: ["Built a FastAPI and pgvector", "Lifted search relevance 15%"],
    5: ["Built a desk-demand forecasting model"],
  },
  projects: [7],
  detailed: {
    skills: roleSkills.dataScienceDetailed,
    roles: [0, 1, 2, 3, 4, 5, 7],
    pick: {
      0: ["Validated 25 statistical", "Designed a controlled experiment", "Quadrupled the headline findings", "Designed conformal accept",
          "Designed blind random QC audits", "Retired a 0.637 baseline", "Cut cross-run disagreements", "Calibrated codebook fit",
          "Improved accuracy from", "Designed a chart recommender", "Blocked double counting"],
      1: ["Lifted dataset accuracy 25%", "Scaled ingestion"],
      2: ["Gated every prompt release", "Compared fixed-size and section-aware", "Cut transcript-analysis time"],
      3: ["Built a PyTorch and Diffusers", "Found visual quality", "Designed a frame-level rubric", "Derived a failure taxonomy"],
      4: ["Built a FastAPI and pgvector", "Lifted search relevance 15%", "Reduced p95 retrieval"],
      5: ["Built a desk-demand forecasting model"],
      7: ["Engineered an autonomous-driving", "Compared early and late sensor fusion"],
    },
    projects: [7, 8, 2],
    pickProject: {
      7: ["Lifted match-outcome", "Scored models on log loss"],
      2: ["Built a PyTorch/FastAPI", "Trained a MERT-95M", "Fine-tuned with DPO"],
    },
  },
};
