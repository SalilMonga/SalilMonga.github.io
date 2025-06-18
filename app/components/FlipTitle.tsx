import { useEffect, useRef } from "react";
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
  const indexRef = useRef(0);

  const triggerFlip = () => {
    const newIndex = (indexRef.current + 1) % words.length;

    if (!topRef.current || !bottomRef.current) return;


    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(topRef.current, { rotateX: 0 });
        gsap.set(bottomRef.current, { opacity: 0 });

        indexRef.current = newIndex;
      },
    });

    // tl.set(bottomRef.current, { opacity: 1 }); // Make bottom visible just before flip

    tl.to(topRef.current, {
      rotateX: -90,
      duration: 0.3,
      ease: "power1.in",
      transformOrigin: "bottom center",
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
  }, []);



  return (
    <div className="relative inline-block h-[60px] cursor-pointer" onClick={triggerFlip}>
      <div className="relative w-fit h-[60px] grid place-items-center"
        style={{ perspective: "1000px", minWidth: "max-content" }}>
        {/* Top Half - rotates down */}
        <div
          ref={topRef}
          className="inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold font-mono tracking-wide uppercase z-10"
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "bottom center",
          }}
        >
          {/* Current Word */}
          {(() => {
            const [first, second] = words[indexRef.current].split(" ");
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
            opacity: 0, // Start hidden
            pointerEvents: "none",
          }}
        >
          {/* Next Word */}
          {(() => {
            const [first, second] = words[indexRef.current].split(" ");
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