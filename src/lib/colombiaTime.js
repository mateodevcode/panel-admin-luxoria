/**
 * 🇨🇴 UTILIDADES DE TIMEZONE PARA COLOMBIA (UTC-5)
 * Todas las funciones en este archivo garantizan hora de Colombia
 * #horacolomb ia
 */

/**
 * Obtiene la fecha/hora actual en Colombia (America/Bogota - UTC-5)
 * @returns {Date} Objeto Date con hora de Colombia
 */
export function getAhoraColombia() {
  // #horacolomb ia - Obtener hora actual de Colombia
  const ahora = new Date();
  // Restar 5 horas para obtener Colombia
  return new Date(ahora.getTime() - 5 * 60 * 60 * 1000);
}

/**
 * Obtiene solo la fecha (sin hora) de Colombia como Date
 * @returns {Date} Objeto Date con fecha de Colombia (a las 00:00:00)
 */
export function getFechaColombia() {
  // #horacolomb ia - Obtener fecha de Colombia
  const ahora = getAhoraColombia();
  const fecha = new Date(ahora);
  fecha.setHours(0, 0, 0, 0);
  return fecha;
}

/**
 * Convierte un string ISO o Date a su equivalente en hora Colombia
 * @param {string|Date} fecha - Fecha a convertir
 * @returns {Date} Objeto Date en zona horaria de Colombia
 */
export function convertirAColombia(fecha) {
  // #horacolomb ia - Convertir cualquier fecha a zona horaria Colombia
  if (!fecha) return null;
  
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  // Aplicar offset Colombia: UTC - 5 horas
  const offsetMs = -5 * 60 * 60 * 1000; // -5 horas en milisegundos
  return new Date(date.getTime() + offsetMs);
}

/**
 * Compara si dos fechas son el mismo día en zona horaria Colombia
 * @param {Date} fecha1 - Primera fecha
 * @param {Date} fecha2 - Segunda fecha
 * @returns {boolean} true si son el mismo día en Colombia
 */
export function esMismoDiaEnColombia(fecha1, fecha2) {
  // #horacolomb ia - Comparar si es mismo día en Colombia
  const f1 = convertirAColombia(fecha1);
  const f2 = convertirAColombia(fecha2);
  
  return (
    f1.getUTCFullYear() === f2.getUTCFullYear() &&
    f1.getUTCMonth() === f2.getUTCMonth() &&
    f1.getUTCDate() === f2.getUTCDate()
  );
}

/**
 * Obtiene inicio del día actual en Colombia (00:00:00)
 * @returns {Date} Inicio del día en Colombia
 */
export function getInicioDiaColombia() {
  // #horacolomb ia - Obtener inicio del día en Colombia
  const ahora = getAhoraColombia();
  const inicio = new Date(ahora);
  inicio.setUTCHours(0, 0, 0, 0);
  return inicio;
}

/**
 * Obtiene fin del día actual en Colombia (23:59:59)
 * @returns {Date} Fin del día en Colombia
 */
export function getFinDiaColombia() {
  // #horacolomb ia - Obtener fin del día en Colombia
  const ahora = getAhoraColombia();
  const fin = new Date(ahora);
  fin.setUTCHours(23, 59, 59, 999);
  return fin;
}

/**
 * Obtiene inicio y fin del día para una fecha específica en Colombia
 * @param {string|Date} fecha - Fecha de referencia (formato YYYY-MM-DD o Date)
 * @returns {Object} { inicio, fin } con ambos extremos del día en Colombia
 */
export function getRangoDelDiaColombia(fecha) {
  // #horacolomb ia - Obtener rango completo del día en Colombia
  let fechaBase;
  
  if (typeof fecha === 'string') {
    // Parsear como fecha local Colombia
    const [year, month, day] = fecha.split('-');
    fechaBase = new Date(`${year}-${month}-${day}T00:00:00Z`);
  } else {
    fechaBase = convertirAColombia(fecha);
  }

  const inicio = new Date(fechaBase);
  inicio.setUTCHours(0, 0, 0, 0);

  const fin = new Date(fechaBase);
  fin.setUTCHours(23, 59, 59, 999);

  return { inicio, fin };
}

/**
 * Crea una hora específica en Colombia
 * @param {string} horaString - Hora en formato "HH:mm" o "HH:mm:ss"
 * @param {string|Date} fecha - Fecha opcional (por defecto usa hoy)
 * @returns {Date} Objeto Date con la hora especificada en Colombia
 */
export function crearHoraEnColombia(horaString, fecha) {
  // #horacolomb ia - Crear hora específica en Colombia
  const baseFecha = fecha ? convertirAColombia(fecha) : getAhoraColombia();
  const [hora, minuto, segundo = '00'] = horaString.split(':');

  const resultado = new Date(baseFecha);
  resultado.setUTCHours(parseInt(hora), parseInt(minuto), parseInt(segundo), 0);

  return resultado;
}

/**
 * Obtiene el nombre del día (en español) para una fecha en Colombia
 * @param {string|Date} fecha - Fecha de referencia
 * @returns {string} Nombre del día (ej: "lunes", "martes", etc.)
 */
export function getNombreDiaColombia(fecha) {
  // #horacolomb ia - Obtener nombre del día en Colombia
  const diasEspanol = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const fechaCol = convertirAColombia(fecha);
  
  // Para UTC, usamos getUTCDay
  return diasEspanol[fechaCol.getUTCDay()];
}

/**
 * Formatea una fecha/hora como string legible en Colombia
 * @param {Date|string} fecha - Fecha a formatear
 * @param {string} formato - 'completa', 'fecha', 'hora', 'corta'
 * @returns {string} Fecha formateada
 */
export function formatearFechaColombia(fecha, formato = 'completa') {
  // #horacolomb ia - Formatear fecha en hora Colombia
  const fechaCol = convertirAColombia(fecha);

  const opciones = {
    completa: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Bogota',
    },
    fecha: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Bogota',
    },
    hora: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Bogota',
    },
    corta: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/Bogota',
    },
  };

  return new Intl.DateTimeFormat('es-CO', opciones[formato] || opciones.completa).format(fechaCol);
}

/**
 * Verifica si una hora ya pasó en Colombia
 * @param {Date} horaAVerificar - Hora a verificar
 * @returns {boolean} true si ya pasó, false si aún no ocurre
 */
export function yaProColombia(horaAVerificar) {
  // #horacolomb ia - Verificar si hora ya pasó en Colombia
  const ahora = getAhoraColombia();
  return horaAVerificar < ahora;
}

/**
 * Diferencia de horas en Colombia
 * @param {Date} fecha1 - Primera fecha
 * @param {Date} fecha2 - Segunda fecha
 * @returns {number} Diferencia en milisegundos
 */
export function diferenciaMilisegundosColombia(fecha1, fecha2) {
  // #horacolomb ia - Calcular diferencia entre dos horas en Colombia
  const f1 = convertirAColombia(fecha1);
  const f2 = convertirAColombia(fecha2);
  return Math.abs(f2.getTime() - f1.getTime());
}

/**
 * Formatea SOLO la hora en zona horaria Colombia - CON AM/PM
 * @param {Date|string} fecha - Fecha/hora a formatear
 * @returns {string} Hora formateada en Colombia (ej: "2:30 p.m." o "14:30")
 */
export function formatarHoraColombia(fecha, conSegundos = false) {
  // #horacolomb ia - Formatear hora en Colombia CON AM/PM
  if (!fecha) return '';
  
  const date = new Date(fecha);
  
  // Usar toLocaleTimeString con timeZone Colombia
  // hour12: true para obtener AM/PM
  const opciones = {
    timeZone: 'America/Bogota',
    hour: 'numeric',
    minute: '2-digit',
    ...(conSegundos && { second: '2-digit' }),
    hour12: true, // Para AM/PM
  };
  
  return date.toLocaleTimeString('es-CO', opciones);
}
