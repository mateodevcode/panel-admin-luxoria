// ✅ Importar Luxon para formatear horas en Colombia
import { formatTimeColombia, formatDateColombia } from '@/libs/luxonColombia';

// Función simple para enviar mensajes
export async function sendSimpleMessage(message) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    // Verificar que tenemos las variables necesarias
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log("❌ Faltan variables de Telegram en .env");
      return false;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      console.log("✅ Mensaje enviado a Telegram");
      return true;
    } else {
      console.log("❌ Error de Telegram:", data.description);
      return false;
    }
  } catch (error) {
    console.log("❌ Error enviando a Telegram:", error.message);
    return false;
  }
}

// Notificar cuando hay un nuevo cliente o plan seleccionado
// ✅ Recibe hora_inicio/fecha como ISO UTC, formatea a Colombia
export async function notificarNuevaReserva(
  nombre,
  telefono,
  servicio,
  fecha,
  hora,
  barbero
) {
  // ✅ Formatea fecha y hora CON zona horaria Colombia en 12 horas
  const fechaFormato = formatDateColombia(fecha, 'dd MMMM yyyy');
  const horaFormato = formatTimeColombia(hora, 'hh:mm a');
  
  const message = `
🚀 NUEVA RESERVA \n\nNombre: ${nombre}\nTelefono: ${telefono}\nServicio: ${servicio}\nBarbero: ${barbero}\nFecha: ${fechaFormato}\nHora: ${horaFormato}`;

  return await sendSimpleMessage(message);
}
