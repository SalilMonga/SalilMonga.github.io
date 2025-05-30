import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import animationImg from '../../public/salil-hero-image.jpg';

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center min-h-[40vh] gap-20 px-4 py-2">
      {/* Left: Animated Image */}
      <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg w-64 h-64 md:w-80 md:h-80 bg-black/10 transition-transform duration-500 hover:scale-105 animate-float">
        <Image
          src={animationImg}
          alt="Salil Monga profile"
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {/* Right: Text Block */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
        <Link href="/" className="group">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Salil Monga
          </h1>
          <span className="block text-sm text-neutral-500 dark:text-gray-400 mb-4 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors">
            Clicking on the name will take you BACK!
          </span>
        </Link>
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
          Full-Stack Developer | TypeScript | React | AWS | Agile
        </h2>
        <p className="text-base md:text-lg text-neutral-700 dark:text-gray-300 mb-6">
          Disciplined software engineer with expertise in full-stack development, AWS services, and Agile methodologies. Proven problem-solver skilled in designing scalable applications and collaborating with cross-functional teams to deliver high-quality software solutions.
        </p>
        <Link href="#projects">
          <button className="px-8 py-3 rounded-full bg-purple-500 text-white font-bold text-lg shadow hover:bg-purple-600 transition-colors">
            View Projects
          </button>
        </Link>
      </div>
    </section>
  );
}

// Add this to your global CSS or Tailwind config:
// .animate-float {
//   animation: float 3s ease-in-out infinite;
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-12px); }
// } 