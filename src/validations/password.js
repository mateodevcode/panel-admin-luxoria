export function passwordValidate(password, confirmarPassword) {
  const errores = [];

  if (!password || password.trim() === "") {
    errores.push("Por favor, ingresa una contraseña.");
  }

  if (!confirmarPassword || confirmarPassword.trim() === "") {
    errores.push("Por favor, confirma la contraseña.");
  }

  if (password.length < 12) {
    errores.push("La contraseña debe tener al menos 12 caracteres.");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;

  if (!password || !passwordRegex.test(password)) {
    errores.push(
      "La contraseña debe tener al menos 12 caracteres, incluir mayúsculas, minúsculas, números y un caracter especial."
    );
  }

  if (password !== confirmarPassword) {
    errores.push("Verifica, las contraseñas no coinciden.");
  }

  return errores;
}
