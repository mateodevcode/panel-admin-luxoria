import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LiaFileAlt } from "react-icons/lia";
import { LuCalendarClock } from "react-icons/lu";
import { PiCalendarCheckDuotone } from "react-icons/pi";

export const navfooter = [
  {
    id: "inicio",
    title: "Inicio",
    url: "/",
    icon: <BiHome />,
    roles: ["admin", "barbero", "Usuario", "guest"],
  },
  {
    id: "reservas",
    title: "Reservar",
    url: "/reservar",
    icon: <PiCalendarCheckDuotone />,
    roles: ["admin", "barbero", "Usuario", "guest"],
  },
  {
    id: "mis-pedidos",
    title: "Mis Pedidos",
    url: "/mis-pedidos",
    icon: <LiaFileAlt />,
    roles: ["Usuario", "guest"], // ✅ Guest y Usuario
  },
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: <LuCalendarClock />,
    roles: ["admin", "barbero"], // ✅ Solo admin y barbero
  },
  {
    id: "perfil",
    title: "Perfil",
    url: "/configuracion",
    icon: <BsPerson />,
    roles: ["admin", "barbero", "Usuario", "guest"],
  },
];
