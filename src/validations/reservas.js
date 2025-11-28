export function reservasValidate(data) {
  const errores = [];

  if (!data.fecha) {
    errores.push("Se requiere una fecha para la reserva");
  }

  if (data.servicio === "") {
    errores.push("Selecciona un servicio para la reserva");
  }

  if (!data.barbero) {
    errores.push("Selecciona un barbero para la reserva, por favor.");
  }

  if (!data.cliente_id || data.cliente_id === "") {
    errores.push("Falta el Id de usuario.");
  }

  if (!data.hora_inicio || data.hora_inicio === "") {
    errores.push("Selecciona una fecha de inicio.");
  }

  if (!data.nombre || data.nombre.trim() === "") {
    errores.push("Ingresa tu nombre, por favor.");
  }

  if (!data.telefono || data.telefono.trim() === "") {
    errores.push("Ingresa tu número de teléfono, por favor.");
  }

  return errores;
}
