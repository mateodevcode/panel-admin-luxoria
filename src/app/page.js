import IniciarSesion from "@/components/iniciar-sesion/IniciarSesion";
import Loading from "@/components/loading/Loading";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <IniciarSesion />
      </Suspense>
      <Loading />
      <style>{scrollbarStyles.reservas}</style>
    </>
  );
}
