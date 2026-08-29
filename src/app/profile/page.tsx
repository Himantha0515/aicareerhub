"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile } from "@/lib/user-profile";
import { getRoadmapProgress } from "@/lib/roadmap-generator";
import { firebaseSignOut } from "@/lib/firebase-auth";
import { useRouter } from "next/navigation";

const AVATAR_EMOJIS = ["🧑‍💻","👨‍💻","👩‍💻","🧑‍🔬","👨‍🔬","👩‍🔬","🧑‍🎓","👨‍🎓","👩‍🎓","🦸","🦸‍♂️","🦸‍♀️","🐱","🐼","🦊","🐸","🐧","🦉","🚀","⚡","🔥","🌟","💎","🎯"];

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const router = useRouter();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/signin?next=/profile");
  }, [user, loading, router]);

  useEffect(() => {
    if (profile) setName(profile.displayName);
  }, [profile]);

  if (loading || !profile) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-4">
        {[1,2,3].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-surface-2 animate-pulse" />
        ))}
      </div>
    );
  }

  const roadmapProgress = getRoadmapProgress(profile.roadmap);
  const hasAssessment = !!profile.assessment;

  async function saveAvatar(emoji: string) {
    if (!user) return;
    await updateUserProfile(user.uid, { avatarEmoji: emoji });
    await refreshProfile();
  }

  async function saveName() {
    if (!user || !name.trim()) return;
    setSaving(true);
    await updateUserProfile(user.uid, { displayName: name.trim() });
    await refreshProfile();
    setEditingName(false);
    setSaving(false);
  }

  const completedTopics = profile.completedTopics.length;
  const roadmapSteps = profile.roadmap.length;
  const completedSteps = profile.roadmap.filter((s) => s.completed).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            My <span className="text-gradient">Career Profile</span>
          </h1>
          <p className="mt-1 text-fg-muted">{user?.email}</p>
        </div>
        <button
          onClick={async () => { await firebaseSignOut(); router.push("/"); }}
          className="rounded-full border border-border px-4 py-1.5 text-sm text-fg-muted hover:text-rose-500 hover:border-rose-200 transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Identity card */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
        <div className="flex items-center gap-5 flex-wrap">
          {/* Avatar picker */}
          <div className="relative group">
            <span className="grid h-20 w-20 place-items-center rounded-2xl text-4xl border border-border shadow-[var(--shadow)] cursor-pointer select-none"
              style={{ background: "linear-gradient(135deg,var(--indigo),var(--violet))" }}>
              {profile.avatarEmoji}
            </span>
            <div className="absolute top-full left-0 z-10 mt-2 hidden group-hover:grid grid-cols-6 gap-1 rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow)] w-44">
              {AVATAR_EMOJIS.map((e) => (
                <button key={e} onClick={() => saveAvatar(e)}
                  className="grid h-7 w-7 place-items-center rounded-lg text-lg hover:bg-accent-soft transition-colors">
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 rounded-xl border border-border px-3 py-1.5 text-lg font-bold outline-none focus:border-accent"
                  autoFocus
                />
                <button onClick={saveName} disabled={saving}
                  className="btn-gradient rounded-xl px-3 py-1.5 text-sm font-semibold">
                  {saving ? "..." : "Save"}
                </button>
                <button onClick={() => setEditingName(false)}
                  className="rounded-xl border border-border px-3 py-1.5 text-sm">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setEditingName(true)}
                className="group/name flex items-center gap-2">
                <h2 className="text-2xl font-bold group-hover/name:text-accent transition-colors">
                  {profile.displayName}
                </h2>
                <span className="text-fg-muted opacity-0 group-hover/name:opacity-100 text-sm transition-opacity">✏️</span>
              </button>
            )}
            <p className="mt-1 text-fg-muted">
              {profile.targetRole
                ? `Target: ${profile.assessment?.recommendedRole ?? profile.targetRole}`
                : "Complete your assessment to set your target role"}
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Topics done", value: String(completedTopics) },
            { label: "Roadmap", value: roadmapSteps > 0 ? `${completedSteps}/${roadmapSteps} weeks` : "Not started" },
            { label: "Streak", value: `${profile.streak} days` },
            { label: "XP", value: String(profile.xp) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface-2 p-3 text-center">
              <p className="text-xs text-fg-muted">{s.label}</p>
              <p className="mt-1 font-bold text-accent">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment CTA or Result */}
      {!hasAssessment ? (
        <div className="rounded-3xl border-2 border-dashed border-accent/30 bg-accent-soft/30 p-8 text-center">
          <p className="text-4xl">🧭</p>
          <h3 className="mt-3 text-xl font-bold">Complete your career assessment</h3>
          <p className="mt-2 text-fg-muted max-w-sm mx-auto">
            Answer 10 questions to get your personalized roadmap, skill gap analysis, and job matches.
          </p>
          <Link href="/assessment" className="btn-gradient mt-5 inline-block rounded-full px-6 py-2.5 font-semibold">
            Start Assessment →
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Your Path</p>
              <h3 className="mt-1 text-xl font-bold">{profile.assessment!.recommendedRole}</h3>
              <p className="text-sm text-fg-muted mt-0.5">
                {profile.assessment!.currentLevel} • Est. {profile.assessment!.estimatedWeeks} weeks
              </p>
            </div>
            <Link href="/assessment"
              className="rounded-full border border-border px-4 py-1.5 text-sm text-fg-muted hover:text-accent hover:border-accent/50 transition-colors">
              Retake →
            </Link>
          </div>

          {/* Roadmap progress */}
          {profile.roadmap.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Roadmap progress</p>
                <p className="text-sm font-bold text-accent">{roadmapProgress}%</p>
              </div>
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${roadmapProgress}%`, background: "var(--grad-brand)" }}
                />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {profile.roadmap.slice(0, 6).map((step) => (
                  <div key={step.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
                      step.completed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-border bg-surface-2 text-fg-muted"
                    }`}>
                    <span>{step.completed ? "✓" : `Wk ${step.week}`}</span>
                    <span className="font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
              {profile.roadmap.length > 6 && (
                <p className="mt-2 text-xs text-fg-muted text-center">
                  +{profile.roadmap.length - 6} more weeks in your roadmap
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Skill gaps */}
      {profile.assessment?.gaps && profile.assessment.gaps.length > 0 && (
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
          <h3 className="font-bold text-lg mb-4">Skill gaps to close</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.assessment.gaps.map((gap) => (
              <div key={gap}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-2 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-rose-400">●</span>
                  <span className="text-sm font-medium">{gap}</span>
                </div>
                <Link href="/learn"
                  className="text-xs font-semibold text-accent hover:opacity-70">
                  Learn →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved jobs */}
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
        <h3 className="font-bold text-lg mb-4">Job applications</h3>
        {profile.savedJobs.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-fg-muted text-sm">No saved jobs yet.</p>
            <Link href="/jobs" className="mt-2 inline-block text-sm font-semibold text-accent hover:opacity-70">
              Browse AI jobs →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {profile.savedJobs.slice(0, 5).map((j) => (
              <div key={j.jobId}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-2 p-3 text-sm">
                <span className="font-medium">{j.jobId}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  j.status === "offer" ? "bg-emerald-100 text-emerald-700" :
                  j.status === "rejected" ? "bg-rose-100 text-rose-700" :
                  "bg-accent-soft text-accent"
                }`}>
                  {j.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: "/learn", label: "📚 Continue Learning", desc: "Pick up where you left off" },
          { href: "/interview-prep", label: "📝 Practice Interviews", desc: "360+ questions by role" },
          { href: "/coach", label: "🤖 Ask AI Coach", desc: "Get personalized advice" },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            className="rounded-2xl border border-border bg-surface p-4 hover:border-accent/50 hover:text-accent transition-all shadow-[var(--shadow)]">
            <p className="font-semibold">{l.label}</p>
            <p className="text-xs text-fg-muted mt-1">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
