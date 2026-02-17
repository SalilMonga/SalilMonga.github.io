"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { V2HeroBackground } from "./V2HeroBackground";

gsap.registerPlugin(ScrollTrigger);

/* ─── MOTION CONSTANTS — tweak amplitudes & speeds here ─── */
const MOTION = {
  // Intro timeline
  intro: {
    delay: 0.15,
    duration: 1.4,
    ease: "power3.out",
    stagger: 0.08,
  },
  // Mouse parallax amplitudes (px)
  parallax: {
    portrait: { x: 10, y: 4, rotate: 0.4 },    // low Y + rotation keeps grounded
    bgText: { x: 4, y: 3 },
    glow: { x: 22, y: 16 },                     // env moves more than subject
    halo: { smoothing: 0.08 },
  },
  // Ambient loops
  ambient: {
    glowDrift: { x: 18, y: 12, duration: 24 },  // wider drift than portrait
    vignettePulse: { min: 0.2, max: 0.3, duration: 12 },
    dustDrift: { duration: 30 },
  },
  // Portrait grounding
  ground: {
    shadowOpacity: 0.35,
    shadowBlur: "blur(20px)",
    bottomVignetteStrength: 0.4,
  },
  // Portrait scene integration
  integration: {
    occlusionOpacity: 0.25,       // ambient occlusion behind silhouette
    rimGlowColor: "rgba(107, 159, 200, 0.12)",  // muted steel-blue, matches accent
    rimGlowStrength: 0.7,         // drop-shadow multiplier feel
    featherHeight: "15%",         // bottom mask fade height
  },
} as const;

export function V2Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Refs for animated layers
  const glowRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headlineSoftwareRef = useRef<HTMLSpanElement>(null);
  const headlineEngineerRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  // Mouse position tracking
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseTarget.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5),
      y: ((e.clientY - rect.top) / rect.height - 0.5),
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /* ═══════════════════════════════════════
         1) INTRO TIMELINE
         ═══════════════════════════════════════ */
      const tl = gsap.timeline({ delay: MOTION.intro.delay });

      if (prefersReduced) {
        // Simple fade for reduced motion
        tl.fromTo(
          [
            glowRef.current,
            nameRef.current,
            headlineSoftwareRef.current,
            headlineEngineerRef.current,
            copyRef.current,
            ctaRef.current,
            socialsRef.current,
            portraitRef.current,
            bgTextRef.current,
          ],
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.05 },
        );
        // Fix bg text to final low opacity
        tl.set(bgTextRef.current, { opacity: 0.035 });
        return;
      }

      // Background glow
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      );

      // Name label
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: MOTION.intro.ease },
        "-=0.5",
      );

      // "Software" headline
      tl.fromTo(
        headlineSoftwareRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: MOTION.intro.ease },
        "-=0.35",
      );

      // "Engineer" headline (staggered)
      tl.fromTo(
        headlineEngineerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: MOTION.intro.ease },
        `-=${0.6 - MOTION.intro.stagger}`,
      );

      // Supporting copy
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: MOTION.intro.ease },
        "-=0.3",
      );

      // Buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: MOTION.intro.ease },
        "-=0.25",
      );

      // Social icons
      tl.fromTo(
        socialsRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: MOTION.intro.ease },
        "-=0.2",
      );

      // Portrait — enters early alongside the headlines
      tl.fromTo(
        portraitRef.current,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
        0.4,
      );

      // Background giant text — blur dissolve
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0.5px)",
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.8",
      );

      // Scroll indicator
      tl.fromTo(
        ".v2-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2",
      );

      /* ═══════════════════════════════════════
         2) MOUSE PARALLAX
         ═══════════════════════════════════════ */
      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mousemove", handleMouseMove);
      }

      // Smooth parallax loop via GSAP ticker
      const parallaxTick = () => {
        const s = MOTION.parallax.halo.smoothing;
        mouseCurrent.current.x +=
          (mouseTarget.current.x - mouseCurrent.current.x) * s;
        mouseCurrent.current.y +=
          (mouseTarget.current.y - mouseCurrent.current.y) * s;

        const mx = mouseCurrent.current.x;
        const my = mouseCurrent.current.y;

        // Portrait
        if (portraitRef.current) {
          gsap.set(portraitRef.current, {
            x: mx * MOTION.parallax.portrait.x,
            y: my * MOTION.parallax.portrait.y,
            rotation: mx * MOTION.parallax.portrait.rotate,
          });
        }
        // Background text
        if (bgTextRef.current) {
          gsap.set(bgTextRef.current, {
            x: mx * MOTION.parallax.bgText.x,
            y: my * MOTION.parallax.bgText.y,
          });
        }
        // Glow
        if (glowRef.current) {
          gsap.set(glowRef.current, {
            x: mx * MOTION.parallax.glow.x,
            y: my * MOTION.parallax.glow.y,
          });
        }
        // Cursor halo
        if (haloRef.current && section) {
          const rect = section.getBoundingClientRect();
          const hx = (mouseTarget.current.x + 0.5) * rect.width;
          const hy = (mouseTarget.current.y + 0.5) * rect.height;
          gsap.set(haloRef.current, { x: hx, y: hy });
        }
      };
      gsap.ticker.add(parallaxTick);

      /* ═══════════════════════════════════════
         3) AMBIENT LOOPS
         ═══════════════════════════════════════ */
      // Glow drift
      gsap.to(glowRef.current, {
        x: MOTION.ambient.glowDrift.x,
        y: MOTION.ambient.glowDrift.y,
        duration: MOTION.ambient.glowDrift.duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Vignette pulse
      gsap.fromTo(
        vignetteRef.current,
        { opacity: MOTION.ambient.vignettePulse.min },
        {
          opacity: MOTION.ambient.vignettePulse.max,
          duration: MOTION.ambient.vignettePulse.duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
      );

      // Dust / noise drift
      gsap.to(dustRef.current, {
        backgroundPosition: "100% 100%",
        duration: MOTION.ambient.dustDrift.duration,
        ease: "none",
        repeat: -1,
      });

      /* ═══════════════════════════════════════
         4) SCROLL EXIT
         ═══════════════════════════════════════ */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (sectionRef.current) {
            sectionRef.current.style.opacity = `${Math.max(0, 1 - p * 1.8)}`;
          }
        },
      });

      // Cleanup helper for mousemove + ticker
      return () => {
        section?.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(parallaxTick);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <V2HeroBackground />

      {/* ── Cursor halo ── */}
      <div
        ref={haloRef}
        className="absolute z-[1] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, var(--v2-accent-glow) 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: 0.4,
          top: 0,
          left: 0,
        }}
      />

      {/* ── Ambient glow layer ── */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <div
          className="absolute"
          style={{
            top: "20%",
            right: "10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, var(--v2-accent-glow-strong) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── CSS dust particles ── */}
      <div
        ref={dustRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.3] hidden md:block"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(244,244,245,0.15) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 70%, rgba(244,244,245,0.1) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 20%, rgba(244,244,245,0.12) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 55%, rgba(244,244,245,0.08) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 80%, rgba(244,244,245,0.1) 0%, transparent 100%)
          `,
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
        }}
      />

      {/* ── Background giant text ── */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none opacity-0"
        aria-hidden="true"
      >
        <div
          className="font-display font-bold leading-[0.82] tracking-tighter text-center w-full px-4"
          style={{
            fontSize: "clamp(4.5rem, 15vw, 16rem)",
            color: "rgba(244, 244, 245, 0.035)",
            maskImage:
              "linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 70%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 70%, transparent 95%)",
          }}
        >
          <span className="block">SOFTWARE</span>
          <span className="block">ENGINEER</span>
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-[2] h-screen min-h-[650px] w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center pt-24 md:pt-0 order-2 md:order-1">
            <p
              ref={nameRef}
              className="font-body text-[13px] tracking-[0.2em] uppercase opacity-0 mb-4"
              style={{ color: "var(--v2-text-muted)" }}
            >
              Salil Monga
            </p>

            <h1 className="font-display font-bold leading-[1.0] tracking-tight mb-5">
              <span
                ref={headlineSoftwareRef}
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-0"
                style={{ color: "var(--v2-text-primary)" }}
              >
                Software
              </span>
              <span
                ref={headlineEngineerRef}
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-0"
                style={{ color: "var(--v2-accent-primary)" }}
              >
                Engineer
              </span>
            </h1>

            <div ref={copyRef} className="opacity-0 max-w-md mb-7">
              <p
                className="font-body text-[15px] md:text-base leading-relaxed"
                style={{ color: "var(--v2-text-secondary)" }}
              >
                User-focused product builder and problem solver.
              </p>
              <p
                className="font-body text-sm mt-1 leading-relaxed"
                style={{ color: "var(--v2-text-muted)" }}
              >
                Turning complex systems into intuitive experiences.
              </p>
            </div>

            <div ref={ctaRef} className="flex items-center gap-3.5 opacity-0 mb-6">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-body text-[13px] font-semibold tracking-wide transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
                style={{
                  backgroundColor: "var(--v2-accent-primary)",
                  color: "#18181B",
                }}
              >
                View Work
              </a>
              <a
                href="/salil-monga-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-body text-[13px] font-semibold tracking-wide transition-all duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v2-text-muted)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
                style={{
                  border: "1px solid rgba(244, 244, 245, 0.1)",
                  color: "var(--v2-text-secondary)",
                }}
              >
                Resume
              </a>
            </div>

            <div ref={socialsRef} className="flex items-center gap-4 opacity-0">
              <a
                href="https://github.com/SalilMonga"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 opacity-35 hover:opacity-70"
                style={{ color: "var(--v2-text-primary)" }}
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/salilmonga"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 opacity-35 hover:opacity-70"
                style={{ color: "var(--v2-text-primary)" }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Portrait anchored to bottom */}
          <div
            ref={portraitRef}
            className="relative flex flex-col items-center justify-end order-1 md:order-2 opacity-0 pt-20 md:pt-0 pb-10 md:pb-12"
            style={{ willChange: "transform" }}
          >
            {/* Layer 0: Ambient occlusion — dark halo tight to silhouette */}
            <div
              className="absolute pointer-events-none z-[0]"
              style={{
                bottom: "14%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "55%",
                height: "55%",
                background:
                  "radial-gradient(ellipse 70% 65% at 50% 55%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 35%, transparent 70%)",
                filter: "blur(30px)",
                opacity: MOTION.integration.occlusionOpacity,
              }}
            />

            {/* Layer 1: Cool rim-light glow — muted steel-blue spill */}
            <div
              className="absolute pointer-events-none z-[0]"
              style={{
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                height: "65%",
                background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${MOTION.integration.rimGlowColor} 0%, transparent 65%)`,
                filter: "blur(25px)",
                opacity: MOTION.integration.rimGlowStrength,
              }}
            />

            {/* Layer 2: Portrait image with all-edge feather mask */}
            <div
              className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[3/4] z-[1]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 75% 70% at 50% 45%, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 70% at 50% 45%, black 50%, transparent 100%)",
              }}
            >
              <Image
                src="/headshot.png"
                alt="Salil Monga — Software Engineer"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 70vw, 400px"
                style={{
                  filter: `drop-shadow(0 0 8px ${MOTION.integration.rimGlowColor})`,
                }}
              />
            </div>

            {/* Layer 3: Floor contact shadow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-[0]"
              style={{
                bottom: "6%",
                width: "70%",
                height: "8%",
                background: `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,${MOTION.ground.shadowOpacity}) 0%, transparent 75%)`,
                filter: MOTION.ground.shadowBlur,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Cinematic vignette ── */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)",
          opacity: MOTION.ambient.vignettePulse.min,
        }}
      />

      {/* ── Lower-third atmosphere — subtle floor darkening ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-[3] pointer-events-none"
        aria-hidden="true"
        style={{
          height: "20%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
          opacity: MOTION.ground.bottomVignetteStrength,
        }}
      />

      {/* ── Scroll indicator ── */}
      <div className="v2-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3 opacity-0">
        <span
          className="text-[10px] font-body tracking-[0.25em] uppercase"
          style={{ color: "var(--v2-text-muted)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--v2-text-muted), transparent)",
            animation: "v2-scroll-bounce 2.5s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
