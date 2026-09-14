import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ResumeData } from "@/lib/resume-types";

export const maxDuration = 60;
export const runtime = "nodejs";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type Body = {
  mode: "parse" | "rewrite";
  text?: string;
  resume?: ResumeData;
  targetRole?: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const body = (await req.json()) as Body;
    const targetRole = (body.targetRole || "AI / GenAI / ML Engineer").slice(0, 120);

    let prompt: string;
    if (body.mode === "parse") {
      const text = body.text?.trim() ?? "";
      if (text.length < 40) {
        return NextResponse.json(
          { error: "Paste at least a short resume or notes (40+ characters)." },
          { status: 400 },
        );
      }
      prompt = `You convert messy resume text or career notes into a structured JSON resume for AI roles in India.

Target role context: ${targetRole}

Return ONLY valid JSON matching this schema (no markdown):
{
  "fullName": string,
  "headline": string,
  "email": string,
  "phone": string,
  "location": string,
  "links": string[],
  "summary": string,
  "skills": string[],
  "experience": [{"company":string,"role":string,"location":string,"start":string,"end":string,"bullets":string[]}],
  "projects": [{"name":string,"link":string,"description":string,"bullets":string[]}],
  "education": [{"school":string,"degree":string,"year":string,"details":string}]
}

Rules:
- Improve clarity and use strong action verbs + metrics where plausible from the source.
- Do not invent employers, degrees, or dates that are not implied.
- Prefer 3–5 bullets per role/project max.
- Skills should be concrete technologies (Python, RAG, FastAPI, etc.).
- If a field is unknown, use "" or [].

SOURCE:
${text.slice(0, 8000)}`;
    } else {
      const resume = body.resume;
      if (!resume?.fullName && !resume?.summary && !(resume?.experience?.length)) {
        return NextResponse.json(
          { error: "Provide resume fields to rewrite." },
          { status: 400 },
        );
      }
      prompt = `You are an expert AI career resume writer for India hiring (GenAI, ML, MLOps).

Rewrite the following structured resume for the target role: ${targetRole}.

Goals:
- Strong ATS-friendly wording
- Quantify impact where the source allows
- Keep facts honest — do not invent companies, titles, or credentials
- Tighten summary to 2–3 sentences
- Prefer action verbs; drop fluff

Return ONLY valid JSON with the SAME schema as the input (fullName, headline, email, phone, location, links, summary, skills, experience, projects, education).

INPUT JSON:
${JSON.stringify(resume).slice(0, 10000)}`;
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3500,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as ResumeData;

    return NextResponse.json({ resume: normalizeResume(parsed) });
  } catch (err) {
    console.error("[resume-build]", err);
    return NextResponse.json(
      { error: "Resume generation failed. Please try again." },
      { status: 500 },
    );
  }
}

function normalizeResume(r: ResumeData): ResumeData {
  return {
    fullName: r.fullName ?? "",
    headline: r.headline ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    location: r.location ?? "",
    links: Array.isArray(r.links) ? r.links.filter(Boolean) : [],
    summary: r.summary ?? "",
    skills: Array.isArray(r.skills) ? r.skills.filter(Boolean) : [],
    experience: Array.isArray(r.experience)
      ? r.experience.map((e) => ({
          company: e.company ?? "",
          role: e.role ?? "",
          location: e.location ?? "",
          start: e.start ?? "",
          end: e.end ?? "",
          bullets: Array.isArray(e.bullets) ? e.bullets.filter(Boolean) : [],
        }))
      : [],
    projects: Array.isArray(r.projects)
      ? r.projects.map((p) => ({
          name: p.name ?? "",
          link: p.link ?? "",
          description: p.description ?? "",
          bullets: Array.isArray(p.bullets) ? p.bullets.filter(Boolean) : [],
        }))
      : [],
    education: Array.isArray(r.education)
      ? r.education.map((ed) => ({
          school: ed.school ?? "",
          degree: ed.degree ?? "",
          year: ed.year ?? "",
          details: ed.details ?? "",
        }))
      : [],
  };
}
