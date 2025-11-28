"use client";

import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import FormEditarProducto from "./FormEditarProducto";
import { useParams } from "next/navigation";
import EditarVacio from "./EditarVacio";
import AsideContent from "../detalles-producto/AsideContent";

const EditarProducto = () => {
  const params = useParams();
  return (
    <div className="font-poppins mt-20">
      <BreadCrumb titulo="Editar producto" />

      <div className="w-full mt-6 gap-4 flex-col-reverse md:flex-row flex">
        {params.id && <FormEditarProducto id={params.id} />}
        <EditarVacio id={params.id} />
        <AsideContent id={params.id} />
      </div>
    </div>
  );
};

export default EditarProducto;
