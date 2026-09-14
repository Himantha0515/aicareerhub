"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ResumePreview from "./ResumePreview";
import {
  RESUME_EXAMPLE_CATEGORIES,
  RESUME_EXAMPLES,
  type ResumeExampleCategory,
} from "@/lib/resume-examples";

export default function ExamplesBrowser() {
  const [category, setCategory] = useState<ResumeExampleCategory>("genai");
  const examples = useMemo(
    () => RESUME_EXAMPLES.filter((e) => e.category === category),
    [category],
  );
  const active = examples[0] ?? RESUME_EXAMPLES[0]!;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="h-fit rounded-3xl border border-border bg-surface p-3 shadow-[var(--shadow)]">
        <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-fg-muted">
          Categories
        </p>
        <nav className="space-y-1">
          {RESUME_EXAMPLE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`w-full rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                category === c.id
                  ? "bg-accent text-white"
                  : "text-fg-muted hover:bg-accent-soft hover:text-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="relative">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 p-4 shadow-[var(--shadow)] sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{active.title}</h2>
              <p className="mt-1 text-sm text-fg-muted">{active.blurb}</p>
            </div>
            <Link
              href={`/resume/build?template=${active.templateId}&example=${active.id}`}
              className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Use this example →
            </Link>
          </div>
          <div className="mx-auto max-w-[640px]">
            <ResumePreview data={active.data} templateId={active.templateId} />
          </div>
        </div>

        {examples.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <Link
                key={ex.id}
                href={`/resume/build?template=${ex.templateId}&example=${ex.id}`}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-fg-muted hover:border-accent hover:text-accent"
              >
                {ex.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
