import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import FormAgregarProducto from "./FormAgregarProducto";

const AgregarProducto = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Agregar nuevo producto" />

      <div className="w-full flex mt-6 gap-6 flex-col">
        <FormAgregarProducto />
      </div>
    </div>
  );
};

export default AgregarProducto;
