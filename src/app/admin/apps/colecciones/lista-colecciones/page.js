import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import ListaColecciones from "@/components/admin/apps/colecciones/lista-colecciones/ListaColecciones";
import React from "react";

const page = () => {
  return (
    <Panel>
      <ListaColecciones />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
