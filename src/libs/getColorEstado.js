export function getColorEstado(estado) {
  switch (estado) {
    case "pagada":
      return "bg-green-100 text-green-800";
    case "completado":
      return "bg-green-100 text-green-800";
    case "terminado":
      return "bg-green-100 text-green-800";
    case "activo":
      return "bg-green-100 text-green-800";
    case "proceso":
      return "bg-blue-100 text-blue-800";
    case "cerrado":
      return "bg-green-100 text-green-800";
    case "abierto":
      return "bg-yellow-100 text-yellow-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800";
    case "cancelada":
      return "bg-red-100 text-red-800";
    case "inactivo":
      return "bg-red-100 text-red-800";
    case "cancelado":
      return "bg-red-100 text-red-800";
    case "vencida":
      return "bg-red-100 text-red-800";
    case "Growth":
      return "text-amber-800 bg-amber-600/10";
    case "Starter":
      return "text-blue-800 bg-blue-600/10";
    case "Partner":
      return "text-purple-800 bg-purple-600/10";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
