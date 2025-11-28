"use client";

import { AppContext } from "@/context/AppContext";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { LuSearch } from "react-icons/lu";

const SearchProductos = ({ setSearch, setColeccionFilter }) => {
  const router = useRouter();
  const { colecciones } = useContext(AppContext);
  const [coleccionSeleccionada, setColeccionSeleccionada] = useState("");

  const handleColeccionChange = (coleccionId) => {
    setColeccionSeleccionada(coleccionId);
    setColeccionFilter(coleccionId);
  };

  const clearColeccionFilter = () => {
    setColeccionSeleccionada("");
    setColeccionFilter("");
  };

  const coleccionActual = colecciones.find(
    (col) => col._id === coleccionSeleccionada
  );

  return (
    <div className="bg-primero p-6 rounded-lg w-full flex items-center justify-between gap-4 flex-col md:flex-row">
      <div className="flex items-center gap-4 flex-1 w-full">
        {/* Buscador */}
        <div className="relative flex items-center rounded-md flex-1 max-w-md">
          <div className="absolute left-3 text-segundo/50">
            <LuSearch className="text-segundo/50" />
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="focus text-segundo/80 w-full text-sm py-2 pl-9 pr-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition bg-gray-100"
            placeholder="Buscar producto por nombre..."
          />
        </div>

        {/* Filtro por Colección */}
        <div className="relative w-full md:w-64">
          <Listbox
            value={coleccionSeleccionada}
            onChange={handleColeccionChange}
          >
            {({ open }) => (
              <div>
                <Listbox.Button className="bg-gray-100 focus text-segundo/80 border border-segundo/10 w-full text-sm py-2 px-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {coleccionActual ? (
                      <>
                        <span className="capitalize">
                          {coleccionActual.nombre}
                        </span>
                      </>
                    ) : (
                      <span className="text-segundo/50">
                        Todas las colecciones
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    {coleccionSeleccionada && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          clearColeccionFilter();
                        }}
                        className="hover:bg-segundo/10 rounded-full p-0.5 transition-colors cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5 text-segundo/70" />
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 text-segundo/70" />
                  </div>
                </Listbox.Button>

                {open && (
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-segundo/10 text-segundo/70 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent">
                    {colecciones.map((coleccion) => (
                      <Listbox.Option
                        key={coleccion._id}
                        value={coleccion._id}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2 ${
                            active ? "bg-segundo/5" : ""
                          } ${
                            selected
                              ? "text-segundo bg-segundo/10 font-medium"
                              : ""
                          }`
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

      {/* Botón Agregar Producto */}
      <div>
        <button
          className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium shadow-md hover:shadow-lg"
          onClick={() => router.push("/admin/apps/productos/agregar-producto")}
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Producto</span>
        </button>
      </div>
    </div>
  );
};

export default SearchProductos;
