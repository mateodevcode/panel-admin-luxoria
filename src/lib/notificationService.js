/**
 * Servicio de Notificaciones Push para Reservas
 * Barbershop Blessed by God
 */

import webpush from "web-push";
import { DateTime } from "luxon";

// Configurar VAPID
webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:contacto@barbershopbbg.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/**
 * Formatea la hora en formato 12h (AM/PM) para Colombia
 * @param {Date} date
 * @returns {string}
 */
function formatHora(date) {
  const dt = DateTime.fromJSDate(date, { zone: "America/Bogota" });
  return dt.toFormat("h:mm a"); // Ej: "3:00 PM"
}

/**
 * Formatea la fecha en español
 * @param {Date} date
 * @returns {string}
 */
function formatFecha(date) {
  const dt = DateTime.fromJSDate(date, { zone: "America/Bogota" });
  const hoy = DateTime.now().setZone("America/Bogota");

  if (dt.hasSame(hoy, "day")) {
    return "Hoy";
  } else if (dt.hasSame(hoy.plus({ days: 1 }), "day")) {
    return "Mañana";
  } else {
    return dt.toFormat("EEEE d 'de' MMMM", { locale: "es" });
  }
}

/**
 * Crea el payload de notificación para recordatorio de reserva
 * @param {Object} reserva - Objeto de reserva con datos poblados
 * @returns {Object}
 */
export function createReservationReminderPayload(reserva) {
  const hora = formatHora(reserva.hora_inicio);
  const fecha = formatFecha(reserva.hora_inicio);

  // Obtener nombres de barbero y servicio
  const barberoNombre = reserva.barbero_id?.nombre || "Tu barbero";
  const servicioNombre = reserva.servicio_id?.nombre || "Tu servicio";

  return {
    title: "🔔 Recordatorio de Cita",
    body: `Tu cita es en 1 hora\n📅 ${fecha} a las ${hora}\n💈 Barbero: ${barberoNombre}\n✂️ ${servicioNombre}`,
    icon: "/icon-72x72.png",
    badge: "/badge.png",
    vibrate: [200, 100, 200, 100, 200],
    tag: `reservation-${reserva._id}`,
    requireInteraction: true,
    data: {
      url: "/mis-reservas",
      reservaId: reserva._id.toString(),
      type: "reservation-reminder",
    },
  };
}

/**
 * Envía una notificación push a una suscripción
 * @param {Object} subscription - Suscripción push del usuario
 * @param {Object} payload - Datos de la notificación
 * @returns {Promise<boolean>}
 */
export async function sendPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    console.log("✅ Notificación enviada exitosamente");
    return true;
  } catch (error) {
    // Error 410 o 404 significa que la suscripción expiró
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log("⚠️ Suscripción expirada o inválida");
      return false;
    }

    console.error("❌ Error enviando notificación:", error);
    throw error;
  }
}

/**
 * Envía recordatorio de reserva a un cliente
 * @param {Object} reserva - Objeto de reserva con pushSubscription
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendReservationReminder(reserva) {
  try {
    // Verificar que tenga suscripción
    if (!reserva.pushSubscription) {
      return {
        success: false,
        error: "No push subscription available",
      };
    }

    // Crear payload
    const payload = createReservationReminderPayload(reserva);

    // Enviar notificación
    const sent = await sendPushNotification(reserva.pushSubscription, payload);

    if (sent) {
      console.log(
        `✅ Recordatorio enviado a ${reserva.cliente_nombre} para reserva ${reserva._id}`
      );
      return { success: true };
    } else {
      return {
        success: false,
        error: "Subscription expired",
      };
    }
  } catch (error) {
    console.error(
      `❌ Error enviando recordatorio para reserva ${reserva._id}:`,
      error
    );
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Envía notificación de confirmación de reserva (inmediata)
 * @param {Object} reserva - Objeto de reserva
 * @param {Object} subscription - Suscripción push
 * @returns {Promise<boolean>}
 */
export async function sendReservationConfirmation(reserva, subscription) {
  try {
    if (!subscription) return false;

    const hora = formatHora(reserva.hora_inicio);
    const fecha = formatFecha(reserva.hora_inicio);

    const payload = {
      title: "✅ Reserva Confirmada",
      body: `Tu reserva ha sido confirmada\n📅 ${fecha} a las ${hora}\n¡Te esperamos!`,
      icon: "/icon-72x72.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      tag: `reservation-confirmed-${reserva._id}`,
      data: {
        url: "/mis-reservas",
        reservaId: reserva._id.toString(),
        type: "reservation-confirmed",
      },
    };

    await sendPushNotification(subscription, payload);
    return true;
  } catch (error) {
    console.error("Error enviando confirmación:", error);
    return false;
  }
}
