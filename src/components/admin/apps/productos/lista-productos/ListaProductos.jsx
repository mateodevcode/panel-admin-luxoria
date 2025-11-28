"use client";

import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import CardProducto from "./CardProducto";
import { FileSpreadsheet } from "lucide-react";

const ListaProductos = ({ search, coleccionFilter }) => {
  const { productos } = useContext(AppContext);

  const filteredProductos = productos.filter((producto) => {
    const matchesSearch = producto.nombre
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesColeccion = coleccionFilter
      ? producto.coleccionId === coleccionFilter
      : true;

    return matchesSearch && matchesColeccion;
  });

  if (filteredProductos.length === 0) {
    return (
      <div className="bg-primero rounded-xl p-6 text-segundo/70 min-h-40 flex items-center justify-center flex-col">
        <div className="w-14 h-14 bg-cuarto/10 text-cuarto rounded-full flex items-center justify-center mb-4">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <span>No hay productos</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl text-segundo/70">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredProductos.map((producto, index) => {
          return <CardProducto producto={producto} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ListaProductos;
