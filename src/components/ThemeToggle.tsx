"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(stored ?? system);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="rounded-md border border-border p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {/* Render nothing until mounted so server and client markup agree. */}
      <span className="block h-4 w-4 text-sm leading-4">
        {theme === null ? "" : theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
