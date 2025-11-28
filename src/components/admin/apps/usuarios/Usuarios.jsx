"use client";

import React, { useState } from "react";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import SearchPedidos from "./SearchUsuarios";
import ListaPedidos from "./ListaUsuarios";

const Usuarios = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Usuarios" />

      <div className="w-full flex mt-6 gap-4 flex-col">
        <SearchPedidos
          setSearch={setSearch}
          setDateFilter={setDateFilter}
          setStatusFilter={setStatusFilter}
        />
        <ListaPedidos
          search={search}
          dateFilter={dateFilter}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

export default Usuarios;
