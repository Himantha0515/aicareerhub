import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob } from "@/lib/content-client";
import { timeAgo } from "@/lib/jobs";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) return { title: "Job not found" };

  return {
    title: `${job.title} at ${job.company}`,
    description: `${job.title} — ${job.company}, ${job.location}. Apply on the company careers site.`,
    alternates: { canonical: `${SITE.url}/jobs/${job.id}` },
  };
}

export default async function JobDetail({ params }: Props) {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description.join(" "),
    datePosted: job.postedAt,
    ...(job.jobType ? { employmentType: job.jobType } : {}),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location },
    },
    directApply: false,
    url: `${SITE.url}/jobs/${job.id}`,
  };

  return (
    <article className="mx-auto max-w-(--container-prose) px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/jobs"
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        ← All jobs
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
        {job.title}
      </h1>
      <p className="mt-2 text-fg-muted">
        {job.company} · {job.location} · posted {timeAgo(job.postedAt)}
      </p>

      {job.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <a
        href={job.applyUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn-gradient mt-6 inline-block rounded-full px-6 py-3 font-semibold"
      >
        Apply on company site →
      </a>

      <div className="mt-10 space-y-4 border-t border-border pt-8 leading-relaxed text-fg-muted">
        {job.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-xs text-fg-muted">
        Listed here from {job.source}. Apply opens the employer&rsquo;s own
        careers portal. {SITE.name} is not the employer and does not process
        applications. Never pay a fee to apply for a job.
      </p>
    </article>
  );
}
