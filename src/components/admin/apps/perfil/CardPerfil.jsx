"use client";

import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { obtenerDosNombres } from "@/libs/obtenerDosNombres";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { obtenerIniciales } from "@/libs/obtenerIniciales";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  CheckCircle2,
} from "lucide-react";

const CardPerfil = () => {
  const { usuario } = useContext(AppContext);

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      activo: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
      },
      inactivo: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        dot: "bg-red-500",
      },
      pendiente: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        dot: "bg-amber-500",
      },
    };
    return (
      estados[estado] || {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        dot: "bg-gray-500",
      }
    );
  };

  const getPlanBadge = (plan) => {
    const planes = {
      gratis: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "✨",
      },
      premium: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "⭐",
      },
      pro: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        icon: "👑",
      },
    };
    return (
      planes[plan] || {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        icon: "📋",
      }
    );
  };

  const estadoBadge = getEstadoBadge(usuario?.estado);
  const planBadge = getPlanBadge(usuario?.plan);

  return (
    <div className="w-full md:w-6/12 font-poppins">
      {/* Card Principal */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-segundo/5">
        {/* Header Gradient Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-cuarto via-cuarto/80 to-segundo/20"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-cuarto/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-5 w-32 h-32 bg-segundo/5 rounded-full blur-2xl"></div>

        {/* Contenido */}
        <div className="relative z-10 pt-12 px-6 pb-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              {/* Avatar Ring */}
              <div className="absolute -inset-2 bg-gradient-to-br from-cuarto to-segundo/30 rounded-full blur-lg opacity-30"></div>

              {/* Avatar Container */}
              <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden">
                {usuario?.imageUrl ? (
                  <Image
                    src={usuario?.imageUrl}
                    alt={usuario?.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="bg-gradient-to-br from-cuarto to-cuarto/60 text-white text-4xl font-bold border border-segundo/10">
                      {obtenerIniciales(usuario?.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              {/* Status Indicator */}
              <div
                className={`absolute bottom-0 right-0 w-5 h-5 ${estadoBadge.dot} border-4 border-white rounded-full shadow-lg`}
              ></div>
            </div>

            {/* Nombre y Email */}
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-segundo mb-1">
                {obtenerDosNombres(usuario?.name) || "Usuario"}
              </h2>
              <p className="text-segundo/60 flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-cuarto" />
                {usuario?.email || "No disponible"}
              </p>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap gap-3 justify-center">
              {/* Estado Badge */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${estadoBadge.bg} ${estadoBadge.border} ${estadoBadge.text} font-medium text-sm`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${estadoBadge.dot}`}
                ></div>
                {usuario?.estado || "No especificado"}
              </div>

              {/* Plan Badge */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${planBadge.bg} ${planBadge.border} ${planBadge.text} font-medium text-sm`}
              >
                <span>{planBadge.icon}</span>
                Plan {usuario?.plan || "Gratis"}
              </div>

              {/* Rol Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-segundo/10 bg-segundo/5 text-segundo/70 font-medium text-sm">
                <span className="capitalize">{usuario?.role || "Usuario"}</span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pt-8 border-t border-segundo/10">
            {/* Teléfono */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cuarto/10">
                  <Phone className="h-5 w-5 text-cuarto" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-segundo/60">Teléfono</p>
                <p className="text-base font-semibold text-segundo truncate">
                  {usuario?.telefono || "No proporcionado"}
                </p>
              </div>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cuarto/10">
                  <MapPin className="h-5 w-5 text-cuarto" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-segundo/60">Ubicación</p>
                <p className="text-base font-semibold text-segundo truncate">
                  {usuario?.ubicacion || "No especificada"}
                </p>
              </div>
            </div>

            {/* Miembro desde */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cuarto/10">
                  <Calendar className="h-5 w-5 text-cuarto" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-segundo/60">
                  Miembro desde
                </p>
                <p className="text-base font-semibold text-segundo">
                  {formatDate(usuario?.createdAt)}
                </p>
              </div>
            </div>

            {/* Estado de Cuenta */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cuarto/10">
                  {usuario?.bloqueado ? (
                    <Lock className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-segundo/60">
                  Estado de cuenta
                </p>
                <p
                  className={`text-base font-semibold ${
                    usuario?.bloqueado ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {usuario?.bloqueado ? "Bloqueada" : "Activa"}
                </p>
              </div>
            </div>
          </div>

          {/* Last Update */}
          <div className="mt-8 pt-6 border-t border-segundo/10">
            <p className="text-xs text-segundo/50 text-center">
              Última actualización: {formatDate(usuario?.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;
