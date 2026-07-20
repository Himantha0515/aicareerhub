/**
 * Daily / local job refresh from company ATS boards.
 * Usage: npx tsx scripts/scrape-jobs.ts
 */
import { runJobScrape } from "../src/lib/scrape-pipeline";

async function main() {
  const result = await runJobScrape();
  console.log(JSON.stringify(result, null, 2));
  if (result.count === 0) {
    console.warn(
      "[scrape] No jobs matched filters. Check ATS tokens / role-location filters.",
    );
    process.exitCode = 0;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
