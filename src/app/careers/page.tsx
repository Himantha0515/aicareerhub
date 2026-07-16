import type { Metadata } from "next";
import Link from "next/link";
import { ROLES } from "@/lib/content";
import { getRoleGuide } from "@/lib/role-guides";

export const metadata: Metadata = {
  title: "AI career paths — roles explained",
  description:
    "What an ML engineer, GenAI engineer, data scientist, MLOps engineer and AI researcher actually do day to day, the skills each needs, and how to get started.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-fade-up">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
        🧭 Find your fit first
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        AI <span className="text-gradient">career paths</span>
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted text-pretty">
        &ldquo;AI job&rdquo; is not one job. These roles want different skills,
        different backgrounds, and different amounts of maths. Find the one that
        fits you before you pick a course.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {ROLES.map((role) => {
          const guide = getRoleGuide(role.slug);
          return (
            <li
              key={role.slug}
              className="card-3d flex flex-col rounded-2xl border border-border bg-surface p-6 hover:border-accent/50"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl shadow-[var(--shadow)]"
                  style={{ background: role.gradient }}
                >
                  {role.emoji}
                </span>
                <h2 className="text-lg font-semibold text-fg">{role.title}</h2>
              </div>
              <p className="mt-3 text-sm text-fg-muted text-pretty">
                {role.summary}
              </p>

              <p className="mt-3 text-sm text-fg-muted text-pretty">
                <span className="font-medium text-fg">Day to day: </span>
                {role.doing}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {role.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-fg-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-5">
                {guide ? (
                  <Link
                    href={`/careers/${role.slug}`}
                    className="text-sm font-medium text-accent transition-opacity hover:opacity-70"
                  >
                    Read full guide →
                  </Link>
                ) : (
                  <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    Guide coming soon
                  </span>
                )}
                <Link
                  href={`/jobs?q=${encodeURIComponent(role.title.split(" ")[0])}`}
                  className="text-sm font-medium text-fg-muted transition-colors hover:text-accent"
                >
                  See open roles →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
