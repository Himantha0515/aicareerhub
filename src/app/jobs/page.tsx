import type { Metadata } from "next";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/lib/content-client";

export const metadata: Metadata = {
  title: "AI & Machine Learning Jobs in India",
  description:
    "AI and backend engineering jobs from product and service company career portals. Every Apply link opens the employer’s own posting.",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; type?: string }>;
}) {
  const { q, tag, type } = await searchParams;
  const companyType =
    type === "product" || type === "service" ? type : undefined;
  const { jobs, tags = [] } = await fetchJobs({
    q,
    tag,
    type: companyType,
    includeTags: true,
  });

  const typeHref = (next?: "product" | "service") => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tag) params.set("tag", tag);
    if (next) params.set("type", next);
    const s = params.toString();
    return s ? `/jobs?${s}` : "/jobs";
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Today&rsquo;s <span className="text-gradient">AI jobs</span>
      </h1>
      <p className="mt-2 max-w-full text-pretty text-fg-muted">
        {jobs.length > 0
          ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"} · refreshed from company career portals · Apply opens the employer site.`
          : "AI and backend roles pulled from product and service company career portals. Apply opens the employer site."}
      </p>

      <form action="/jobs" className="mt-6 flex w-full min-w-0 max-w-full items-center gap-2">
        <div className="glass flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border px-3 shadow-[var(--shadow)] transition-colors focus-within:border-accent sm:max-w-md sm:px-4">
          <span aria-hidden className="shrink-0 text-fg-muted">🔍</span>
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by role or company…"
            className="min-w-0 w-full bg-transparent py-2.5 text-sm placeholder:text-fg-muted focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="btn-gradient shrink-0 rounded-full px-4 py-2 text-sm font-semibold sm:px-5"
        >
          Search
        </button>
      </form>

      <ul className="mt-4 flex max-w-full flex-wrap gap-2">
        <li>
          <Link
            href={typeHref()}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              !companyType
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-fg-muted hover:bg-surface-2"
            }`}
          >
            All companies
          </Link>
        </li>
        <li>
          <Link
            href={typeHref("product")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              companyType === "product"
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-fg-muted hover:bg-surface-2"
            }`}
          >
            Product-based
          </Link>
        </li>
        <li>
          <Link
            href={typeHref("service")}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              companyType === "service"
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-fg-muted hover:bg-surface-2"
            }`}
          >
            Service-based
          </Link>
        </li>
      </ul>

      {tags.length > 0 && (
        <ul className="mt-3 flex max-w-full flex-wrap gap-2">
          <li>
            <Link
              href={companyType ? `/jobs?type=${companyType}` : "/jobs"}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                tag
                  ? "border-border text-fg-muted hover:bg-surface-2"
                  : "border-accent bg-accent-soft text-accent"
              }`}
            >
              All topics
            </Link>
          </li>
          {tags.map((t) => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (companyType) params.set("type", companyType);
            params.set("tag", t);
            return (
              <li key={t} className="min-w-0">
                <Link
                  href={`/jobs?${params.toString()}`}
                  className={`inline-block max-w-full truncate rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    tag?.toLowerCase() === t.toLowerCase()
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border text-fg-muted hover:bg-surface-2"
                  }`}
                >
                  {t}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="min-w-0 max-w-full">
            <JobCard job={job} />
          </div>
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
            <h2 className="font-medium text-fg">No matching roles right now</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted text-pretty">
              We fetch AI and backend jobs daily from employer Greenhouse, Lever
              and Ashby boards. Run{" "}
              <code className="text-fg">npm run scrape</code> locally, or wait
              for the next daily refresh.
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
