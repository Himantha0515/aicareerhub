import type { ResumeData } from "./resume-types";
import { SAMPLE_RESUME } from "./resume-types";

export type ResumeExampleCategory =
  | "genai"
  | "ml-engineer"
  | "data-scientist"
  | "mlops"
  | "fresher"
  | "internship"
  | "career-switch"
  | "python-ai";

export type ResumeExample = {
  id: string;
  category: ResumeExampleCategory;
  title: string;
  templateId: string;
  blurb: string;
  data: ResumeData;
};

export const RESUME_EXAMPLE_CATEGORIES: {
  id: ResumeExampleCategory;
  label: string;
}[] = [
  { id: "genai", label: "GenAI Engineer" },
  { id: "ml-engineer", label: "ML Engineer" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "mlops", label: "MLOps Engineer" },
  { id: "fresher", label: "Fresher / New Grad" },
  { id: "internship", label: "Internship" },
  { id: "career-switch", label: "Career Switcher" },
  { id: "python-ai", label: "Python → AI" },
];

function withOverrides(partial: Partial<ResumeData>): ResumeData {
  return { ...SAMPLE_RESUME, ...partial };
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    id: "genai-priya",
    category: "genai",
    title: "GenAI Engineer — Bengaluru",
    templateId: "aurora",
    blurb: "RAG, evals, and production LLM features.",
    data: SAMPLE_RESUME,
  },
  {
    id: "ml-arjun",
    category: "ml-engineer",
    title: "ML Engineer — Hyderabad",
    templateId: "indigo",
    blurb: "Classical ML + model deployment.",
    data: withOverrides({
      fullName: "Arjun Mehta",
      headline: "Machine Learning Engineer",
      email: "arjun.mehta@email.com",
      location: "Hyderabad, India",
      summary:
        "ML engineer with 3 years building ranking and forecasting models in production. Strong in Python, feature stores, and online inference.",
      skills: ["Python", "scikit-learn", "XGBoost", "PyTorch", "Airflow", "SQL", "Docker", "GCP"],
      experience: [
        {
          company: "RetailAI",
          role: "ML Engineer",
          location: "Hyderabad",
          start: "2022",
          end: "Present",
          bullets: [
            "Improved product ranking NDCG@10 by 12% with gradient boosting + embeddings.",
            "Built weekly training pipelines in Airflow serving 8 models.",
          ],
        },
      ],
      projects: [
        {
          name: "Demand Forecast Toolkit",
          description: "Time-series forecasting for SKU demand.",
          bullets: ["Prophet + LightGBM ensemble with backtesting dashboard."],
        },
      ],
      education: [
        { school: "IIIT Hyderabad", degree: "M.Tech CSE", year: "2022", details: "" },
      ],
    }),
  },
  {
    id: "ds-neha",
    category: "data-scientist",
    title: "Data Scientist — Pune",
    templateId: "mint",
    blurb: "Experimentation, SQL, and stakeholder storytelling.",
    data: withOverrides({
      fullName: "Neha Kapoor",
      headline: "Data Scientist",
      email: "neha.kapoor@email.com",
      location: "Pune, India",
      summary:
        "Data scientist focused on A/B testing, causal analysis, and clear product recommendations for growth teams.",
      skills: ["Python", "SQL", "Pandas", "Experiment design", "Looker", "Statistics"],
      experience: [
        {
          company: "FinServe",
          role: "Data Scientist",
          location: "Pune",
          start: "2021",
          end: "Present",
          bullets: [
            "Designed experiments that lifted activation by 9% with guarded rollouts.",
            "Built churn propensity model used by CRM for weekly campaigns.",
          ],
        },
      ],
      projects: [
        {
          name: "Experiment Platform Notes",
          description: "Internal playbook for power analysis and SRM checks.",
          bullets: ["Adopted by 4 product squads."],
        },
      ],
      education: [
        { school: "University of Pune", degree: "M.Sc Statistics", year: "2021" },
      ],
    }),
  },
  {
    id: "mlops-kabir",
    category: "mlops",
    title: "MLOps Engineer — Remote",
    templateId: "obsidian",
    blurb: "CI/CD for models, monitoring, and cost control.",
    data: withOverrides({
      fullName: "Kabir Singh",
      headline: "MLOps / ML Platform Engineer",
      email: "kabir.singh@email.com",
      location: "Remote · India",
      summary:
        "Platform engineer making ML reliable in production — pipelines, monitoring, GPU cost, and developer experience.",
      skills: ["Kubernetes", "Terraform", "MLflow", "Python", "AWS", "Prometheus", "CI/CD"],
      experience: [
        {
          company: "CloudScale",
          role: "MLOps Engineer",
          location: "Remote",
          start: "2022",
          end: "Present",
          bullets: [
            "Cut inference GPU spend 22% with autoscaling and batching.",
            "Standardized model registry + canary deploys across 15 services.",
          ],
        },
      ],
      projects: [
        {
          name: "Model Health Dashboard",
          description: "Drift + latency + cost monitors for LLM endpoints.",
          bullets: ["On-call noise reduced by ~40%."],
        },
      ],
      education: [
        { school: "BITS Pilani", degree: "B.E. Computer Science", year: "2020" },
      ],
    }),
  },
  {
    id: "fresher-ananya",
    category: "fresher",
    title: "Fresher — CS + AI projects",
    templateId: "pearl",
    blurb: "Projects-first resume for campus hiring.",
    data: withOverrides({
      fullName: "Ananya Iyer",
      headline: "Aspiring GenAI Developer · Fresher",
      email: "ananya.iyer@email.com",
      phone: "+91 90000 11122",
      location: "Chennai, India",
      summary:
        "CS graduate with strong Python foundations and hands-on LLM side projects. Seeking a GenAI / backend internship or junior role.",
      skills: ["Python", "SQL", "FastAPI", "Prompt engineering", "Git", "Basics of RAG"],
      experience: [],
      projects: [
        {
          name: "Campus FAQ Chatbot",
          description: "RAG over college handbook PDFs.",
          bullets: [
            "Chunking + embeddings + simple citation UI.",
            "Demoed to 80+ students during fest.",
          ],
        },
        {
          name: "LeetTrack",
          description: "Personal DSA tracker with spaced revision.",
          bullets: ["Flask + SQLite; 200+ problems logged."],
        },
      ],
      education: [
        {
          school: "College of Engineering Guindy",
          degree: "B.E. Computer Science",
          year: "2025",
          details: "CGPA 8.7",
        },
      ],
    }),
  },
  {
    id: "intern-rohan",
    category: "internship",
    title: "AI Internship applicant",
    templateId: "sapphire",
    blurb: "Short, focused internship resume.",
    data: withOverrides({
      fullName: "Rohan Das",
      headline: "AI Intern Candidate",
      email: "rohan.das@email.com",
      location: "Kolkata, India",
      summary:
        "Third-year student seeking a summer AI internship. Comfortable with Python and curious about RAG and agents.",
      skills: ["Python", "NumPy", "Pandas", "HTML/CSS", "Git"],
      experience: [
        {
          company: "Campus Coding Club",
          role: "Core Member",
          location: "Kolkata",
          start: "2024",
          end: "Present",
          bullets: ["Mentored 20 juniors for hackathons and DSA contests."],
        },
      ],
      projects: [
        {
          name: "News Summarizer",
          description: "LLM summarizer for Indian news RSS feeds.",
          bullets: ["Prompt templates + simple Streamlit UI."],
        },
      ],
      education: [
        { school: "Jadavpur University", degree: "B.E. IT (3rd year)", year: "2027" },
      ],
    }),
  },
  {
    id: "switch-meera",
    category: "career-switch",
    title: "Java → GenAI switcher",
    templateId: "violet",
    blurb: "Translates backend experience into AI-relevant wins.",
    data: withOverrides({
      fullName: "Meera Nair",
      headline: "Backend Engineer transitioning to GenAI",
      email: "meera.nair@email.com",
      location: "Kochi / Remote",
      summary:
        "5 years of Java/Spring experience, now building LLM prototypes. Looking for GenAI engineer roles that value strong software fundamentals.",
      skills: ["Java", "Spring Boot", "Python", "RAG", "Postgres", "Kafka", "Docker"],
      experience: [
        {
          company: "BankTech",
          role: "Senior Software Engineer",
          location: "Kochi",
          start: "2019",
          end: "Present",
          bullets: [
            "Owned payment APIs handling 2M+ daily transactions.",
            "Built internal chatbot PoC with RAG over policy docs.",
          ],
        },
      ],
      projects: [
        {
          name: "PolicyQA",
          description: "Weekend RAG project over compliance PDFs.",
          bullets: ["Evaluated answer faithfulness on a 50-question set."],
        },
      ],
      education: [
        { school: "CUSAT", degree: "B.Tech IT", year: "2019" },
      ],
    }),
  },
  {
    id: "python-ai-dev",
    category: "python-ai",
    title: "Python Developer → AI",
    templateId: "emerald",
    blurb: "Highlights API + data skills toward AI roles.",
    data: withOverrides({
      fullName: "Sahil Khan",
      headline: "Python Developer | Moving into AI Engineering",
      email: "sahil.khan@email.com",
      location: "Delhi NCR",
      summary:
        "Python developer with FastAPI and data pipeline experience, actively upskilling in LLMs and retrieval systems.",
      skills: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "LangChain basics"],
      experience: [
        {
          company: "LogiWare",
          role: "Python Developer",
          location: "Noida",
          start: "2020",
          end: "Present",
          bullets: [
            "Built async APIs and workers processing 5M events/day.",
            "Prototyped LLM classification for support tickets (precision +18%).",
          ],
        },
      ],
      projects: [
        {
          name: "Ticket Triage Bot",
          description: "Classifies and drafts replies for support tickets.",
          bullets: ["Prompt + lightweight eval harness."],
        },
      ],
      education: [
        { school: "DTU", degree: "B.Tech Software Engineering", year: "2020" },
      ],
    }),
  },
];

export function getExamplesByCategory(category: ResumeExampleCategory) {
  return RESUME_EXAMPLES.filter((e) => e.category === category);
}
