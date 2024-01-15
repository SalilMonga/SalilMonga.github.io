"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import "./aboutMe.scss";
import Link from "next/link";
import { useState } from "react";
import "../globals.css";
import { MainLayout } from "../mainLayout/mainlayout";
import { ContactPage } from "../contactPage/contactPage";
import { SecondPage } from "../secondPage/secondPage";

export const AboutMe = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <main className="bg-white  px-10  dark:bg-blue-950">
        <section className=" min-h-screen">
          <nav className="flex justify-between pb-4 pt-8">
            <div className=" group-hover:text-black">
              <h1 className="font-burtons text-xl dark:text-white">
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
                    <BsSun className="cursor-pointer text-xl text-white" />
                  ) : (
                    <BsFillMoonFill className="cursor-pointer text-xl" />
                  )}
                </Link>
              </li>
              <li></li>
              <li>
                <button className="resumeButton" aria-disabled="true" disabled>
                  Resume
                </button>
              </li>
            </ul>
          </nav>
          <MainLayout />
        </section>
        <section>
          <SecondPage />
        </section>
        <section className="min-h-screen">
          <ContactPage />
        </section>
      </main>
    </div>
  );
};
