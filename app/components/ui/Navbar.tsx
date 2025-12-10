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
  const [menuClosing, setMenuClosing] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [settingsMenuClosing, setSettingsMenuClosing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0, top: 0, opacity: 0 });
  const [mobilePillStyle, setMobilePillStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [showDesktopPulse, setShowDesktopPulse] = useState(true);
  const [showDesktopTooltip, setShowDesktopTooltip] = useState(false);
  const [showDesktopBanner, setShowDesktopBanner] = useState(false);
  const [showMobileTooltip, setShowMobileTooltip] = useState(false);
  const [showMobileBadge, setShowMobileBadge] = useState(false);
  const [highlightAnimation, setHighlightAnimation] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navContainerRef = useRef<HTMLUListElement>(null);
  const mobileNavLinksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const mobileNavContainerRef = useRef<HTMLDivElement>(null);

  const navBg = darkMode ? 'rgba(30,30,30,0.95)' : '#fff';
  const navText = darkMode ? 'var(--color-text-dark)' : '#222';

  // Desktop pulse animation - runs for 10 seconds on load
  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      setShowDesktopPulse(false);
    }, 10000);

    return () => clearTimeout(pulseTimer);
  }, []);

  // Desktop banner - shows after 3 seconds if user hasn't clicked menu
  useEffect(() => {
    const hasSeenBanner = sessionStorage.getItem('portfolioDesktopMenuBannerSeen');

    if (!hasSeenBanner) {
      const bannerTimer = setTimeout(() => {
        setShowDesktopBanner(true);
      }, 3000);

      return () => clearTimeout(bannerTimer);
    }
  }, []);

  // Dismiss desktop banner
  const dismissDesktopBanner = () => {
    setShowDesktopBanner(false);
    sessionStorage.setItem('portfolioDesktopMenuBannerSeen', 'true');
  };

  // Mobile first-time tooltip logic
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('portfolioMenuTooltipSeen');

    if (!hasSeenTooltip) {
      setShowMobileBadge(true);

      const tooltipTimer = setTimeout(() => {
        setShowMobileTooltip(true);
      }, 2000);

      return () => clearTimeout(tooltipTimer);
    }
  }, []);

  // Dismiss mobile tooltip
  const dismissMobileTooltip = () => {
    setShowMobileTooltip(false);
    setShowMobileBadge(false);
    sessionStorage.setItem('portfolioMenuTooltipSeen', 'true');
  };

  // Handle closing animation (Desktop)
  const closeMenu = () => {
    setSettingsMenuClosing(true);
    setHighlightAnimation(false);
    setTimeout(() => {
      setSettingsMenuOpen(false);
      setSettingsMenuClosing(false);
    }, 300); // Match animation duration
  };

  // Handle closing animation (Mobile)
  const closeMobileMenu = () => {
    setMenuClosing(true);
    setHighlightAnimation(false);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 300); // Match animation duration
  };

  // Handle opening menu - show animation highlight on first open
  const handleMenuOpen = () => {
    setSettingsMenuOpen(true);

    // Dismiss desktop banner when menu is opened
    if (showDesktopBanner) {
      dismissDesktopBanner();
    }

    const hasSeenAnimationHighlight = sessionStorage.getItem('portfolioAnimationHighlightSeen');
    if (!hasSeenAnimationHighlight) {
      setHighlightAnimation(true);
      sessionStorage.setItem('portfolioAnimationHighlightSeen', 'true');

      // Remove highlight after 5 seconds
      setTimeout(() => {
        setHighlightAnimation(false);
      }, 5000);
    }
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

  // Update pill position when active section changes (Desktop)
  useEffect(() => {
    const updatePillPosition = () => {
      const activeLink = navLinksRef.current[activeSection];
      const container = navContainerRef.current;

      if (activeLink && container) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setPillStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
          height: linkRect.height,
          top: linkRect.top - containerRect.top,
          opacity: 1
        });
      }
    };

    // Initial update with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(updatePillPosition, 50);

    // Update after the navbar transition completes (0.5s as per the navbar transition)
    const transitionTimeoutId = setTimeout(updatePillPosition, 550);

    // Update on window resize
    window.addEventListener('resize', updatePillPosition);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(transitionTimeoutId);
      window.removeEventListener('resize', updatePillPosition);
    };
  }, [activeSection, isCompact]);

  // Update pill position for mobile menu
  useEffect(() => {
    if (!menuOpen) return;

    const updateMobilePillPosition = () => {
      const activeLink = mobileNavLinksRef.current[activeSection];
      const container = mobileNavContainerRef.current;

      if (activeLink && container) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setMobilePillStyle({
          top: linkRect.top - containerRect.top,
          height: linkRect.height,
          opacity: 1
        });
      }
    };

    // Small delay to ensure menu is rendered
    setTimeout(updateMobilePillPosition, 10);
  }, [activeSection, menuOpen]);

  // Scroll spy to track active section
  useEffect(() => {
    const sections = ['about', 'featured-projects', 'skills', 'contact'];

    const updateActiveSection = () => {
      // Check if we're at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection('about');
        return;
      }

      // Find which section is currently most prominent
      // We'll check which section's top is closest to the top 30% of the viewport
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      let closestSection = 'about';
      let closestDistance = Infinity;

      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const distance = Math.abs(scrollPosition - elementTop);

          if (distance < closestDistance && rect.top < window.innerHeight * 0.5) {
            closestDistance = distance;
            closestSection = id;
          }
        }
      });

      setActiveSection(closestSection);
    };

    // Update on scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Initial update
    updateActiveSection();

    // Add scroll listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

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
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
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
            <ul
              ref={navContainerRef}
              className="hidden md:flex relative"
              role="menubar"
              style={{
                gap: isCompact ? '0.75rem' : '2rem',
                marginLeft: isCompact ? '1.5rem' : '0',
                transition: 'gap 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), margin-left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Animated background pill */}
              <div
                className="absolute rounded-full bg-purple-500 pointer-events-none"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                  height: `${pillStyle.height}px`,
                  top: `${pillStyle.top}px`,
                  opacity: pillStyle.opacity,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 0,
                }}
              />

              {navigationLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name} role="none" style={{ position: 'relative', zIndex: 1 }}>
                    <Link
                      ref={(el) => {
                        navLinksRef.current[link.href.substring(1)] = el;
                      }}
                      href={link.href}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        darkMode
                          ? 'hover:bg-purple-500/30'
                          : 'hover:bg-purple-100/30'
                      }`}
                      role="menuitem"
                      tabIndex={0}
                      style={{
                        color: isActive ? 'white' : navText,
                        position: 'relative',
                      }}
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
                );
              })}
            </ul>

            {/* Three Dots Settings Menu */}
            <div className="hidden md:block relative" ref={settingsMenuRef} style={{
              marginLeft: isCompact ? '1.5rem' : '0',
              transition: 'margin-left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              <div className="relative">
                {/* Pulsing ring animation - positioned around the button */}
                {showDesktopPulse && (
                  <div
                    className="absolute rounded-full pointer-events-none z-0"
                    style={{
                      top: '-4px',
                      left: '-4px',
                      right: '-4px',
                      bottom: '-4px',
                      animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      border: '2px solid',
                      borderColor: darkMode ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.7)',
                    }}
                  />
                )}

                <button
                  ref={desktopButtonRef}
                  onClick={() => {
                    if (settingsMenuOpen) {
                      closeMenu();
                    } else {
                      handleMenuOpen();
                    }
                  }}
                  onMouseEnter={() => setShowDesktopTooltip(true)}
                  onMouseLeave={() => setShowDesktopTooltip(false)}
                  aria-label="Open settings menu"
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 relative z-10 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                >
                  <BsThreeDots className="w-4 h-4" />
                </button>

                {/* Hover Tooltip */}
                {showDesktopTooltip && !settingsMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none z-50 ${darkMode ? 'bg-neutral-700 text-white' : 'bg-gray-800 text-white'}`}
                    style={{
                      animation: 'fadeIn 0.2s ease-out',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    Customize animations, dark mode & more
                    {/* Tooltip arrow */}
                    <div
                      className={`absolute top-0 right-3 w-2 h-2 transform -translate-y-1/2 rotate-45 ${darkMode ? 'bg-neutral-700' : 'bg-gray-800'}`}
                    />
                  </div>
                )}

                {/* Desktop Banner - appears after 3 seconds */}
                {showDesktopBanner && !settingsMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl z-50 border ${darkMode ? 'bg-gradient-to-br from-neutral-900/98 to-neutral-950/98 text-white border-neutral-700/50' : 'bg-gradient-to-br from-purple-50/98 to-white/98 text-gray-800 border-purple-200'}`}
                    style={{
                      animation: 'bannerSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      minWidth: '260px',
                      maxWidth: '280px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                          <svg className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 pr-2">
                        <p className={`font-semibold mb-1 ${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>
                          Explore customization
                        </p>
                        <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click the menu to customize animations, toggle dark mode, and more!
                        </p>
                      </div>
                      <button
                        onClick={dismissDesktopBanner}
                        className={`flex-shrink-0 transition-colors rounded-full p-1 ${darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        aria-label="Dismiss banner"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {/* Banner arrow pointing to button */}
                    <div
                      className={`absolute -top-2 right-4 w-3 h-3 transform rotate-45 ${darkMode ? 'bg-gradient-to-br from-neutral-900 to-neutral-950 border-t border-l border-neutral-700/50' : 'bg-gradient-to-br from-purple-50 to-white border-t border-l border-purple-200'}`}
                    />
                  </div>
                )}
              </div>

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
                      <div className="flex justify-center gap-6 relative">
                        {/* Highlight effect behind the middle icon */}
                        {highlightAnimation && (
                          <div
                            className="absolute rounded-full bg-purple-500/20 ring-2 ring-purple-500 ring-opacity-50 pointer-events-none"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '48px',
                              height: '48px',
                              animation: 'gentleGlow 2s ease-in-out infinite',
                              zIndex: 0,
                            }}
                          />
                        )}
                        <button
                          onClick={() => {
                            setAnimationStyle('gears');
                            closeMenu();
                          }}
                          aria-label="Floating Gears"
                          className={`relative z-10 transition-all ${animationStyle === 'gears' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'gears' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setAnimationStyle('blueprint');
                            closeMenu();
                          }}
                          aria-label="Blueprint Grid"
                          className={`relative z-10 transition-all ${animationStyle === 'blueprint' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'blueprint' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setAnimationStyle('none');
                            closeMenu();
                          }}
                          aria-label="No Animation"
                          className={`relative z-10 transition-all ${animationStyle === 'none' ? 'scale-125' : 'hover:scale-110'}`}
                        >
                          <svg className={`w-6 h-6 ${animationStyle === 'none' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                          onClick={() => {
                            closeMenu();
                          }}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillGithub className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                        </Link>
                        <Link
                          href="https://www.linkedin.com/in/salil-monga/"
                          target="_blank"
                          aria-label="LinkedIn"
                          onClick={() => {
                            closeMenu();
                          }}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillLinkedin className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                        </Link>
                        <a
                          href="mailto:monga.monga43@gmail.com"
                          target="_blank"
                          aria-label="Email"
                          onClick={() => {
                            closeMenu();
                          }}
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

                <div className="relative">
                  {/* Pulsing ring animation - same as desktop */}
                  {showMobileBadge && (
                    <div
                      className="absolute rounded-full pointer-events-none z-0"
                      style={{
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        border: '2px solid',
                        borderColor: darkMode ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.7)',
                      }}
                    />
                  )}

                  <button
                    ref={mobileButtonRef}
                    onClick={() => {
                      if (!menuOpen) {
                        handleMenuOpen();
                      }
                      setMenuOpen(!menuOpen);
                      if (showMobileTooltip) {
                        dismissMobileTooltip();
                      }
                    }}
                    aria-label="Open menu"
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                  >
                    <BsThreeDots className="w-5 h-5" />
                  </button>

                  {/* Mobile Tooltip */}
                  {showMobileTooltip && !menuOpen && (
                    <div
                      className={`absolute top-12 right-0 px-4 py-3 rounded-lg text-sm font-medium shadow-xl z-50 ${darkMode ? 'bg-neutral-700 text-white' : 'bg-gray-800 text-white'}`}
                      style={{
                        animation: 'slideInFromTop 0.3s ease-out',
                        minWidth: '200px',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold mb-1">✨ Try customizing!</p>
                          <p className="text-xs opacity-90">Tap here to change animations & more</p>
                        </div>
                        <button
                          onClick={dismissMobileTooltip}
                          className="text-white/70 hover:text-white transition-colors"
                          aria-label="Dismiss tooltip"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {/* Tooltip arrow */}
                      <div
                        className={`absolute -top-2 right-3 w-3 h-3 transform rotate-45 ${darkMode ? 'bg-neutral-700' : 'bg-gray-800'}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compact floating navbar on mobile when scrolled */}
            {isCompact && (
              <div className="flex items-center gap-4 w-full justify-center">
                <Link
                  href="/"
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
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

                <div className="relative">
                  {/* Pulsing ring animation - same as desktop */}
                  {showMobileBadge && (
                    <div
                      className="absolute rounded-full pointer-events-none z-0"
                      style={{
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        animation: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        border: '2px solid',
                        borderColor: darkMode ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.7)',
                      }}
                    />
                  )}

                  <button
                    onClick={() => {
                      if (!menuOpen) {
                        handleMenuOpen();
                      }
                      setMenuOpen(!menuOpen);
                      if (showMobileTooltip) {
                        dismissMobileTooltip();
                      }
                    }}
                    aria-label="Open menu"
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${darkMode ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                  >
                    <BsThreeDots className="w-5 h-5" />
                  </button>

                  {/* Mobile Tooltip - Compact Mode */}
                  {showMobileTooltip && !menuOpen && (
                    <div
                      className={`fixed top-20 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg text-sm font-medium shadow-xl z-50 ${darkMode ? 'bg-neutral-700 text-white' : 'bg-gray-800 text-white'}`}
                      style={{
                        animation: 'slideInFromTop 0.3s ease-out',
                        minWidth: '200px',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold mb-1">✨ Try customizing!</p>
                          <p className="text-xs opacity-90">Tap here to change animations & more</p>
                        </div>
                        <button
                          onClick={dismissMobileTooltip}
                          className="text-white/70 hover:text-white transition-colors"
                          aria-label="Dismiss tooltip"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {/* Tooltip arrow */}
                      <div
                        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 transform rotate-45 ${darkMode ? 'bg-neutral-700' : 'bg-gray-800'}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-50 bg-black/60 md:hidden"
                onClick={closeMobileMenu}
                style={{
                  animation: menuClosing
                    ? 'fadeOut 0.3s ease-out forwards'
                    : 'backdropFadeIn 0.3s ease-out',
                }}
              />
              <div
                className={`md:hidden rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-neutral-800 border border-neutral-700' : 'bg-white border border-gray-200'}`}
                style={{
                  position: 'fixed',
                  top: '5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16rem',
                  zIndex: 50,
                  animation: menuClosing
                    ? 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                    : 'slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Nav Links */}
                <div ref={mobileNavContainerRef} className="px-3 py-2 relative">
                  {/* Animated background pill for mobile */}
                  <div
                    className="absolute left-3 right-3 rounded-lg bg-purple-500 pointer-events-none"
                    style={{
                      top: `${mobilePillStyle.top}px`,
                      height: `${mobilePillStyle.height}px`,
                      opacity: mobilePillStyle.opacity,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 0,
                    }}
                  />

                  {navigationLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <Link
                        key={link.name}
                        ref={(el) => {
                          mobileNavLinksRef.current[link.href.substring(1)] = el;
                        }}
                        href={link.href}
                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors relative ${
                          darkMode
                            ? 'hover:bg-neutral-700/30'
                            : 'hover:bg-gray-100/30'
                        }`}
                        style={{
                          color: isActive ? 'white' : undefined,
                          zIndex: 1,
                        }}
                        onClick={(e) => {
                          if (link.name === 'About') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                          closeMobileMenu();
                        }}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <div className={`h-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-200'}`} />

                {/* Resume Link */}
                <a
                  href="/salil-monga-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'}`}
                  onClick={closeMobileMenu}
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
                  <div className="flex justify-center gap-6 relative">
                    {/* Highlight effect behind the middle icon */}
                    {highlightAnimation && (
                      <div
                        className="absolute rounded-full bg-purple-500/20 ring-2 ring-purple-500 ring-opacity-50 pointer-events-none"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '48px',
                          height: '48px',
                          animation: 'gentleGlow 2s ease-in-out infinite',
                          zIndex: 0,
                        }}
                      />
                    )}
                    <button
                      onClick={() => {
                        setAnimationStyle('gears');
                        closeMobileMenu();
                      }}
                      aria-label="Floating Gears"
                      className={`relative z-10 transition-all ${animationStyle === 'gears' ? 'scale-125' : 'hover:scale-110'}`}
                    >
                      <svg className={`w-6 h-6 ${animationStyle === 'gears' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setAnimationStyle('blueprint');
                        closeMobileMenu();
                      }}
                      aria-label="Blueprint Grid"
                      className={`relative z-10 transition-all ${animationStyle === 'blueprint' ? 'scale-125' : 'hover:scale-110'}`}
                    >
                      <svg className={`w-6 h-6 ${animationStyle === 'blueprint' ? (darkMode ? 'text-purple-400' : 'text-purple-600') : (darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setAnimationStyle('none');
                        closeMobileMenu();
                      }}
                      aria-label="No Animation"
                      className={`relative z-10 transition-all ${animationStyle === 'none' ? 'scale-125' : 'hover:scale-110'}`}
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
                      onClick={closeMobileMenu}
                      className="transition-transform hover:scale-110"
                    >
                      <AiFillGithub className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/salil-monga/"
                      target="_blank"
                      aria-label="LinkedIn"
                      onClick={closeMobileMenu}
                      className="transition-transform hover:scale-110"
                    >
                      <AiFillLinkedin className={`w-6 h-6 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} />
                    </Link>
                    <a
                      href="mailto:monga.monga43@gmail.com"
                      target="_blank"
                      aria-label="Email"
                      onClick={closeMobileMenu}
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

        /* Pulse ring animation for desktop and mobile */
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Fade in animation for tooltip */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Banner slide in animation for desktop */
        @keyframes bannerSlideIn {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Backdrop fade animations */
        @keyframes backdropFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        /* Slide in from top for mobile tooltip */
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Gentle glow effect for animation section highlight */
        @keyframes gentleGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.3);
          }
        }
      `}</style>
    </header>
  );
}
