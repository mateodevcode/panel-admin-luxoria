export const validatePassword = (value) => {
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  if (!/[A-Z]/.test(value)) {
    return "La contraseña debe incluir al menos una letra mayúscula";
  }
  if (!/[a-z]/.test(value)) {
    return "La contraseña debe incluir al menos una letra minúscula";
  }
  if (!/[0-9]/.test(value)) {
    return "La contraseña debe incluir al menos un número";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return "La contraseña debe incluir al menos un carácter especial";
  }
  return "";
};

export const validateConfirmPassword = (value, pass) => {
  if (value !== pass) {
    return "Las contraseñas no coinciden";
  }
  return "";
};
