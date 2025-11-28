export function descansoValidate(data) {
  const errores = [];

  if (!data.barbero_id || data.barbero_id.trim() === "") {
    errores.push("Selecciona un barbero, por favor.");
  }

  if (!data.fecha || data.fecha.trim() === "") {
    errores.push("Selecciona una fecha, por favor.");
  }

  if (!data.tipo || data.tipo.trim() === "") {
    errores.push("Selecciona el horario.");
  }

  return errores;
}
