"use client";

import { AppContext } from "@/context/AppContext";
import { Check, HardDriveUpload } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import usePerfil from "@/hooks/usePerfil";
import Image from "next/image";

const ConfigurarCuenta = () => {
  const { formDataUsuario, setFormDataUsuario, usuario } =
    useContext(AppContext);
  const { handleChange, handleChangeFile, handleActualizarUsuario } =
    usePerfil();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (usuario) {
      setFormDataUsuario({
        ...formDataUsuario,
        name: usuario.name,
        email: usuario.email,
        telefono: usuario.telefono,
        ubicacion: usuario.ubicacion,
        imageUrl: usuario.imageUrl,
        publicId: usuario.publicId,
        _id: usuario._id,
        opcion: "editar",
      });
      setUserId(usuario._id);
    }
  }, [usuario]);

  return (
    <div className="flex flex-col gap-2 text-sm mt-4 text-segundo/80">
      <h2 className="font-bold text-xl text-segundo/80">Perfil</h2>
      <p className="text-segundo/70">
        Actualiza tu foto de perfil y datos personales aquí.
      </p>

      <div className="w-full flex items-center gap-8 mt-4">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium">Primer Nombre</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formDataUsuario.name}
            className="bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="Marcos"
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-8 mt-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium">Email</p>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formDataUsuario.email}
            className="bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="Marcos@froo.com"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium">Numero telefono</p>
          <input
            type="text"
            name="telefono"
            onChange={handleChange}
            value={formDataUsuario.telefono}
            className="bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="612 345 678"
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-8 mt-4">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium">Ubicación</p>
          <input
            type="text"
            name="ubicacion"
            value={formDataUsuario.ubicacion}
            onChange={handleChange}
            className="bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="Calle Falsa 123"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        <h3 className="text-xl font-bold">Foto de perfil</h3>
        <p className="">
          Agrega una foto de perfil para que los demas usuarios te reconozcan
          facilmente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna 1: Subir imagen */}
          <div className="h-80 relative border-2 border-dashed border-gray-300 rounded-md p-6 gap-2 flex items-center justify-center text-center">
            <div className="border border-blackbase-500/10 p-2 rounded">
              <HardDriveUpload className="w-6 h-6 text-cuarto" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-500">Arrastra y suelta</span>
              <span className="text-cuarto font-semibold cursor-pointer">
                o haz click aquí
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChangeFile(e, setFile, setPreview)}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          {/* Columna 2: Preview de imagen */}
          <div className="h-80 rounded-md flex items-center justify-center">
            {preview || formDataUsuario.imageUrl ? (
              <div className="relative w-80 h-80">
                <Image
                  src={preview || formDataUsuario.imageUrl}
                  alt="Vista previa"
                  width={700}
                  height={700}
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${preview || formDataUsuario.imageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium transition-colors"
                >
                  Ver original
                </Link>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="border border-blackbase-500/10 p-2 rounded inline-block mb-2">
                  <HardDriveUpload className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm">Vista previa</p>
                <p className="text-xs">La imagen aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex md:items-center mt-6 gap-4 flex-col md:flex-row">
        <button className="bg-segundo text-white px-5 py-3 rounded-md font-medium hover:bg-segundo/80 transition flex items-center gap-2 justify-center">
          <span>Cancelar</span>
        </button>
        <button
          className="bg-cuarto text-white px-5 py-3 rounded-md font-medium hover:bg-cuarto/80 transition flex items-center gap-2 justify-center"
          onClick={(e) =>
            handleActualizarUsuario(
              e,
              setLoading,
              setFile,
              setPreview,
              file,
              userId
            )
          }
        >
          <Check className="w-4 h-4" />
          <span>Actualizar Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default ConfigurarCuenta;
