"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AppContext } from "@/context/AppContext";
import { obtenerIniciales } from "@/libs/obtenerIniciales";
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  Settings,
  Package,
  Layers,
} from "lucide-react";
import React, { useContext } from "react";
import ModalAuth from "./ModalAuth";
import Image from "next/image";
import { obtenerPrimerNombre } from "@/libs/obtenerPrimerNombre";
import { useRouter } from "next/navigation";
import useIniciarSesion from "@/hooks/useIniciarSesion";
import { obtenerDosNombres } from "@/libs/obtenerDosNombres";

const AuthUser = () => {
  const { usuario } = useContext(AppContext);
  const { name, imageUrl } = usuario || { name: "John Doe" };
  const router = useRouter();
  const { handleCerrarSesion } = useIniciarSesion();

  return (
    <ModalAuth
      hover={true}
      trigger={
        <div className="flex items-center gap-2 cursor-pointer font-poppins">
          {imageUrl ? (
            <div className="w-12 h-12">
              <Image
                src={imageUrl || "/logo/icon-logo.png"}
                alt={name || "Usuario"}
                width={200}
                height={200}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : (
            <Avatar className="w-10 h-10 object-cover">
              <AvatarFallback className="bg-segundo select-none border border-segundo/50 text-primero text-sm font-semibold">
                {obtenerIniciales(name)}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="font-medium select-none">
            {obtenerPrimerNombre(name)}
          </span>
          <ChevronDown className="w-5 h-5" />
        </div>
      }
    >
      <div className="font-poppins flex flex-col z-30">
        <div className="flex items-center gap-2">
          {imageUrl ? (
            <div className="w-12 h-12">
              <Image
                src={imageUrl || "/logo/icon-logo.png"}
                alt={name || "Usuario"}
                width={200}
                height={200}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : (
            <Avatar className="w-8 h-8 object-cover">
              <AvatarFallback className="bg-segundo select-none border border-segundo/50 text-primero text-xs font-medium">
                {obtenerIniciales(name)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col">
            <span className="font-medium select-none text-segundo/80">
              {obtenerDosNombres(name)}
            </span>
            <span className="text-xs -mt-1 font-medium">Administrador</span>
          </div>
        </div>

        <div className="h-[1px] bg-segundo/10 w-full mt-2" />

        <div className="w-full mt-2 gap-1">
          <div
            className="relative w-full flex items-center gap-2 p-2 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
            onClick={() => router.push("/admin/apps/perfil")}
          >
            {/* Barra lateral */}
            <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>

            {/* Contenido */}
            <CircleUserRound className="w-5 h-5" />
            <span className="text-sm">Perfil</span>
          </div>

          <div
            className="relative w-full flex items-center gap-2 p-2 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
            onClick={() => router.push("/admin/apps/productos/lista-productos")}
          >
            <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
            <Package className="w-5 h-5" />
            <span className="text-sm">Productos</span>
          </div>

          <div
            className="relative w-full flex items-center gap-2 p-2 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
            onClick={() =>
              router.push("/admin/apps/colecciones/lista-colecciones")
            }
          >
            <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>
            <Layers className="w-5 h-5" />
            <span className="text-sm">Colecciones</span>
          </div>
        </div>

        <div className="h-px bg-segundo/10 w-full mt-2" />

        <div
          className="w-full mt-2 gap-1"
          onClick={() => router.push("/admin/otros/ajustes")}
        >
          <div className="relative w-full flex items-center gap-2 p-2 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto">
            {/* Barra lateral */}
            <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>

            {/* Contenido */}
            <Settings className="w-5 h-5" />
            <span className="text-sm">Configuración</span>
          </div>

          <div
            className="relative w-full flex items-center gap-2 p-2 cursor-pointer text-segundo/70 group transition-all duration-300 hover:text-cuarto"
            onClick={() => handleCerrarSesion()}
          >
            {/* Barra lateral */}
            <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-cuarto origin-center scale-y-0 rounded-r-md transition-transform duration-300 group-hover:scale-y-100"></span>

            {/* Contenido */}
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Cerrar sesión</span>
          </div>
        </div>
      </div>
    </ModalAuth>
  );
};

export default AuthUser;
