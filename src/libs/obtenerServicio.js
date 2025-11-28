export const obtenerServicio = (servicioId, servicios) => {
  const servicio = servicios.find((service) => service._id === servicioId);
  return servicio;
};
