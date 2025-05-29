"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import "./Portfolio.scss";
import Link from "next/link";
import { useState } from "react";
import "../globals.css";
import { MainLayout } from "../mainLayout/mainlayout";
import { ContactPage } from "../components/contactPage/ContactPage";
import { SecondPage } from "../secondPage/secondPage";
import Image from "next/image";
import constructionPhoto from "../../public/underConstruction.jpeg";
import LoadingIcons from "react-loading-icons";
import Navbar from "../components/ui/Navbar";

export const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`} style={{ minHeight: '100vh', background: darkMode ? 'var(--color-gradient-dark)' : 'var(--color-gradient-light)', color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
      <Navbar />
      <main className="px-10">
        <section>
          <nav className="flex justify-between pb-4 pt-8">
            <div className=" group-hover:text-black">
              <h1 className="font-burtons text-xl" style={{ color: darkMode ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                Developed by Salil
              </h1>
              <div className=" flex gap-8 py-1 text-2xl group-hover:text-black">
                <Link href="https://github.com/SalilMonga" target="_blank">
                  <AiFillGithub className="icons" />
                </Link>
                <a
                  href="https://www.linkedin.com/in/salil-monga/"
                  target="_blank"
                >
                  <AiFillLinkedin className="icons" />
                </a>
                <a href="mailto:monga.monga43@gmail.com" target="_blank">
                  <AiFillMail className="icons" />
                </a>
              </div>
            </div>
            <ul className="flex items-center ">
              <li>
                <Link
                  href=""
                  onClick={() => {
                    toggleDarkMode();
                  }}
                >
                  {darkMode ? (
                    <BsSun className="cursor-pointer text-xl" style={{ color: 'var(--color-text-dark)' }} />
                  ) : (
                    <BsFillMoonFill className="cursor-pointer text-xl" style={{ color: 'var(--color-text-light)' }} />
                  )}
                </Link>
              </li>
              {/* <li>
                <Link href="/resumeModal">
                  <button
                    className="resumeButton"
                    aria-disabled="true"
                    disabled
                  >
                    Resume?
                  </button>
                </Link>
              </li> */}
            </ul>
          </nav>
          <MainLayout />
        </section>
        <section>
          <SecondPage />
        </section>
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
      </main>
    </div>
  );
};
