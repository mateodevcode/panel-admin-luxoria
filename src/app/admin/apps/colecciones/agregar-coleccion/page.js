import AgregarBarbero from "@/components/admin/apps/colecciones/agregar-coleccion/AgregarColeccion";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <AgregarBarbero />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
