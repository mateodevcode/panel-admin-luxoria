import mongoose, { models, Schema } from "mongoose";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      default: "",
    },
    coleccionId: {
      type: String,
      default: "",
    },
    descripcion: {
      type: String,
      default: "",
    },
    detalles: {
      type: String,
      default: "",
    },
    frase: {
      type: String,
      default: "",
    },
    size: {
      type: Array,
      default: [],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    imagenes: {
      type: Array,
      default: [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    precio: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    etiquetas: {
      type: Array,
      default: [],
    },
    descuento: {
      type: Number,
      default: 0,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isOferta: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Producto = models.Producto || mongoose.model("Producto", productoSchema);
export default Producto;
