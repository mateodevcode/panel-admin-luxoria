"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Listbox } from "@headlessui/react";
import { statusPorUSuarios } from "@/data/statusOptions";

const SearchUsuarios = ({ setSearch, setStatusFilter }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setStatusFilter(status);
  };

  return (
    <div className="bg-primero p-6 rounded-lg w-full flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {/* Buscador */}
        <div className="relative flex items-center rounded-md flex-1 max-w-md">
          <div className="absolute left-3 text-segundo/50">
            <LuSearch className="text-segundo/50" />
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="focus text-segundo/80 w-full text-sm py-2 pl-9 pr-4 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition bg-gray-100"
            placeholder="Buscar usuario por nombre o email..."
          />
        </div>

        {/* Filtro por estado */}
        <div className="relative w-48">
          <Listbox value={selectedStatus} onChange={handleStatusChange}>
            {({ open }) => (
              <div>
                <Listbox.Button className="bg-tercero hover:bg-tercero/80 text-segundo w-full text-sm p-2 rounded-md focus:ring-1 focus:ring-cuarto focus:border-transparent outline-none transition border border-transparent">
                  <div className="flex items-center justify-between px-2">
                    <span className="flex items-center gap-2">
                      {selectedStatus ? (
                        <span className="capitalize">
                          {
                            statusPorUSuarios.find(
                              (opt) => opt.value === selectedStatus
                            )?.label
                          }
                        </span>
                      ) : (
                        "Filtrar por usuario"
                      )}
                    </span>
                    <ChevronDown className="h-4 w-4 text-segundo/70" />
                  </div>
                </Listbox.Button>

                {open && (
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 text-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                    {statusPorUSuarios.map((option, index) => (
                      <Listbox.Option
                        key={index}
                        value={option.value}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2 ${
                            active ? "bg-gray-100" : ""
                          } ${
                            selected
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : ""
                          }`
                        }
                      >
                        {option.label}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </div>
            )}
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default SearchUsuarios;
