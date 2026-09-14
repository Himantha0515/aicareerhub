import type { ReactNode } from "react";
import { getResumeTemplate } from "@/lib/resume-templates";
import type { ResumeData, ResumeLayout, ResumeTemplateId } from "@/lib/resume-types";

type Props = {
  data: ResumeData;
  templateId: ResumeTemplateId | string;
  /** Scale down for gallery thumbnails */
  compactPreview?: boolean;
};

function SectionTitle({
  children,
  layout,
  accent,
}: {
  children: ReactNode;
  layout: ResumeLayout;
  accent: string;
}) {
  if (layout === "classic") {
    return (
      <h2
        className="mt-3 border-b pb-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ borderColor: accent, color: accent }}
      >
        {children}
      </h2>
    );
  }
  if (layout === "skills_first") {
    return (
      <h2 className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
        {children}
      </h2>
    );
  }
  return (
    <h2 className="mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
      {children}
    </h2>
  );
}

function Body({
  data,
  layout,
  accent,
  dense,
}: {
  data: ResumeData;
  layout: ResumeLayout;
  accent: string;
  dense: boolean;
}) {
  const gap = dense ? "space-y-2" : "space-y-3";

  return (
    <div className={gap}>
      {data.summary && (
        <section>
          <SectionTitle layout={layout} accent={accent}>Summary</SectionTitle>
          <p className="mt-1 text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && layout === "skills_first" && (
        <section>
          <SectionTitle layout={layout} accent={accent}>Skills</SectionTitle>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {data.skills.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-white"
                style={{ background: accent }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && layout !== "skills_first" && (
        <section>
          <SectionTitle layout={layout} accent={accent}>Skills</SectionTitle>
          <p className="mt-1 text-slate-700">{data.skills.join(" · ")}</p>
        </section>
      )}

      {data.experience.some((e) => e.company || e.role) && (
        <section>
          <SectionTitle layout={layout} accent={accent}>Experience</SectionTitle>
          <div className={`mt-1.5 ${gap}`}>
            {data.experience.map((e, i) => (
              <div
                key={`${e.company}-${i}`}
                className={layout === "timeline" ? "border-l-2 pl-3" : ""}
                style={layout === "timeline" ? { borderColor: accent } : undefined}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <p className="font-semibold text-slate-900">
                    {e.role || "Role"}
                    {e.company ? ` · ${e.company}` : ""}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {[e.start, e.end].filter(Boolean).join(" – ")}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                </div>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-slate-700">
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
          <SectionTitle layout={layout} accent={accent}>Projects</SectionTitle>
          <div className={`mt-1.5 ${gap}`}>
            {data.projects.map((p, i) => (
              <div key={`${p.name}-${i}`}>
                <p className="font-semibold text-slate-900">
                  {p.name}
                  {p.link ? (
                    <span className="ml-1.5 text-[9px] font-normal text-slate-500">{p.link}</span>
                  ) : null}
                </p>
                {p.description && <p className="text-slate-700">{p.description}</p>}
                {p.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-slate-700">
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
          <SectionTitle layout={layout} accent={accent}>Education</SectionTitle>
          <div className="mt-1.5 space-y-1">
            {data.education.map((ed, i) => (
              <div key={`${ed.school}-${i}`} className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="font-semibold text-slate-900">
                  {ed.degree || "Degree"}
                  {ed.school ? ` · ${ed.school}` : ""}
                  {ed.details ? ` · ${ed.details}` : ""}
                </p>
                <p className="text-[9px] text-slate-500">{ed.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ResumePreview({ data, templateId, compactPreview }: Props) {
  const template = getResumeTemplate(templateId);
  const { accent, layout } = template;
  const dense = layout === "compact" || !!compactPreview;
  const pad = dense ? "p-5" : "p-7";
  const textSize = dense ? "text-[10px] leading-snug" : "text-[11.5px] leading-relaxed";
  const contact = [data.email, data.phone, data.location, ...(data.links ?? [])].filter(Boolean);

  const name = data.fullName || "Your Name";
  const headline = data.headline || "Target role headline";

  if (layout === "sidebar") {
    return (
      <article
        id={compactPreview ? undefined : "resume-print-root"}
        className={`resume-sheet mx-auto flex w-full max-w-[794px] overflow-hidden bg-white text-slate-900 shadow-[var(--shadow)] ${textSize}`}
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", minHeight: compactPreview ? 420 : 600 }}
      >
        <aside className="w-[32%] shrink-0 px-4 py-6 text-white" style={{ background: accent }}>
          <h1 className="text-lg font-bold leading-tight">{name}</h1>
          <p className="mt-1 text-[10px] opacity-95">{headline}</p>
          <p className="mt-4 text-[9px] font-bold uppercase tracking-wider opacity-80">Contact</p>
          <div className="mt-1 space-y-1 text-[9px] opacity-95 break-words">
            {contact.length ? contact.map((c) => <p key={c}>{c}</p>) : <p>email · phone</p>}
          </div>
          {data.skills.length > 0 && (
            <>
              <p className="mt-5 text-[9px] font-bold uppercase tracking-wider opacity-80">Skills</p>
              <ul className="mt-1 space-y-0.5 text-[9px] opacity-95">
                {data.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </aside>
        <div className={`min-w-0 flex-1 ${pad}`}>
          <Body
            data={{ ...data, skills: [] }}
            layout={layout}
            accent={accent}
            dense={dense}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      id={compactPreview ? undefined : "resume-print-root"}
      className={`resume-sheet mx-auto w-full max-w-[794px] bg-white text-slate-900 shadow-[var(--shadow)] ${pad} ${textSize}`}
      style={{
        fontFamily:
          layout === "classic" || layout === "minimal"
            ? "Georgia, 'Times New Roman', serif"
            : "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {layout === "header" && (
        <header
          className={`${dense ? "-mx-5 -mt-5 mb-4 px-5 py-4" : "-mx-7 -mt-7 mb-4 px-7 py-5"} text-white`}
          style={{ background: `linear-gradient(120deg, ${accent}, #3b82f6)` }}
        >
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{name}</h1>
          <p className="mt-0.5 text-sm opacity-95">{headline}</p>
          <p className="mt-2 text-[10px] opacity-90">{contact.join(" · ") || "email · phone · location"}</p>
        </header>
      )}

      {layout === "two_tone" && (
        <header className="mb-3">
          <div className="h-1.5 w-full rounded-full" style={{ background: accent }} />
          <h1 className="mt-3 text-xl font-bold tracking-tight" style={{ color: accent }}>
            {name}
          </h1>
          <p className="text-sm font-medium text-slate-700">{headline}</p>
          <p className="mt-1 text-[10px] text-slate-600">{contact.join(" · ")}</p>
        </header>
      )}

      {(layout === "classic" || layout === "compact" || layout === "minimal" || layout === "timeline" || layout === "skills_first") && (
        <header
          className={
            layout === "minimal"
              ? "mb-3"
              : "mb-3 border-b pb-2"
          }
          style={layout === "minimal" ? undefined : { borderColor: `${accent}55` }}
        >
          <h1
            className="text-xl font-bold tracking-tight sm:text-2xl"
            style={{ color: layout === "minimal" ? "#0f172a" : accent }}
          >
            {name}
          </h1>
          <p className="mt-0.5 text-sm font-medium text-slate-700">{headline}</p>
          <p className="mt-1 text-[10px] text-slate-600">{contact.join(" · ") || "email · phone · location"}</p>
        </header>
      )}

      <Body data={data} layout={layout} accent={accent} dense={dense} />
    </article>
  );
}
