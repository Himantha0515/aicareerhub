import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchTopic, fetchTopics } from "@/lib/content-client";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const topics = await fetchTopics();
  return topics.filter((t) => t.hasGuide).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchTopic(slug);
  if (!data?.topic) return { title: "Guide not found" };
  return {
    title: data.topic.title,
    description: data.topic.blurb,
    alternates: { canonical: `${SITE.url}/learn/${slug}` },
  };
}

export default async function TopicGuidePage({ params }: Props) {
  const { slug } = await params;
  const [data, topics] = await Promise.all([fetchTopic(slug), fetchTopics()]);
  if (!data?.topic || !data.guide) notFound();

  const { topic, guide } = data;
  const idx = topics.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? topics[idx - 1] : null;
  const next = idx < topics.length - 1 ? topics[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/learn"
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← All topics
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl shadow-[var(--shadow)]"
          style={{ background: topic.gradient }}
        >
          {topic.emoji}
        </span>
        <div>
          <span className="inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent">
            {topic.level}
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {topic.title}
          </h1>
        </div>
      </div>
      <p className="mt-4 text-lg text-fg-muted text-pretty">{guide.hero}</p>

      <div className="mt-12 space-y-8">
        {guide.sections.map((section, i) => (
          <section
            key={i}
            className="glass rounded-2xl border border-border p-6 shadow-[var(--shadow)]"
          >
            <h2 className="text-xl font-bold tracking-tight text-fg">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-fg-muted leading-relaxed">
              {section.body.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-fg-muted"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {guide.subtopics.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">
            Key <span className="text-gradient">concepts</span>
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {guide.subtopics.map((sub) => (
              <div
                key={sub.name}
                className="card-3d rounded-2xl border border-border bg-surface p-5 hover:border-accent/50"
              >
                <h3 className="font-semibold text-fg">{sub.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{sub.oneliner}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {guide.tools.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">
            Tools & <span className="text-gradient">resources</span>
          </h2>
          <div className="mt-6 space-y-3">
            {guide.tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <span
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm"
                  style={{ background: topic.gradient, color: "#fff" }}
                >
                  🛠
                </span>
                <div>
                  <p className="font-semibold text-fg">{tool.name}</p>
                  <p className="text-sm text-fg-muted">{tool.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {guide.learningPath.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">
            Learning <span className="text-gradient">path</span>
          </h2>
          <ol className="mt-6 space-y-4">
            {guide.learningPath.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-[var(--shadow)]"
                  style={{ background: topic.gradient }}
                >
                  {i + 1}
                </span>
                <p className="pt-1 text-fg-muted">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href={`/interview-prep/topic/${slug}`}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          📝 Interview questions for this topic
        </Link>
        <Link
          href="/careers"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          🧭 Which roles use this?
        </Link>
      </div>

      <nav className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="card-3d rounded-2xl border border-border bg-surface p-5 hover:border-accent/50"
          >
            <p className="text-xs text-fg-muted">← Previous</p>
            <p className="mt-1 font-semibold text-fg">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="card-3d rounded-2xl border border-border bg-surface p-5 text-right hover:border-accent/50"
          >
            <p className="text-xs text-fg-muted">Next →</p>
            <p className="mt-1 font-semibold text-fg">{next.title}</p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
