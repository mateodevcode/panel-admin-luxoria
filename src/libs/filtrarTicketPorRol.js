export function filtrarTicketsPorRol(usuario, tickets) {
  // Si no hay tickets o no hay usuario, devolver vacío
  if (!tickets || !Array.isArray(tickets) || !usuario) {
    return [];
  }

  // Si el usuario es admin, mostrar todos
  if (usuario.role === "admin") {
    return tickets;
  }

  // Si no es admin, filtrar por su _id
  return tickets.filter((ticket) => ticket.cliente === usuario._id);
}
