import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, who it is for, and how we work.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-(--container-prose) px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        About {SITE.name}
      </h1>

      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          {SITE.name} is a free resource for people in India who want to work in
          AI — school students who are curious, college students choosing a
          direction, and working engineers thinking about switching.
        </p>
        <p>
          There is no shortage of AI content. There is a real shortage of AI
          content that is honest about what the work involves, what it pays, and
          how competitive it is. That is the gap we are trying to fill.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">How we work</h2>
        <p>
          <strong className="text-fg">Every job listing is checked by hand.</strong>{" "}
          We do not auto-scrape boards. It means our board fills slowly, and it
          means the links work and the roles are real.
        </p>
        <p>
          <strong className="text-fg">We do not publish numbers we cannot source.</strong>{" "}
          Salary ranges arrive with a named source and a date, or they do not
          arrive. A figure that is only roughly right is worse than none, because
          people make real decisions on it.
        </p>
        <p>
          <strong className="text-fg">We are not the employer.</strong> We link to
          the company&rsquo;s own posting and never handle your application. No
          legitimate employer will ask you to pay a fee to apply — if one does,
          walk away, and please{" "}
          <Link href="/contact" className="text-accent hover:opacity-70">
            tell us
          </Link>{" "}
          so we can remove the listing.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">How this is funded</h2>
        <p>
          The site is free and we intend to keep it that way. It will carry
          advertising. Ads will never decide which jobs get listed or what our
          guides say.
        </p>
      </div>
    </div>
  );
}
