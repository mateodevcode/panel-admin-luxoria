"use cliente";

import { AppContext } from "@/context/AppContext";
import usePerfil from "@/hooks/usePerfil";
import { Check } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const CambiarPassword = () => {
  const {
    usuario,
    password,
    setPassword,
    confirmarPassword,
    setConfirmarPassword,
    passwordActual,
    setPasswordActual,
  } = useContext(AppContext);
  const { handleActualizarPasswordAdmin } = usePerfil();
  const [verPassword, setVerPassword] = useState(false);
  const [verNuevaPassword, setVerNuevaPassword] = useState(false);
  const [verConfirmarPassword, setVerConfirmarPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2 text-sm mt-4 text-segundo/80">
      <div className="w-full flex items-center gap-8 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-2 relative">
          <p className="font-medium">Contraseña actual</p>
          <input
            type={verPassword ? "text" : "password"}
            name="passwordActual"
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="Contraseña actual"
          />
          <div
            className="absolute right-4 top-12 text-segundo/50"
            onClick={() => setVerPassword(!verPassword)}
          >
            {verPassword ? (
              <button className="cursor-pointer select-none">
                <IoEyeOutline />
              </button>
            ) : (
              <button className="cursor-pointer select-none">
                <IoEyeOffOutline />
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2 relative">
          <p className="font-medium">Nueva contraseña</p>
          <input
            type={verNuevaPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
            placeholder="Nueva contraseña"
          />
          <div
            className="absolute right-4 top-12 text-segundo/50"
            onClick={() => setVerNuevaPassword(!verNuevaPassword)}
          >
            {verNuevaPassword ? (
              <button className="cursor-pointer select-none">
                <IoEyeOutline />
              </button>
            ) : (
              <button className="cursor-pointer select-none">
                <IoEyeOffOutline />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 mt-4 relative">
        <p className="font-medium">Confirmar nueva contraseña</p>
        <input
          type={verConfirmarPassword ? "text" : "password"}
          name="confirmarPassword"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className="bg-transparent focus text-segundo/80 border border-segundo/10 w-full text-sm p-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition"
          placeholder="Confirmar nueva contraseña"
        />
        <div
          className="absolute right-4 top-12 text-segundo/50"
          onClick={() => setVerConfirmarPassword(!verConfirmarPassword)}
        >
          {verConfirmarPassword ? (
            <button className="cursor-pointer select-none">
              <IoEyeOutline />
            </button>
          ) : (
            <button className="cursor-pointer select-none">
              <IoEyeOffOutline />
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex md:items-center mt-6 flex-col md:flex-row">
        <button
          className="bg-cuarto text-primero px-5 py-3 rounded-md font-medium hover:bg-cuarto/80 transition flex items-center gap-2 justify-center"
          onClick={() => {
            handleActualizarPasswordAdmin(
              usuario._id,
              passwordActual,
              password,
              confirmarPassword
            );
          }}
        >
          <Check className="w-4 h-4" />
          <span>Cambiar contraseña</span>
        </button>
        <Link
          href="/olvidaste-tu-contrasena"
          className="ml-4 text-cuarto hover:underline text-center mt-4 md:mt-0"
        >
          Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default CambiarPassword;
