export function coleccionValidate(data) {
  const errores = [];

  if (!data.nombre || data.nombre.trim() === "") {
    errores.push("Por favor, ingresa un nombre de la colección.");
  }

  if (data.nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }

  if (!data.descripcion || data.descripcion.trim() === "") {
    errores.push("Por favor, ingresa una descripción.");
  }

  return errores;
}
