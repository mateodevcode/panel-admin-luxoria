import EditarColeccion from "@/components/admin/apps/colecciones/editar-coleccion/EditarColeccion";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <EditarColeccion />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
