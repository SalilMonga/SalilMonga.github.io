"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport.
 * @param threshold  Fraction visible before triggering (0–1). Default 0.15.
 * @param rootMargin IntersectionObserver rootMargin. Default "0px".
 */
export function useInViewOnce(
  threshold = 0.15,
  rootMargin = "0px",
) {
  const ref = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEntered, threshold, rootMargin]);

  return { ref, hasEntered };
}
