import mongoose, { models, Schema } from "mongoose";

const coleccionSchema = new Schema(
  {
    nombre: {
      type: String,
      default: "",
    },
    descripcion: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    isActive: {
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

const Coleccion =
  models.Coleccion || mongoose.model("Coleccion", coleccionSchema);
export default Coleccion;
