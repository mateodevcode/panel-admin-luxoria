"use client";

import useResetForm from "@/hooks/useResetForm";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";

const SearchColecciones = ({ setSearch }) => {
  const router = useRouter();
  const { resetFormDataColeccion } = useResetForm();

  return (
    <div className="bg-primero p-6 rounded-lg w-full flex items-center justify-between">
      <div className="relative flex items-center rounded-md w-40 md:w-96">
        <div className="absolute left-3 text-segundo/50">
          <LuSearch className="text-segundo/50" />
        </div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="focus text-segundo/80 w-full text-sm py-2 pl-9 pr-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition bg-gray-100"
          placeholder="Buscar colección..."
        />
      </div>

      <div className="">
        <button
          className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium"
          onClick={() => {
            resetFormDataColeccion();
            router.push("/admin/apps/colecciones/agregar-coleccion");
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:flex">Agregar colección</span>
        </button>
      </div>
    </div>
  );
};

export default SearchColecciones;
