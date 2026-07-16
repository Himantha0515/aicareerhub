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

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="card-3d group block rounded-2xl border border-border bg-surface p-5 hover:border-accent/50"
    >
      <div className="flex items-start gap-3.5">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-base font-bold text-white shadow-[var(--shadow)]"
          style={{ background: avatarGradient(job.company) }}
        >
          {job.company.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-fg transition-colors group-hover:text-accent">
            {job.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-fg-muted">
            {job.company} · {job.location}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          {timeAgo(job.postedAt)}
        </span>
      </div>

      {job.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {job.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
