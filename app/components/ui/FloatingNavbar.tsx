import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { BsFillMoonFill, BsSun, BsThreeDots } from 'react-icons/bs';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function FloatingNavbar({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    }
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover]);

  const navBg = darkMode ? 'rgba(30,30,30,0.95)' : '#fff';
  const navText = darkMode ? '#fff' : '#222';
  const shadow = darkMode ? 'shadow-xl shadow-black/30' : 'shadow-xl shadow-gray-300';

  return (
    <nav
      className={`fixed left-1/2 top-3 z-50 flex -translate-x-1/2 items-center rounded-full px-2 py-1 gap-1 text-sm md:top-6 md:px-4 md:py-2 md:gap-2 md:text-base ${shadow}`}
      style={{ background: navBg, color: navText, border: darkMode ? 'none' : '1px solid #eee' }}
      aria-label="Floating navigation"
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-lg md:text-xl mr-1 md:mr-2 shadow transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
      >
        {darkMode ? <BsSun className="w-5 h-5" /> : <BsFillMoonFill className="w-5 h-5" />}
      </button>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`px-2 py-1 md:px-4 md:py-2 rounded-full font-medium transition-colors duration-200 ${darkMode ? 'text-white hover:bg-purple-500 focus:bg-purple-600' : 'text-black hover:bg-purple-100 focus:bg-purple-200'}`}
        >
          {item.name}
        </Link>
      ))}
      <div className="relative">
        <button
          className={`ml-1 md:ml-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors duration-200 text-xl md:text-2xl ${darkMode ? 'bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500' : 'bg-purple-500 text-white hover:bg-purple-400 focus:bg-purple-400'}`}
          onClick={() => setShowPopover((v) => !v)}
          aria-haspopup="true"
          aria-expanded={showPopover}
        >
          <BsThreeDots />
        </button>
        {showPopover && (
          <>
            {/* Popover: Always anchored below the button, both mobile and desktop */}
            <div
              ref={popoverRef}
              className={`absolute mt-2 rounded-lg p-4 shadow-lg border z-50 flex gap-6 justify-center bg-white dark:bg-[rgba(30,30,30,0.98)] border-purple-300 dark:border-purple-200
                left-auto right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto`}
              role="menu"
            >
              <Link href="https://github.com/SalilMonga" target="_blank" aria-label="GitHub" onClick={() => setShowPopover(false)}>
                <AiFillGithub className="w-7 h-7 transition-colors hover:text-purple-600 dark:hover:text-purple-400" />
              </Link>
              <Link href="https://www.linkedin.com/in/salil-monga/" target="_blank" aria-label="LinkedIn" onClick={() => setShowPopover(false)}>
                <AiFillLinkedin className="w-7 h-7 transition-colors hover:text-purple-600 dark:hover:text-purple-400" />
              </Link>
              <a href="mailto:monga.monga43@gmail.com" target="_blank" aria-label="Email" onClick={() => setShowPopover(false)}>
                <AiFillMail className="w-7 h-7 transition-colors hover:text-purple-600 dark:hover:text-purple-400" />
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
} 