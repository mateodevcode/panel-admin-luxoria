export const buscarColeccion = (id, allColecciones) => {
  if (!id || !allColecciones) return null;
  if (id === "" || id === undefined || id === null) return null;

  const coleccion = allColecciones.find((coleccion) => coleccion._id === id);
  return coleccion;
};
