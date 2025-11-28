/**
 * Utilidad centralizada con LUXON para zona horaria de Colombia (COT - UTC-5)
 * Luxon proporciona manejo robusto de zonas horarias
 */

import { DateTime } from "luxon";

const TIMEZONE_COLOMBIA = "America/Bogota";

/**
 * Obtiene la fecha y hora actual de Colombia
 * @returns {DateTime} Objeto DateTime de Luxon en zona Colombia
 */
export function getNowColombia() {
  return DateTime.now().setZone(TIMEZONE_COLOMBIA);
}

/**
 * Convierte una fecha/hora a la zona horaria de Colombia
 * @param {Date|string|DateTime} date - Fecha a convertir
 * @returns {DateTime} DateTime convertida a zona Colombia
 */
export function convertToColombia(date) {
  if (!date) return null;

  let dt;

  if (date instanceof DateTime) {
    dt = date;
  } else if (typeof date === "string") {
    dt = DateTime.fromISO(date);
  } else if (date instanceof Date) {
    dt = DateTime.fromJSDate(date);
  } else {
    return null;
  }

  return dt.setZone(TIMEZONE_COLOMBIA);
}

/**
 * Obtiene solo la fecha de hoy en Colombia (sin hora)
 * @returns {DateTime} Fecha de hoy a las 00:00:00 en Colombia
 */
export function getTodayInColombia() {
  return getNowColombia().startOf("day");
}

/**
 * Obtiene el día de la semana en Colombia para una fecha específica
 * @param {Date|string|DateTime} date - Fecha para obtener el día
 * @returns {string} Nombre del día en español (lowercase)
 */
export function getDayNameColombia(date) {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;

  const diasMap = {
    1: "lunes",
    2: "martes",
    3: "miercoles",
    4: "jueves",
    5: "viernes",
    6: "sabado",
    7: "domingo",
  };

  return diasMap[dt.weekday];
}

/**
 * Crea una fecha en Colombia a partir de componentes
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día
 * @param {number} hour - Hora (0-23)
 * @param {number} minute - Minuto (0-59)
 * @returns {DateTime} DateTime en zona Colombia
 */
export function createDateInColombia(year, month, day, hour = 0, minute = 0) {
  return DateTime.fromObject(
    { year, month, day, hour, minute },
    { zone: TIMEZONE_COLOMBIA }
  );
}

/**
 * Crea una hora en una fecha específica
 * @param {string} fechaISO - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM
 * @returns {DateTime} DateTime completo en zona Colombia
 */
export function createTimeInDate(fechaISO, hora) {
  const [year, month, day] = fechaISO.split("-").map(Number);
  const [hour, minute] = hora.split(":").map(Number);

  return DateTime.fromObject(
    { year, month, day, hour, minute },
    { zone: TIMEZONE_COLOMBIA }
  );
}

/**
 * Obtiene el string de fecha en formato ISO (YYYY-MM-DD) en zona de Colombia
 * @param {Date|string|DateTime} date - Fecha a convertir
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export function getDateISO(date) {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.toISODate();
}

/**
 * Parsea una fecha ISO (YYYY-MM-DD) en zona de Colombia
 * @param {string} fechaISO - Fecha en formato YYYY-MM-DD
 * @returns {DateTime} DateTime a las 00:00:00 en Colombia
 */
export function parseISO(fechaISO) {
  return DateTime.fromISO(fechaISO, { zone: TIMEZONE_COLOMBIA }).startOf("day");
}

/**
 * Suma días a una fecha en zona de Colombia
 * @param {DateTime|Date|string} date - Fecha inicial
 * @param {number} days - Cantidad de días a sumar
 * @returns {DateTime} Nueva fecha en zona Colombia
 */
export function addDaysColombia(date, days) {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.plus({ days });
}

/**
 * Suma horas a una fecha en zona de Colombia
 * @param {DateTime|Date|string} date - Fecha inicial
 * @param {number} hours - Cantidad de horas a sumar
 * @returns {DateTime} Nueva fecha en zona Colombia
 */
export function addHoursColombia(date, hours) {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.plus({ hours });
}

/**
 * Suma minutos a una fecha en zona de Colombia
 * @param {DateTime|Date|string} date - Fecha inicial
 * @param {number} minutes - Cantidad de minutos a sumar
 * @returns {DateTime} Nueva fecha en zona Colombia
 */
export function addMinutesColombia(date, minutes) {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.plus({ minutes });
}

/**
 * Verifica si una fecha es hoy en zona de Colombia
 * @param {Date|string|DateTime} date - Fecha a verificar
 * @returns {boolean} true si es hoy, false en caso contrario
 */
export function isTodayColombia(date) {
  const dt = convertToColombia(date);
  const today = getTodayInColombia();
  if (!dt.isValid || !today.isValid) return false;
  return dt.hasSame(today, "day");
}

/**
 * Verifica si una fecha es en el pasado en zona de Colombia
 * @param {Date|string|DateTime} date - Fecha a verificar
 * @returns {boolean} true si es en el pasado, false en caso contrario
 */
export function isPastColombia(date) {
  const dt = convertToColombia(date);
  const now = getNowColombia();
  if (!dt.isValid || !now.isValid) return false;
  return dt < now;
}

/**
 * Verifica si una fecha es en el futuro en zona de Colombia
 * @param {Date|string|DateTime} date - Fecha a verificar
 * @returns {boolean} true si es en el futuro, false en caso contrario
 */
export function isFutureColombia(date) {
  const dt = convertToColombia(date);
  const now = getNowColombia();
  if (!dt.isValid || !now.isValid) return false;
  return dt > now;
}

/**
 * Calcula la diferencia entre dos fechas en zona Colombia
 * @param {Date|string|DateTime} date1 - Primera fecha
 * @param {Date|string|DateTime} date2 - Segunda fecha
 * @param {string} unit - Unidad ('milliseconds', 'seconds', 'minutes', 'hours', 'days')
 * @returns {number} Diferencia en la unidad especificada
 */
export function diffColombia(date1, date2, unit = "milliseconds") {
  const dt1 = convertToColombia(date1);
  const dt2 = convertToColombia(date2);
  if (!dt1.isValid || !dt2.isValid) return null;

  const diff = dt2.diff(dt1, unit);
  return diff[unit.toLowerCase()];
}

/**
 * Formatea una fecha en zona Colombia
 * @param {Date|string|DateTime} date - Fecha a formatear
 * @param {string} format - Formato de Luxon (default: 'dd MMM yyyy')
 * @returns {string} Fecha formateada
 */
export function formatDateColombia(date, format = "dd MMM yyyy") {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.toFormat(format, { locale: "es" });
}

/**
 * Formatea una hora en zona Colombia
 * @param {Date|string|DateTime} date - Fecha/hora a formatear
 * @param {string} format - Formato de Luxon (default: 'HH:mm')
 * @returns {string} Hora formateada
 */
export function formatTimeColombia(date, format = "HH:mm") {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.toFormat(format, { locale: "es" });
}

/**
 * Formatea fecha y hora en zona Colombia
 * @param {Date|string|DateTime} date - Fecha/hora a formatear
 * @param {string} format - Formato de Luxon (default: 'dd MMM yyyy HH:mm')
 * @returns {string} Fecha y hora formateada
 */
export function formatDateTimeColombia(date, format = "dd MMM yyyy HH:mm") {
  const dt = convertToColombia(date);
  if (!dt.isValid) return null;
  return dt.toFormat(format, { locale: "es" });
}

/**
 * Convierte DateTime de Luxon a Date de JavaScript
 * @param {DateTime} dt - DateTime de Luxon
 * @returns {Date} Objeto Date equivalente
 */
export function toJSDate(dt) {
  if (!(dt instanceof DateTime)) return null;
  if (!dt.isValid) return null;
  return dt.toJSDate();
}

/**
 * Convierte DateTime de Luxon a ISO string
 * @param {DateTime} dt - DateTime de Luxon
 * @returns {string} String ISO 8601
 */
export function toISO(dt) {
  if (!(dt instanceof DateTime)) return null;
  if (!dt.isValid) return null;
  return dt.toISO();
}

/**
 * Obtiene el offset en minutos de Colombia respecto a UTC
 * @returns {number} Offset en minutos (siempre -300 para Colombia)
 */
export function getColombiaTZOffset() {
  return -300; // Colombia UTC-5
}

/**
 * Obtiene información de la zona horaria de Colombia
 * @returns {object} Información de la zona
 */
export function getColombiaTZInfo() {
  const now = getNowColombia();
  return {
    name: TIMEZONE_COLOMBIA,
    abbreviation: now.zoneName,
    offset: now.offset,
    isValid: now.isValid,
  };
}

/**
 * DEBUG: Formatea una hora con manejo de errores para debugging
 * @param {Date|string|DateTime} date - Fecha/hora a formatear
 * @param {string} format - Formato de Luxon (default: 'HH:mm')
 * @returns {string} Hora formateada o mensaje de error
 */
export function formatTimeColombiaDebug(date, format = "HH:mm") {
  try {
    const dt = convertToColombia(date);
    if (!dt || !dt.isValid) {
      console.error("\u274c convertToColombia fall\u00f3:", {
        date,
        dtResult: dt,
      });
      return `ERROR: ${typeof date}`;
    }
    const formatted = dt.toFormat(format, { locale: "es" });
    return formatted;
  } catch (error) {
    console.error("\u274c Error en formatTimeColombia:", error, { date });
    return "ERROR";
  }
}
