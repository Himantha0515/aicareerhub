/* Site-wide ambient backdrop: grid + glow orbs + floating particles.
 * Pure CSS — no JS, no WebGL — GPU-composited only. */
export default function BackgroundFX() {
  const particles = [
    { size: 3, top: "8%",  left: "12%",  delay: "0s",    dur: "7s",  color: "var(--indigo)" },
    { size: 2, top: "15%", left: "75%",  delay: "-2s",   dur: "9s",  color: "var(--fuchsia)" },
    { size: 4, top: "25%", left: "40%",  delay: "-4s",   dur: "11s", color: "var(--violet)" },
    { size: 2, top: "35%", left: "88%",  delay: "-1s",   dur: "8s",  color: "var(--cyan)" },
    { size: 3, top: "50%", left: "5%",   delay: "-6s",   dur: "10s", color: "var(--indigo)" },
    { size: 2, top: "60%", left: "60%",  delay: "-3s",   dur: "12s", color: "var(--fuchsia)" },
    { size: 4, top: "72%", left: "28%",  delay: "-5s",   dur: "9s",  color: "var(--violet)" },
    { size: 2, top: "80%", left: "82%",  delay: "-1.5s", dur: "7s",  color: "var(--cyan)" },
    { size: 3, top: "90%", left: "48%",  delay: "-7s",   dur: "11s", color: "var(--indigo)" },
    { size: 2, top: "18%", left: "55%",  delay: "-3.5s", dur: "8s",  color: "var(--fuchsia)" },
    { size: 3, top: "44%", left: "88%",  delay: "-2.5s", dur: "13s", color: "var(--violet)" },
    { size: 2, top: "65%", left: "18%",  delay: "-4.5s", dur: "10s", color: "var(--cyan)" },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Large ambient orbs */}
      <div
        className="orb animate-float-y h-[500px] w-[500px] -top-32 -left-32"
        style={{ background: "var(--indigo)" }}
      />
      <div
        className="orb animate-float-xy h-[420px] w-[420px] top-1/4 -right-40"
        style={{ background: "var(--fuchsia)", animationDelay: "-4s" }}
      />
      <div
        className="orb animate-float-y h-[360px] w-[360px] bottom-[-100px] left-1/3"
        style={{ background: "var(--cyan)", animationDelay: "-2.5s" }}
      />
      {/* Extra orb for depth */}
      <div
        className="orb animate-float-xy h-[280px] w-[280px] top-2/3 right-1/4"
        style={{ background: "var(--violet)", animationDelay: "-6s", opacity: "calc(var(--orb-opacity) * 0.6)" }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle-dot"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`,
          }}
        />
      ))}

      {/* Shooting-star streaks */}
      <div className="streak streak-1" />
      <div className="streak streak-2" />
      <div className="streak streak-3" />
    </div>
  );
}
