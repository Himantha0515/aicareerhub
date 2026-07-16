export type JobStage = "Applied" | "Shortlisted" | "Interview" | "Offer";

export type TrackedJob = {
  jobTitle: string;
  company: string;
  stage: JobStage;
  appliedAt: string;
};

export type ProfileData = {
  version: 1;
  name: string;
  title: string;
  avatarEmoji: string;
  completedTopics: string[];
  bookmarkedQuestions: string[];
  streak: { lastDate: string; count: number };
  appliedJobs: TrackedJob[];
};

const STORAGE_KEY = "aicareerhub_profile";

const DEFAULT_PROFILE: ProfileData = {
  version: 1,
  name: "",
  title: "",
  avatarEmoji: "🧑‍💻",
  completedTopics: [],
  bookmarkedQuestions: [],
  streak: { lastDate: "", count: 0 },
  appliedJobs: [],
};

export function loadProfile(): ProfileData {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(data: ProfileData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateStreak(profile: ProfileData): ProfileData {
  const today = new Date().toISOString().slice(0, 10);
  if (profile.streak.lastDate === today) return profile;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const count =
    profile.streak.lastDate === yesterday ? profile.streak.count + 1 : 1;

  return { ...profile, streak: { lastDate: today, count } };
}

export const JOB_STAGES: JobStage[] = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Offer",
];

export type Badge = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
};

export function computeBadges(profile: ProfileData): Badge[] {
  const ct = profile.completedTopics.length;
  const bq = profile.bookmarkedQuestions.length;
  const streak = profile.streak.count;
  const jobs = profile.appliedJobs.length;

  return [
    {
      id: "first-topic",
      emoji: "🌱",
      title: "First Steps",
      description: "Complete your first topic",
      earned: ct >= 1,
    },
    {
      id: "starter-pack",
      emoji: "📦",
      title: "Starter Pack",
      description: "Complete all 'Start here' topics",
      earned: ct >= 4,
    },
    {
      id: "core-complete",
      emoji: "🚀",
      title: "Core Complete",
      description: "Complete all 'Core' topics",
      earned: ct >= 8,
    },
    {
      id: "full-curriculum",
      emoji: "🎓",
      title: "Full Curriculum",
      description: "Complete all 12 topics",
      earned: ct >= 12,
    },
    {
      id: "bookworm",
      emoji: "📚",
      title: "Bookworm",
      description: "Bookmark 10+ interview questions",
      earned: bq >= 10,
    },
    {
      id: "streak-3",
      emoji: "🔥",
      title: "On Fire",
      description: "3-day learning streak",
      earned: streak >= 3,
    },
    {
      id: "streak-7",
      emoji: "⚡",
      title: "Unstoppable",
      description: "7-day learning streak",
      earned: streak >= 7,
    },
    {
      id: "job-hunter",
      emoji: "🎯",
      title: "Job Hunter",
      description: "Track your first job application",
      earned: jobs >= 1,
    },
  ];
}

export const AVATAR_EMOJIS = [
  "🧑‍💻", "👩‍💻", "👨‍💻", "🤖", "🧠", "🦾", "🚀", "💡",
  "🔮", "🎯", "⚡", "🌟", "🦊", "🐼", "🦁", "🐉",
  "🎨", "🎵", "🌈", "🔥", "💎", "🏆", "👾", "🛸",
];
