import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";

export const NavButton = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <Link href="/aboutMe">
      <button
        className="group relative flex w-fit items-start justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-900 px-1 py-2 font-bold transition-transform ease-out 
      hover:scale-105"
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
        <span className="relative flex items-center justify-center gap-2">
          <p className="group-hover:text-purple-200">Click Below</p>
          {isShown ? (
            <GiFullMotorcycleHelmet className="span group-hover:text-purple-200" />
          ) : (
            <BsArrowRightSquareFill className="span transform rotate-90 group-hover:text-purple-200" />
          )}
        </span>
      </button>
    </Link>
  );
};
