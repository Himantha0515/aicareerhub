import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create Account — AI CareerPath",
  description: "Create your free AI CareerPath account. Get a personalized roadmap, track your learning, and land AI jobs in India.",
  alternates: { canonical: `${SITE.url}/auth/signup` },
};

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Start your AI career</h1>
        <p className="mt-2 text-fg-muted">Create your free account — takes 30 seconds</p>
      </div>
      <SignUpForm />
    </div>
  );
}
