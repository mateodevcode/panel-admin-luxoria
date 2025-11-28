export const Errores = (error) => {
  const errores = {
    "Correo no registrado": "El correo ingresado no está registrado.",
    "Contraseña incorrecta": "La contraseña es incorrecta.",
    "Cuenta bloqueada":
      "La cuenta ha sido bloqueada, por favor contacta al administrador.",
    "Usuario bloqueado": "Usuario bloqueado por múltiples intentos fallidos",
  };
  return errores[error] || "Ha ocurrido un error.";
};
