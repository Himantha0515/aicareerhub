"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_QUESTIONS = [
  "What should I learn to become a GenAI Engineer?",
  "I'm a Java developer — how do I switch into AI?",
  "Which AI jobs am I ready for right now?",
  "What skills am I missing for ML roles?",
];

export default function CareerCoach() {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          profile: profile
            ? {
                targetRole: profile.targetRole,
                currentRole: profile.currentRole,
                experience: profile.experience,
                assessment: profile.assessment,
                completedTopics: profile.completedTopics,
                skills: profile.skills,
              }
            : undefined,
        }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't connect right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {!user && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Tip:</strong>{" "}
          <Link href="/auth/signin" className="font-semibold underline">Sign in</Link>{" "}
          so the coach can use your skill profile for personalized answers.
        </div>
      )}

      {/* Chat window */}
      <div className="min-h-[420px] max-h-[520px] overflow-y-auto rounded-3xl border border-border bg-surface p-4 space-y-4 shadow-[var(--shadow)]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
            <span className="text-5xl">🤖</span>
            <p className="font-semibold text-lg">CareerPath AI</p>
            <p className="text-sm text-fg-muted max-w-xs">
              Your personal AI career coach for India. Ask me anything about your AI career.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm mt-2">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-left text-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-surface-2 border border-border"
              }`}
            >
              {msg.role === "user" ? (profile?.avatarEmoji ?? "👤") : "🤖"}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-tr-sm"
                  : "bg-surface-2 border border-border rounded-tl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 border border-border text-sm">🤖</div>
            <div className="rounded-2xl rounded-tl-sm bg-surface-2 border border-border px-4 py-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-fg-muted animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your AI career..."
          disabled={loading}
          className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-gradient rounded-full px-5 py-3 font-semibold text-sm disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
