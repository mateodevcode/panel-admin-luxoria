import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { formatTimeColombia, formatDateColombia } from "@/libs/luxonColombia";

export const getStatusIcon = (estado) => {
  switch (estado) {
    case "pendiente":
      return <AlertCircle className="h-4 w-4" />;
    case "confirmado":
      return <CheckCircle2 className="h-4 w-4" />;
    case "completado":
      return <CheckCircle2 className="h-4 w-4" />;
    case "cancelado":
      return <XCircle className="h-4 w-4" />;
    case true:
      return <CheckCircle2 className="h-4 w-4" />;
    case false:
      return <XCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

export const getStatusColor = (estado) => {
  switch (estado) {
    // case "pendiente":
    //   return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "confirmado":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "completado":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "cancelado":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case true:
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case false:
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

// ✅ Formatea fecha CON zona horaria Colombia
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return formatDateColombia(dateString, "dd MMM yyyy");
};

// ✅ Formatea hora CON zona horaria Colombia en formato 12 horas con AM/PM
export const formatTime = (dateString) => {
  if (!dateString) return "";
  return formatTimeColombia(dateString, "hh:mm a");
};
