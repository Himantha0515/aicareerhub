import type { Metadata } from "next";
import Link from "next/link";
import HeroChatBot from "@/components/HeroChatBot";
import JobCard from "@/components/JobCard";
import { fetchJobs, fetchTopics } from "@/lib/content-client";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — Learn AI, Find AI Jobs, Build a Career`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

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

const STEPS = [
  {
    title: "Start with the basics",
    body: "Learn AI concepts in plain English — what machine learning, large language models and GenAI actually mean — before you touch frameworks or jargon.",
  },
  {
    title: "Choose a role that fits",
    body: "Explore career paths such as ML engineer, GenAI developer and MLOps. See the skills each role needs so you can build a career with a clear plan.",
  },
  {
    title: "Practise interview answers",
    body: "Use interview prep by topic and by role to rehearse the questions hiring managers ask for AI jobs in India.",
  },
  {
    title: "Apply on company sites",
    body: "Browse AI jobs refreshed from Greenhouse, Lever and Ashby boards. When you are ready, apply on the employer’s own careers page — we never gate applications.",
  },
];

export default async function Home() {
  const [{ jobs }, topics] = await Promise.all([fetchJobs(), fetchTopics()]);
  const latest = jobs.slice(0, 6);

  return (
    <>
      <section className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pt-16 pb-14 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-6">
          <div className="min-w-0">
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
              Learn AI skills that get you hired. Free beginner guides plus AI jobs
              refreshed daily from company career portals — apply always opens the
              employer site so you can build a career in machine learning and GenAI
              in India.
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
                Start learning AI
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
          </div>

          <div
            className="animate-fade-up relative flex justify-center lg:justify-end"
            style={{ animationDelay: "0.2s" }}
          >
            <HeroChatBot />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          How to <span className="text-gradient">build an AI career</span>
        </h2>
        <div className="mt-4 space-y-4 text-fg-muted text-pretty leading-relaxed">
          <p>
            {SITE.name} helps you learn AI, find AI jobs, and build a career in
            artificial intelligence without paywalls or recruiter middlemen.
            Whether you are a student, a career switcher, or an engineer moving
            into GenAI, the path starts the same way: understand the ideas,
            practise the skills that get you hired, then apply to real openings
            on company career portals.
          </p>
          <p>
            Our learning tracks cover the foundations of machine learning, how
            large language models work, the Python you need for AI, prompt
            engineering, retrieval-augmented generation (RAG), the Model Context
            Protocol (MCP), agents, fine-tuning, evals and MLOps. Each guide is
            written for India — with examples, cities and hiring context that
            match how AI jobs are posted here and for remote roles.
          </p>
          <p>
            When you are ready to apply, the jobs board lists AI and machine
            learning roles pulled from employer Greenhouse, Lever and Ashby
            boards. You can also check salary ranges for popular AI roles in
            Bengaluru, Hyderabad, Pune and Delhi NCR, and rehearse interview
            questions by topic or by career path before you talk to hiring
            managers.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Four steps to <span className="text-gradient">get hired</span>
        </h2>
        <ol className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-muted text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="mb-6 flex min-w-0 items-baseline justify-between gap-3">
          <h2 className="min-w-0 text-2xl font-bold tracking-tight sm:text-3xl">
            Explore <span className="text-gradient">learning topics</span>
          </h2>
          <Link
            href="/learn"
            className="shrink-0 text-sm font-medium text-accent transition-opacity hover:opacity-70"
          >
            All learning guides →
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
            Full AI jobs board →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="glass rounded-2xl border border-border p-6 text-sm text-fg-muted text-pretty shadow-[var(--shadow)]">
            Jobs refresh daily from employer Greenhouse, Lever and Ashby boards.
            Check back soon, or{" "}
            <Link href="/learn" className="font-medium text-accent hover:opacity-70">
              start with the AI guides
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

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Why learn AI <span className="text-gradient">with us</span>
        </h2>
        <div className="mt-4 space-y-4 text-fg-muted text-pretty leading-relaxed">
          <p>
            Finding AI jobs in India can feel noisy: endless posts, unclear
            requirements, and courses that sell certificates instead of skills.
            We keep the focus narrow — learn AI that employers ask for, see what
            each career path expects day to day, and apply only through official
            company portals so your application reaches the right place.
          </p>
          <p>
            You can move from “what is an LLM?” to “how do I answer RAG interview
            questions?” to “which ML engineer roles are hiring this week?” without
            leaving the site. That is how you learn AI, find AI jobs, and build a
            career in it — step by step, at your own pace, free forever.
          </p>
        </div>
      </section>
    </>
  );
}
