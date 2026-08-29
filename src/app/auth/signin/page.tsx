import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in — AI CareerPath",
  description: "Sign in to track your AI learning progress, save jobs, and get personalized recommendations.",
  alternates: { canonical: `${SITE.url}/auth/signin` },
};

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-fg-muted">Sign in to your AI CareerPath account</p>
      </div>
      <Suspense fallback={<div className="h-64 rounded-3xl bg-surface-2 animate-pulse" />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
