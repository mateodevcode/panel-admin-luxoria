import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import FormAgregarColeccion from "./FormAgregarColeccion";

const AgregarColeccion = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Agregar nueva colección" />

      <div className="w-full flex mt-6 gap-6 flex-col">
        <FormAgregarColeccion />
      </div>
    </div>
  );
};

export default AgregarColeccion;
