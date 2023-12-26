"use client";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { MainLayout } from "./mainLayout/mainlayout";
import { SecondPage } from "../secondPage/secondPage";
import "./page.scss";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    // document.documentElement.classList.add("dark");
    // console.log("documentElement:", document.documentElement.classList);
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <main className="bg-white  dark:bg-blue-950  px-10">
        <section className=" min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-burtons">Developed by Salil</h1>
            <ul className="flex items-center">
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
          <div>
            <MainLayout />
          </div>
        </section>
        <section>
          <SecondPage />
        </section>
      </main>
    </div>
  );
}
