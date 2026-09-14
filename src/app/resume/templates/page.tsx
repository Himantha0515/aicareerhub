import type { Metadata } from "next";
import Link from "next/link";
import TemplateCarousel from "@/components/resume/TemplateCarousel";
import { RESUME_TEMPLATES } from "@/lib/resume-templates";
import ResumePreview from "@/components/resume/ResumePreview";
import { SAMPLE_RESUME } from "@/lib/resume-types";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume Templates — 16 Professional Designs",
  description:
    "Browse 16 free, editable resume templates for AI, ML, GenAI, and tech roles in India. Pick one and start building instantly.",
  alternates: { canonical: `${SITE.url}/resume/templates` },
};

export default function ResumeTemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-medium text-accent">
        <Link href="/resume" className="hover:opacity-70">
          Resume Builder
        </Link>{" "}
        / Templates
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Templates</h1>
      <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
        {RESUME_TEMPLATES.length} professional templates — pick one to edit with your details or AI rewrite.
      </p>

      <div className="mt-10">
        <TemplateCarousel showSeeAll={false} />
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {RESUME_TEMPLATES.map((t) => (
          <Link
            key={t.id}
            href={`/resume/build?template=${t.id}`}
            className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--glow)]"
          >
            <div className="h-1.5 w-full" style={{ background: t.accent }} />
            <div className="pointer-events-none h-[300px] overflow-hidden bg-slate-50 p-2 origin-top scale-[0.95]">
              <div className="origin-top scale-[0.48] h-[520px]">
                <ResumePreview data={SAMPLE_RESUME} templateId={t.id} compactPreview />
              </div>
            </div>
            <div className="border-t border-border px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{t.name}</p>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase text-fg-muted">
                  {t.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-fg-muted">{t.blurb}</p>
              <p className="mt-2 text-sm font-semibold text-accent">Use template →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
