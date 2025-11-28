"use client";

import { formatearEnlace } from "@/libs/formatearEnlace";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumb = ({ titulo }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full flex items-center justify-between mt-2">
      <h2 className="font-bold text-lg text-segundo/70">{titulo}</h2>

      <div className="md:flex hidden items-center gap-2 text-sm text-segundo/70">
        <House className="w-4 h-4 text-segundo" />
        <Link
          href={`/${segments[0]}`}
          className="hover:text-segundo duration-500 transition-all"
        >
          <span>{formatearEnlace(segments[0])}</span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/${segments[0]}/${segments[1]}`}
          className="hover:text-segundo duration-500 transition-all"
        >
          <span>{formatearEnlace(segments[1])}</span>
        </Link>
        {segments[2] && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/${segments[0]}/${segments[1]}/${segments[2]}`}
              className="hover:text-segundo duration-500 transition-all"
            >
              <span>{formatearEnlace(segments[2])}</span>
            </Link>
          </>
        )}
        {segments[3] && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}`}
              className="hover:text-segundo duration-500 transition-all"
            >
              <span>{formatearEnlace(segments[3])}</span>
            </Link>
          </>
        )}
        {segments[4] && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}`}
              className="hover:text-segundo duration-500 transition-all"
            >
              <span>{formatearEnlace(segments[4])}</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;
