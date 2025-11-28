"use client";

import {
  Bolt,
  FileText,
  DollarSign,
  Package,
  Calendar,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { LuUserSearch } from "react-icons/lu";
import { formatoDinero } from "@/libs/formatoDinero";
import { formatDate, formatTime } from "@/libs/libs_pedidos";

const DetalleCard = ({ id }) => {
  const { productos } = useContext(AppContext);
  const productoSeleccionado = productos?.find((prod) => prod._id === id) || {};
  const [imagenPrincipalIndex, setImagenPrincipalIndex] = useState(0);

  if (!id) {
    return (
      <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] aspect-square flex flex-col font-poppins h-[50svh] items-center justify-center text-segundo">
        <div className="w-20 h-20 rounded-full bg-cuarto/10 flex items-center justify-center mb-2">
          <LuUserSearch className="text-4xl text-cuarto" />
        </div>
        <span className="font-medium text-xl md:text-2xl text-segundo/70">
          Selecciona un producto.
        </span>
      </div>
    );
  }

  const galeria = productoSeleccionado.imagenes || [];

  return (
    <div className="bg-primero rounded-lg p-6 w-full md:w-[65%] flex flex-col font-poppins gap-6 overflow-y-auto max-h-[80vh]">
      {/* Título */}
      <div>
        <h3 className="font-bold text-segundo text-2xl">
          {productoSeleccionado.nombre}
        </h3>
        <p className="text-sm text-segundo/60 mt-1">
          ID: {productoSeleccionado._id}
        </p>
      </div>

      {/* Imagen Principal */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={productoSeleccionado.imageUrl || "/productos/producto.png"}
            alt={productoSeleccionado.nombre || "Producto"}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            Imagen Principal
          </div>
        </div>
      </div>

      {/* Galería de Imágenes */}
      {galeria && galeria.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-segundo flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cuarto" />
            Galería ({galeria.length} imágenes)
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {galeria.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-cuarto transition-all"
                onClick={() => setImagenPrincipalIndex(index)}
              >
                <Image
                  src={img.url}
                  alt={`Galería ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">
                    Ver grande
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Descripción */}
      {productoSeleccionado.descripcion && (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-segundo flex items-center gap-2">
            <FileText className="w-4 h-4 text-cuarto" />
            Descripción
          </h4>
          <p className="text-sm text-segundo/70 leading-relaxed">
            {productoSeleccionado.descripcion}
          </p>
        </div>
      )}

      {/* Detalles */}
      {productoSeleccionado.detalles && (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-segundo flex items-center gap-2">
            <FileText className="w-4 h-4 text-cuarto" />
            Detalles
          </h4>
          <p className="text-sm text-segundo/70 leading-relaxed">
            {productoSeleccionado.detalles}
          </p>
        </div>
      )}

      {/* Frase */}
      {productoSeleccionado.frase && (
        <div className="bg-cuarto/10 p-4 rounded-lg border border-cuarto/20">
          <p className="text-sm italic text-cuarto font-medium">
            "{productoSeleccionado.frase}"
          </p>
        </div>
      )}

      {/* Información Comercial */}
      <div className="grid grid-cols-2 gap-3 border-t border-segundo/20 pt-4">
        {/* Precio */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-segundo/80 text-sm flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-cuarto" />
            Precio
          </h4>
          <p className="text-lg font-bold text-cuarto">
            {formatoDinero(productoSeleccionado.precio)}
          </p>
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-segundo/80 text-sm flex items-center gap-2">
            <Package className="w-4 h-4 text-cuarto" />
            Stock
          </h4>
          <p
            className={`text-lg font-bold ${
              productoSeleccionado.stock === 0
                ? "text-red-500"
                : productoSeleccionado.stock < 5
                ? "text-amber-500"
                : "text-emerald-500"
            }`}
          >
            {productoSeleccionado.stock} unidades
          </p>
        </div>
      </div>

      {/* Tamaños */}
      {productoSeleccionado.size && productoSeleccionado.size.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-segundo/80 text-sm">Tamaños</h4>
          <div className="flex flex-wrap gap-2">
            {productoSeleccionado.size.map((size, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-cuarto/10 text-cuarto text-xs font-medium rounded-full border border-cuarto/20"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Estado */}
      <div className="flex flex-col gap-2 border-t border-segundo/20 pt-4">
        <h4 className="font-semibold text-segundo/80 text-sm flex items-center gap-2">
          <Bolt className="w-4 h-4 text-cuarto" />
          Estado
        </h4>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              productoSeleccionado.isActive ? "bg-emerald-500" : "bg-red-500"
            } animate-pulse`}
          />
          <span className="text-sm font-medium text-segundo/70">
            {productoSeleccionado.isActive ? "Publicado" : "No publicado"}
          </span>
        </div>
      </div>

      {/* Fechas */}
      <div className="flex flex-col gap-3 border-t border-segundo/20 pt-4 text-xs">
        <div className="flex items-center gap-2 text-segundo/70">
          <Calendar className="w-4 h-4 text-cuarto" />
          <span>
            Creado: {formatDate(productoSeleccionado.createdAt)}{" "}
            <span className="text-segundo/50">
              {formatTime(productoSeleccionado.createdAt)}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-segundo/70">
          <Clock className="w-4 h-4 text-cuarto" />
          <span>
            Actualizado: {formatDate(productoSeleccionado.updatedAt)}{" "}
            <span className="text-segundo/50">
              {formatTime(productoSeleccionado.updatedAt)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetalleCard;
