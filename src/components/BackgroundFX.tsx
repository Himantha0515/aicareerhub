/* Site-wide ambient backdrop: a faded grid plus three slow-drifting glow orbs.
 * Pure CSS animation — no JS, no WebGL — so it costs nothing on main thread. */
export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="orb animate-float-y h-[420px] w-[420px] -top-24 -left-24"
        style={{ background: "var(--indigo)" }}
      />
      <div
        className="orb animate-float-xy h-[360px] w-[360px] top-1/4 -right-32"
        style={{ background: "var(--fuchsia)", animationDelay: "-4s" }}
      />
      <div
        className="orb animate-float-y h-[300px] w-[300px] bottom-[-120px] left-1/3"
        style={{ background: "var(--cyan)", animationDelay: "-2.5s" }}
      />
    </div>
  );
}
