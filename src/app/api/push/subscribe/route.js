/**
 * API Route: Suscripción a Push Notifications
 * POST /api/push/subscribe
 */

export async function POST(request) {
  try {
    const { subscription, userId } = await request.json();

    if (!subscription) {
      return Response.json(
        { error: "Subscription is required" },
        { status: 400 }
      );
    }

    // TODO: Guardar en tu base de datos
    // Ejemplo con MongoDB:
    /*
    await connectDB();
    await PushSubscription.findOneAndUpdate(
      { userId: userId || 'anonymous' },
      { 
        subscription,
        userId: userId || 'anonymous',
        updatedAt: new Date()
      },
      { upsert: true }
    );
    */

    // Por ahora solo logueamos
    console.log("📱 Nueva suscripción push:", {
      userId: userId || "anonymous",
      endpoint: subscription.endpoint,
    });

    return Response.json({
      success: true,
      message: "Subscription saved successfully",
    });
  } catch (error) {
    console.error("❌ Error saving push subscription:", error);
    return Response.json(
      { error: "Failed to save subscription" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/push/subscribe
 * Obtener suscripción actual del usuario
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // TODO: Obtener de tu base de datos
    /*
    await connectDB();
    const subscription = await PushSubscription.findOne({ 
      userId: userId || 'anonymous' 
    });
    
    if (!subscription) {
      return Response.json({ subscribed: false });
    }
    
    return Response.json({ 
      subscribed: true,
      subscription: subscription.subscription 
    });
    */

    return Response.json({ subscribed: false });
  } catch (error) {
    console.error("❌ Error getting subscription:", error);
    return Response.json(
      { error: "Failed to get subscription" },
      { status: 500 }
    );
  }
}
