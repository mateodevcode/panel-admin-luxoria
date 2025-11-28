"use client";

import React, { useContext, useEffect, useState } from "react";
import { HardDriveUpload, Plus, X, Trash2 } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import useProducto from "@/hooks/useProducto";
import useResetForm from "@/hooks/useResetForm";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { buscarColeccion } from "@/libs/buscarColeccion";
import { sizesLetras, sizesNumeros } from "@/data/sizesProductos";

export default function FormEditarProducto({ id }) {
  const { formDataProducto, setFormDataProducto, colecciones, productos } =
    useContext(AppContext);
  const {
    handleChange,
    handleChangeFile,
    handleChangeMultipleFiles,
    handleDeletePreviewImage,
    handleAgregarProducto,
    handleSizeClick,
  } = useProducto();
  const { resetFormData } = useResetForm();
  const [file, setFile] = useState(null);
  const [productoId, setProductoId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [multiplePreviews, setMultiplePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizeSelected, setSizeSelected] = useState("letras");

  const coleccionSeleccionada = buscarColeccion(
    formDataProducto.coleccionId,
    colecciones
  );
  const colorIsActive =
    coleccionSeleccionada?.isActive === true
      ? "bg-green-100 text-green-600 border-green-600"
      : "bg-red-100 text-red-600 border-red-600";
  const colorIsActive2 =
    coleccionSeleccionada?.isActive === true ? "bg-green-600" : "bg-red-600";

  // Cargar producto existente
  useEffect(() => {
    if (id && productos.length > 0) {
      const productoEncontrado = productos.find((col) => col._id === id);

      if (productoEncontrado) {
        setProductoId(id);
        setFormDataProducto({
          ...productoEncontrado,
          opcion: "editar",
        });

        // Cargar imagen principal
        if (productoEncontrado.imageUrl) {
          setPreview(productoEncontrado.imageUrl);
        }

        // Cargar galería de imágenes existentes
        if (
          productoEncontrado.imagenes &&
          productoEncontrado.imagenes.length > 0
        ) {
          const existingPreviews = productoEncontrado.imagenes.map(
            (img, index) => ({
              url: img.url,
              name: img.publicId || `Imagen ${index + 1}`,
              publicId: img.publicId,
              isExisting: true,
            })
          );
          setExistingImages(existingPreviews);
        }
      }
    }
  }, [id, productos]);

  // Eliminar imagen existente
  const handleDeleteExistingImage = (publicId, index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setImagesToDelete((prev) => [...prev, publicId]);
  };

  // Eliminar imagen nueva
  const handleDeleteNewImage = (index) => {
    setMultipleFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMultiplePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index].url);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const totalImages = existingImages.length + multipleFiles.length;

  return (
    <form className="bg-primero rounded-xl p-6 text-segundo/70">
      {/* Grid Inputs */}
      <div className="w-full flex items-center gap-8 flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/2">
          <span className="font-medium text-sm">Selecciona una colección</span>
          <div className="relative flex-1 rounded-sm mt-2">
            <Listbox
              value={formDataProducto.coleccionId}
              onChange={(coleccionId) =>
                setFormDataProducto((prev) => ({ ...prev, coleccionId }))
              }
            >
              {({ open }) => (
                <div>
                  <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition">
                    {formDataProducto.coleccionId ? (
                      <div className="flex items-center gap-3">
                        <span className="capitalize">
                          {
                            buscarColeccion(
                              formDataProducto.coleccionId,
                              colecciones
                            )?.nombre
                          }
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-3">
                        Selecciona una colección
                      </span>
                    )}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-segundo/70" />
                    </span>
                  </Listbox.Button>

                  {open && (
                    <Listbox.Options className="absolute z-10 mt-2 w-full bg-primero border border-segundo/10 text-segundo/70 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                      {colecciones.map((coleccion, index) => (
                        <Listbox.Option
                          key={index}
                          value={coleccion._id}
                          className={({ active, selected }) =>
                            `cursor-pointer px-4 py-2 ${
                              active ? "bg-segundo/5" : ""
                            } ${selected ? "text-segundo bg-segundo/10" : ""}`
                          }
                        >
                          {coleccion.nombre}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </div>
              )}
            </Listbox>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm text-segundo">
            Estado de la colección
          </p>
          <div
            className={`h-14 flex items-center gap-3 px-4 border ${colorIsActive} rounded-md`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${colorIsActive2} animate-pulse`}
            ></div>
            <span
              className={`text-sm font-medium ${
                coleccionSeleccionada?.isActive === true
                  ? "text-green-400"
                  : coleccionSeleccionada?.isActive === false
                  ? "text-red-400"
                  : "text-red-400"
              }`}
            >
              {coleccionSeleccionada?.isActive === true && "Activo"}
              {coleccionSeleccionada?.isActive === false && "Inactivo"}
              {!coleccionSeleccionada && "Selecciona una colección"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm">Nombre del producto</p>
          <input
            type="text"
            placeholder="Nombre del producto"
            name="nombre"
            value={formDataProducto.nombre}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col gap-2">
        <span className="font-medium text-sm">Descripción</span>
        <textarea
          name="descripcion"
          value={formDataProducto.descripcion}
          onChange={handleChange}
          className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
        />
      </div>

      <div className="w-full mt-6 flex flex-col gap-2">
        <span className="font-medium text-sm">Detalles</span>
        <textarea
          name="detalles"
          value={formDataProducto.detalles}
          onChange={handleChange}
          className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
        />
      </div>

      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm">Frase</p>
          <input
            type="text"
            placeholder="Frase"
            name="frase"
            value={formDataProducto.frase}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm">Precio</p>
          <input
            type="number"
            placeholder="Precio"
            name="precio"
            value={formDataProducto.precio}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm">Stock</p>
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={formDataProducto.stock}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Tamaños */}
      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-20">
            <p className="font-medium text-sm">Tamaños</p>
            <div className="flex gap-4 text-xs">
              <button
                className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/50 select-none ${
                  sizeSelected === "letras" ? "bg-tercero/50" : "bg-tercero"
                }`}
                type="button"
                onClick={() => setSizeSelected("letras")}
              >
                Por letras
              </button>
              <button
                className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/50 select-none ${
                  sizeSelected === "numeros" ? "bg-tercero/50" : "bg-tercero"
                }`}
                type="button"
                onClick={() => setSizeSelected("numeros")}
              >
                Por números
              </button>
              <button
                className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-cuarto/50 text-primero select-none ${
                  sizeSelected === "" ? "bg-cuarto/50" : "bg-cuarto"
                }`}
                type="button"
                onClick={() => {
                  setSizeSelected("");
                  setFormDataProducto({
                    ...formDataProducto,
                    size: [],
                  });
                }}
              >
                Limpiar
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizeSelected === "letras"
              ? sizesLetras.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/50 select-none ${
                      formDataProducto.size.includes(size)
                        ? "bg-tercero/50"
                        : "bg-tercero"
                    }`}
                  >
                    {size}
                  </div>
                ))
              : sizesNumeros.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/50 select-none ${
                      formDataProducto.size.includes(size)
                        ? "bg-tercero/50"
                        : "bg-tercero"
                    }`}
                  >
                    {size}
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* File Upload - Imagen Principal */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto principal
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
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-md"
                />
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

      {/* Multi-Image Upload - Galería */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium">
            Galería de imágenes del producto
          </p>
          <span className="text-xs text-gray-400">
            {totalImages} / 10 imágenes
          </span>
        </div>

        {/* Imágenes Existentes */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Imágenes actuales
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {existingImages.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-md overflow-hidden border border-gray-200 hover:border-red-400 transition-colors"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteExistingImage(img.publicId, index)
                    }
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-primero p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar imagen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-primero text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    Actual
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Zone para nuevas imágenes */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 hover:border-cuarto transition-colors">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="border border-segundo/10 p-2 rounded">
              <HardDriveUpload className="w-6 h-6 text-cuarto" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">
                Arrastra y suelta múltiples imágenes
              </span>
              <span className="text-cuarto font-semibold cursor-pointer">
                o haz click aquí para seleccionar
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Máximo 10 imágenes totales, 10MB cada una
              </span>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              handleChangeMultipleFiles(
                e,
                setMultipleFiles,
                setMultiplePreviews
              )
            }
            className="absolute opacity-0 w-full h-full cursor-pointer inset-0"
          />
        </div>

        {/* Preview de nuevas imágenes */}
        {multiplePreviews.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Nuevas imágenes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {multiplePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group rounded-md overflow-hidden border border-gray-200 hover:border-cuarto transition-colors"
                >
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-primero p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar imagen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-primero text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {preview.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4 mt-6">
        <button
          type="button"
          className="bg-segundo text-primero px-4 py-2 text-sm rounded font-medium hover:bg-segundo/80"
          onClick={() => {
            setFile(null);
            setPreview(null);
            setMultipleFiles([]);
            setMultiplePreviews([]);
            setExistingImages([]);
            setImagesToDelete([]);
            resetFormData();
          }}
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={(e) =>
            handleAgregarProducto(
              e,
              setLoading,
              setFile,
              setPreview,
              file,
              productoId,
              multipleFiles,
              setMultipleFiles,
              setMultiplePreviews,
              imagesToDelete
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
