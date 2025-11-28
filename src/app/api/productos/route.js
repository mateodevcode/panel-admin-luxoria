// app/api/barberos/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Producto from "@/models/producto";
import { validateApiKey } from "@/lib/validateApiKey";

export async function GET(req) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();

    const productos = await Producto.find({});
    return NextResponse.json(
      {
        success: true,
        message: "productos obtenidos correctamente.",
        data: productos,
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
