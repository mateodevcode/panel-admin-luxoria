// lib/validateApiKey.js
import { NextResponse } from "next/server";

export function validateApiKey(request) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return NextResponse.json(
      { error: "No autorizado. Acceso restringido a clientes autorizados." },
      { status: 403 }
    );
  }

  return true;
}
