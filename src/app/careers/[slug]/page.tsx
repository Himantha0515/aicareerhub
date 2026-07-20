import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRole, fetchRoles, fetchTopics } from "@/lib/content-client";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const roles = await fetchRoles();
  return roles.filter((r) => r.hasGuide).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchRole(slug);
  if (!data?.role) return { title: "Role not found" };
  return {
    title: `${data.role.title} — career guide`,
    description: data.role.summary,
    alternates: { canonical: `${SITE.url}/careers/${slug}` },
  };
}

export default async function RoleGuidePage({ params }: Props) {
  const { slug } = await params;
  const [data, topics] = await Promise.all([fetchRole(slug), fetchTopics()]);
  if (!data?.role || !data.guide) notFound();

  const { role, guide } = data;
  const relatedTopics = topics.filter((t) =>
    guide.relatedTopics.includes(t.slug),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/careers"
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← All career paths
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl shadow-[var(--shadow)]"
          style={{ background: role.gradient }}
        >
          {role.emoji}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {role.title}
          </h1>
          <p className="mt-1 text-sm text-fg-muted">{role.summary}</p>
        </div>
      </div>

      <section className="mt-10 glass rounded-2xl border border-border p-6 shadow-[var(--shadow)]">
        <h2 className="text-xl font-bold tracking-tight">Overview</h2>
        <div className="mt-3 space-y-3 text-fg-muted leading-relaxed">
          {guide.overview.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-8 glass rounded-2xl border border-border p-6 shadow-[var(--shadow)]">
        <h2 className="text-xl font-bold tracking-tight">
          What you actually do <span className="text-gradient">day to day</span>
        </h2>
        <ul className="mt-4 space-y-3">
          {guide.dayToDay.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-fg-muted">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Career <span className="text-gradient">progression</span>
        </h2>
        <div className="mt-6 space-y-4">
          {guide.careerProgression.map((step) => (
            <div
              key={step.level}
              className="card-3d rounded-2xl border border-border bg-surface p-5 hover:border-accent/50"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                  style={{ background: role.gradient }}
                >
                  {step.level.slice(0, 2).toUpperCase()}
                </span>
                <h3 className="font-semibold text-fg">{step.title}</h3>
              </div>
              <p className="mt-2 text-sm text-fg-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">
          What you <span className="text-gradient">need</span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--emerald), var(--cyan))",
                }}
              >
                ✓
              </span>
              Must have
            </h3>
            <ul className="mt-3 space-y-2">
              {guide.requiredBackground.must.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--amber), var(--rose))",
                }}
              >
                +
              </span>
              Helpful
            </h3>
            <ul className="mt-3 space-y-2">
              {guide.requiredBackground.helpful.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--rose), var(--fuchsia))",
                }}
              >
                ✗
              </span>
              You do NOT need
            </h3>
            <ul className="mt-3 space-y-2">
              {guide.requiredBackground.notNeeded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">
          Switching <span className="text-gradient">from...</span>
        </h2>
        <p className="mt-2 text-sm text-fg-muted">
          Already working in another field? Here is how your background maps.
        </p>
        <div className="mt-6 space-y-4">
          {guide.switchingFrom.map((sw) => (
            <div
              key={sw.background}
              className="glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]"
            >
              <h3 className="font-semibold text-fg">{sw.background}</h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {sw.path}
              </p>
            </div>
          ))}
        </div>
      </section>

      {relatedTopics.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">
            Topics to <span className="text-gradient">learn</span>
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/learn/${topic.slug}`}
                className="card-3d flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:border-accent/50"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                  style={{ background: topic.gradient }}
                >
                  {topic.emoji}
                </span>
                <div>
                  <p className="font-semibold text-fg">{topic.title}</p>
                  <p className="mt-0.5 text-xs text-fg-muted">Read the guide →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href={`/interview-prep/role/${slug}`}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          📝 Interview questions for this role
        </Link>
        <Link
          href="/salaries"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          💰 Salary data
        </Link>
        <Link
          href={`/jobs?q=${encodeURIComponent(role.title.split(" ")[0])}`}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          🔍 Open positions
        </Link>
      </div>
    </div>
  );
}
