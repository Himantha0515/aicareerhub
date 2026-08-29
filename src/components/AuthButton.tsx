"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { firebaseSignOut } from "@/lib/firebase-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { user, profile, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (loading) return <div className="h-8 w-8 rounded-full bg-surface-2 animate-pulse" />;

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg-muted hover:border-accent/50 hover:text-accent transition-all"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1 hover:border-accent/50 transition-all"
      >
        <span className="text-lg leading-none">{profile?.avatarEmoji ?? "👤"}</span>
        <span className="text-sm font-medium max-w-[80px] truncate">
          {profile?.displayName?.split(" ")[0] ?? user.displayName?.split(" ")[0] ?? "Me"}
        </span>
        <svg className="h-3 w-3 text-fg-muted" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-52 rounded-2xl border border-border bg-surface shadow-[var(--shadow)] overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm truncate">{user.displayName ?? user.email}</p>
              <p className="text-xs text-fg-muted truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <Link href="/profile" onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent-soft hover:text-accent transition-colors">
                👤 My Profile
              </Link>
              <Link href="/assessment" onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent-soft hover:text-accent transition-colors">
                🧭 Career Assessment
              </Link>
              <Link href="/coach" onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent-soft hover:text-accent transition-colors">
                🤖 AI Career Coach
              </Link>
            </div>
            <div className="border-t border-border py-1">
              <button
                onClick={async () => {
                  await firebaseSignOut();
                  setOpen(false);
                  router.push("/");
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
