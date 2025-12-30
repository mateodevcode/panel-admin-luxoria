import mongoose, { models, Schema } from "mongoose";

const coleccionSchema = new Schema(
  {
    nombre: {
      type: String,
      default: "",
    },
    frase: {
      type: String,
      default: "",
    },
    caracteristicas: {
      type: Array,
      default: [],
    },
    imageUrlHor: {
      type: String,
      default: "",
    },
    publicIdHor: {
      type: String,
      default: "",
    },
    imageUrlVer: {
      type: String,
      default: "",
    },
    publicIdVer: {
      type: String,
      default: "",
    },
    imageUrlPortada: {
      type: String,
      default: "",
    },
    publicIdPortada: {
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
