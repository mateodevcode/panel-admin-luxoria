import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Notificaciones } from "./Notificaciones";

const SeccionNotificaciones = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Notificaciones" />

      <div className="w-full flex mt-6 gap-4 flex-col">
        <Notificaciones />
      </div>
    </div>
  );
};

export default SeccionNotificaciones;
