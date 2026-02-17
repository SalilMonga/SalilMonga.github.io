"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { playClickSound } from "../lib/sounds";

interface Role {
  label: string;
  accent: string;
  glow: string;
}

const ROLES: Role[] = [
  {
    label: "Full-Stack Engineer",
    accent: "#0EA5E9",
    glow: "rgba(14, 165, 233, 0.15)",
  },
  {
    label: "XR Developer",
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    label: "Builder",
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.15)",
  },
];

interface V2RoleToggleProps {
  onRoleChange?: (role: Role) => void;
}

export function V2RoleToggle({ onRoleChange }: V2RoleToggleProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);

  const currentRole = ROLES[roleIndex];

  const cycleRole = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    playClickSound();

    const nextIndex = (roleIndex + 1) % ROLES.length;
    const nextRole = ROLES[nextIndex];

    // Animate out current text
    gsap.to(textRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setRoleIndex(nextIndex);
        onRoleChange?.(nextRole);

        // Update CSS custom properties for accent color
        document.documentElement.style.setProperty(
          "--v2-accent-primary",
          nextRole.accent,
        );
        document.documentElement.style.setProperty(
          "--v2-accent-glow",
          nextRole.glow,
        );
        document.documentElement.style.setProperty(
          "--v2-accent-glow-strong",
          nextRole.glow.replace("0.15", "0.3"),
        );

        // Animate in new text
        gsap.fromTo(
          textRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  }, [roleIndex, onRoleChange]);

  // Set initial CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--v2-accent-primary",
      currentRole.accent,
    );
    document.documentElement.style.setProperty(
      "--v2-accent-glow",
      currentRole.glow,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      onClick={cycleRole}
      className="group inline-flex items-center gap-2 font-body transition-colors duration-300 cursor-pointer select-none"
      style={{
        color: "var(--v2-accent-primary)",
        fontSize: "var(--v2-hero-tagline-size)",
      }}
      aria-label={`Current role: ${currentRole.label}. Click to cycle.`}
    >
      <span
        ref={textRef}
        className="inline-block font-medium tracking-wide"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        {currentRole.label}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="opacity-40 group-hover:opacity-80 transition-all duration-300 group-hover:rotate-180"
        style={{ color: "var(--v2-accent-primary)" }}
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
