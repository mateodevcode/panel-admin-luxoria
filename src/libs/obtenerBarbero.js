export const obtenerBarbero = (barberId, barberos) => {
  const barbero = barberos.find((barber) => barber._id === barberId);
  return barbero;
};
