import socket from "@/lib/socket";

export const actualizar_producto_disponibilidad = (id, data) => {
  socket.emit("client:actualizar_producto_disponibilidad", id, data);
};
