"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TYPES = [
  { id: "bug", label: "Bug" },
  { id: "job", label: "Job issue" },
  { id: "content", label: "Content idea" },
  { id: "other", label: "Other" },
] as const;

type FeedbackType = (typeof TYPES)[number]["id"];

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [type, setType] = useState<FeedbackType>("job");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const firstFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setSent(false);
    setSending(false);
    setError(null);
    setMessage("");
    setEmail("");
    setType("job");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed.length < 8 || sending) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          message: trimmed,
          email: email.trim(),
          pageUrl: window.location.href,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!res.ok) {
        setError(
          data.error ||
            "Could not send. Please try again.",
        );
        setSending(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  const modal = (
    <div
      className="fb-root"
      role="presentation"
      style={{ pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0 }}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="fb-backdrop"
        aria-label="Close feedback"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fb-panel"
        style={{
          transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
        }}
      >
        <div className="fb-header">
          <div className="fb-title-row">
            <span className="fb-mail-badge" aria-hidden>
              <MailIcon />
            </span>
            <div>
              <h2 id={titleId} className="fb-title">
                Send feedback
              </h2>
              <p className="fb-sub">Broken links, ideas, or anything we should fix.</p>
            </div>
          </div>
          <button type="button" className="fb-close" onClick={close} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="fb-thanks">
            <p className="fb-thanks-title">Thanks — feedback submitted.</p>
            <p className="fb-thanks-body">
              We got your message and will review it. You can close this window.
            </p>
            <button type="button" className="btn-gradient fb-submit" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <form className="fb-form" onSubmit={submit}>
            <fieldset className="fb-types">
              <legend className="fb-label">What is this about?</legend>
              <div className="fb-type-row">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`fb-type${type === t.id ? " fb-type--on" : ""}`}
                    onClick={() => setType(t.id)}
                    disabled={sending}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="fb-field">
              <span className="fb-label">Message</span>
              <textarea
                ref={firstFieldRef}
                required
                minLength={8}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. This job link is dead, or please add Flipkart AI roles…"
                className="fb-input fb-textarea"
                disabled={sending}
              />
            </label>

            <label className="fb-field">
              <span className="fb-label">
                Email <span className="fb-optional">(optional)</span>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="fb-input"
                disabled={sending}
              />
            </label>

            {error && <p className="fb-error">{error}</p>}

            <button
              type="submit"
              className="btn-gradient fb-submit"
              disabled={sending}
            >
              {sending ? "Submitting…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        title="Feedback"
        className="fb-trigger"
      >
        <MailIcon />
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
