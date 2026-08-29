"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ASSESSMENT_QUESTIONS,
  scoreAssessment,
  type CareerRecommendation,
} from "@/lib/assessment";
import { generateRoadmap } from "@/lib/roadmap-generator";
import { useAuth } from "@/contexts/AuthContext";
import { saveAssessmentResult } from "@/lib/user-profile";

type Answers = Record<string, string | number>;

export default function AssessmentWizard() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<CareerRecommendation[] | null>(null);
  const [saving, setSaving] = useState(false);

  const q = ASSESSMENT_QUESTIONS[step];
  const progress = Math.round((step / ASSESSMENT_QUESTIONS.length) * 100);
  const isLast = step === ASSESSMENT_QUESTIONS.length - 1;

  function answer(value: string | number) {
    const newAnswers = { ...answers, [q!.id]: value };
    setAnswers(newAnswers);
    if (isLast) {
      const recommendations = scoreAssessment(newAnswers);
      setResult(recommendations);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleScale(val: number) {
    answer(val);
  }

  async function saveAndContinue(topRole: CareerRecommendation) {
    setSaving(true);
    const roadmap = generateRoadmap(topRole.slug);
    const skills = topRole.gaps.map((gap) => ({
      slug: gap.toLowerCase().replace(/\s+/g, "-"),
      name: gap,
      level: "none" as const,
      targetLevel: "intermediate" as const,
      confidence: 0,
      lastUpdated: new Date().toISOString(),
    }));
    const assessment = {
      completedAt: new Date().toISOString(),
      recommendedRole: topRole.role,
      currentLevel: topRole.currentLevel,
      estimatedWeeks: topRole.estimatedWeeks,
      strengths: topRole.strengths,
      gaps: topRole.gaps,
      answers,
    };

    if (user) {
      await saveAssessmentResult(user.uid, assessment, skills, roadmap, topRole.slug);
      await refreshProfile();
      router.push("/profile");
    } else {
      // Store in localStorage for guest users
      localStorage.setItem("assessment_result", JSON.stringify({ assessment, topRole, roadmap }));
      router.push("/auth/signin?next=/profile");
    }
    setSaving(false);
  }

  if (result) {
    const top = result[0]!;
    const others = result.slice(1, 4);
    return (
      <div className="animate-fade-up space-y-6">
        {/* Top recommendation */}
        <div className="rounded-3xl border-2 border-accent/30 bg-surface p-6 shadow-[var(--glow)]">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Your recommended path</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl text-4xl shadow-[var(--shadow)]"
              style={{ background: "linear-gradient(135deg,var(--indigo),var(--violet))" }}>
              {top.emoji}
            </span>
            <div>
              <h2 className="text-2xl font-bold">{top.role}</h2>
              <p className="text-sm text-fg-muted">{top.description}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Current level", value: top.currentLevel },
              { label: "Est. prep time", value: `${top.estimatedWeeks} weeks` },
              { label: "Match score", value: `${top.match}%` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface-2 p-3">
                <p className="text-xs text-fg-muted">{s.label}</p>
                <p className="mt-1 font-bold text-lg text-accent">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">✓ Your strengths</p>
              {top.strengths.length > 0 ? (
                <ul className="space-y-1">
                  {top.strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="text-emerald-500">●</span> {s}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-fg-muted">Skills will be built through the roadmap.</p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">✗ Skill gaps</p>
              {top.gaps.length > 0 ? (
                <ul className="space-y-1">
                  {top.gaps.map((g) => (
                    <li key={g} className="flex items-center gap-2 text-sm">
                      <span className="text-rose-400">●</span> {g}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-fg-muted">Strong foundation — focus on advanced topics.</p>}
            </div>
          </div>

          <button
            onClick={() => saveAndContinue(top)}
            disabled={saving}
            className="btn-gradient mt-6 w-full rounded-full py-3 font-semibold text-center"
          >
            {saving ? "Saving..." : user ? "View My Roadmap →" : "Sign in to Save & View Roadmap →"}
          </button>
        </div>

        {/* Other options */}
        <div>
          <p className="text-sm font-semibold text-fg-muted mb-3">Other paths that match you:</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((r) => (
              <button
                key={r.slug}
                onClick={() => saveAndContinue(r)}
                className="rounded-2xl border border-border bg-surface p-4 text-left hover:border-accent/50 transition-colors"
              >
                <p className="text-2xl">{r.emoji}</p>
                <p className="mt-2 font-semibold text-sm">{r.role}</p>
                <p className="text-xs text-fg-muted mt-0.5">{r.match}% match</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setStep(0); setAnswers({}); setResult(null); }}
          className="text-sm text-fg-muted hover:text-fg transition-colors"
        >
          ← Retake assessment
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-fg-muted">Question {step + 1} of {ASSESSMENT_QUESTIONS.length}</span>
          <span className="text-sm font-semibold text-accent">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--grad-brand)" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-[var(--shadow)]">
        <h2 className="text-xl font-bold sm:text-2xl">{q!.question}</h2>

        {q!.type === "single" && (
          <div className="mt-6 space-y-3">
            {q!.options!.map((opt) => (
              <button
                key={opt.value}
                onClick={() => answer(opt.value)}
                className="w-full text-left rounded-xl border border-border bg-surface px-4 py-3 font-medium hover:border-accent/50 hover:text-accent hover:bg-accent-soft transition-all duration-150"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {q!.type === "scale" && (
          <div className="mt-8">
            <div className="flex justify-between text-xs text-fg-muted mb-3">
              <span>{q!.minLabel}</span>
              <span>{q!.maxLabel}</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4].map((val) => (
                <button
                  key={val}
                  onClick={() => handleScale(val)}
                  className="flex-1 aspect-square rounded-xl border border-border bg-surface font-bold text-lg hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150"
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-fg-muted mt-2">
              {[0, 1, 2, 3, 4].map((v) => (
                <span key={v} className="flex-1 text-center">{v}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-4 text-sm text-fg-muted hover:text-fg transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
