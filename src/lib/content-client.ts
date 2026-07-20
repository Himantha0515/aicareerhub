/**
 * Content access for pages + `/api/*`.
 *
 * READ STRATEGY (cost control):
 * - Jobs, topics, roles, salaries, interview Qs → local modules / scraped JSON
 *   (0 Firestore reads on page views)
 * - Feedback → Firestore (create-only)
 * - Scrape/seed still WRITE to Firestore for backup / future CMS
 *
 * Set FIRESTORE_CONTENT_READS=1 to force live Firestore reads (expensive).
 */
import { unstable_cache } from "next/cache";
import { TOPICS, ROLES, type Topic, type Role } from "@/lib/content";
import {
  getJobs as getLocalJobs,
  getJobById as getLocalJobById,
  getTopTags as getLocalTopTags,
  type Job,
  type JobFilters,
} from "@/lib/jobs";
import { getTopicGuide, type TopicGuide } from "@/lib/topic-guides";
import { getRoleGuide, type RoleGuide } from "@/lib/role-guides";
import { SALARY_DATA, type RoleSalary } from "@/lib/salaries";
import {
  getQuestionsByRole,
  getQuestionsByTopic,
  type InterviewQuestion,
} from "@/lib/interview-questions";
import {
  fsGetRole,
  fsGetTopic,
  fsListJobs,
  fsListRoles,
  fsListSalaries,
  fsListTopics,
  fsQuestionsByRole,
  fsQuestionsByTopic,
} from "@/lib/firestore-content";

export type TopicDto = Topic & { hasGuide?: boolean };
export type RoleDto = Role & { hasGuide?: boolean };

function firestoreReadsEnabled(): boolean {
  return process.env.FIRESTORE_CONTENT_READS === "1";
}

export { resetContentSourceCache } from "@/lib/firestore-content";

function filterJobs(all: Job[], filters: JobFilters = {}): Job[] {
  let jobs = all;
  if (filters.q) {
    const q = filters.q.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q),
    );
  }
  if (filters.tag) {
    const tag = filters.tag.toLowerCase();
    jobs = jobs.filter((j) => j.tags.some((t) => t.toLowerCase() === tag));
  }
  if (filters.companyType) {
    jobs = jobs.filter((j) => j.companyType === filters.companyType);
  }
  return jobs;
}

function topTagsFrom(jobs: Job[], limit = 12): string[] {
  const counts = new Map<string, number>();
  for (const job of jobs) {
    for (const tag of job.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

const cachedFsListJobs = unstable_cache(
  async () => fsListJobs(),
  ["fs-jobs-all"],
  { revalidate: 1800, tags: ["jobs"] },
);

const cachedFsListTopics = unstable_cache(
  async () => fsListTopics(),
  ["fs-topics"],
  { revalidate: 86400, tags: ["topics"] },
);

const cachedFsListRoles = unstable_cache(
  async () => fsListRoles(),
  ["fs-roles"],
  { revalidate: 86400, tags: ["roles"] },
);

const cachedFsListSalaries = unstable_cache(
  async () => fsListSalaries(),
  ["fs-salaries"],
  { revalidate: 86400, tags: ["salaries"] },
);

export async function fetchJobs(params?: {
  q?: string;
  tag?: string;
  type?: string;
  includeTags?: boolean;
}): Promise<{ jobs: Job[]; tags?: string[] }> {
  const companyType =
    params?.type === "product" || params?.type === "service"
      ? params.type
      : undefined;
  const filters: JobFilters = {
    q: params?.q,
    tag: params?.tag,
    companyType,
  };

  // Default: local JSON — one disk read, zero Firestore billable reads.
  if (!firestoreReadsEnabled()) {
    const [jobs, tags] = await Promise.all([
      getLocalJobs(filters),
      params?.includeTags ? getLocalTopTags() : Promise.resolve(undefined),
    ]);
    return { jobs, ...(tags ? { tags } : {}) };
  }

  const all = await cachedFsListJobs();
  if (all.length > 0) {
    const jobs = filterJobs(all, filters);
    return {
      jobs,
      ...(params?.includeTags ? { tags: topTagsFrom(all) } : {}),
    };
  }

  const [jobs, tags] = await Promise.all([
    getLocalJobs(filters),
    params?.includeTags ? getLocalTopTags() : Promise.resolve(undefined),
  ]);
  return { jobs, ...(tags ? { tags } : {}) };
}

export async function fetchJob(id: string): Promise<Job | null> {
  if (!firestoreReadsEnabled()) {
    return getLocalJobById(id);
  }
  // Cache per id via tagged fetch; avoid recreating unstable_cache factories.
  const all = await cachedFsListJobs();
  return all.find((j) => j.id === id) ?? getLocalJobById(id);
}

export async function fetchTopics(): Promise<TopicDto[]> {
  if (!firestoreReadsEnabled()) {
    return TOPICS.map((t) => ({
      ...t,
      hasGuide: Boolean(getTopicGuide(t.slug)),
    }));
  }
  const topics = await cachedFsListTopics();
  if (topics.length > 0) return topics;
  return TOPICS.map((t) => ({
    ...t,
    hasGuide: Boolean(getTopicGuide(t.slug)),
  }));
}

export async function fetchTopic(
  slug: string,
): Promise<{ topic: Topic; guide: TopicGuide | null } | null> {
  if (!firestoreReadsEnabled()) {
    const topic = TOPICS.find((t) => t.slug === slug);
    if (!topic) return null;
    return { topic, guide: getTopicGuide(slug) ?? null };
  }
  try {
    const data = await fsGetTopic(slug);
    if (data) return data;
  } catch (e) {
    console.error("[content] fsGetTopic failed", e);
  }
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return null;
  return { topic, guide: getTopicGuide(slug) ?? null };
}

export async function fetchRoles(): Promise<RoleDto[]> {
  if (!firestoreReadsEnabled()) {
    return ROLES.map((r) => ({
      ...r,
      hasGuide: Boolean(getRoleGuide(r.slug)),
    }));
  }
  const roles = await cachedFsListRoles();
  if (roles.length > 0) return roles;
  return ROLES.map((r) => ({
    ...r,
    hasGuide: Boolean(getRoleGuide(r.slug)),
  }));
}

export async function fetchRole(
  slug: string,
): Promise<{ role: Role; guide: RoleGuide | null } | null> {
  if (!firestoreReadsEnabled()) {
    const role = ROLES.find((r) => r.slug === slug);
    if (!role) return null;
    return { role, guide: getRoleGuide(slug) ?? null };
  }
  try {
    const data = await fsGetRole(slug);
    if (data) return data;
  } catch (e) {
    console.error("[content] fsGetRole failed", e);
  }
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return null;
  return { role, guide: getRoleGuide(slug) ?? null };
}

export async function fetchSalaries(): Promise<{
  salaries: RoleSalary[];
  roles: Role[];
}> {
  if (!firestoreReadsEnabled()) {
    return { salaries: SALARY_DATA, roles: ROLES };
  }
  const [salaries, roles] = await Promise.all([
    cachedFsListSalaries(),
    cachedFsListRoles(),
  ]);
  if (salaries.length > 0) {
    return { salaries, roles: roles.length > 0 ? roles : ROLES };
  }
  return { salaries: SALARY_DATA, roles: ROLES };
}

export async function fetchInterviewQuestions(params: {
  topic?: string;
  role?: string;
}): Promise<InterviewQuestion[]> {
  if (!firestoreReadsEnabled()) {
    if (params.topic) return getQuestionsByTopic(params.topic);
    if (params.role) return getQuestionsByRole(params.role);
    return [];
  }

  try {
    if (params.topic) {
      const qs = await fsQuestionsByTopic(params.topic);
      if (qs.length > 0) return qs;
      return getQuestionsByTopic(params.topic);
    }
    if (params.role) {
      const qs = await fsQuestionsByRole(params.role);
      if (qs.length > 0) return qs;
      return getQuestionsByRole(params.role);
    }
  } catch (e) {
    console.error("[content] interview FS read failed", e);
    if (params.topic) return getQuestionsByTopic(params.topic);
    if (params.role) return getQuestionsByRole(params.role);
  }
  return [];
}
