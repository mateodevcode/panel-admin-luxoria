export function formatearNumeroWp(numero) {
  const digitos = numero.toString().replace(/\D/g, "").slice(-10);
  return `(+57) ${digitos.slice(0, 3)} ${digitos.slice(3, 6)} ${digitos.slice(
    6,
    10
  )}`;
}
