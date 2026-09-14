import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ResumeBuilder from "@/components/resume/ResumeBuilder";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Build Your Resume — AI Resume Builder",
  description:
    "Create a professional AI-career resume step by step: pick a template, add contact and experience, rewrite with AI, download PDF.",
  alternates: { canonical: `${SITE.url}/resume/build` },
};

export default function ResumeBuildPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-medium text-accent">
        <Link href="/resume" className="hover:opacity-70">
          Resume Builder
        </Link>{" "}
        / Build
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Build your <span className="text-gradient">resume</span>
      </h1>
      <p className="mt-2 max-w-2xl text-fg-muted">
        Follow the steps — template, contact, experience, then preview and download.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-fg-muted">Loading builder…</p>}>
          <ResumeBuilder />
        </Suspense>
      </div>
    </div>
  );
}
