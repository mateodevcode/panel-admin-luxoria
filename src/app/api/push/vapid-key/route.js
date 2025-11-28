/**
 * API Route: Generar claves VAPID
 * GET /api/push/vapid-key
 *
 * Devuelve la clave pública VAPID para suscripciones push
 */

export async function GET() {
  try {
    // La clave pública VAPID debe estar en las variables de entorno
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_KEY;

    if (!vapidPublicKey) {
      console.error("❌ VAPID public key not configured");
      return Response.json(
        {
          error:
            "VAPID key not configured. Run: node -e \"console.log(require('web-push').generateVAPIDKeys())\"",
        },
        { status: 500 }
      );
    }

    return Response.json({
      publicKey: vapidPublicKey,
    });
  } catch (error) {
    console.error("❌ Error getting VAPID key:", error);
    return Response.json({ error: "Failed to get VAPID key" }, { status: 500 });
  }
}
