"use client";

import { IoClose } from "react-icons/io5";

export default function BotonCerrar({ onClick }) {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center absolute top-3 right-3 hover:rotate-90 transition text-blackbase-500 hover:text-blackbase-500/70`}
      onClick={onClick}
    >
      <IoClose className="text-lg cursor-pointer" />
    </button>
  );
}
