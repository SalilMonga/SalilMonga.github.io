import { useState } from "react";
import Avatar from "./avatar/avatar";

export const MainLayout = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="text-center p-4">
      <a
        href="/"
        onMouseEnter={() => {
          setIsShown(true);
        }}
        onMouseLeave={() => {
          setIsShown(false);
        }}
        onTouchStart={() => {
          setIsShown(true);
        }}
        onTouchEnd={() => {
          setIsShown(false);
        }}
      >
        <h2 className="hover:text-teal-400 text-5xl py-2 text-cyan-600 font-medium">
          Salil Monga
        </h2>
        {isShown ? (
          <p className="text-gray-500 font-mono font-extralight">
            Are you SUUREE...?
          </p>
        ) : (
          <p className="text-gray-500 font-mono font-extralight">
            Clicking on the name will take you BACK!
          </p>
        )}
      </a>
      <p className="text-md py-5 leading-8 text-gray-800 dark:text-white">
        My life revolves around finding a missing semi-colon in a thousand lines
        of code after working on a project for days and prompting moments of
        introspection on the significance of my work. And after scratching my
        head and looking around for hours when everything finally runs, it just
        makes me feel alive.
      </p>
      <div className="flex items-center justify-center mx-auto">
        <Avatar className="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
      </div>
    </div>
  );
};
