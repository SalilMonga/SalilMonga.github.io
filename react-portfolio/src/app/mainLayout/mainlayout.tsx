import Image from "next/image";
import deved from "../../../public/dev-ed-wave.png";

export const MainLayout = () => {
  return (
    <div className="text-center p-4">
      <a href="mailto:monga.monga43@gmail.com" target="_blank">
        <h2 className="hover:text-teal-400 text-5xl py-2 text-cyan-600 font-medium">
          Salil Monga
        </h2>
      </a>
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
    </div>
  );
};
