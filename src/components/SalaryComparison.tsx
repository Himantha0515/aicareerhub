"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Role } from "@/lib/content";
import type { RoleSalary } from "@/lib/salaries";

export default function SalaryComparison() {
  const [salaries, setSalaries] = useState<RoleSalary[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/salaries");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as {
          salaries: RoleSalary[];
          roles: Role[];
        };
        if (cancelled) return;
        setSalaries(data.salaries);
        setRoles(data.roles);
        setSelectedSlug(data.salaries[0]?.roleSlug ?? "");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load salaries");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <p className="rounded-xl border border-border bg-surface p-6 text-sm text-fg-muted">
        Loading salary data…
      </p>
    );
  }

  if (error || salaries.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface p-6 text-sm text-fg-muted">
        Could not load salary data{error ? `: ${error}` : ""}.
      </p>
    );
  }

  const data = salaries.find((s) => s.roleSlug === selectedSlug) ?? salaries[0]!;
  const role = roles.find((r) => r.slug === data.roleSlug);
  const maxHigh = Math.max(
    ...data.growthTrajectory.map((g) => Math.max(g.service, g.product)),
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {roles.map((r) => {
          const hasSalary = salaries.some((s) => s.roleSlug === r.slug);
          if (!hasSalary) return null;
          return (
            <button
              key={r.slug}
              type="button"
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

      <div className="mt-10 space-y-10">
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

        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Service vs Product — <span className="text-gradient">by experience</span>
          </h3>
          <div className="mt-5 space-y-4">
            {data.tiers.map((tier) => (
              <div
                key={tier.level}
                className="glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]"
              >
                <p className="font-semibold text-fg">{tier.label}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">
                      Service-based
                    </p>
                    <p className="mt-1 text-2xl font-bold text-fg">
                      {tier.service.avgLPA}–{tier.service.highLPA}{" "}
                      <span className="text-sm font-normal text-fg-muted">LPA</span>
                    </p>
                    <BarFill value={tier.service.highLPA} max={maxHigh} color="var(--cyan)" />
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">
                      Product-based
                    </p>
                    <p className="mt-1 text-2xl font-bold text-fg">
                      {tier.product.avgLPA}–{tier.product.highLPA}{" "}
                      <span className="text-sm font-normal text-fg-muted">LPA</span>
                    </p>
                    <BarFill
                      value={tier.product.highLPA}
                      max={maxHigh}
                      color="var(--violet)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Growth <span className="text-gradient">trajectory</span>
          </h3>
          <div className="mt-5 glass rounded-2xl border border-border p-5 shadow-[var(--shadow)]">
            <div className="mb-4 flex items-center gap-4 text-xs text-fg-muted">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded"
                  style={{ background: "var(--cyan)" }}
                />
                Service
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded"
                  style={{ background: "var(--violet)" }}
                />
                Product
              </span>
            </div>
            <div className="space-y-3">
              {data.growthTrajectory.map((point) => (
                <div key={point.year} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-xs font-medium text-fg-muted">
                    {point.year}
                  </span>
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
                      <span className="text-xs font-semibold text-fg-muted">
                        {point.service}L
                      </span>
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
                      <span className="text-xs font-semibold text-fg-muted">
                        {point.product}L
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        <section>
          <h3 className="text-xl font-bold tracking-tight">
            Example <span className="text-gradient">companies</span>
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-muted">
                Service-based
              </p>
              {data.exampleCompanies
                .filter((c) => c.type === "service")
                .map((c) => (
                  <div
                    key={c.name}
                    className="mb-2 flex items-center justify-between rounded-xl border border-border bg-surface p-3"
                  >
                    <span className="font-medium text-fg">{c.name}</span>
                    <span className="text-sm text-fg-muted">~{c.avgLPA} LPA avg</span>
                  </div>
                ))}
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-fg-muted">
                Product-based
              </p>
              {data.exampleCompanies
                .filter((c) => c.type === "product")
                .map((c) => (
                  <div
                    key={c.name}
                    className="mb-2 flex items-center justify-between rounded-xl border border-border bg-surface p-3"
                  >
                    <span className="font-medium text-fg">{c.name}</span>
                    <span className="text-sm text-fg-muted">~{c.avgLPA} LPA avg</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {data.disclaimer}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/careers/${data.roleSlug}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
          >
            🧭 Full career guide
          </Link>
          <Link
            href={`/interview-prep/role/${data.roleSlug}`}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
          >
            📝 Interview questions
          </Link>
        </div>
      </div>
    </>
  );
}

function BarFill({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border/50">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, background: color }}
      />
    </div>
  );
}
