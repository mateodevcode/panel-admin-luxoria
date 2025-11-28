"use client";

import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useColeccion from "@/hooks/useColeccion";

const ListaColeccionesCards = ({ search }) => {
  const { colecciones } = useContext(AppContext);
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { handleEliminarColeccion } = useColeccion();

  const toggleMenu = (coleccionesId) => {
    setOpenMenuId(openMenuId === coleccionesId ? null : coleccionesId);
  };

  const listaColecciones = colecciones.filter((colecciones) =>
    colecciones.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (listaColecciones.length === 0) {
    return (
      <div className="w-full text-xl flex items-center justify-center gap-2">
        No se encontraron resultados para{" "}
        <strong className="text-cuarto">{search}</strong>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full font-poppins">
      {listaColecciones.map((colecciones, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-primero rounded-lg overflow-hidden relative p-4"
        >
          {/* Header */}
          <div className="pb-4 flex justify-between items-center">
            <h3 className="font-bold text-segundo/80 text-lg">
              {colecciones.nombre}
            </h3>
            <div className="relative">
              <button
                onClick={() => toggleMenu(colecciones._id)}
                className="p-1 hover:text-cuarto transition-colors text-segundo/80"
              >
                <Ellipsis className="w-6 h-6" />
              </button>
              {openMenuId === colecciones._id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 bg-primero shadow-md rounded-md text-sm py-4 z-30 w-40 space-y-2"
                >
                  <Link
                    href={`/admin/apps/colecciones/detalles-coleccion/${colecciones._id}`}
                    className="relative w-full flex items-center gap-2 pl-4 py-1 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
                    <span className="text-sm">ver</span>
                  </Link>
                  <Link
                    href={`/admin/apps/colecciones/editar-coleccion/${colecciones._id}`}
                    className="relative w-full flex items-center gap-2 pl-4 py-1 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
                    <span className="text-sm">Editar</span>
                  </Link>
                  <div
                    className="relative w-full flex items-center gap-2 pl-4 py-1 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
                    onClick={() => {
                      handleEliminarColeccion(colecciones._id);
                      setOpenMenuId(null);
                    }}
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
                    <span className="text-sm">Eliminar</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Imagen */}
          <div className="relative w-full h-60">
            <Image
              src={colecciones.imageUrl}
              alt={colecciones.nombre}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    colecciones.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p className="text-segundo text-sm">
                  {colecciones.isActive ? "Activo" : "Inactivo"}
                </p>
              </div>

              <button
                className="text-segundo hover:text-cuarto font-medium text-sm"
                onClick={() =>
                  router.push(
                    `/admin/apps/colecciones/detalles-coleccion/${colecciones._id}`
                  )
                }
              >
                Ver más
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ListaColeccionesCards;
