import Image from "next/image";
import Link from "next/link";
import React from "react";

const Conexiones = () => {
  const cuentas = [
    {
      id: 1,
      nombre: "Google",
      texto: "Calendar y Contacts",
      conectado: true,
      icono: "/admin/ajustes/google.svg",
      enlace: "https://accounts.google.com/",
    },
    {
      id: 2,
      nombre: "Slack",
      texto: "Comunicación en equipo",
      conectado: false,
      icono: "/admin/ajustes/slack.svg",
      enlace: "https://slack.com/signin",
    },
    {
      id: 3,
      nombre: "GitHub",
      texto: "Repositorios y código",
      conectado: true,
      icono: "/admin/ajustes/github.svg",
      enlace: "https://github.com/login",
    },
  ];

  const redes = [
    {
      id: 1,
      nombre: "Facebook",
      conectado: true,
      icono: "/admin/ajustes/facebook.svg",
      enlace: "https://accounts.google.com/",
    },
    {
      id: 2,
      nombre: "X",
      conectado: false,
      icono: "/admin/ajustes/x.svg",
      enlace: "https://slack.com/signin",
    },
    {
      id: 3,
      nombre: "Instagram",
      conectado: true,
      icono: "/admin/ajustes/instagram.svg",
      enlace: "https://github.com/login",
    },
  ];

  return (
    <div className="flex flex-col gap-10 text-sm mt-4">
      <div>
        <h3 className="font-bold text-xl">Cuentas Conectadas</h3>
        <div className="mt-6 flex flex-col gap-8">
          {cuentas.map((cuenta) => (
            <div key={cuenta.id} className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <Image
                  src={cuenta.icono}
                  alt={cuenta.nombre}
                  width={500}
                  height={500}
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{cuenta.nombre}</span>
                  <span className="text-segundo/70">{cuenta.texto}</span>
                </div>
              </div>
              <div>
                {cuenta.conectado ? (
                  <div className="px-4 py-2 text-cuarto">Desconectar</div>
                ) : (
                  <Link
                    href={cuenta.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-segundo"
                  >
                    Conectar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl">Cuentas Redes Sociales</h3>
        <div className="mt-6 flex flex-col gap-8">
          {redes.map((cuenta) => (
            <div key={cuenta.id} className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <img
                  src={cuenta.icono}
                  alt={cuenta.nombre}
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{cuenta.nombre}</span>
                  <span className="text-segundo/70">{cuenta.texto}</span>
                </div>
              </div>
              <div>
                {cuenta.conectado ? (
                  <div className="px-4 py-2 text-cuarto">Desconectar</div>
                ) : (
                  <Link
                    href={cuenta.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-segundo"
                  >
                    Conectar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conexiones;
