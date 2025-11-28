"use client";

import BreadCrumb from "@/components/admin/components/breadcrumb/BreadCrumb";
import DetalleCard from "./DetalleCard";
import { useParams } from "next/navigation";
import AsideContent from "./AsideContent";

const DetallesColeccion = () => {
  const params = useParams();

  return (
    <div className="font-poppins mt-20">
      <BreadCrumb titulo="Detalles de colección" />

      <div className="w-full flex mt-6 gap-4 flex-col-reverse md:flex-row">
        <DetalleCard id={params.id} />
        <AsideContent id={params.id} />
      </div>
    </div>
  );
};

export default DetallesColeccion;
