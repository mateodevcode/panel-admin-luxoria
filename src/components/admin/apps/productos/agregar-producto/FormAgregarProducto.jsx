"use client";

import { useContext, useState } from "react";
import { HardDriveUpload, Plus, X } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import useProducto from "@/hooks/useProducto";
import Link from "next/link";
import useResetForm from "@/hooks/useResetForm";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { buscarColeccion } from "@/libs/buscarColeccion";
import { sizesLetras, sizesNumeros } from "@/data/sizesProductos";
import { tipoProducto } from "@/data/data.tipo";
import Image from "next/image";

export default function FormAgregarProducto() {
  const { formDataProducto, setFormDataProducto, colecciones } =
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

  return (
    <form className="bg-primero rounded-xl p-6 text-segundo/70">
      {/* Grid Inputs */}

      <div className="w-full flex items-center gap-8 flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/2">
          <span className="font-medium text-sm">Seleciona una colección</span>
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
                            ).nombre
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
                    <Listbox.Options
                      className="absolute z-10 mt-2 w-full bg-primero border border-segundo/10 text-segundo/70 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent"
                    >
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
                  : coleccionSeleccionada?.isActive === null
                  ? "text-red-400"
                  : "text-red-400"
              }`}
            >
              {coleccionSeleccionada?.isActive === true && "Activo"}
              {coleccionSeleccionada?.isActive === false && "Inactivo"}
              {coleccionSeleccionada === null && "Selecciona una colección"}
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
        {/* 👨‍💼 Agente */}
        <span className="font-medium text-sm">Descripción</span>
        <div className="w-full flex flex-col gap-2">
          <textarea
            type="text"
            name="descripcion"
            value={formDataProducto.descripcion}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col gap-2">
        {/* 👨‍💼 Agente */}
        <span className="font-medium text-sm">Detalles</span>
        <div className="w-full flex flex-col gap-2">
          <textarea
            type="text"
            name="detalles"
            value={formDataProducto.detalles}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
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

      {/* Etiquetas */}
      <div className="w-full flex flex-col gap-2 mt-6">
        <p className="font-medium text-sm">Etiquetas</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {formDataProducto.etiquetas.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-cuarto/10 text-cuarto text-xs font-medium rounded-full border border-cuarto/20 flex items-center gap-2"
            >
              {tag}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => {
                  const newTags = formDataProducto.etiquetas.filter(
                    (_, i) => i !== index
                  );
                  setFormDataProducto({
                    ...formDataProducto,
                    etiquetas: newTags,
                  });
                }}
              />
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Agregar etiqueta (presiona Enter)"
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = e.target.value.trim();
                if (value && !formDataProducto.etiquetas.includes(value)) {
                  setFormDataProducto({
                    ...formDataProducto,
                    etiquetas: [...formDataProducto.etiquetas, value],
                  });
                  e.target.value = "";
                }
              }
            }}
          />
        </div>
      </div>

      {/* Tipo */}
      <div className="flex flex-col w-full md:w-1/2 mt-6">
        <span className="font-medium text-sm">Seleciona un tipo</span>
        <div className="relative flex-1 rounded-sm mt-6">
          <Listbox
            value={formDataProducto.tipo}
            onChange={(tipo) =>
              setFormDataProducto((prev) => ({ ...prev, tipo }))
            }
          >
            {({ open }) => (
              <div>
                <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition">
                  {formDataProducto.tipo ? (
                    <div className="flex items-center gap-3">
                      <span className="capitalize">
                        {formDataProducto.tipo}
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
                  <Listbox.Options
                    className="absolute z-10 mt-2 w-full bg-primero border border-segundo/10 text-segundo/70 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent"
                  >
                    {tipoProducto.map((tipoPro, index) => (
                      <Listbox.Option
                        key={index}
                        value={tipoPro}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2 ${
                            active ? "bg-segundo/5" : ""
                          } ${selected ? "text-segundo bg-segundo/10" : ""}`
                        }
                      >
                        {tipoPro}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </div>
            )}
          </Listbox>
        </div>
      </div>

      {/* Descuento y Checkboxes */}
      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <p className="font-medium text-sm">Descuento (%)</p>
          <input
            type="number"
            placeholder="Descuento"
            name="descuento"
            min="0"
            max="100"
            value={formDataProducto.descuento}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPopular"
              name="isPopular"
              checked={formDataProducto.isPopular}
              onChange={(e) =>
                setFormDataProducto({
                  ...formDataProducto,
                  isPopular: e.target.checked,
                })
              }
              className="w-4 h-4 text-cuarto bg-transparent border-segundo/10 rounded focus:ring-cuarto focus:ring-2 cursor-pointer"
            />
            <label
              htmlFor="isPopular"
              className="text-sm font-medium text-segundo/70 cursor-pointer"
            >
              Producto Popular
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isOferta"
              name="isOferta"
              checked={formDataProducto.isOferta}
              onChange={(e) =>
                setFormDataProducto({
                  ...formDataProducto,
                  isOferta: e.target.checked,
                })
              }
              className="w-4 h-4 text-cuarto bg-transparent border-segundo/10 rounded focus:ring-cuarto focus:ring-2 cursor-pointer"
            />
            <label
              htmlFor="isOferta"
              className="text-sm font-medium text-segundo/70 cursor-pointer"
            >
              En Oferta
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-8 flex-col md:flex-row mt-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-20">
            <p className="font-medium text-sm">Tamaños</p>
            <div className="flex gap-4 text-xs">
              <button
                className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-sky-600/50 select-none text-primero ${
                  sizeSelected === "letras" ? "bg-sky-600/50" : "bg-sky-600"
                }`}
                type="button"
                onClick={() => setSizeSelected("letras")}
              >
                Por letras
              </button>
              <button
                className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-sky-600/50 select-none text-primero ${
                  sizeSelected === "numeros" ? "bg-sky-600/50" : "bg-sky-600"
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
            {sizeSelected === "letras" ? (
              <>
                {sizesLetras.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/80 select-none text-segundo transition-all ${
                      formDataProducto.size.includes(size)
                        ? "bg-tercero"
                        : "bg-tercero/50"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </>
            ) : (
              <>
                {sizesNumeros.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`py-1 px-2 rounded font-medium cursor-pointer hover:bg-tercero/80 select-none text-segundo transition-all ${
                      formDataProducto.size.includes(size)
                        ? "bg-tercero"
                        : "bg-tercero/50"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </>
            )}
          </div>
          <input
            type="text"
            placeholder="size"
            name="Selecciona los tamaños"
            value={formDataProducto.size}
            onChange={handleChange}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          Agregar foto principal
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
            {preview || formDataProducto.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={preview || formDataProducto.imageUrl}
                  alt="Vista previa"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-md"
                />
                <Link
                  href={`${preview || formDataProducto.imageUrl}`}
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

      {/* Multi-Image Upload */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500 font-medium">
            Galería de imágenes del producto
          </p>
          <span className="text-xs text-gray-400">
            {multipleFiles.length} / 10 imágenes
          </span>
        </div>

        {/* Upload Zone */}
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
                Máximo 10 imágenes, 10MB cada una
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

        {/* Preview Grid */}
        {multiplePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {multiplePreviews.map((preview, index) => (
              <div
                key={index}
                className="relative group rounded-md overflow-hidden border border-gray-200 hover:border-cuarto transition-colors"
              >
                <Image
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleDeletePreviewImage(
                      index,
                      setMultipleFiles,
                      setMultiplePreviews
                    )
                  }
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
              setMultiplePreviews
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
