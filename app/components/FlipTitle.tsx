import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const titles = [
  "Software Developer",
  "Debug Magician",
  "Code Whisperer",
  "Realtime Tinkerer",
  "Fullstack Explorer",
  "Frontend Mechanic",
  "Backend Wrangler",
  "XR Researcher",
  "Immersive Engineer",
  "Logic Crafter",
  "Performance Tweaker",
  "UI Engineer",
];

function FlipUnit({ words, delay = 0 }: { words: string[], delay?: number }) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // For layout: render the current word invisibly to reserve space
  const [layoutFirst, layoutSecond] = words[index].split(" ");
  const nextIndex = (index + 1) % words.length;

  const triggerFlip = () => {
    if (isFlipping || !topRef.current || !bottomRef.current) return;
    setIsFlipping(true);

    // Show the bottom word just before the flip
    gsap.set(bottomRef.current, { opacity: 1 });

    gsap.to(topRef.current, {
      rotateX: -90,
      duration: 0.3,
      ease: "power1.in",
      transformOrigin: "bottom center",
      onComplete: () => {
        // Reset top, hide bottom, update index
        gsap.set(topRef.current, { rotateX: 0 });
        gsap.set(bottomRef.current, { opacity: 0 });
        setIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      },
    });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      triggerFlip();
      intervalId = setInterval(triggerFlip, 6000);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return (
    <div className="relative inline-block h-[60px] cursor-pointer" onClick={triggerFlip}>
      {/* Invisible word for layout, statically positioned */}
      <div
        aria-hidden="true"
        style={{ visibility: "hidden", pointerEvents: "none", height: 0 }}
        className="text-3xl md:text-5xl font-bold font-mono tracking-wide uppercase"
      >
        <span>{layoutFirst + ' '}</span>
        <span>{layoutSecond}</span>
      </div>
      {/* Animated stack: absolutely positioned top and bottom words */}
      <div className="absolute left-0 top-0 w-full h-full grid place-items-center"
        style={{ perspective: "1000px", minWidth: "max-content" }}>
        {/* Top Half - rotates down */}
        <div
          ref={topRef}
          className="inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold font-mono tracking-wide uppercase z-10"
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "bottom center",
            position: "absolute",
            width: "100%",
          }}
        >
          {/* Current Word */}
          {(() => {
            const [first, second] = words[index].split(" ");
            return (
              <div className="inline-flex gap-x-2">
                <span className="text-slate-100 transition-colors duration-200 group-hover:text-yellow-400">{first + ' '}</span>
                <span className="text-slate-400 transition-colors duration-200 group-hover:text-purple-400">{second}</span>
              </div>
            );
          })()}
        </div>
        {/* Bottom Half - shows next word behind the flip */}
        <div
          ref={bottomRef}
          className="inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold font-mono tracking-wide uppercase"
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "top center",
            transform: "rotateX(90deg)",
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
            width: "100%",
          }}
        >
          {/* Next Word */}
          {(() => {
            const [first, second] = words[nextIndex].split(" ");
            return (
              <div className="inline-flex gap-x-2">
                <span className="text-slate-100 transition-colors duration-200 group-hover:text-yellow-400">{first + ' '}</span>
                <span className="text-slate-400 transition-colors duration-200 group-hover:text-purple-400">{second}</span>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default function FlipTitle() {
  return (
    <div className="group">
      <FlipUnit words={titles} delay={4000} />
    </div>
  );
}