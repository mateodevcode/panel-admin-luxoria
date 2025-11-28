"use client";

import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import FormEditarColeccion from "./FormEditarColeccion";
import { useParams } from "next/navigation";
import AsideContent from "../detalles-coleccion/AsideContent";
import EditarVacio from "./EditarVacio";

const EditarColeccion = () => {
  const params = useParams();
  return (
    <div className="font-poppins mt-20">
      <BreadCrumb titulo="Editar colección" />

      <div className="w-full mt-6 gap-4 flex-col-reverse md:flex-row flex">
        {params.id && <FormEditarColeccion id={params.id} />}
        <EditarVacio id={params.id} />
        <AsideContent id={params.id} />
      </div>
    </div>
  );
};

export default EditarColeccion;
