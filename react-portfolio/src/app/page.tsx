import { BsFillMoonStarsFill } from "react-icons/bs";
import { MainLayout } from "./mainLayout/mainlayout";
import { SecondPage } from "../secondPage/secondPage";
// import "./page.scss";

export default function Home() {
  return (
    <main className="bg-white px-10">
      <section className=" min-h-screen">
        <nav className="py-10 mb-12 flex justify-between">
          <h1 className="text-xl font-burtons">Developed by Salil</h1>
          <ul className="flex items-center">
            <li>
              <BsFillMoonStarsFill className="cursor-pointer text-xl" />
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
  );
}
