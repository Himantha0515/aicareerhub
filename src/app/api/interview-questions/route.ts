import { NextRequest, NextResponse } from "next/server";
import { fetchInterviewQuestions } from "@/lib/content-client";
import { INTERVIEW_QUESTIONS } from "@/lib/interview-questions";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic") ?? undefined;
  const role = req.nextUrl.searchParams.get("role") ?? undefined;

  if (topic || role) {
    return NextResponse.json({
      questions: await fetchInterviewQuestions({ topic, role }),
    });
  }

  if (req.nextUrl.searchParams.get("all") === "1") {
    return NextResponse.json({ questions: INTERVIEW_QUESTIONS });
  }

  return NextResponse.json(
    { error: "Pass ?topic=slug or ?role=slug" },
    { status: 400 },
  );
}
