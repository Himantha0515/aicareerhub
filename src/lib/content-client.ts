/**
 * Content access for pages + shared by `/api/*` routes.
 *
 * Prefers Firestore when seeded; falls back to local lib modules.
 */
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
  fsGetJob,
  fsGetRole,
  fsGetTopic,
  fsHasContent,
  fsListJobs,
  fsListRoles,
  fsListSalaries,
  fsListTopics,
  fsQuestionsByRole,
  fsQuestionsByTopic,
  getContentSourceCache,
  setContentSourceCache,
} from "@/lib/firestore-content";

export type TopicDto = Topic & { hasGuide?: boolean };
export type RoleDto = Role & { hasGuide?: boolean };

async function shouldUseFirestore(): Promise<boolean> {
  const cached = getContentSourceCache();
  if (cached !== null) return cached;
  try {
    const ok = await fsHasContent();
    setContentSourceCache(ok);
    return ok;
  } catch (e) {
    console.error("[content] Firestore probe failed, using local", e);
    setContentSourceCache(false);
    return false;
  }
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

  if (await shouldUseFirestore()) {
    const all = await fsListJobs();
    if (all.length > 0) {
      const jobs = filterJobs(all, filters);
      return {
        jobs,
        ...(params?.includeTags ? { tags: topTagsFrom(all) } : {}),
      };
    }
  }

  const [jobs, tags] = await Promise.all([
    getLocalJobs(filters),
    params?.includeTags ? getLocalTopTags() : Promise.resolve(undefined),
  ]);
  return { jobs, ...(tags ? { tags } : {}) };
}

export async function fetchJob(id: string): Promise<Job | null> {
  if (await shouldUseFirestore()) {
    const job = await fsGetJob(id);
    if (job) return job;
  }
  return getLocalJobById(id);
}

export async function fetchTopics(): Promise<TopicDto[]> {
  if (await shouldUseFirestore()) {
    const topics = await fsListTopics();
    if (topics.length > 0) return topics;
  }
  return TOPICS.map((t) => ({
    ...t,
    hasGuide: Boolean(getTopicGuide(t.slug)),
  }));
}

export async function fetchTopic(
  slug: string,
): Promise<{ topic: Topic; guide: TopicGuide | null } | null> {
  if (await shouldUseFirestore()) {
    const data = await fsGetTopic(slug);
    if (data) return data;
  }
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return null;
  return { topic, guide: getTopicGuide(slug) ?? null };
}

export async function fetchRoles(): Promise<RoleDto[]> {
  if (await shouldUseFirestore()) {
    const roles = await fsListRoles();
    if (roles.length > 0) return roles;
  }
  return ROLES.map((r) => ({
    ...r,
    hasGuide: Boolean(getRoleGuide(r.slug)),
  }));
}

export async function fetchRole(
  slug: string,
): Promise<{ role: Role; guide: RoleGuide | null } | null> {
  if (await shouldUseFirestore()) {
    const data = await fsGetRole(slug);
    if (data) return data;
  }
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return null;
  return { role, guide: getRoleGuide(slug) ?? null };
}

export async function fetchSalaries(): Promise<{
  salaries: RoleSalary[];
  roles: Role[];
}> {
  if (await shouldUseFirestore()) {
    const [salaries, roles] = await Promise.all([
      fsListSalaries(),
      fsListRoles(),
    ]);
    if (salaries.length > 0) {
      return {
        salaries,
        roles: roles.length > 0 ? roles : ROLES,
      };
    }
  }
  return { salaries: SALARY_DATA, roles: ROLES };
}

export async function fetchInterviewQuestions(params: {
  topic?: string;
  role?: string;
}): Promise<InterviewQuestion[]> {
  if (await shouldUseFirestore()) {
    if (params.topic) {
      const qs = await fsQuestionsByTopic(params.topic);
      if (qs.length > 0) return qs;
    }
    if (params.role) {
      const qs = await fsQuestionsByRole(params.role);
      if (qs.length > 0) return qs;
    }
  }
  if (params.topic) return getQuestionsByTopic(params.topic);
  if (params.role) return getQuestionsByRole(params.role);
  return [];
}
