"use client";

import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiServer } from "@/app/actions/apiServer";
import { toast } from "sonner";
import socket from "@/lib/socket";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: session } = useSession();
  const [openModalServicioSeleccionado, setOpenModalServicioSeleccionado] =
    useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [openModalVerServicio, setOpenModalVerServicio] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [openModalConfirmacionReserva, setOpenModalConfirmacionReserva] =
    useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);
  const [openModalNotificaciones, setOpenModalNotificaciones] = useState(false);
  const [openModalMenuHamburguesa, setOpenMenuHamburguesa] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [formDataUsuario, setFormDataUsuario] = useState({
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
    notificaciones: [
      {
        mensaje: "Bienvenido a Seventwo!. Gracias por registrarte.",
        fecha: new Date(),
        leido: false,
      },
    ],
  });
  const [formDataReserva, setFormDataReserva] = useState({
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
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [Dia, setDia] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [horarios, setHorarios] = useState([]);
  const [userId, setUserId] = useState(null);
  const [openModalEditarPerfil, setOpenModalEditarPerfil] = useState(false);
  const [openModalCambiarPassword, setModalCambiarPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [openModalPedidoCard, setModalPedidoCard] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [contadorClick, setContadorClick] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    codigo_verificacion: "",
  });
  const [formDataBarbero, setFormDataBarbero] = useState({
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
  const [mensajeGenerarOtp, setMensajeGenerarOtp] = useState("");
  const [validarUsuarioExistente, setValidarUsuarioExistente] = useState(false);
  const [iscodigoValidado, setIsCodigoValidado] = useState(false);
  const [idReset, setIdReset] = useState("");
  const [formDataDescanso, setFormDataDescanso] = useState({
    barbero_id: "",
    fecha: "",
    tipo: "",
    motivo: "",
    _id: "",
  });
  const [descansos, setDescansos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [descansoSeleccionado, setDescansoSeleccionado] = useState(null);
  const [formDataServicio, setFormDataServicio] = useState({
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
  const [formDataColeccion, setFormDataColeccion] = useState({
    nombre: "",
    descripcion: "",
    imageUrl: "",
    publicId: "",
    isActive: false,
    opcion: "crear",
  });
  const [colecciones, setColecciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [formDataProducto, setFormDataProducto] = useState({
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
    opcion: "crear",
  });
  const [productos, setProductos] = useState([]);

  // Cargar todos los usuarios al iniciar el componente
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await apiServer(`/api/usuarios`, "GET");
        const { data: usuariosRes, message, success, error } = res;
        if (success === true) {
          setUsuarios(usuariosRes);
        } else {
          console.warn("⚠️ No se pudo cargar usuarios:", error);
          toast.error("No se pudo cargar los usuarios:", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar los usuarios:", error);
      }
    };

    cargarUsuario();
  }, []);

  // Cargar usuario al iniciar el componente o cuando la sesión cambie
  useEffect(() => {
    const cargarUsuario = async () => {
      if (!session?.user?.id) return; // Espera a que la sesión esté lista

      try {
        const res = await apiServer(`/api/usuarios/${session.user.id}`, "GET");
        const { success, message, data: usuarioRes, error } = res;
        if (success === true) {
          setUsuario(usuarioRes);
        } else {
          console.warn("⚠️ No se pudo cargar el usuario:", error);
          toast.error("No se pudo cargar el usuario:", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar el usuario:", error);
      }
    };

    cargarUsuario();
  }, [session]);

  // Obtener userId
  useEffect(() => {
    let userIdentifier;

    if (usuario && usuario._id) {
      userIdentifier = usuario._id;
      localStorage.setItem("barberia_user_id", usuario._id);
    } else {
      userIdentifier =
        localStorage.getItem("barberia_user_id") ||
        "anon_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("barberia_user_id", userIdentifier);
    }

    setUserId(userIdentifier);
  }, [usuario]);

  useEffect(() => {
    const cargarColecciones = async () => {
      try {
        const res = await apiServer(`/api/colecciones`, "GET");
        const { data: coleccionesRes, message, success, error } = res;
        if (success === true) {
          setColecciones(coleccionesRes);
        } else {
          console.warn("⚠️ No se pudo cargar colecciones:", error);
          toast.error("No se pudo cargar las colecciones", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar las colecciones:", error);
      }
    };

    cargarColecciones();
  }, []);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await apiServer(`/api/productos`, "GET");
        const { data: productosRes, message, success, error } = res;
        if (success === true) {
          setProductos(productosRes);
        } else {
          console.warn("⚠️ No se pudo cargar productos:", error);
          toast.error("No se pudo cargar los productos", {
            description: error,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("🚨 Error al cargar los productos:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        openModalServicioSeleccionado,
        setOpenModalServicioSeleccionado,
        servicioSeleccionado,
        setServicioSeleccionado,
        reservas,
        setReservas,
        barberos,
        setBarberos,
        openModalVerServicio,
        setOpenModalVerServicio,
        openModalConfirmacionReserva,
        setOpenModalConfirmacionReserva,
        reservaConfirmada,
        setReservaConfirmada,
        openModalNotificaciones,
        setOpenModalNotificaciones,
        openModalMenuHamburguesa,
        setOpenMenuHamburguesa,
        usuarios,
        setUsuarios,
        usuario,
        setUsuario,
        formDataUsuario,
        setFormDataUsuario,
        formDataReserva,
        setFormDataReserva,
        horaSeleccionada,
        setHoraSeleccionada,
        Dia,
        setDia,
        duracion,
        setDuracion,
        horarios,
        setHorarios,
        contadorClick,
        setContadorClick,
        userId,
        setUserId,
        openModalEditarPerfil,
        setOpenModalEditarPerfil,
        openModalCambiarPassword,
        setModalCambiarPassword,
        password,
        setPassword,
        confirmarPassword,
        setConfirmarPassword,
        openModalPedidoCard,
        setModalPedidoCard,
        pedidoSeleccionado,
        setPedidoSeleccionado,
        formData,
        setFormData,
        mensajeGenerarOtp,
        setMensajeGenerarOtp,
        validarUsuarioExistente,
        setValidarUsuarioExistente,
        iscodigoValidado,
        setIsCodigoValidado,
        idReset,
        setIdReset,
        isSidebarOpen,
        setIsSidebarOpen,
        formDataBarbero,
        setFormDataBarbero,
        passwordActual,
        setPasswordActual,
        formDataDescanso,
        setFormDataDescanso,
        descansos,
        setDescansos,
        descansoSeleccionado,
        setDescansoSeleccionado,
        formDataServicio,
        setFormDataServicio,
        servicios,
        setServicios,
        //////
        formDataColeccion,
        setFormDataColeccion,
        colecciones,
        setColecciones,
        formDataProducto,
        setFormDataProducto,
        productos,
        setProductos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
