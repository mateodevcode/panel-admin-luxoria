"use client";

import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "@/context/AppContext";
import { logo } from "@/data/logo";
import SidebarEnlace from "./SidebarEnlace";
import {
  enlacesApps,
  enlacesMain,
  enlacesModulos,
  enlacesOtros,
} from "@/data/enlaces-sidebar";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { isSidebarOpen, propiedades } = useContext(AppContext);
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading" || propiedades === null) {
    return <Loading />;
  }

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 56 }}
      transition={{ type: "spring", stiffness: 300, damping: 45 }}
      className="no-global-scroll fixed left-0 top-0 h-screen bg-primero text-white flex flex-col items-center z-20 font-montserrat"
    >
      <nav className="flex flex-col w-full relative h-full">
        <div
          onClick={() => router.push("/admin")}
          className="flex items-center gap-2 border-b border-segundo/10 p-4 sticky top-0 left-0 bg-primero z-10"
        >
          <Image
            src={"/logo/icon.png"}
            alt={logo.alt}
            width={500}
            height={500}
            className="w-9 h-9 object-contain"
          />

          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.span
                key="inicio"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                <h2 className="text-segundo/70 font-extrabold text-2xl">
                  {logo.nombre}
                </h2>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div
          className={`flex flex-col gap-2 text-segundo/60 flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "px-4 py-4" : "px-2 py-4"
          } 
          scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent`}
        >
          <SidebarEnlace enlaces={enlacesMain} titulo="MAIN" />
          <SidebarEnlace enlaces={enlacesApps} titulo="APP & PAGES" />
          <SidebarEnlace enlaces={enlacesOtros} titulo="OTROS" />
        </div>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
