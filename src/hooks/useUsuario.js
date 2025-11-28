// hooks/useUsuario.js

import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { toast } from "sonner";

const useUsuario = () => {
  const { setUsuarios } = useContext(AppContext);

  const handleActualizarUsuario = async (id, nuevoEstado) => {
    if (!id || !nuevoEstado) {
      toast.error("Falta el ID o el estado a actualizar", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await apiServer(`/api/usuarios/${id}`, "PUT", {
        estado: nuevoEstado,
      });
      const { success, message, error, data } = res;

      if (success) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario._id === id ? { ...usuario, estado: nuevoEstado } : usuario
          )
        );

        toast.success(message || "Estado actualizado exitosamente", {
          position: "bottom-right",
        });
      } else {
        console.error("❌ Error al actualizar el estado:", error);
        toast.error("No se pudo actualizar el estado", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("Error al actualizar el estado. Inténtalo de nuevo.", {
        position: "bottom-right",
      });
    }
  };

  return {
    handleActualizarUsuario,
  };
};
export default useUsuario;
