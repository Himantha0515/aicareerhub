import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { Job } from "@/lib/jobs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "scraped-jobs.json");

export type ScrapedJobsFile = {
  updatedAt: string;
  count: number;
  jobs: Job[];
};

function dedupKey(job: Job): string {
  return [job.title, job.company, job.location]
    .map((s) => s.toLowerCase().trim())
    .join("|");
}

export function dedupeJobs(jobs: Job[]): Job[] {
  const keys = new Set<string>();
  const out: Job[] = [];
  for (const job of jobs) {
    const key = dedupKey(job);
    if (keys.has(key)) continue;
    keys.add(key);
    out.push(job);
  }
  return out;
}

export function mergeCuratedAndScraped(
  curated: Job[],
  scraped: Job[],
): Job[] {
  const keys = new Set<string>();
  const merged: Job[] = [];

  for (const job of curated) {
    const key = dedupKey(job);
    keys.add(key);
    merged.push(job);
  }
  for (const job of scraped) {
    const key = dedupKey(job);
    if (keys.has(key)) continue;
    keys.add(key);
    merged.push(job);
  }

  return merged.sort(
    (a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt),
  );
}

export function loadScrapedJobs(): Job[] {
  try {
    if (!existsSync(DATA_FILE)) return [];
    const raw = readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as ScrapedJobsFile | Job[];
    if (Array.isArray(parsed)) return parsed;
    return Array.isArray(parsed.jobs) ? parsed.jobs : [];
  } catch (e) {
    console.error("[scraped-jobs] read failed", e);
    return [];
  }
}

/** In-memory mirror for the current process (kept in sync after writes). */
export let SCRAPED_JOBS: Job[] = loadScrapedJobs();

export function saveScrapedJobs(jobs: Job[]): ScrapedJobsFile {
  const deduped = dedupeJobs(jobs).sort(
    (a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt),
  );
  const payload: ScrapedJobsFile = {
    updatedAt: new Date().toISOString(),
    count: deduped.length,
    jobs: deduped,
  };
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), "utf8");
  SCRAPED_JOBS = deduped;
  return payload;
}

export function updateScrapedJobs(newJobs: Job[]): void {
  saveScrapedJobs(newJobs);
}

export function getScrapedJobs(): Job[] {
  // Prefer fresh disk read so Next.js server picks up Action commits / scrape runs
  SCRAPED_JOBS = loadScrapedJobs();
  return SCRAPED_JOBS;
}
