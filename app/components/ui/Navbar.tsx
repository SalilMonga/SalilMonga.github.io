import Link from 'next/link';
import { useState } from 'react';

const navigationLinks = [
  { name: 'About', href: '/Portfolio#about' },
  { name: 'Projects', href: '/Portfolio#projects' },
  { name: 'Skills', href: '/Portfolio#skills' },
  { name: 'Contact', href: '/Portfolio#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full shadow-md sticky top-0 z-50"
      style={{ background: 'var(--color-gradient-dark)', color: 'var(--color-text-dark)' }}
    >
      <nav
        className="w-full flex items-center justify-between px-8 py-3"
        aria-label="Main navigation"
      >
        {/* Logo/Name */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          style={{ color: 'var(--color-text-dark)' }}
        >
          <span className="text-2xl font-bold tracking-tight">Salil Monga</span>
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8" role="menubar">
          {navigationLinks.map((link) => (
            <li key={link.name} role="none">
              <Link
                href={link.href}
                className="rounded px-4 py-2 text-base font-medium transition-colors duration-200 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                role="menuitem"
                tabIndex={0}
                style={{ color: 'var(--color-text-dark)' }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Nav Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded border-gray-400 hover:text-yellow-400 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          style={{ color: 'var(--color-text-dark)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
        {/* Mobile Nav Menu */}
        {menuOpen && (
          <ul className="absolute right-4 top-16 w-48 rounded shadow-lg md:hidden flex flex-col gap-2 p-4 z-50"
            style={{ background: 'var(--color-gradient-dark)', color: 'var(--color-text-dark)' }}
            role="menubar"
          >
            {navigationLinks.map((link) => (
              <li key={link.name} role="none">
                <Link
                  href={link.href}
                  className="block rounded px-4 py-2 text-base font-medium transition-colors duration-200 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  role="menuitem"
                  tabIndex={0}
                  style={{ color: 'var(--color-text-dark)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
} 