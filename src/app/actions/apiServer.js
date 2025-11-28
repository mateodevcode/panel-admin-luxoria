// app/actions/apiServer.js
"use server";
const API_SECRET_KEY = process.env.API_SECRET_KEY;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function apiServer(enpoint, metodo = "GET", datos = null) {
  try {
    const res = await fetch(`${NEXTAUTH_URL}${enpoint}`, {
      method: metodo,
      headers: {
        "x-api-key": API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: metodo !== "GET" ? JSON.stringify(datos) : null,
    });

    const data = await res.json();
    return {
      success: data.success ?? false,
      message: data.message,
      data: data.data,
      error: data.error,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
      error: error.message,
      data: null,
      status: 500,
    };
  }
}
