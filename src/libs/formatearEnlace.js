export function formatearEnlace(texto) {
  if (!texto) return "";

  // Si el texto tiene guiones, separamos por ellos
  if (texto.includes("-")) {
    return texto
      .split("-")
      .map(
        (palabra) =>
          palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
      )
      .join(" ");
  }

  // Si es una sola palabra
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
