export function validarCodigoValidate(data) {
  const errores = [];

  if (!data.email || data.email.trim() === "") {
    errores.push("Por favor, ingresa un email.");
  }
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errores.push("Por favor, ingresa un email válido.");
  }

  if (!data.codigo_verificacion || data.codigo_verificacion.trim() === "") {
    errores.push("Por favor, ingresa un código de verificación.");
  }

  if (data.codigo_verificacion && !/^\d{6}$/.test(data.codigo_verificacion)) {
    errores.push("El código de verificación debe tener 6 dígitos numéricos.");
  }

  return errores;
}
