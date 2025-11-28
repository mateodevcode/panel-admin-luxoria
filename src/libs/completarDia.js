export const completarDia = (dia) => {
  const n = typeof dia === "number" ? dia : Number(dia);
  if (!Number.isFinite(n)) {
    throw new Error(`"dia" debe ser un número válido. Recibido: ${dia}`);
  }
  return String(n).padStart(2, "0");
};
