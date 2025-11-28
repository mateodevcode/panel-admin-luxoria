/**
 * Utilidades para gestionar notificaciones push en la PWA
 * Barbershop Blessed by God
 */

/**
 * Solicita permiso para enviar notificaciones push
 * @returns {Promise<NotificationPermission>}
 */
export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.error("Este navegador no soporta notificaciones");
    return "denied";
  }

  if (Notification.permission === "granted") {
    console.log("✅ Permisos de notificación ya concedidos");
    return "granted";
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    console.log(`Permiso de notificación: ${permission}`);
    return permission;
  }

  return Notification.permission;
}

/**
 * Suscribe al usuario a las notificaciones push
 * @param {string} vapidPublicKey - Clave pública VAPID del servidor
 * @returns {Promise<PushSubscription|null>}
 */
export async function subscribeToPushNotifications(vapidPublicKey) {
  try {
    // Verificar soporte
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.error("Push notifications no soportadas");
      return null;
    }

    // Solicitar permiso
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      console.log("Permiso de notificación denegado");
      return null;
    }

    // Obtener el service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Verificar si ya existe una suscripción
    let subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      console.log("✅ Ya existe una suscripción push");
      return subscription;
    }

    // Crear nueva suscripción
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    console.log("✅ Nueva suscripción push creada");
    return subscription;
  } catch (error) {
    console.error("Error al suscribirse a push notifications:", error);
    return null;
  }
}

/**
 * Obtiene la suscripción actual de push
 * @returns {Promise<PushSubscription|null>}
 */
export async function getCurrentPushSubscription() {
  try {
    if (!("serviceWorker" in navigator)) {
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription;
  } catch (error) {
    console.error("Error al obtener suscripción:", error);
    return null;
  }
}

/**
 * Cancela la suscripción a notificaciones push
 * @returns {Promise<boolean>}
 */
export async function unsubscribeFromPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const successful = await subscription.unsubscribe();
      console.log(
        successful
          ? "✅ Suscripción cancelada"
          : "❌ Error al cancelar suscripción"
      );
      return successful;
    }

    return false;
  } catch (error) {
    console.error("Error al cancelar suscripción:", error);
    return false;
  }
}

/**
 * Convierte una clave VAPID base64 a Uint8Array
 * @param {string} base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * Envía la suscripción al servidor
 * @param {PushSubscription} subscription
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Promise<boolean>}
 */
export async function sendSubscriptionToServer(subscription, userId = null) {
  try {
    const response = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar suscripción al servidor");
    }

    console.log("✅ Suscripción enviada al servidor");
    return true;
  } catch (error) {
    console.error("Error al enviar suscripción:", error);
    return false;
  }
}

/**
 * Muestra una notificación de prueba (solo para desarrollo)
 */
export async function showTestNotification() {
  const permission = await requestNotificationPermission();

  if (permission === "granted") {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification("Barbershop Blessed by God", {
      body: "¡Notificación de prueba! 💈",
      icon: "/icon-72x72.png",
      badge: "/badge.png",
      vibrate: [200, 100, 200],
      tag: "test-notification",
      data: {
        url: "/",
      },
    });
  }
}
