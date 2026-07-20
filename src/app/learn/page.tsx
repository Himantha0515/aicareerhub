import type { Metadata } from "next";
import Link from "next/link";
import type { Topic } from "@/lib/content";
import { fetchTopics } from "@/lib/content-client";

export const metadata: Metadata = {
  title: "Learn AI — free guides from zero",
  description:
    "Free, plain-English guides to AI, LLMs, RAG, MCP, agents, fine-tuning and MLOps. Written for students and beginners, no PhD required.",
};

const GROUPS: Topic["level"][] = ["Start here", "Core", "Advanced"];

const GROUP_BLURB: Record<Topic["level"], string> = {
  "Start here": "No background assumed. Begin at the top and work down.",
  Core: "The ideas behind most AI products being built right now.",
  Advanced: "What separates a demo from something that survives production.",
};

const GROUP_EMOJI: Record<Topic["level"], string> = {
  "Start here": "🌱",
  Core: "🚀",
  Advanced: "🏔️",
};

export default async function LearnPage() {
  const topics = await fetchTopics();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
        🎓 Free, always — no sign-up walls
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        Learn AI <span className="text-gradient">from zero</span>
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted text-pretty">
        Everything here starts from zero and stays in plain English. You do not
        need a degree, a GPU, or maths beyond school level to begin.
      </p>

      {GROUPS.map((group) => {
        const groupTopics = topics.filter((t) => t.level === group);
        if (groupTopics.length === 0) return null;

        return (
          <section key={group} className="mt-14">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span aria-hidden>{GROUP_EMOJI[group]}</span>
              <span className="text-gradient">{group}</span>
            </h2>
            <p className="mt-1 text-sm text-fg-muted">{GROUP_BLURB[group]}</p>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {groupTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/learn/${topic.slug}`}
                    className="card-3d group block rounded-2xl border border-border bg-surface p-6 hover:border-accent/50"
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl shadow-[var(--shadow)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: topic.gradient }}
                      >
                        {topic.emoji}
                      </span>
                      <div>
                        <h3 className="font-semibold text-fg transition-colors group-hover:text-accent">
                          {topic.title}
                        </h3>
                        <p className="mt-2 text-sm text-fg-muted text-pretty">
                          {topic.blurb}
                        </p>
                      </div>
                    </div>
                    {topic.hasGuide ? (
                      <p className="mt-4 text-sm font-medium text-accent transition-opacity group-hover:opacity-70">
                        Read the guide →
                      </p>
                    ) : (
                      <p className="mt-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                        Guide coming soon
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
