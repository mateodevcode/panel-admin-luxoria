"use client";

import { AppContext } from "@/context/AppContext";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SeleccionarProducto = ({ id }) => {
  const [productoId, setProductoId] = useState(id || "");
  const { productos } = useContext(AppContext);
  const router = useRouter();

  // Efecto para actualizar el barberoId cuando cambie el id de las props
  useEffect(() => {
    if (id) {
      setProductoId(id);
    }
  }, [id]);

  const handleProductoChange = (idProducto) => {
    setProductoId(idProducto);

    if (idProducto) {
      router.push(`/admin/apps/productos/detalles-producto/${idProducto}`);
    }
  };

  // Encontrar el producto seleccionado para mostrar su nombre
  const productoSeleccionado = productos.find((p) => p._id === productoId);

  return (
    <div className="bg-primero rounded-lg">
      <div className="relative rounded-sm">
        <Listbox value={productoId} onChange={handleProductoChange}>
          {({ open }) => (
            <div>
              <Listbox.Button className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition">
                {productoSeleccionado ? (
                  <div className="flex items-center gap-3">
                    <span className="capitalize">
                      {productoSeleccionado.nombre}
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    Selecciona un producto
                  </span>
                )}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-segundo/70" />
                </span>
              </Listbox.Button>

              {open && (
                <Listbox.Options
                  className="absolute z-10 mt-2 w-full bg-white border border-segundo/10 text-segundo/70 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent"
                >
                  {productos.map((producto) => (
                    <Listbox.Option
                      key={producto._id}
                      value={producto._id}
                      className={({ active, selected }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-segundo/5" : ""
                        } ${selected ? "text-segundo bg-segundo/10" : ""}`
                      }
                    >
                      {producto.nombre}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default SeleccionarProducto;
