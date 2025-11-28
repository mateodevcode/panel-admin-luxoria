// app/api/upload/usuario/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { deleteFromS3, fileToBuffer, uploadToS3 } from "@/lib/s3/s3AWS";
import Usuario from "@/models/usuario";
import { formatearNombreMayus } from "@/libs/formatearNombreMayus";

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const telefono = formData.get("telefono");
    const ubicacion = formData.get("ubicacion");
    const opcion = formData.get("opcion");
    const userId = formData.get("userId");

    if (!opcion || (opcion === "editar" && !userId)) {
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
      const carpeta =
        process.env.AWS_BUCKET_SUBFOLDER || "barberias/blessedbygod";
      const fileName = `${carpeta}/perfiles/usuario_${(name || "imagen")
        .toLowerCase()
        .replace(/\s+/g, "-")}_${Date.now()}.jpg`;

      if (opcion === "editar") {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
          return NextResponse.json(
            { success: false, error: "Usuario no encontrada." },
            { status: 404 }
          );
        }
        oldPublicId = usuario.publicId;
      }

      const url = await uploadToS3(buffer, fileName, file.type);
      uploadResponse = { fileId: fileName, url };
    }

    // CREAR
    if (opcion === "crear") {
      if (!name || !uploadResponse) {
        return NextResponse.json(
          { success: false, error: "name e imagen son requeridos." },
          { status: 400 }
        );
      }

      const nuevoUsuario = await Usuario.create({
        name: formatearNombreMayus(name),
        email: email.toLowerCase(),
        telefono,
        ubicacion,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Usuario creada correctamente.",
          data: nuevoUsuario,
        },
        { status: 201 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (name) updates.name = formatearNombreMayus(name);
      if (email) updates.email = email.toLowerCase();
      if (telefono) updates.telefono = telefono;
      if (ubicacion) updates.telefono = ubicacion;
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imageUrl = uploadResponse.url;
      }

      if (!updates) {
        return NextResponse.json(
          { success: false, error: "Usuario no encontrado." },
          { status: 404 }
        );
      }

      const updated = await Usuario.findByIdAndUpdate(userId, updates, {
        new: true,
      });

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
          message: "Usuario actualizado correctamente.",
          data: updated,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Opción no válida." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
