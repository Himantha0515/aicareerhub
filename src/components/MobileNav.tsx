"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/learn", label: "Learn", emoji: "🎓" },
  { href: "/careers", label: "Careers", emoji: "🧭" },
  { href: "/salaries", label: "Salaries", emoji: "💰" },
  { href: "/interview-prep", label: "Interview Prep", emoji: "📝" },
  { href: "/jobs", label: "Jobs", emoji: "💼" },
  { href: "/profile", label: "Profile", emoji: "👤" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg text-fg transition-colors hover:bg-accent-soft"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-y-0 right-0 z-50 w-72 border-l border-border bg-bg/95 backdrop-blur-lg p-6 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="mb-6 grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      pathname.startsWith(item.href)
                        ? "bg-accent/10 text-accent"
                        : "text-fg hover:bg-accent-soft hover:text-accent"
                    }`}
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
