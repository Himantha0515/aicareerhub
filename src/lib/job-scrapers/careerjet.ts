import { topicsFor } from "@/lib/jobs";
import type { Job } from "@/lib/jobs";

const CAREERJET_API_BASE = "https://public.api.careerjet.net/search";

interface CareerjetJob {
  title: string;
  company: string;
  locations: string;
  date: string;
  url: string;
  description: string;
}

interface CareerjetResponse {
  jobs?: CareerjetJob[];
}

export async function fetchCareerjetJobs(): Promise<Job[]> {
  try {
    const url = new URL(CAREERJET_API_BASE);
    url.searchParams.set("keywords", "machine learning engineer OR ai engineer OR data scientist");
    url.searchParams.set("location", "India");
    url.searchParams.set("pagesize", "50");
    url.searchParams.set("sort", "date");

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.error(`[careerjet] API error: ${res.status}`);
      return [];
    }

    const data: CareerjetResponse = await res.json();
    if (!data.jobs) return [];

    return data.jobs.map((job, idx) => ({
      id: `careerjet-${idx}-${job.date}`,
      title: job.title,
      company: job.company,
      location: job.locations,
      tags: topicsFor(job.title),
      jobType: null,
      applyUrl: job.url,
      postedAt: new Date(job.date).toISOString(),
      source: "Careerjet",
      description: [job.description.substring(0, 500)],
    }));
  } catch (e) {
    console.error("[careerjet]", e);
    return [];
  }
}
