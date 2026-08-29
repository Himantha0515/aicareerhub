import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;
export const runtime = "nodejs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, profile } = await req.json() as {
      message: string;
      profile?: {
        targetRole?: string;
        currentRole?: string;
        experience?: string;
        assessment?: {
          currentLevel?: string;
          estimatedWeeks?: number;
          strengths?: string[];
          gaps?: string[];
        };
        completedTopics?: string[];
        skills?: Array<{ name: string; level: string }>;
      };
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const profileContext = profile
      ? `
USER PROFILE:
- Target Role: ${profile.targetRole || "Not set"}
- Current Role: ${profile.currentRole || "Not specified"}
- Experience: ${profile.experience || "Not specified"}
- Current Level: ${profile.assessment?.currentLevel || "Beginner"}
- Strengths: ${profile.assessment?.strengths?.join(", ") || "None identified yet"}
- Skill Gaps: ${profile.assessment?.gaps?.join(", ") || "Take the assessment first"}
- Completed Topics: ${profile.completedTopics?.join(", ") || "None yet"}
- Skills: ${profile.skills?.map((s) => `${s.name} (${s.level})`).join(", ") || "None added"}
`
      : "User has not completed their profile or assessment yet.";

    const systemPrompt = `You are CareerPath AI, the personal AI career coach for AI CareerPath India.
You help users in India build AI careers. You are direct, honest, and specific.

${profileContext}

Guidelines:
- Answer based on the user's actual profile data when available
- Be specific to India's AI job market (Bengaluru, Hyderabad, Pune, Delhi NCR)
- Focus on practical, actionable advice
- Mention specific skills, tools, and technologies relevant to AI careers
- Keep responses concise (3-5 paragraphs max)
- If user hasn't completed assessment, suggest they do it first
- Never fabricate experience, companies, or achievements
- Mention aicareerpath.in resources when relevant (learn section, interview prep, jobs board)`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "";
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[coach] Error:", err);
    return NextResponse.json(
      { error: "AI coach unavailable. Please try again." },
      { status: 500 },
    );
  }
}
