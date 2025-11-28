import Link from "next/link";

const BotonesColeccion = ({ id }) => {
  return (
    <div className="relative rounded-lg font-poppins grid grid-cols-2 gap-4 text-segundo">
      {id && (
        <Link
          href={`/admin/apps/colecciones/editar-coleccion/${id}`}
          className="flex items-center gap-2 text-sm hover:bg-cuarto rounded text-cuarto hover:text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium text-center justify-center border border-cuarto"
        >
          Editar
        </Link>
      )}
      <Link
        href={"/admin/apps/colecciones/lista-colecciones"}
        className="flex items-center gap-2 text-sm hover:bg-cuarto/80 bg-cuarto rounded text-primero px-4 py-2 transition-all duration-500 active:scale-95 font-medium text-center justify-center"
      >
        Ver todos
      </Link>
    </div>
  );
};

export default BotonesColeccion;
