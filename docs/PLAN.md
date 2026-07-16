# AI Career Hub — plan

Placeholder brand. Real domain TBD; when it lands, edit `src/lib/site.ts` only.

## Scope decision (locked)

**Narrow: AI only.** Everything on the site sits under the AI umbrella — core
ML, GenAI, LLMs, RAG, MCP, agents, prompt engineering, MLOps, AI infra, and the
data engineering that feeds AI systems.

Backend / AWS / Azure / DevOps / frontend are **in scope only through the AI
lens** ("MLOps on AWS", "backend skills an AI engineer needs"), never as
standalone tracks. Rationale: the niche only beats GeeksforGeeks / W3Schools /
Naukri on long-tail intent *because* it is narrow. Going broad puts us against
sites with a decade of domain authority, on traffic that monetises poorly.

Revisit breadth only after the site has real domain authority (phase 3+).

## Phases

- **Phase 0 — foundation.** Next.js 15 + Tailwind v4 + Vercel. Design system,
  app shell, sitemap/robots, Search Console. Ship something crawlable early so
  the indexing clock starts. *(done)*
- **Phase 1 — launch set.** Jobs board (retention), 8–10 deep guides
  (acquisition), salary/role pages (high intent). Quality over volume — thin
  pages fail both the helpful-content system and AdSense review.
- **Phase 2 — depth.** In-depth topic coverage, learning paths, email job
  alerts. Apply for AdSense at ~20 substantial pages with traffic history.
- **Phase 3 — product.** Employer accounts, sponsored listings, saved jobs.
  Only if phase 1–2 proves the audience.

## Jobs data — OPEN PROBLEM

The original plan assumed we could aggregate AI jobs from free public APIs.
**Verified 2026-07-16: this does not work.**

| Source | Result |
| --- | --- |
| Remotive | Returns a fixed 39-job sample; `search` param is ignored. Contains "Remote Office Assistant", "Assistant Account Payable". Not a queryable source. |
| RemoteOK | 100/page, **0** AI-titled roles on page 1. Remote-only, no India. |
| Arbeitnow | 100/page, **0** AI-titled roles on page 1. EU/Germany-centric. |

None of the three offer meaningful AI volume, and none cover India — which is
the entire target market.

### Decision: curated-only for v1

No API. Listings are hand-picked from employers' own careers pages. Zero cost,
fully India-relevant, and the hand-checking is a genuine differentiator against
auto-scraped boards — but it is real weekly work, and it is now the critical
path for the jobs half of the site.

The Remotive integration has been removed entirely rather than left as a
fallback: a feed serving "Remote Office Assistant" onto an AI board is worse
than an empty board.

Revisit if/when volume justifies it, in this order:

1. **Adzuna API** — genuine India coverage, free tier, needs `app_id` +
   `app_key` from developer.adzuna.com. Best paid-for-free option.
2. **Careerjet API** — India coverage, free, affiliate-oriented.
3. **SerpAPI Google Jobs** — best India coverage, paid (~$50/mo).

Do **not** scrape Naukri or LinkedIn: ToS violation, and technically brittle.

### `CURATED_JOBS` must stay real

`src/lib/jobs.ts` exports an intentionally empty `CURATED_JOBS`. Entries there
send real job seekers to real applications. Only ever add verified postings
copied from a company's actual careers page, with a live `applyUrl`, re-checked
weekly. Never populate it with invented or illustrative listings.

### Salary figures must stay sourced

Same principle, higher stakes: people pick courses and accept offers based on
these numbers. `/salaries` ships with methodology and **no figures**. Every
range published must carry a named source (AmbitionBox / Levels.fyi /
Glassdoor), a sample size and a date. Never estimate.

## Current state

All 15 routes build and return 200. Design system (light/dark tokens in
`globals.css`, no-flash theme script, View Transitions, reduced-motion
respected). Home, `/jobs` (search + topic filter + empty state), `/jobs/[id]`
(JobPosting schema, no guessed salary), `/learn`, `/careers`, `/salaries`,
`/about`, `/privacy`, `/terms`, `/contact`, `sitemap.xml`, `robots.txt`.

`topicsFor()` matches a topic taxonomy against the job **title only**. Retained
from the API experiment because the lesson holds for curation too: role titles
are the reliable signal.

## Before launch — blocking

- [ ] Register domain, then update `src/lib/site.ts` (single source of truth).
- [ ] Fill `CURATED_JOBS` with ~30 real, verified India/remote AI listings.
- [ ] Legal entity name, address and contact email → `/privacy`, `/terms`,
      `/contact` (all contain `—` placeholders). Both policies are good-faith
      **drafts and need review** — do not ship unchanged.
- [ ] Source real salary ranges before `/salaries` claims any number.
- [ ] Write the phase-1 guides — every `/learn` topic says "Guide coming soon".
- [ ] Google Search Console + submit sitemap.

## Known gaps

- `/learn` topics and `/careers` roles have no detail pages yet; slugs exist in
  `src/lib/content.ts` ready for phase 2.
- Content is the bottleneck, not code. Roughly 2 weeks of engineering versus
  ~6 months of writing. Plan accordingly.
- Multiple lockfiles warning at build: a stray `C:\Users\fk\package-lock.json`
  outranks the app's own. Harmless, silence via `outputFileTracingRoot`.
