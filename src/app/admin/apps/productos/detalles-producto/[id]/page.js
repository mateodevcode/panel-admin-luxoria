import DetallesProducto from "@/components/admin/apps/productos/detalles-producto/DetallesProducto";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <DetallesProducto />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
