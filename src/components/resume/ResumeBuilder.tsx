"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ResumePreview from "./ResumePreview";
import { RESUME_EXAMPLES } from "@/lib/resume-examples";
import { getResumeTemplate, RESUME_TEMPLATES } from "@/lib/resume-templates";
import {
  EMPTY_RESUME,
  SAMPLE_RESUME,
  type ResumeData,
  type ResumeTemplateId,
} from "@/lib/resume-types";

type Step = "template" | "contact" | "content" | "preview";
type Mode = "form" | "paste";

const STEPS: { id: Step; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "contact", label: "Contact" },
  { id: "content", label: "Experience" },
  { id: "preview", label: "Preview" },
];

export default function ResumeBuilder() {
  const params = useSearchParams();
  const initialTemplate = getResumeTemplate(params.get("template")).id;
  const exampleId = params.get("example");

  const [step, setStep] = useState<Step>(exampleId || params.get("template") ? "contact" : "template");
  const [mode, setMode] = useState<Mode>("form");
  const [pasteText, setPasteText] = useState("");
  const [targetRole, setTargetRole] = useState("GenAI / ML Engineer");
  const [templateId, setTemplateId] = useState<ResumeTemplateId>(initialTemplate);
  const [data, setData] = useState<ResumeData>(() => {
    const ex = RESUME_EXAMPLES.find((e) => e.id === exampleId);
    return ex ? structuredClone(ex.data) : EMPTY_RESUME;
  });
  const [loading, setLoading] = useState<"parse" | "rewrite" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = getResumeTemplate(params.get("template")).id;
    setTemplateId(t);
    const ex = RESUME_EXAMPLES.find((e) => e.id === params.get("example"));
    if (ex) {
      setData(structuredClone(ex.data));
      setTemplateId(getResumeTemplate(ex.templateId).id);
    }
  }, [params]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

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
      setStep("preview");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  const nameParts = useMemo(() => {
    const parts = (data.fullName || "").trim().split(/\s+/);
    return {
      first: parts[0] ?? "",
      last: parts.slice(1).join(" "),
    };
  }, [data.fullName]);

  function setName(first: string, last: string) {
    update("fullName", [first, last].filter(Boolean).join(" "));
  }

  return (
    <div className="resume-page space-y-6">
      {/* Progress */}
      <ol className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setStep(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                step === s.id
                  ? "bg-accent text-white"
                  : i < stepIndex
                    ? "bg-accent-soft text-accent"
                    : "border border-border text-fg-muted"
              }`}
            >
              {i + 1}. {s.label}
            </button>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-[200px] flex-1 items-center gap-2 text-sm">
          <span className="shrink-0 text-fg-muted">Target role</span>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2"
          />
        </label>
        <button
          type="button"
          onClick={() => setData(SAMPLE_RESUME)}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-fg-muted hover:text-accent"
        >
          Load sample
        </button>
        <Link href="/resume/templates" className="text-xs font-semibold text-accent hover:opacity-80">
          All templates
        </Link>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      {step === "template" && (
        <div>
          <h2 className="text-xl font-bold">Choose a template</h2>
          <p className="mt-1 text-sm text-fg-muted">
            {RESUME_TEMPLATES.length} professional layouts — you can change later.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESUME_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplateId(t.id);
                  setStep("contact");
                }}
                className={`overflow-hidden rounded-2xl border text-left transition-all ${
                  templateId === t.id
                    ? "border-accent shadow-[var(--glow)]"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <div className="h-2 w-full" style={{ background: t.accent }} />
                <div className="pointer-events-none h-[160px] overflow-hidden bg-slate-50 p-1">
                  <div className="origin-top scale-[0.35] h-[400px]">
                    <ResumePreview data={SAMPLE_RESUME} templateId={t.id} compactPreview />
                  </div>
                </div>
                <div className="border-t border-border px-3 py-2">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-fg-muted line-clamp-2">{t.blurb}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "contact" && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              What&apos;s the best way for employers to contact you?
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              We suggest including an email and phone number.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                value={nameParts.first}
                onChange={(v) => setName(v, nameParts.last)}
              />
              <Field
                label="Last name"
                value={nameParts.last}
                onChange={(v) => setName(nameParts.first, v)}
              />
              <Field label="Headline / title" value={data.headline} onChange={(v) => update("headline", v)} />
              <Field label="Location / city" value={data.location} onChange={(v) => update("location", v)} />
              <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
              <Field label="Email *" value={data.email} onChange={(v) => update("email", v)} />
              <div className="sm:col-span-2">
                <Field
                  label="Links (LinkedIn, GitHub — comma separated)"
                  value={data.links.join(", ")}
                  onChange={(v) =>
                    update(
                      "links",
                      v.split(",").map((s) => s.trim()).filter(Boolean),
                    )
                  }
                />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setStep("template")}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("content")}
                className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Next: Experience →
              </button>
            </div>
          </div>
          <aside className="hidden lg:block">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-muted">
              Live preview
            </p>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 p-2">
              <div className="origin-top scale-[0.55] h-[420px]">
                <ResumePreview data={data} templateId={templateId} compactPreview />
              </div>
            </div>
          </aside>
        </div>
      )}

      {step === "content" && (
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(
              [
                ["form", "Fill form"],
                ["paste", "Paste / AI import"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  mode === id ? "bg-accent text-white" : "text-fg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === "paste" ? (
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={14}
                placeholder="Paste your resume or rough notes..."
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!!loading}
                  onClick={() => void runAi("parse")}
                  className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
                >
                  {loading === "parse" ? "Generating…" : "Generate with AI →"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)] space-y-4">
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
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!!loading}
                  onClick={() => void runAi("rewrite")}
                  className="rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold text-accent disabled:opacity-60"
                >
                  {loading === "rewrite" ? "Rewriting…" : "AI rewrite"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("preview")}
                  className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Next: Preview →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "preview" && (
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">Switch template</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {RESUME_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplateId(t.id)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold ${
                    templateId === t.id
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border text-fg-muted hover:border-accent/40"
                  }`}
                >
                  <span
                    className="mb-1 block h-1.5 w-full rounded-full"
                    style={{ background: t.accent }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </aside>
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep("content")}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
              >
                ← Edit content
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Download / Print PDF
              </button>
            </div>
            <div className="overflow-auto rounded-2xl border border-border bg-surface-2 p-3">
              <ResumePreview data={data} templateId={templateId} />
            </div>
          </div>
        </div>
      )}
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
      <span className="font-semibold text-fg">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm"
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
        <p className="text-sm font-semibold">Work history</p>
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
          <div key={idx} className="space-y-2 rounded-xl border border-border bg-bg p-3">
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
                next[idx] = { ...item, bullets: e.target.value.split("\n") };
                onChange(next);
              }}
              className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              {(["start", "end", "location"] as const).map((key) => (
                <input
                  key={key}
                  placeholder={key[0]!.toUpperCase() + key.slice(1)}
                  value={item[key]}
                  onChange={(e) => {
                    const next = [...items];
                    next[idx] = { ...item, [key]: e.target.value };
                    onChange(next);
                  }}
                  className="rounded-lg border border-border px-2 py-1.5 text-sm"
                />
              ))}
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
          onClick={() => onChange([...items, { name: "", description: "", bullets: [""] }])}
        >
          + Add project
        </button>
      </div>
      <div className="mt-2 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2 rounded-xl border border-border bg-bg p-3">
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
            <textarea
              placeholder="Description + bullets (one per line)"
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
          onClick={() => onChange([...items, { school: "", degree: "", year: "" }])}
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
