import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { MdFacebook } from "react-icons/md";
import { botonWhatsapp } from "./boton-wp";

export const redesSociales = [
  {
    icon: <FaWhatsapp />,
    url: `https://wa.me/${botonWhatsapp.numeros[0]}`,
  },
  {
    icon: <MdFacebook />,
    url: "https://www.facebook.com/share/1RCNxkgz7H/?mibextid=wwXIfr",
  },
  {
    icon: <LuInstagram />,
    url: "https://www.instagram.com/andresbarberp?igsh=a3hheGhyejh2Znlv&utm_source=qr",
  },
  {
    icon: <FaTiktok />,
    url: "https://www.tiktok.com/@andres.bleesed1?_t=ZS-90p79WLqmeq&_r=1",
  },
];
