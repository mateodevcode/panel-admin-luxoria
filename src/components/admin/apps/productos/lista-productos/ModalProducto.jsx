"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { formatoDinero } from "@/libs/formatoDinero";
import { AppContext } from "@/context/AppContext";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  formatDate,
  formatTime,
  getStatusColor,
  getStatusIcon,
} from "@/libs/libs_pedidos";
import { FaWhatsapp } from "react-icons/fa6";
import { obtenerServicio } from "@/libs/obtenerServicio";
import useMensaje from "@/hooks/useMensaje";
import { useRouter } from "next/navigation";
import { obtenerBarbero } from "@/libs/obtenerBarbero";
import useReserva from "@/hooks/useReserva";
import BotonCerrarModal from "@/components/boton/BotonCerrarModal";
import Image from "next/image";

const ModalProducto = () => {
  const {
    pedidoSeleccionado,
    setPedidoSeleccionado,
    openModalPedidoCard,
    setModalPedidoCard,
    barberos,
    servicios,
  } = useContext(AppContext);
  const { handleMensaje } = useMensaje();
  const { handleCancelarReserva, isCancelingReserva } = useReserva();
  const router = useRouter();

  useEffect(() => {
    if (openModalPedidoCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalPedidoCard]);

  return (
    <AnimatePresence>
      {openModalPedidoCard && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-opacity-90 overflow-auto font-poppins backdrop-blur-sm"
          onClick={() => {
            setModalPedidoCard(false);
            setPedidoSeleccionado(null);
          }}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-10/12 lg:w-96 h-96 flex flex-col overflow-y-auto mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-end justify-end mb-4">
              <BotonCerrarModal
                handleSubmit={() => {
                  setModalPedidoCard(false);
                  setPedidoSeleccionado(null);
                }}
              />
            </div>
            <Card className="p-4 border border-transparent transition-colors bg-primero/80 backdrop-blur-sm h-full">
              <div className="space-y-3 flex flex-col flex-1">
                {/* Status and Price */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(
                      pedidoSeleccionado.estado
                    )} flex items-center gap-1.5 px-3 py-1`}
                  >
                    {getStatusIcon(pedidoSeleccionado.estado)}
                    <span className="capitalize text-xs font-medium">
                      {pedidoSeleccionado.estado}
                    </span>
                  </Badge>
                  <span className="text-lg font-bold text-segundo">
                    {formatoDinero(
                      obtenerServicio(pedidoSeleccionado.servicio_id, servicios)
                        ?.precio
                    )}
                  </span>
                </div>

                {/* Service Name */}
                <div>
                  <h3 className="text-base font-semibold text-segundo/90 mb-1">
                    {
                      obtenerServicio(pedidoSeleccionado.servicio_id, servicios)
                        ?.nombre
                    }
                  </h3>

                  <p className="text-xs text-segundo/80">
                    ID: {pedidoSeleccionado._id}
                  </p>
                </div>

                {/* Cliente */}
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm text-segundo/90 mb-1">
                    Cliente: {pedidoSeleccionado.cliente_nombre}
                  </p>
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none text-segundo/80 hover:text-green-600"
                    onClick={() => handleMensaje("Hola que tal.")}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span className="text-xs">
                      {pedidoSeleccionado.cliente_telefono}
                    </span>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-segundo/80">
                    <Calendar className="h-4 w-4 text-tercero" />
                    <span>{formatDate(pedidoSeleccionado.fecha)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-segundo/80">
                    <Clock className="h-4 w-4 text-tercero" />
                    <span>
                      {formatTime(pedidoSeleccionado.hora_inicio)} -{" "}
                      {formatTime(pedidoSeleccionado.hora_fin)}
                    </span>
                  </div>
                </div>

                {/* Barber Info */}
                <div className="flex items-center gap-2 pt-2 border-t border-segundo/20">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="h-8 w-8 rounded-full bg-segundo/10 flex items-center justify-center">
                      <Image
                        src={
                          obtenerBarbero(
                            pedidoSeleccionado.barbero_id,
                            barberos
                          )?.imageUrl
                        }
                        alt={
                          obtenerBarbero(
                            pedidoSeleccionado.barbero_id,
                            barberos
                          )?.nombre
                        }
                        width={500}
                        height={500}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-segundo/80">Barbero</p>
                      <p className="text-sm font-medium text-segundo/80">
                        {
                          obtenerBarbero(
                            pedidoSeleccionado.barbero_id,
                            barberos
                          )?.nombre
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none text-segundo/80 hover:text-green-600"
                    onClick={() => handleMensaje("Hola que tal.")}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span className="text-xs">
                      {
                        obtenerBarbero(pedidoSeleccionado.barbero_id, barberos)
                          ?.telefono
                      }
                    </span>
                  </div>
                </div>
              </div>
              {pedidoSeleccionado.estado === "confirmado" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/reservar?servicio=${
                          pedidoSeleccionado.servicio_id
                        }&barbero=${
                          pedidoSeleccionado.barbero_id
                        }&nombre=${encodeURIComponent(
                          pedidoSeleccionado.cliente_nombre
                        )}&telefono=${encodeURIComponent(
                          pedidoSeleccionado.cliente_telefono
                        )}&servicioCancelar=${pedidoSeleccionado._id}`
                      )
                    }
                    className="flex-1 bg-cuarto hover:bg-cuarto/80 border-none text-primero hover:text-primero cursor-pointer select-none active:scale-95 duration-300 transition-all"
                  >
                    Reprogramar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCancelarReserva(pedidoSeleccionado._id)
                    }
                    disabled={isCancelingReserva}
                    className="flex-1 bg-segundo hover:bg-segundo/80 border-none text-primero hover:text-primero cursor-pointer select-none active:scale-95 duration-300 transition-all"
                  >
                    {isCancelingReserva ? "Procesando..." : "Cancelar reserva"}
                  </Button>
                </div>
              )}
              {pedidoSeleccionado.estado === "completado" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/reservar?servicio=${
                        pedidoSeleccionado.servicio_id
                      }&barbero=${
                        pedidoSeleccionado.barbero_id
                      }&nombre=${encodeURIComponent(
                        pedidoSeleccionado.cliente_nombre
                      )}&telefono=${encodeURIComponent(
                        pedidoSeleccionado.cliente_telefono
                      )}`
                    )
                  }
                  className="w-full bg-green-600 border-none hover:bg-green-700 cursor-pointer select-none active:scale-95 duration-300 transition-all"
                >
                  Reservar de Nuevo
                </Button>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalProducto;
