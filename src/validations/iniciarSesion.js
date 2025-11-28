export function iniciarSesionValidate(datos, allUsers) {
  const errores = [];

  if (datos.email.trim() === "") {
    errores.push("Por favor, ingresa tu email.");
  }
  if (datos.email && !/\S+@\S+\.\S+/.test(datos.email)) {
    errores.push("Por favor, ingresa un email válido.");
  }

  if (datos.email) {
    const emailExiste = allUsers.some(
      (u) => u.email.toLowerCase().trim() === datos.email.toLowerCase().trim()
    );

    if (!emailExiste) {
      errores.push(
        "Este correo no está registrado. Crea tu cuenta para continuar."
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

  const verificarBloqueos = allUsers.find(
    (usuario) =>
      usuario.email.toLowerCase() === datos.email.toLowerCase() &&
      usuario.bloqueado === true
  );

  if (verificarBloqueos) {
    errores.push(
      `Tu cuenta ${verificarBloqueos.email} está bloqueada. ` +
        "Por favor, contacta al administrador."
    );
  }

  return errores;
}
