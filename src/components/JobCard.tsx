import Link from "next/link";
import { timeAgo, type Job } from "@/lib/jobs";

/* Deterministic gradient per company so avatars stay stable across renders. */
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, var(--indigo), var(--violet))",
  "linear-gradient(135deg, var(--violet), var(--fuchsia))",
  "linear-gradient(135deg, var(--cyan), var(--indigo))",
  "linear-gradient(135deg, var(--fuchsia), var(--rose))",
  "linear-gradient(135deg, var(--emerald), var(--cyan))",
  "linear-gradient(135deg, var(--amber), var(--rose))",
];

function avatarGradient(company: string): string {
  let hash = 0;
  for (const ch of company) hash = (hash * 31 + ch.codePointAt(0)!) | 0;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

/** Short link label so SEO tools do not flag long/duplicate job-title anchors. */
function shortJobLabel(title: string): string {
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 48) return cleaned;
  return `${cleaned.slice(0, 45).trimEnd()}…`;
}

export default function JobCard({ job }: { job: Job }) {
  const applyLabel = `Apply at ${job.company}`;

  return (
    <article className="card-3d group w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5 hover:border-accent/50">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white shadow-[var(--shadow)] sm:h-11 sm:w-11 sm:text-base"
          style={{ background: avatarGradient(job.company) }}
        >
          {job.company.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <Link
              href={`/jobs/${job.id}`}
              className="min-w-0 flex-1 text-sm font-semibold leading-snug text-fg break-words sm:text-base sm:truncate transition-colors group-hover:text-accent hover:text-accent"
            >
              {shortJobLabel(job.title)}
            </Link>
            <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent sm:px-2.5 sm:py-1 sm:text-xs">
              {timeAgo(job.postedAt)}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-fg-muted sm:text-sm">
            {job.company} · {job.location}
            {job.companyType ? ` · ${job.companyType}` : ""}
          </p>
        </div>
      </div>

      {job.tags.length > 0 && (
        <ul className="mt-3 flex min-w-0 flex-wrap gap-1.5 sm:mt-4">
          {job.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="max-w-full truncate rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex min-w-0 items-center justify-between gap-2 border-t border-border pt-3">
        <p className="min-w-0 truncate text-[11px] text-fg-muted sm:text-xs">
          Via {job.source}
        </p>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="shrink-0 max-w-[55%] truncate text-xs font-semibold text-accent transition-opacity hover:opacity-70 sm:text-sm"
          title={applyLabel}
        >
          {applyLabel}
        </a>
      </div>
    </article>
  );
}
