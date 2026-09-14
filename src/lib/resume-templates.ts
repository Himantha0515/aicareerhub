import type { ResumeTemplateId, ResumeTemplateMeta } from "./resume-types";

/** 16 pickable, editable professional templates. */
export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: "aurora",
    name: "Aurora",
    blurb: "Gradient header — popular for GenAI and product roles.",
    accent: "#6d3ef5",
    layout: "header",
    category: "modern",
    popular: true,
  },
  {
    id: "slate",
    name: "Slate",
    blurb: "ATS-safe classic with strong section rules.",
    accent: "#0f172a",
    layout: "classic",
    category: "ats",
    popular: true,
  },
  {
    id: "nimbus",
    name: "Nimbus",
    blurb: "Dense one-pager for mid and senior profiles.",
    accent: "#1e40af",
    layout: "compact",
    category: "executive",
  },
  {
    id: "indigo",
    name: "Indigo",
    blurb: "Left sidebar contact panel — modern tech look.",
    accent: "#4338ca",
    layout: "sidebar",
    category: "tech",
    popular: true,
  },
  {
    id: "emerald",
    name: "Emerald",
    blurb: "Skills-first layout for AI stack visibility.",
    accent: "#059669",
    layout: "skills_first",
    category: "tech",
  },
  {
    id: "coral",
    name: "Coral",
    blurb: "Warm accent header with clean spacing.",
    accent: "#e11d48",
    layout: "header",
    category: "modern",
  },
  {
    id: "onyx",
    name: "Onyx",
    blurb: "Minimal black typography — executive polish.",
    accent: "#111827",
    layout: "minimal",
    category: "executive",
    popular: true,
  },
  {
    id: "sapphire",
    name: "Sapphire",
    blurb: "Two-tone band header with navy accent.",
    accent: "#1d4ed8",
    layout: "two_tone",
    category: "ats",
  },
  {
    id: "violet",
    name: "Violet",
    blurb: "Timeline-style experience for career growth stories.",
    accent: "#7c3aed",
    layout: "timeline",
    category: "modern",
  },
  {
    id: "mercury",
    name: "Mercury",
    blurb: "Compact silver-blue for dense engineering resumes.",
    accent: "#475569",
    layout: "compact",
    category: "tech",
  },
  {
    id: "copper",
    name: "Copper",
    blurb: "Sidebar layout with warm copper accents.",
    accent: "#c2410c",
    layout: "sidebar",
    category: "modern",
  },
  {
    id: "pearl",
    name: "Pearl",
    blurb: "Soft classic — ideal for fresher and internship applications.",
    accent: "#64748b",
    layout: "classic",
    category: "ats",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    blurb: "Dark accent skills chips for GenAI portfolios.",
    accent: "#312e81",
    layout: "skills_first",
    category: "tech",
    popular: true,
  },
  {
    id: "mint",
    name: "Mint",
    blurb: "Fresh two-tone look for data and analytics roles.",
    accent: "#0d9488",
    layout: "two_tone",
    category: "modern",
  },
  {
    id: "crimson",
    name: "Crimson",
    blurb: "Bold header for leadership and staff-level profiles.",
    accent: "#be123c",
    layout: "header",
    category: "executive",
  },
  {
    id: "graphite",
    name: "Graphite",
    blurb: "Minimal timeline — clean and recruiter-friendly.",
    accent: "#334155",
    layout: "timeline",
    category: "ats",
  },
];

export function getResumeTemplate(id: string | null | undefined): ResumeTemplateMeta {
  return (
    RESUME_TEMPLATES.find((t) => t.id === id) ??
    RESUME_TEMPLATES[0]!
  );
}

export function isResumeTemplateId(id: string): id is ResumeTemplateId {
  return RESUME_TEMPLATES.some((t) => t.id === id);
}
