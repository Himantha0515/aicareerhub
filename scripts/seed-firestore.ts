/**
 * Seed Firestore content collections via Admin SDK.
 * Requires FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH in .env.local
 *
 * Usage: npm run seed:firestore
 */
import { readFileSync, existsSync } from "fs";
import path from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { TOPICS, ROLES } from "../src/lib/content";
import { TOPIC_GUIDES } from "../src/lib/topic-guides";
import { ROLE_GUIDES } from "../src/lib/role-guides";
import { SALARY_DATA } from "../src/lib/salaries";
import { INTERVIEW_QUESTIONS } from "../src/lib/interview-questions";
import { CURATED_JOBS } from "../src/lib/jobs";
import {
  getScrapedJobs,
  mergeCuratedAndScraped,
} from "../src/lib/scraped-jobs";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

function loadServiceAccount(): Record<string, unknown> | null {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) return JSON.parse(inline) as Record<string, unknown>;
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (filePath && existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, unknown>;
  }
  return null;
}

async function commitInChunks(
  db: ReturnType<typeof getFirestore>,
  ops: { col: string; id: string; data: Record<string, unknown> }[],
) {
  const CHUNK = 400;
  for (let i = 0; i < ops.length; i += CHUNK) {
    const batch = db.batch();
    for (const op of ops.slice(i, i + CHUNK)) {
      batch.set(db.collection(op.col).doc(op.id), op.data, { merge: true });
    }
    await batch.commit();
    console.log(`  wrote ${Math.min(i + CHUNK, ops.length)}/${ops.length}`);
  }
}

async function main() {
  loadEnvLocal();
  const sa = loadServiceAccount();
  if (!sa) {
    console.error(`
Missing Firebase Admin credentials.

1. Open https://console.firebase.google.com/project/ai-careerpath-e6bd54/settings/serviceaccounts/adminsdk
2. Click "Generate new private key"
3. Save the JSON file, then either:
   - Put path in .env.local: FIREBASE_SERVICE_ACCOUNT_PATH=C:\\\\path\\\\to\\\\key.json
   - Or paste minified JSON: FIREBASE_SERVICE_ACCOUNT_JSON={...}

Also publish firestore.rules (public read on content collections).
`);
    process.exit(1);
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert(sa as Parameters<typeof cert>[0]),
      projectId:
        (sa.project_id as string) ||
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
  const db = getFirestore();

  const guideSlugs = new Set(TOPIC_GUIDES.map((g) => g.slug));
  const roleGuideSlugs = new Set(ROLE_GUIDES.map((g) => g.slug));

  console.log("Seeding topics…");
  await commitInChunks(
    db,
    TOPICS.map((t) => ({
      col: "topics",
      id: t.slug,
      data: { ...t, hasGuide: guideSlugs.has(t.slug) },
    })),
  );

  console.log("Seeding topicGuides…");
  await commitInChunks(
    db,
    TOPIC_GUIDES.map((g) => ({
      col: "topicGuides",
      id: g.slug,
      data: { ...g },
    })),
  );

  console.log("Seeding roles…");
  await commitInChunks(
    db,
    ROLES.map((r) => ({
      col: "roles",
      id: r.slug,
      data: { ...r, hasGuide: roleGuideSlugs.has(r.slug) },
    })),
  );

  console.log("Seeding roleGuides…");
  await commitInChunks(
    db,
    ROLE_GUIDES.map((g) => ({
      col: "roleGuides",
      id: g.slug,
      data: { ...g },
    })),
  );

  console.log("Seeding salaries…");
  await commitInChunks(
    db,
    SALARY_DATA.map((s) => ({
      col: "salaries",
      id: s.roleSlug,
      data: { ...s },
    })),
  );

  console.log("Seeding interviewQuestions…");
  await commitInChunks(
    db,
    INTERVIEW_QUESTIONS.map((q) => ({
      col: "interviewQuestions",
      id: q.id,
      data: { ...q },
    })),
  );

  const jobs = mergeCuratedAndScraped(CURATED_JOBS, getScrapedJobs());
  console.log(`Seeding jobs (${jobs.length})…`);
  await commitInChunks(
    db,
    jobs.map((j) => ({
      col: "jobs",
      id: j.id,
      data: { ...j },
    })),
  );

  await db.collection("meta").doc("content").set(
    {
      seededAt: new Date().toISOString(),
      jobsCount: jobs.length,
      topicsCount: TOPICS.length,
      rolesCount: ROLES.length,
      questionsCount: INTERVIEW_QUESTIONS.length,
    },
    { merge: true },
  );

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
