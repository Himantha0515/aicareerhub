"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const prevPath = useRef(pathname);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const minTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const showLoader = () => {
      clearTimeout(hideTimer.current);
      clearTimeout(minTimer.current);
      setPhase("in");
      setVisible(true);
      minTimer.current = setTimeout(() => {
        minTimer.current = undefined;
      }, 600);
    };

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      ) return;
      if (href === pathname || href === window.location.pathname) return;
      showLoader();
    };

    // Also triggered by BackButton via custom event
    const handleNavigate = () => showLoader();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("page-navigate", handleNavigate);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("page-navigate", handleNavigate);
    };
  }, [pathname]);

  // Dismiss when route has actually changed
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      const dismiss = () => {
        setPhase("out");
        hideTimer.current = setTimeout(() => setVisible(false), 400);
      };
      if (minTimer.current) {
        // Wait for minimum time first
        const remaining = 300;
        hideTimer.current = setTimeout(dismiss, remaining);
      } else {
        dismiss();
      }
    }
  }, [pathname]);

  useEffect(() => () => {
    clearTimeout(hideTimer.current);
    clearTimeout(minTimer.current);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-transition-overlay"
      data-phase={phase}
      aria-hidden
    >
      {/* Fluid gradient ring */}
      <div className="ptl-ring-wrap">
        <div className="ptl-ring ptl-ring-1" />
        <div className="ptl-ring ptl-ring-2" />
        <div className="ptl-ring ptl-ring-3" />
        <div className="ptl-core" />
        {/* Orbiting dot */}
        <div className="ptl-orbit-wrap">
          <div className="ptl-orbit-dot" />
        </div>
      </div>
      {/* Branding */}
      <img
        src="/logo.svg"
        alt="AI CareerPath"
        className="ptl-logo"
      />
      <p className="ptl-tagline">Loading…</p>
    </div>
  );
}
