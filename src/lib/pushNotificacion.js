// utils/pushNotifications.js
export const registrarSuscripcionPush = async (usuarioId) => {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    console.warn("Notificaciones no soportadas");
    return;
  }

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return;

  const registration = await navigator.serviceWorker.register("/sw.js");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  });

  // Enviar al backend
  await fetch("/api/usuario/suscribir", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuarioId, subscription }),
  });
};
