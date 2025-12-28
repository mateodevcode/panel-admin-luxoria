// app/api/usuarios/cambiar-password-admin/route.js
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
    const { id, nueva_password, password_actual } = await req.json();

    // Validar que se proporcionó la contraseña actual
    if (!password_actual) {
      return NextResponse.json(
        {
          success: false,
          error: "La contraseña actual es requerida",
        },
        { status: 400 }
      );
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 }
      );
    }

    // Comparar la contraseña actual proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(
      password_actual,
      usuario.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "La contraseña actual es incorrecta",
        },
        { status: 400 }
      );
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nueva_password, 10);

    // Actualizar solo la contraseña
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Contraseña modificada correctamente",
        data: usuarioActualizado,
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
