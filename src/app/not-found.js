import Link from "next/link";

const notFound = () => {
  return (
    <main className="grid h-screen place-items-center bg-primero px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center -mt-40">
        <p className="text-4xl font-extrabold text-cuarto">404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-balance text-segundo sm:text-7xl">
          Pagina no encontrada
        </h1>
        <p className="mt-6 text-base font-medium text-pretty text-segundo/80 sm:text-xl/8">
          Lo sentimos, no hemos podido encontrar la página que estás buscando.
          <br />
          Por favor, verifica la URL o vuelve a la página de inicio.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={"/"}
            className="rounded-md bg-cuarto px-4 py-3 font-medium text-white shadow-xs hover:bg-cuarto/80 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer select-none"
          >
            Regresar
          </Link>
        </div>
      </div>
    </main>
  );
};

export default notFound;
