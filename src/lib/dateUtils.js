// lib/dateUtils.js
import { DateTime } from "luxon";

const COLOMBIA_TZ = "America/Bogota";

// === CONVERSIÓN COLOMBIA → UTC ===
export const colombiaToUTC = (fechaISO, hora) => {
  return DateTime.fromFormat(`${fechaISO} ${hora}`, "yyyy-MM-dd HH:mm", {
    zone: COLOMBIA_TZ,
  })
    .toUTC()
    .toJSDate();
};

// === UTC → COLOMBIA ===
export const utcToColombia = (date) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).setZone(COLOMBIA_TZ);
};

// === FORMATEO ===
export const formatTime = (date) => {
  return utcToColombia(date).toFormat("h:mm a"); // "2:00 PM"
};

export const formatDateTime = (date) => {
  return utcToColombia(date).toFormat("yyyy-MM-dd HH:mm");
};

// === GENERAR HORARIOS EN COLOMBIA ===
export const generarHorariosColombia = (fechaISO, inicio, fin, duracion) => {
  const start = DateTime.fromFormat(
    `${fechaISO} ${inicio}`,
    "yyyy-MM-dd HH:mm",
    { zone: COLOMBIA_TZ }
  );
  const end = DateTime.fromFormat(`${fechaISO} ${fin}`, "yyyy-MM-dd HH:mm", {
    zone: COLOMBIA_TZ,
  });
  const bloques = [];

  let current = start;
  while (current.plus({ minutes: duracion }) <= end) {
    bloques.push({
      hora_inicio: current.toFormat("yyyy-MM-dd HH:mm"),
      hora_fin: current
        .plus({ minutes: duracion })
        .toFormat("yyyy-MM-dd HH:mm"),
    });
    current = current.plus({ minutes: duracion });
  }
  return bloques;
};

// === HORA ACTUAL EN COLOMBIA ===
export const ahoraColombia = () => DateTime.now().setZone(COLOMBIA_TZ);

// === MEDIODÍA Y ALMUERZO ===
export const mediodiaColombia = (fechaISO) => {
  return DateTime.fromFormat(`${fechaISO} 12:00`, "yyyy-MM-dd HH:mm", {
    zone: COLOMBIA_TZ,
  });
};

export const almuerzoInicio = (fechaISO) => {
  return DateTime.fromFormat(`${fechaISO} 13:00`, "yyyy-MM-dd HH:mm", {
    zone: COLOMBIA_TZ,
  });
};

export const almuerzoFin = (fechaISO) => {
  return DateTime.fromFormat(`${fechaISO} 14:00`, "yyyy-MM-dd HH:mm", {
    zone: COLOMBIA_TZ,
  });
};
