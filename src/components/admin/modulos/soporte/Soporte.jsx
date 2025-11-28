"use client";

import { useState } from "react";
import {
  MessageCircle,
  Send,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dataSoporte } from "@/data/data.soporte";
import useMensaje from "@/hooks/useMensaje";
import { tiposAsuntos } from "@/data/tiposAsuntos";

export function Soporte() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoAsunto, setTipoAsunto] = useState("general");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const { handleMensaje } = useMensaje();

  const numeroWhatsApp = "573122975171";

  const handleEnviarWhatsApp = () => {
    if (!nombre || !email || !mensaje) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    const textoMensaje = `*Nuevo mensaje de soporte*\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n*Teléfono:* ${
      telefono || "No proporcionado"
    }\n*Asunto:* ${asunto}\n*Tipo:* ${
      tiposAsuntos.find((t) => t.value === tipoAsunto)?.label
    }\n\n*Mensaje:*\n${mensaje}`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      textoMensaje
    )}`;

    window.open(urlWhatsApp, "_blank");

    setEnviado(true);
    setTimeout(() => {
      setNombre("");
      setEmail("");
      setTelefono("");
      setAsunto("");
      setMensaje("");
      setTipoAsunto("general");
      setEnviado(false);
    }, 2000);
  };

  const getLabelAsunto = () => {
    return tiposAsuntos.find((t) => t.value === tipoAsunto)?.label;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-cuarto to-cuarto/60 rounded-xl shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-segundo">
              Centro de Soporte
            </h1>
          </div>
          <p className="text-segundo/60 text-lg">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-segundo/5 p-8">
              <h2 className="text-2xl font-bold text-segundo mb-6">
                Envía tu mensaje
              </h2>

              <div className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-lg border border-segundo/10 focus:border-cuarto focus:ring-2 focus:ring-cuarto/20 outline-none transition-all text-segundo placeholder:text-segundo/40"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-segundo/10 focus:border-cuarto focus:ring-2 focus:ring-cuarto/20 outline-none transition-all text-segundo placeholder:text-segundo/40"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full px-4 py-3 rounded-lg border border-segundo/10 focus:border-cuarto focus:ring-2 focus:ring-cuarto/20 outline-none transition-all text-segundo placeholder:text-segundo/40"
                  />
                </div>

                {/* Tipo de Asunto */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Tipo de consulta *
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(!openDropdown)}
                      className="w-full px-4 py-3 rounded-lg border border-segundo/10 bg-white flex items-center justify-between hover:border-cuarto transition-all text-segundo"
                    >
                      <span>{getLabelAsunto()}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-segundo/10 rounded-lg shadow-lg z-10 overflow-hidden"
                        >
                          {tiposAsuntos.map((tipo) => (
                            <button
                              key={tipo.value}
                              onClick={() => {
                                setTipoAsunto(tipo.value);
                                setOpenDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-3 transition-all border-b border-segundo/5 last:border-b-0 ${
                                tipoAsunto === tipo.value
                                  ? "bg-cuarto/10 text-cuarto font-semibold"
                                  : "text-segundo/70 hover:bg-segundo/5"
                              }`}
                            >
                              {tipo.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Asunto (opcional)
                  </label>
                  <input
                    type="text"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Brevemente, ¿cuál es tu consulta?"
                    className="w-full px-4 py-3 rounded-lg border border-segundo/10 focus:border-cuarto focus:ring-2 focus:ring-cuarto/20 outline-none transition-all text-segundo placeholder:text-segundo/40"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-semibold text-segundo/80 mb-2">
                    Tu mensaje *
                  </label>
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-segundo/10 focus:border-cuarto focus:ring-2 focus:ring-cuarto/20 outline-none transition-all text-segundo placeholder:text-segundo/40 resize-none"
                  />
                </div>

                {/* Botón Enviar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnviarWhatsApp}
                  disabled={enviado}
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    enviado
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-cuarto to-cuarto/80 text-white hover:shadow-lg"
                  }`}
                >
                  {enviado ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Mensaje enviado!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar por WhatsApp
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {/* Card WhatsApp */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-segundo text-lg">WhatsApp</h3>
                </div>
                <p className="text-segundo/70 text-sm mb-4">
                  Respuesta rápida a través de WhatsApp. Tu mensaje será enviado
                  directamente a nuestro equipo.
                </p>
                <button
                  onClick={() =>
                    handleMensaje("Hola, Necesito ayuda urgente.", 1)
                  }
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Abrir WhatsApp
                </button>
              </div>

              {/* Horario */}
              <div className="bg-white rounded-2xl border border-segundo/5 p-6 shadow-lg">
                <h3 className="font-bold text-segundo mb-4">
                  Horario de atención
                </h3>
                <div className="space-y-2 text-sm text-segundo/70">
                  <p>
                    <span className="font-semibold text-segundo">
                      Lunes - Viernes:
                    </span>
                    <br />
                    {dataSoporte.horarios.Lunes_viernes}
                  </p>
                  <p>
                    <span className="font-semibold text-segundo">Sábado:</span>
                    <br />
                    {dataSoporte.horarios.Sabado}
                  </p>
                  <p>
                    <span className="font-semibold text-segundo">Domingo:</span>
                    <br />
                    {dataSoporte.horarios.Domingo}
                  </p>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="bg-white rounded-2xl border border-segundo/5 p-6 shadow-lg space-y-4">
                <h3 className="font-bold text-segundo mb-4">
                  Otra información
                </h3>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cuarto flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-segundo/60 font-semibold">
                      Teléfono
                    </p>
                    <p className="text-segundo font-medium">
                      {" "}
                      {dataSoporte.telefono}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cuarto flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-segundo/60 font-semibold">
                      Email
                    </p>
                    <p className="text-segundo font-medium">
                      {dataSoporte.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-cuarto flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-segundo/60 font-semibold">
                      Sitio Web
                    </p>
                    <a
                      href={dataSoporte.url_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cuarto hover:text-cuarto/80 font-medium"
                    >
                      {dataSoporte.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-segundo mb-3">💡 Consejo</h3>
                <p className="text-sm text-segundo/70">
                  Para una respuesta más rápida, incluye la mayor cantidad de
                  detalles posible sobre tu consulta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
