"use client";

import { useRouter, usePathname } from "next/navigation";
import { useRef, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  if (pathname === "/") return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger the page-transition loader
    window.dispatchEvent(new CustomEvent("page-navigate"));

    // Ripple effect
    const rect = btnRef.current!.getBoundingClientRect();
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

    router.back();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 flex justify-start">
      <button
        ref={btnRef}
        onClick={handleClick}
        aria-label="Go back"
        className="back-btn group relative overflow-hidden"
      >
        <span className="back-btn-arrow" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            className="transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="relative z-10 text-sm font-semibold text-white">Back</span>
        {ripples.map((r) => (
          <span key={r.id} className="back-btn-ripple" style={{ left: r.x, top: r.y }} />
        ))}
      </button>
    </div>
  );
}
