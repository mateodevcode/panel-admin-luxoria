"use client";

import React, { useState } from "react";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import ConfigurarCuenta from "./ConfigurarCuenta";
import CambiarPassword from "./CambiarPassword";
import PoliticaPrivacidad from "./PoliticaPrivacidad";
import TerminosCondiciones from "./TerminosCondiciones";
import { opcionesNav } from "@/data/opciones.navegacion.ajustes";

const Ajustes = () => {
  const [opcionesNavegacion, setOpcionesNavegacion] = useState("config-cuenta");

  return (
    <div className="font-poppins mt-20">
      <BreadCrumb titulo="Ajustes" />
      <div className="w-full flex flex-col mt-6 gap-4 bg-primero rounded-lg p-6">
        <div className="w-full flex md:items-center gap-4 flex-col md:flex-row">
          {opcionesNav.map((opcion) => (
            <button
              key={opcion.id}
              className={`px-4 py-2.5 rounded-md font-medium text-sm duration-500 transition-all ${
                opcionesNavegacion === opcion.id
                  ? "bg-tercero text-segundo"
                  : "border border-tercero text-tercero hover:bg-tercero hover:text-segundo"
              }`}
              onClick={() => setOpcionesNavegacion(opcion.id)}
            >
              {opcion.nombre}
            </button>
          ))}
        </div>
        <div>
          {opcionesNavegacion === "config-cuenta" && <ConfigurarCuenta />}
          {opcionesNavegacion === "cambiar-password" && <CambiarPassword />}
          {/* {opcionesNavegacion === "conections" && <Conexiones />} */}
          {opcionesNavegacion === "privacidad" && <PoliticaPrivacidad />}
          {opcionesNavegacion === "terms-conditions" && <TerminosCondiciones />}
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
