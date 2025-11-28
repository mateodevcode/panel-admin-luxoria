// src/lib/google-auth.js
import { google } from "googleapis";

let cachedAuthClient = null;

/**
 * Crea o devuelve una instancia autenticada de Google Auth JWT
 * Usa caché para evitar crear múltiples clientes (útil en entornos serverless)
 */
export function getAuthClient() {
  if (!cachedAuthClient) {
    const email = process.env.GOOGLE_CLIENT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;

    if (!email || !key) {
      throw new Error(
        "Faltan variables de entorno: GOOGLE_CLIENT_EMAIL o GOOGLE_PRIVATE_KEY"
      );
    }

    cachedAuthClient = new google.auth.JWT({
      email,
      key: key.replace(/\\n/g, "\n"), // Asegura saltos de línea correctos
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });
  }

  return cachedAuthClient;
}

/**
 * Devuelve una instancia lista del servicio de Google Sheets
 */
export function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getAuthClient() });
}
