import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS, ROLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI interview preparation — questions by topic and role",
  description:
    "360+ practical and theoretical interview questions for AI, ML, data science, MLOps, NLP and computer vision roles in India.",
};

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
        📝 360+ questions with answers
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        Interview <span className="text-gradient">preparation</span>
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted text-pretty">
        Real questions that companies in India ask for AI roles. Browse by topic
        if you are studying a specific area, or by role if you have an interview
        coming up.
      </p>

      {/* By Topic */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">
          Browse by <span className="text-gradient">topic</span>
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Pick a topic to see every question related to it.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/interview-prep/topic/${topic.slug}`}
              className="card-3d group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-accent/50"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: topic.gradient }}
              >
                {topic.emoji}
              </span>
              <div>
                <p className="font-semibold text-fg transition-colors group-hover:text-accent">
                  {topic.title}
                </p>
                <p className="mt-0.5 text-xs text-fg-muted">
                  ~30 questions →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* By Role */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">
          Browse by <span className="text-gradient">role</span>
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Pick a role to see every question you might face in that interview.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role) => (
            <Link
              key={role.slug}
              href={`/interview-prep/role/${role.slug}`}
              className="card-3d group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center hover:border-accent/50"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: role.gradient }}
              >
                {role.emoji}
              </span>
              <p className="font-semibold text-fg transition-colors group-hover:text-accent">
                {role.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
