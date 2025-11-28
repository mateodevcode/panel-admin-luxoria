// ✅ Usar Luxon para formateo SIEMPRE en zona horaria de Colombia
import { formatTimeColombia, formatDateColombia } from '@/libs/luxonColombia';

export const formatoFecha = (fecha) => {
  if (!fecha) return "";
  // Formatea con zona horaria Colombia: "13 noviembre 2025"
  return formatDateColombia(fecha, 'dd MMMM yyyy');
};

export const formatoHora = (fecha) => {
  if (!fecha) return "";
  // Formatea con zona horaria Colombia en 12 horas: "08:00 a.m."
  return formatTimeColombia(fecha, 'hh:mm a');
};

export const formatoFechaCorta = (fecha) => {
  if (!fecha) return "";
  // Formatea con zona horaria Colombia: "13/11/2025"
  return formatDateColombia(fecha, 'dd/MM/yyyy');
};

export function formatearFecha(fechaISO) {
  if (!fechaISO) return "";
  // Formatea con zona horaria Colombia: "13 de noviembre de 2025"
  return formatDateColombia(fechaISO, 'dd MMMM yyyy');
}
