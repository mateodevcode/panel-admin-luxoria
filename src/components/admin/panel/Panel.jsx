"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import HeaderContainer from "../components/header/HeaderContainer";

const Panel = ({ children }) => {
  const { isSidebarOpen } = useContext(AppContext);
  const sidebarWidth = isSidebarOpen ? 260 : 56;
  const gap = 16;

  return (
    <div
      style={{ marginLeft: sidebarWidth + gap }}
      className="min-h-svh overflow-y-auto overflow-x-hidden transition-all duration-500 relative gap-4 flex flex-col"
    >
      <HeaderContainer />
      {/* Contenedor de cards */}
      {children}
    </div>
  );
};

export default Panel;
