import EditarProducto from "@/components/admin/apps/productos/editar-producto/EditarProducto";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <EditarProducto />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
