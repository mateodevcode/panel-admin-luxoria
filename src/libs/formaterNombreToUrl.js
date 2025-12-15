export const formaterNombreToUrl = (frase) => {
  return (
    frase
      // Convertir a minúsculas
      .toLowerCase()

      // Eliminar acentos y caracteres especiales
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

      // Reemplazar puntos y comas por espacios
      .replace(/[.,]/g, " ")

      // Reemplazar múltiples espacios por un solo espacio
      .replace(/\s+/g, " ")

      // Eliminar caracteres no alfanuméricos excepto espacios
      .replace(/[^a-z0-9\s-]/g, "")

      // Reemplazar espacios por guiones
      .replace(/\s+/g, "-")

      // Eliminar guiones al inicio y final
      .replace(/^-+|-+$/g, "")

      // Eliminar guiones múltiples consecutivos
      .replace(/-+/g, "-")

      // Eliminar espacios sobrantes
      .trim()
  );
};
