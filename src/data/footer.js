import { BsTiktok } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

export const footer = {
  logo: {
    src: "/logo/logo-4.png",
    alt: "imagen de logo",
  },
  nombre: "Luxoria - Joyería de lujo",
  imagen: {
    src: "/colecciones/nova/nova.png",
    alt: "imagen de collections",
  },
  tituloEnlacesPrincipales: "Recursos",
  enlacesPrincipales: [
    {
      name: "Colecciones",
      href: "#",
    },
    {
      name: "Contacto",
      href: "#",
    },
    {
      name: "Términos y condiciones",
      href: "#",
    },
    {
      name: "Política de privacidad",
      href: "#",
    },
    {
      name: "Envíos y devoluciones",
      href: "#",
    },
    {
      name: "FAQ",
      href: "#",
    },
    {
      name: "Programa de Afiliados",
      href: "#",
    },
    {
      name: "Mapa del sitio",
      href: "#",
    },
    {
      name: "Soporte",
      href: "#",
    },
  ],
  tituloParrafo: "Acerca de Luxoria",
  parrafo:
    "Luxoria es una joyería de lujo con sede en Barranquilla, creada para ofrecer una experiencia excepcional a cada cliente en Colombia. Cada pieza de nuestra colección está cuidadosamente diseñada para reflejar elegancia, distinción y autenticidad, convirtiéndola en una extensión única del estilo de quienes la llevan.",
  frase: "Mantente conectado.",
  redesSociales: [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://www.facebook.com",
    },
    {
      name: "TikTok",
      icon: <BsTiktok />,
      url: "https://www.tiktok.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      url: "https://www.youtube.com",
    },
  ],
  botonRedesSociales: "Siguenos en redes sociales",
  pieFooter: "© Luxoria 2025 - Desarrollado por Seventwo.",
  mediosPago: [
    {
      name: "Nequi",
      imageUrl: "/medios-pago/nequi.jpg",
    },
    {
      name: "Visa",
      imageUrl: "/medios-pago/visa.png",
    },
    {
      name: "Mastercard",
      imageUrl: "/medios-pago/Mastercard.png",
    },
    {
      name: "American Express",
      imageUrl: "/medios-pago/american-express.png",
    },
    {
      name: "PayPal",
      imageUrl: "/medios-pago/paypal.png",
    },
    {
      name: "Apple Pay",
      imageUrl: "/medios-pago/apple-pay.jpg",
    },
    {
      name: "Google Pay",
      imageUrl: "/medios-pago/google-pay.jpg",
    },
  ],
};
