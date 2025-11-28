export const formatearFechaCorta = (fecha) => {
  const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

export const formatearHora = (fecha) => {
  const opciones = { hour: "2-digit", minute: "2-digit" };
  return new Date(fecha).toLocaleTimeString("es-ES", opciones);
};
