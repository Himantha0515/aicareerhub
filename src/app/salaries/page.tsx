import type { Metadata } from "next";
import SalaryComparison from "@/components/SalaryComparison";

export const metadata: Metadata = {
  title: "AI salaries in India — by role and city",
  description:
    "Estimated salary ranges for AI and machine learning roles across Bengaluru, Hyderabad, Pune, Delhi NCR and remote. Service vs product comparison.",
};

export default function SalariesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-fade-up">
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg-muted shadow-[var(--shadow)]">
        💰 Estimated ranges with sources
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        AI salaries <span className="text-gradient">in India</span>
      </h1>
      <p className="mt-3 max-w-xl text-fg-muted text-pretty">
        Service-based vs product-based — side by side. Pick a role below to see
        how compensation compares across experience levels, cities and company
        types.
      </p>

      <div className="mt-10">
        <SalaryComparison />
      </div>
    </div>
  );
}
