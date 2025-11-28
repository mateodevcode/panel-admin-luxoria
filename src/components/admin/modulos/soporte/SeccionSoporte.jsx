"use client";

import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Soporte } from "./Soporte";

const SeccionSoporte = () => {
  return (
    <div className="font-montserrat mt-20">
      <BreadCrumb titulo="Soporte" />

      <div className="w-full flex mt-6 gap-4 flex-col">
        <Soporte />
      </div>
    </div>
  );
};

export default SeccionSoporte;
