import Ajustes from "@/components/admin/otros/ajustes/Ajustes";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <Ajustes />

      {/* Modales */}
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
