export const mesesSinDomingo = (incluirDomingos = true) => {
  const fechaHoy = new Date();

  const año = fechaHoy.getFullYear();
  const mesActualIndex = fechaHoy.getMonth();
  const diaHoy = fechaHoy.getDate();

  const nombresMeses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const nombresDias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const diasEnMesActual = new Date(año, mesActualIndex + 1, 0).getDate();

  // Generar días desde hoy hasta fin de mes
  let dias = [];
  for (let d = diaHoy; d <= diasEnMesActual; d++) {
    const fecha = new Date(año, mesActualIndex, d);
    const nombreDia = nombresDias[fecha.getDay()];

    if (incluirDomingos || nombreDia.toLowerCase() !== "domingo") {
      dias.push({
        nombre: nombreDia,
        dia: d,
        mes: nombresMeses[mesActualIndex],
        año: año, // ✅ AGREGADO
        mesIndex: mesActualIndex, // ✅ AGREGADO - índice del mes para obtenerFechaISO
        fechaISO: `${año}-${String(mesActualIndex + 1).padStart(
          2,
          "0"
        )}-${String(d).padStart(2, "0")}`, // ✅ AGREGADO
      });
    }
  }

  // Si quedan menos de 5 días, agregar días del mes siguiente
  if (dias.length < 5) {
    const mesSiguienteIndex = (mesActualIndex + 1) % 12;
    const añoSiguiente = mesSiguienteIndex === 0 ? año + 1 : año;
    const diasEnMesSiguiente = new Date(
      añoSiguiente,
      mesSiguienteIndex + 1,
      0
    ).getDate();

    for (let d = 1; dias.length < 5 && d <= diasEnMesSiguiente; d++) {
      const fecha = new Date(añoSiguiente, mesSiguienteIndex, d);
      const nombreDia = nombresDias[fecha.getDay()];

      if (incluirDomingos || nombreDia.toLowerCase() !== "domingo") {
        dias.push({
          nombre: nombreDia,
          dia: d,
          mes: nombresMeses[mesSiguienteIndex], // ✅ Ahora usa el mes correcto
          año: añoSiguiente, // ✅ AGREGADO
          mesIndex: mesSiguienteIndex, // ✅ AGREGADO
          fechaISO: `${añoSiguiente}-${String(mesSiguienteIndex + 1).padStart(
            2,
            "0"
          )}-${String(d).padStart(2, "0")}`, // ✅ AGREGADO
        });
      }
    }
  }

  return dias;
};
