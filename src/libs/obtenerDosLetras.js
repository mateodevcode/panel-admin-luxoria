export const obtenerDosLetras = (dia) => {
  const dias = {
    domingo: "Do",
    lunes: "Lu",
    martes: "Ma",
    miércoles: "Mi",
    jueves: "Ju",
    viernes: "Vi",
    sábado: "Sa",
  };

  return dias[dia.toLowerCase()];
};
