import { NextResponse } from "next/server";
import { fetchRole } from "@/lib/content-client";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const data = await fetchRole(slug);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}
