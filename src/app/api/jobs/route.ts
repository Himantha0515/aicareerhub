import { NextRequest, NextResponse } from "next/server";
import { fetchJobs } from "@/lib/content-client";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const type = sp.get("type") ?? undefined;
  const data = await fetchJobs({
    q: sp.get("q") ?? undefined,
    tag: sp.get("tag") ?? undefined,
    type: type === "product" || type === "service" ? type : undefined,
    includeTags: sp.get("includeTags") === "1",
  });
  return NextResponse.json(data);
}
