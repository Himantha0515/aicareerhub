import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      {/* Gradient hairline sits on top of the border for a subtle brand accent. */}
      <div className="h-0.5 w-full" style={{ background: "var(--grad-brand)" }} />
      <div className="glass">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 font-semibold">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg text-xs font-bold text-white"
                style={{ background: "var(--grad-brand)" }}
              >
                AI
              </span>
              <span className="text-gradient">{SITE.name}</span>
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              © {new Date().getFullYear()} {SITE.name}. Job listings link to the
              original employer posting.
            </p>
          </div>
          <nav className="flex gap-5 sm:ml-auto">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-fg-muted transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
