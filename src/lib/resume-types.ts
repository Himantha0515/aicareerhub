/** Structured resume model used by the AI Resume Builder. */

export type ResumeExperience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  link?: string;
  description: string;
  bullets: string[];
};

export type ResumeEducation = {
  school: string;
  degree: string;
  year: string;
  details?: string;
};

export type ResumeData = {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: string[];
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
};

export type ResumeTemplateId = "modern" | "classic" | "compact" | "genai";

export type ResumeTemplateMeta = {
  id: ResumeTemplateId;
  name: string;
  blurb: string;
  accent: string;
};

export const EMPTY_RESUME: ResumeData = {
  fullName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  links: [],
  summary: "",
  skills: [],
  experience: [
    {
      company: "",
      role: "",
      location: "",
      start: "",
      end: "",
      bullets: [""],
    },
  ],
  projects: [
    {
      name: "",
      description: "",
      bullets: [""],
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
};

export const SAMPLE_RESUME: ResumeData = {
  fullName: "Priya Sharma",
  headline: "GenAI / ML Engineer",
  email: "priya.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  links: ["linkedin.com/in/priya", "github.com/priya"],
  summary:
    "Software engineer building LLM apps with RAG, evals, and production Python. Focused on reliable GenAI features for India-scale products.",
  skills: [
    "Python",
    "PyTorch",
    "LangChain",
    "RAG",
    "FastAPI",
    "SQL",
    "Docker",
    "AWS",
  ],
  experience: [
    {
      company: "NovaTech",
      role: "ML Engineer",
      location: "Bengaluru",
      start: "2023",
      end: "Present",
      bullets: [
        "Shipped a RAG support assistant that cut average handle time by 28%.",
        "Built eval harness (faithfulness + latency) used across 4 GenAI features.",
        "Owned FastAPI inference service serving ~40k requests/day.",
      ],
    },
  ],
  projects: [
    {
      name: "DocQA RAG Kit",
      link: "github.com/priya/docqa",
      description: "Open-source retrieval pipeline for PDF + Notion docs.",
      bullets: [
        "Hybrid search (BM25 + embeddings) with citation-backed answers.",
        "Added MCP tool wrappers for local file and web search.",
      ],
    },
  ],
  education: [
    {
      school: "NIT Surathkal",
      degree: "B.Tech Computer Science",
      year: "2022",
      details: "CGPA 8.4",
    },
  ],
};
