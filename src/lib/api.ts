import { SITE } from "@/lib/site";

/** Origin for server-side fetches to our own `/api/*` routes. */
export function getApiOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("example.com")) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function apiGet<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `${getApiOrigin()}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: init?.next ?? { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/** Public site URL for metadata/canonical (may still be placeholder). */
export function getPublicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return SITE.url;
}
