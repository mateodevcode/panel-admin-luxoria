import { FormIniciarSesion } from "./FormIniciarSesion";
import Logo from "../logo/Logo";

export default function IniciarSesion() {
  return (
    <div className="grid min-h-svh grid-cols-1 bg-primero">
      <div className="flex flex-col gap-4 p-6 justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <FormIniciarSesion />
          </div>
        </div>
      </div>
    </div>
  );
}
