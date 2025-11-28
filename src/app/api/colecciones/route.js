// app/api/barberos/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Coleccion from "@/models/coleccion";
import { validateApiKey } from "@/lib/validateApiKey";

export async function GET(req) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();

    const colecciones = await Coleccion.find({});
    return NextResponse.json(
      {
        success: true,
        message: "colecciones obtenidos correctamente.",
        data: colecciones,
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
