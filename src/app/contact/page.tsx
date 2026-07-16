import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} — corrections, listings and questions.`,
};

/* TODO: replace the placeholder address in src/lib/site.ts once the domain is
 * registered. Deliberately not defaulting to a personal Gmail — a public
 * contact address on an indexed page attracts spam, and that is the owner's
 * call to make. */

const REASONS = [
  {
    title: "A listing is wrong or closed",
    body: "Tell us which one and we will fix or remove it the same week. This is the most useful email you can send us.",
  },
  {
    title: "A listing asked you for money",
    body: "Tell us immediately. We will pull it. No genuine employer charges a fee to apply.",
  },
  {
    title: "You are hiring for an AI role in India",
    body: "Send the link to your careers page. Listing is free — we do not charge to post.",
  },
  {
    title: "Something in a guide is wrong",
    body: "We would rather be corrected than be confidently wrong. Point at the sentence.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-(--container-prose) px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 leading-relaxed text-fg-muted text-pretty">
        {SITE.name} is small, so email reaches a person rather than a queue.
      </p>

      <p className="mt-6 rounded-xl border border-border bg-surface p-5 text-fg">
        <span className="text-sm text-fg-muted">Email</span>
        <br />
        <span className="font-mono">—</span>
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight text-fg">
        What to write about
      </h2>
      <ul className="mt-4 space-y-4">
        {REASONS.map((r) => (
          <li key={r.title}>
            <h3 className="font-medium text-fg">{r.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted text-pretty">
              {r.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
