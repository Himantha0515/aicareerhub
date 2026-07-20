import type { Company } from "@/lib/company-types";
import type { Job } from "@/lib/jobs";
import {
  isRelevantLocation,
  isRelevantRole,
  stripHtml,
  tagsForRole,
} from "@/lib/role-filter";

const FETCH_TIMEOUT_MS = 20_000;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { Accept: "application/json", "User-Agent": "AICareerPathJobBot/1.0" },
    });
    if (!res.ok) {
      console.warn(`[ats] ${res.status} ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[ats] failed ${url}`, e instanceof Error ? e.message : e);
    return null;
  }
}

function toJob(
  company: Company,
  partial: {
    id: string;
    title: string;
    location: string;
    applyUrl: string;
    postedAt: string;
    description: string;
  },
): Job | null {
  if (!isRelevantRole(partial.title)) return null;
  if (!isRelevantLocation(partial.location)) return null;
  if (!/^https?:\/\//i.test(partial.applyUrl)) return null;

  const plain = stripHtml(partial.description).slice(0, 800);
  return {
    id: partial.id,
    title: partial.title.trim(),
    company: company.name,
    location: partial.location.trim() || "Remote / India",
    tags: tagsForRole(partial.title),
    jobType: "Full-time",
    applyUrl: partial.applyUrl,
    postedAt: partial.postedAt,
    source: `${company.name} careers`,
    description: plain
      ? [plain]
      : [`Open role at ${company.name}. Apply on the company careers portal.`],
    companyType: company.type,
  };
}

type GreenhouseJob = {
  id: number;
  title: string;
  absolute_url: string;
  updated_at?: string;
  location?: { name?: string };
  content?: string;
};

type GreenhouseResponse = { jobs?: GreenhouseJob[] };

async function fetchGreenhouse(company: Company): Promise<Job[]> {
  const token = company.boardToken!;
  const data = await fetchJson<GreenhouseResponse>(
    `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(token)}/jobs?content=true`,
  );
  if (!data?.jobs?.length) return [];

  const jobs: Job[] = [];
  for (const j of data.jobs) {
    const mapped = toJob(company, {
      id: `gh-${token}-${j.id}`,
      title: j.title,
      location: j.location?.name ?? "",
      applyUrl: j.absolute_url,
      postedAt: j.updated_at
        ? new Date(j.updated_at).toISOString()
        : new Date().toISOString(),
      description: j.content ?? "",
    });
    if (mapped) jobs.push(mapped);
  }
  return jobs;
}

type LeverJob = {
  id: string;
  text: string;
  hostedUrl: string;
  applyUrl?: string;
  createdAt?: number;
  categories?: { location?: string; commitment?: string };
  descriptionPlain?: string;
  description?: string;
};

async function fetchLever(company: Company): Promise<Job[]> {
  const token = company.boardToken!;
  const data = await fetchJson<LeverJob[]>(
    `https://api.lever.co/v0/postings/${encodeURIComponent(token)}?mode=json`,
  );
  if (!Array.isArray(data) || data.length === 0) return [];

  const jobs: Job[] = [];
  for (const j of data) {
    const mapped = toJob(company, {
      id: `lever-${token}-${j.id}`,
      title: j.text,
      location: j.categories?.location ?? "",
      applyUrl: j.applyUrl || j.hostedUrl,
      postedAt: j.createdAt
        ? new Date(j.createdAt).toISOString()
        : new Date().toISOString(),
      description: j.descriptionPlain || j.description || "",
    });
    if (mapped) jobs.push(mapped);
  }
  return jobs;
}

type AshbyJob = {
  id: string;
  title: string;
  jobUrl?: string;
  applyUrl?: string;
  location?: string;
  secondaryLocations?: { location?: string }[];
  publishedAt?: string;
  descriptionHtml?: string;
  descriptionPlain?: string;
};

type AshbyResponse = { jobs?: AshbyJob[] };

async function fetchAshby(company: Company): Promise<Job[]> {
  const token = company.boardToken!;
  const data = await fetchJson<AshbyResponse>(
    `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(token)}`,
  );
  if (!data?.jobs?.length) return [];

  const jobs: Job[] = [];
  for (const j of data.jobs) {
    const locs = [
      j.location,
      ...(j.secondaryLocations?.map((l) => l.location) ?? []),
    ]
      .filter(Boolean)
      .join(" · ");
    const apply = j.applyUrl || j.jobUrl;
    if (!apply) continue;
    const mapped = toJob(company, {
      id: `ashby-${token}-${j.id}`,
      title: j.title,
      location: locs,
      applyUrl: apply,
      postedAt: j.publishedAt
        ? new Date(j.publishedAt).toISOString()
        : new Date().toISOString(),
      description: j.descriptionPlain || j.descriptionHtml || "",
    });
    if (mapped) jobs.push(mapped);
  }
  return jobs;
}

export async function fetchJobsForCompany(company: Company): Promise<Job[]> {
  if (!company.boardToken) return [];
  switch (company.ats) {
    case "greenhouse":
      return fetchGreenhouse(company);
    case "lever":
      return fetchLever(company);
    case "ashby":
      return fetchAshby(company);
    default:
      return [];
  }
}

/** Fetch all boards with limited concurrency. */
export async function fetchAllAtsJobs(
  companies: Company[],
  concurrency = 6,
): Promise<{ jobs: Job[]; stats: { company: string; count: number; error?: string }[] }> {
  const stats: { company: string; count: number; error?: string }[] = [];
  const all: Job[] = [];
  let i = 0;

  async function worker() {
    while (i < companies.length) {
      const idx = i++;
      const company = companies[idx]!;
      try {
        const jobs = await fetchJobsForCompany(company);
        stats.push({ company: company.name, count: jobs.length });
        all.push(...jobs);
      } catch (e) {
        stats.push({
          company: company.name,
          count: 0,
          error: e instanceof Error ? e.message : String(e),
        });
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, companies.length) }, () =>
      worker(),
    ),
  );

  return { jobs: all, stats };
}
