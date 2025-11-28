import Usuarios from "@/components/admin/apps/usuarios/Usuarios";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <Usuarios />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
