"use client";

import { AppContext } from "@/context/AppContext";
import useIniciarSesion from "@/hooks/useIniciarSesion";
import useResetForm from "@/hooks/useResetForm";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Circle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const SidebarEnlace = ({ enlaces, titulo }) => {
  const router = useRouter();
  const { isSidebarOpen } = useContext(AppContext);
  const [openIndex, setOpenIndex] = useState(null);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { handleCerrarSesion } = useIniciarSesion();
  const { resetFormData } = useResetForm();

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEnlaceClickSubEnlace = (enlace) => {
    if (enlace === "/cerrar-sesion") {
      handleCerrarSesion();
    } else {
      router.push(`/admin/${enlace}`);
    }
  };

  const handleEnlaceClickPrincipal = (enlace, index) => {
    if (enlace.enlace === "/cerrar-sesion") {
      handleCerrarSesion();
    } else {
      enlace.subEnlaces.length > 0
        ? toggleSubmenu(index)
        : router.push(`/admin/${enlace.enlace}`);
    }
  };

  return (
    <div className="flex flex-col">
      {isSidebarOpen ? (
        <h3 className="uppercase font-semibold text-xs h-3 text-segundo/40">
          {titulo}
        </h3>
      ) : (
        <h3 className="uppercase font-semibold text-xs h-3 text-segundo/40"></h3>
      )}

      <div
        className={`flex flex-col gap-1 ${
          isSidebarOpen ? "px-2 py-2" : "px-0 py-2"
        }`}
      >
        {enlaces.map((enlace, index) => (
          <div key={index} className="flex flex-col">
            {/* Enlace principal */}
            <div
              onClick={() => handleEnlaceClickPrincipal(enlace, index)}
              className={`flex items-center justify-between gap-3 hover:bg-cuarto/5 p-2 rounded-sm cursor-pointer duration-500 transition-all select-none ${
                enlace?.enlace.includes(segments[2])
                  ? "text-cuarto bg-cuarto/10"
                  : ""
              }
             ${enlace.subEnlaces.length > 0 ? "" : "hover:text-cuarto"}
              ${isSidebarOpen ? "w-52" : "w-10"}
              `}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-5 flex-shrink-0">{enlace.icono}</div>
                {isSidebarOpen && (
                  <motion.span
                    key={enlace.nombre}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold w-full"
                  >
                    {enlace.nombre}
                  </motion.span>
                )}
              </div>

              {enlace.subEnlaces.length > 0 && isSidebarOpen && (
                <motion.div
                  animate={{
                    rotate: openIndex === index ? 90 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4" />
                </motion.div>
              )}
            </div>

            {/* Submenú */}
            <AnimatePresence>
              {openIndex === index &&
                isSidebarOpen &&
                enlace.subEnlaces.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 flex flex-col gap-1"
                  >
                    {enlace?.subEnlaces.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => {
                          resetFormData();
                          handleEnlaceClickSubEnlace(sub.enlace);
                        }}
                        className={`flex items-center gap-2 text-sm p-2.5 rounded-md cursor-pointer hover:bg-cuarto/5 hover:text-cuarto transition-all duration-300 ${
                          sub.enlace.includes(segments[3])
                            ? "text-cuarto font-medium"
                            : "text-segundo/70"
                        }`}
                      >
                        <Circle className="ml-3 w-3 h-3" />
                        {sub.nombre}
                      </div>
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarEnlace;
