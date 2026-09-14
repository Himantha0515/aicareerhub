"use client";

import Link from "next/link";
import { useRef } from "react";
import ResumePreview from "./ResumePreview";
import { RESUME_TEMPLATES } from "@/lib/resume-templates";
import { SAMPLE_RESUME } from "@/lib/resume-types";

type Props = {
  /** Limit how many cards show in the carousel strip */
  limit?: number;
  showSeeAll?: boolean;
};

export default function TemplateCarousel({ limit, showSeeAll = true }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const templates = limit ? RESUME_TEMPLATES.slice(0, limit) : RESUME_TEMPLATES;

  function scroll(dir: -1 | 1) {
    scroller.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-5 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {templates.map((t) => (
          <Link
            key={t.id}
            href={`/resume/build?template=${t.id}`}
            className="group snap-center shrink-0 w-[220px] sm:w-[240px]"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--glow)] group-hover:border-accent/40">
              <div className="h-2 w-full" style={{ background: t.accent }} />
              <div className="pointer-events-none origin-top scale-[0.42] h-[280px] overflow-hidden bg-slate-50 p-2">
                <ResumePreview data={SAMPLE_RESUME} templateId={t.id} compactPreview />
              </div>
              <div className="border-t border-border px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm">{t.name}</p>
                  {t.popular && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-fg-muted line-clamp-2">{t.blurb}</p>
                <p className="mt-2 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Use this template →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous templates"
          onClick={() => scroll(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-lg font-semibold hover:border-accent hover:text-accent"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next templates"
          onClick={() => scroll(1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-lg font-semibold hover:border-accent hover:text-accent"
        >
          ›
        </button>
      </div>

      {showSeeAll && (
        <div className="mt-6 text-center">
          <Link
            href="/resume/templates"
            className="inline-flex rounded-full border border-accent/40 px-6 py-2.5 text-sm font-semibold text-accent hover:bg-accent-soft"
          >
            See all resume templates
          </Link>
        </div>
      )}
    </div>
  );
}
