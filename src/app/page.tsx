import type { Metadata } from "next";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { fetchJobs, fetchTopics } from "@/lib/content-client";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — ${SITE.tagline}`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

const CAREER_JOURNEY = [
  { step: "01", icon: "🧭", title: "Assess", desc: "Discover your starting point and target role" },
  { step: "02", icon: "📚", title: "Learn", desc: "Follow a personalized week-by-week roadmap" },
  { step: "03", icon: "⚒️", title: "Practice", desc: "Solve interview questions and build projects" },
  { step: "04", icon: "💼", title: "Apply", desc: "Match to real AI jobs and track applications" },
];

const PLATFORM_STATS = [
  { value: "12+", label: "Learning topics" },
  { value: "360+", label: "Interview questions" },
  { value: "100+", label: "AI jobs listed" },
  { value: "8", label: "Career paths" },
];

const ROLES_PREVIEW = [
  { slug: "genai-engineer", emoji: "🤖", title: "GenAI Engineer", tag: "Hottest role" },
  { slug: "ml-engineer", emoji: "🧠", title: "ML Engineer", tag: "High demand" },
  { slug: "data-scientist", emoji: "📊", title: "Data Scientist", tag: "Evergreen" },
  { slug: "mlops-engineer", emoji: "⚙️", title: "MLOps Engineer", tag: "Growing fast" },
];

const PROMISES = [
  { emoji: "🆓", title: "100% Free", body: "All learning content, roadmaps, and interview prep are free forever." },
  { emoji: "🇮🇳", title: "India-focused", body: "Roles, salaries, and job listings specific to the Indian AI market." },
  { emoji: "🤖", title: "AI-powered", body: "Personal career coach, skill gap analysis, and job matching using AI." },
];

export default async function Home() {
  const [{ jobs }, topics] = await Promise.all([fetchJobs(), fetchTopics()]);
  const latest = jobs.slice(0, 6);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pt-16 pb-20 sm:pt-28">
        <div className="relative z-10 max-w-3xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
            🚀 India&apos;s AI career operating system
          </p>

          <h1
            className="animate-fade-up mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.08s" }}
          >
            Build your AI career —{" "}
            <span className="text-gradient">step by step.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-2xl text-xl text-fg-muted text-pretty"
            style={{ animationDelay: "0.16s" }}
          >
            Tell us where you are today. We&apos;ll show you what to learn, what to build,
            which skills you&apos;re missing, and which AI jobs you&apos;re ready for.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href="/assessment"
              className="btn-gradient rounded-full px-7 py-3.5 font-semibold text-lg"
            >
              Find My Career Path →
            </Link>
            <Link
              href="/jobs"
              className="rounded-full border border-border bg-surface px-7 py-3.5 font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-[var(--shadow)]"
            >
              Explore AI Jobs
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="animate-fade-up mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            style={{ animationDelay: "0.32s" }}
          >
            {PLATFORM_STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl border border-border p-4 shadow-[var(--shadow)]">
                <p className="text-2xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-fg-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--fuchsia) 0%, transparent 70%)" }} />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From zero to <span className="text-gradient">AI career</span>
          </h2>
          <p className="mt-3 text-fg-muted max-w-xl mx-auto">
            A complete system — not just articles. Every step connects to your goal.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_JOURNEY.map((s, i) => (
            <div
              key={s.step}
              className="relative rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)] hover:-translate-y-1 transition-transform duration-200"
            >
              <p className="text-xs font-bold tracking-widest text-accent opacity-60">{s.step}</p>
              <span className="mt-2 block text-3xl">{s.icon}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{s.desc}</p>
              {i < CAREER_JOURNEY.length - 1 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block text-fg-muted text-xl">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/assessment" className="btn-gradient rounded-full px-6 py-3 font-semibold">
            Start Your Assessment →
          </Link>
        </div>
      </section>

      {/* ── CAREER PATHS ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Popular <span className="text-gradient">career paths</span>
          </h2>
          <Link href="/careers" className="text-sm font-medium text-accent hover:opacity-70">
            All paths →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES_PREVIEW.map((r) => (
            <Link
              key={r.slug}
              href={`/careers/${r.slug}`}
              className="card-3d group rounded-2xl border border-border bg-surface p-5 hover:border-accent/50"
            >
              <span className="text-3xl">{r.emoji}</span>
              <h3 className="mt-3 font-semibold text-fg group-hover:text-accent transition-colors">{r.title}</h3>
              <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                {r.tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── AI CAREER COACH CTA ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-[var(--shadow)] ring-1 ring-accent/10 relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5"
            style={{ background: "radial-gradient(circle at right, var(--accent), transparent)" }} />
          <div className="relative z-10 sm:flex items-center justify-between gap-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                🤖 Powered by Claude AI
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Meet your AI Career Coach
              </h2>
              <p className="mt-2 max-w-lg text-fg-muted text-pretty">
                Ask anything — what to learn next, which jobs you&apos;re ready for, how to switch from
                Java to AI, what skills you&apos;re missing. The coach uses your profile for personalized answers.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 shrink-0">
              <Link href="/coach" className="btn-gradient rounded-full px-6 py-3 font-semibold whitespace-nowrap">
                Chat with AI Coach →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING TOPICS ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Start <span className="text-gradient">learning today</span>
          </h2>
          <Link href="/learn" className="text-sm font-medium text-accent hover:opacity-70">
            All guides →
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

      {/* ── LATEST JOBS ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Latest <span className="text-gradient">AI jobs</span>
          </h2>
          <Link href="/jobs" className="text-sm font-medium text-accent hover:opacity-70">
            See all openings →
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="glass rounded-2xl border border-border p-6 text-sm text-fg-muted shadow-[var(--shadow)]">
            Jobs refresh daily from company career portals.{" "}
            <Link href="/learn" className="font-medium text-accent">Start learning</Link>{" "}
            while you wait.
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

      {/* ── PROMISES ── */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
              <p className="text-3xl">{p.emoji}</p>
              <h3 className="mt-3 font-bold text-lg">{p.title}</h3>
              <p className="mt-1 text-sm text-fg-muted text-pretty">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/assessment" className="btn-gradient rounded-full px-8 py-4 font-semibold text-lg">
            Find My AI Career Path →
          </Link>
          <p className="mt-3 text-sm text-fg-muted">Takes 3 minutes. Free forever.</p>
        </div>
      </section>
    </>
  );
}
