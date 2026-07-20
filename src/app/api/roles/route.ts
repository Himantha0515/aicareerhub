import { NextResponse } from "next/server";
import { fetchRoles } from "@/lib/content-client";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ roles: await fetchRoles() });
}
