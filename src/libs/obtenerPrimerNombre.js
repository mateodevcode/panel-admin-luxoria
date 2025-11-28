export function obtenerPrimerNombre(texto) {
  if (!texto.trim()) return "";
  const primera = texto.trim().split(" ")[0]; // toma solo la primera palabra
  return primera.charAt(0).toUpperCase() + primera.slice(1).toLowerCase();
}
