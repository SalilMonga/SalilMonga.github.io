"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Bounded } from "./components/Bounded";
import { Shapes } from "./shapes/Shapes";
import { NavButton } from "./navButton/navButton";
import Link from "next/link";

export default function Home() {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: { each: 0.1, from: "random" },
        },
      ).fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => {
      return (
        <span
          key={index}
          className={`name-animation name-animation-${key}-index inline-block opacity-0`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <div className="dark" style={{ minHeight: '100vh', background: 'var(--color-gradient-dark)', color: 'var(--color-text-dark)' }}>
      <Bounded ref={component}>
        <div className="ml-8 flex min-h-[70vh] flex-col-reverse content-center items-center md:flex-row">
          <div className="group w-full sm:w-1/2">
            <div className="block md:hidden">
              <NavButton />
            </div>
            <h2
              className="mb-4 font-bold leading-none tracking-tighter md:mb-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              aria-label="Salil Monga"
            >
              <Link href="/Portfolio" className="group inline-block">
                <span
                  className="block text-slate-100 transition-colors duration-200 group-hover:text-yellow-400"
                >
                  {renderLetters("Salil", "first")}
                </span>
                <span
                  className="-mt-[.2em] block text-slate-400 transition-colors duration-200 group-hover:text-purple-400"
                >
                  {renderLetters("Monga", "last")}
                </span>
              </Link>
            </h2>
            <span className="job-title block text-2xl font-bold uppercase tracking-[.2em] opacity-100 sm:text-4xl" style={{ color: '#eab308' }}>
              Full-stack developer
            </span>
          </div>
          <div className="sm:w-1/2">
            <Shapes />
          </div>
        </div>
      </Bounded>
    </div>
  );
}
