/**
 * Career assessment questions and scoring logic.
 */

export type AssessmentQuestion = {
  id: string;
  question: string;
  type: "single" | "scale" | "multi";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "current_role",
    question: "What is your current role or background?",
    type: "single",
    options: [
      { value: "student", label: "Student / Fresh graduate" },
      { value: "software_engineer", label: "Software Engineer / Developer" },
      { value: "data_analyst", label: "Data Analyst / Business Analyst" },
      { value: "other_tech", label: "Other Tech role" },
      { value: "non_tech", label: "Non-tech professional" },
    ],
  },
  {
    id: "experience_years",
    question: "How many years of professional work experience do you have?",
    type: "single",
    options: [
      { value: "0", label: "0 — Student / Fresher" },
      { value: "1-2", label: "1–2 years" },
      { value: "3-5", label: "3–5 years" },
      { value: "6-10", label: "6–10 years" },
      { value: "10+", label: "10+ years" },
    ],
  },
  {
    id: "python_level",
    question: "Rate your Python programming skill:",
    type: "scale",
    min: 0,
    max: 4,
    minLabel: "Never used",
    maxLabel: "Expert",
  },
  {
    id: "ml_knowledge",
    question: "Rate your Machine Learning knowledge:",
    type: "scale",
    min: 0,
    max: 4,
    minLabel: "No idea",
    maxLabel: "Built models in production",
  },
  {
    id: "llm_knowledge",
    question: "Rate your LLM / GenAI knowledge:",
    type: "scale",
    min: 0,
    max: 4,
    minLabel: "Just heard the term",
    maxLabel: "Building LLM apps in prod",
  },
  {
    id: "cloud_knowledge",
    question: "Rate your Cloud (AWS/GCP/Azure) knowledge:",
    type: "scale",
    min: 0,
    max: 4,
    minLabel: "Never used",
    maxLabel: "Certified / Production use",
  },
  {
    id: "math_comfort",
    question: "How comfortable are you with mathematics (linear algebra, calculus, stats)?",
    type: "scale",
    min: 0,
    max: 4,
    minLabel: "Avoid it",
    maxLabel: "Love it / Research-level",
  },
  {
    id: "career_goal",
    question: "What is your primary career goal?",
    type: "single",
    options: [
      { value: "build_products", label: "Build AI-powered products & applications" },
      { value: "ml_research", label: "Do ML research & model development" },
      { value: "data_insights", label: "Extract insights from data" },
      { value: "deploy_scale", label: "Deploy and scale ML systems (MLOps)" },
      { value: "data_infrastructure", label: "Build data infrastructure & pipelines" },
    ],
  },
  {
    id: "time_per_week",
    question: "How many hours per week can you dedicate to learning?",
    type: "single",
    options: [
      { value: "5", label: "< 5 hours — Very busy" },
      { value: "10", label: "5–10 hours — Part-time" },
      { value: "20", label: "10–20 hours — Serious" },
      { value: "40", label: "20–40 hours — Full-time learner" },
    ],
  },
  {
    id: "preferred_location",
    question: "Where are you looking for work?",
    type: "single",
    options: [
      { value: "bengaluru", label: "Bengaluru" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "pune", label: "Pune" },
      { value: "delhi-ncr", label: "Delhi NCR" },
      { value: "mumbai", label: "Mumbai" },
      { value: "remote", label: "Remote / Open to anywhere" },
    ],
  },
];

export type CareerRecommendation = {
  role: string;
  slug: string;
  emoji: string;
  match: number; // 0-100
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  estimatedWeeks: number;
  strengths: string[];
  gaps: string[];
  description: string;
};

const ROLE_SCORE_WEIGHTS: Record<string, Record<string, number>> = {
  "genai-engineer":   { python_level: 3, llm_knowledge: 4, ml_knowledge: 2, cloud_knowledge: 2, math_comfort: 1 },
  "ml-engineer":      { python_level: 3, ml_knowledge: 4, math_comfort: 4, cloud_knowledge: 2, llm_knowledge: 1 },
  "data-scientist":   { python_level: 3, ml_knowledge: 4, math_comfort: 4, llm_knowledge: 1, cloud_knowledge: 1 },
  "mlops-engineer":   { python_level: 3, cloud_knowledge: 4, ml_knowledge: 2, llm_knowledge: 1, math_comfort: 1 },
  "data-engineer":    { python_level: 3, cloud_knowledge: 4, ml_knowledge: 1, math_comfort: 1, llm_knowledge: 1 },
};

const ROLE_META: Record<string, { emoji: string; name: string; description: string }> = {
  "genai-engineer":  { emoji: "🤖", name: "GenAI Engineer", description: "Build LLM-powered apps, RAG systems, and AI agents." },
  "ml-engineer":     { emoji: "🧠", name: "ML Engineer", description: "Design, train, and deploy machine learning models at scale." },
  "data-scientist":  { emoji: "📊", name: "Data Scientist", description: "Extract insights from data using statistical models and ML." },
  "mlops-engineer":  { emoji: "⚙️", name: "MLOps Engineer", description: "Deploy, monitor, and scale ML systems in production." },
  "data-engineer":   { emoji: "🔧", name: "Data Engineer", description: "Build pipelines and infrastructure that power AI/ML." },
};

const SKILL_NAMES: Record<string, string> = {
  python_level: "Python",
  ml_knowledge: "Machine Learning",
  llm_knowledge: "LLMs & GenAI",
  cloud_knowledge: "Cloud & Infrastructure",
  math_comfort: "Mathematics & Stats",
};

export function scoreAssessment(
  answers: Record<string, string | number>,
): CareerRecommendation[] {
  const numericAnswers: Record<string, number> = {};
  for (const [key, val] of Object.entries(answers)) {
    numericAnswers[key] = typeof val === "number" ? val : 0;
  }

  const results: CareerRecommendation[] = Object.entries(ROLE_SCORE_WEIGHTS).map(
    ([slug, weights]) => {
      const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
      const maxPossible = totalWeight * 4;
      let raw = 0;
      const strengths: string[] = [];
      const gaps: string[] = [];

      for (const [skill, weight] of Object.entries(weights)) {
        const val = numericAnswers[skill] ?? 0;
        raw += val * weight;
        if (val >= 3) strengths.push(SKILL_NAMES[skill] ?? skill);
        if (val <= 1) gaps.push(SKILL_NAMES[skill] ?? skill);
      }

      // Goal alignment bonus
      const goalMap: Record<string, string[]> = {
        build_products: ["genai-engineer"],
        ml_research: ["ml-engineer", "data-scientist"],
        data_insights: ["data-scientist"],
        deploy_scale: ["mlops-engineer"],
        data_infrastructure: ["data-engineer"],
      };
      const goalBonus = (goalMap[String(answers.career_goal)] ?? []).includes(slug) ? 10 : 0;

      const match = Math.min(100, Math.round((raw / maxPossible) * 90) + goalBonus);
      const avgSkill = raw / totalWeight;
      const currentLevel =
        avgSkill < 1.5 ? "Beginner" : avgSkill < 3 ? "Intermediate" : "Advanced";

      const hoursPerWeek = parseInt(String(answers.time_per_week ?? "10"), 10);
      const baseWeeks = currentLevel === "Beginner" ? 16 : currentLevel === "Intermediate" ? 10 : 6;
      const estimatedWeeks = Math.round(baseWeeks * (20 / Math.max(hoursPerWeek, 5)));

      const meta = ROLE_META[slug]!;
      return {
        role: meta.name,
        slug,
        emoji: meta.emoji,
        match,
        currentLevel,
        estimatedWeeks,
        strengths: strengths.slice(0, 3),
        gaps: gaps.slice(0, 4),
        description: meta.description,
      };
    },
  );

  return results.sort((a, b) => b.match - a.match);
}
