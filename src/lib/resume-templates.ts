import type { ResumeTemplateMeta } from "./resume-types";

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: "modern",
    name: "Modern",
    blurb: "Clean accent header — great for product / GenAI roles.",
    accent: "#6d3ef5",
  },
  {
    id: "classic",
    name: "Classic",
    blurb: "ATS-safe single column with clear section rules.",
    accent: "#0f172a",
  },
  {
    id: "compact",
    name: "Compact",
    blurb: "Dense one-pager for mid/senior profiles.",
    accent: "#1e40af",
  },
  {
    id: "genai",
    name: "GenAI Focus",
    blurb: "Skills-first layout highlighting AI stack and projects.",
    accent: "#7c3aed",
  },
];
