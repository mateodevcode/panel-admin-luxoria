"use client";

import { Bolt } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { LuUserSearch } from "react-icons/lu";

const DetalleCard = ({ id }) => {
  const { colecciones } = useContext(AppContext);

  const coleccionSeleccionada =
    colecciones?.find((cole) => cole._id === id) || {};

  const carac = coleccionSeleccionada.caracteristicas || [];

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
    <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] aspect-square flex flex-col font-poppins gap-2">
      <h3 className="font-bold text-segundo/80 text-lg">
        {coleccionSeleccionada.nombre}
      </h3>
      <div>
        <p>{coleccionSeleccionada.frase}</p>
      </div>

      {/* Imagen horizontal */}
      <div className="relative w-full h-44 mt-4">
        <Image
          src={
            coleccionSeleccionada.imageUrlHor || "/colecciones/coleccion.png"
          }
          alt={coleccionSeleccionada.nombre || "images"}
          fill
          className="object-cover rounded-lg"
        />
        <p className="absolute bottom-0 left-0 py-2 px-6 bg-segundo/50 text-primero">
          Imagen horizontal
        </p>
      </div>

      {/* Imagen vertical */}
      <div className="relative w-full h-44 mt-4">
        <Image
          src={
            coleccionSeleccionada.imageUrlVer || "/colecciones/coleccion.png"
          }
          alt={coleccionSeleccionada.nombre || "images"}
          fill
          className="object-cover rounded-lg"
        />
        <p className="absolute bottom-0 left-0 py-2 px-6 bg-segundo/50 text-primero">
          Imagen Vertical
        </p>
      </div>

      {/* Imagen portada */}
      <div className="relative w-full h-44 mt-4">
        <Image
          src={
            coleccionSeleccionada.imageUrlPortada ||
            "/colecciones/coleccion.png"
          }
          alt={coleccionSeleccionada.nombre || "images"}
          fill
          className="object-cover rounded-lg"
        />
        <p className="absolute bottom-0 left-0 py-2 px-6 bg-segundo/50 text-primero">
          Imagen Portada
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        Tipo:
        {carac.map((cara, index) => {
          return (
            <span
              key={index}
              className="bg-cuarto hover:bg-cuarto/80 text-primero px-4 py-2 rounded-full font-medium transition text-xs"
            >
              {cara}
            </span>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 text-segundo/70 text-sm border-t border-segundo/20 pt-3 mt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Bolt className="w-4 h-4 text-cuarto" />{" "}
            {coleccionSeleccionada.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetalleCard;
