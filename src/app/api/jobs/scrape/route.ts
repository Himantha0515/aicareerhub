import { NextRequest, NextResponse } from "next/server";
import { fetchAdzunaJobs } from "@/lib/job-scrapers/adzuna";
import { fetchCareerjetJobs } from "@/lib/job-scrapers/careerjet";
import { updateScrapedJobs } from "@/lib/scraped-jobs";

export const maxDuration = 300; // 5 minutes for scraping

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log("[scrape] Starting job scrape...");

    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      return NextResponse.json(
        { error: "Missing Adzuna credentials" },
        { status: 500 }
      );
    }

    // Fetch from primary source (Adzuna)
    const adzunaJobs = await fetchAdzunaJobs(appId, appKey);
    console.log(`[scrape] Adzuna: ${adzunaJobs.length} jobs`);

    // If primary fails, try fallback (Careerjet)
    let allJobs = adzunaJobs;
    if (adzunaJobs.length === 0) {
      const careerjetJobs = await fetchCareerjetJobs();
      console.log(`[scrape] Careerjet (fallback): ${careerjetJobs.length} jobs`);
      allJobs = careerjetJobs;
    }

    // Update the in-memory store
    updateScrapedJobs(allJobs);

    console.log(`[scrape] Complete: ${allJobs.length} jobs stored`);

    return NextResponse.json({
      success: true,
      count: allJobs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[scrape] Error:", err);
    return NextResponse.json(
      {
        error: "Scrape failed",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
