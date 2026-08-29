/**
 * Firestore user profile — stored at users/{uid}
 * All AI career data for a logged-in user lives here.
 */
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "./firebase";

export type SkillLevel = "none" | "beginner" | "intermediate" | "advanced" | "expert";

export type UserSkill = {
  slug: string;
  name: string;
  level: SkillLevel;
  targetLevel: SkillLevel;
  confidence: number; // 0-100
  lastUpdated: string;
};

export type AssessmentResult = {
  completedAt: string;
  recommendedRole: string;
  currentLevel: string;
  estimatedWeeks: number;
  strengths: string[];
  gaps: string[];
  answers: Record<string, string | number>;
};

export type RoadmapStep = {
  id: string;
  week: number;
  title: string;
  topics: string[];
  completed: boolean;
  completedAt?: string;
};

export type SavedJob = {
  jobId: string;
  savedAt: string;
  status: "saved" | "applied" | "screening" | "interview" | "offer" | "rejected";
  notes?: string;
  appliedAt?: string;
};

export type QuizAttempt = {
  topicSlug: string;
  score: number;
  total: number;
  completedAt: string;
  weakAreas: string[];
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  avatarEmoji: string;
  targetRole: string;
  currentRole: string;
  experience: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  // Career data
  assessment?: AssessmentResult;
  skills: UserSkill[];
  roadmap: RoadmapStep[];
  savedJobs: SavedJob[];
  completedTopics: string[];
  quizAttempts: QuizAttempt[];
  bookmarkedQuestions: string[];
  // Gamification
  xp: number;
  streak: number;
  lastActiveDate: string;
  achievements: string[];
  // Settings
  notifications: boolean;
};

const DEFAULT_PROFILE: Omit<UserProfile, "uid" | "email" | "displayName" | "createdAt" | "updatedAt"> = {
  avatarEmoji: "🧑‍💻",
  targetRole: "",
  currentRole: "",
  experience: "",
  location: "",
  skills: [],
  roadmap: [],
  savedJobs: [],
  completedTopics: [],
  quizAttempts: [],
  bookmarkedQuestions: [],
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  achievements: [],
  notifications: true,
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const db = getDb();
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as UserProfile;
  } catch {
    return null;
  }
}

export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string,
): Promise<UserProfile> {
  const db = getDb();
  const now = new Date().toISOString();
  const profile: UserProfile = {
    uid,
    email,
    displayName,
    photoURL,
    ...DEFAULT_PROFILE,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(doc(db, "users", uid), {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return profile;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> {
  const db = getDb();
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function saveAssessmentResult(
  uid: string,
  assessment: AssessmentResult,
  skills: UserSkill[],
  roadmap: RoadmapStep[],
  targetRole: string,
): Promise<void> {
  await updateUserProfile(uid, { assessment, skills, roadmap, targetRole });
}
