import { NextResponse } from "next/server";
import { fetchTopics } from "@/lib/content-client";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ topics: await fetchTopics() });
}
