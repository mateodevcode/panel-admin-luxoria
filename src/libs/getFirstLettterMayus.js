export function getFirstLetterMayus(cadena) {
  if (typeof cadena !== "string" || cadena.length === 0) {
    return "";
  }
  return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}
