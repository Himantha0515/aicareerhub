import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/admin/seed?secret=CRON_SECRET
 * Runs the Firestore seed script (requires Admin credentials in env).
 */
export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-cron-secret");
  const expected = process.env.CRON_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.FIREBASE_SERVICE_ACCOUNT_JSON &&
    !process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  ) {
    return NextResponse.json(
      {
        error:
          "FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH required",
      },
      { status: 500 },
    );
  }

  const script = path.join(process.cwd(), "scripts", "seed-firestore.ts");

  const result = await new Promise<{ code: number; log: string }>((resolve) => {
    const child = spawn("npx", ["tsx", script], {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
    });
    let log = "";
    child.stdout.on("data", (d) => {
      log += d.toString();
    });
    child.stderr.on("data", (d) => {
      log += d.toString();
    });
    child.on("close", (code) => resolve({ code: code ?? 1, log }));
  });

  if (result.code !== 0) {
    return NextResponse.json(
      { error: "Seed failed", log: result.log.slice(-2000) },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    log: result.log.slice(-2000),
  });
}
