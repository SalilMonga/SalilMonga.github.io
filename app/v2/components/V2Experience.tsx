"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { V2Nav } from "./V2Nav";
import { V2Hero } from "./V2Hero";

gsap.registerPlugin(ScrollTrigger);

export function V2Experience() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);

    // Set up scroll snapping between sections
    // Will expand as more sections are added
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative">
      <V2Nav />
      <V2Hero />
      {/* Phase 2: <V2Desk /> */}
      {/* Phase 3: Contact section */}
    </div>
  );
}
