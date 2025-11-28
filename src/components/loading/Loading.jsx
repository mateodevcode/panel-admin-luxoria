"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { logo } from "@/data/logo";

const Loading = () => {
  const { status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <div className="max-w-screen flex items-center justify-center fixed inset-0 z-50 h-svh w-screen scrollbar-hidden font-poppins bg-primero">
          <div
            className="w-[70svh] h-[70svh] flex items-center justify-center"
            // style={{
            //   background:
            //     "radial-gradient(circle, rgba(240, 177, 0, 0.1) 0%, rgba(12, 10, 29, 0) 70%)",
            // }}
          >
            <div className="w-40">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 absolute text-sm bottom-4 left-0 right-0 text-center text-segundo/80">
            <Link href="https://seventwo.tech" target="_blank">
              Desarrollado por <strong className="font-bold">Seventwo</strong>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
