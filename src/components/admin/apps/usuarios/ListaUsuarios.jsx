"use client";

import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { FileSpreadsheet } from "lucide-react";
import CardUsuario from "./CardUsuario";

const ListaUsuarios = ({ search, statusFilter }) => {
  const { usuarios } = useContext(AppContext);

  const filteredUsuarios = usuarios.filter((reserva) => {
    const matchesSearch =
      reserva.name?.toLowerCase().includes(search.toLowerCase()) ||
      reserva.email?.includes(search);

    const matchesStatus = statusFilter ? reserva.estado === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  if (filteredUsuarios.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-blackbase-500/70 min-h-40 flex items-center justify-center flex-col">
        <div className="w-14 h-14 bg-cuarto/10 text-cuarto rounded-full flex items-center justify-center mb-4">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <span>
          No hay usuarios{" "}
          {statusFilter ? `con estado "${statusFilter}"` : "registrados"}.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl text-blackbase-500/70">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredUsuarios.map((usuario, index) => {
          return <CardUsuario usuario={usuario} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ListaUsuarios;
