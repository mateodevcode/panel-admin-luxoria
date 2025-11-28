export function limpiarNombre(nombre) {
  // Elimina todo lo que no sean letras o espacios
  return nombre
    .normalize("NFD") // separa las tildes de las letras
    .replace(/[\u0300-\u036f]/g, "") // elimina las tildes
    .replace(/[^a-zA-Z\s]/g, "") // deja solo letras y espacios
    .trim(); // quita espacios al inicio y final
}
