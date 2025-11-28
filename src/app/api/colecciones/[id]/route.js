// app/api/colecciones/[id]/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { validateApiKey } from "@/lib/validateApiKey";
import Coleccion from "@/models/coleccion";
import { deleteFromS3, fileToBuffer, uploadToS3 } from "@/lib/s3/s3AWS";
import Producto from "@/models/producto";

export async function GET(req, { params }) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();
    const { id } = await params;
    const coleccionEncontrada = await Coleccion.findById(id);
    if (!coleccionEncontrada)
      return NextResponse.json(
        {
          success: false,
          error: "Coleccion no encontrada",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Coleccion obtenida correctamente.",
        data: coleccionEncontrada,
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

export async function PUT(req, { params }) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    const { id } = await params;
    await connectMongoDB();
    const data = await req.json();
    const coleccionActualizada = await Coleccion.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Coleccion modificado con exito.",
        data: coleccionActualizada,
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

export async function DELETE(req, { params }) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    const { id } = await params;
    await connectMongoDB();

    // Verificar si el usuario existe antes de eliminar
    const coleccion = await Coleccion.findById(id);
    if (!coleccion) {
      return NextResponse.json(
        {
          success: false,
          error: "Coleccion no encontrada.",
        },
        { status: 404 }
      );
    }

    const productos = await Producto.find({ coleccionId: id });
    if (productos.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se puede eliminar la coleccion ya que tiene productos asociados.",
        },
        { status: 400 }
      );
    }

    // Eliminar imagen de S3 si existe
    if (coleccion.publicId) {
      try {
        await deleteFromS3(coleccion.publicId);
      } catch (err) {
        console.warn("No se pudo eliminar imagen de S3:", err.message);
      }
    }

    const coleccionEliminada = await Coleccion.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Coleccion eliminada correctamente",
        data: coleccionEliminada,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error eliminando usuario y datos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor: " + error.message,
      },
      { status: 500 }
    );
  }
}
