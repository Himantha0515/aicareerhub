/**
 * Decorative hero chatbot — SVG + CSS motion (no heavy media).
 * Floats, blinks, and cycles chat bubbles to fill the right-side empty space.
 */
export default function HeroChatBot() {
  return (
    <div className="hero-bot" aria-hidden>
      <div className="hero-bot__glow" />

      {/* Floating topic chips around the bot */}
      <span className="hero-bot__chip hero-bot__chip--a animate-bob">
        🤖 Machine Learning
      </span>
      <span
        className="hero-bot__chip hero-bot__chip--b animate-bob"
        style={{ animationDelay: "-1.8s" }}
      >
        ✨ GenAI
      </span>
      <span
        className="hero-bot__chip hero-bot__chip--c animate-bob"
        style={{ animationDelay: "-3.4s" }}
      >
        📚 RAG &amp; MCP
      </span>

      {/* Chat bubbles */}
      <div className="hero-bot__bubble hero-bot__bubble--in">
        <span className="hero-bot__typing">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="hero-bot__bubble hero-bot__bubble--out">
        Ready to learn AI?
      </div>

      <div className="hero-bot__figure animate-bot-float">
        <svg
          viewBox="0 0 280 320"
          width="280"
          height="320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero-bot__svg"
        >
          <defs>
            <linearGradient id="botBody" x1="40" y1="40" x2="240" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c5cff" />
              <stop offset="0.55" stopColor="#5b3df5" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="botFace" x1="70" y1="90" x2="210" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8f7ff" />
              <stop offset="1" stopColor="#e8e4ff" />
            </linearGradient>
            <linearGradient id="botEar" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
            <filter id="botSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#6d3ef5" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Soft ground shadow */}
          <ellipse cx="140" cy="302" rx="72" ry="10" fill="#6d3ef5" opacity="0.12" className="hero-bot__shadow" />

          {/* Antenna */}
          <g className="hero-bot__antenna">
            <line x1="140" y1="52" x2="140" y2="28" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="20" r="10" fill="#f472b6" className="hero-bot__antenna-dot" />
            <circle cx="140" cy="20" r="16" stroke="#f472b6" strokeWidth="2" opacity="0.35" className="hero-bot__antenna-ring" />
          </g>

          {/* Ears / side pods */}
          <rect x="28" y="118" width="28" height="48" rx="14" fill="url(#botEar)" filter="url(#botSoft)" />
          <rect x="224" y="118" width="28" height="48" rx="14" fill="url(#botEar)" filter="url(#botSoft)" />
          <circle cx="42" cy="142" r="5" fill="#fff" opacity="0.85" />
          <circle cx="238" cy="142" r="5" fill="#fff" opacity="0.85" />

          {/* Head / body */}
          <g filter="url(#botSoft)">
            <rect x="58" y="52" width="164" height="200" rx="48" fill="url(#botBody)" />
            {/* Face plate */}
            <rect x="78" y="88" width="124" height="100" rx="28" fill="url(#botFace)" />

            {/* Eyes */}
            <g className="hero-bot__eyes">
              <ellipse cx="112" cy="128" rx="14" ry="16" fill="#312e81" className="hero-bot__eye" />
              <ellipse cx="168" cy="128" rx="14" ry="16" fill="#312e81" className="hero-bot__eye" />
              <circle cx="117" cy="122" r="4" fill="#fff" opacity="0.9" />
              <circle cx="173" cy="122" r="4" fill="#fff" opacity="0.9" />
            </g>

            {/* Smile */}
            <path
              d="M118 162c8 12 36 12 44 0"
              stroke="#6366f1"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cheek lights */}
            <circle cx="96" cy="148" r="6" fill="#f9a8d4" opacity="0.55" />
            <circle cx="184" cy="148" r="6" fill="#f9a8d4" opacity="0.55" />

            {/* Chest screen */}
            <rect x="98" y="208" width="84" height="28" rx="10" fill="#1e1b4b" opacity="0.35" />
            <rect x="108" y="216" width="28" height="6" rx="3" fill="#a5b4fc" className="hero-bot__bar hero-bot__bar--1" />
            <rect x="142" y="216" width="18" height="6" rx="3" fill="#c4b5fd" className="hero-bot__bar hero-bot__bar--2" />
            <rect x="166" y="216" width="10" height="6" rx="3" fill="#f0abfc" className="hero-bot__bar hero-bot__bar--3" />
          </g>

          {/* Arms */}
          <g className="hero-bot__arm hero-bot__arm--l">
            <rect x="36" y="168" width="22" height="56" rx="11" fill="#6366f1" />
            <circle cx="47" cy="230" r="14" fill="#818cf8" />
          </g>
          <g className="hero-bot__arm hero-bot__arm--r">
            <rect x="222" y="168" width="22" height="56" rx="11" fill="#6366f1" />
            <circle cx="233" cy="230" r="14" fill="#818cf8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
