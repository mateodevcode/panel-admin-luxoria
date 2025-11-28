export function registrarseValidate(datos, allusers, validarPassword) {
  const errores = [];

  if (datos.name.trim() === "" || !datos.name) {
    errores.push("Por favor, ingresa tu nombre.");
  }

  if (datos.email.trim() === "") {
    errores.push("Por favor, ingresa tu email.");
  }
  if (datos.email && !/\S+@\S+\.\S+/.test(datos.email)) {
    errores.push("Por favor, ingresa un email válido.");
  }

  if (datos.email) {
    const emailExiste = allusers.some(
      (u) => u.email.toLowerCase().trim() === datos.email.toLowerCase().trim()
    );

    if (emailExiste) {
      errores.push(
        "Este correo ya está registrado. Por favor, inicia sesión para continuar."
      );
    }
  }

  if (!datos.password || datos.password.trim() === "") {
    errores.push("Por favor, ingresa una contraseña.");
  }

  if (datos.password.length < 12) {
    errores.push("La contraseña debe tener al menos 12 caracteres.");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

  if (!datos.password || !passwordRegex.test(datos.password)) {
    errores.push(
      "La contraseña debe tener al menos 12 caracteres, incluir mayúsculas, minúsculas, números y un caracter especial."
    );
  }

  if (datos.password !== validarPassword) {
    errores.push("Las contraseñas no coinciden.");
  }

  return errores;
}
