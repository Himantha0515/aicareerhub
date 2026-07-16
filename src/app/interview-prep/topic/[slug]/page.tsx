import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS } from "@/lib/content";
import { getQuestionsByTopic, INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import { SITE } from "@/lib/site";
import QuestionAccordion from "@/components/QuestionAccordion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const topicSlugs = new Set(INTERVIEW_QUESTIONS.flatMap((q) => q.topicSlugs));
  return [...topicSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic not found" };
  return {
    title: `${topic.title} — interview questions`,
    description: `Practical and theoretical interview questions about ${topic.title.toLowerCase()} for AI roles in India.`,
    alternates: { canonical: `${SITE.url}/interview-prep/topic/${slug}` },
  };
}

export default async function TopicQuestionsPage({ params }: Props) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  const questions = getQuestionsByTopic(slug);
  if (!topic || questions.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/interview-prep"
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
            {questions.length} questions
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {topic.title}
          </h1>
        </div>
      </div>
      <p className="mt-4 text-fg-muted text-pretty">
        Click any question to reveal the answer. Questions are grouped by
        difficulty.
      </p>

      <div className="mt-10">
        <QuestionAccordion questions={questions} />
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href={`/learn/${slug}`}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          📚 Study this topic first
        </Link>
        <Link
          href="/interview-prep"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          ← Back to all topics
        </Link>
      </div>
    </div>
  );
}
