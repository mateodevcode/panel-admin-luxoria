import Productos from "@/components/admin/apps/productos/lista-productos/Productos";
import Panel from "@/components/admin/panel/Panel";
import Loading from "@/components/loading/Loading";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Panel>
      <Suspense fallback={<Loading />}>
        <Productos />
      </Suspense>
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
