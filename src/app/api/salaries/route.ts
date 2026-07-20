import { NextResponse } from "next/server";
import { fetchSalaries } from "@/lib/content-client";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await fetchSalaries());
}
