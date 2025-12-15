// app/api/upload/coleccion/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { deleteFromS3, fileToBuffer, uploadToS3 } from "@/lib/s3/s3AWS";
import { formatearNombreMayus } from "@/libs/formatearNombreMayus";
import Coleccion from "@/models/coleccion";
import { formaterNombreToUrl } from "@/libs/formaterNombreToUrl";

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const isActive = formData.get("isActive");
    const opcion = formData.get("opcion");
    const coleccionId = formData.get("coleccionId");

    if (!opcion || (opcion === "editar" && !coleccionId)) {
      return NextResponse.json(
        { success: false, error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    let uploadResponse = null;
    let oldPublicId = null;

    // Procesar imagen si se envió
    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: "Solo se permiten imágenes." },
          { status: 400 }
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "La imagen debe pesar menos de 10MB." },
          { status: 400 }
        );
      }

      const buffer = await fileToBuffer(file);
      const carpeta = process.env.AWS_BUCKET_SUBFOLDER || "ecommerce/luxoria";
      const fileName = `${carpeta}/coleccion_${(nombre || "imagen")
        .toLowerCase()
        .replace(/\s+/g, "-")}_${Date.now()}.jpg`;

      if (opcion === "editar") {
        const coleccion = await Coleccion.findById(coleccionId);
        if (!coleccion) {
          return NextResponse.json(
            { success: false, error: "Coleccion no encontrada." },
            { status: 404 }
          );
        }
        oldPublicId = coleccion.publicId;
      }

      const url = await uploadToS3(buffer, fileName, file.type);
      uploadResponse = { fileId: fileName, url };
    }

    // CREAR
    if (opcion === "crear") {
      if (!nombre) {
        return NextResponse.json(
          { success: false, error: "El nombre de la coleccion es requerido." },
          { status: 400 }
        );
      }

      const nuevaColeccion = await Coleccion.create({
        nombre: formatearNombreMayus(nombre),
        descripcion: descripcion || "",
        isActive: isActive || false,
        ...(uploadResponse && {
          publicId: uploadResponse.fileId,
          imageUrl: uploadResponse.url,
        }),
        url: formaterNombreToUrl(nombre),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Coleccion creada correctamente.",
          data: nuevaColeccion,
        },
        { status: 201 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (nombre) updates.nombre = formatearNombreMayus(nombre);
      if (descripcion) updates.descripcion = descripcion;
      if (isActive) updates.isActive = isActive;
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imageUrl = uploadResponse.url;
      }

      const coleccionExistente = await Coleccion.findById(coleccionId);
      if (!coleccionExistente) {
        return NextResponse.json(
          { success: false, error: "Colección no encontrada." },
          { status: 404 }
        );
      }

      const coleccionActualizada = await Coleccion.findByIdAndUpdate(
        coleccionId,
        updates,
        {
          new: true,
        }
      );

      // Eliminar imagen anterior si hay nueva
      if (uploadResponse && oldPublicId) {
        try {
          await deleteFromS3(oldPublicId);
        } catch (err) {
          console.warn("No se pudo eliminar imagen antigua:", err.message);
        }
      }

      return NextResponse.json(
        {
          success: true,
          message: "Colección actualizada correctamente.",
          data: coleccionActualizada,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Opción no válida." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en API colecciones:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

// GET - Obtener colecciones
export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const coleccionId = searchParams.get("coleccionId");
    const estado = searchParams.get("estado");

    // Obtener una coleccion específica
    if (coleccionId) {
      const coleccion = await Coleccion.findById(coleccionId);

      if (!coleccion) {
        return NextResponse.json(
          { success: false, error: "Coleccion no encontrada." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: coleccion,
        },
        { status: 200 }
      );
    }

    // Obtener todos los barberos con filtro opcional
    let query = {};
    if (estado) {
      query.estado = estado;
    }

    const colecciones = await Coleccion.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: colecciones,
        total: colecciones.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error obteniendo colecciones:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
