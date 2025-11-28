// hooks/useIniciarSesion.js
import { apiServer } from "@/app/actions/apiServer";
import { AppContext } from "@/context/AppContext";
import { Errores } from "@/libs/Errores";
import { iniciarSesionValidate } from "@/validations/iniciarSesion";
import { registrarseValidate } from "@/validations/registrarse";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import useResetForm from "./useResetForm";

const useIniciarSesion = () => {
  const {
    formDataUsuario,
    setFormDataUsuario,
    contadorClick,
    setContadorClick,
    setUsuarios,
    usuarios,
  } = useContext(AppContext);
  const router = useRouter();
  const { resetFormDataUsuario } = useResetForm();

  useEffect(() => {
    if (contadorClick > 3) {
      const cargarUsuarios = async () => {
        try {
          const res = await apiServer("/api/usuarios", "GET");
          const { data: usuariosRes, message, success, error } = res;
          if (success === true) {
            setUsuarios(usuariosRes);
          } else {
            console.warn("⚠️ No se pudo cargar el usuario:", message);
          }
        } catch (error) {
          console.error("🚨 Error al cargar el usuario:", error);
        }
      };
      cargarUsuarios();
    }
  }, [contadorClick]);

  const verificarBloqueos = usuarios.find(
    (usuario) =>
      usuario.email.toLowerCase() === formDataUsuario.email.toLowerCase() &&
      usuario.bloqueado === true
  );

  const handleLoginCredenciales = async (e) => {
    e.preventDefault();

    const errores = iniciarSesionValidate(formDataUsuario, usuarios);

    if (errores.length > 0) {
      toast.error(errores[0], {
        position: "bottom-right",
      });

      return;
    }

    setContadorClick(contadorClick + 1);

    if (verificarBloqueos) {
      toast.error("Usuario bloqueado", {
        description:
          `Tu cuenta ${verificarBloqueos.email} está bloqueada. ` +
          "Por favor, contacta al administrador.",
        position: "bottom-right",
      });
      return;
    }
    try {
      const res = await signIn("credentials", {
        email: formDataUsuario.email,
        password: formDataUsuario.password,
        redirect: false,
      });
      resetFormDataUsuario();
      if (res?.ok) {
        router.push("/admin");
        toast.success("¡Inicio de sesión exitoso!", {
          position: "top-right",
        });
      } else {
        toast.error(res?.error, {
          description: Errores(res?.error),
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Por favor, intenta de nuevo.", {
        position: "bottom-right",
      });
      console.error("Error during sign-in:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginGoogle = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleLoginFacebook = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleCerrarSesion = () => {
    signOut({
      callbackUrl: `/`,
    });
  };

  return {
    handleChange,
    handleLoginGoogle,
    handleLoginCredenciales,
    handleLoginFacebook,
    handleCerrarSesion,
  };
};

export default useIniciarSesion;
