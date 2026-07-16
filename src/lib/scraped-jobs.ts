import type { Job } from "@/lib/jobs";

// In-memory store for scraped jobs. In production, move to database.
export let SCRAPED_JOBS: Job[] = [];

/**
 * Compute dedup key: (title + company + location) lowercase
 */
function dedupKey(job: Job): string {
  return [job.title, job.company, job.location]
    .map((s) => s.toLowerCase().trim())
    .join("|");
}

/**
 * Merge curated and scraped jobs, remove duplicates.
 * Curated jobs take precedence (appear first).
 */
export function mergeCuratedAndScraped(
  curated: Job[],
  scraped: Job[]
): Job[] {
  const keys = new Set<string>();
  const merged: Job[] = [];

  // Add all curated jobs (and track their dedup keys)
  for (const job of curated) {
    const key = dedupKey(job);
    keys.add(key);
    merged.push(job);
  }

  // Add scraped jobs that don't duplicate curated ones
  for (const job of scraped) {
    const key = dedupKey(job);
    if (!keys.has(key)) {
      keys.add(key);
      merged.push(job);
    }
  }

  return merged.sort(
    (a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt)
  );
}

/**
 * Replace scraped jobs with a new batch.
 * Used by the scrape endpoint to update the store.
 */
export function updateScrapedJobs(newJobs: Job[]): void {
  // Deduplicate within the new batch itself
  const keys = new Set<string>();
  const deduped: Job[] = [];

  for (const job of newJobs) {
    const key = dedupKey(job);
    if (!keys.has(key)) {
      keys.add(key);
      deduped.push(job);
    }
  }

  SCRAPED_JOBS = deduped;
}
