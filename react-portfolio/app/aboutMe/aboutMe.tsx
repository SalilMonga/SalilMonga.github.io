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
import Image from "next/image";
import constructionPhoto from "../../public/underConstruction.jpeg";
import LoadingIcons from "react-loading-icons";

export const AboutMe = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <main className="bg-white  px-10  dark:bg-blue-950">
        <section>
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
              <div className="rounded-md bg-gradient-to-r from-green-500 via-yellow-100 to-blue-500 py-2">
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
