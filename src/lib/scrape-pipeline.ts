import { getFetchableCompanies } from "@/lib/companies";
import { fetchAllAtsJobs } from "@/lib/job-scrapers/ats";
import { saveScrapedJobs, mergeCuratedAndScraped } from "@/lib/scraped-jobs";
import { CURATED_JOBS, type Job } from "@/lib/jobs";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { resetContentSourceCache } from "@/lib/firestore-content";

export type ScrapeResult = {
  success: true;
  count: number;
  companiesFetched: number;
  companiesWithJobs: number;
  updatedAt: string;
  firestoreSynced: boolean;
  topCompanies: { company: string; count: number }[];
};

async function syncJobsToFirestore(jobs: Job[]): Promise<boolean> {
  if (!isAdminConfigured()) {
    console.warn(
      "[scrape] Admin not configured — skipped Firestore job sync (JSON only)",
    );
    return false;
  }

  const db = getAdminDb();
  const CHUNK = 400;
  for (let i = 0; i < jobs.length; i += CHUNK) {
    const batch = db.batch();
    for (const job of jobs.slice(i, i + CHUNK)) {
      batch.set(db.collection("jobs").doc(job.id), job, { merge: true });
    }
    await batch.commit();
  }

  await db.collection("meta").doc("content").set(
    {
      jobsUpdatedAt: new Date().toISOString(),
      jobsCount: jobs.length,
    },
    { merge: true },
  );

  resetContentSourceCache();
  return true;
}

export async function runJobScrape(): Promise<ScrapeResult> {
  const companies = getFetchableCompanies();
  console.log(`[scrape] Fetching ${companies.length} public ATS boards…`);

  const { jobs, stats } = await fetchAllAtsJobs(companies);
  const withJobs = stats
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  console.log(
    `[scrape] Raw matched jobs: ${jobs.length} from ${withJobs.length}/${companies.length} boards`,
  );

  const saved = saveScrapedJobs(jobs);
  const merged = mergeCuratedAndScraped(CURATED_JOBS, saved.jobs ?? jobs);

  let firestoreSynced = false;
  try {
    firestoreSynced = await syncJobsToFirestore(merged);
  } catch (e) {
    console.error("[scrape] Firestore sync failed", e);
  }

  return {
    success: true,
    count: saved.count,
    companiesFetched: companies.length,
    companiesWithJobs: withJobs.length,
    updatedAt: saved.updatedAt,
    firestoreSynced,
    topCompanies: withJobs.slice(0, 15),
  };
}

export type { Job };
