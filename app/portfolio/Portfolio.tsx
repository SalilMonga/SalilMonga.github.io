"use client";
import "./Portfolio.scss";
import { useState, useEffect } from "react";
import "../globals.css";
import { ContactPage } from "../components/contactPage/ContactPage";
import Navbar from "../components/ui/Navbar";
import BackgroundAnimationGears from "../components/ui/BackgroundAnimation";
import BackgroundAnimationBlueprint from "../components/ui/BackgroundAnimationBlueprint";
import HeroSection from "./HeroSection";
import FeaturedProjectsSection from "./FeaturedProjectsSection";
// import ProjectSection from "./ProjectSection";
import SkillsSection from "./SkillsSection";

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [animationStyle, setAnimationStyle] = useState('gears'); // 'gears', 'blueprint', or 'none'

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowFloatingNav(true);
      } else {
        setShowFloatingNav(false);
      }
    };

    // Call handleScroll on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: '100vh', background: darkMode ? 'var(--color-gradient-dark)' : 'var(--color-gradient-light)', color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
      {/* Background Animation */}
      {animationStyle === 'gears' && <BackgroundAnimationGears />}
      {animationStyle === 'blueprint' && <BackgroundAnimationBlueprint />}
      {/* No animation if animationStyle === 'none' */}

      {/* Morphing Navbar */}
      <div className="relative z-50">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          animationStyle={animationStyle}
          setAnimationStyle={setAnimationStyle}
          isCompact={showFloatingNav}
        />
      </div>
      <main className="relative z-10 px-10 pt-24 md:pt-28 pb-10">
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
