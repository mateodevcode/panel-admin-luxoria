// models/Content.ts
import mongoose, { models, Schema } from "mongoose";

const contentSchema = new Schema(
  {
    type: {
      // e.g., "pagina", "producto", "testimonial", "landing-home"
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      unique: false, // no único global, solo por tipo si lo necesitas
    },
    data: {
      // Aquí va todo el contenido como JSON arbitrario
      type: Schema.Types.Mixed,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = models.Content || mongoose.model("Content", contentSchema);
export default Content;
