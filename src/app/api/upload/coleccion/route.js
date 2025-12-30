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
    const fileImgVer = formData.get("fileImgVer");
    const fileImgHor = formData.get("fileImgHor");
    const fileImgPortada = formData.get("fileImgPortada");
    const nombre = formData.get("nombre");
    const frase = formData.get("frase");
    const caracteristicasStr = formData.get("caracteristicas");
    const caracteristicas = caracteristicasStr
      ? JSON.parse(caracteristicasStr)
      : [];
    const isActive = formData.get("isActive");
    const opcion = formData.get("opcion");
    const coleccionId = formData.get("coleccionId");

    if (!opcion || (opcion === "editar" && !coleccionId)) {
      return NextResponse.json(
        { success: false, error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    let uploadResponseVer = null;
    let oldPublicIdVer = null;
    let uploadResponseHor = null;
    let oldPublicIdHor = null;
    let uploadResponsePortada = null;
    let oldPublicIdPortada = null;

    // Procesar imagen si se envió Ver
    if (fileImgVer && fileImgVer.size > 0) {
      if (!fileImgVer.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: "Solo se permiten imágenes." },
          { status: 400 }
        );
      }

      if (fileImgVer.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "La imagen debe pesar menos de 10MB." },
          { status: 400 }
        );
      }

      const buffer = await fileToBuffer(fileImgVer);
      const carpeta = process.env.AWS_BUCKET_SUBFOLDER || "ecommerce/luxoria";
      const fileName = `${carpeta}/coleccion_${(nombre || "imagen_vertical")
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
        oldPublicIdVer = coleccion.publicIdVer;
      }

      const url = await uploadToS3(buffer, fileName, fileImgVer.type);
      uploadResponseVer = { fileId: fileName, url };
    }

    // Procesar imagen si se envió Hor
    if (fileImgHor && fileImgHor.size > 0) {
      if (!fileImgHor.type.startsWith("image/")) {
        // ✅ CORREGIDO: fileImgHor en lugar de fileImgVer
        return NextResponse.json(
          { success: false, error: "Solo se permiten imágenes." },
          { status: 400 }
        );
      }

      if (fileImgHor.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "La imagen debe pesar menos de 10MB." },
          { status: 400 }
        );
      }

      const buffer = await fileToBuffer(fileImgHor);
      const carpeta = process.env.AWS_BUCKET_SUBFOLDER || "ecommerce/luxoria";
      const fileName = `${carpeta}/coleccion_${(nombre || "imagen_horizontal")
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
        oldPublicIdHor = coleccion.publicIdHor;
      }

      const url = await uploadToS3(buffer, fileName, fileImgHor.type);
      uploadResponseHor = { fileId: fileName, url };
    }

    // Procesar imagen si se envió Portada
    if (fileImgPortada && fileImgPortada.size > 0) {
      if (!fileImgPortada.type.startsWith("image/")) {
        // ✅ CORREGIDO: fileImgPortada
        return NextResponse.json(
          { success: false, error: "Solo se permiten imágenes." },
          { status: 400 }
        );
      }

      if (fileImgPortada.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "La imagen debe pesar menos de 10MB." },
          { status: 400 }
        );
      }

      const buffer = await fileToBuffer(fileImgPortada);
      const carpeta = process.env.AWS_BUCKET_SUBFOLDER || "ecommerce/luxoria";
      const fileName = `${carpeta}/coleccion_${(nombre || "imagen_portada")
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
        oldPublicIdPortada = coleccion.publicIdPortada;
      }

      const url = await uploadToS3(buffer, fileName, fileImgPortada.type);
      uploadResponsePortada = { fileId: fileName, url };
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
        frase: frase || "",
        caracteristicas: caracteristicas || [],
        isActive: isActive || false,
        ...(uploadResponseVer && {
          publicIdVer: uploadResponseVer.fileId,
          imageUrlVer: uploadResponseVer.url,
        }),
        ...(uploadResponseHor && {
          publicIdHor: uploadResponseHor.fileId,
          imageUrlHor: uploadResponseHor.url,
        }),
        ...(uploadResponsePortada && {
          publicIdPortada: uploadResponsePortada.fileId,
          imageUrlPortada: uploadResponsePortada.url,
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
      if (frase) updates.frase = frase;
      if (caracteristicas && caracteristicas.length > 0)
        updates.caracteristicas = caracteristicas;
      if (isActive) updates.isActive = isActive;
      if (uploadResponseVer) {
        updates.publicIdVer = uploadResponseVer.fileId;
        updates.imageUrlVer = uploadResponseVer.url;
      }
      if (uploadResponseHor) {
        updates.publicIdHor = uploadResponseHor.fileId;
        updates.imageUrlHor = uploadResponseHor.url;
      }
      if (uploadResponsePortada) {
        updates.publicIdPortada = uploadResponsePortada.fileId;
        updates.imageUrlPortada = uploadResponsePortada.url;
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

      // Eliminar imagen anterior si hay nueva Ver
      if (uploadResponseVer && oldPublicIdVer) {
        try {
          await deleteFromS3(oldPublicIdVer);
        } catch (err) {
          console.warn("No se pudo eliminar imagen antigua:", err.message);
        }
      }

      // Eliminar imagen anterior si hay nueva Hor
      if (uploadResponseHor && oldPublicIdHor) {
        try {
          await deleteFromS3(oldPublicIdHor);
        } catch (err) {
          console.warn("No se pudo eliminar imagen antigua:", err.message);
        }
      }

      // Eliminar imagen anterior si hay nueva Portada
      if (uploadResponsePortada && oldPublicIdPortada) {
        try {
          await deleteFromS3(oldPublicIdPortada);
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

    // Obtener todos los colecciones con filtro opcional
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
