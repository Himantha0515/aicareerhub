import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { SITE } from "@/lib/site";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export const runtime = "nodejs";

const TYPES = new Set(["bug", "job", "content", "other"]);

const TYPE_LABELS: Record<string, string> = {
  bug: "Bug",
  job: "Job issue",
  content: "Content idea",
  other: "Other",
};

type FeedbackPayload = {
  type: string;
  typeLabel: string;
  message: string;
  email: string;
  pageUrl: string;
  receivedAt: string;
  source: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMailBodies(f: FeedbackPayload) {
  const text = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "  AI CareerPath — New Feedback",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `Type      : ${f.typeLabel}`,
    `From      : ${f.email || "(not provided)"}`,
    `Page      : ${f.pageUrl || "(unknown)"}`,
    `Received  : ${f.receivedAt}`,
    "",
    "────────── Message ──────────",
    f.message,
    "─────────────────────────────",
    "",
    "Saved to Firebase Firestore + emailed from AI CareerPath.",
  ].join("\n");

  const html = `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#12101f">
    <div style="background:linear-gradient(120deg,#6366f1,#8b5cf6 45%,#d946ef);padding:18px 20px;border-radius:14px 14px 0 0">
      <h1 style="margin:0;font-size:18px;color:#fff">AI CareerPath — New Feedback</h1>
    </div>
    <div style="border:1px solid #e4e6f0;border-top:0;border-radius:0 0 14px 14px;padding:20px;background:#fff">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#5b5f75;width:90px">Type</td><td style="padding:6px 0;font-weight:600">${escapeHtml(f.typeLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#5b5f75">From</td><td style="padding:6px 0">${escapeHtml(f.email || "(not provided)")}</td></tr>
        <tr><td style="padding:6px 0;color:#5b5f75">Page</td><td style="padding:6px 0;word-break:break-all">${escapeHtml(f.pageUrl || "(unknown)")}</td></tr>
        <tr><td style="padding:6px 0;color:#5b5f75">Received</td><td style="padding:6px 0">${escapeHtml(f.receivedAt)}</td></tr>
      </table>
      <div style="margin-top:16px;padding:14px;border-radius:12px;background:#f1f2f9">
        <div style="font-size:12px;font-weight:700;color:#5b5f75;margin-bottom:8px">MESSAGE</div>
        <div style="white-space:pre-wrap;line-height:1.5">${escapeHtml(f.message)}</div>
      </div>
    </div>
  </div>`;

  return { text, html };
}

function persistLocally(f: FeedbackPayload) {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "feedback-inbox.json");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  let list: FeedbackPayload[] = [];
  try {
    if (existsSync(file)) {
      list = JSON.parse(readFileSync(file, "utf8")) as FeedbackPayload[];
      if (!Array.isArray(list)) list = [];
    }
  } catch {
    list = [];
  }
  list.unshift(f);
  writeFileSync(file, JSON.stringify(list.slice(0, 200), null, 2), "utf8");
}

async function saveToFirestore(f: FeedbackPayload) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured in env");
  }
  const write = addDoc(collection(getDb(), "feedback"), {
    type: f.type,
    typeLabel: f.typeLabel,
    message: f.message,
    email: f.email || null,
    pageUrl: f.pageUrl || null,
    receivedAt: f.receivedAt,
    source: f.source,
    createdAt: serverTimestamp(),
  });
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            "Firestore timed out. Enable Cloud Firestore for project ai-careerpath-e6bd54, then retry.",
          ),
        ),
      12_000,
    );
  });
  const docRef = await Promise.race([write, timeout]);
  return docRef.id;
}

async function sendViaGmail(f: FeedbackPayload) {
  const user = process.env.GMAIL_USER || SITE.feedbackEmail;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD is not set");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const { text, html } = buildMailBodies(f);
  await transporter.sendMail({
    from: `"AI CareerPath Feedback" <${user}>`,
    to: SITE.feedbackEmail,
    replyTo: f.email || user,
    subject: `[AI CareerPath Feedback] ${f.typeLabel}`,
    text,
    html,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      type?: string;
      message?: string;
      email?: string;
      pageUrl?: string;
    };

    const type = (body.type ?? "").trim();
    const message = (body.message ?? "").trim();
    const email = (body.email ?? "").trim();
    const pageUrl = (body.pageUrl ?? "").trim();

    if (!TYPES.has(type)) {
      return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 });
    }
    if (message.length < 8 || message.length > 4000) {
      return NextResponse.json(
        { error: "Message must be between 8 and 4000 characters" },
        { status: 400 },
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const payload: FeedbackPayload = {
      type,
      typeLabel: TYPE_LABELS[type] ?? type,
      message,
      email,
      pageUrl,
      receivedAt: new Date().toISOString(),
      source: "aicareerhub-web",
    };

    try {
      persistLocally(payload);
    } catch (e) {
      console.error("[feedback] local persist failed", e);
    }

    let firestoreId: string | null = null;
    try {
      firestoreId = await saveToFirestore(payload);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[feedback] Firestore save failed", msg);
      return NextResponse.json(
        {
          error:
            "Could not save to Firebase yet. Open Firestore in the Firebase console and Create database (production mode), then retry.",
          detail: process.env.NODE_ENV === "development" ? msg : undefined,
        },
        { status: 502 },
      );
    }

    try {
      await sendViaGmail(payload);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[feedback] Gmail send failed", msg);
      // Firestore already saved — still report partial success
      return NextResponse.json({
        success: true,
        firestoreId,
        emailSent: false,
        warning:
          "Saved to Firebase, but email notify failed. Check GMAIL_APP_PASSWORD.",
      });
    }

    return NextResponse.json({
      success: true,
      firestoreId,
      emailSent: true,
    });
  } catch (err) {
    console.error("[feedback]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
