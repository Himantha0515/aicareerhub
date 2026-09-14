"use client";

import { useState } from "react";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

type Tab = "builder" | "analyzer";

export default function ResumeHub() {
  const [tab, setTab] = useState<Tab>("builder");

  return (
    <div>
      <div className="mt-6 inline-flex rounded-full border border-border bg-surface p-1 shadow-[var(--shadow)]">
        <button
          type="button"
          onClick={() => setTab("builder")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            tab === "builder" ? "bg-accent text-white" : "text-fg-muted hover:text-accent"
          }`}
        >
          AI Resume Builder
        </button>
        <button
          type="button"
          onClick={() => setTab("analyzer")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            tab === "analyzer" ? "bg-accent text-white" : "text-fg-muted hover:text-accent"
          }`}
        >
          ATS Analyzer
        </button>
      </div>

      {tab === "builder" ? <ResumeBuilder /> : <ResumeAnalyzer />}
    </div>
  );
}
