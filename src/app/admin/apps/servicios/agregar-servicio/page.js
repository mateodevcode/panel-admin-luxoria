import AgregarServicio from "@/components/admin/apps/servicios/agregar-servicio/AgregarServicio";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <AgregarServicio />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
