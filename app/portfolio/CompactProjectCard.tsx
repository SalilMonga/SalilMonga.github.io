import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaInstagram, FaPuzzlePiece } from 'react-icons/fa';

interface CompactProjectCardProps {
  title: string;
  tagline: string;
  description: string;
  role: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    appStore?: string;
    instagram?: string;
    marketplace?: string;
  };
  ongoing?: boolean;
}

export default function CompactProjectCard({
  title,
  tagline,
  role,
  techStack,
  links,
  ongoing = false,
}: CompactProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const node = cardRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-xl hover:scale-[1.01]`}
    >
      {/* Spotlight effect overlay (desktop only) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
            : 'none',
        }}
      />

      <div className="p-5">
        {/* Header row: title + role + ongoing */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {title}
              {ongoing && (
                <span className="text-xs text-yellow-600 dark:text-yellow-300 font-bold ml-2">(Ongoing)</span>
              )}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{tagline}</p>
          </div>
          <span className="shrink-0 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            {role}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 px-2 py-0.5 rounded text-[11px] font-medium text-neutral-600 dark:text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors text-xs font-medium"
            >
              <FaGithub size={12} />
              GitHub
            </Link>
          )}
          {links.demo && (
            <Link
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs font-medium"
            >
              <FaExternalLinkAlt size={10} />
              Demo
            </Link>
          )}
          {links.appStore && (
            <Link
              href={links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
            >
              <FaExternalLinkAlt size={10} />
              App Store
            </Link>
          )}
          {links.instagram && (
            <Link
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all text-xs font-medium"
            >
              <FaInstagram size={12} />
              Instagram
            </Link>
          )}
          {links.marketplace && (
            <Link
              href={links.marketplace}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs font-medium"
            >
              <FaPuzzlePiece size={12} />
              Marketplace
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
