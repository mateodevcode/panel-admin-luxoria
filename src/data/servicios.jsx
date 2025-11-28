import Image from "next/image";

export const servicios = [
  {
    id: 1,
    nombre: "Corte de cabello",
    titulo: "Corte de Cabello",
    descripcion: "Corte de cabello clásico",
    duracion: 20,
    precio: 14000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/corte_cabello_clasico.png",
    imagen_icono: "/servicios/corte-p.png",
    puntuacion: 4.9,
    likes: 984,
    icon: (
      <Image
        src="/servicios/icon/icon_cabello-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 2,
    nombre: "Corte de Barba",
    titulo: "Corte de Barba",
    descripcion: "Corte de barba y bigote",
    duracion: 10,
    precio: 6000,
    adicional: "Incluye perfilado y recorte",
    imagen: "/servicios/corte_barba.png",
    imagen_icono: "/servicios/barba-p.png",
    puntuacion: 4.8,
    likes: 512,
    icon: (
      <Image
        src="/servicios/icon/icon_barba-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 3,
    nombre: "(Combo 1) Corte y Barba",
    titulo: "Combo 1",
    descripcion: "Corte de cabello y barba",
    duracion: 35,
    precio: 20000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/combo-1.jpeg",
    imagen_icono: "/servicios/combo-1-p.png",
    puntuacion: 4.9,
    likes: 650,
    icon: (
      <Image
        src="/servicios/icon/icon_combo-1-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 4,
    nombre: "(Combo 2) Corte de Cabello + Cejas + Linea",
    titulo: "Combo 2",
    descripcion: "Corte de cabello, cejas y linea",
    duracion: 25,
    precio: 16000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/combo-2.jpg",
    imagen_icono: "/servicios/combo-2-p.png",
    puntuacion: 4.7,
    likes: 430,
    icon: (
      <Image
        src="/servicios/icon/icon_combo-2-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 5,
    nombre: "(Combo 3) Corte de Cabello + Cejas + Barba + Linea",
    titulo: "Combo 3",
    descripcion: "Corte de cabello, cejas, barba y linea",
    duracion: 35,
    precio: 22000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/combo-3.png",
    imagen_icono: "/servicios/combo-3-p.png",
    puntuacion: 4.8,
    likes: 780,
    icon: (
      <Image
        src="/servicios/icon/icon_combo-3-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 6,
    nombre: "Corte de Cejas",
    titulo: "Corte de Cejas",
    descripcion: "Corte de cejas y perfilado",
    duracion: 5,
    precio: 3000,
    adicional: "",
    imagen: "/servicios/ceja.png",
    imagen_icono: "/servicios/ceja-p.png",
    puntuacion: 4.5,
    likes: 200,
    icon: (
      <Image
        src="/servicios/icon/icon_ceja-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 7,
    nombre: "Corte de Linea",
    titulo: "Corte de Linea",
    descripcion: "Corte de linea y perfilado",
    duracion: 5,
    precio: 2000,
    adicional: "",
    imagen: "/servicios/linea.png",
    imagen_icono: "/servicios/lineas-p.png",
    puntuacion: 4.3,
    likes: 150,
    icon: (
      <Image
        src="/servicios/icon/icon_linea-removebg-preview.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
];
