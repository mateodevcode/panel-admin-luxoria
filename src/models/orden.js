import mongoose, { models, Schema } from "mongoose";

const ordenSchema = new Schema(
  {
    idOrden: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    cliente: {
      nombre: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      direccion: {
        type: String,
        default: "",
      },
    },
    productos: [
      {
        nombre: String,
        precio: Number,
        cantidad: Number,
        total: Number,
        talla: String,
        color: String,
        detalles: String,
        url: String,
        productoId: String,
      },
    ],
    resumen: {
      subtotal: {
        type: Number,
        default: 0,
      },
      descuento: {
        type: Number,
        default: 0,
      },
      envio: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    estado: {
      type: String,
      enum: [
        "pendiente",
        "confirmado",
        "pagado",
        "enviado",
        "entregado",
        "cancelado",
      ],
      default: "pendiente",
    },
    metodoPago: {
      type: String,
      enum: ["whatsapp", "tarjeta"],
      default: "whatsapp",
    },
    notasVendedor: {
      type: String,
      default: "",
    },
    historialEstados: [
      {
        estado: String,
        fecha: {
          type: Date,
          default: Date.now,
        },
        nota: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Orden = models.Orden || mongoose.model("Orden", ordenSchema);
export default Orden;
