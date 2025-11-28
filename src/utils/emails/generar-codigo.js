export function generarCodigo({ codigo, resetUrl, email }) {
  return `
   <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Restablecer contraseña - Seventwo</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 30px 20px;
            background: #ffffff;
          }
          .header img {
            max-width: 250px;
            height: auto;
          }
          .content {
            padding: 30px;
            text-align: center; /* ← Clave para centrar contenido */
          }
          h2 {
            color: #1a1a1a;
            margin: 0 0 16px;
            font-size: 24px;
          }
          p {
            color: #555;
            font-size: 16px;
            margin: 12px 0;
          }

          /* Contenedor centrado seguro */
          .otp-container {
            text-align: center;
            margin: 25px auto;
            width: 100%;
            display: block;
          }

          .otp-code {
            font-family: "Courier New", monospace, sans-serif;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 14px;
            color: #0d36ff;
            background-color: #f0f8ff;
            padding: 16px 20px;
            border: 2px dashed #a0c4ff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(13, 54, 255, 0.15);

            /* Centrado seguro */
            display: inline-block;
            min-width: 280px;
            text-align: center;

            /* Evita que el texto se seleccione demasiado */
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          /* Botón mejorado */
          .btn-reset {
            display: inline-block;
            margin: 25px 0;
            padding: 14px 30px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
          }

          .security-note {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
            font-style: italic;
          }

          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
            background-color: #f5f5f5;
            border-top: 1px solid #eee;
          }
          .footer a {
            color: #777;
            text-decoration: none;
          }

          @media (max-width: 600px) {
            .content,
            .footer {
              padding: 20px;
            }
            h2 {
              font-size: 22px;
            }
            p {
              font-size: 15px;
            }
            .otp-code {
              font-size: 22px;
              letter-spacing: 10px;
              padding: 14px 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <a href="${process.env.URL_FRONTEND}" target="_blank">
              <img
                src="https://ik.imagekit.io/seventwo/seventwo/st-email.png?updatedAt=1759310317493"
                alt="Seventwo Logo"
              />
            </a>
          </div>

          <!-- Content -->
          <div class="content">
            <h2>¡Listo para recuperar tu acceso?</h2>
            <p>
              Por seguridad, no podemos ver tu contraseña actual. Pero no te
              preocupes, estás a un paso de crear una nueva.
            </p>

            <p><strong>Ingresa este código de verificación:</strong></p>

            <!-- Contenedor OTP centrado -->
            <div class="otp-container">
              <div class="otp-code">${codigo}</div>
            </div>

            <p>O haz clic en el botón de abajo para continuar:</p>

            <a
              href="${resetUrl}?email=${encodeURIComponent(email)}"
              style="
                background-color: #000 !important;
                color: #ffffff !important;
                text-decoration: none !important;
                padding: 14px 30px;
                border-radius: 8px;
                font-weight: bold;
                display: inline-block;
                font-family: Arial, sans-serif;
                text-align: center;
                font-size: 16px;
              "
            >
              Restablecer contraseña
            </a>

            <p class="security-note">
              Si no solicitaste este cambio, simplemente ignora este correo. Tu
              cuenta sigue segura.
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            © ${new Date().getFullYear()} Seventwo Technologies. Todos los derechos
            reservados.
            <br />
            <a
              href="${
                process.env.URL_FRONTEND
              }/unsubscribe?email=${encodeURIComponent(email)}"
            >
              Cancelar suscripción
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
}
