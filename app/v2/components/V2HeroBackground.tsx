"use client";

export function V2HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient — very subtle tonal shift, no hard stops */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #18181B 0%, #1c1f25 25%, #1e2028 50%, #1b1d22 75%, #18181B 100%)",
        }}
      />

      {/* Slow shifting gradient overlay — wide feather, no visible edge */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 65% 45%, var(--v2-accent-glow) 0%, var(--v2-accent-glow) 15%, transparent 80%)",
          filter: "blur(40px)",
          animation: "v2-glow-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Vignette — much wider feather so edge is invisible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Film grain / noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
