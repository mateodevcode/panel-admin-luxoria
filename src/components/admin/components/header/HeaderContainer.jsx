"use client";

import { Bell, Maximize, Menu, Search, Settings, Sun } from "lucide-react";
import { IoApps } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import AuthUser from "./AuthUser";
import { pantalaCompleta } from "@/libs/pantalaCompleta";
import { useRouter } from "next/navigation";
import SearchGeneral from "../search/SearchGeneral";

const HeaderContainer = () => {
  const { isSidebarOpen, setIsSidebarOpen, usuario } = useContext(AppContext);
  const { notificaciones } = usuario || {};
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const totalNotificacionesNoLeidas = notificaciones
    ? notificaciones.filter((n) => n.leido === false).length
    : 0;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearch(value.length > 0);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <div
      className={`bg-primero h-16 flex items-center justify-between p-4 z-10 text-blackbase-500/60 px-8 rounded-b-lg fixed right-4 top-0 ${
        isSidebarOpen ? "left-[275px]" : "left-[73px]"
      } transition-all duration-500`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4 relative flex-1">
          {/* Botón toggle */}
          <Menu
            className="cursor-pointer w-4 h-4 mr-2 text-segundo hover:text-cuarto"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="relative md:flex items-center gap-2 bg-gray-100 rounded-md p-2 hidden flex-1 max-w-md">
            <input
              type="text"
              placeholder="Productos, colecciones..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="text-sm px-2 py-1 bg-transparent outline-none font-semibold w-full"
            />
            <Search className="w-4 h-4 absolute right-3 text-cuarto" />
          </div>

          {/* Search Results Dropdown */}
          {showSearch && searchQuery && (
            <div className="absolute top-12 left-0 right-0 max-w-2xl z-50">
              <SearchGeneral
                searchQuery={searchQuery}
                onClose={handleCloseSearch}
              />
            </div>
          )}

          <IoApps className="w-5 h-5 hidden md:flex" />
        </div>
        <div className="flex items-center gap-6">
          <button
            className="text-tercero hover:text-tercero/80 duration-300 transition-all"
            onClick={() => alert("Funcionalidad de modo oscuro en desarrollo")}
          >
            <Sun className="w-5 h-5" />
          </button>
          <button
            onClick={() => pantalaCompleta()}
            className="hover:text-cuarto duration-300 transition-all md:flex hidden"
          >
            <Maximize className="w-5 h-5" />
          </button>

          <button
            className="relative cursor-pointer select-none"
            onClick={() => router.push("/admin/modulos/notificaciones")}
          >
            <Bell className="w-5 h-5" />
            {totalNotificacionesNoLeidas > 1 && (
              <div className="absolute -top-2 -right-1">
                <div className="relative flex items-center justify-center w-5 h-5">
                  {/* Onda pulsante */}
                  <span className="absolute inline-flex w-full h-full rounded-full bg-cuarto opacity-50 animate-ping"></span>
                  {/* Punto central */}
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-cuarto"></span>
                </div>
              </div>
            )}
          </button>

          <AuthUser />
          <button
            onClick={() => router.push("/admin/otros/ajustes")}
            className="hidden md:flex"
          >
            <Settings
              className="w-5 h-5 animate-spin cursor-pointer select-none"
              style={{ animationDuration: "3s" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
