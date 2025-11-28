"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import { formatDate, formatTime } from "@/libs/libs_pedidos";
import { formatoDinero } from "@/libs/formatoDinero";
import { obtenerServicio } from "@/libs/obtenerServicio";
import { Calendar, Clock, Ellipsis, ShoppingBag, Zap } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useProducto from "@/hooks/useProducto";
import Link from "next/link";

const CardProducto = ({ producto }) => {
  const { servicios } = useContext(AppContext);
  const { handlePublicar, handleEliminarProducto } = useProducto();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  const isActive = producto.isActive;
  const stockBajo = producto.stock < 5;
  const sinStock = producto.stock === 0;

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-primero shadow-sm hover:shadow-xl transition-all duration-300 hover:border-cuarto flex flex-col">
      {/* Menu Button */}
      <div className="relative z-30" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-2 right-2 p-1.5 transition-colors text-segundo/80 bg-primero/50 hover:bg-primero rounded-full"
        >
          <Ellipsis className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-2 top-10 bg-primero shadow-lg rounded-lg text-sm py-2 w-48 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href={`/admin/apps/productos/detalles-producto/${producto._id}`}
              onClick={() => setIsMenuOpen(false)}
              className="relative flex items-center gap-3 px-4 py-2 text-segundo/70 hover:text-cuarto hover:bg-gray-50 transition-colors group/item"
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r group-hover/item:scale-y-100 transition-transform duration-300"></span>
              <span>Ver</span>
            </Link>

            <Link
              href={`/admin/apps/productos/editar-producto/${producto._id}`}
              onClick={() => setIsMenuOpen(false)}
              className="relative flex items-center gap-3 px-4 py-2 text-segundo/70 hover:text-cuarto hover:bg-gray-50 transition-colors group/item"
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r group-hover/item:scale-y-100 transition-transform duration-300"></span>
              <span>Editar</span>
            </Link>

            <button
              onClick={() => {
                handleEliminarProducto(producto._id);
                setIsMenuOpen(false);
              }}
              className="w-full relative flex items-center gap-3 px-4 py-2 text-segundo/70 hover:text-red-600 hover:bg-red-50 transition-colors group/item"
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 origin-center scale-y-0 rounded-r group-hover/item:scale-y-100 transition-transform duration-300"></span>
              <span>Eliminar</span>
            </button>
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={producto.imageUrl}
          alt={producto.nombre}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <Badge
            className={`${
              isActive
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-400 hover:bg-gray-500"
            } text-primero border-0 gap-1.5 px-3 py-1.5 text-xs font-semibold`}
          >
            {isActive ? (
              <>
                <Zap className="w-3.5 h-3.5" />
                Activo
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Inactivo
              </>
            )}
          </Badge>

          {sinStock ? (
            <Badge className="bg-red-500 hover:bg-red-600 text-primero border-0 px-3 py-1.5 text-xs font-semibold">
              Sin stock
            </Badge>
          ) : stockBajo ? (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-primero border-0 px-3 py-1.5 text-xs font-semibold">
              Stock bajo
            </Badge>
          ) : null}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Header */}
        <div>
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
            {producto.nombre}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-600">
                {formatoDinero(producto.precio)}
              </span>
              {producto.servicio_id && (
                <span className="text-xs text-gray-500 line-through">
                  {formatoDinero(
                    obtenerServicio(producto.servicio_id, servicios)?.precio
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-2.5 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Stock:</span>
              <span
                className={`text-sm font-bold ${
                  sinStock
                    ? "text-red-600"
                    : stockBajo
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {producto.stock} {producto.stock !== 1 ? "unidades" : "unidad"}
              </span>
            </div>

            {producto.descripcion && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-600 font-medium">
                  Descripción:
                </span>
                <p className="text-xs text-gray-700 line-clamp-2">
                  {producto.descripcion}
                </p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>
                {formatDate(producto.createdAt)}{" "}
                <span className="text-gray-500">
                  {formatTime(producto.createdAt)}
                </span>
              </span>
            </div>
            {producto.updatedAt !== producto.createdAt && (
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs">
                  Editado: {formatDate(producto.updatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button
          onClick={() => handlePublicar(producto._id, isActive)}
          className={`w-full font-semibold transition-all duration-300 active:scale-95 ${
            isActive
              ? "bg-red-500 hover:bg-red-600 text-primero shadow-md hover:shadow-lg"
              : "bg-emerald-500 hover:bg-emerald-600 text-primero shadow-md hover:shadow-lg"
          }`}
        >
          {isActive ? "Despublicar" : "Publicar"}
        </Button>
      </div>
    </div>
  );
};

export default CardProducto;
