import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchInterviewQuestions,
  fetchRole,
  fetchRoles,
} from "@/lib/content-client";
import { SITE } from "@/lib/site";
import QuestionAccordion from "@/components/QuestionAccordion";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const roles = await fetchRoles();
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchRole(slug);
  if (!data?.role) return { title: "Role not found" };
  return {
    title: `${data.role.title} — interview questions`,
    description: `Interview questions commonly asked for ${data.role.title} positions at AI companies in India.`,
    alternates: { canonical: `${SITE.url}/interview-prep/role/${slug}` },
  };
}

export default async function RoleQuestionsPage({ params }: Props) {
  const { slug } = await params;
  const [data, questions] = await Promise.all([
    fetchRole(slug),
    fetchInterviewQuestions({ role: slug }),
  ]);
  if (!data?.role || questions.length === 0) notFound();

  const { role } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/interview-prep"
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← All roles
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl shadow-[var(--shadow)]"
          style={{ background: role.gradient }}
        >
          {role.emoji}
        </span>
        <div>
          <span className="inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent">
            {questions.length} questions
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {role.title}
          </h1>
        </div>
      </div>
      <p className="mt-4 text-fg-muted text-pretty">
        Questions you might face when interviewing for {role.title} positions.
        Click to reveal answers, grouped by difficulty.
      </p>

      <div className="mt-10">
        <QuestionAccordion questions={questions} />
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href={`/careers/${slug}`}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          🧭 Full career guide
        </Link>
        <Link
          href="/salaries"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          💰 Salary data
        </Link>
        <Link
          href="/interview-prep"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          ← Back to all roles
        </Link>
      </div>
    </div>
  );
}
