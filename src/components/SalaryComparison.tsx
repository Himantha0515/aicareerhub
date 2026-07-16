"use client";

import { useState } from "react";
import Link from "next/link";
import { ROLES } from "@/lib/content";
import { SALARY_DATA, type RoleSalary } from "@/lib/salaries";

export default function SalaryComparison() {
  const [selectedSlug, setSelectedSlug] = useState<string>(SALARY_DATA[0].roleSlug);
  const data = SALARY_DATA.find((s) => s.roleSlug === selectedSlug)!;
  const role = ROLES.find((r) => r.slug === selectedSlug);
  const maxHigh = Math.max(...data.growthTrajectory.map((g) => Math.max(g.service, g.product)));

  return (
    <>
      {/* Role selector */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROLES.map((r) => {
          const hasSalary = SALARY_DATA.some((s) => s.roleSlug === r.slug);
          if (!hasSalary) return null;
          return (
            <button
              key={r.slug}
              onClick={() => setSelectedSlug(r.slug)}
              className={`card-3d rounded-2xl border p-4 text-left transition-all ${
                selectedSlug === r.slug
                  ? "border-accent bg-accent/10 shadow-[0_0_20px_var(--accent-soft)]"
                  : "border-border bg-surface hover:border-accent/50"
              }`}
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-lg"
                style={{ background: r.gradient }}
              >
                {r.emoji}
              </span>
              <p className="mt-2 text-sm font-semibold text-fg">{r.title}</p>
            </button>
          );
        })}
      </div>

      {/* Selected role detail */}
      <div className="mt-10 space-y-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl shadow-[var(--shadow)]"
            style={{ background: role?.gradient }}
          >
            {role?.emoji}
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{role?.title}</h2>
            <p className="text-sm text-fg-muted">
              Source: {data.source} &middot; Last verified: {data.lastVerified}
            </p>
          </div>
        </div>

        {/* Experience tiers */}
        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Service vs Product — <span className="text-gradient">by experience</span>
          </h3>
          <div className="mt-5 space-y-4">
            {data.tiers.map((tier) => (
              <div key={tier.level} className="glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]">
                <p className="font-semibold text-fg">{tier.label}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">Service-based</p>
                    <p className="mt-1 text-2xl font-bold text-fg">
                      {tier.service.avgLPA}–{tier.service.highLPA}{" "}
                      <span className="text-sm font-normal text-fg-muted">LPA</span>
                    </p>
                    <BarFill value={tier.service.highLPA} max={maxHigh} color="var(--cyan)" />
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">Product-based</p>
                    <p className="mt-1 text-2xl font-bold text-fg">
                      {tier.product.avgLPA}–{tier.product.highLPA}{" "}
                      <span className="text-sm font-normal text-fg-muted">LPA</span>
                    </p>
                    <BarFill value={tier.product.highLPA} max={maxHigh} color="var(--violet)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Growth trajectory */}
        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Growth <span className="text-gradient">trajectory</span>
          </h3>
          <div className="mt-5 glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]">
            <div className="flex items-center gap-4 text-xs text-fg-muted mb-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded" style={{ background: "var(--cyan)" }} />
                Service
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded" style={{ background: "var(--violet)" }} />
                Product
              </span>
            </div>
            <div className="space-y-3">
              {data.growthTrajectory.map((point) => (
                <div key={point.year} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-xs font-medium text-fg-muted">{point.year}</span>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-5 rounded transition-all duration-500"
                        style={{
                          width: `${(point.service / maxHigh) * 100}%`,
                          background: "var(--cyan)",
                          minWidth: "2rem",
                        }}
                      />
                      <span className="text-xs font-semibold text-fg-muted">{point.service}L</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-5 rounded transition-all duration-500"
                        style={{
                          width: `${(point.product / maxHigh) * 100}%`,
                          background: "var(--violet)",
                          minWidth: "2rem",
                        }}
                      />
                      <span className="text-xs font-semibold text-fg-muted">{point.product}L</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City breakdown */}
        <section>
          <h3 className="text-xl font-bold tracking-tight">
            City-wise <span className="text-gradient">breakdown</span>
          </h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-fg-muted">
                  <th className="pb-3 pr-4">City</th>
                  <th className="pb-3 pr-4">Service (Avg–High)</th>
                  <th className="pb-3">Product (Avg–High)</th>
                </tr>
              </thead>
              <tbody>
                {data.cities.map((city) => (
                  <tr key={city.city} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-fg">{city.city}</td>
                    <td className="py-3 pr-4 text-fg-muted">
                      {city.service.avgLPA}–{city.service.highLPA} LPA
                    </td>
                    <td className="py-3 text-fg-muted">
                      {city.product.avgLPA}–{city.product.highLPA} LPA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Company examples */}
        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Example <span className="text-gradient">companies</span>
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-muted">Service-based</p>
              {data.exampleCompanies
                .filter((c) => c.type === "service")
                .map((c) => (
                  <div key={c.name} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 mb-2">
                    <span className="font-medium text-fg">{c.name}</span>
                    <span className="text-sm text-fg-muted">~{c.avgLPA} LPA avg</span>
                  </div>
                ))}
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-muted">Product-based</p>
              {data.exampleCompanies
                .filter((c) => c.type === "product")
                .map((c) => (
                  <div key={c.name} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 mb-2">
                    <span className="font-medium text-fg">{c.name}</span>
                    <span className="text-sm text-fg-muted">~{c.avgLPA} LPA avg</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {data.disclaimer}
          </p>
        </div>

        {/* Cross-links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/careers/${selectedSlug}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
          >
            🧭 Full career guide
          </Link>
          <Link
            href={`/interview-prep/role/${selectedSlug}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
          >
            📝 Interview questions
          </Link>
        </div>
      </div>
    </>
  );
}

function BarFill({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border/50">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, background: color }}
      />
    </div>
  );
}
