/**
 * Helper para capturar suscripción push al hacer reserva
 * Usar en componentes de reserva del cliente
 */

import { getCurrentPushSubscription } from "@/utils/pushNotifications";

/**
 * Obtiene la suscripción push actual del usuario
 * @returns {Promise<Object|null>}
 */
export async function getPushSubscriptionForReservation() {
  try {
    const subscription = await getCurrentPushSubscription();
    return subscription;
  } catch (error) {
    console.error("Error obteniendo suscripción push:", error);
    return null;
  }
}

/**
 * Crea una reserva con suscripción push incluida
 * @param {Object} reservaData - Datos de la reserva
 * @returns {Promise<Object>}
 */
export async function createReservationWithNotifications(reservaData) {
  try {
    // Obtener suscripción push actual
    const pushSubscription = await getPushSubscriptionForReservation();

    // Agregar suscripción a los datos de la reserva
    const dataWithPush = {
      ...reservaData,
      pushSubscription,
    };

    // Enviar a la API
    const response = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithPush),
    });

    if (!response.ok) {
      throw new Error("Error al crear reserva");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creando reserva:", error);
    throw error;
  }
}
