import nodemailer from "nodemailer";

export const createTransporter = () => {
  let transporter;

  // ===============================
  // 🔹 Configurar Nodemailer con Gmail
  // ===============================
  // transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: process.env.EMAIL_USER, // tu correo de Gmail
  //     pass: process.env.EMAIL_PASS, // tu contraseña o App Password
  //   },
  // });

  // ===============================
  // 🔹 Configurar Nodemailer con Brevo (antes Sendinblue)
  // ===============================
  transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", // Servidor SMTP de Brevo
    port: 587, // Puerto TLS
    secure: false, // false para TLS, true si usas 465
    auth: {
      user: process.env.BREVO_SMTP_EMAIL, // tu email de Brevo
      pass: process.env.BREVO_SMTP_PASS, // contraseña SMTP generada en Brevo
    },
  });

  // ===============================
  // 🔹 Configurar Nodemailer con cPanel
  // ===============================
  // transporter = nodemailer.createTransport({
  //   host: "mail.smarttree.com.co", // o el que indique el cPanel
  //   port: 587,
  //   secure: false, // true si usas 465 con SSL
  //   requireTLS: true,
  //   auth: {
  //     user: process.env.EMAIL_CPANEL_USER, // correo creado en cPanel
  //     pass: process.env.EMAIL_CPANEL_PASS, // contraseña del correo en cPanel
  //   },
  // });

  return transporter;
};
