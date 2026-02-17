"use client";
import { useCallback, useState, useEffect } from "react";
import { setMuted, playClickSound } from "../lib/sounds";

const NAV_LINKS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function V2Nav() {
  const [muted, setMutedState] = useState(true);

  useEffect(() => {
    setMuted(true);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !muted;
    setMutedState(newMuted);
    setMuted(newMuted);
    if (!newMuted) playClickSound();
  }, [muted]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-[10] flex items-center justify-between px-8 md:px-12 lg:px-16 pt-6 md:pt-8">
      {/* Left: Monogram */}
      <a
        href="/v2"
        className="font-display text-2xl md:text-3xl font-bold tracking-tight select-none"
        style={{ color: "var(--v2-accent-primary)" }}
        aria-label="Home"
      >
        Salil.
      </a>

      {/* Center: Pill navbar */}
      <div
        className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
        style={{
          backgroundColor: "rgba(42, 47, 58, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(244, 244, 245, 0.06)",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-5 py-1.5 rounded-full text-[11px] font-body font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:text-[var(--v2-text-primary)]"
            style={{ color: "var(--v2-text-muted)" }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: Mute toggle */}
      <button
        onClick={toggleMute}
        className="flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
        style={{ width: 44, height: 44, color: "var(--v2-text-secondary)" }}
        aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </nav>
  );
}
