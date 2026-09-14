import type { Metadata } from "next";
import ResumeHub from "@/components/resume/ResumeHub";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Resume Builder — Templates for AI Roles",
  description:
    "Build an ATS-friendly AI career resume: fill a form or paste notes, rewrite with AI, pick a template (Modern, Classic, Compact, GenAI), and download as PDF.",
  alternates: { canonical: `${SITE.url}/resume` },
};

export default function ResumePage() {
  return (
    <div className="resume-page mx-auto w-full max-w-6xl px-4 py-12">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
        Powered by Claude AI · Free templates
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        AI <span className="text-gradient">Resume Builder</span>
      </h1>
      <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
        Create a polished resume for AI roles in India. Use the form or paste an old resume,
        let AI rewrite it for your target role, pick a template, and download as PDF.
      </p>
      <ResumeHub />
    </div>
  );
}
