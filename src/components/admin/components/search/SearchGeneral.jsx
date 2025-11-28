"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Layers, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SearchGeneral = ({ searchQuery, onClose }) => {
  const { productos, colecciones } = useContext(AppContext);
  const router = useRouter();
  const searchRef = useRef(null);

  // Filtrar productos
  const productosFiltrados =
    productos?.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Filtrar colecciones
  const coleccionesFiltradas =
    colecciones?.filter((coleccion) =>
      coleccion.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const totalResultados =
    productosFiltrados.length + coleccionesFiltradas.length;

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleProductClick = (id) => {
    router.push(`/admin/apps/productos/detalles-producto/${id}`);
    onClose();
  };

  const handleColeccionClick = (id) => {
    router.push(`/admin/apps/colecciones/detalles-coleccion/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={searchRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-2xl border border-segundo/10 max-h-[80vh] overflow-y-auto z-50"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-segundo/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-cuarto" />
            <span className="text-sm font-semibold text-segundo">
              {totalResultados} resultado{totalResultados !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-segundo/60 hover:text-segundo transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4">
          {totalResultados === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-segundo/20 mx-auto mb-3" />
              <p className="text-segundo/60 text-sm">
                No se encontraron resultados para "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Productos */}
              {productosFiltrados.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-cuarto" />
                    <h3 className="text-sm font-bold text-segundo">
                      Productos
                    </h3>
                    <span className="text-xs text-segundo/50">
                      {productosFiltrados.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {productosFiltrados.slice(0, 5).map((producto, index) => (
                      <motion.div
                        key={producto._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        onClick={() => handleProductClick(producto._id)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-segundo/5 cursor-pointer transition-colors border border-transparent hover:border-cuarto/20"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          {producto.imageUrl ? (
                            <Image
                              src={producto.imageUrl}
                              alt={producto.nombre}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-segundo/30" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-segundo truncate">
                            {producto.nombre}
                          </p>
                          <p className="text-xs text-segundo/60">
                            ${producto.precio?.toLocaleString()} • Stock:{" "}
                            {producto.stock}
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            producto.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {producto.isActive ? "Activo" : "Inactivo"}
                        </div>
                      </motion.div>
                    ))}
                    {productosFiltrados.length > 5 && (
                      <button
                        onClick={() => {
                          router.push("/admin/apps/productos/lista-productos");
                          onClose();
                        }}
                        className="w-full text-center py-2 text-xs text-cuarto hover:text-cuarto/80 font-medium transition-colors"
                      >
                        Ver todos los productos ({productosFiltrados.length})
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Colecciones */}
              {coleccionesFiltradas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-cuarto" />
                    <h3 className="text-sm font-bold text-segundo">
                      Colecciones
                    </h3>
                    <span className="text-xs text-segundo/50">
                      {coleccionesFiltradas.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {coleccionesFiltradas
                      .slice(0, 5)
                      .map((coleccion, index) => (
                        <motion.div
                          key={coleccion._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                          onClick={() => handleColeccionClick(coleccion._id)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-segundo/5 cursor-pointer transition-colors border border-transparent hover:border-cuarto/20"
                        >
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            {coleccion.imageUrl ? (
                              <Image
                                src={coleccion.imageUrl}
                                alt={coleccion.nombre}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Layers className="w-6 h-6 text-segundo/30" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-segundo truncate">
                              {coleccion.nombre}
                            </p>
                            <p className="text-xs text-segundo/60 line-clamp-1">
                              {coleccion.descripcion || "Sin descripción"}
                            </p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              coleccion.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {coleccion.isActive ? "Activa" : "Inactiva"}
                          </div>
                        </motion.div>
                      ))}
                    {coleccionesFiltradas.length > 5 && (
                      <button
                        onClick={() => {
                          router.push(
                            "/admin/apps/colecciones/lista-colecciones"
                          );
                          onClose();
                        }}
                        className="w-full text-center py-2 text-xs text-cuarto hover:text-cuarto/80 font-medium transition-colors"
                      >
                        Ver todas las colecciones ({coleccionesFiltradas.length}
                        )
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchGeneral;
