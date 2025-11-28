"use client";

import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import React, { useState } from "react";
import SearchColecciones from "./SearchColecciones";
import ListaColeccionesCards from "./ListaColeccionesCards";

const ListaColecciones = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="font-poppins mt-20 min-h-screen flex flex-col">
      <BreadCrumb titulo="Lista de colecciones" />

      <div className="w-full flex flex-1 gap-6 flex-col mt-6">
        <SearchColecciones setSearch={setSearch} />
        <ListaColeccionesCards search={search} />
      </div>
    </div>
  );
};

export default ListaColecciones;
