export const pantalaCompleta = () => {
  if (!document.fullscreenElement) {
    // Entrar en pantalla completa
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error al activar pantalla completa: ${err.message}`);
    });
  } else {
    // Salir de pantalla completa
    document.exitFullscreen();
  }
};
