"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import "./Portfolio.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../globals.css";
import { MainLayout } from "../mainLayout/mainlayout";
import { ContactPage } from "../components/contactPage/ContactPage";
import { SecondPage } from "../secondPage/secondPage";
import Image from "next/image";
import constructionPhoto from "../../public/underConstruction.jpeg";
import LoadingIcons from "react-loading-icons";
import Navbar from "../components/ui/Navbar";
import FloatingNavbar from "../components/ui/FloatingNavbar";
import HeroSection from "./HeroSection";

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowFloatingNav(true);
      } else {
        setShowFloatingNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${darkMode && "dark"}`} style={{ minHeight: '100vh', background: darkMode ? 'var(--color-gradient-dark)' : 'var(--color-gradient-light)', color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
      {/* Main Navbar with fade out */}
      <div style={{ transition: 'opacity 0.4s', opacity: showFloatingNav ? 0 : 1, pointerEvents: showFloatingNav ? 'none' : 'auto' }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      {/* Floating Navbar with fade in */}
      <div style={{ transition: 'opacity 0.4s', opacity: showFloatingNav ? 1 : 0, pointerEvents: showFloatingNav ? 'auto' : 'none' }}>
        <FloatingNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <main className="px-10">
        <div className="w-full max-w-[1500px] mx-auto px-4">
          <HeroSection />
          {/* <section>
            <SecondPage />
          </section> */}
          <section>
            <ContactPage />
          </section>
          <section className="h-screen">
            <a href="https://www.youtube.com/shorts/r6oM6ip9oHU" target="_blank">
              <div className="mx-auto flex flex-col items-center justify-center py-5">
                <Image
                  src={constructionPhoto}
                  alt={""}
                  className="rounded-3xl py-2"
                />
                <div className="rounded-md py-2" style={{ background: darkMode ? 'var(--color-gradient-dark)' : 'var(--color-gradient-light)', color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                  This part is under construction
                </div>
                <div className="py-2">
                  <LoadingIcons.BallTriangle />
                </div>
              </div>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};
