import Link from 'next/link';
import { useState } from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { BsFillMoonFill, BsSun } from 'react-icons/bs';

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navBg = darkMode ? 'var(--color-gradient-dark)' : '#fff';
  const navText = darkMode ? 'var(--color-text-dark)' : '#222';
  const borderColor = darkMode ? 'rgba(255,255,255,0.08)' : '#e5e7eb';

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{ background: 'transparent', color: navText }}
    >
      <div className="w-full max-w-[1500px] mx-auto bg-[var(--color-gradient-dark)] border-b-2 border-[rgba(255,255,255,0.18)] shadow-lg rounded-b-2xl md:rounded-b-2xl px-0 md:px-4 transition-all duration-300"
        style={{ background: navBg, color: navText, borderBottom: `2px solid rgba(255,255,255,0.18)` }}
      >
        <nav
          className="w-full flex items-center justify-between px-4 py-2 md:px-8 md:py-3"
          aria-label="Main navigation"
        >
          <div className="w-full flex items-center justify-between">
            {/* Logo/Name */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
              style={{ color: navText }}
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight">Salil&apos;s Portfolio</span>
            </Link>
            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-8 ml-8" role="menubar">
              {navigationLinks.map((link) => (
                <li key={link.name} role="none">
                  <Link
                    href={link.href}
                    className={`rounded px-4 py-2 text-base font-medium transition-colors duration-200 ${darkMode ? 'hover:bg-purple-500 focus:bg-purple-600' : 'hover:bg-purple-100 focus:bg-purple-200'} hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-purple-400`}
                    role="menuitem"
                    tabIndex={0}
                    style={{ color: navText }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Right-side utilities: Dark Mode toggle and Social Icons */}
            <div className="hidden md:flex items-center gap-4 ml-8">
              <button
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600 focus:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:bg-purple-200'}`}
              >
                {darkMode ? <BsSun className="w-5 h-5" /> : <BsFillMoonFill className="w-5 h-5" />}
                <span className="hidden sm:inline">Dark Mode</span>
              </button>
              <Link href="https://github.com/SalilMonga" target="_blank" aria-label="GitHub">
                <AiFillGithub className={`w-6 h-6 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
              </Link>
              <Link href="https://www.linkedin.com/in/salil-monga/" target="_blank" aria-label="LinkedIn">
                <AiFillLinkedin className={`w-6 h-6 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
              </Link>
              <a href="mailto:monga.monga43@gmail.com" target="_blank" aria-label="Email">
                <AiFillMail className={`w-6 h-6 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
              </a>
            </div>
          </div>
          {/* Mobile Nav Button */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded border-gray-400 hover:text-purple-500 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            style={{ color: navText }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
          {/* Mobile Nav Menu */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMenuOpen(false)} />
          )}
          {menuOpen && (
            <div className="absolute left-0 right-0 top-16 w-full rounded-b-2xl shadow-lg md:hidden flex flex-col gap-2 p-6 px-4 z-50" style={{ background: navBg, color: navText }}>
              <ul className="flex flex-col gap-4" role="menubar">
                {navigationLinks.map((link) => (
                  <li key={link.name} role="none">
                    <Link
                      href={link.href}
                      className={`block rounded px-4 py-3 text-lg font-medium transition-colors duration-200 text-center ${darkMode ? 'hover:bg-purple-500 focus:bg-purple-600' : 'hover:bg-purple-100 focus:bg-purple-200'} hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-purple-400`}
                      role="menuitem"
                      tabIndex={0}
                      style={{ color: navText }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center gap-6 mt-6 w-full">
                <Link href="https://github.com/SalilMonga" target="_blank" aria-label="GitHub" onClick={() => setMenuOpen(false)}>
                  <AiFillGithub className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </Link>
                <Link href="https://www.linkedin.com/in/salil-monga/" target="_blank" aria-label="LinkedIn" onClick={() => setMenuOpen(false)}>
                  <AiFillLinkedin className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </Link>
                <a href="mailto:monga.monga43@gmail.com" target="_blank" aria-label="Email" onClick={() => setMenuOpen(false)}>
                  <AiFillMail className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
} 