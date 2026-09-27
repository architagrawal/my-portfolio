// Curated to what the resume and case studies support
export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    "title": "Agents & LLMs",
    "skills": [
      "LangGraph",
      "MCP",
      "Pydantic AI",
      "LangChain",
      "AWS Bedrock / AgentCore",
      "Vertex AI",
      "OpenAI API",
      "RAG",
      "Structured Outputs",
      "Human-in-the-Loop",
      "LLM Evals",
      "Observability & Tracing"
    ]
  },
  {
    "title": "Languages",
    "skills": [
      "Python",
      "TypeScript",
      "C#",
      "SQL",
      "JavaScript"
    ]
  },
  {
    "title": "Data & Retrieval",
    "skills": [
      "DuckDB",
      "PostgreSQL / pgvector",
      "Neo4j",
      "FAISS",
      "Lance",
      "Algolia",
      "Redis",
      "Firestore"
    ]
  },
  {
    "title": "Backend & Product",
    "skills": [
      "FastAPI",
      "NestJS",
      ".NET 8",
      "Node.js",
      "Nuxt 4",
      "React"
    ]
  },
  {
    "title": "Cloud & Quality",
    "skills": [
      "AWS Step Functions",
      "Lambda / CDK / SQS / S3",
      "GCP Cloud Run",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "pytest / Vitest / Locust",
      "Logfire"
    ]
  }
];
