import Perfil from "@/components/admin/apps/perfil/Perfil";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <Perfil />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
