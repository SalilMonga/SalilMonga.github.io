"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { MainLayout } from "./mainLayout/mainlayout";
import { SecondPage } from "./secondPage/secondPage";
import "./page.scss";
import Link from "next/link";
import { useState } from "react";
import { ContactPage } from "./contactPage/contactPage";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleLinkClick = () => {
    // Assuming '/app/contactPage/contactPage' is the desired route
    console.log("router:", router);
    router.replace("/contact");
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <main className="bg-white  dark:bg-blue-950  px-10">
        <section className=" min-h-screen">
          <nav className="pb-4 pt-8 flex justify-between">
            <div className=" group-hover:text-black">
              <h1 className="text-xl font-burtons dark:text-white">
                Developed by Salil
              </h1>
              <div className=" group-hover:text-black flex gap-8 text-2xl py-1">
                <a href="https://github.com/SalilMonga" target="_blank">
                  <AiFillGithub className="icons" />
                </a>
                <a
                  href="https://www.linkedin.com/in/salil-monga/"
                  target="_blank"
                >
                  <AiFillLinkedin className="icons" />
                </a>
                <AiFillMail className="icons" />
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
              <li>
                {/* <a
                  href="/contactPage/contactPage"
                  target="_blank"
                  className="resumeButton"
                > */}
                <a onClick={handleLinkClick} className="resumeButton">
                  Click Here
                </a>
                {/* </a> */}
              </li>
              <li>
                <a
                  href="MongaSalil_Resume2023.pdf"
                  target="_blank"
                  className="resumeButton"
                >
                  Resume
                </a>
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
}
