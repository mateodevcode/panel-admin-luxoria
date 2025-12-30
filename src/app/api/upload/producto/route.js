// app/api/upload/coleccion/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import { deleteFromS3, fileToBuffer, uploadToS3 } from "@/lib/s3/s3AWS";
import { formatearNombreMayus } from "@/libs/formatearNombreMayus";
import Producto from "@/models/producto";
import { formaterNombreToUrl } from "@/libs/formaterNombreToUrl";

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const file = formData.get("file");
    const nombre = formData.get("nombre");
    const coleccionId = formData.get("coleccionId");
    const descripcion = formData.get("descripcion");
    const detalles = formData.get("detalles");
    const frase = formData.get("frase");
    const precio = formData.get("precio");
    const stock = formData.get("stock");
    const sizeString = formData.get("size");
    const size = sizeString ? JSON.parse(sizeString) : [];
    const tipo = formData.get("tipo");
    const isActive = formData.get("isActive");
    const opcion = formData.get("opcion");
    const productoId = formData.get("productoId");

    // Nuevos campos
    const etiquetasString = formData.get("etiquetas");
    const etiquetas = etiquetasString ? JSON.parse(etiquetasString) : [];
    const descuento = formData.get("descuento");
    const isPopular = formData.get("isPopular");
    const isOferta = formData.get("isOferta");

    // Obtener múltiples archivos
    const files = formData.getAll("files");

    if (!opcion || (opcion === "editar" && !productoId)) {
      return NextResponse.json(
        { success: false, error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    let uploadResponse = null;
    let oldPublicId = null;

    // Procesar imagen principal si se envió
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
      const fileName = `${carpeta}/producto_${(nombre || "imagen")
        .toLowerCase()
        .replace(/\s+/g, "-")}_${Date.now()}.jpg`;

      if (opcion === "editar") {
        const producto = await Producto.findById(productoId);
        if (!producto) {
          return NextResponse.json(
            { success: false, error: "Producto no encontrado." },
            { status: 404 }
          );
        }
        oldPublicId = producto.publicId;
      }

      const url = await uploadToS3(buffer, fileName, file.type);
      uploadResponse = { fileId: fileName, url };
    }

    // Procesar múltiples imágenes
    let imagenesArray = [];
    if (files && files.length > 0) {
      const carpeta = process.env.AWS_BUCKET_SUBFOLDER || "ecommerce/luxoria";

      for (let i = 0; i < files.length; i++) {
        const imageFile = files[i];

        // Validar cada archivo
        if (!imageFile.type.startsWith("image/")) {
          continue; // Saltar archivos que no son imágenes
        }

        if (imageFile.size > 10 * 1024 * 1024) {
          continue; // Saltar archivos muy grandes
        }

        const buffer = await fileToBuffer(imageFile);
        const fileName = `${carpeta}/producto_galeria_${(nombre || "imagen")
          .toLowerCase()
          .replace(/\s+/g, "-")}_${Date.now()}_${i}.jpg`;

        const url = await uploadToS3(buffer, fileName, imageFile.type);

        imagenesArray.push({
          url: url,
          publicId: fileName,
        });
      }
    }

    // CREAR
    if (opcion === "crear") {
      if (!nombre) {
        return NextResponse.json(
          { success: false, error: "El nombre del producto es requerido." },
          { status: 400 }
        );
      }

      const nuevoProducto = await Producto.create({
        nombre: formatearNombreMayus(nombre),
        coleccionId: coleccionId,
        descripcion: descripcion || "",
        detalles: detalles || "",
        frase: frase || "",
        precio: precio || 0,
        stock: stock || 0,
        size: size || [],
        imagenes: imagenesArray,
        tipo: tipo || "otro",
        isActive: isActive === "true" || isActive === true,
        etiquetas: etiquetas || [],
        descuento: descuento || 0,
        isPopular: isPopular === "true" || isPopular === true,
        isOferta: isOferta === "true" || isOferta === true,
        ...(uploadResponse && {
          publicId: uploadResponse.fileId,
          imageUrl: uploadResponse.url,
        }),
        url: formaterNombreToUrl(nombre),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Producto creado correctamente.",
          data: nuevoProducto,
        },
        { status: 201 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (nombre) updates.nombre = formatearNombreMayus(nombre);
      if (coleccionId) updates.coleccionId = coleccionId;
      if (descripcion) updates.descripcion = descripcion;
      if (detalles) updates.detalles = detalles;
      if (frase) updates.frase = frase;
      if (precio) updates.precio = precio;
      if (stock) updates.stock = stock;
      if (size) updates.size = size;
      if (imagenesArray && imagenesArray.length > 0) {
        updates.imagenes = imagenesArray;
      }
      if (tipo) updates.tipo = tipo;
      if (isActive !== undefined)
        updates.isActive = isActive === "true" || isActive === true;
      if (etiquetas) updates.etiquetas = etiquetas;
      if (descuento !== undefined) updates.descuento = descuento;
      if (isPopular !== undefined)
        updates.isPopular = isPopular === "true" || isPopular === true;
      if (isOferta !== undefined)
        updates.isOferta = isOferta === "true" || isOferta === true;
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imageUrl = uploadResponse.url;
      }

      const productoExistente = await Producto.findById(productoId);
      if (!productoExistente) {
        return NextResponse.json(
          { success: false, error: "Producto no encontrado." },
          { status: 404 }
        );
      }

      const productoActualizado = await Producto.findByIdAndUpdate(
        productoId,
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
          message: "Producto actualizado correctamente.",
          data: productoActualizado,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Opción no válida." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en API productos:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

// GET - Obtener productos
export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const productoId = searchParams.get("productoId");
    const estado = searchParams.get("estado");

    // Obtener un producto específico
    if (productoId) {
      const producto = await Producto.findById(productoId);

      if (!producto) {
        return NextResponse.json(
          { success: false, error: "Producto no encontrado." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: producto,
        },
        { status: 200 }
      );
    }

    // Obtener todos los barberos con filtro opcional
    let query = {};
    if (estado) {
      query.estado = estado;
    }

    const productos = await Producto.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: productos,
        total: productos.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
