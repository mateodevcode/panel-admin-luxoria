export const obtenerDosNombres = (nombreCompleto) => {
  if (nombreCompleto === undefined || nombreCompleto === null) {
    return "";
  }

  const nombres = nombreCompleto.split(" ");
  if (nombres.length >= 2) {
    return `${nombres[0]} ${nombres[1]}`;
  } else {
    return nombreCompleto;
  }
};
