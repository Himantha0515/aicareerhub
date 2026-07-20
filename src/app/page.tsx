import Link from "next/link";
import JobCard from "@/components/JobCard";
import { fetchJobs, fetchTopics } from "@/lib/content-client";

const PILLARS = [
  {
    href: "/learn",
    emoji: "🎓",
    gradient: "linear-gradient(135deg, var(--indigo), var(--violet))",
    title: "Learn AI from zero",
    body: "Plain-English guides to LLMs, RAG, MCP, agents and MLOps. Written for school and college students, not just engineers.",
  },
  {
    href: "/careers",
    emoji: "🧭",
    gradient: "linear-gradient(135deg, var(--violet), var(--fuchsia))",
    title: "Pick a career path",
    body: "What an ML engineer, GenAI developer or MLOps engineer actually does all day — and how to become one.",
  },
  {
    href: "/salaries",
    emoji: "💰",
    gradient: "linear-gradient(135deg, var(--cyan), var(--indigo))",
    title: "Know your worth",
    body: "Honest salary ranges for AI roles across Bengaluru, Hyderabad, Pune and Delhi NCR, plus remote.",
  },
];

const PROMISES = [
  { emoji: "🆓", title: "Free forever", body: "Every guide, open to everyone" },
  { emoji: "🇮🇳", title: "Built for India", body: "Roles, cities and salaries that apply here" },
  { emoji: "🏢", title: "From company portals", body: "Apply opens the employer’s own posting" },
];

export default async function Home() {
  const [{ jobs }, topics] = await Promise.all([fetchJobs(), fetchTopics()]);
  const latest = jobs.slice(0, 6);

  return (
    <>
      <section className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pt-16 pb-14 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          <span className="animate-bob absolute top-16 right-14 rounded-2xl border border-border bg-surface px-4 py-2 text-sm shadow-[var(--shadow)]">
            🤖 Machine Learning
          </span>
          <span
            className="animate-bob absolute top-44 right-40 rounded-2xl border border-border bg-surface px-4 py-2 text-sm shadow-[var(--shadow)]"
            style={{ animationDelay: "-1.6s" }}
          >
            ✨ GenAI
          </span>
          <span
            className="animate-bob absolute top-72 right-10 rounded-2xl border border-border bg-surface px-4 py-2 text-sm shadow-[var(--shadow)]"
            style={{ animationDelay: "-3.2s" }}
          >
            📚 RAG &amp; MCP
          </span>
        </div>

        <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
          🚀 Your AI career launchpad for India
        </p>

        <h1
          className="animate-fade-up mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl"
          style={{ animationDelay: "0.08s" }}
        >
          Learn AI. Find AI jobs.{" "}
          <span className="text-gradient">Build a career in it.</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-lg text-fg-muted text-pretty"
          style={{ animationDelay: "0.16s" }}
        >
          Free guides that start from zero, plus AI jobs refreshed daily from
          company career portals. Apply always opens the employer site.
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-wrap gap-3"
          style={{ animationDelay: "0.24s" }}
        >
          <Link
            href="/jobs"
            className="btn-gradient rounded-full px-6 py-3 font-semibold"
          >
            Browse AI jobs →
          </Link>
          <Link
            href="/learn"
            className="rounded-full border border-border bg-surface px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-[var(--shadow)]"
          >
            🎓 Start learning
          </Link>
        </div>

        <div
          className="animate-fade-up mt-12 grid max-w-2xl gap-3 sm:grid-cols-3"
          style={{ animationDelay: "0.32s" }}
        >
          {PROMISES.map((s) => (
            <div
              key={s.title}
              className="glass rounded-2xl border border-border p-4 shadow-[var(--shadow)]"
            >
              <p className="text-xl">{s.emoji}</p>
              <p className="mt-1 font-semibold">{s.title}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="mb-6 flex min-w-0 items-baseline justify-between gap-3">
          <h2 className="min-w-0 text-2xl font-bold tracking-tight sm:text-3xl">
            Explore <span className="text-gradient">topics</span>
          </h2>
          <Link
            href="/learn"
            className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-70"
          >
            View all →
          </Link>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {topics.slice(0, 8).map((topic) => (
            <Link
              key={topic.slug}
              href={`/learn/${topic.slug}`}
              className="card-3d group min-w-0 rounded-2xl border border-border bg-surface p-3 text-center hover:border-accent/50 sm:p-5"
            >
              <span
                className="mx-auto grid h-12 w-12 place-items-center rounded-2xl text-xl shadow-[var(--shadow)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-14 sm:w-14 sm:text-2xl"
                style={{ background: topic.gradient }}
              >
                {topic.emoji}
              </span>
              <p className="mt-3 text-sm font-semibold break-words transition-colors group-hover:text-accent sm:text-base">
                {topic.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Everything you need,{" "}
          <span className="text-gradient">in one place</span>
        </h2>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="card-3d group min-w-0 rounded-2xl border border-border bg-surface p-5 hover:border-accent/50 sm:p-6"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-xl text-xl shadow-[var(--shadow)] transition-transform duration-300 group-hover:scale-110"
                style={{ background: p.gradient }}
              >
                {p.emoji}
              </span>
              <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted text-pretty">{p.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="mb-6 flex min-w-0 items-baseline justify-between gap-3">
          <h2 className="min-w-0 text-2xl font-bold tracking-tight sm:text-3xl">
            Latest <span className="text-gradient">AI jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-70"
          >
            View all →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="glass rounded-2xl border border-border p-6 text-sm text-fg-muted text-pretty shadow-[var(--shadow)]">
            Jobs refresh daily from employer Greenhouse, Lever and Ashby boards.
            Check back soon, or{" "}
            <Link href="/learn" className="font-medium text-accent hover:opacity-70">
              start with the guides
            </Link>{" "}
            in the meantime.
          </p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {latest.map((job) => (
              <div key={job.id} className="min-w-0 max-w-full">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
