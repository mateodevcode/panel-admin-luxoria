"use client";

import { useContext, useState } from "react";
import { HardDriveUpload, Plus, X } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import useColeccion from "@/hooks/useColeccion";
import Link from "next/link";
import useResetForm from "@/hooks/useResetForm";
import Image from "next/image";

export default function FormAgregarColeccion() {
  const { formDataColeccion, setFormDataColeccion } = useContext(AppContext);
  const { handleChange, handleChangeFile, handleAgregarColeccion } =
    useColeccion();
  const { resetFormData } = useResetForm();

  // ✅ ARCHIVOS - Cambié de fileImgUrl a fileImg (sin Url)
  const [fileImgVer, setFileImgVer] = useState(null);
  const [previewImgUrlVer, setPreviewImgUrlVer] = useState(null);
  const [fileImgHor, setFileImgHor] = useState(null);
  const [previewImgUrlHor, setPreviewImgUrlHor] = useState(null);
  const [fileImgPortada, setFileImgPortada] = useState(null);
  const [previewImgUrlPortada, setPreviewImgUrlPortada] = useState(null);

  const [coleccionId, setColeccionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");

  const handleAgregarCaracteristica = () => {
    if (nuevaCaracteristica.trim() === "") {
      return;
    }
    setFormDataColeccion((prev) => ({
      ...prev,
      caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()],
    }));
    setNuevaCaracteristica("");
  };

  const handleEliminarCaracteristica = (index) => {
    setFormDataColeccion((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index),
    }));
  };

  const handleCancelar = () => {
    setFileImgVer(null);
    setPreviewImgUrlVer(null);
    setFileImgHor(null);
    setPreviewImgUrlHor(null);
    setFileImgPortada(null);
    setPreviewImgUrlPortada(null);
    setNuevaCaracteristica("");
    resetFormData();
  };

  return (
    <form className="bg-white rounded-xl p-6 text-segundo/70 space-y-6">
      {/* Nombre */}
      <div className="w-full flex items-center gap-8 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="font-medium text-sm">Nombre de la colección *</p>
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

      {/* Frase */}
      <div className="w-full flex flex-col gap-2">
        <span className="font-medium text-sm">Frase descriptiva *</span>
        <input
          name="frase"
          value={formDataColeccion.frase}
          onChange={handleChange}
          placeholder="Una frase corta y atractiva sobre la colección"
          rows="2"
          className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
        />
      </div>

      {/* Características */}
      <div className="w-full flex flex-col gap-2">
        <span className="font-medium text-sm">Características *</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={nuevaCaracteristica}
            onChange={(e) => setNuevaCaracteristica(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleAgregarCaracteristica()
            }
            placeholder="Escribe una característica y presiona Enter"
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
          <button
            type="button"
            onClick={handleAgregarCaracteristica}
            className="bg-cuarto hover:bg-cuarto/80 text-primero px-4 py-2 rounded font-medium transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de características */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formDataColeccion.caracteristicas.map((caracteristica, index) => (
            <div
              key={index}
              className="bg-cuarto/10 border border-cuarto/30 text-segundo/70 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              <span>{caracteristica}</span>
              <button
                type="button"
                onClick={() => handleEliminarCaracteristica(index)}
                className="hover:text-cuarto transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload image URL Vertical */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto colección Vertical
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
              onChange={(e) =>
                handleChangeFile(e, setFileImgVer, setPreviewImgUrlVer)
              }
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          {/* Columna 2: Preview de imagen */}
          <div className="h-80 rounded-md flex items-center justify-center">
            {previewImgUrlVer || formDataColeccion.imageUrlVer ? (
              <div className="relative w-full h-full">
                <Image
                  src={previewImgUrlVer || formDataColeccion.imageUrlVer}
                  alt="Vista previa"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${previewImgUrlVer || formDataColeccion.imageUrlVer}`}
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

      {/* File Upload image URL Horizontal */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto colección Horizontal
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
              onChange={(e) =>
                handleChangeFile(e, setFileImgHor, setPreviewImgUrlHor)
              }
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          {/* Columna 2: Preview de imagen */}
          <div className="h-80 rounded-md flex items-center justify-center">
            {previewImgUrlHor || formDataColeccion.imageUrlHor ? (
              <div className="relative w-full h-full">
                <Image
                  src={previewImgUrlHor || formDataColeccion.imageUrlHor}
                  alt="Vista previa"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${previewImgUrlHor || formDataColeccion.imageUrlHor}`}
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

      {/* File Upload image URL Portada */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto colección Portada
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
              onChange={(e) =>
                handleChangeFile(e, setFileImgPortada, setPreviewImgUrlPortada)
              }
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          {/* Columna 2: Preview de imagen */}
          <div className="h-80 rounded-md flex items-center justify-center">
            {previewImgUrlPortada || formDataColeccion.imageUrlPortada ? (
              <div className="relative w-full h-full">
                <Image
                  src={
                    previewImgUrlPortada || formDataColeccion.imageUrlPortada
                  }
                  alt="Vista previa"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${
                    previewImgUrlPortada || formDataColeccion.imageUrlPortada
                  }`}
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

      {/* Estado Activo */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={formDataColeccion.isActive}
          onChange={handleChange}
          className="w-5 h-5 border border-segundo/10 rounded focus:ring-1 focus:ring-cuarto cursor-pointer"
        />
        <label
          htmlFor="isActive"
          className="font-medium text-sm cursor-pointer"
        >
          Colección activa
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4 mt-6">
        <button
          type="button"
          className="bg-segundo text-primero px-4 py-2 text-sm rounded font-medium hover:bg-segundo/80"
          onClick={handleCancelar}
        >
          Cancelar
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={(e) =>
            handleAgregarColeccion(
              e,
              setLoading,
              setFileImgVer,
              setFileImgHor,
              setFileImgPortada,
              setPreviewImgUrlVer,
              setPreviewImgUrlHor,
              setPreviewImgUrlPortada,
              fileImgVer,
              fileImgHor,
              fileImgPortada,
              coleccionId
            )
          }
          className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />{" "}
          <span>
            {loading
              ? "Guardando..."
              : formDataColeccion.opcion === "crear"
              ? "Crear"
              : "Actualizar"}
          </span>
        </button>
      </div>
    </form>
  );
}
