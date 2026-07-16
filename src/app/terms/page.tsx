import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use ${SITE.name}.`,
};

/* DRAFT — must be reviewed before launch. See docs/PLAN.md.
 * Fill in the legal entity, governing jurisdiction and contact address. This is
 * a good-faith starting draft, not legal advice. */

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-(--container-prose) px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-fg-muted">Last updated: —</p>

      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <h2 className="pt-2 text-xl font-semibold text-fg">
          We are not the employer
        </h2>
        <p>
          {SITE.name} lists roles advertised by other organisations and links to
          their own postings. We are not a recruiter or agency, we do not accept
          applications, and we have no role in any hiring decision. Verify every
          listing on the employer&rsquo;s own site before acting on it.
        </p>
        <p>
          No genuine employer will ask you to pay a fee to apply for a job. If a
          listing you found here asks for money, do not pay it — tell us and we
          will remove the listing.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">
          Guides are educational
        </h2>
        <p>
          Our guides, career descriptions and salary information are general
          educational content. They are not career, financial or legal advice,
          and outcomes vary by person, company and market.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">Accuracy</h2>
        <p>
          We check listings by hand and source the figures we publish, but roles
          close, salaries move and pages go stale. We make no guarantee that any
          information here is current or complete.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">Content</h2>
        <p>
          Our guides are ours. Job listings, company names and logos belong to
          their respective owners and appear here to identify the role. If you
          are an employer and want a listing removed, contact us and we will do
          it.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">Contact</h2>
        <p>Questions about these terms: —</p>
      </div>
    </div>
  );
}
