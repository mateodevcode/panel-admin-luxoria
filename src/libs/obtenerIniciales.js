export function obtenerIniciales(nombreCompleto) {
  if (nombreCompleto === undefined || nombreCompleto === null) {
    return "";
  }
  const palabras = nombreCompleto.trim().split(/\s+/);
  if (palabras.length === 1) {
    return palabras[0].slice(0, 2).toUpperCase();
  } else {
    return palabras
      .slice(0, 2)
      .map((p) => p.charAt(0).toUpperCase())
      .join("");
  }
}
