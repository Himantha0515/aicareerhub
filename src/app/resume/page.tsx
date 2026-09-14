import type { Metadata } from "next";
import Link from "next/link";
import TemplateCarousel from "@/components/resume/TemplateCarousel";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Resume Builder — Professional Templates for AI Careers",
  description:
    "Build an ATS-friendly resume for GenAI, ML, and data roles in India. Pick from 16 professional templates, browse examples, rewrite with AI, and download PDF.",
  alternates: { canonical: `${SITE.url}/resume` },
};

export default function ResumeLandingPage() {
  return (
    <div className="relative overflow-x-clip">
      {/* Soft atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(109 62 245 / 0.18), transparent 70%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
            Professional AI Resume Builder · Free
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The best online resume builder for{" "}
            <span className="text-gradient">AI careers</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fg-muted text-pretty">
            Pick a polished template, fill your details or paste an old resume, rewrite with AI
            for GenAI/ML roles, and download a recruiter-ready PDF.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/resume/build"
              className="btn-gradient rounded-full px-7 py-3.5 text-base font-semibold"
            >
              Create my resume now
            </Link>
            <Link
              href="/resume/templates"
              className="rounded-full border border-border bg-surface px-7 py-3.5 text-base font-semibold hover:border-accent hover:text-accent"
            >
              Browse templates
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-accent">
            <span>16 professional templates</span>
            <span className="text-border">·</span>
            <span>AI rewrite for target roles</span>
            <span className="text-border">·</span>
            <span>ATS-friendly layouts</span>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pick from free resume templates
          </h2>
          <p className="mt-3 text-fg-muted">
            Click any template to start editing — every layout is fully customizable.
          </p>
        </div>
        <TemplateCarousel />
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 rounded-3xl border border-border bg-surface p-8 shadow-[var(--shadow)] sm:grid-cols-3 sm:p-10">
          {[
            {
              title: "Use existing templates",
              body: "Sixteen pickable designs — modern headers, sidebars, ATS classic, and GenAI-focused layouts.",
              href: "/resume/templates",
              cta: "View all templates",
            },
            {
              title: "Resume examples",
              body: "See real AI-career examples for GenAI, ML, fresher, internship, and career-switch paths.",
              href: "/resume/examples",
              cta: "Browse examples",
            },
            {
              title: "ATS analyzer",
              body: "Already have a resume? Score ATS fit and AI-career readiness with Claude.",
              href: "/resume/analyze",
              cta: "Analyze resume",
            },
          ].map((card) => (
            <div key={card.href} className="min-w-0">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-sm text-fg-muted text-pretty">{card.body}</p>
              <Link
                href={card.href}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:opacity-80"
              >
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
