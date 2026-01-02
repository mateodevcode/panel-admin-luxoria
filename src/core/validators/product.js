// src/core/validators/product.js

export const validateProduct = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== "string") {
    errors.name = "name es requerido y debe ser string";
  }

  if (typeof data.price !== "number" || data.price < 0) {
    errors.price = "price debe ser un número mayor o igual a 0";
  }

  if (data.stock !== undefined) {
    if (typeof data.stock !== "number" || data.stock < 0) {
      errors.stock = "stock debe ser un número no negativo";
    }
  }

  if (
    data.category &&
    !["Anillos", "Collares", "Pulseras", "Pendientes", "Otros"].includes(
      data.category
    )
  ) {
    errors.category = "category no válida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
