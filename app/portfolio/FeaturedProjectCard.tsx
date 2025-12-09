import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaInstagram } from 'react-icons/fa';

interface FeaturedProjectCardProps {
  title: string;
  tagline: string;
  description: string;
  role: string;
  impact: string[];
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    appStore?: string;
    instagram?: string;
  };
  imagePlaceholder?: string;
  ongoing?: boolean;
}

export default function FeaturedProjectCard({
  title,
  tagline,
  description,
  role,
  impact,
  techStack,
  links,
  imagePlaceholder,
  ongoing = false,
}: FeaturedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations (mobile & desktop)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Mouse tracking for spotlight effect (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Check if there are any links
  const hasLinks = links.github || links.demo || links.appStore || links.instagram;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-2xl hover:scale-[1.02]`}
      style={{
        transitionDelay: isVisible ? '0ms' : '0ms',
      }}
    >
      {/* Spotlight effect overlay (desktop only) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
            : 'none',
        }}
      />

      {/* Pulsing glow border (mobile only) */}
      <div className="absolute inset-0 rounded-xl md:hidden animate-pulse-glow pointer-events-none">
        <div className="absolute inset-0 rounded-xl border-2 border-purple-500/30" />
      </div>
      {/* Image/Placeholder Section with animated gradient */}
      <div className={`w-full h-64 ${imagePlaceholder || 'bg-gradient-to-br from-purple-500 to-cyan-500'} flex items-center justify-center relative animate-gradient-shift bg-[length:200%_200%]`}>
        {ongoing && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Ongoing
          </div>
        )}
        <div className="text-white text-center px-6">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90">{tagline}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Role Badge */}
        <div className="mb-4">
          <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
            {role}
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Impact Bullets */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-2">Key Impact:</h4>
          <ul className="space-y-2">
            {impact.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <FaCheckCircle className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 px-3 py-1 rounded-md text-xs font-medium text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={'flex flex-wrap gap-3 mt-4'}>
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors text-sm font-medium"
            >
              <FaGithub />
              GitHub
            </Link>
          )}
          {links.demo && (
            <Link
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
            >
              <FaExternalLinkAlt />
              Live Demo
            </Link>
          )}
          {links.appStore && (
            <Link
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <FaExternalLinkAlt />
              App Store
            </Link>
          )}
          {links.instagram && (
            <Link
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all text-sm font-medium"
            >
              <FaInstagram />
              Instagram
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
