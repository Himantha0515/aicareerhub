/**
 * Generates a personalized roadmap from an assessment result.
 * Pure function — no AI API calls needed for basic roadmaps.
 */
import type { RoadmapStep } from "./user-profile";

type RoadmapTemplate = {
  role: string;
  slug: string;
  weeks: {
    week: number;
    title: string;
    topics: string[];
  }[];
};

const ROADMAPS: RoadmapTemplate[] = [
  {
    role: "GenAI Engineer",
    slug: "genai-engineer",
    weeks: [
      { week: 1, title: "Python for AI", topics: ["python-for-ai"] },
      { week: 2, title: "AI & ML Fundamentals", topics: ["what-is-ai", "maths-for-ml"] },
      { week: 3, title: "How LLMs Work", topics: ["how-llms-work"] },
      { week: 4, title: "Prompt Engineering", topics: ["prompt-engineering"] },
      { week: 5, title: "RAG Fundamentals", topics: ["rag"] },
      { week: 6, title: "RAG Advanced", topics: ["rag"] },
      { week: 7, title: "AI Agents", topics: ["ai-agents"] },
      { week: 8, title: "MCP Protocol", topics: ["mcp"] },
      { week: 9, title: "Evals & Testing", topics: ["evals"] },
      { week: 10, title: "Fine-tuning", topics: ["fine-tuning"] },
      { week: 11, title: "MLOps Basics", topics: ["mlops"] },
      { week: 12, title: "AI Infrastructure", topics: ["ai-infra"] },
      { week: 13, title: "Capstone Project", topics: ["rag", "ai-agents"] },
      { week: 14, title: "Interview Prep", topics: [] },
      { week: 15, title: "Job Applications", topics: [] },
      { week: 16, title: "Mock Interviews", topics: [] },
    ],
  },
  {
    role: "ML Engineer",
    slug: "ml-engineer",
    weeks: [
      { week: 1, title: "Python for AI", topics: ["python-for-ai"] },
      { week: 2, title: "Mathematics for ML", topics: ["maths-for-ml"] },
      { week: 3, title: "ML Fundamentals", topics: ["what-is-ai"] },
      { week: 4, title: "Supervised Learning", topics: ["what-is-ai"] },
      { week: 5, title: "Deep Learning", topics: ["how-llms-work"] },
      { week: 6, title: "Model Evaluation", topics: ["evals"] },
      { week: 7, title: "MLOps", topics: ["mlops"] },
      { week: 8, title: "AI Infrastructure", topics: ["ai-infra"] },
      { week: 9, title: "Fine-tuning", topics: ["fine-tuning"] },
      { week: 10, title: "LLMs for ML Engineers", topics: ["how-llms-work"] },
      { week: 11, title: "Capstone Project", topics: [] },
      { week: 12, title: "Interview Prep", topics: [] },
    ],
  },
  {
    role: "Data Scientist",
    slug: "data-scientist",
    weeks: [
      { week: 1, title: "Python for AI", topics: ["python-for-ai"] },
      { week: 2, title: "Mathematics & Statistics", topics: ["maths-for-ml"] },
      { week: 3, title: "ML Fundamentals", topics: ["what-is-ai"] },
      { week: 4, title: "Exploratory Data Analysis", topics: ["what-is-ai"] },
      { week: 5, title: "Model Building", topics: ["what-is-ai"] },
      { week: 6, title: "Evaluation & Metrics", topics: ["evals"] },
      { week: 7, title: "LLMs & GenAI for DS", topics: ["how-llms-work"] },
      { week: 8, title: "Prompt Engineering", topics: ["prompt-engineering"] },
      { week: 9, title: "RAG for Data Science", topics: ["rag"] },
      { week: 10, title: "MLOps", topics: ["mlops"] },
      { week: 11, title: "Capstone Project", topics: [] },
      { week: 12, title: "Interview Prep", topics: [] },
    ],
  },
  {
    role: "MLOps Engineer",
    slug: "mlops-engineer",
    weeks: [
      { week: 1, title: "Python for AI", topics: ["python-for-ai"] },
      { week: 2, title: "ML Fundamentals", topics: ["what-is-ai"] },
      { week: 3, title: "MLOps Fundamentals", topics: ["mlops"] },
      { week: 4, title: "AI Infrastructure", topics: ["ai-infra"] },
      { week: 5, title: "Docker & Kubernetes", topics: ["ai-infra"] },
      { week: 6, title: "CI/CD for ML", topics: ["mlops"] },
      { week: 7, title: "Model Monitoring", topics: ["evals"] },
      { week: 8, title: "LLM Deployment", topics: ["how-llms-work"] },
      { week: 9, title: "Evaluation Pipelines", topics: ["evals"] },
      { week: 10, title: "Capstone Project", topics: [] },
      { week: 11, title: "Interview Prep", topics: [] },
      { week: 12, title: "Job Applications", topics: [] },
    ],
  },
  {
    role: "Data Engineer",
    slug: "data-engineer",
    weeks: [
      { week: 1, title: "Python for Data", topics: ["python-for-ai"] },
      { week: 2, title: "SQL & Databases", topics: [] },
      { week: 3, title: "Data Pipelines", topics: [] },
      { week: 4, title: "Cloud Data Platforms", topics: ["ai-infra"] },
      { week: 5, title: "Stream Processing", topics: [] },
      { week: 6, title: "ML Data for Engineers", topics: ["what-is-ai"] },
      { week: 7, title: "MLOps Basics", topics: ["mlops"] },
      { week: 8, title: "Vector Databases", topics: ["rag"] },
      { week: 9, title: "AI Infrastructure", topics: ["ai-infra"] },
      { week: 10, title: "Capstone Project", topics: [] },
      { week: 11, title: "Interview Prep", topics: [] },
      { week: 12, title: "Job Applications", topics: [] },
    ],
  },
];

export function generateRoadmap(roleSlug: string, completedTopics: string[] = []): RoadmapStep[] {
  const template = ROADMAPS.find((r) => r.slug === roleSlug) ?? ROADMAPS[0]!;
  return template.weeks.map((w) => ({
    id: `${roleSlug}-week-${w.week}`,
    week: w.week,
    title: w.title,
    topics: w.topics,
    completed: w.topics.length > 0 && w.topics.every((t) => completedTopics.includes(t)),
  }));
}

export function getRoadmapForRole(roleSlug: string): RoadmapTemplate | undefined {
  return ROADMAPS.find((r) => r.slug === roleSlug);
}

export function getRoadmapProgress(steps: RoadmapStep[]): number {
  if (steps.length === 0) return 0;
  return Math.round((steps.filter((s) => s.completed).length / steps.length) * 100);
}

export { ROADMAPS };
