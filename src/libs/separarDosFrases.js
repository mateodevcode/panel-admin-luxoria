export function separarDosFrases(texto) {
  if (!texto || typeof texto !== "string") {
    return { primera: "", segunda: "" };
  }

  const partes = texto.split(".");

  const primera = partes[0]?.trim() || "";
  const segunda = partes[1]?.trim() || ""; // Solo la segunda frase (después del primer punto)

  return { primera, segunda };
}
