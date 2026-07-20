import { NextRequest, NextResponse } from "next/server";
import { runJobScrape } from "@/lib/scrape-pipeline";

export const maxDuration = 300;
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.CRON_SECRET;

  // Allow unauthenticated local runs only when CRON_SECRET is unset (dev).
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runJobScrape();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[scrape] Error:", err);
    return NextResponse.json(
      {
        error: "Scrape failed",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
