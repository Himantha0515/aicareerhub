"use client";

import type { InterviewQuestion } from "@/lib/interview-questions";

const DIFF_COLORS: Record<InterviewQuestion["difficulty"], string> = {
  beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const TYPE_LABEL: Record<InterviewQuestion["type"], string> = {
  theoretical: "Conceptual",
  practical: "Practical",
};

export default function QuestionAccordion({
  questions,
}: {
  questions: InterviewQuestion[];
}) {
  const grouped = {
    beginner: questions.filter((q) => q.difficulty === "beginner"),
    intermediate: questions.filter((q) => q.difficulty === "intermediate"),
    advanced: questions.filter((q) => q.difficulty === "advanced"),
  };

  const sections: {
    key: InterviewQuestion["difficulty"];
    label: string;
    emoji: string;
  }[] = [
    { key: "beginner", label: "Beginner", emoji: "🌱" },
    { key: "intermediate", label: "Intermediate", emoji: "🚀" },
    { key: "advanced", label: "Advanced", emoji: "🏔️" },
  ];

  return (
    <div className="space-y-10">
      {sections.map(
        (section) =>
          grouped[section.key].length > 0 && (
            <div key={section.key}>
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight">
                <span aria-hidden>{section.emoji}</span>
                {section.label}
                <span className="ml-1 text-sm font-normal text-fg-muted">
                  ({grouped[section.key].length})
                </span>
              </h3>
              <div className="mt-4 space-y-3">
                {grouped[section.key].map((q) => (
                  <details
                    key={q.id}
                    className="group rounded-2xl border border-border bg-surface shadow-[var(--shadow)] transition-colors open:border-accent/50"
                  >
                    <summary className="flex cursor-pointer items-start gap-3 p-5 text-fg [&::-webkit-details-marker]:hidden">
                      <span className="mt-0.5 text-accent transition-transform group-open:rotate-90">
                        ▶
                      </span>
                      <span className="flex-1 font-medium">{q.question}</span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFF_COLORS[q.difficulty]}`}
                      >
                        {TYPE_LABEL[q.type]}
                      </span>
                    </summary>
                    <div className="border-t border-border px-5 py-4 pl-12">
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
}
