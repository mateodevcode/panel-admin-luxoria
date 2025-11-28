// validations/servicios.js
export function serviciosValidate(data, allServicios = []) {
  const errores = [];

  // Validar nombre
  if (!data.nombre || data.nombre.trim() === "") {
    errores.push("Por favor, ingresa el nombre del servicio.");
  } else if (data.nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  } else if (data.nombre.length > 100) {
    errores.push("El nombre no puede exceder 100 caracteres.");
  }

  // Validar título
  if (!data.titulo || data.titulo.trim() === "") {
    errores.push("Por favor, ingresa el título del servicio.");
  } else if (data.titulo.length > 100) {
    errores.push("El título no puede exceder 100 caracteres.");
  }

  // Validar descripción
  if (!data.descripcion || data.descripcion.trim() === "") {
    errores.push("Por favor, ingresa la descripción del servicio.");
  } else if (data.descripcion.length > 500) {
    errores.push("La descripción no puede exceder 500 caracteres.");
  }

  // Validar duración
  if (!data.duracion || data.duracion === "") {
    errores.push("Por favor, ingresa la duración del servicio.");
  } else if (isNaN(data.duracion) || data.duracion <= 0) {
    errores.push("La duración debe ser un número mayor a 0.");
  } else if (data.duracion > 480) {
    errores.push("La duración no puede exceder 480 minutos (8 horas).");
  }

  // Validar precio
  if (!data.precio || data.precio === "") {
    errores.push("Por favor, ingresa el precio del servicio.");
  } else if (isNaN(data.precio) || data.precio < 0) {
    errores.push("El precio debe ser un número mayor o igual a 0.");
  }

  // Validar puntuación (opcional pero si se ingresa, debe ser válida)
  if (
    data.puntuacion &&
    (isNaN(data.puntuacion) || data.puntuacion < 0 || data.puntuacion > 5)
  ) {
    errores.push("La puntuación debe estar entre 0 y 5.");
  }

  // Validar likes (opcional pero si se ingresa, debe ser válido)
  if (data.likes && (isNaN(data.likes) || data.likes < 0)) {
    errores.push("Los likes no pueden ser negativos.");
  }

  // Validar que no exista un servicio con el mismo nombre (excepto el mismo)
  if (
    data.nombre &&
    allServicios.some(
      (s) =>
        s.nombre.toLowerCase() === data.nombre.toLowerCase() &&
        s._id !== data._id
    )
  ) {
    errores.push("Ya existe un servicio con ese nombre.");
  }

  return errores;
}
