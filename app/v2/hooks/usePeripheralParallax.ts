"use client";
import { useEffect, useRef, useCallback } from "react";

/* ─── TUNING ─── */
const LERP_SPEED = 0.08; // smoothing factor (0 = frozen, 1 = instant)

/** Edge proximity thresholds: proximity ramps from 0→1 when mouse
 *  crosses from `start` toward the edge. */
const EDGE = {
  right: { start: 0.7 },   // x > 0.7 → ramp 0→1
  bottom: { start: 0.7 },  // y > 0.7 → ramp 0→1
  left: { start: 0.3 },    // x < 0.3 → ramp 0→1
} as const;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Peripheral parallax engine.
 *
 * Writes CSS custom properties directly on `containerRef.current` every frame:
 *   --mx, --my           normalized mouse (-1…1), smoothed
 *   --right-edge         0…1  proximity to right edge
 *   --bottom-edge        0…1  proximity to bottom edge
 *   --left-edge          0…1  proximity to left edge
 *
 * Returns `containerRef` — attach it to the outermost section element.
 */
export function usePeripheralParallax() {
  const containerRef = useRef<HTMLElement | null>(null);

  // Raw target (set by pointermove)
  const target = useRef({ x: 0, y: 0 });
  // Smoothed current
  const current = useRef({ x: 0, y: 0 });
  // Edge proximities (smoothed)
  const edges = useRef({ right: 0, bottom: 0, left: 0 });
  const edgeTargets = useRef({ right: 0, bottom: 0, left: 0 });

  const rafId = useRef<number>(0);
  const enabled = useRef(true);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // 0…1 within the container
    const nx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const ny = clamp((e.clientY - rect.top) / rect.height, 0, 1);

    // Normalized -1…1
    target.current.x = nx * 2 - 1;
    target.current.y = ny * 2 - 1;

    // Edge proximity targets (raw, 0…1)
    edgeTargets.current.right = clamp(
      (nx - EDGE.right.start) / (1 - EDGE.right.start),
      0,
      1,
    );
    edgeTargets.current.bottom = clamp(
      (ny - EDGE.bottom.start) / (1 - EDGE.bottom.start),
      0,
      1,
    );
    edgeTargets.current.left = clamp(
      (1 - nx / EDGE.left.start),
      0,
      1,
    );
    // Fix: if nx >= start, left proximity should be 0
    if (nx >= EDGE.left.start) edgeTargets.current.left = 0;
  }, []);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      enabled.current = false;
      // Set neutral CSS vars
      const el = containerRef.current;
      if (el) {
        el.style.setProperty("--mx", "0");
        el.style.setProperty("--my", "0");
        el.style.setProperty("--right-edge", "0");
        el.style.setProperty("--bottom-edge", "0");
        el.style.setProperty("--left-edge", "0");
      }
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("pointermove", onPointerMove);

    const tick = () => {
      // Lerp position
      current.current.x = lerp(current.current.x, target.current.x, LERP_SPEED);
      current.current.y = lerp(current.current.y, target.current.y, LERP_SPEED);

      // Lerp edges
      edges.current.right = lerp(
        edges.current.right,
        edgeTargets.current.right,
        LERP_SPEED,
      );
      edges.current.bottom = lerp(
        edges.current.bottom,
        edgeTargets.current.bottom,
        LERP_SPEED,
      );
      edges.current.left = lerp(
        edges.current.left,
        edgeTargets.current.left,
        LERP_SPEED,
      );

      // Write CSS custom properties (no React re-renders)
      el.style.setProperty("--mx", current.current.x.toFixed(4));
      el.style.setProperty("--my", current.current.y.toFixed(4));
      el.style.setProperty("--right-edge", edges.current.right.toFixed(4));
      el.style.setProperty("--bottom-edge", edges.current.bottom.toFixed(4));
      el.style.setProperty("--left-edge", edges.current.left.toFixed(4));

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [onPointerMove]);

  return containerRef;
}
