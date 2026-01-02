// src/core/validators/cart.js

export const validateCart = (data) => {
  const errors = {};

  if (!data.userId) {
    errors.userId = "userId es requerido";
  }

  if (!Array.isArray(data.items)) {
    errors.items = "items debe ser un array";
  } else {
    data.items.forEach((item, index) => {
      if (!item.productId) {
        errors[`items[${index}].productId`] = "productId es requerido";
      }

      if (typeof item.quantity !== "number" || item.quantity < 1) {
        errors[`items[${index}].quantity`] =
          "quantity debe ser un número mayor a 0";
      }
    });
  }

  if (typeof data.total !== "number" || data.total < 0) {
    errors.total = "total debe ser un número no negativo";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
