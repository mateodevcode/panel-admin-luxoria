import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import CardPerfil from "./CardPerfil";

const Perfil = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Perfil" />

      <div className="w-full flex mt-6 gap-4 flex-col">
        <CardPerfil />
      </div>
    </div>
  );
};

export default Perfil;
