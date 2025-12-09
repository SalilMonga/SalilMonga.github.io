import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import animationImg from '../../public/salil-hero-image.jpg';

export default function HeroSection() {
  return (
    <section id="about" className="w-full flex flex-col md:flex-row items-center justify-center min-h-[40vh] gap-20 px-4 py-2">
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
          Full-Stack Engineer · XR Developer · Builder of 0→1 Products
        </h2>
        <p className="text-base md:text-lg text-neutral-700 dark:text-gray-300 mb-4">
          I design and ship real products—from social apps used on campus to VR training systems for industrial robots. I care about thoughtful UX, reliable systems, and getting things into people&apos;s hands quickly.
        </p>
        <p className="text-sm text-neutral-600 dark:text-gray-400 mb-6 italic">
          Currently exploring roles where I can build, experiment, and own end-to-end features.
        </p>
        <a href="/salil-monga-resume.pdf" target="_blank" rel="noopener noreferrer">
          <button className="px-8 py-3 rounded-full bg-purple-500 text-white font-bold text-lg shadow hover:bg-purple-600 transition-colors">
            Download Resume
          </button>
        </a>
      </div>
    </section>
  );
}