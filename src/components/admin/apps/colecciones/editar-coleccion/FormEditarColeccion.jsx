"use client";

import { useContext, useEffect, useState } from "react";
import { Check, HardDriveUpload, Plus } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import useColeccion from "@/hooks/useColeccion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FormEditarColeccion({ id }) {
  const { formDataColeccion, setFormDataColeccion, colecciones } =
    useContext(AppContext);
  const { handleChange, handleChangeFile, handleAgregarColeccion } =
    useColeccion();
  const [coleccioId, setColeccionId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id && colecciones.length > 0) {
      const coleccioEncontrada = colecciones.find((col) => col._id === id);

      if (coleccioEncontrada) {
        setColeccionId(id);
        setFormDataColeccion({
          ...coleccioEncontrada,
          opcion: "editar",
        });
      }
    }
  }, [id, colecciones]);

  return (
    <form className="bg-primero rounded-xl p-6 text-segundo/70 w-full md:w-[65%]">
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

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              name="isActive"
              checked={formDataColeccion.isActive}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer appearance-none bg-primero border border-segundo/20 rounded transition hover:border-segundo/40 checked:bg-cuarto checked:border-cuarto focus:ring-2 focus:ring-cuarto focus:ring-offset-2 focus:ring-offset-primero"
            />
            {formDataColeccion.isActive && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-segundo pointer-events-none" />
            )}
          </div>
          <label className="flex flex-col cursor-pointer flex-1">
            <span className="font-medium text-sm text-segundo">
              Estado de la colección
            </span>
            <span className="text-xs text-segundo/70">
              {formDataColeccion.isActive
                ? "Colección activa"
                : "Colección inactiva"}
            </span>
          </label>
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col gap-2">
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

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto colección
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="h-80 rounded-md flex items-center justify-center">
            {preview || formDataColeccion.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={preview || formDataColeccion.imageUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-md"
                  width={500}
                  height={500}
                  loading="eager"
                />
                <Link
                  href={`${preview || formDataColeccion.imageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-primero/80 hover:bg-primero text-gray-700 px-2 py-1 rounded text-xs font-medium transition-colors"
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

      <div className="flex md:items-center gap-4 pt-4 mt-6 flex-col md:flex-row">
        <button
          type="button"
          className="bg-segundo text-primero px-4 py-2 text-sm rounded font-medium hover:bg-segundo/80"
          onClick={() => router.back()}
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
              coleccioId
            )
          }
          className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium"
        >
          <span>Guardar cambios</span>
        </button>
      </div>
    </form>
  );
}
