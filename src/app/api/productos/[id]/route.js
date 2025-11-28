// app/api/productos/[id]/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { validateApiKey } from "@/lib/validateApiKey";
import Producto from "@/models/producto";
import { deleteFromS3, fileToBuffer, uploadToS3 } from "@/lib/s3/s3AWS";

export async function GET(req, { params }) {
  const isValid = validateApiKey(req);
  if (isValid !== true) return isValid;

  try {
    await connectMongoDB();
    const { id } = await params;
    const productoEncontrado = await Producto.findById(id);
    if (!productoEncontrado)
      return NextResponse.json(
        {
          success: false,
          error: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Producto obtenido correctamente.",
        data: productoEncontrado,
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
    const productoActualizado = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Producto modificado con exito.",
        data: productoActualizado,
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
    const producto = await Producto.findById(id);
    if (!producto) {
      return NextResponse.json(
        {
          success: false,
          error: "Producto no encontrado.",
        },
        { status: 404 }
      );
    }

    // Eliminar imagen de S3 si existe
    if (producto.publicId) {
      try {
        await deleteFromS3(producto.publicId);
      } catch (err) {
        console.warn("No se pudo eliminar imagen de S3:", err.message);
      }
    }

    if (producto.imagenes.length > 0) {
      try {
        producto.imagenes.forEach(async (imagen) => {
          await deleteFromS3(imagen.publicId);
        });
      } catch (err) {
        console.warn("No se pudo eliminar imagen de S3:", err.message);
      }
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Producto elimiado correctamente",
        data: productoEliminado,
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
