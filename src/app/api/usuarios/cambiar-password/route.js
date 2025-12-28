// app/api/usuarios/cambiar-password/route.js
import { connectMongoDB } from "@/lib/db";
import { validateApiKey } from "@/lib/validateApiKey";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { checkRateLimit, defaultLimiter } from "@/lib/rateLimit";

export async function PUT(req) {
  try {
    const isValid = validateApiKey(req);
    if (isValid !== true) return isValid;

    const rateLimitResponse = checkRateLimit(req, defaultLimiter);
    if (rateLimitResponse !== true) return rateLimitResponse;

    await connectMongoDB();
    const data = await req.json();
    const pass = await bcrypt.hash(data.password, 10);
    const UsuarioActualizado = await Usuario.findByIdAndUpdate(
      data.id,
      {
        ...data,
        password: pass,
      },
      {
        new: true,
      }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Contraseña modificada.",
        data: UsuarioActualizado,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
