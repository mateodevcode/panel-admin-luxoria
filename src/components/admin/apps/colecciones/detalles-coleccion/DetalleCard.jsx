"use client";

import { Bolt, FileType } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { LuUserSearch } from "react-icons/lu";

const DetalleCard = ({ id }) => {
  const { colecciones } = useContext(AppContext);

  const coleccionSeleccionada =
    colecciones?.find((cole) => cole._id === id) || {};

  if (!id) {
    return (
      <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] aspect-square flex flex-col font-poppins h-[50svh] items-center justify-center text-segundo">
        <div className="w-20 h-20 rounded-full bg-cuarto/10 flex items-center justify-center mb-2">
          <LuUserSearch className="text-4xl text-cuarto" />
        </div>
        <span className="font-medium text-xl md:text-2xl text-segundo/70">
          Selecciona una colección.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] aspect-square flex flex-col font-poppins">
      <h3 className="font-bold text-segundo/80 text-lg">
        {coleccionSeleccionada.nombre}
      </h3>
      <div className="relative mt-2">
        <Image
          src={coleccionSeleccionada.imageUrl || "/colecciones/coleccion.png"}
          alt={coleccionSeleccionada.nombre || "Colección"}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
          loading="eager"
        />
      </div>

      <div className="">
        <p className="text-sm text-segundo/70 flex items-center gap-1 mt-4">
          <FileType className="w-4 h-4 text-cuarto" />{" "}
          {coleccionSeleccionada.descripcion}
        </p>

        <div className="flex flex-col gap-4 text-segundo/70 text-sm border-t border-segundo/20 pt-3 mt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Bolt className="w-4 h-4 text-cuarto" />{" "}
              {coleccionSeleccionada.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCard;
