import DetallesBarbero from "@/components/admin/apps/colecciones/detalles-coleccion/DetallesColeccion";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <DetallesBarbero />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
