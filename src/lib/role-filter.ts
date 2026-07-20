import { topicsFor } from "@/lib/jobs";

/** AI + backend / platform engineering roles we want on the board. */
const TITLE_MATCHES = [
  "machine learning",
  " ml ",
  "ml engineer",
  "ml scientist",
  "ai engineer",
  "ai/ml",
  "artificial intelligence",
  "generative ai",
  "genai",
  "llm",
  "prompt engineer",
  "data scientist",
  "data science",
  "deep learning",
  "neural",
  "nlp",
  "natural language",
  "computer vision",
  "mlops",
  "ml platform",
  "ml infrastructure",
  "research scientist",
  "applied scientist",
  "ai researcher",
  "backend",
  "back-end",
  "back end",
  "software engineer",
  "software developer",
  "full stack",
  "fullstack",
  "platform engineer",
  "platform engineering",
  "site reliability",
  "sre",
  "devops",
  "infrastructure engineer",
  "distributed systems",
  "data engineer",
  "data platform",
  "systems engineer",
  "cloud engineer",
  "api engineer",
  "golang",
  "go engineer",
  "java engineer",
  "python engineer",
  "rust engineer",
  "kotlin engineer",
  "staff engineer",
  "principal engineer",
  "engineering manager",
];

export function isRelevantRole(title: string): boolean {
  const t = ` ${title.toLowerCase()} `;
  return TITLE_MATCHES.some((m) => t.includes(m));
}

/**
 * Prefer India + remote. Keep unknown locations.
 * Drop clear non-India onsite-only offices (still keep "Remote — US" etc.).
 */
export function isRelevantLocation(location: string): boolean {
  const loc = location.toLowerCase().trim();
  if (!loc) return true;
  if (
    loc.includes("remote") ||
    loc.includes("anywhere") ||
    loc.includes("worldwide") ||
    loc.includes("distributed")
  ) {
    return true;
  }
  if (
    loc.includes("india") ||
    loc.includes("bengaluru") ||
    loc.includes("bangalore") ||
    loc.includes("hyderabad") ||
    loc.includes("pune") ||
    loc.includes("mumbai") ||
    loc.includes("chennai") ||
    loc.includes("delhi") ||
    loc.includes("gurgaon") ||
    loc.includes("gurugram") ||
    loc.includes("noida") ||
    loc.includes("kolkata") ||
    loc.includes("ahmedabad") ||
    loc.includes("jaipur") ||
    loc.includes("kochi") ||
    loc.includes("trivandrum") ||
    loc.includes("thiruvananthapuram")
  ) {
    return true;
  }
  // City-only US/EU strings without remote → skip for India-focused board
  return false;
}

export function tagsForRole(title: string): string[] {
  const tags = topicsFor(title);
  const t = title.toLowerCase();
  if (
    tags.length === 0 &&
    (t.includes("backend") ||
      t.includes("back-end") ||
      t.includes("software engineer") ||
      t.includes("platform") ||
      t.includes("sre") ||
      t.includes("devops") ||
      t.includes("data engineer"))
  ) {
    return ["Backend"];
  }
  return tags.length > 0 ? tags : ["Engineering"];
}

export function stripHtml(html: string): string {
  // Decode common entities first so tags become real markup we can strip.
  const decoded = html
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

  return decoded
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}
