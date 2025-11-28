// hooks/useResetForm.js
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const useResetForm = () => {
  const {
    setFormDataBarbero,
    setFormDataServicio,
    setFormDataUsuario,
    setFormDataReserva,
    setFormDataColeccion,
    setFormDataProducto,
  } = useContext(AppContext);

  const resetFormDataBarbero = () => {
    setFormDataBarbero({
      nombre: "",
      email: "",
      cargo: "",
      imageUrl: "",
      publicId: "",
      telefono: "",
      horario: {
        lunes: {
          inicio: "08:00",
          fin: "17:00",
        },
        martes: {
          inicio: "08:00",
          fin: "17:00",
        },
        miercoles: {
          inicio: "08:00",
          fin: "17:00",
        },
        jueves: {
          inicio: "08:00",
          fin: "17:00",
        },
        viernes: {
          inicio: "08:00",
          fin: "17:00",
        },
        sabado: {
          inicio: "08:00",
          fin: "17:00",
        },
        domingo: {
          inicio: "08:00",
          fin: "17:00",
        },
      },
      estado: "activo",
      experiencia: "",
      frase: "",
      redes_sociales: {
        whatsapp: "",
        facebook: "",
        instagram: "",
        tiktok: "",
      },
      opcion: "crear",
    });
  };

  const resetFormDataServicio = () => {
    setFormDataServicio({
      nombre: "",
      titulo: "",
      descripcion: "",
      duracion: "",
      precio: 0,
      adicional: "",
      puntuacion: 0,
      likes: 0,
      estado: "activo",
      opcion: "crear",
      imagenes: {
        principal: {
          url: "",
          publicId: "",
          uploadedAt: null,
        },
        icono: {
          url: "",
          publicId: "",
          uploadedAt: null,
        },
        preview: {
          url: "",
          publicId: "",
          uploadedAt: null,
        },
      },
      imageUrl: "",
      publicId: "",
    });
  };

  const resetFormDataUsuario = () => {
    setFormDataUsuario({
      name: "",
      email: "",
      telefono: "",
      password: "",
      imageUrl: "",
      ubicacion: "",
      publicId: "",
      plan: "gratis",
      estado: "activo",
      role: "Usuario",
      opcion: "crear",
    });
  };

  const resetFormDataReserva = () => {
    setFormDataReserva({
      nombre: "",
      telefono: "",
      servicio: "",
      cliente_id: "",
      barbero: "",
      hora_inicio: "",
      hora_fin: "",
      estado: "confirmado",
      fecha: "",
    });
  };

  const resetFormDataColeccion = () => {
    setFormDataColeccion({
      nombre: "",
      descripcion: "",
      imageUrl: "",
      publicId: "",
      isActive: false,
      opcion: "crear",
    });
  };

  const resetFormDataProducto = () => {
    setFormDataProducto({
      nombre: "",
      coleccionId: "",
      descripcion: "",
      detalles: "",
      frase: "",
      size: [],
      imageUrl: "",
      publicId: "",
      imagenes: [],
      isActive: false,
      precio: 0,
      stock: 0,
      isPopular: false,
      isOferta: false,
      descuento: 0,
      etiquetas: [],
      opcion: "crear",
    });
  };

  const resetFormData = () => {
    resetFormDataBarbero();
    resetFormDataServicio();
    resetFormDataUsuario();
    resetFormDataReserva();
    resetFormDataColeccion();
    resetFormDataProducto();
  };

  return {
    resetFormData,
    resetFormDataBarbero,
    resetFormDataServicio,
    resetFormDataUsuario,
    resetFormDataReserva,
    resetFormDataProducto,
    resetFormDataColeccion,
  };
};
export default useResetForm;
