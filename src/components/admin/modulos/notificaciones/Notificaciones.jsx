"use client";

import useNotificaciones from "@/hooks/useNotificaciones";
import { formatearFechaCorta, formatearHora } from "@/libs/formatearFechaCorta";
import { separarDosFrases } from "@/libs/separarDosFrases";
import { Clock4, Trash2, MoreVertical } from "lucide-react";
import { useContext, useState } from "react";
import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "@/context/AppContext";

export function Notificaciones() {
  const { usuario } = useContext(AppContext);
  const { notificaciones } = usuario || {};
  const { handleActualizarNotificacion } = useNotificaciones();
  const [openMenuId, setOpenMenuId] = useState(null);

  const NotificacionesInvertidas = notificaciones
    ? [...notificaciones].reverse()
    : [];

  const totalNotificacionesNoLeidas = notificaciones
    ? notificaciones.filter((n) => n.leido === false).length
    : 0;

  return (
    <div className="p-3 md:p-6 text-blackbase-500 font-poppins">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Notificaciones</h1>
          {totalNotificacionesNoLeidas > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 py-1.5 rounded-full shadow-lg"
            >
              {totalNotificacionesNoLeidas}{" "}
              {totalNotificacionesNoLeidas > 1 ? "nuevas" : "nueva"}
            </motion.span>
          )}
        </div>
        <p className="text-blackbase-500/60 text-sm">
          {totalNotificacionesNoLeidas > 0
            ? `Tienes ${totalNotificacionesNoLeidas} notificación${
                totalNotificacionesNoLeidas > 1 ? "es" : ""
              } sin leer`
            : "Todas tus notificaciones están al día"}
        </p>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-2">
        {NotificacionesInvertidas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 bg-blackbase-500/5 rounded-full flex items-center justify-center mb-4">
              <MdOutlineNotificationsNone className="text-3xl text-blackbase-500/30" />
            </div>
            <p className="text-blackbase-500/60 font-medium">
              No tienes notificaciones
            </p>
            <p className="text-blackbase-500/40 text-sm mt-1">
              Volveremos aquí cuando tengas algo nuevo
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {NotificacionesInvertidas?.map((item, index) => {
              const esNoLeida = item.leido === false;

              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${
                    esNoLeida
                      ? "border-blue-200 bg-gradient-to-r from-blue-50 to-white shadow-md hover:shadow-lg hover:border-blue-300"
                      : "border-blackbase-500/10 bg-white hover:border-blackbase-500/20 hover:shadow-sm"
                  }`}
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
                      esNoLeida
                        ? "bg-gradient-to-b from-blue-600 to-blue-400"
                        : "bg-blackbase-500/5"
                    }`}
                  ></div>

                  <div className="flex items-start justify-between p-4 pl-5">
                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-sm transition-all ${
                                esNoLeida
                                  ? "font-bold text-blackbase-500"
                                  : "font-semibold text-blackbase-500/80"
                              }`}
                            >
                              {separarDosFrases(item.mensaje).primera}
                            </span>

                            {esNoLeida && (
                              <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2.5 h-2.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex-shrink-0"
                              ></motion.div>
                            )}
                          </div>

                          <span
                            className={`text-sm leading-relaxed block mt-1 ${
                              esNoLeida
                                ? "font-medium text-blackbase-500"
                                : "text-blackbase-500/70"
                            }`}
                          >
                            {separarDosFrases(item.mensaje).segunda}
                          </span>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blackbase-500/5">
                        <Clock4 className="w-3.5 h-3.5 text-blackbase-500/40" />
                        <span className="text-xs text-blackbase-500/50">
                          {formatearFechaCorta(item.fecha)}
                        </span>
                        <span className="w-1 h-1 bg-blackbase-500/30 rounded-full"></span>
                        <span className="text-xs text-blackbase-500/50">
                          {formatearHora(item.fecha)}
                        </span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                      {/* Botón marcar como leído */}
                      {esNoLeida && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleActualizarNotificacion(item._id)}
                          className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-lg text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Marcar como leída"
                        >
                          <MdOutlineNotificationsActive className="text-lg" />
                        </motion.button>
                      )}

                      {!esNoLeida && (
                        <div className="p-2 bg-blackbase-500/5 rounded-lg text-blackbase-500/40">
                          <MdOutlineNotificationsNone className="text-lg" />
                        </div>
                      )}

                      {/* Menú de tres puntos */}
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === item._id ? null : item._id
                            )
                          }
                          className="p-2 rounded-lg text-blackbase-500/40 hover:text-blackbase-500/60 hover:bg-blackbase-500/5 transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {openMenuId === item._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-10 bg-white border border-blackbase-500/10 rounded-lg shadow-lg z-50 min-w-40"
                            >
                              <button
                                onClick={() => {
                                  // Aquí iría la lógica para eliminar
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-blackbase-500/5 first:border-t-0"
                              >
                                <Trash2 className="w-4 h-4" />
                                Eliminar
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
