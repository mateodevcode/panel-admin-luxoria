// hooks/useColeccion.js
import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import { coleccionValidate } from "@/validations/coleccion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import useResetForm from "./useResetForm";

const useColeccion = () => {
  const { setColecciones, formDataColeccion, setFormDataColeccion, productos } =
    useContext(AppContext);
  const router = useRouter();
  const { resetFormDataColeccion } = useResetForm();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormDataColeccion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeFile = (e, setFile, setPreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validar tamaño (10MB máximo)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("El archivo pesa más de 10MB");
        return;
      }
      // Validar que sea imagen
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Solo se permiten imágenes");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Previsualización local
    }
  };

  const handleAgregarColeccion = async (
    e,
    setLoading,
    setFileImgVer,
    setFileImgHor,
    setFileImgPortada,
    setPreviewImgUrlVer,
    setPreviewImgUrlHor,
    setPreviewImgUrlPortada,
    fileImgVer,
    fileImgHor,
    fileImgPortada,
    coleccionId
  ) => {
    e.preventDefault();

    const errores = coleccionValidate(formDataColeccion);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "top-center",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();

    // ✅ Agregar archivos al FormData (solo si existen)
    if (fileImgVer) {
      formData.append("fileImgVer", fileImgVer);
    }
    if (fileImgHor) {
      formData.append("fileImgHor", fileImgHor);
    }
    if (fileImgPortada) {
      formData.append("fileImgPortada", fileImgPortada);
    }

    // Agregar datos del formulario
    formData.append("nombre", formDataColeccion.nombre);
    formData.append("frase", formDataColeccion.frase);
    formData.append(
      "caracteristicas",
      JSON.stringify(formDataColeccion.caracteristicas)
    );
    formData.append("isActive", formDataColeccion.isActive);
    formData.append("opcion", formDataColeccion.opcion);

    if (formDataColeccion.opcion === "editar") {
      formData.append("coleccionId", coleccionId);
    }

    try {
      const res = await fetch("/api/upload/coleccion", {
        method: "POST",
        body: formData,
      });

      const { data: coleccionRes, message, success, error } = await res.json();

      if (success === true) {
        setColecciones((colecciones) => {
          const index = colecciones.findIndex(
            (col) => col._id === coleccionRes._id
          );

          if (index !== -1) {
            // Ya existe → reemplazar
            const actualizadas = [...colecciones];
            actualizadas[index] = coleccionRes;
            return actualizadas;
          } else {
            // No existe → agregar
            return [...colecciones, coleccionRes];
          }
        });
        toast.success(message, {
          position: "top-right",
        });

        // Limpiar formulario
        resetFormDataColeccion();
        setFileImgVer(null);
        setFileImgHor(null);
        setFileImgPortada(null);
        setPreviewImgUrlVer(null);
        setPreviewImgUrlHor(null);
        setPreviewImgUrlPortada(null);

        router.push("/admin/apps/colecciones/lista-colecciones");
      } else {
        console.warn("⚠️ No se pudo agregar la colección:", error);
        toast.error("No se pudo agregar la colección", {
          description: error || "Error desconocido",
        });
      }
    } catch (error) {
      console.error("🚨 Error al agregar la colección:", error);
      toast.error("Error al conectar con el servidor", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarColeccion = async (id) => {
    if (!id) {
      toast.error("No se agregó el id", { position: "bottom-right" });
      return;
    }

    try {
      const res = await apiServer(`/api/colecciones/${id}`, "DELETE");
      const { data: coleccionRes, message, success, error } = res;
      if (success === true) {
        setColecciones((prev) =>
          prev.filter((colecciones) => colecciones._id !== id)
        );
        toast.success(message, {
          position: "bottom-right",
        });
        router.push("/admin/apps/colecciones/lista-colecciones");
      } else {
        console.warn("⚠️ No se pudo eliminar la colección:", error);
        toast.error("No se pudo eliminar la colección", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al eliminar la colección:", error);
      toast.error("Error al eliminar", {
        description: error.message,
        position: "bottom-right",
      });
    }
  };

  return {
    handleChange,
    handleChangeFile,
    handleEliminarColeccion,
    handleAgregarColeccion,
  };
};

export default useColeccion;
