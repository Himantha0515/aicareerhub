import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data.`,
};

/* DRAFT — must be reviewed before launch. See docs/PLAN.md.
 *
 * Placeholders to fill once the entity and domain exist:
 *   - legal entity name and registered address
 *   - contact email
 *   - the actual analytics/ads vendors in use (this text assumes Google
 *     AdSense + Google Analytics; delete what you do not use)
 *
 * This is a good-faith starting draft, not legal advice. AdSense review and
 * India's DPDP Act both expect an accurate policy — inaccurate boilerplate is
 * a liability, so do not ship this unchanged. */

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-(--container-prose) px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-fg-muted">Last updated: —</p>

      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          This policy explains what {SITE.name} collects and why. In short: we
          do not ask you to create an account, and we do not sell your data.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">What we collect</h2>
        <p>
          <strong className="text-fg">Analytics.</strong> We collect aggregate
          data about which pages are visited, roughly where visitors are, and
          which links are clicked. This is used to decide what to write next.
        </p>
        <p>
          <strong className="text-fg">Advertising.</strong> This site shows ads
          served by third-party vendors, which may use cookies to serve ads based
          on your prior visits to this and other sites. You can opt out of
          personalised advertising through Google&rsquo;s Ads Settings.
        </p>
        <p>
          <strong className="text-fg">Anything you send us.</strong> If you email
          us, we keep the email so we can reply.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">
          What we do not collect
        </h2>
        <p>
          We do not take job applications, so we never receive your CV, contact
          details or work history. When you click Apply, you leave this site and
          the employer&rsquo;s own privacy policy applies from that point.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">Your rights</h2>
        <p>
          You can ask what data we hold about you and ask us to delete it. Write
          to us at the address on our contact page.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">Contact</h2>
        <p>Questions about this policy: —</p>
      </div>
    </div>
  );
}
