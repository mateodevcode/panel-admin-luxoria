"use client";

import { useContext, useState } from "react";
import { HardDriveUpload, Plus } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import useColeccion from "@/hooks/useColeccion";
import Link from "next/link";
import useResetForm from "@/hooks/useResetForm";

export default function FormAgregarColeccion() {
  const { formDataColeccion } = useContext(AppContext);
  const { handleChange, handleChangeFile, handleAgregarColeccion } =
    useColeccion();
  const { resetFormData } = useResetForm();
  const [file, setFile] = useState(null);
  const [coleccionId, setColeccionId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <form className="bg-white rounded-xl p-6 text-segundo/70">
      {/* Grid Inputs */}

      <div className="w-full flex items-center gap-8 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium text-sm">Nombre de la colección</p>
          <input
            type="text"
            placeholder="Nombre de la colección"
            name="nombre"
            value={formDataColeccion.nombre}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col gap-2">
        {/* 👨‍💼 Agente */}
        <span className="font-medium text-sm">Descripción</span>
        <div className="w-full flex flex-col gap-2">
          <textarea
            type="text"
            name="descripcion"
            value={formDataColeccion.descripcion}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto colección
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna 1: Subir imagen */}
          <div className="h-80 relative border-2 border-dashed border-gray-300 rounded-md p-6 gap-2 flex items-center justify-center text-center">
            <div className="border border-segundo/10 p-2 rounded">
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
            {preview || formDataColeccion.imageUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={preview || formDataColeccion.imageUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${preview || formDataColeccion.imageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium transition-colors"
                >
                  Ver original
                </Link>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="border border-segundo/10 p-2 rounded inline-block mb-2">
                  <HardDriveUpload className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm">Vista previa</p>
                <p className="text-xs">La imagen aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4 mt-6">
        <button
          type="button"
          className="bg-segundo text-primero px-4 py-2 text-sm rounded font-medium hover:bg-segundo/80"
          onClick={() => {
            setFile(null);
            setPreview(null);
            resetFormData();
          }}
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={(e) =>
            handleAgregarColeccion(
              e,
              setLoading,
              setFile,
              setPreview,
              file,
              coleccionId
            )
          }
          className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium"
        >
          <Plus className="w-4 h-4" /> <span>Crear</span>
        </button>
      </div>
    </form>
  );
}
