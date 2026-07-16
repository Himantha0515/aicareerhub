import { topicsFor } from "@/lib/jobs";
import type { Job } from "@/lib/jobs";

const ADZUNA_API_BASE = "https://api.adzuna.com/v1/api/jobs";

interface AdzunaJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  created: string;
  redirect_url: string;
}

interface AdzunaResponse {
  results: AdzunaJob[];
}

export async function fetchAdzunaJobs(appId: string, appKey: string): Promise<Job[]> {
  try {
    const url = new URL(`${ADZUNA_API_BASE}/in/search/1`);
    url.searchParams.set("app_id", appId);
    url.searchParams.set("app_key", appKey);
    url.searchParams.set("results_per_page", "100");
    url.searchParams.set("sort_by", "date");
    url.searchParams.set("sort_direction", "descending");
    url.searchParams.set(
      "what",
      "machine learning OR ai engineer OR data scientist OR nlp OR computer vision OR ml engineer"
    );
    url.searchParams.set("where", "india");

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.error(`[adzuna] API error: ${res.status}`);
      return [];
    }

    const data: AdzunaResponse = await res.json();
    if (!data.results) return [];

    return data.results
      .filter(isAiRole)
      .map((job) => ({
        id: `adzuna-${job.id}`,
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        tags: topicsFor(job.title),
        jobType: null,
        applyUrl: job.redirect_url,
        postedAt: new Date(job.created).toISOString(),
        source: "Adzuna",
        description: [job.description.substring(0, 500)],
      }));
  } catch (e) {
    console.error("[adzuna]", e);
    return [];
  }
}

function isAiRole(job: AdzunaJob): boolean {
  const title = job.title.toLowerCase();
  const aiKeywords = [
    "machine learning",
    "ml",
    "ai",
    "artificial intelligence",
    "data scientist",
    "nlp",
    "computer vision",
    "deep learning",
    "neural",
    "genai",
    "llm",
    "prompt",
    "mlops",
  ];
  return aiKeywords.some((kw) => title.includes(kw));
}
