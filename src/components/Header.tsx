import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/careers", label: "Careers" },
  { href: "/salaries", label: "Salaries" },
  { href: "/interview-prep", label: "Interview Prep" },
];

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-white shadow-[var(--glow)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            style={{ background: "var(--grad-brand)" }}
          >
            AI
          </span>
          <span className="text-gradient text-lg font-bold tracking-tight">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-fg-muted transition-all duration-200 hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/profile"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-fg-muted transition-all duration-200 hover:bg-accent-soft hover:text-accent sm:inline-block"
            title="Profile"
          >
            👤
          </Link>
          <ThemeToggle />
          <Link
            href="/jobs"
            className="btn-gradient hidden rounded-full px-4 py-2 text-sm font-semibold sm:inline-block"
          >
            Browse jobs ✨
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
