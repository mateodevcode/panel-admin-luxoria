import Footer from "@/components/admin/apps/page-principal/footer/Footer";
import Panel from "@/components/admin/panel/Panel";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import React from "react";

const page = () => {
  return (
    <Panel>
      <Footer />
      <style>{scrollbarStyles.admin}</style>
    </Panel>
  );
};

export default page;
