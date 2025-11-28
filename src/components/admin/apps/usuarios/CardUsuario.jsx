"use client";

import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useUsuario from "@/hooks/useUsuario";

const CardUsuario = ({ usuario }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const { handleActualizarUsuario } = useUsuario();
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleMenu = (barberId) => {
    setOpenMenuId(openMenuId === barberId ? null : barberId);
  };

  // Clases para los badges
  const getBadgeClasses = (type, value) => {
    const baseClasses =
      "px-2 py-1 rounded-full text-xs font-semibold capitalize";

    const variants = {
      estado: {
        activo: "bg-emerald-100 text-emerald-800",
        inactivo: "bg-gray-100 text-gray-800",
        pendiente: "bg-blue-100 text-blue-800",
      },
      role: {
        admin: "bg-red-100 text-red-800",
        user: "bg-blue-100 text-blue-800",
        moderator: "bg-purple-100 text-purple-800",
      },
    };

    return `${baseClasses} ${
      variants[type]?.[value] || "bg-gray-100 text-gray-800"
    }`;
  };

  return (
    <div className="bg-primero rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header de la card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-primero relative">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {usuario.imageUrl ? (
              <Image
                src={usuario.imageUrl}
                alt={usuario.name}
                width={500}
                height={500}
                className="w-16 h-16 rounded-full object-cover border-2 border-primero"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primero/20 flex items-center justify-center text-2xl font-bold">
                {usuario.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{usuario.name}</h3>
            <p className="text-blue-100 text-sm truncate">{usuario.email}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className={getBadgeClasses("estado", usuario.estado)}>
                {usuario.estado}
              </span>
              <span className={getBadgeClasses("role", usuario.role)}>
                {usuario.role}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-4">
          <div className="relative">
            <button
              onClick={() => toggleMenu(usuario._id)}
              className="p-1 hover:text-primero transition-colors text-primero/80"
            >
              <Ellipsis className="w-6 h-6" />
            </button>
            {openMenuId === usuario._id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 bg-primero shadow-md rounded-md text-sm py-4 z-30 w-40 space-y-2"
              >
                <div
                  className="relative w-full flex items-center gap-2 pl-4 py-1 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
                  onClick={() => {
                    if (usuario.estado === "activo") {
                      handleActualizarUsuario(usuario._id, "inactivo");
                    } else {
                      handleActualizarUsuario(usuario._id, "activo");
                    }
                  }}
                >
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
                  <span className="text-sm">
                    {usuario.estado === "activo" ? "Inactivar" : "Activar"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="p-4 space-y-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Teléfono:</span>
          <span className="text-sm text-gray-900">
            {usuario.telefono || "No proporcionado"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Ubicación:</span>
          <span className="text-sm text-gray-900 text-right">
            {usuario.ubicacion || "No especificada"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Desde:</span>
          <span className="text-sm text-gray-900 text-right">
            {formatDate(usuario.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUsuario;
