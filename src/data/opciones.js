import { CiLocationOn, CiSettings } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { LiaFileAlt } from "react-icons/lia";
import { LuCalendar1 } from "react-icons/lu";
import { PiCalendarCheckDuotone, PiScissorsFill } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";

export const opciones = [
  {
    id: 1,
    nombre: "Reservar",
    icono: <LuCalendar1 />,
    enlace: "/reservar",
  },
  {
    id: 2,
    nombre: "Servicios",
    icono: <PiScissorsFill />,
    enlace: "/servicios",
  },
  {
    id: 3,
    nombre: "Barberos",
    icono: <RiTeamFill />,
    enlace: "/barberos",
  },
  {
    id: 4,
    nombre: "Mis pedidos",
    icono: <LiaFileAlt />,
    enlace: "/mis-pedidos",
  },
  {
    id: 9,
    nombre: "Mis reservas",
    icono: <PiCalendarCheckDuotone />,
    enlace: "/mis-reservas",
  },
  {
    id: 8,
    nombre: "Barberias",
    icono: <CiLocationOn />,
    enlace: "/barberias",
  },
  {
    id: 5,
    nombre: "Contacto",
    icono: <FaWhatsapp />,
    enlace: "whatsapp",
  },
  {
    id: 6,
    nombre: "Configuración",
    icono: <CiSettings />,
    enlace: "/configuracion",
  },
];
