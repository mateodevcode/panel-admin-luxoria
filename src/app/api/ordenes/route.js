import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Orden from "@/models/orden";

const generarIdOrden = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `LUX-${año}-${mes}-${dia}-${random}`;
};

export async function POST(req) {
  try {
    await connectMongoDB();

    const { cliente, productos, resumen, metodoPago } = await req.json();

    if (!cliente || !cliente.nombre || !cliente.email || !cliente.telefono) {
      return NextResponse.json(
        { success: false, error: "Faltan datos del cliente" },
        { status: 400 }
      );
    }

    if (!productos || productos.length === 0) {
      return NextResponse.json(
        { success: false, error: "No hay productos en la orden" },
        { status: 400 }
      );
    }

    const idOrden = generarIdOrden();

    const nuevaOrden = await Orden.create({
      idOrden,
      cliente,
      productos,
      resumen: resumen || { subtotal: 0, descuento: 0, envio: 0, total: 0 },
      metodoPago: metodoPago || "whatsapp",
      estado: "pendiente",
      historialEstados: [
        {
          estado: "pendiente",
          fecha: new Date(),
          nota: "Orden creada",
        },
      ],
    });

    const link = `${process.env.NEXT_PUBLIC_URL_FRONTEND}/ordenes/${idOrden}`;

    return NextResponse.json(
      {
        success: true,
        message: "Orden creada correctamente",
        data: {
          orden: nuevaOrden,
          orderId: idOrden,
          link,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const estado = searchParams.get("estado");

    let query = {};

    if (email) {
      query["cliente.email"] = email.toLowerCase();
    }

    if (estado) {
      query.estado = estado;
    }

    const ordenes = await Orden.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Ordenes obtenidas correctamente",
        data: ordenes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
