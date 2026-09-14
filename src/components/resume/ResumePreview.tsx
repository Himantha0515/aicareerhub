import type { ReactNode } from "react";
import type { ResumeData, ResumeTemplateId } from "@/lib/resume-types";

type Props = {
  data: ResumeData;
  templateId: ResumeTemplateId;
};

function SectionTitle({
  children,
  templateId,
  accent,
}: {
  children: ReactNode;
  templateId: ResumeTemplateId;
  accent: string;
}) {
  if (templateId === "classic") {
    return (
      <h2
        className="mt-4 border-b-2 pb-1 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ borderColor: accent, color: accent }}
      >
        {children}
      </h2>
    );
  }
  if (templateId === "genai") {
    return (
      <h2 className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
        {children}
      </h2>
    );
  }
  return (
    <h2 className="mt-4 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
      {children}
    </h2>
  );
}

const ACCENTS: Record<ResumeTemplateId, string> = {
  modern: "#6d3ef5",
  classic: "#0f172a",
  compact: "#1e40af",
  genai: "#7c3aed",
};

export default function ResumePreview({ data, templateId }: Props) {
  const accent = ACCENTS[templateId];
  const dense = templateId === "compact";
  const pad = dense ? "p-6" : "p-8";
  const textSize = dense ? "text-[11px] leading-snug" : "text-[12px] leading-relaxed";

  const contact = [
    data.email,
    data.phone,
    data.location,
    ...(data.links ?? []),
  ].filter(Boolean);

  return (
    <article
      id="resume-print-root"
      className={`resume-sheet mx-auto w-full max-w-[794px] bg-white text-slate-900 shadow-[var(--shadow)] ${pad} ${textSize}`}
      style={{ fontFamily: templateId === "classic" ? "Georgia, serif" : "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      {/* Header */}
      {templateId === "modern" || templateId === "genai" ? (
        <header
          className="-mx-8 -mt-8 mb-5 px-8 py-5 text-white"
          style={{ background: `linear-gradient(120deg, ${accent}, #3b82f6)` }}
        >
          <h1 className="text-2xl font-bold tracking-tight">{data.fullName || "Your Name"}</h1>
          <p className="mt-1 text-sm opacity-95">{data.headline || "Target role headline"}</p>
          <p className="mt-2 text-[11px] opacity-90">{contact.join(" · ") || "email · phone · location"}</p>
        </header>
      ) : (
        <header className="border-b pb-3" style={{ borderColor: accent }}>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
            {data.fullName || "Your Name"}
          </h1>
          <p className="mt-0.5 text-sm font-medium text-slate-700">{data.headline || "Target role headline"}</p>
          <p className="mt-1 text-[11px] text-slate-600">{contact.join(" · ") || "email · phone · location"}</p>
        </header>
      )}

      {data.summary && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>Summary</SectionTitle>
          <p className="mt-1.5 text-slate-700">{data.summary}</p>
        </section>
      )}

      {templateId === "genai" && data.skills.length > 0 && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>AI & Engineering Skills</SectionTitle>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {data.skills.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ background: accent }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {templateId !== "genai" && data.skills.length > 0 && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>Skills</SectionTitle>
          <p className="mt-1.5 text-slate-700">{data.skills.join(" · ")}</p>
        </section>
      )}

      {data.experience.some((e) => e.company || e.role) && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>Experience</SectionTitle>
          <div className="mt-2 space-y-3">
            {data.experience.map((e, i) => (
              <div key={`${e.company}-${i}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-slate-900">
                    {e.role || "Role"}{e.company ? ` · ${e.company}` : ""}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {[e.start, e.end].filter(Boolean).join(" – ")}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                </div>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-slate-700">
                    {e.bullets.filter(Boolean).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.some((p) => p.name) && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>Projects</SectionTitle>
          <div className="mt-2 space-y-2.5">
            {data.projects.map((p, i) => (
              <div key={`${p.name}-${i}`}>
                <p className="font-semibold text-slate-900">
                  {p.name}
                  {p.link ? (
                    <span className="ml-2 text-[10px] font-normal text-slate-500">{p.link}</span>
                  ) : null}
                </p>
                {p.description && <p className="text-slate-700">{p.description}</p>}
                {p.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-slate-700">
                    {p.bullets.filter(Boolean).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some((e) => e.school || e.degree) && (
        <section>
          <SectionTitle templateId={templateId} accent={accent}>Education</SectionTitle>
          <div className="mt-2 space-y-1.5">
            {data.education.map((ed, i) => (
              <div key={`${ed.school}-${i}`} className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-slate-900">
                  {ed.degree || "Degree"}
                  {ed.school ? ` · ${ed.school}` : ""}
                  {ed.details ? ` · ${ed.details}` : ""}
                </p>
                <p className="text-[10px] text-slate-500">{ed.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {templateId === "genai" && !data.summary && data.skills.length === 0 && (
        <p className="mt-6 text-slate-400">Fill the form or paste notes to preview your GenAI resume.</p>
      )}
    </article>
  );
}
