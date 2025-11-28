import socket from "@/lib/socket";

export const crear_usuario = (
  id,
  nombre,
  cedula,
  email,
  password,
  cargo,
  roll,
  area,
  procesos,
  bloqueado
) => {
  socket.emit("client:crear_usuario", {
    id,
    nombre,
    cedula,
    email,
    password,
    cargo,
    roll,
    area,
    procesos,
    bloqueado,
  });
};

export const eliminar_usuario = (id) => {
  socket.emit("client:eliminar_usuario", id);
};

export const actualizar_usuario = (id, data) => {
  socket.emit("client:actualizar_usuario", id, data);
};
