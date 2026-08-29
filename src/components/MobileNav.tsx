"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/assessment",     label: "Find My Path", emoji: "🧭" },
  { href: "/learn",          label: "Learn",      emoji: "🎓" },
  { href: "/careers",        label: "Careers",    emoji: "🗺️" },
  { href: "/salaries",       label: "Salaries",   emoji: "💰" },
  { href: "/interview-prep", label: "Interviews", emoji: "📝" },
  { href: "/jobs",           label: "Jobs",       emoji: "💼" },
  { href: "/coach",          label: "AI Coach",   emoji: "🤖" },
  { href: "/profile",        label: "My profile", emoji: "👤" },
];

export default function MobileNav() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname              = usePathname();
  const closeRef              = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setTimeout(() => closeRef.current?.focus(), 50);
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navigateFromMenu = (href: string) => {
    setOpen(false);
    if (href === pathname || href === window.location.pathname) return;
    // Trigger the global page-transition loader while Next.js navigates
    window.dispatchEvent(new CustomEvent("page-navigate"));
  };

  const overlay = (
    <div
      className="mnav-root"
      aria-hidden={!open}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <button
        type="button"
        className="mnav-backdrop"
        aria-label="Close navigation menu"
        onClick={() => setOpen(false)}
        style={{ opacity: open ? 1 : 0 }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="mnav-panel"
        style={{
          transform: open ? "translateX(0)" : "translateX(110%)",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="mnav-header">
          <img src="/logo.svg" alt="AI CareerPath" className="h-8 w-auto max-w-[70%]" />
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="mnav-close-btn"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4"  y1="4"  x2="14" y2="14" />
              <line x1="14" y1="4"  x2="4"  y2="14" />
            </svg>
          </button>
        </div>

        <nav className="mnav-links">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => navigateFromMenu(item.href)}
              className={`mnav-link${isActive(item.href) ? " mnav-link--active" : ""}`}
              style={{
                opacity:   open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(12px)",
                transition: [
                  `opacity 280ms ease ${i * 40 + 60}ms`,
                  `transform 280ms cubic-bezier(0.34,1.56,0.64,1) ${i * 40 + 60}ms`,
                ].join(", "),
              }}
            >
              <span className="mnav-link-emoji">{item.emoji}</span>
              <span>{item.label}</span>
              {isActive(item.href) && <span className="mnav-active-dot" />}
            </Link>
          ))}
        </nav>

        <p
          className="mnav-footer"
          style={{
            opacity:    open ? 0.55 : 0,
            transition: `opacity 280ms ease ${open ? "280ms" : "0ms"}`,
          }}
        >
          AI CareerPath · Built for India
        </p>
      </div>
    </div>
  );

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className="mnav-hamburger"
      >
        <span style={{ transform: open ? "rotate(45deg)"  : "translateY(-5px)" }} />
        <span style={{ opacity:   open ? 0 : 1 }} />
        <span style={{ transform: open ? "rotate(-45deg)" : "translateY(5px)"  }} />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
