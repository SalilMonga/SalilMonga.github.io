"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { MainLayout } from "./mainLayout/mainlayout";
import { SecondPage } from "./secondPage/secondPage";
import "./page.scss";
import Link from "next/link";
import { useState } from "react";
import { ContactPage } from "./contactPage/contactPage";
// import { ContactPage } from "./contactPage/contactPage";
export interface Contact {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  // const contactInfo = {
  //   name: "",
  //   email: "",
  //   description: "",
  // };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
                  <AiFillGithub className="dark:fill-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/salil-monga/"
                  target="_blank"
                >
                  <AiFillLinkedin className="dark:fill-white" />
                </a>
                <a href="">
                  <AiFillTwitterCircle className="dark:fill-white" />
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
        <section>
          {/* <ContactPage contact={contactInfo} /> */}
          {/* <div className="w-full h-screen flex justify-center items-center">
            <Link href="./contactPage/contactPage.tsx">Contact me</Link>
          </div> */}
          <ContactPage />
        </section>
      </main>
    </div>
  );
}
