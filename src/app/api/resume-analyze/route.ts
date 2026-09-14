import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;
export const runtime = "nodejs";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeText = formData.get("resumeText") as string;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!resumeText?.trim()) {
      return NextResponse.json({ error: "Resume text required" }, { status: 400 });
    }

    const jdSection = jobDescription?.trim()
      ? `\nJOB DESCRIPTION (optional — score match if provided):\n${jobDescription.trim().slice(0, 2000)}`
      : "";

    const prompt = `You are an expert AI career advisor and ATS (Applicant Tracking System) specialist focused on AI/ML roles in India.

Analyze the following resume and return a JSON response with this exact structure:
{
  "atsScore": <number 0-100>,
  "aiCareerScore": <number 0-100>,
  "overallSummary": "<2-3 sentence assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "missingSkills": ["<skill 1>", "<skill 2>", "<skill 3>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
  "atsIssues": ["<issue 1>", "<issue 2>"],
  "topRecommendations": ["<action 1>", "<action 2>", "<action 3>"],
  "experienceLevel": "Fresher|Junior|Mid|Senior|Lead",
  "detectedSkills": ["<skill 1>", "<skill 2>"],
  "jobMatchScore": <number 0-100 or null if no JD provided>,
  "jobMatchReasons": ["<reason 1>", "<reason 2>"] or []
}

ATS Score criteria:
- Proper sections (Experience, Education, Skills, Projects): +20
- No tables, columns, images, or fancy formatting: +15
- Standard fonts and clean layout (inferred): +15
- Quantified achievements (numbers, %): +20
- Action verbs at start of bullets: +15
- Contact info complete: +15

AI Career Score criteria:
- Relevant AI/ML skills present: +30
- Projects with AI/ML tools: +25
- Quantified ML impact: +20
- Certifications or courses: +10
- GitHub/portfolio links: +15

RESUME:
${resumeText.trim().slice(0, 4000)}
${jdSection}

Return ONLY valid JSON. No markdown, no explanation.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "{}";

    // Clean and parse JSON
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[resume-analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
