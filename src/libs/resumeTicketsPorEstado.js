export function resumenTicketsPorEstado(tickets) {
  // Valida si es un array
  if (!Array.isArray(tickets)) {
    return {
      total: 0,
      abiertos: 0,
      enProceso: 0,
      terminados: 0,
    };
  }

  return tickets.reduce(
    (acc, ticket) => {
      acc.total += 1;

      // Normaliza el estado
      const estado = ticket.estado?.toLowerCase().trim();

      if (estado === "proceso") {
        acc.enProceso += 1;
      } else if (
        estado === "terminado" ||
        estado === "cerrado" ||
        estado === "completado"
      ) {
        acc.terminados += 1;
      } else {
        // Consideramos "pendiente", "abierto", etc. como "abiertos"
        acc.abiertos += 1;
      }

      return acc;
    },
    {
      total: 0,
      abiertos: 0,
      enProceso: 0,
      terminados: 0,
    }
  );
}
