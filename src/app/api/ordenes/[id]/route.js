import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Orden from "@/models/orden";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const orden = await Orden.findOne({ idOrden: id });

    if (!orden) {
      return NextResponse.json(
        { success: false, error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Orden obtenida correctamente",
        data: orden,
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

export async function PUT(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const { estado, notasVendedor } = await req.json();

    const estadosValidos = [
      "pendiente",
      "confirmado",
      "pagado",
      "enviado",
      "entregado",
      "cancelado",
    ];

    if (estado && !estadosValidos.includes(estado)) {
      return NextResponse.json(
        { success: false, error: "Estado inválido" },
        { status: 400 }
      );
    }

    const orden = await Orden.findOne({ idOrden: id });

    if (!orden) {
      return NextResponse.json(
        { success: false, error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    if (estado) {
      orden.estado = estado;

      orden.historialEstados.push({
        estado: estado,
        fecha: new Date(),
        nota: notasVendedor || "",
      });
    }

    if (notasVendedor !== undefined) {
      orden.notasVendedor = notasVendedor;
    }

    await orden.save();

    return NextResponse.json(
      {
        success: true,
        message: "Orden actualizada correctamente",
        data: orden,
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

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const orden = await Orden.findOne({ idOrden: id });

    if (!orden) {
      return NextResponse.json(
        { success: false, error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    if (orden.estado !== "pendiente") {
      return NextResponse.json(
        {
          success: false,
          error: "Solo se pueden cancelar órdenes en estado pendiente",
        },
        { status: 400 }
      );
    }

    orden.estado = "cancelado";
    orden.historialEstados.push({
      estado: "cancelado",
      fecha: new Date(),
      nota: "Orden cancelada por cliente",
    });

    await orden.save();

    return NextResponse.json(
      {
        success: true,
        message: "Orden cancelada correctamente",
        data: orden,
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
