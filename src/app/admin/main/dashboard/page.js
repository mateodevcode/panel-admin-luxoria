import Dashboard from "@/components/admin/main/Dashboard";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";

import React from "react";

const page = () => {
  return (
    <Panel>
      <Dashboard />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
