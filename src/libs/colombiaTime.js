/**
 * Utilidad centralizada para trabajar con zona horaria de Colombia (COT - UTC-5)
 * Esta librería asegura que todas las operaciones de fecha/hora usen la zona de Colombia
 */

/**
 * Obtiene la fecha y hora actual de Colombia
 * @returns {Date} Fecha actual en zona de Colombia
 */
export function getNowColombia() {
  const now = new Date();
  // Colombia usa UTC-5 (COT)
  const colombiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  return colombiaTime;
}

/**
 * Convierte una fecha a la zona horaria de Colombia
 * @param {Date|string} date - Fecha a convertir
 * @returns {Date} Fecha convertida a zona de Colombia
 */
export function convertToColombia(date) {
  if (!date) return null;
  
  const dateObj = new Date(date);
  const colombiaDate = new Date(dateObj.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  return colombiaDate;
}

/**
 * Obtiene solo la fecha de hoy en Colombia (sin hora)
 * @returns {Date} Fecha de hoy a las 00:00:00 en Colombia
 */
export function getTodayInColombia() {
  const today = new Date();
  const colombiaToday = new Date(today.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  colombiaToday.setHours(0, 0, 0, 0);
  return colombiaToday;
}

/**
 * Obtiene el día de la semana en Colombia para una fecha específica
 * 🔧 CORREGIDO: Maneja correctamente fechas ISO sin desplazamiento de día
 * @param {Date|string} date - Fecha para obtener el día (YYYY-MM-DD o Date)
 * @returns {string} Nombre del día en español (lowercase)
 */
export function getDayNameColombia(date) {
  let dateToUse;
  
  // ✅ Si es string ISO (YYYY-MM-DD), parsea directamente sin double-conversion
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = date.split('-').map(Number);
    // Crear fecha a las 00:00 local (como si fuera la fecha ISO real)
    dateToUse = new Date(year, month - 1, day, 0, 0, 0, 0);
  } else {
    // Si es Date, convertir a Colombia primero
    dateToUse = convertToColombia(date);
  }
  
  const dias = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
  };
  const dayIndex = dateToUse.getDay();
  return Object.keys(dias)[dayIndex];
}

/**
 * Crea una fecha en Colombia a partir de una hora específica (HH:MM)
 * Útil para crear bloques de horario
 * @param {string} fechaISO - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM
 * @returns {Date} Fecha completa en zona de Colombia
 */
export function createDateInColombia(fechaISO, hora) {
  // Crear la fecha en UTC primero
  const [year, month, day] = fechaISO.split('-').map(Number);
  const [hours, minutes] = hora.split(':').map(Number);
  
  // Crear fecha a las 00:00 UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));
  
  // Convertir a Colombia (restar 5 horas)
  const colombiaDate = new Date(utcDate.getTime() - (5 * 60 * 60 * 1000));
  
  return colombiaDate;
}

/**
 * Obtiene el string de fecha en formato ISO (YYYY-MM-DD) en zona de Colombia
 * @param {Date|string} date - Fecha a convertir
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export function getDateISO(date) {
  const colombiaDate = convertToColombia(date);
  const year = colombiaDate.getFullYear();
  const month = String(colombiaDate.getMonth() + 1).padStart(2, '0');
  const day = String(colombiaDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a un objeto Date en zona de Colombia
 * 🔧 CORREGIDO: Parsea correctamente sin desplazamiento de zona
 * @param {string} fechaISO - Fecha en formato YYYY-MM-DD
 * @returns {Date} Objeto Date a las 00:00:00
 */
export function parseISO(fechaISO) {
  const [year, month, day] = fechaISO.split('-').map(Number);
  // Crear fecha local a las 00:00 (esto respeta el día de la semana correcto)
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Suma días a una fecha en zona de Colombia
 * @param {Date} date - Fecha inicial
 * @param {number} days - Cantidad de días a sumar (puede ser negativo)
 * @returns {Date} Nueva fecha en zona de Colombia
 */
export function addDaysColombia(date, days) {
  const colombiaDate = convertToColombia(date);
  colombiaDate.setDate(colombiaDate.getDate() + days);
  return colombiaDate;
}

/**
 * Verifica si una fecha es hoy en zona de Colombia
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} true si es hoy, false en caso contrario
 */
export function isTodayColombia(date) {
  const colombiaDate = convertToColombia(date);
  const today = getTodayInColombia();
  return colombiaDate.toDateString() === today.toDateString();
}

/**
 * Verifica si una fecha es en el pasado en zona de Colombia
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} true si es en el pasado, false en caso contrario
 */
export function isPastColombia(date) {
  const colombiaDate = convertToColombia(date);
  const now = getNowColombia();
  return colombiaDate < now;
}

/**
 * Obtiene el offset en minutos de Colombia respecto a UTC
 * @returns {number} Offset en minutos (para Colombia es -300, es decir, -5 horas)
 */
export function getColombiaTZOffset() {
  return -300; // Colombia UTC-5
}
