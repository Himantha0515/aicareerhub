import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type Firestore,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import type { Topic, Role } from "@/lib/content";
import type { TopicGuide } from "@/lib/topic-guides";
import type { RoleGuide } from "@/lib/role-guides";
import type { RoleSalary } from "@/lib/salaries";
import type { InterviewQuestion } from "@/lib/interview-questions";
import type { Job } from "@/lib/jobs";

export const FS = {
  topics: "topics",
  topicGuides: "topicGuides",
  roles: "roles",
  roleGuides: "roleGuides",
  salaries: "salaries",
  interviewQuestions: "interviewQuestions",
  jobs: "jobs",
  meta: "meta",
} as const;

function dbOrNull(): Firestore | null {
  if (!isFirebaseConfigured()) return null;
  try {
    return getDb();
  } catch {
    return null;
  }
}

export async function fsListTopics(): Promise<(Topic & { hasGuide?: boolean })[]> {
  const db = dbOrNull();
  if (!db) return [];
  const snap = await getDocs(collection(db, FS.topics));
  if (snap.empty) return [];
  return snap.docs.map((d) => d.data() as Topic & { hasGuide?: boolean });
}

export async function fsGetTopic(
  slug: string,
): Promise<{ topic: Topic; guide: TopicGuide | null } | null> {
  const db = dbOrNull();
  if (!db) return null;
  const topicSnap = await getDoc(doc(db, FS.topics, slug));
  if (!topicSnap.exists()) return null;
  const guideSnap = await getDoc(doc(db, FS.topicGuides, slug));
  return {
    topic: topicSnap.data() as Topic,
    guide: guideSnap.exists() ? (guideSnap.data() as TopicGuide) : null,
  };
}

export async function fsListRoles(): Promise<(Role & { hasGuide?: boolean })[]> {
  const db = dbOrNull();
  if (!db) return [];
  const snap = await getDocs(collection(db, FS.roles));
  if (snap.empty) return [];
  return snap.docs.map((d) => d.data() as Role & { hasGuide?: boolean });
}

export async function fsGetRole(
  slug: string,
): Promise<{ role: Role; guide: RoleGuide | null } | null> {
  const db = dbOrNull();
  if (!db) return null;
  const roleSnap = await getDoc(doc(db, FS.roles, slug));
  if (!roleSnap.exists()) return null;
  const guideSnap = await getDoc(doc(db, FS.roleGuides, slug));
  return {
    role: roleSnap.data() as Role,
    guide: guideSnap.exists() ? (guideSnap.data() as RoleGuide) : null,
  };
}

export async function fsListSalaries(): Promise<RoleSalary[]> {
  const db = dbOrNull();
  if (!db) return [];
  const snap = await getDocs(collection(db, FS.salaries));
  if (snap.empty) return [];
  return snap.docs.map((d) => d.data() as RoleSalary);
}

export async function fsListJobs(): Promise<Job[]> {
  const db = dbOrNull();
  if (!db) return [];
  const snap = await getDocs(collection(db, FS.jobs));
  if (snap.empty) return [];
  return snap.docs.map((d) => d.data() as Job);
}

export async function fsGetJob(id: string): Promise<Job | null> {
  const db = dbOrNull();
  if (!db) return null;
  const snap = await getDoc(doc(db, FS.jobs, id));
  if (!snap.exists()) return null;
  return snap.data() as Job;
}

export async function fsQuestionsByTopic(
  slug: string,
): Promise<InterviewQuestion[]> {
  const db = dbOrNull();
  if (!db) return [];
  const q = query(
    collection(db, FS.interviewQuestions),
    where("topicSlugs", "array-contains", slug),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as InterviewQuestion);
}

export async function fsQuestionsByRole(
  slug: string,
): Promise<InterviewQuestion[]> {
  const db = dbOrNull();
  if (!db) return [];
  const q = query(
    collection(db, FS.interviewQuestions),
    where("roleSlugs", "array-contains", slug),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as InterviewQuestion);
}

export async function fsHasContent(): Promise<boolean> {
  const db = dbOrNull();
  if (!db) return false;
  // Single doc read only — never list a collection just to probe.
  const meta = await getDoc(doc(db, FS.meta, "content"));
  return meta.exists();
}

/** Cleared after seed/scrape so the next request re-probes Firestore. */
let contentSourceCache: boolean | null = null;

export function getContentSourceCache(): boolean | null {
  return contentSourceCache;
}

export function setContentSourceCache(value: boolean | null) {
  contentSourceCache = value;
}

export function resetContentSourceCache() {
  contentSourceCache = null;
}
