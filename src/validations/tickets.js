export function ticketsValidate(datos, usuarioQ) {
  const errores = [];

  if (usuarioQ.role === "admin") {
    if (!datos.cliente || datos.cliente.trim() === "") {
      errores.push("Por favor, selecciona un cliente para el ticket.");
    }
  }

  if (!datos.titulo || datos.titulo.trim() === "") {
    errores.push("Por favor, ingresa un título para el ticket.");
  }

  if (datos.titulo && datos.titulo.length > 40) {
    errores.push("El título no puede exceder los 40 caracteres.");
  }

  if (datos.titulo && datos.titulo.length < 5) {
    errores.push("El título debe tener al menos 5 caracteres.");
  }

  if (!datos.categoria || datos.categoria.trim() === "") {
    errores.push("Por favor, selecciona una categoría para el ticket.");
  }

  if (!datos.prioridad || datos.prioridad.trim() === "") {
    errores.push("Por favor, selecciona una prioridad para el ticket.");
  }

  if (!datos.detalle || datos.detalle.trim() === "") {
    errores.push("Por favor, ingresa un detalle para el ticket.");
  }

  if (datos.detalle && datos.detalle.length < 10) {
    errores.push("El detalle debe tener al menos 10 caracteres.");
  }

  if (datos.detalle && datos.detalle.length > 500) {
    errores.push("El detalle no puede exceder los 500 caracteres.");
  }

  return errores;
}

export function cambiarTicketValidate(estado) {
  const errores = [];

  if (!estado || estado.trim() === "") {
    errores.push("Por favor, selecciona un estado para el ticket.");
  }
  return errores;
}

export function agregarMensajeValidate(mensaje) {
  const errores = [];

  if (!mensaje || mensaje.trim() === "") {
    errores.push("El mensaje no puede estar vacío.");
  }
  if (mensaje && mensaje.length < 2) {
    errores.push("El mensaje debe tener al menos 2 caracteres.");
  }
  if (mensaje && mensaje.length > 300) {
    errores.push("El mensaje no puede exceder los 300 caracteres.");
  }

  return errores;
}
