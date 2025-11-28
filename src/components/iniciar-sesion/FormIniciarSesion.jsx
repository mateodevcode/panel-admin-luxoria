"use client";

import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Lock, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import useIniciarSesion from "@/hooks/useIniciarSesion";
import Logo from "../logo/Logo";

export function FormIniciarSesion() {
  const { formDataUsuario } = useContext(AppContext);
  const [verContraseña, setVerContraseña] = useState(false);
  const {
    handleChange,
    handleLoginCredenciales,
    handleCerrarSesion,
    handleLoginGoogle,
  } = useIniciarSesion();
  const searchParams = useSearchParams();
  const emailUrl = searchParams.get("email");

  useEffect(() => {
    if (emailUrl) {
      formDataUsuario.email = emailUrl;
    }
  }, [emailUrl, formDataUsuario]);

  return (
    <form className={"flex flex-col gap-6 text-segundo/90"}>
      <Logo />
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative flex items-center gap-4">
            <Mail className="absolute left-3 h-4 w-4 text-segundo/70 z-10" />
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={formDataUsuario.email}
              onChange={handleChange}
              name="email"
              className="pl-10 pr-10 bg-transparent focus text-segundo border border-segundo/10 w-full text-sm p-2 focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <div className="relative flex items-center gap-4">
            <Lock className="absolute left-3 h-4 w-4 text-segundo/70 z-10" />
            <input
              type={verContraseña ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formDataUsuario.password}
              onChange={handleChange}
              className="pl-10 bg-transparent focus text-segundo border-segundo/10 w-full text-sm p-2 border focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition backdrop-blur-sm"
            />
            <div className="absolute right-3 top-2.5 h-4 w-4">
              {verContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => handleLoginCredenciales(e)}
          className="w-full font-medium py-2 px-3 bg-cuarto text-primero hover:bg-cuarto/80 cursor-pointer select-none"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}
