import type { MetadataRoute } from "next";
import { fetchJobs, fetchRoles, fetchTopics } from "@/lib/content-client";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [topics, roles, { jobs }] = await Promise.all([
    fetchTopics(),
    fetchRoles(),
    fetchJobs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE.url}/jobs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/learn`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/salaries`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/interview-prep`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${SITE.url}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${SITE.url}/learn/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const roleRoutes: MetadataRoute.Sitemap = roles.map((r) => ({
    url: `${SITE.url}/careers/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const interviewTopicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${SITE.url}/interview-prep/topic/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const interviewRoleRoutes: MetadataRoute.Sitemap = roles.map((r) => ({
    url: `${SITE.url}/interview-prep/role/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE.url}/jobs/${job.id}`,
    lastModified: new Date(job.postedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...topicRoutes,
    ...roleRoutes,
    ...interviewTopicRoutes,
    ...interviewRoleRoutes,
    ...jobRoutes,
  ];
}
