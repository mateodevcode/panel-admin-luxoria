// src/core/models/Cart.js
import mongoose, { models, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        name: String,
        price: Number,
        image: String,
        size: String,
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
