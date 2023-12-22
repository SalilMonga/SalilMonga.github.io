import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import Image from "next/image";
import deved from "../../../public/dev-ed-wave.png";

export const MainLayout = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-5xl py-2 text-teal-600 font-medium">Salil Monga</h2>
      <h3 className="text-2xl py-2">Lorem Ipsum text.</h3>
      <p className="text-md py-5 leading-8 text-gray-800">
        Add a good bio here. Lorem ipsum text
      </p>
      <div className="text-2xl flex justify-center gap-16 py-3 text-gray-600">
        <AiFillGithub />
        <AiFillLinkedin />
        <AiFillTwitterCircle />
      </div>
      <div className="relative mx-auto bg-gradient-to-b from-purple-500 rounded-full w-80 h-80 mt-20 overflow-hidden">
        <Image src={deved} alt={""} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};
