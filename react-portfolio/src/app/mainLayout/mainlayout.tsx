// import {
//   AiFillTwitterCircle,
//   AiFillLinkedin,
//   AiFillGithub,
// } from "react-icons/ai";
import Image from "next/image";
import deved from "../../../public/dev-ed-wave.png";

export const MainLayout = () => {
  return (
    <div className="text-center p-4">
      <a href="https://www.linkedin.com/in/salil-monga/" target="_blank">
        <h2 className="hover:text-teal-400 text-5xl py-2 text-cyan-600 font-medium">
          Salil Monga
        </h2>
      </a>
      {/* <h3 className="text-2xl py-2 dark:text-white">
        | Developer | Problem-solver |
      </h3> */}
      <p className="text-md py-5 leading-8 text-gray-800 dark:text-white">
        My life revolves around finding a missing semi-colon in a thousand lines
        of code after working on a project for days and prompting moments of
        introspection on the significance of my work. And after scratching my
        head and looking around for hours when everything finally runs, it just
        makes me feel alive.
      </p>
      <div className="relative mx-auto bg-gradient-to-b from-purple-500 rounded-full w-80 h-80 mt-20 overflow-hidden">
        <Image src={deved} alt={""} layout="fill" objectFit="cover" />
      </div>
      {/* <div
        className=" group-hover:text-blue-200 text-2xl
        flex
        justify-center
        gap-16
        py-3
        text-gray-60"
      >
        <a href="https://github.com/SalilMonga" target="_blank">
          <AiFillGithub className="dark:fill-white" />
        </a>
        <a href="https://www.linkedin.com/in/salil-monga/" target="_blank">
          <AiFillLinkedin className="dark:fill-white" />
        </a>
        <a href="">
          <AiFillTwitterCircle className="dark:fill-white" />
        </a>
      </div> */}
    </div>
  );
};
