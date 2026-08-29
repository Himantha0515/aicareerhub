import type { Metadata } from "next";
import AssessmentWizard from "@/components/AssessmentWizard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your AI Career Path — Career Assessment",
  description:
    "Answer 10 quick questions and get your personalized AI career roadmap, skill gap analysis, and job recommendations tailored for India.",
  alternates: { canonical: `${SITE.url}/assessment` },
};

export default function AssessmentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
          🧭 Takes ~3 minutes
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          Find your <span className="text-gradient">AI career path</span>
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-fg-muted text-pretty">
          Answer a few questions about your background and goals. We&apos;ll recommend
          the right role, map your skill gaps, and generate a personalized week-by-week roadmap.
        </p>
      </div>
      <AssessmentWizard />
    </div>
  );
}
