import type { Metadata } from "next";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { getJobs, getTopTags } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "AI & Machine Learning Jobs in India",
  description:
    "Hand-checked AI, machine learning, GenAI, data science and MLOps jobs for India and remote. Every listing links straight to the employer's own posting.",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const { q, tag } = await searchParams;
  const [jobs, tags] = await Promise.all([getJobs({ q, tag }), getTopTags()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Today&rsquo;s <span className="text-gradient">AI jobs</span>
      </h1>
      <p className="mt-2 text-fg-muted">
        {jobs.length > 0
          ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"} · hand-checked · every listing links straight to the employer.`
          : "Hand-checked AI roles for India and remote. Every listing links straight to the employer."}
      </p>

      <form action="/jobs" className="mt-6 flex gap-2">
        <div className="glass flex w-full max-w-md items-center gap-2 rounded-full border border-border px-4 shadow-[var(--shadow)] transition-colors focus-within:border-accent">
          <span aria-hidden className="text-fg-muted">🔍</span>
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by role or company…"
            className="w-full bg-transparent py-2.5 text-sm placeholder:text-fg-muted focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold"
        >
          Search
        </button>
      </form>

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <Link
              href="/jobs"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                tag
                  ? "border-border text-fg-muted hover:bg-surface-2"
                  : "border-accent bg-accent-soft text-accent"
              }`}
            >
              All
            </Link>
          </li>
          {tags.map((t) => (
            <li key={t}>
              <Link
                href={`/jobs?tag=${encodeURIComponent(t)}`}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  tag?.toLowerCase() === t.toLowerCase()
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-fg-muted hover:bg-surface-2"
                }`}
              >
                {t}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {jobs.length === 0 &&
        (q || tag ? (
          <p className="mt-8 rounded-xl border border-border bg-surface p-6 text-sm text-fg-muted">
            No roles match that search.{" "}
            <Link href="/jobs" className="text-accent hover:opacity-70">
              Clear filters
            </Link>
          </p>
        ) : (
          <div className="mt-8 rounded-xl border border-border bg-surface p-8 text-center">
            <h2 className="font-medium text-fg">The board opens soon</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted text-pretty">
              We list every role by hand and check each link before it goes up,
              so this takes a little longer to fill than an auto-scraped board —
              and it means nothing here is a dead end.
            </p>
            <Link
              href="/learn"
              className="mt-5 inline-block rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              Start learning while you wait
            </Link>
          </div>
        ))}
    </div>
  );
}
