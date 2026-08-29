import type { Metadata } from "next";
import CareerCoach from "@/components/CareerCoach";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Career Coach — CareerPath AI",
  description:
    "Chat with CareerPath AI — your personal AI career coach for India. Get personalized advice on learning, skills, job readiness, and career transitions.",
  alternates: { canonical: `${SITE.url}/coach` },
};

export default function CoachPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
          🤖 Powered by Claude AI
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          AI <span className="text-gradient">Career Coach</span>
        </h1>
        <p className="mt-3 max-w-xl text-fg-muted text-pretty">
          Ask anything about your AI career — what to learn, which jobs you match,
          how to switch into AI, what skills you&apos;re missing. CareerPath AI uses your
          profile to give personalized answers.
        </p>
      </div>
      <CareerCoach />
    </div>
  );
}
