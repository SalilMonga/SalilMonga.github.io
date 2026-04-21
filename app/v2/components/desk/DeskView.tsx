"use client";
import { useEffect, useState } from "react";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import { usePeripheralParallax } from "../../hooks/usePeripheralParallax";

/* ═══════════════════════════════════════════════════════════
   TUNING CONSTANTS
   ═══════════════════════════════════════════════════════════ */
const DESK = {
  // Fade-in timing
  fadeDuration: 1000,
  uiStagger: 400,

  // Parallax amplitudes (px)  — applied via CSS calc()
  parallax: {
    environment: 3,    // Layer 0–1: least movement
    monitors: 2,       // Layer 2: stable center
    deskPlane: 6,      // Layer 3: medium
    foreground: 10,    // Layer 4: most depth
    pcTower: 14,       // Layer 5: peripheral
    ui: 2,             // Layer 6: minimal so text stays readable
  },

  // Peripheral reveal
  peripheral: {
    pcBaseOpacity: 0.08,      // PC tower resting opacity
    pcRevealOpacity: 0.85,    // PC tower at full edge proximity
    fgBaseOpacity: 0.1,       // foreground edge resting
    fgRevealOpacity: 0.7,     // foreground at full edge proximity
  },

  // Colors (match hero design system)
  colors: {
    bg: "#18181B",
    wallColor: "rgba(30, 33, 40, 0.6)",
    deskSurface: "rgba(22, 24, 28, 0.9)",
    monitorFrame: "rgba(35, 38, 48, 0.85)",
    screenGlow: "rgba(107, 159, 200, 0.08)",
    pcGlow: "rgba(107, 159, 200, 0.15)",
    fgEdge: "rgba(20, 22, 26, 0.95)",
  },
} as const;

/* ═══════════════════════════════════════════════════════════
   PLACEHOLDER DATA
   ═══════════════════════════════════════════════════════════ */
const PROJECTS = [
  { title: "VR Classroom", desc: "Immersive learning with Unity & OpenXR.", tag: "XR" },
  { title: "Trallet", desc: "Real-time budget tracker with AI insights.", tag: "Full-Stack" },
  { title: "Portfolio V2", desc: "Cinematic portfolio with parallax desk.", tag: "Creative" },
];

const SKILLS = [
  "TypeScript", "React / Next.js", "Node.js", "Python",
  "Three.js / R3F", "Unity / C#", "Flutter / Dart",
  "PostgreSQL", "AWS / GCP", "Figma",
];

/* ═══════════════════════════════════════════════════════════
   MONITOR PANEL (DOM overlay card)
   ═══════════════════════════════════════════════════════════ */
function MonitorPanel({
  title,
  visible,
  children,
}: {
  title: string;
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group relative rounded-xl p-5 md:p-6 transition-all duration-500"
      style={{
        backgroundColor: "rgba(30, 32, 40, 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(244, 244, 245, 0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionProperty: "opacity, transform",
      }}
    >
      {/* Status dot + title */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "var(--v2-accent-primary)" }}
        />
        <span
          className="text-[11px] font-body font-medium tracking-[0.15em] uppercase"
          style={{ color: "var(--v2-text-muted)" }}
        >
          {title}
        </span>
      </div>
      {children}
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "0 0 30px rgba(107,159,200,0.06), inset 0 0 30px rgba(107,159,200,0.02)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESK VIEW — MAIN SECTION
   ═══════════════════════════════════════════════════════════ */
export function DeskView() {
  const { ref: inViewRef, hasEntered } = useInViewOnce(0.1);
  const parallaxRef = usePeripheralParallax();
  const [uiVisible, setUiVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Merge refs: inViewRef (for fade trigger) + parallaxRef (for CSS vars)
  const setRefs = (el: HTMLElement | null) => {
    (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
    parallaxRef.current = el;
  };

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Stagger UI after scene fade
  useEffect(() => {
    if (!hasEntered) return;
    if (prefersReduced) {
      setUiVisible(true);
      return;
    }
    const t = setTimeout(
      () => setUiVisible(true),
      DESK.fadeDuration + DESK.uiStagger,
    );
    return () => clearTimeout(t);
  }, [hasEntered, prefersReduced]);

  const px = DESK.parallax;
  const pr = DESK.peripheral;

  return (
    <section
      ref={setRefs}
      id="projects"
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: DESK.colors.bg,
        /* Initialize CSS vars so layers don't flash */
        "--mx": "0",
        "--my": "0",
        "--right-edge": "0",
        "--bottom-edge": "0",
        "--left-edge": "0",
      } as React.CSSProperties}
    >
      {/* ── Layer 0: Environment background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(175deg, #18181B 0%, #1c1f25 30%, #1a1c22 60%, #16171b 100%)",
          transform: `translate(
            calc(var(--mx) * ${px.environment}px),
            calc(var(--my) * ${px.environment}px)
          )`,
          willChange: "transform",
        }}
      >
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Ambient glow — centered, matches hero accent */}
        <div
          className="absolute"
          style={{
            top: "15%",
            left: "30%",
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,159,200,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ── Layer 1: Wall / backdrop ── */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${DESK.colors.wallColor} 0%, transparent 100%)`,
          transform: `translate(
            calc(var(--mx) * ${px.environment}px),
            calc(var(--my) * ${px.environment * 0.5}px)
          )`,
          willChange: "transform",
        }}
      />

      {/* ── Layer 2: Monitors (center) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(
            calc(var(--mx) * ${px.monitors}px),
            calc(var(--my) * ${px.monitors}px)
          )`,
          willChange: "transform",
        }}
      >
        <div className="flex gap-6 md:gap-10">
          {/* Left monitor */}
          <div
            className="w-[260px] md:w-[320px] h-[170px] md:h-[200px] rounded-lg relative"
            style={{
              backgroundColor: DESK.colors.monitorFrame,
              border: "1px solid rgba(244,244,245,0.04)",
              boxShadow: `0 0 40px ${DESK.colors.screenGlow}, inset 0 0 20px ${DESK.colors.screenGlow}`,
            }}
          >
            {/* Screen inner glow */}
            <div
              className="absolute inset-2 rounded"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${DESK.colors.screenGlow} 0%, transparent 70%)`,
              }}
            />
          </div>
          {/* Right monitor */}
          <div
            className="w-[260px] md:w-[320px] h-[170px] md:h-[200px] rounded-lg relative"
            style={{
              backgroundColor: DESK.colors.monitorFrame,
              border: "1px solid rgba(244,244,245,0.04)",
              boxShadow: `0 0 40px ${DESK.colors.screenGlow}, inset 0 0 20px ${DESK.colors.screenGlow}`,
            }}
          >
            <div
              className="absolute inset-2 rounded"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${DESK.colors.screenGlow} 0%, transparent 70%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Layer 3: Desk plane (bottom half) ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${DESK.colors.deskSurface} 25%, ${DESK.colors.deskSurface} 100%)`,
          transform: `translate(
            calc(var(--mx) * ${px.deskPlane}px),
            calc(var(--my) * ${px.deskPlane * 0.4}px)
          )`,
          willChange: "transform",
        }}
      />

      {/* ── Layer 4: Desk foreground edge (peripheral — bottom) ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[18%] pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${DESK.colors.fgEdge} 0%, transparent 100%)`,
          opacity: `calc(${pr.fgBaseOpacity} + var(--bottom-edge) * ${pr.fgRevealOpacity - pr.fgBaseOpacity})`,
          transform: `translate(
            calc(var(--mx) * ${px.foreground}px),
            calc(var(--my) * ${px.foreground * 0.3}px)
          )`,
          willChange: "transform, opacity",
        }}
      />

      {/* ── Layer 5: PC tower glow (peripheral — right) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "2%",
          top: "25%",
          width: "120px",
          height: "280px",
          borderRadius: "8px",
          background: `linear-gradient(to bottom, rgba(35,38,48,0.7) 0%, rgba(28,30,36,0.8) 100%)`,
          border: "1px solid rgba(244,244,245,0.03)",
          opacity: `calc(${pr.pcBaseOpacity} + var(--right-edge) * ${pr.pcRevealOpacity - pr.pcBaseOpacity})`,
          transform: `translate(
            calc(var(--mx) * ${px.pcTower}px),
            calc(var(--my) * ${px.pcTower * 0.5}px)
          )`,
          willChange: "transform, opacity",
        }}
      >
        {/* PC accent glow strip */}
        <div
          className="absolute left-2 top-[15%] w-[3px] h-[40%] rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${DESK.colors.pcGlow} 0%, transparent 100%)`,
            boxShadow: `0 0 12px ${DESK.colors.pcGlow}`,
            opacity: `calc(0.3 + var(--right-edge) * 0.7)`,
          }}
        />
        {/* Power LED */}
        <div
          className="absolute left-3 bottom-4 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: "var(--v2-accent-primary)",
            boxShadow: `0 0 6px var(--v2-accent-glow-strong)`,
            opacity: `calc(0.2 + var(--right-edge) * 0.8)`,
          }}
        />
      </div>

      {/* ── Layer 6: DOM overlay UI cards ── */}
      <div
        className="relative z-[2] h-screen min-h-[650px] flex items-center justify-center w-full max-w-[1100px] mx-auto px-6 md:px-12"
        style={{
          transform: `translate(
            calc(var(--mx) * ${px.ui}px),
            calc(var(--my) * ${px.ui}px)
          )`,
          willChange: "transform",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
          {/* Projects panel */}
          <MonitorPanel title="Projects" visible={uiVisible}>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start justify-between gap-3 p-3 -mx-3 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p
                      className="font-body text-sm font-medium truncate"
                      style={{ color: "var(--v2-text-primary)" }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="font-body text-[13px] mt-0.5 line-clamp-1"
                      style={{ color: "var(--v2-text-muted)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-[10px] font-body font-medium tracking-wider uppercase px-2 py-0.5 rounded-full mt-0.5"
                    style={{
                      color: "var(--v2-accent-primary)",
                      backgroundColor: "var(--v2-accent-glow)",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
          </MonitorPanel>

          {/* Skills panel */}
          <MonitorPanel title="Skills" visible={uiVisible}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {SKILLS.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--v2-text-muted)" }}
                  />
                  <span
                    className="font-body text-[13px]"
                    style={{ color: "var(--v2-text-secondary)" }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </MonitorPanel>
        </div>
      </div>

      {/* ── Fade-in overlay (black → transparent on entry) ── */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundColor: DESK.colors.bg,
          opacity: prefersReduced || hasEntered ? 0 : 1,
          transition: prefersReduced
            ? "none"
            : `opacity ${DESK.fadeDuration}ms ease-out`,
        }}
      />
    </section>
  );
}
