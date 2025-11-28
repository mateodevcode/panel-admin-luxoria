export const validar_desbloqueo = (fecha_bloqueo) => {
  const horasBloqueo = 24;
  const ahora = new Date();
  const diferenciaHoras = (ahora - fecha_bloqueo) / (1000 * 60 * 60);
  return diferenciaHoras >= horasBloqueo;
};
