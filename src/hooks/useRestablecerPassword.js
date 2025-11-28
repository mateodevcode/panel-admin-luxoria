// hooks/useRestablecerPassword.js
import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import {
  validateConfirmPassword,
  validatePassword,
} from "@/libs/validatePassword";
import { restablecerPasswordValidate } from "@/validations/restablecer-password";
import { validarCodigoValidate } from "@/validations/validarCodigo";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

const useRestablecerPassword = () => {
  const {
    usuarios,
    setUsuarios,
    formData,
    setFormData,
    setMensajeGenerarOtp,
    setValidarUsuarioExistente,
    setIdReset,
    idReset,
    setIsCodigoValidado,
  } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const usuarioExistente = usuarios.some(
      (usuario) =>
        usuario.email === formData.email.toLowerCase() &&
        usuario.codigo_verificacion !== "" &&
        usuario.intentos_fallidos <= 3
    );
    setValidarUsuarioExistente(usuarioExistente);
  }, [formData.email, usuarios, formData.codigo_verificacion]);

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === formData.email.toLowerCase()
  );

  const handleSolicitarCodigo = async () => {
    const errores = restablecerPasswordValidate(formData, usuarios);
    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "bottom-right",
      });
      return;
    }

    try {
      const res = await apiServer(`/api/generar-codigo`, "POST", {
        id: usuarioEncontrado?._id,
      });
      const { success, message, error, data: usuarioRes } = res;
      if (success === true) {
        await apiServer(`/api/emails/generar-codigo`, "POST", {
          codigo: usuarioRes.codigo_verificacion,
          email: usuarioRes.email.toLowerCase(),
        });

        setUsuarios((prev) =>
          prev.map((usuario) =>
            usuario._id === usuarioRes._id ? usuarioRes : usuario
          )
        );
        toast.success(message, {
          position: "top-right",
        });
        setMensajeGenerarOtp(
          "Hemos enviado un código a tu correo electrónico, por favor revisa tu bandeja de entrada."
        );
        setTimeout(() => {
          router.push(
            "/restablecer-contrasena?email=" +
              decodeURIComponent(formData.email.toLowerCase())
          );
          setMensajeGenerarOtp("");
          setFormData({ email: "", codigo_verificacion: "", password: "" });
        }, 8000);
      } else {
        console.warn("⚠️ No se pudo restablecer la contraseña:", error);
        toast.error("No se pudo restablecer la contraseña:", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al restablecer la contraseña:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidarCodigo = async () => {
    const errores = validarCodigoValidate(formData, usuarios);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "bottom-right",
      });

      return;
    }

    try {
      const res = await apiServer("/api/validar-codigo", "POST", formData);

      const { data: idRes, message, success, error } = res;

      if (success === true) {
        setIdReset(idRes);
        toast.success(message, {
          position: "top-right",
        });
        setIsCodigoValidado(true);
      } else {
        console.warn("⚠️ No se pudo actualizar el usuario:", error);
        toast.error("No se pudo validar el codigo:", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al validar el codigo:", error);
    }
  };

  const handleChangeOtp = (value) => {
    setFormData((prev) => ({ ...prev, codigo_verificacion: value }));
  };

  const handleCambiarPassword = async (
    e,
    confirmPassword,
    password,
    setIsSubmitting,
    setResetComplete,
    setErrors
  ) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Si hay errores, no continuar
    if (passwordError || confirmPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiServer(`/api/usuario/reset-password`, "PATCH", {
        password,
        id: idReset,
      });
      const { error, message, data: usuarioRes, success } = res;

      if (success === true) {
        setUsuarios((prev) =>
          prev.map((user) =>
            user._id === usuarioRes._id ? { ...user, ...usuarioRes } : user
          )
        );
        setResetComplete(true);
        toast.success(message, {
          position: "top-right",
        });
        const timer = setTimeout(() => {
          router.push(`/iniciar-sesion/?email=${usuarioRes.email}`);
          clearTimeout(timer);
        }, 8000);
      } else {
        console.warn("⚠️ No se pudo actualizar la contraseña:", error);
        toast.error("No se pudo actualizar la contraseña:", {
          description: error,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("🚨 Error al actualizar la contraseña:", error);
    }
  };

  return {
    handleSolicitarCodigo,
    handleChange,
    handleValidarCodigo,
    handleChangeOtp,
    handleCambiarPassword,
  };
};

export default useRestablecerPassword;
