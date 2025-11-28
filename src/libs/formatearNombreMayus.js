export function formatearNombreMayus(frase) {
  if (!frase || typeof frase !== "string") return "";

  return frase
    .toLowerCase()
    .split(" ")
    .filter(Boolean) // elimina espacios dobles
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}
