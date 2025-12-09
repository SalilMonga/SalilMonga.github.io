import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
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
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [settingsMenuClosing, setSettingsMenuClosing] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  const navBg = darkMode ? 'rgba(30,30,30,0.95)' : '#fff';
  const navText = darkMode ? 'var(--color-text-dark)' : '#222';

  // Handle closing animation
  const closeMenu = () => {
    setSettingsMenuClosing(true);
    setTimeout(() => {
      setSettingsMenuOpen(false);
      setSettingsMenuClosing(false);
    }, 300); // Match animation duration
  };

  // Close settings menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }
    if (settingsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [settingsMenuOpen]);

  return (
    <header
      className="w-full fixed top-0 z-50 flex justify-center"
      style={{ background: 'transparent', color: navText }}
    >
      <div
        className={`bg-[var(--color-gradient-dark)] border-[rgba(255,255,255,0.18)] shadow-lg`}
        style={{
          background: navBg,
          color: navText,
          maxWidth: isCompact ? '900px' : '1200px',
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
          className="w-full flex items-center justify-between px-4 md:px-0"
          style={{
            paddingLeft: isCompact ? '0.5rem' : '2rem',
            paddingRight: isCompact ? '0.5rem' : '2rem',
            paddingTop: isCompact ? '0.5rem' : '0.75rem',
            paddingBottom: isCompact ? '0.5rem' : '0.75rem',
            transition: 'padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label="Main navigation"
        >
          <div className="hidden md:flex w-full items-center justify-between">
            {/* Logo/Name - Show full text when not compact, initials when compact */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
              style={{ color: navText }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Full text - visible when not compact */}
              <span
                className="hidden md:block text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
                style={{
                  maxWidth: isCompact ? '0' : '300px',
                  opacity: isCompact ? 0 : 1,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                Salil&apos;s Portfolio
              </span>

              {/* Initials - visible when compact */}
              <span
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
                style={{
                  maxWidth: isCompact ? '100px' : '0',
                  opacity: isCompact ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  background: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                  color: darkMode ? 'rgb(196, 181, 253)' : 'rgb(109, 40, 217)',
                }}
              >
                SM
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-2 ml-4" role="menubar" style={{
              gap: isCompact ? '0.75rem' : '2rem',
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

            {/* Three Dots Settings Menu */}
            <div className="hidden md:block relative" ref={settingsMenuRef} style={{
              marginLeft: isCompact ? '1.5rem' : '0',
              transition: 'margin-left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              <button
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                aria-label="Open settings menu"
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
              >
                <BsThreeDots className="w-4 h-4" />
              </button>

              {settingsMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={closeMenu} />

                  {/* Dropdown Menu with Animation */}
                  <div
                    className={`absolute right-0 mt-3 w-64 rounded-xl shadow-2xl z-50 overflow-hidden ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-gray-200'}`}
                    style={{
                      animation: settingsMenuClosing
                        ? 'slideUpDesktop 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                        : 'slideDownDesktop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Resume Link */}
                    <a
                      href="/salil-monga-resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'}`}
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">Download Resume</span>
                    </a>

                    {/* Divider */}
                    <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                    {/* Dark Mode Toggle */}
                    <button
                      onClick={() => {
                        toggleDarkMode();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        {darkMode ? <BsSun className="w-5 h-5" /> : <BsFillMoonFill className="w-5 h-5" />}
                        <span className="font-medium">Dark Mode</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-purple-500' : 'bg-gray-300'} relative`}>
                        <div
                          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                          style={{
                            transform: darkMode ? 'translateX(24px)' : 'translateX(0)',
                          }}
                        />
                      </div>
                    </button>

                    {/* Divider */}
                    <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                    {/* Background Animation Section */}
                    <div className="px-4 py-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                        Background Animation
                      </div>
                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => {
                            setAnimationStyle('gears');
                          }}
                          aria-label="Floating Gears"
                          className={`transition-all ${animationStyle === 'gears' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'gears' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setAnimationStyle('blueprint');
                          }}
                          aria-label="Blueprint Grid"
                          className={`transition-all ${animationStyle === 'blueprint' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'blueprint' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setAnimationStyle('none');
                          }}
                          aria-label="No Animation"
                          className={`transition-all ${animationStyle === 'none' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'none' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                    {/* Social Links */}
                    <div className="px-4 py-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                        Connect
                      </div>
                      <div className="flex justify-center gap-6">
                        <Link
                          href="https://github.com/SalilMonga"
                          target="_blank"
                          aria-label="GitHub"
                          onClick={closeMenu}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillGithub className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                        </Link>
                        <Link
                          href="https://www.linkedin.com/in/salil-monga/"
                          target="_blank"
                          aria-label="LinkedIn"
                          onClick={closeMenu}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillLinkedin className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                        </Link>
                        <a
                          href="mailto:monga.monga43@gmail.com"
                          target="_blank"
                          aria-label="Email"
                          onClick={closeMenu}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillMail className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden w-full">
            {/* Full-width navbar on mobile when not compact */}
            {!isCompact && (
              <div className="flex items-center justify-between w-full">
                <Link
                  href="/"
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  style={{ color: navText }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                    Salil&apos;s Portfolio
                  </span>
                </Link>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Open menu"
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                >
                  <BsThreeDots className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Compact floating navbar on mobile when scrolled */}
            {isCompact && (
              <div className="flex items-center gap-4 w-full justify-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-base"
                    style={{
                      background: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                      color: darkMode ? 'rgb(196, 181, 253)' : 'rgb(109, 40, 217)',
                    }}
                  >
                    SM
                  </span>
                </Link>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Open menu"
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                >
                  <BsThreeDots className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMenuOpen(false)} />
              <div
                className={`md:hidden rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-gray-200'}`}
                style={{
                  position: 'fixed',
                  top: '5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16rem',
                  zIndex: 50,
                  animation: 'slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Nav Links */}
                <div className="px-3 py-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-100'}`}
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
                  ))}
                </div>

                <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                {/* Resume Link */}
                <a
                  href="/salil-monga-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Download Resume</span>
                </a>

                <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => {
                    toggleDarkMode();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    {darkMode ? <BsSun className="w-5 h-5" /> : <BsFillMoonFill className="w-5 h-5" />}
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-purple-500' : 'bg-gray-300'} relative`}>
                    <div
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                      style={{
                        transform: darkMode ? 'translateX(24px)' : 'translateX(0)',
                      }}
                    />
                  </div>
                </button>

                <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                {/* Background Animation */}
                <div className="px-4 py-3">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    Background Animation
                  </div>
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => setAnimationStyle('gears')}
                      aria-label="Floating Gears"
                      className={`transition-all ${animationStyle === 'gears' ? 'scale-125' : 'hover:scale-110'}`}
                    >
                      <svg className={`w-6 h-6 ${animationStyle === 'gears' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setAnimationStyle('blueprint')}
                      aria-label="Blueprint Grid"
                      className={`transition-all ${animationStyle === 'blueprint' ? 'scale-125' : 'hover:scale-110'}`}
                    >
                      <svg className={`w-6 h-6 ${animationStyle === 'blueprint' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setAnimationStyle('none')}
                      aria-label="No Animation"
                      className={`transition-all ${animationStyle === 'none' ? 'scale-125' : 'hover:scale-110'}`}
                    >
                      <svg className={`w-6 h-6 ${animationStyle === 'none' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                {/* Social Links */}
                <div className="px-4 py-3">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    Connect
                  </div>
                  <div className="flex justify-center gap-6">
                    <Link
                      href="https://github.com/SalilMonga"
                      target="_blank"
                      aria-label="GitHub"
                      onClick={() => setMenuOpen(false)}
                      className="transition-transform hover:scale-110"
                    >
                      <AiFillGithub className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/salil-monga/"
                      target="_blank"
                      aria-label="LinkedIn"
                      onClick={() => setMenuOpen(false)}
                      className="transition-transform hover:scale-110"
                    >
                      <AiFillLinkedin className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                    </Link>
                    <a
                      href="mailto:monga.monga43@gmail.com"
                      target="_blank"
                      aria-label="Email"
                      onClick={() => setMenuOpen(false)}
                      className="transition-transform hover:scale-110"
                    >
                      <AiFillMail className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* CSS Animation for dropdown */}
      <style jsx>{`
        /* Desktop animations (no centering needed) */
        @keyframes slideDownDesktop {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUpDesktop {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        /* Mobile animations (with centering) */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.95);
          }
        }
      `}</style>
    </header>
  );
}
