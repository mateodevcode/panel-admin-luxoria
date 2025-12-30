export function coleccionValidate(data) {
  const errores = [];

  if (!data.nombre || data.nombre.trim() === "") {
    errores.push("Por favor, ingresa un nombre de la colección.");
  }

  if (data.nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }

  if (!data.frase || data.frase.trim() === "") {
    errores.push("Por favor, ingresa una frase descriptiva.");
  }

  if (
    !Array.isArray(data.caracteristicas) ||
    data.caracteristicas.length === 0
  ) {
    errores.push("Por favor, agrega al menos una característica.");
  }

  // Validar que todas las características sean strings no vacías
  if (Array.isArray(data.caracteristicas)) {
    for (let i = 0; i < data.caracteristicas.length; i++) {
      if (
        typeof data.caracteristicas[i] !== "string" ||
        data.caracteristicas[i].trim() === ""
      ) {
        errores.push(`La característica ${i + 1} no puede estar vacía.`);
      }
    }
  }

  return errores;
}
