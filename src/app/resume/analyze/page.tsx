import type { Metadata } from "next";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Resume Analyzer — ATS Score",
  description:
    "Paste your resume and get an ATS compatibility score, AI career score, and improvement tips for AI roles in India.",
  alternates: { canonical: `${SITE.url}/resume/analyze` },
};

export default function ResumeAnalyzePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-medium text-accent">
        <Link href="/resume" className="hover:opacity-70">
          Resume Builder
        </Link>{" "}
        / Analyzer
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        AI <span className="text-gradient">Resume Analyzer</span>
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted text-pretty">
        Paste your resume text. Get ATS fit, AI-career score, missing keywords, and next actions.
      </p>
      <ResumeAnalyzer />
    </div>
  );
}
