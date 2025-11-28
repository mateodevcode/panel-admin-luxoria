"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import BreadCrumb from "../../../components/breadcrumb/BreadCrumb";
import ListaProductos from "./ListaProductos";

// Importar SearchProductos dinámicamente sin SSR para evitar errores de hidratación
const SearchProductos = dynamic(() => import("./SearchProductos"), {
  ssr: false,
});

const Productos = () => {
  const [search, setSearch] = useState("");
  const [coleccionFilter, setColeccionFilter] = useState("");

  return (
    <div className="font-poppins mt-20">
      <BreadCrumb titulo="Productos" />

      <div className="w-full mt-6 gap-4 flex flex-col">
        <SearchProductos
          setSearch={setSearch}
          setColeccionFilter={setColeccionFilter}
        />
        <ListaProductos search={search} coleccionFilter={coleccionFilter} />
      </div>
    </div>
  );
};

export default Productos;
