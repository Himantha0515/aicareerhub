"use client";

import { useState } from "react";
import Link from "next/link";

type AnalysisResult = {
  atsScore: number;
  aiCareerScore: number;
  overallSummary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  missingKeywords: string[];
  atsIssues: string[];
  topRecommendations: string[];
  experienceLevel: string;
  detectedSkills: string[];
  jobMatchScore: number | null;
  jobMatchReasons: string[];
};

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle"
          className="text-lg font-bold" fill="currentColor" fontSize="20" fontWeight="bold">
          {score}
        </text>
      </svg>
      <p className="text-sm font-semibold text-center">{label}</p>
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  async function analyze() {
    if (!resumeText.trim() || resumeText.trim().length < 100) {
      setError("Please paste your full resume (at least 100 characters).");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("resumeText", resumeText);
      if (jobDescription.trim()) fd.append("jobDescription", jobDescription);
      const res = await fetch("/api/resume-analyze", { method: "POST", body: fd });
      const data = await res.json() as AnalysisResult & { error?: string };
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-5">
      {/* Input */}
      {!result && (
        <>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your resume <span className="text-fg-muted font-normal">(paste the full text)</span>
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume here — name, contact, experience, education, skills, projects..."
              rows={12}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-y font-mono"
            />
            <p className="mt-1 text-xs text-fg-muted">{resumeText.length} characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Job description <span className="text-fg-muted font-normal">(optional — for match scoring)</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description to get a match score..."
              rows={4}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-y"
            />
          </div>

          {error && <p className="text-sm text-rose-500">{error}</p>}

          <button
            onClick={analyze}
            disabled={loading}
            className="btn-gradient rounded-full px-8 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing with Claude AI..." : "Analyze my resume →"}
          </button>
        </>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-3xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-border border-t-accent animate-spin" />
          <p className="mt-4 font-semibold">Analyzing your resume...</p>
          <p className="text-sm text-fg-muted mt-1">Claude AI is reviewing for ATS compatibility and AI career fit</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="animate-fade-up space-y-5">
          {/* Score cards */}
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
            <h2 className="font-bold text-xl mb-5">Your scores</h2>
            <div className="flex flex-wrap gap-8 justify-around">
              <ScoreRing
                score={result.atsScore}
                label="ATS Score"
                color={result.atsScore >= 70 ? "#10b981" : result.atsScore >= 50 ? "#f59e0b" : "#f43f5e"}
              />
              <ScoreRing
                score={result.aiCareerScore}
                label="AI Career Score"
                color={result.aiCareerScore >= 70 ? "#6d3ef5" : result.aiCareerScore >= 50 ? "#f59e0b" : "#f43f5e"}
              />
              {result.jobMatchScore !== null && (
                <ScoreRing
                  score={result.jobMatchScore}
                  label="Job Match"
                  color={result.jobMatchScore >= 70 ? "#06b6d4" : "#f59e0b"}
                />
              )}
            </div>
            <div className="mt-5 rounded-xl bg-surface-2 border border-border p-4">
              <p className="text-sm text-fg-muted">{result.overallSummary}</p>
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-accent font-semibold">
                {result.experienceLevel}
              </span>
            </div>
          </div>

          {/* Strengths + Weaknesses */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="font-bold text-emerald-700 mb-3">✓ Strengths</h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-emerald-800 flex gap-2">
                    <span>●</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
              <h3 className="font-bold text-rose-600 mb-3">✗ Weaknesses</h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-rose-700 flex gap-2">
                    <span>●</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing skills & keywords */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-bold mb-3">⚡ Skills to add</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <Link key={s} href="/learn"
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent hover:opacity-70">
                    + {s}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-bold mb-3">🔍 Missing ATS keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k) => (
                  <span key={k} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detected skills */}
          {result.detectedSkills.length > 0 && (
            <div className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-bold mb-3">✅ Detected skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.detectedSkills.map((s) => (
                  <span key={s} className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Top recommendations */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="font-bold mb-3">🎯 Top 3 things to fix right now</h3>
            <ol className="space-y-3">
              {result.topRecommendations.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setResult(null); }}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent/50 transition-colors"
            >
              ← Analyze another resume
            </button>
            <Link href="/jobs" className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold">
              Browse matching jobs →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
