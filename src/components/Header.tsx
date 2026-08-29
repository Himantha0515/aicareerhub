import Link from "next/link";
import FeedbackButton from "./FeedbackButton";
import MobileNav from "./MobileNav";
import AuthButton from "./AuthButton";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/careers", label: "Careers" },
  { href: "/salaries", label: "Salaries" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/coach", label: "AI Coach" },
];

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-6xl min-w-0 items-center gap-2 px-4 sm:gap-3">

        {/* Logo */}
        <Link href="/" className="group flex min-w-0 shrink overflow-hidden items-center">
          <img
            src="/logo.svg"
            alt={SITE.name}
            className="h-8 w-auto max-w-[38vw] object-contain object-left transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:max-w-none"
          />
        </Link>

        {/* Browse AI Jobs — sits right next to logo on all screen sizes */}
        <Link
          href="/jobs"
          className="btn-gradient shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm"
        >
          Job board
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-1 sm:flex ml-2">
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

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/assessment"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all duration-200"
          >
            🧭 Find My Path
          </Link>
          <AuthButton />
          <FeedbackButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
