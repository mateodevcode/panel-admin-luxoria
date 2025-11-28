import ListaServicios from "@/components/admin/apps/servicios/lista-servicios/ListaServicios";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <ListaServicios />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
