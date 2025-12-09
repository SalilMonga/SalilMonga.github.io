import Link from 'next/link';
import { useState } from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { BsFillMoonFill, BsSun } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#featured-projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({
  darkMode,
  toggleDarkMode,
  animationStyle,
  setAnimationStyle,
  isCompact = false
}: {
  darkMode: boolean,
  toggleDarkMode: () => void,
  animationStyle: string,
  setAnimationStyle: (style: string) => void,
  isCompact?: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animationMenuOpen, setAnimationMenuOpen] = useState(false);
  const [socialMenuOpen, setSocialMenuOpen] = useState(false);

  const navBg = darkMode ? 'rgba(30,30,30,0.95)' : '#fff';
  const navText = darkMode ? 'var(--color-text-dark)' : '#222';

  return (
    <header
      className="w-full fixed top-0 z-50 flex justify-center"
      style={{ background: 'transparent', color: navText }}
    >
      <div
        className={`bg-[var(--color-gradient-dark)] border-[rgba(255,255,255,0.18)] shadow-lg px-0 md:px-4`}
        style={{
          background: navBg,
          color: navText,
          maxWidth: isCompact ? '800px' : '1500px',
          width: isCompact ? 'auto' : '100%',
          borderRadius: isCompact ? '9999px' : '0 0 1rem 1rem',
          borderWidth: isCompact ? '1px' : '0 0 2px 0',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.18)',
          marginTop: isCompact ? '1.5rem' : '0',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <nav
          className="w-full flex items-center justify-between px-4 py-2 md:px-8"
          style={{
            paddingTop: isCompact ? '0.5rem' : '0.75rem',
            paddingBottom: isCompact ? '0.5rem' : '0.75rem',
            transition: 'padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label="Main navigation"
        >
          <div className="w-full flex items-center justify-between">
            {/* Logo/Name - Hide text in compact mode */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
              style={{ color: navText }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span
                className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
                style={{
                  maxWidth: isCompact ? '0' : '300px',
                  opacity: isCompact ? 0 : 1,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                Salil&apos;s Portfolio
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-2 ml-4" role="menubar" style={{
              gap: isCompact ? '0.5rem' : '2rem',
              transition: 'gap 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              {navigationLinks.map((link) => (
                <li key={link.name} role="none">
                  <Link
                    href={link.href}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${darkMode ? 'hover:bg-purple-500 focus:bg-purple-600' : 'hover:bg-purple-100 focus:bg-purple-200'} hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-purple-400`}
                    role="menuitem"
                    tabIndex={0}
                    style={{ color: navText }}
                    onClick={(e) => {
                      if (link.name === 'About') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right-side utilities */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              <a
                href="/salil-monga-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600 focus:bg-neutral-600' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:bg-neutral-300'}`}
              >
                Resume
              </a>
              <button
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`flex items-center justify-center w-8 h-8 rounded-full font-medium transition-colors duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600 focus:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus:bg-purple-200'}`}
              >
                {darkMode ? <BsSun className="w-4 h-4" /> : <BsFillMoonFill className="w-4 h-4" />}
              </button>

              {/* Animation Style Menu - Hide in compact mode */}
              <div
                className="relative"
                style={{
                  maxWidth: isCompact ? '0' : '100px',
                  opacity: isCompact ? 0 : 1,
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <button
                  onClick={() => setAnimationMenuOpen(!animationMenuOpen)}
                  aria-label="Change animation style"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600 focus:bg-neutral-600' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:bg-neutral-300'}`}
                >
                  <BsThreeDots className="w-4 h-4" />
                </button>

                {animationMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAnimationMenuOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl z-50 p-2 ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
                      <div className="text-xs font-semibold px-3 py-2 text-gray-500 dark:text-gray-400">
                        Background Animation
                      </div>
                      <button
                        onClick={() => {
                          setAnimationStyle('gears');
                          setAnimationMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${animationStyle === 'gears' ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800') : (darkMode ? 'hover:bg-neutral-700 text-white' : 'hover:bg-gray-100 text-gray-800')}`}
                      >
                        <div className="font-medium">Floating Gears</div>
                        <div className="text-xs opacity-70">Fun & Mechanical</div>
                      </button>
                      <button
                        onClick={() => {
                          setAnimationStyle('blueprint');
                          setAnimationMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${animationStyle === 'blueprint' ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800') : (darkMode ? 'hover:bg-neutral-700 text-white' : 'hover:bg-gray-100 text-gray-800')}`}
                      >
                        <div className="font-medium">Blueprint Grid</div>
                        <div className="text-xs opacity-70">Professional & Technical</div>
                      </button>
                      <button
                        onClick={() => {
                          setAnimationStyle('none');
                          setAnimationMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${animationStyle === 'none' ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800') : (darkMode ? 'hover:bg-neutral-700 text-white' : 'hover:bg-gray-100 text-gray-800')}`}
                      >
                        <div className="font-medium">No Animation</div>
                        <div className="text-xs opacity-70">Clean & Minimal</div>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Social Icons - Hide in compact mode, replace with menu */}
              <div
                style={{
                  maxWidth: isCompact ? '0' : '200px',
                  opacity: isCompact ? 0 : 1,
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <Link href="https://github.com/SalilMonga" target="_blank" aria-label="GitHub">
                  <AiFillGithub className={`w-5 h-5 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </Link>
                <Link href="https://www.linkedin.com/in/salil-monga/" target="_blank" aria-label="LinkedIn">
                  <AiFillLinkedin className={`w-5 h-5 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </Link>
                <a href="mailto:monga.monga43@gmail.com" target="_blank" aria-label="Email">
                  <AiFillMail className={`w-5 h-5 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                </a>
              </div>

              {/* Social menu in compact mode */}
              <div
                className="relative"
                style={{
                  maxWidth: isCompact ? '100px' : '0',
                  opacity: isCompact ? 1 : 0,
                  overflow: 'visible',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <button
                  onClick={() => setSocialMenuOpen(!socialMenuOpen)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${darkMode ? 'bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500' : 'bg-purple-500 text-white hover:bg-purple-400 focus:bg-purple-400'}`}
                  aria-haspopup="true"
                  aria-expanded={socialMenuOpen}
                >
                  <BsThreeDots />
                </button>
                {socialMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSocialMenuOpen(false)} />
                    <div
                      className={`absolute mt-2 rounded-lg p-4 shadow-lg border z-50 flex gap-6 justify-center ${darkMode ? 'bg-[rgba(30,30,30,0.98)] border-purple-200' : 'bg-white border-purple-300'}`}
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                      role="menu"
                    >
                      <Link href="https://github.com/SalilMonga" target="_blank" aria-label="GitHub" onClick={() => setSocialMenuOpen(false)}>
                        <AiFillGithub className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                      </Link>
                      <Link href="https://www.linkedin.com/in/salil-monga/" target="_blank" aria-label="LinkedIn" onClick={() => setSocialMenuOpen(false)}>
                        <AiFillLinkedin className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                      </Link>
                      <a href="mailto:monga.monga43@gmail.com" target="_blank" aria-label="Email" onClick={() => setSocialMenuOpen(false)}>
                        <AiFillMail className={`w-7 h-7 transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                      </a>
                    </div>
                  </>
                )}
              </div>
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
                      onClick={(e) => {
                        if (link.name === 'About') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        setMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="/salil-monga-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={`block rounded px-4 py-3 text-lg font-bold text-center transition-colors duration-200 ${darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}
              >
                Download Resume
              </a>
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
