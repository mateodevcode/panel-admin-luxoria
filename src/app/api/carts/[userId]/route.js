// src/app/api/carts/[userId]/route.js
import Cart from "@/core/models/Cart";
import { NextResponse } from "next/server";
import Producto from "@/models/producto";
import { connectMongoDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const { userId } = await params;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
      await cart.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Carrito obtenido",
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en GET /api/carts/[userId]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDB();
    const { userId } = await params;
    const { items, total } = await req.json();

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items, total, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Carrito actualizado",
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PUT /api/carts/[userId]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const { userId } = await params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [], total: 0, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Carrito vaciado",
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /api/carts/[userId]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
