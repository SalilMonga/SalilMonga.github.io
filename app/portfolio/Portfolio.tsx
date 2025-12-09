"use client";
import "./Portfolio.scss";
import { useState, useEffect } from "react";
import "../globals.css";
import { ContactPage } from "../components/contactPage/ContactPage";
import Navbar from "../components/ui/Navbar";
import FloatingNavbar from "../components/ui/FloatingNavbar";
import BackgroundAnimation from "../components/ui/BackgroundAnimation";
import HeroSection from "./HeroSection";
import FeaturedProjectsSection from "./FeaturedProjectsSection";
// import ProjectSection from "./ProjectSection";
import SkillsSection from "./SkillsSection";

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showFloatingNav, setShowFloatingNav] = useState(true); // Force show for debugging

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowFloatingNav(true);
      } else {
        setShowFloatingNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${darkMode && "dark"} min-h-screen`} style={{ minHeight: '100vh', width: '100vw', background: darkMode ? 'var(--color-gradient-dark)' : 'var(--color-gradient-light)', backgroundAttachment: 'fixed', color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Main Navbar with fade out */}
      <div style={{ transition: 'opacity 0.4s', opacity: showFloatingNav ? 0 : 1, pointerEvents: showFloatingNav ? 'none' : 'auto' }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      {/* Floating Navbar with fade in */}
      <div className="z-50" style={{ transition: 'opacity 0.4s', opacity: showFloatingNav ? 1 : 0, pointerEvents: showFloatingNav ? 'auto' : 'none' }}>
        <FloatingNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <main className="relative z-10 px-10 pt-16 md:pt-0">
        <div className="w-full max-w-[1500px] mx-auto px-4">
          <HeroSection />
          <FeaturedProjectsSection />
          {/* <ProjectSection /> */}
          <SkillsSection />
          <ContactPage />
        </div>
      </main>
    </div>
  );
};
