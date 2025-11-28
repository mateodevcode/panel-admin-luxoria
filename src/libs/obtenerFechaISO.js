// Mapa de meses
const MESES = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

export function obtenerFechaISO(dia, mes, anio = new Date().getFullYear()) {
  const diaNum = Number(dia);
  if (!Number.isInteger(diaNum) || diaNum < 1 || diaNum > 31) {
    throw new Error(`"dia" inválido: ${dia}`);
  }

  // normaliza: minúsculas + elimina acentos
  const mesNormalizado = mes
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // ej: "Márzo" -> "marzo"

  const mesNumero = MESES[mesNormalizado];
  if (!mesNumero) {
    throw new Error(`Mes inválido: "${mes}"`);
  }

  const m = String(mesNumero).padStart(2, "0");
  const d = String(diaNum).padStart(2, "0");

  return `${anio}-${m}-${d}`;
}
