import socket from "@/lib/socket";

export const crear_orden = (
  pedido,
  nombre,
  direccion,
  mesa,
  total,
  estado,
  listaPedidos,
  para_llevar,
  id_usuario,
  telefono,
  comentarios,
  metodo_de_pago
) => {
  socket.emit("client:crear_orden", {
    pedido,
    nombre,
    direccion,
    mesa,
    total,
    estado,
    listaPedidos,
    para_llevar,
    id_usuario,
    telefono,
    comentarios,
    metodo_de_pago,
  });
};

export const eliminar_orden = (id) => {
  socket.emit("client:eliminar_orden", id);
};

export const actualizar_orden = (id, data) => {
  socket.emit("client:actualizar_orden", id, data);
};

export const eliminar_producto_orden = (id_orden, id_producto) => {
  socket.emit("client:eliminar_producto_orden", id_orden, id_producto);
};

export const reordenar_categorias = (categorias) => {
  socket.emit("client:reordenar_categorias", categorias);
};
