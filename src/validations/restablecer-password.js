export function restablecerPasswordValidate(data) {
  const errores = [];

  if (!data.email || data.email.trim() === "") {
    errores.push("Por favor, ingresa un email.");
  }
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errores.push("Por favor, ingresa un email válido.");
  }

  return errores;
}
