// hooks/usePerfil.js
import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import { passwordValidate } from "@/validations/password";
import { usuariosValidate } from "@/validations/usuario";
import { useContext, useState } from "react";
import { toast } from "sonner";

const usePerfil = () => {
  const {
    setUsuario,
    formDataUsuario,
    setFormDataUsuario,
    setUsuarios,
    usuarios,
    setModalCambiarPassword,
    setPassword,
    setConfirmarPassword,
    setPasswordActual,
  } = useContext(AppContext);

  // ✅ Estados para controlar carga
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingPasswordAdmin, setIsUpdatingPasswordAdmin] = useState(false);

  const handleChangeFile = (e, setFile, setPreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("El archivo pesa más de 10MB");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataUsuario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleActualizarUsuario = async (
    e,
    setLoading,
    setFile,
    setPreview,
    file,
    userId
  ) => {
    e.preventDefault();

    // ✅ Prevenir múltiples clics
    if (isUpdating) {
      toast.error("Por favor espera, tus datos se están guardando...", {
        position: "bottom-right",
      });
      return;
    }

    const errores = usuariosValidate(formDataUsuario, usuarios);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "top-center",
      });
      return;
    }

    // ✅ Activar el estado de carga
    setIsUpdating(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", formDataUsuario.name);
    formData.append("email", formDataUsuario.email);
    formData.append("telefono", formDataUsuario.telefono);
    formData.append("ubicacion", formDataUsuario.ubicacion);
    formData.append("opcion", formDataUsuario.opcion);
    if (formDataUsuario.opcion === "editar") {
      formData.append("userId", userId);
    }

    try {
      const res = await fetch("/api/upload/usuario", {
        method: "POST",
        body: formData,
      });

      const { data: usuarioRes, message, success, error } = await res.json();

      if (success === true) {
        setUsuario(usuarioRes);
        setUsuarios((preUsuario) => {
          const index = preUsuario.findIndex(
            (user) => user._id === usuarioRes._id
          );

          if (index !== -1) {
            // Ya existe → reemplazar
            const actualizadas = [...preUsuario];
            actualizadas[index] = usuarioRes;
            return actualizadas;
          } else {
            // No existe → agregar
            return [...preUsuario, usuarioRes];
          }
        });
        toast.success(message, {
          position: "top-right",
        });
        setFile(null);
        setPreview(null);
      } else {
        console.warn("⚠️ No se pudo actualizar el usuario:", error);
        toast.error("No se pudo actualizar el usuario:", {
          description: error,
        });
      }
    } catch (error) {
      console.error("🚨 Error al actualizar el usuario:", error);
      toast.error("Error al actualizar el usuario. Inténtalo de nuevo.", {
        position: "bottom-right",
      });
    } finally {
      // ✅ Desactivar ambos estados de carga
      setLoading(false);
      setIsUpdating(false);
    }
  };

  const handleActualizarPassword = async (
    userId,
    password,
    confirmarPassword
  ) => {
    // ✅ Prevenir múltiples clics
    if (isUpdatingPassword) {
      toast.error("Por favor espera, tu contraseña se está actualizando...", {
        position: "bottom-right",
      });
      return;
    }

    const errores = passwordValidate(password, confirmarPassword);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "top-center",
      });
      return;
    }

    // ✅ Activar el estado de carga
    setIsUpdatingPassword(true);

    try {
      const res = await apiServer(`/api/usuarios/cambiar-password`, "PUT", {
        id: userId,
        password: password,
      });

      const { success, message, error, data: usuarioRes } = res;

      if (success === true) {
        setUsuario(usuarioRes);
        setUsuarios((prev) =>
          prev.map((user) => (user._id === usuarioRes._id ? usuarioRes : user))
        );
        setModalCambiarPassword(false);
        toast.success(message, {
          position: "top-right",
        });
        setPassword("");
        setConfirmarPassword("");
      } else {
        console.warn("⚠️ No se pudo actualizar la contraseña", error);
        toast.error("No se pudo actualizar la contraseña", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error al guardar la actualizar la contraseña", error);
      toast.error("Error al guardar la contraseña. Inténtalo de nuevo.", {
        position: "bottom-right",
      });
    } finally {
      // ✅ Desactivar el estado de carga
      setIsUpdatingPassword(false);
    }
  };

  const handleActualizarPasswordAdmin = async (
    userId,
    passwordActual,
    password,
    confirmarPassword
  ) => {
    // ✅ Prevenir múltiples clics
    if (isUpdatingPasswordAdmin) {
      toast.error("Por favor espera, tu contraseña se está actualizando...", {
        position: "bottom-right",
      });
      return;
    }

    const errores = passwordValidate(password, confirmarPassword);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "top-center",
      });
      return;
    }

    // ✅ Activar el estado de carga
    setIsUpdatingPasswordAdmin(true);

    try {
      const res = await apiServer(
        `/api/usuarios/cambiar-password-admin`,
        "PUT",
        {
          id: userId,
          nueva_password: password,
          password_actual: passwordActual,
        }
      );

      const { success, message, error, data: usuarioRes } = res;

      if (success === true) {
        setUsuario(usuarioRes);
        setUsuarios((prev) =>
          prev.map((user) => (user._id === usuarioRes._id ? usuarioRes : user))
        );
        setModalCambiarPassword(false);
        toast.success(message, {
          position: "top-right",
        });
        setPassword("");
        setConfirmarPassword("");
        setPasswordActual("");
      } else {
        console.warn("⚠️ No se pudo actualizar la contraseña", error);
        toast.error("No se pudo actualizar la contraseña", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error al guardar la actualizar la contraseña", error);
      toast.error("Error al guardar la contraseña. Inténtalo de nuevo.", {
        position: "bottom-right",
      });
    } finally {
      // ✅ Desactivar el estado de carga
      setIsUpdatingPasswordAdmin(false);
    }
  };

  return {
    handleChange,
    handleChangeFile,
    handleActualizarUsuario,
    handleActualizarPassword,
    handleActualizarPasswordAdmin,
    isUpdating,
    isUpdatingPassword, // ✅ Exportar el estado
    isUpdatingPasswordAdmin, // ✅ Exportar el estado
  };
};

export default usePerfil;
