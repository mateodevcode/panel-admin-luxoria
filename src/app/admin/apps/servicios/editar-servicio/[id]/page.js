import EditarServicio from "@/components/admin/apps/servicios/editar-servicio/EditarServicio";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <EditarServicio />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
