"use client";

import { useState } from "react";
import ResumePreview from "./ResumePreview";
import { RESUME_TEMPLATES } from "@/lib/resume-templates";
import {
  EMPTY_RESUME,
  SAMPLE_RESUME,
  type ResumeData,
  type ResumeTemplateId,
} from "@/lib/resume-types";

type Mode = "form" | "paste";

export default function ResumeBuilder() {
  const [mode, setMode] = useState<Mode>("form");
  const [pasteText, setPasteText] = useState("");
  const [targetRole, setTargetRole] = useState("GenAI / ML Engineer");
  const [data, setData] = useState<ResumeData>(EMPTY_RESUME);
  const [templateId, setTemplateId] = useState<ResumeTemplateId>("modern");
  const [loading, setLoading] = useState<"parse" | "rewrite" | null>(null);
  const [error, setError] = useState("");

  function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function runAi(aiMode: "parse" | "rewrite") {
    setError("");
    setLoading(aiMode);
    try {
      const res = await fetch("/api/resume-build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          aiMode === "parse"
            ? { mode: "parse", text: pasteText, targetRole }
            : { mode: "rewrite", resume: data, targetRole },
        ),
      });
      const json = (await res.json()) as { resume?: ResumeData; error?: string };
      if (!res.ok || json.error || !json.resume) {
        throw new Error(json.error || "Generation failed");
      }
      setData(json.resume);
      setMode("form");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  function downloadPdf() {
    window.print();
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Mode + role */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-border bg-surface p-1 shadow-[var(--shadow)]">
          {(
            [
              ["form", "Fill form"],
              ["paste", "Paste / AI"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                mode === id ? "bg-accent text-white" : "text-fg-muted hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex min-w-[220px] flex-1 items-center gap-2 text-sm">
          <span className="shrink-0 text-fg-muted">Target role</span>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2"
            placeholder="GenAI Engineer"
          />
        </label>
        <button
          type="button"
          onClick={() => setData(SAMPLE_RESUME)}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-fg-muted hover:text-accent"
        >
          Load sample
        </button>
      </div>

      {/* Templates */}
      <div>
        <p className="text-sm font-semibold">Choose a template</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RESUME_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTemplateId(t.id)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                templateId === t.id
                  ? "border-accent shadow-[var(--glow)]"
                  : "border-border hover:border-accent/40"
              }`}
            >
              <span
                className="mb-2 block h-2 w-full rounded-full"
                style={{ background: t.accent }}
              />
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-xs text-fg-muted">{t.blurb}</p>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Left: inputs */}
        <div className="space-y-4">
          {mode === "paste" ? (
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]">
              <label className="block text-sm font-semibold">
                Paste notes or an old resume
              </label>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={16}
                placeholder="Paste your resume text, LinkedIn export, or rough bullet notes..."
                className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm"
              />
              <button
                type="button"
                disabled={!!loading}
                onClick={() => void runAi("parse")}
                className="btn-gradient mt-3 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {loading === "parse" ? "Building with AI…" : "Generate with AI →"}
              </button>
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]">
              <Field label="Full name" value={data.fullName} onChange={(v) => update("fullName", v)} />
              <Field label="Headline" value={data.headline} onChange={(v) => update("headline", v)} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Email" value={data.email} onChange={(v) => update("email", v)} />
                <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
              </div>
              <Field label="Location" value={data.location} onChange={(v) => update("location", v)} />
              <Field
                label="Links (comma-separated)"
                value={data.links.join(", ")}
                onChange={(v) =>
                  update(
                    "links",
                    v.split(",").map((s) => s.trim()).filter(Boolean),
                  )
                }
              />
              <label className="block text-sm">
                <span className="font-semibold">Summary</span>
                <textarea
                  value={data.summary}
                  onChange={(e) => update("summary", e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm"
                />
              </label>
              <Field
                label="Skills (comma-separated)"
                value={data.skills.join(", ")}
                onChange={(v) =>
                  update(
                    "skills",
                    v.split(",").map((s) => s.trim()).filter(Boolean),
                  )
                }
              />

              <ExperienceEditor
                items={data.experience}
                onChange={(experience) => update("experience", experience)}
              />
              <ProjectsEditor
                items={data.projects}
                onChange={(projects) => update("projects", projects)}
              />
              <EducationEditor
                items={data.education}
                onChange={(education) => update("education", education)}
              />

              <button
                type="button"
                disabled={!!loading}
                onClick={() => void runAi("rewrite")}
                className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {loading === "rewrite" ? "Rewriting…" : "AI rewrite for target role →"}
              </button>
            </div>
          )}
        </div>

        {/* Right: preview + download */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">Live preview</p>
            <button
              type="button"
              onClick={downloadPdf}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent"
            >
              Download / Print PDF
            </button>
          </div>
          <div className="overflow-auto rounded-2xl border border-border bg-surface-2 p-3">
            <ResumePreview data={data} templateId={templateId} />
          </div>
          <p className="text-xs text-fg-muted">
            Tip: use your browser print dialog → “Save as PDF”. The print layout hides the site chrome.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="font-semibold">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm"
      />
    </label>
  );
}

function ExperienceEditor({
  items,
  onChange,
}: {
  items: ResumeData["experience"];
  onChange: (v: ResumeData["experience"]) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Experience</p>
        <button
          type="button"
          className="text-xs font-semibold text-accent"
          onClick={() =>
            onChange([
              ...items,
              { company: "", role: "", location: "", start: "", end: "", bullets: [""] },
            ])
          }
        >
          + Add role
        </button>
      </div>
      <div className="mt-2 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-bg p-3 space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                placeholder="Role"
                value={item.role}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, role: e.target.value };
                  onChange(next);
                }}
                className="rounded-lg border border-border px-2 py-1.5 text-sm"
              />
              <input
                placeholder="Company"
                value={item.company}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, company: e.target.value };
                  onChange(next);
                }}
                className="rounded-lg border border-border px-2 py-1.5 text-sm"
              />
            </div>
            <textarea
              placeholder="Bullets (one per line)"
              rows={3}
              value={item.bullets.join("\n")}
              onChange={(e) => {
                const next = [...items];
                next[idx] = {
                  ...item,
                  bullets: e.target.value.split("\n"),
                };
                onChange(next);
              }}
              className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                placeholder="Start"
                value={item.start}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, start: e.target.value };
                  onChange(next);
                }}
                className="rounded-lg border border-border px-2 py-1.5 text-sm"
              />
              <input
                placeholder="End"
                value={item.end}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, end: e.target.value };
                  onChange(next);
                }}
                className="rounded-lg border border-border px-2 py-1.5 text-sm"
              />
              <input
                placeholder="Location"
                value={item.location}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...item, location: e.target.value };
                  onChange(next);
                }}
                className="rounded-lg border border-border px-2 py-1.5 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor({
  items,
  onChange,
}: {
  items: ResumeData["projects"];
  onChange: (v: ResumeData["projects"]) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Projects</p>
        <button
          type="button"
          className="text-xs font-semibold text-accent"
          onClick={() =>
            onChange([...items, { name: "", description: "", bullets: [""] }])
          }
        >
          + Add project
        </button>
      </div>
      <div className="mt-2 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-bg p-3 space-y-2">
            <input
              placeholder="Project name"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, name: e.target.value };
                onChange(next);
              }}
              className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <input
              placeholder="Link (optional)"
              value={item.link ?? ""}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, link: e.target.value };
                onChange(next);
              }}
              className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <textarea
              placeholder="Description + bullets (one per line after first)"
              rows={3}
              value={[item.description, ...item.bullets].filter(Boolean).join("\n")}
              onChange={(e) => {
                const lines = e.target.value.split("\n");
                const next = [...items];
                next[idx] = {
                  ...item,
                  description: lines[0] ?? "",
                  bullets: lines.slice(1),
                };
                onChange(next);
              }}
              className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationEditor({
  items,
  onChange,
}: {
  items: ResumeData["education"];
  onChange: (v: ResumeData["education"]) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Education</p>
        <button
          type="button"
          className="text-xs font-semibold text-accent"
          onClick={() =>
            onChange([...items, { school: "", degree: "", year: "" }])
          }
        >
          + Add
        </button>
      </div>
      <div className="mt-2 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="grid gap-2 sm:grid-cols-3">
            <input
              placeholder="Degree"
              value={item.degree}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, degree: e.target.value };
                onChange(next);
              }}
              className="rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <input
              placeholder="School"
              value={item.school}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, school: e.target.value };
                onChange(next);
              }}
              className="rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <input
              placeholder="Year"
              value={item.year}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...item, year: e.target.value };
                onChange(next);
              }}
              className="rounded-lg border border-border px-2 py-1.5 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
