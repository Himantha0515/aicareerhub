import type { Metadata } from "next";
import Link from "next/link";
import ExamplesBrowser from "@/components/resume/ExamplesBrowser";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume Examples — AI Career Paths",
  description:
    "Browse professional resume examples for GenAI engineers, ML engineers, freshers, internships, and career switchers in India.",
  alternates: { canonical: `${SITE.url}/resume/examples` },
};

export default function ResumeExamplesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-medium text-accent">
        <Link href="/resume" className="hover:opacity-70">
          Resume Builder
        </Link>{" "}
        / Examples
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Resume examples</h1>
      <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
        Explore role-ready samples, then customize them with our AI builder and templates.
      </p>
      <ExamplesBrowser />
      <div className="mt-10 text-center">
        <Link
          href="/resume/build"
          className="btn-gradient inline-flex rounded-full px-6 py-3 font-semibold"
        >
          Build my resume →
        </Link>
      </div>
    </div>
  );
}
