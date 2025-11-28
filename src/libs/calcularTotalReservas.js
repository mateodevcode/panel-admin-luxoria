export function calcularTotalReservas(reservas, servicios) {
  if (
    !reservas ||
    reservas === undefined ||
    !servicios ||
    servicios === undefined
  ) {
    return;
  }

  return reservas.reduce((total, reserva) => {
    // Verificar si la reserva tiene estado "confirmado"
    if (reserva.estado !== "confirmado") {
      return total; // Si no es confirmado, no sumar
    }

    // Buscar el servicio correspondiente por servicio_id
    const servicio = servicios.find(
      (s) => s._id.toString() === reserva.servicio_id
    );

    // Si encontramos el servicio, sumamos su precio
    if (servicio) {
      return total + servicio.precio;
    }

    return total;
  }, 0);
}
