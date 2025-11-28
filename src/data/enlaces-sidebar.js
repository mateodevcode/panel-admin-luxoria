import {
  Bell,
  Blocks,
  CalendarDays,
  FileText,
  LogOut,
  PackageOpen,
  Settings,
  SquareKanban,
  SquareUser,
  Ticket,
  Users,
} from "lucide-react";

export const enlacesMain = [
  {
    nombre: "Dashboard",
    icono: <SquareKanban className="w-5" />,
    enlace: "/main/dashboard",
    subEnlaces: [],
  },
];

export const enlacesApps = [
  {
    nombre: "Colecciones",
    icono: <Blocks className="w-5" />,
    enlace: "/apps/colecciones",
    subEnlaces: [
      {
        nombre: "Lista Colecciones",
        enlace: "/apps/colecciones/lista-colecciones",
      },
      {
        nombre: "Detalles Coleccion",
        enlace: "/apps/colecciones/detalles-coleccion",
      },
      {
        nombre: "Editar Coleccion",
        enlace: "/apps/colecciones/editar-coleccion",
      },
      {
        nombre: "Agregar Coleccion",
        enlace: "/apps/colecciones/agregar-coleccion",
      },
    ],
  },
  {
    nombre: "Productos",
    icono: <PackageOpen className="w-5" />,
    enlace: "/apps/productos",
    subEnlaces: [
      {
        nombre: "Lista Productos",
        enlace: "/apps/productos/lista-productos",
      },
      {
        nombre: "Detalles Producto",
        enlace: "/apps/productos/detalles-producto",
      },
      {
        nombre: "Editar Producto",
        enlace: "/apps/productos/editar-producto",
      },
      {
        nombre: "Agregar Producto",
        enlace: "/apps/productos/agregar-producto",
      },
    ],
  },

  // {
  //   nombre: "Calendario",
  //   icono: <CalendarDays className="w-5" />,
  //   enlace: "/apps/calendario",
  //   subEnlaces: [],
  // },
  {
    nombre: "Usuarios",
    icono: <Users className="w-5" />,
    enlace: "/apps/usuarios",
    subEnlaces: [],
  },
  {
    nombre: "Perfil",
    icono: <SquareUser className="w-5" />,
    enlace: "/apps/perfil",
    subEnlaces: [],
  },
];

export const enlacesOtros = [
  {
    nombre: "Ajustes",
    icono: <Settings className="w-5" />,
    enlace: "/otros/ajustes",
    subEnlaces: [],
  },
  {
    nombre: "Cerrar sesión",
    icono: <LogOut className="w-5" />,
    enlace: "/cerrar-sesion",
    subEnlaces: [],
  },
];
