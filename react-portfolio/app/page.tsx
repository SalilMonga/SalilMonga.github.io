"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Bounded } from "../src/component/Bounded";
import { Shapes } from "./shapes/Shapes";

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
        }
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
        }
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
    <Bounded ref={component}>
      <div className="grid min-h-[70vh] grid-cols-1 items-center">
        <Shapes />
        <div className="col-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label="Salil Monga"
          >
            <a href="/aboutMe">
              <span className="block text-slate-300">
                {renderLetters("Salil", "first")}
              </span>
              <span className="-mt-[.2em] block text-slate-500">
                {renderLetters("Monga", "last")}
              </span>
            </a>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-100 sm:text-4xl">
            Full-stack developer
          </span>
        </div>
      </div>
    </Bounded>
  );
}

// <ul className="flex items-center ">
//   <li>
//     <a href="/contact" className="resumeButton">
//       Contact Page
//     </a>
//   </li>
//   <li>
//     <a className="resumeButton" href="/aboutMe">
//       About Me
//     </a>
//   </li>
// </ul>
