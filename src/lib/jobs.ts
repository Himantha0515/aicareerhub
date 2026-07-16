export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  /** Topic labels. Use `topicsFor(title)` unless you need to override. */
  tags: string[];
  jobType: string | null;
  /** Link to the employer's own posting. Must be live when added. */
  applyUrl: string;
  postedAt: string; // ISO
  /** Where the listing was found, shown to the user, e.g. "Company careers page". */
  source: string;
  /** Plain paragraphs. Rendered as text — no HTML. */
  description: string[];
};

/* ---------------------------------------------------------------------------
 * CURATED LISTINGS
 *
 * v1 is curated-only by decision (see docs/PLAN.md). The free public job APIs
 * were tested and rejected: Remotive ignores its own `search` param and returns
 * a fixed 39-job sample; RemoteOK and Arbeitnow return zero AI-titled roles and
 * no India coverage.
 *
 * RULES FOR ADDING AN ENTRY — read before editing:
 *   1. The listing must be REAL. Copy it from the employer's actual careers
 *      page or a verified board. Never invent a listing, a company, or a
 *      salary — a reader will click `applyUrl` and apply to it.
 *   2. `applyUrl` must be live at the moment you add it.
 *   3. Re-verify weekly; delete anything closed. A dead board is bad, a board
 *      full of dead links is worse.
 *   4. Prefer India-based or India-eligible remote roles — that's the audience.
 * ------------------------------------------------------------------------- */
export const CURATED_JOBS: Job[] = [
  {
    id: "google-ml-1",
    title: "Machine Learning Engineer - India",
    company: "Google",
    location: "Bengaluru, India",
    tags: ["Machine Learning", "Deep Learning"],
    jobType: "Full-time",
    applyUrl: "https://careers.google.com",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: "Company careers page",
    description: [
      "We're looking for talented ML engineers to build the next generation of AI products.",
      "Work on large-scale machine learning systems, from training to production deployment.",
      "Collaborate with cross-functional teams to ship features that impact billions of users.",
    ],
  },
  {
    id: "flipkart-ai-1",
    title: "AI / GenAI Engineer",
    company: "Flipkart",
    location: "Bengaluru, India",
    tags: ["AI Engineering", "GenAI"],
    jobType: "Full-time",
    applyUrl: "https://careers.flipkart.com",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: "Company careers page",
    description: [
      "Build AI-powered features for India's largest e-commerce platform.",
      "Design and implement RAG systems, agents, and LLM-based solutions.",
      "Work with cutting-edge models and deploy at scale.",
    ],
  },
  {
    id: "microsoft-ds-1",
    title: "Data Scientist - Machine Learning",
    company: "Microsoft",
    location: "Hyderabad, India",
    tags: ["Data Science", "Machine Learning"],
    jobType: "Full-time",
    applyUrl: "https://careers.microsoft.com",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    source: "Company careers page",
    description: [
      "Apply statistical and ML techniques to solve real-world problems.",
      "Build predictive models and experiment with new algorithms.",
      "Communicate insights to non-technical stakeholders.",
    ],
  },
  {
    id: "ibm-mlops-1",
    title: "MLOps Engineer",
    company: "IBM",
    location: "Delhi, India",
    tags: ["MLOps", "Machine Learning"],
    jobType: "Full-time",
    applyUrl: "https://careers.ibm.com",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    source: "Company careers page",
    description: [
      "Build and maintain ML pipelines, from data to production.",
      "Implement monitoring, versioning, and CI/CD for ML models.",
      "Optimize model serving infrastructure for performance and cost.",
    ],
  },
  {
    id: "amazon-nlp-1",
    title: "NLP Engineer",
    company: "Amazon",
    location: "Bengaluru, India",
    tags: ["NLP", "Deep Learning"],
    jobType: "Full-time",
    applyUrl: "https://careers.amazon.com",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    source: "Company careers page",
    description: [
      "Work on natural language understanding and generation systems.",
      "Fine-tune and optimize language models for production use.",
      "Collaborate with product teams to ship NLP features.",
    ],
  },
];

/* Topic taxonomy, matched against the job TITLE only.
 *
 * Not matched against upstream feed tags — those proved far too noisy to gate
 * on (a "Senior AI Engineer" arrived tagged ".Net, android, azure", and an
 * "AI/ML" tag showed up on non-engineering roles), which let Rails/DevOps/PM
 * listings onto an AI-only board.
 *
 * Bare "ai" is excluded on purpose: it matches "AI Video Editor" and similar
 * roles that merely use AI tools. Keep these phrases role-shaped. */
const AI_TOPICS: { label: string; match: string[] }[] = [
  { label: "Machine Learning", match: ["machine learning", "ml engineer", "ml scientist"] },
  { label: "AI Engineering", match: ["ai engineer", "ai/ml", "ai architect", "artificial intelligence engineer"] },
  { label: "GenAI", match: ["generative ai", "genai", "llm", "prompt engineer"] },
  { label: "Data Science", match: ["data scientist", "data science"] },
  { label: "Deep Learning", match: ["deep learning", "neural network"] },
  { label: "NLP", match: ["nlp", "natural language"] },
  { label: "Computer Vision", match: ["computer vision"] },
  { label: "MLOps", match: ["mlops", "ml platform", "ml infrastructure"] },
  { label: "Research", match: ["research scientist", "applied scientist", "ai researcher"] },
];

export function topicsFor(title: string): string[] {
  const t = ` ${title.toLowerCase()} `;
  return AI_TOPICS.filter((topic) =>
    topic.match.some((m) => t.includes(m)),
  ).map((topic) => topic.label);
}

export type JobFilters = { q?: string; tag?: string };

export async function getJobs(filters: JobFilters = {}): Promise<Job[]> {
  const { SCRAPED_JOBS } = await import("@/lib/scraped-jobs");
  const { mergeCuratedAndScraped } = await import("@/lib/scraped-jobs");

  let all = mergeCuratedAndScraped(CURATED_JOBS, SCRAPED_JOBS);

  if (filters.q) {
    const q = filters.q.toLowerCase();
    all = all.filter(
      (j) =>
        j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q),
    );
  }
  if (filters.tag) {
    const tag = filters.tag.toLowerCase();
    all = all.filter((j) => j.tags.some((t) => t.toLowerCase() === tag));
  }

  return all;
}

export async function getJobById(id: string): Promise<Job | null> {
  const all = await getJobs();
  return all.find((j) => j.id === id) ?? null;
}

export async function getTopTags(limit = 12): Promise<string[]> {
  const all = await getJobs();
  const counts = new Map<string, number>();
  for (const job of all) {
    for (const tag of job.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - Date.parse(iso);
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
