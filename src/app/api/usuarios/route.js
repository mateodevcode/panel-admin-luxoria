// app/api/usuarios/route.js
import { connectMongoDB } from "@/lib/db";
import { validateApiKey } from "@/lib/validateApiKey";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();

    const usuarios = await Usuario.find({});
    return NextResponse.json(
      {
        success: true,
        message: "Usuarios obtenidos correctamente.",
        data: usuarios,
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

export async function POST(req) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();
    const data = await req.json();
    const pass = await bcrypt.hash(data.password, 10);
    const nuevoUsuario = await Usuario.create({
      ...data,
      password: pass,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Usuario creado con éxito.",
        data: nuevoUsuario,
      },
      { status: 201 }
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
