export const productoValidate = (formDataProducto) => {
  const errores = [];

  if (!formDataProducto.nombre || formDataProducto.nombre.trim() === "") {
    errores.push("El nombre del producto es obligatorio");
  }

  if (
    !formDataProducto.coleccionId ||
    formDataProducto.coleccionId.trim() === ""
  ) {
    errores.push("Debes seleccionar una colección");
  }

  if (!formDataProducto.precio || formDataProducto.precio <= 0) {
    errores.push("El precio debe ser mayor a 0");
  }

  if (!formDataProducto.stock || formDataProducto.stock < 0) {
    errores.push("El stock no puede ser negativo");
  }

  return errores;
};
