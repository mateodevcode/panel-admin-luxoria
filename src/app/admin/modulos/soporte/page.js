import SeccionSoporte from "@/components/admin/modulos/soporte/SeccionSoporte";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <SeccionSoporte />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
