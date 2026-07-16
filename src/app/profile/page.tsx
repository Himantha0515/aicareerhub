"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TOPICS } from "@/lib/content";
import {
  loadProfile,
  saveProfile,
  updateStreak,
  computeBadges,
  AVATAR_EMOJIS,
  JOB_STAGES,
  type ProfileData,
  type TrackedJob,
  type JobStage,
} from "@/lib/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);

  useEffect(() => {
    const loaded = updateStreak(loadProfile());
    setProfile(loaded);
    saveProfile(loaded);
  }, []);

  if (!profile) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="glass animate-pulse rounded-2xl border border-border p-12 text-center">
          <p className="text-fg-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  function update(patch: Partial<ProfileData>) {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveProfile(next);
      return next;
    });
  }

  const badges = computeBadges(profile);
  const completedCount = profile.completedTopics.length;
  const totalTopics = TOPICS.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <section className="glass rounded-2xl border border-border p-6 shadow-[var(--shadow)]">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="grid h-20 w-20 place-items-center rounded-2xl text-4xl shadow-[var(--shadow)] transition-transform hover:scale-105"
              style={{ background: "var(--grad-brand)" }}
              title="Change avatar"
            >
              {profile.avatarEmoji}
            </button>
            {showEmojiPicker && (
              <div className="absolute top-full left-0 z-10 mt-2 grid w-64 grid-cols-6 gap-1 rounded-2xl border border-border bg-surface p-3 shadow-lg">
                {AVATAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      update({ avatarEmoji: emoji });
                      setShowEmojiPicker(false);
                    }}
                    className={`grid h-10 w-10 place-items-center rounded-xl text-xl transition-colors hover:bg-accent-soft ${
                      profile.avatarEmoji === emoji ? "bg-accent/20 ring-2 ring-accent" : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="flex-1 text-center sm:text-left">
            {editingName ? (
              <input
                autoFocus
                className="w-full rounded-lg border border-border bg-transparent px-2 py-1 text-2xl font-bold text-fg outline-none focus:border-accent"
                defaultValue={profile.name}
                placeholder="Your name"
                onBlur={(e) => {
                  update({ name: e.target.value });
                  setEditingName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                }}
              />
            ) : (
              <h1
                onClick={() => setEditingName(true)}
                className="cursor-pointer text-2xl font-bold text-fg hover:text-accent"
              >
                {profile.name || "Click to add your name"}
              </h1>
            )}

            {editingTitle ? (
              <input
                autoFocus
                className="mt-1 w-full rounded-lg border border-border bg-transparent px-2 py-1 text-sm text-fg-muted outline-none focus:border-accent"
                defaultValue={profile.title}
                placeholder="e.g. Aspiring ML Engineer"
                onBlur={(e) => {
                  update({ title: e.target.value });
                  setEditingTitle(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                }}
              />
            ) : (
              <p
                onClick={() => setEditingTitle(true)}
                className="mt-1 cursor-pointer text-sm text-fg-muted hover:text-accent"
              >
                {profile.title || "Click to add your title"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard emoji="📚" label="Topics done" value={`${completedCount}/${totalTopics}`} />
        <StatCard emoji="📝" label="Bookmarked Q's" value={String(profile.bookmarkedQuestions.length)} />
        <StatCard emoji="🔥" label="Day streak" value={String(profile.streak.count)} />
        <StatCard emoji="💼" label="Jobs tracked" value={String(profile.appliedJobs.length)} />
      </div>

      {/* Learning Progress */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          Learning <span className="text-gradient">progress</span>
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Check off topics as you complete them. Your streak updates daily.
        </p>

        <div className="mt-2 mb-6">
          <div className="flex items-center justify-between text-xs text-fg-muted">
            <span>{completedCount} of {totalTopics} complete</span>
            <span>{totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0}%</span>
          </div>
          <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-border/50">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%`,
                background: "var(--grad-brand)",
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {TOPICS.map((topic) => {
            const done = profile.completedTopics.includes(topic.slug);
            return (
              <label
                key={topic.slug}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                  done
                    ? "border-accent/50 bg-accent/5"
                    : "border-border bg-surface hover:border-accent/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => {
                    const next = done
                      ? profile.completedTopics.filter((s) => s !== topic.slug)
                      : [...profile.completedTopics, topic.slug];
                    update({ completedTopics: next });
                  }}
                  className="sr-only"
                />
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs transition-colors ${
                    done
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-surface"
                  }`}
                >
                  {done ? "✓" : ""}
                </span>
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm"
                  style={{ background: topic.gradient }}
                >
                  {topic.emoji}
                </span>
                <span className={`text-sm font-medium ${done ? "text-fg-muted line-through" : "text-fg"}`}>
                  {topic.title}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Job Tracker */}
      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Job <span className="text-gradient">tracker</span>
          </h2>
          <button
            onClick={() => setShowAddJob(true)}
            className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold"
          >
            + Add job
          </button>
        </div>
        <p className="mt-2 text-sm text-fg-muted">
          Track your applications across stages. Everything stays in your browser.
        </p>

        {showAddJob && (
          <AddJobForm
            onAdd={(job) => {
              update({ appliedJobs: [...profile.appliedJobs, job] });
              setShowAddJob(false);
            }}
            onCancel={() => setShowAddJob(false)}
          />
        )}

        {profile.appliedJobs.length === 0 ? (
          <p className="mt-6 glass rounded-2xl border border-border p-6 text-center text-sm text-fg-muted">
            No jobs tracked yet. Add your first application above.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOB_STAGES.map((stage) => {
              const jobs = profile.appliedJobs.filter((j) => j.stage === stage);
              return (
                <div key={stage} className="rounded-2xl border border-border bg-surface p-4">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-fg-muted">
                    {stage} ({jobs.length})
                  </h3>
                  <div className="mt-3 space-y-2">
                    {jobs.map((job, i) => (
                      <div
                        key={`${job.company}-${job.jobTitle}-${i}`}
                        className="group relative rounded-xl border border-border bg-surface p-3"
                      >
                        <p className="text-sm font-medium text-fg">{job.jobTitle}</p>
                        <p className="text-xs text-fg-muted">{job.company}</p>
                        <div className="mt-2 flex gap-1">
                          {JOB_STAGES.filter((s) => s !== stage).map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                const updated = [...profile.appliedJobs];
                                updated[profile.appliedJobs.indexOf(job)] = { ...job, stage: s };
                                update({ appliedJobs: updated });
                              }}
                              className="rounded-full border border-border px-2 py-0.5 text-[10px] text-fg-muted transition-colors hover:border-accent/50 hover:text-accent"
                            >
                              → {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Achievement Badges */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">
          Achievement <span className="text-gradient">badges</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl border p-4 text-center transition-all ${
                badge.earned
                  ? "border-accent/50 bg-accent/5 shadow-[0_0_15px_var(--accent-soft)]"
                  : "border-border bg-surface opacity-50 grayscale"
              }`}
            >
              <span className="text-3xl">{badge.emoji}</span>
              <p className="mt-2 text-sm font-semibold text-fg">{badge.title}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-14 text-center text-xs text-fg-muted">
        All data is stored locally in your browser. Nothing is sent to any server.
      </p>
    </div>
  );
}

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl border border-border p-4 text-center shadow-[var(--shadow)]">
      <p className="text-2xl">{emoji}</p>
      <p className="mt-1 text-xl font-bold text-fg">{value}</p>
      <p className="mt-0.5 text-xs text-fg-muted">{label}</p>
    </div>
  );
}

function AddJobForm({
  onAdd,
  onCancel,
}: {
  onAdd: (job: TrackedJob) => void;
  onCancel: () => void;
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [stage, setStage] = useState<JobStage>("Applied");

  return (
    <div className="mt-4 glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          autoFocus
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value as JobStage)}
          className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        >
          {JOB_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          disabled={!jobTitle.trim() || !company.trim()}
          onClick={() =>
            onAdd({
              jobTitle: jobTitle.trim(),
              company: company.trim(),
              stage,
              appliedAt: new Date().toISOString().slice(0, 10),
            })
          }
          className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          Add
        </button>
        <button
          onClick={onCancel}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
